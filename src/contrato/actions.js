import axios from "axios";
import { toastr } from "react-redux-toastr";
import { reset, destroy } from "redux-form";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

export const getContratoList = (pesquisaParams, listContratoPaginator) => {
   const params = {
    request_params: pesquisaParams,
    page: listContratoPaginator.currentPage,
    limit: listContratoPaginator.pageSize
  };

  return async dispatch => {
    dispatch(reset("FiltroContratos"));
    dispatch({ type: "SHOW_OVERLAY" });
    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/contracts/get_all_contracts_by_filter`,
        params
      )
      .then(resp => {
        let maxPagesQtd = resp.data[1];

        if (maxPagesQtd % 1 !== 0) {
          maxPagesQtd = Math.ceil(maxPagesQtd);
        }
        dispatch([
          { type: "CONTRATO_FETCHED", payload: resp.data },
          { type: "CHANGE_LISTCONTRATO_MAX_PAGE_QTD", payload: maxPagesQtd },
          { type: "HIDE_OVERLAY" }
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
        dispatch({ type: "HIDE_OVERLAY" });
      });
  };
};

export function change_listContrato_paginator(paginator) {
  return async dispatch => {
    await dispatch([{ type: "CHANGE_LISTCONTRATO_PAGINATOR", payload: paginator }]);
  };
}

export const getVendorContrato = () => axios.post("contracts/get_vendors");

// export function getFilterList() {
//   return axios.post("/contracts/get_auxiliar_tables");
// }

export const getFilterList = hideLoading => {
  return async dispatch => {
    await axios
      .post(`${process.env.REACT_APP_API_URL}/contracts/get_auxiliar_tables`)
      .then(resp => {
        dispatch({ type: "COMBOS_CONTRATO_FETCHED", payload: resp.data });
        hideLoading();
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
        dispatch([{ type: "HIDE_OVERLAY" }]);
      });
  };
};

export const saveVigenciaContrato = (vigenciaParams, user) => {
  const params = {
    contrato: vigenciaParams,
    user
  };
  return axios.post("/contracts/change_duration", params);
};

export function getContractHistory(contractId) {
  return async dispatch => {
    dispatch([{ type: "SHOW_OVERLAY" }]);
    await axios
      .get(`${process.env.REACT_APP_API_URL}/contract_hist/${contractId}/index`)
      .then(resp => {
        dispatch([
          { type: "CONTRATO_HIST_FETCHED", payload: resp.data },
          { type: "HIDE_OVERLAY" }
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
        dispatch([{ type: "HIDE_OVERLAY" }]);
      });
  };
}

export const get_auxiliar_tables = () => {
  return async dispatch => {
    // dispatch({ type: "SHOW_OVERLAY" });
    await axios
      .post(`${process.env.REACT_APP_API_URL}/contracts/get_auxiliar_tables`)
      .then(resp => {
        dispatch([
          { type: "HIDE_OVERLAY" },
          { type: "AUXILIAR_TABLES_FETCHED", payload: resp.data }
        ]);
      })
      .catch(e => {
        toastr.warning("Atenção", "FALHA AO BUSCAR TABELAS AUXILIARES.");
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

export const save_contract = params => {
  return async dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    await axios
      .post(`${process.env.REACT_APP_API_URL}/contracts/save_contract`, params)
      .then(resp => {
        dispatch({ type: "HIDE_OVERLAY" }, reset("CadastrarContrato"));
        if (resp.status === 200) {
          toastr.success("Contrato salvo.");
        }
      })
      .catch(e => {
        toastr.warning("Atenção", "FALHA AO SALVAR CONTRATO.");
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

export const edit_contract = params => {
  return async dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    await axios
      .post(`${process.env.REACT_APP_API_URL}/contracts/edit_contract`, params)
      .then(resp => {
        dispatch({ type: "HIDE_OVERLAY" });
        if (resp.status === 200) {
          toastr.success("Contrato salvo.");
          window.$("#editar_contrato").modal("hide");
        }
      })
      .catch(e => {
        toastr.warning("Atenção", "FALHA AO SALVAR CONTRATO.");
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

export const get_attachments_and_remarks = params => {
  const value = {
    contract_id: params
  };
  return async dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/contracts/get_attachments_and_remarks`,
        value
      )
      .then(resp => {
        dispatch([
          { type: "HIDE_OVERLAY" },
          { type: "ATTACHMENTS_AND_REMARKS_FETCHED", payload: resp.data }
        ]);
      })
      .catch(e => {
        toastr.warning("Atenção", "FALHA AO BUSCAR DADOS DO CONTRATO.");
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

export const getContractResume = contractId => {
  return async dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/contracts/get_contract_by_resume`,
        { id: contractId }
      )
      .then(resp => {
        dispatch([
          { type: "CONTRATO_RESUME_FETCHED", payload: resp.data },
          { type: "HIDE_OVERLAY" }
        ]);
      })
      .catch(e => {
        toastr.warning("Atenção", "FALHA AO BUSCAR DADOS DO CONTRATO.");
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

export const setOpenVigencia = params => {
  return dispatch => {
    dispatch({ type: "OPEN_VIGENCIA_FETCHED", payload: params });
  };
};

export const setOpenViewContract = params => {
  return dispatch => {
    dispatch({ type: "OPEN_VIEW_CONTRACT_FETCHED", payload: params });
  };
};

export const dispatchFileList = params => {
  return dispatch => {
    dispatch({ type: "SET_FILE_LIST", payload: params });
  };
};

export const destroyForm = formName => {
  return dispatch => {
    dispatch(destroy(formName));
  };
};
