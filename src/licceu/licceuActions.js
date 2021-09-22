import { toastr } from "react-redux-toastr";
import axios from "axios";

export function login(values, dispatch) {
  if (process.env.NODE_ENV === "development") {
    values = {
      login: process.env.REACT_APP_USERNAME,
      password: process.env.REACT_APP_PASSWORD
    };
  }
  if (!values || !values.login || !values.password) {
    toastr.info("Login", "OS CAMPOS LOGIN E SENHA SÃO OBRIGATÓRIOS");
    return;
  }
  return submit(values, `${process.env.REACT_APP_API_URL}/login`);
}

function submit(values, url) {
  return dispatch => {
    dispatch([{ type: "SHOW_OVERLAY" }]);
    axios
      .post(url, values)
      .then(resp => {
        if (resp.data.user) {
          if (resp.data.has_cancel_waiting.length > 0) {
            toastr.info(
              "Cancelamento",
              `Existe(m) ${resp.data.has_cancel_waiting.length} Segmento(s) em cancelamento aguardando confirmação de sua área.`
            );
          }
          if (resp.data.has_revision_waiting.length > 0) {
            toastr.info(
              "Revisão",
              `Existe(m) ${resp.data.has_revision_waiting.length} Segmento(s) em revisão aguardando confirmação de sua área.`
            );
          }
          dispatch([{ type: "USER_FETCHED", payload: resp.data }]);
        } else {
          toastr.error("Login", resp.data.message.msg);
        }
        dispatch([{ type: "HIDE_OVERLAY" }]);
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
        dispatch([{ type: "HIDE_OVERLAY" }]);
      });
  };
}

export const LicceuLogin = () => ({
  type: "LICCEU_LOGIN",
  payload: true
});
