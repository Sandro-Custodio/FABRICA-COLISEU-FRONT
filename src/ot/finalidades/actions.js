import axios from "axios";
import { toastr } from "react-redux-toastr";

export const get_all_finality_elements = () => {
  return async dispatch => {
    dispatch([{ type: "SHOW_OVERLAY" }]);
    await axios
      .get(`${process.env.REACT_APP_API_URL}/finality_elements/get_all_finality_elements`)
      .then(resp => {
        dispatch([
          { type: "HIDE_OVERLAY" },
          { type: "FINALITY_ELEMENTS_LIST_FETCHED", payload: resp.data }]);
      })
      .catch(e => {
        toastr.warning("Atenção", "FALHA AO CARREGAR LISTA DE FINALIDADES.");
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

export const get_finalities_and_element_types = () => {
  return async dispatch => {
    dispatch([{ type: "SHOW_OVERLAY" }]);
    await axios
      .get(`${process.env.REACT_APP_API_URL}/finality_elements/get_finalities_and_element_types`)
      .then(resp => {
        dispatch([
          { type: "HIDE_OVERLAY" },
          { type: "FINALITIES_AND_ELEMENT_TYPES_FETCHED", payload: resp.data }]);
      })
      .catch(e => {
        toastr.warning("Atenção", "FALHA AO CARREGAR FINALIDADES E TIPOS DE ELEMENTOS.");
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

export const create_finality_element = params => {
  return async dispatch => {
    dispatch([{ type: "SHOW_OVERLAY" }]);
    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/finality_elements/create_finality_element`,
        params
      ).then(resp => {
        if(resp?.data?.message?.length > 0){
          toastr.warning("VALIDAÇÃO",resp?.data?.message)
        }else{
          window.$("#cadastrar_finalidade").modal("hide")
          setTimeout(() => {
            toastr.success("Finalidade salva.")
          }, 1000)
        }
        dispatch({ type: "HIDE_OVERLAY" });
      })
      .catch(e => {
        toastr.warning("Atenção", "FALHA AO SALVAR FINALIDADES.");
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

export const edit_finality_element = params => {
  return async dispatch => {
    dispatch([{ type: "SHOW_OVERLAY" }]);
    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/finality_elements/edit_finality_element`,
        params
      ).then(resp => {
        if(resp?.data?.message?.length > 0){
          toastr.warning("VALIDAÇÃO",resp?.data?.message)
        }else{
          window.$("#editar_finalidade").modal("hide")
          setTimeout(() => {
            toastr.success("Finalidade salva.")
          }, 1000)
        }
        dispatch({ type: "HIDE_OVERLAY" });
      })
      .catch(e => {
        toastr.warning("Atenção", "FALHA AO SALVAR FINALIDADES.");
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
