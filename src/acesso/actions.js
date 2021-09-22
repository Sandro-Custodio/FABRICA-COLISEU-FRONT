import axios from "axios";
import { toastr } from "react-redux-toastr";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

export const getCodSoxList = () => {
  return async dispatch => {
    dispatch({ type: "SHOW_OVERLAY_ACESSO" });
    await axios
      .post(`${process.env.REACT_APP_API_URL}/users/get_roles`)
      .then(resp => {
        console.log("resp", resp);
        dispatch({ type: "COMBOS_CODSOX_FETCHED", payload: resp.data });
      })
      .catch(e => {
        toastr.warning("Atenção", "FALHA AO CARREGAR LISTA DE PROVEDORES.");
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
      });
    dispatch({ type: "HIDE_OVERLAY_ACESSO" });
  };
};

export const saveNewUser = (userParams, newPerfil) => {
  const params = {
    user: {
      ...userParams,
      area_id: newPerfil.area_id,
      role_id: newPerfil.role_id,
      login: userParams.registry,
      status: "Ativo"
    }
  };

  return axios.post("/users/save_user", params);
};

export const updateSearch = (searchParams, reducer) => async dispatch => {
  const params = {
    name: searchParams?.name || "",
    reg: searchParams?.reg || "",
    page: reducer?.paginator.currentPage || 1
  };

  dispatch([{ type: "SHOW_OVERLAY" }]);
  await axios
    .post(`${process.env.REACT_APP_API_URL}/users/get_all_users`, params)
    .then(resp => {
      let maxPagesQtd = resp.data[1];

      if (maxPagesQtd % 1 !== 0) {
        maxPagesQtd = Math.ceil(maxPagesQtd);
      }
      dispatch([
        { type: "USUARIO_FETCHED", payload: resp.data }, 
        { type: "CHANGE_USERS_MAX_PAGE_QTD", payload: maxPagesQtd } 
      ]);
    })
    .catch(e => {
      if (e.response) {
        if (e.response.data.errors) {
          e.response.data.errors.forEach(error => toastr.error("Erro", error));
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

export function searchUser(searchParams, reducer) {
  const params = {
    name: searchParams?.name || "",
    reg: searchParams?.reg || "",
    page: reducer?.paginator?.currentPage || 1
  };

  return async dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    await axios
      .post(`${process.env.REACT_APP_API_URL}/users/get_all_users`, params)
      .then(resp => {
        let maxPagesQtd = resp.data[1];

        if (maxPagesQtd % 1 !== 0) {
          maxPagesQtd = Math.ceil(maxPagesQtd);
        }
        dispatch([
          { type: "USUARIO_FETCHED", payload: resp.data },
          { type: "CHANGE_USERS_MAX_PAGE_QTD", payload: maxPagesQtd }
        ]);
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

export function editUser(userParams, newPerfil) {
  let params = {
    user: {
      ...userParams,
      area_id: userParams.real_area_id
    }
  };
  if (newPerfil.role_id != undefined) {
    params = {
      user: {
        ...userParams,
        role_id: newPerfil.role_id,
        area_id: newPerfil.area_id
      }
    };
  }
  return axios.post(
    `${process.env.REACT_APP_API_URL}/users/update_user`,
    params
  );
}

export const changeStatus = (row, newStatus) => async dispatch => {
  const params = {
    user: row,
    status: newStatus
  };
  try {
    await axios.post(
      `${process.env.REACT_APP_API_URL}/users/change_status`,
      params
    );
    toastr.info("Status alterado com sucesso");
  } catch (error) {
    toastr.error("Erro ao alterar status");
  } finally {
  }
};

export const resetPass = user => async dispatch => {
  const params = {
    userId: user.id
  };
  try {
    await axios.post(
      `${process.env.REACT_APP_API_URL}/users/reset_pass`,
      params
    );
    toastr.info("Senha reiniciada com sucesso");
  } catch (error) {
    toastr.error("Erro ao reiniciar senha");
  } finally {
  }
};

// export const searchUser = searchParams => {
//   const params = {
//     name: searchParams.name,
//     reg: searchParams.reg,
//     page: 1
//   };

//   return axios.post("/users/get_all_users", params);
// };
