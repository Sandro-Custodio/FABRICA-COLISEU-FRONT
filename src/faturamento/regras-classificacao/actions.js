import axios from "axios";
import { toastr } from "react-redux-toastr";
import { reset, change } from "redux-form";

export const get_operators_and_vendors = () => {
  return dispatch => {
    dispatch([{ type: "SHOW_OVERLAY" }]);
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/bills/get_operators_and_vendors`,{}
      )
      .then(resp => {
        dispatch([
          { type: "HIDE_OVERLAY" },
          {
            type: "RULES_OPERATORS_AND_VENDOR_LIST_FETCHED",
            payload: resp.data
          }
        ]);
      })
      .catch(e => {
        toastr.warning("Atenção", "FALHA AO CARREGAR DADOS.");
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
};

export const get_all_classifications_by_vendor = params => {
  return async dispatch => {
    dispatch([{ type: "SHOW_OVERLAY" }]);
    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/bill_classifications/get_all_classifications_by_vendor`,
        params
      )
      .then(resp => {
        dispatch([
          { type: "HIDE_OVERLAY" },
          { type: "CLASSIFICATION_RULES_LIST_FETCHED", payload: resp.data }]);
      })
      .catch(e => {
        toastr.warning("Atenção", "FALHA AO CARREGAR REGRAS DE CLASSIFICAÇÃO.");
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
};

export const save_roles_and_items = params => {
  return dispatch => {
    dispatch([{ type: "SHOW_OVERLAY" }]);
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/bill_classifications/save_roles_and_items`,
        params
      )
      .then(resp => {
        dispatch({ type: "HIDE_OVERLAY" });
        if(params.type === "new"){
          window.$("#criar_regra_classificacao").modal("hide")
          dispatch(reset('CriarRegra'));
        }
        if(params.type === "edit"){
          window.$("#editar_regra_classificacao").modal("hide")
          dispatch(reset('EditarRegra'));
        }
        toastr.success(resp.data.message);
      })
      .catch(e => {
        toastr.warning("Atenção", "FALHA AO SALVAR REGRAS DE CLASSIFICAÇÃO.");
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
};

export const get_class_groups = () => {
  return dispatch => {
    dispatch([{ type: "SHOW_OVERLAY" }]);
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/bill_classifications/get_class_groups`
      )
      .then(resp => {
        dispatch([
          { type: "HIDE_OVERLAY" },
          { type: "RULES_CLASS_GROUPS_FETCHED", payload: resp.data }]);
      })
      .catch(e => {
        toastr.warning("Atenção", "FALHA AO CARREGAR DADOS.");
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
};

export const delete_roles_items = (role_id, user_id) => {
  const params = {
    role_id,
    user_id
  };
  return dispatch => {
    dispatch([{ type: "SHOW_OVERLAY" }]);
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/bill_classifications/delete_roles_items`,
        params
      )
      .then(resp => {
        dispatch({ type: "HIDE_OVERLAY" });
        // toastr.success(resp.data.message);
        // dispatch(reset('CriarRegra'));
      })
      .catch(e => {
        toastr.warning("Atenção", "FALHA AO CANCELAR REGRA DE CLASSIFICAÇÃO.");
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
};
