import axios from "axios";
import { toastr } from "react-redux-toastr";

export function getOtList(auth, ot) {
  const { filters, paginator } = ot;
  const { user } = auth;
  const params = {
    "0": {
      ...filters,
      user_id: user.id,
      code_action: "DR_COA1I1B1",
      check_cancel: true
    },
    "1": paginator.currentPage,
    "2": paginator.pageSize,
    "3": null
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
          { type: "CHANGE_OT_MAX_PAGE_QTD", payload: maxPagesQtd },
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

export function load_filters() {
  return dispatch => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/ots/get_filter_list`, {})
      .then(resp => {
        dispatch([{ type: "FILTERS_FETCHED", payload: resp.data }]);
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

export function clear_filters(auth, ot) {
  return dispatch => {
    dispatch([
      { type: "CLEAR_FILTERS" },
      getOtList(auth, { filters: {}, paginator: ot.paginator })
    ]);
  };
}

export const solicitarCancelamento = (
  ot_id,
  user_id,
  area_id,
  remarks,
  ot_code
) => {
  return async dispatch => {
    const params = {
      ot_id,
      parameter: {
        user_id,
        area_id,
        remarks
      }
    };
    await axios
      .post(`${process.env.REACT_APP_API_URL}/ots/solicit_cancel_ot`, params)
      .then(resp => {
        toastr.success(
          `Solicitação de Cancelamento de ${ot_code} realizada com sucesso!`
        );
        dispatch([{ type: "SOLICITAR_CANCELAMENTO_OT", payload: resp.data }]);
      })
      .catch(e => {
        toastr.warning("Atenção", "FALHA AO SOLICITAR CANCELAMENTO DE OT.");
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

export const showOverlay = () => {
  return dispatch => dispatch([{ type: "SHOW_OVERLAY" }]);
};

export const hideOverlay = () => {
  return dispatch => dispatch([{ type: "HIDE_OVERLAY" }]);
};
