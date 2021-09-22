/* eslint-disable import/no-cycle */
import { toastr } from "react-redux-toastr";
import { stopSubmit } from "redux-form";
import React from "react";
import axios from "axios";
import TermoResponsabilidade from "auth/termo-responsabilidade";
import CheckPasswordValidity from "./checkPasswordValidity";

const _ = require("lodash");

function notificationAfterLogin({
  /* has_cancel_waiting,
  has_revision_waiting, */
  user
}) {
  // if (_.get(has_cancel_waiting, "length", 0) > 0) {
  //   toastr.info(
  //     "Cancelamento",
  //     `Existe(m) ${has_cancel_waiting.length} Segmento(s) em cancelamento aguardando confirmação de sua área.`
  //   );
  // }
  // if (_.get(has_revision_waiting, "length", 0) > 0) {
  //   toastr.info(
  //     "Revisão",
  //     `Existe(m) ${has_revision_waiting.length} Segmento(s) em revisão aguardando confirmação de sua área.`
  //   );
  // }

  const validadeSenha = new Date(user.validade_senha);
  const alertExpirationDate = new Date(
    validadeSenha.setDate(validadeSenha.getDate() - 7)
  );

  const today = new Date();

  if (today > alertExpirationDate) {
    toastr.message("Alerta de Expiração de Senha", {
      component: () => <CheckPasswordValidity />
    });
  }

  toastr.message("Termo de Responsabilidade", {
    component: () => <TermoResponsabilidade />
  });
}

function submit(values, url) {
  return dispatch => {
    dispatch([{ type: "SHOW_OVERLAY" }]);
    return new Promise((resolve, reject) => {
      axios
        .post(url, values)
        .then(resp => {
          const validadeSenha = new Date(resp.data.user.validade_senha);
          const alertExpirationDate = new Date(
            validadeSenha.setDate(validadeSenha.getDate() - 7)
          );
          const today = new Date();

          if (resp.data.user) {
            if (resp.data.message.code === 2) {
              toastr.error("Login", "Senha Expirada");
              dispatch([{ type: "EXPIRED_PASSWORD", payload: values }]);
              // resolve();
            } else if (resp.data.message.code > 0) {
              toastr.error("Login", resp.data.message.msg);
              dispatch(stopSubmit("authForm"));
            } else {
              if (today > alertExpirationDate) {
                dispatch([
                  { type: "SET_VALUES", payload: values },
                  { type: "USER_FETCHED", payload: resp.data },
                  notificationAfterLogin(resp.data)
                ]);
                return;
              }
              dispatch([
                { type: "USER_FETCHED", payload: resp.data },
                notificationAfterLogin(resp.data)
              ]);
            }
          } else {
            toastr.error("Login", resp.data.message.msg);
          }
          dispatch([{ type: "HIDE_OVERLAY" }]);
        })
        .catch(e => {
          resolve("CATCH");
          if (e.response) {
            if (e.response.data.errors) {
              e.response.data.errors.forEach(error =>
                toastr.error("Erro", error)
              );
            } else {
              toastr.error(String(e.response.status), e.response.statusText);
            }
          } else if (e.request) {
            if (e.message === "Network Error") {
              toastr.error("Erro", "Servidor OFFLINE");
            }
          }
          dispatch([{ type: "HIDE_OVERLAY" }]);
        });
    });
  };
}

export function openChangePassword() {
  return dispatch => {
    dispatch([{ type: "CHANGE_PASSWORD" }]);
  };
}

export function login(values) {
  return dispatch => {
    let form_values = values;
    if (process.env.NODE_ENV === "development") {
      form_values = {
        // login: process.env.REACT_APP_USERNAME,
        // password: process.env.REACT_APP_PASSWORD
        login: values.login,
        password: values.password
      };
    }
    if (!form_values || !form_values.login || !form_values.password) {
      toastr.info("Login", "OS CAMPOS LOGIN E SENHA SÃO OBRIGATÓRIOS");
      return;
    }
    return dispatch(
      submit(form_values, `${process.env.REACT_APP_API_URL}/login`)
    );
  };
}

export function changePass(login, old_pass, new_pass) {
  const params = {
    login,
    old_pass,
    new_pass
  };
  return dispatch => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/change_pass`, params)
      .then(resp => {
        if (resp.data.msg === "OK") {
          dispatch([{ type: "PASSWORD_CHANGED", payload: false }]);
        } else if (resp.data.msg === "OLD") {
          toastr.error(
            "Erro",
            "Sua senha não pode ser igual as ultimas 12 senhas cadastradas."
          );
        }
      })
      .catch(e => {
        if (e.response) {
          if (e.response.data.errors) {
            e.response.data.errors.forEach(error =>
              toastr.error("Erro", error)
            );
          } else {
            toastr.error(String(e.response.status), e.response.statusText);
          }
        } else if (e.request) {
          if (e.message === "Network Error") {
            toastr.error("Erro", "Servidor OFFLINE");
          }
        }
      })
      .finally(() => {
        dispatch([{ type: "HIDE_OVERLAY" }]);
      });
  };
}

export function logout(user_id) {
  const params = {
    user_id
  };
  return async dispatch => {
    await axios
      .post(`${process.env.REACT_APP_API_URL}/logout`, params)
      .then(resp => {
        dispatch([
          { type: "HIDE_OVERLAY" },
          { type: "TOKEN_VALIDATED", payload: false }
        ]);
      });
  };
}

export function validateToken(token) {
  return dispatch => {
    const config = {
      headers: {
        Authorization: token || ""
      }
    };
    if (token) {
      axios
        .post(`${process.env.REACT_APP_API_URL}/validate_token`, "", config)
        .then(resp => {
          dispatch({ type: "TOKEN_VALIDATED", payload: resp.data });
        })
        .catch(e => {
          dispatch({ type: "TOKEN_VALIDATED", payload: false });
        });
    } else {
      dispatch({ type: "TOKEN_VALIDATED", payload: false });
    }
  };
}

export function setApplication() {
  let nameApp = "";

  if (process.env.NODE_ENV === "development") {
    nameApp = window.location.hostname.replace("tim.", "");
  } else if (process.env.REACT_APP_APPLICATION) {
    nameApp = process.env.REACT_APP_APPLICATION;
  } else {
    nameApp = "licceu";
  }
  return {
    type: "SET_APPLICATION",
    payload: nameApp.trim().toLowerCase()
  };
}

export const logCodeAndCallback = (funcId, dispatchFunction) => {
  dispatchFunction();
  logUserMenuAccess(funcId);
};

export const logUserMenuAccess = funcId => {
  const params = {
    menu_code: funcId
  };
  return axios.post("/user/save_menu_log", params);
};

export const isPermited = (permissions, funcId) => {
  // console.log(permissions);
  const permissionsCodesAux = permissions.map(todo => todo.code);
  const permissionsCodes = ["Dashboard", "Copyright", ...permissionsCodesAux];
  if (permissionsCodes.includes(funcId)) {
    return true;
  }

  return false;
};

// export function setApplication() {
//   let nameApp = "";
//   if (process.env.NODE_ENV === "development") {
//     nameApp = window.location.hostname.replace("tim.", "");
//   }
//   if (document.location.port === "3004") {
//     nameApp = "licceu";
//   }
//   if (document.location.port === "3005") {
//     nameApp = "coliseu";
//   }
//   return {
//     type: "SET_APPLICATION",
//     payload: nameApp
//   };
// }
