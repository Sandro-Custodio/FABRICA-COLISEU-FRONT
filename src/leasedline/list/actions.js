import axios from "axios";
import { toastr } from "react-redux-toastr";

export function get_ll_list(auth, ll) {
  const { ll_filters } = ll;
  const { user } = auth;

  if (ll_filters.ot_code) {
    ll_filters.ot_code = ll_filters.ot_code.replace(/\s/g, "")
  }
  if (ll_filters.circuit_id_multiple) {
    ll_filters.circuit_id_multiple = ll_filters.circuit_id_multiple.replace(/\s/g, "")
  }
  if (ll_filters.id_circuit_bill) {
    ll_filters.id_circuit_bill = ll_filters.id_circuit_bill.replace(/\s/g, "")
  }
  if (ll_filters.ll_grid_multiple) {
    ll_filters.ll_grid_multiple = ll_filters.ll_grid_multiple.replace(/\s/g, "")
  }
  if (ll_filters.ll_guids) {
    ll_filters.ll_guids = ll_filters.ll_guids.replace(/\s/g, "")
  }
  if (ll_filters.snoa_ticket_multiple) {
    ll_filters.snoa_ticket_multiple = ll_filters.snoa_ticket_multiple.replace(/\s/g, "")
  }
  if (ll_filters.work_order) {
    ll_filters.work_order = ll_filters.work_order.replace(/\s/g, "")
  }
  if (ll_filters.os_id) {
    ll_filters.os_id = ll_filters.os_id.replace(/\s/g, "")
  }

  const params = {
    area: { id: user.area.id, code: user.area.code },
    parameter: {
      ...ll_filters,
      //created_at_ini: null,
      //ll_active_at_end: null,
      //snoa_ticket_verification: "",
      //created_at_end: null,
      //ll_active_at_ini: null
    },
    page: 1,
    limit: 100,
    code_act: "DR_COC1A1"
  };

  //console.log("@@@@@@params@@@@@@@", params);
  return dispatch => {
    dispatch([{ type: "SHOW_OVERLAY" }]);
    axios
      .post(`${process.env.REACT_APP_API_URL}/ot_ll/get_all_by_filter`, params)
      .then(resp => {
        let maxPagesQtd = resp.data[1];

        if (maxPagesQtd % 1 !== 0) {
          maxPagesQtd = Math.ceil(maxPagesQtd);
        }
        dispatch([
          { type: "CHANGE_LL_MAX_PAGE_QTD", payload: maxPagesQtd },
          { type: "LLS_FETCHED", payload: resp.data }
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

export function load_ll_filters() {
  const params = {
    area: { code: "MSE" }
  };
  return dispatch => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/ot_ll/get_filter_list`, params)
      .then(resp => {
        dispatch([{ type: "LL_FILTERS_FETCHED", payload: resp.data }, { type: "CHANGE_LL_MAX_PAGE_QTD",  payload: 1 }]);
      })
      .catch(e => {
        toastr.error("Erro", "FILTROS DE OT NÃO CARREGADOS.");
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
  };
}

/*export function clear_filters(auth, ot) {
  return dispatch => {
    dispatch([
      { type: "LL_CLEAR_FILTERS" },
      get_ll_list(auth, { ll_filters: {}, paginator: ot.paginator })
    ]);
  };
}m*/

export function clear_filters() {
  return dispatch => {
    dispatch([{ type: "LL_CLEAR_FILTERS" }]);
  };
}

export function clear_list_and_filters() {
  return dispatch => {
    dispatch([
      { type: "LLS_FETCHED", payload: [[]] },
      { type: "LL_CLEAR_FILTERS" },
      { type: "HIDE_OVERLAY" }
    ]);
  };
}

export function change_ll_paginator(paginator) {
  return async dispatch => {
    await dispatch([{ type: "CHANGE_LL_PAGINATOR", payload: paginator }]);
  };
}

export function changeFilterLL(ll_filters) {
  return dispatch => {
    dispatch([{ type: "LL_CHANGE_FILTER", payload: ll_filters }]);
  };
}

export function changeTempFilterLL(filter) {
  return dispatch => {
    dispatch([{ type: "LL_CHANGE_TEMP_FILTER", payload: filter }]);
  };
}


export const get_leasedlines_data = ll_id => {
  const params = {
    ll_id: ll_id
  };
  return async dispatch => {
    dispatch([{ type: "SHOW_OVERLAY" }]);
    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/ot_ll/get_leasedlines_data`,
        params
      )
      .then(resp => {
        dispatch([
          { type: "LEASEDLINE_DATA_FETCHED", payload: resp.data },
          { type: "HIDE_OVERLAY" }
        ]);
      })
      .catch(e => {
        toastr.warning("Atenção", "FALHA AO CARREGAR DADOS DA LL.");
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

export const update_ll = params => {
  return async dispatch => {
    dispatch([{ type: "SHOW_OVERLAY" }]);
    await axios
      .post(`${process.env.REACT_APP_API_URL}/ot_ll/update_ll`, params)
      .then(resp => {
        dispatch({ type: "HIDE_OVERLAY" });
        toastr.success("LL atualizada com sucesso.");
      })
      .catch(e => {
        toastr.warning("Atenção", "FALHA AO ALTERAR LL.");
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

export const get_all_demand_classifications = () => {
  return async dispatch => {
    await axios
      .get(
        `${process.env.REACT_APP_API_URL}/demand_classifications/get_all_demand_classifications`
      )
      .then(resp => {
        dispatch({ type: "DEMAND_CLASSIFICATIONS_FETCHED", payload: resp.data });
      })
      .catch(e => {
        toastr.warning("Atenção", "FALHA AO CARREGAR CLASSIFICAÇÕES DE DEMANDA.");
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
  };
};
