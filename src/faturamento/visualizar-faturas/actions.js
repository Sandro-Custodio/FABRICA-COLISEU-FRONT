import axios from "axios";
import { toastr } from "react-redux-toastr";
import { reset } from "redux-form";

export const getFaturaList = values => {
  const params = {
    filter_fields: values,
    3: "DR_COF1B1",
    2: 100,
    qtd_bills: 100
  };
  return dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/bills/get_all_bills_by_filter`,
        params
      )
      .then(resp => {
        dispatch([
          { type: "HIDE_OVERLAY" },
          { type: "SET_BILL_LIST", payload: resp.data }
        ]);
      })
      .catch(e => {
        toastr.warning("Atenção", "FALHA AO CARREGAR FATURAS.");
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

export const get_operators_and_vendors = () => {
  return dispatch => {
    dispatch([{ type: "SHOW_OVERLAY" }]);
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/bills/get_operators_and_vendors`,
        {}
      )
      .then(resp => {
        dispatch([
          { type: "HIDE_OVERLAY" },
          { type: "SET_BILL_LIST_FILTERS", payload: resp.data }
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

export const reclassify_rules = params => {
  return async dispatch => {
    dispatch([{ type: "SHOW_OVERLAY" }]);
    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/bill_classifications/reclassify_rules`,
        params
      )
      .then(resp => {
        dispatch({ type: "HIDE_OVERLAY" });
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

export const save_value = params => {
  return async dispatch => {
    dispatch([{ type: "SHOW_OVERLAY" }]);
    await axios
      .post(`${process.env.REACT_APP_API_URL}/bill/save_value`, params)
      .then(resp => {
        dispatch({ type: "HIDE_OVERLAY" });
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

export const get_all_bill_dd = params => {
  return dispatch => {
    dispatch([{ type: "SHOW_OVERLAY" }]);
    axios
      .post(`${process.env.REACT_APP_API_URL}/bills/get_all_bill_dd`, params)
      .then(resp => {
        dispatch([
          { type: "HIDE_OVERLAY" },
          { type: "SET_BILL_DD_WITH_CLASSIFICATIONS", payload: resp.data }
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

export const get_groups = params => {
  return dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    axios
      .post(`${process.env.REACT_APP_API_URL}/bills/get_groups`, params)
      .then(resp => {
        dispatch([
          { type: "HIDE_OVERLAY" },
          { type: "GROUPS_FETCHED", payload: resp.data }
        ]);
      })
      .catch(e => {
        toastr.warning("Atenção", "FALHA AO CARREGAR AGRUPADORES.");
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

export const invalidate_bill = params => {
  return async dispatch => {
    dispatch([{ type: "SHOW_OVERLAY" }]);
    await axios
      .post(`${process.env.REACT_APP_API_URL}/bills/invalidate_bill`, params)
      .then(resp => {
        dispatch({ type: "HIDE_OVERLAY" });
      })
      .catch(e => {
        toastr.warning("Atenção", "FALHA AO INVALIDAR FATURA.");
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

export const update_dd_previo = params => {
  return dispatch => {
    dispatch([{ type: "SHOW_OVERLAY" }]);
    axios
      .post(`${process.env.REACT_APP_API_URL}/bills/update_dd_previo`, params)
      .then(resp => {
        dispatch({ type: "HIDE_OVERLAY" });
        window.$("#atualizar_dd_definitivo").modal("hide");
      })
      .catch(e => {
        toastr.warning("Atenção", "FALHA AO ATUALIZAR DD.");
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
