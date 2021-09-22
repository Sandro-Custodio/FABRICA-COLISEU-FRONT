import axios from "axios";
import { toastr } from "react-redux-toastr";


export function getOtList(auth, ot) {

  const { filters, paginator } = ot;
  const { user } = auth;
  const params = {
    "0": { ...filters, user_id: user.id, code_action: "DR_COA1B1" },
    "1": paginator.currentPage,
    "2": paginator.pageSize,
    "3": ""
  };
  return dispatch => {
    dispatch([{ type: "SHOW_OVERLAY" }]);
    axios
      .post(`${process.env.REACT_APP_API_URL}/ots/list`, params)
      .then(resp => {
        let maxPagesQtd = resp.data[1];

        if (maxPagesQtd % 1 !== 0) {
          maxPagesQtd = Math.ceil(maxPagesQtd);
        }
        dispatch([
          { type: "OTS_FETCHED", payload: resp.data },
          { type: "CHANGE_OT_MAX_PAGE_QTD", payload: maxPagesQtd }
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

export function getOtConsultList(auth, ot) {
  const { filters, paginator } = ot;
  const { user } = auth;
  const params = {
    "0": { ...filters, user_id: user.id, code_action: "DR_COA1G1" },
    "1": paginator.currentPage,
    "2": paginator.pageSize,
    "3": ""
  };
  return dispatch => {
    dispatch([{ type: "SHOW_OVERLAY" }]);
    axios
      .post(`${process.env.REACT_APP_API_URL}/ots/list`, params)
      .then(resp => {
        let maxPagesQtd = resp.data[1];

        if (maxPagesQtd % 1 !== 0) {
          maxPagesQtd = Math.ceil(maxPagesQtd);
        }
        dispatch([
          { type: "OTS_FETCHED", payload: resp.data },
          { type: "CHANGE_OT_MAX_PAGE_QTD", payload: maxPagesQtd }
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

export function load_filters() {
  return dispatch => {
    dispatch([{ type: "SHOW_OVERLAY" }]);
    axios
      .post(`${process.env.REACT_APP_API_URL}/ots/get_filter_list`, {})
      .then(resp => {
        dispatch([
          { type: "CHANGE_OT_MAX_PAGE_QTD", payload: 1 },
          { type: "FILTERS_FETCHED", payload: resp.data }
        ]);
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
      })
      .finally(() => {
        dispatch([{ type: "HIDE_OVERLAY" }]);
      });
  };
}

export function change_ot_paginator(paginator) {
  return async dispatch => {
    await dispatch([{ type: "CHANGE_OT_PAGINATOR", payload: paginator }]);
  };
}

export function clear_filters(auth, ot) {
  return dispatch => {
    dispatch([
      { type: "CLEAR_FILTERS" },
      getOtList(auth, { filters: {}, paginator: ot.paginator }),
      { type: "HIDE_OVERLAY" }
    ]);
  };
}

export function clear_filter() {
  return dispatch => {
    dispatch([{ type: "CLEAR_FILTERS" }, { type: "HIDE_OVERLAY" }]);
  };
}

export function clear_list_and_filters() {
  return dispatch => {
    dispatch([
      { type: "OTS_FETCHED", payload: [[]] },
      { type: "CLEAR_FILTERS" },
      { type: "HIDE_OVERLAY" }
    ]);
  };
}

export async function download_seg() {
  axios
    .get(`${process.env.REACT_APP_API_URL}/ot_segmentations/download_seg`, {
      data: { path: "test_download.zip" }
      // headers: { responseType: "blob" }
    })
    .then(res => {
      console.log(res);

      //  url =  window.location.href = "localhost:3003/anexos_projetos";
    })
    .catch(e => {
      console.log(e);
    });
}

// export default props => ({ type: 'CHANGE_TO_VISUALIZE', payload: true })
