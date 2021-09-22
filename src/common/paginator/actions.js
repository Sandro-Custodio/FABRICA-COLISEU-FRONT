import { reset, toastr } from "react-redux-toastr";

import axios from "axios";
import get from "lodash/get";
import moment from "moment";

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

export function getCancelamentoOtList(auth, ot) {
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

export const getContratoList = (pesquisaParams, listContratoPaginator) => {
  const params = {
    request_params: pesquisaParams,
    page: listContratoPaginator.currentPage,
    limit: listContratoPaginator.pageSize
  };
  return async dispatch => {
    //dispatch(reset("FiltroContratos")); verificar comportamento
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
    await dispatch([
      { type: "CHANGE_LISTCONTRATO_PAGINATOR", payload: paginator }
    ]);
  };
}

export function get_ots(auth, listarOtHigienizar, multi) {
  const { filters, paginator } = listarOtHigienizar;
  const params = {
    filter: { ...filters, code_action: "DR_COA1S1", user_id: auth.id },
    page: paginator.currentPage,
    limit: paginator.pageSize,
    mult: multi
  };
  // To remove blank spaces
  if (params.filter.ot_list) {
    params.filter.ot_list = params.filter.ot_list.replace(/\s/g, "")
  }
  return dispatch => {
    dispatch([{ type: "SHOW_OVERLAY" }]);
    axios
      .post(`${process.env.REACT_APP_API_URL}/projects/get_ots`, params)
      .then(resp => {
        let maxPagesQtd = resp.data[1];

        if (maxPagesQtd % 1 !== 0) {
          maxPagesQtd = Math.ceil(maxPagesQtd);
        }
        dispatch([
          { type: "OTS_FETCHED", payload: resp.data },
          { type: "CHANGE_HIGIEPROGETOS_MAX_PAGE_QTD", payload: maxPagesQtd },
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

export function change_higieProjetos_paginator(paginator) {
  return async dispatch => {
    await dispatch([{ type: "CHANGE_HIGIEPROGETOS_PAGINATOR", payload: paginator }]);
  };
}

export function get_ll_list(auth, ll) {
  const { ll_filters, paginator } = ll;
  const { user } = auth;
  const params = {
    area: { id: user.area.id, code: user.area.code },
    parameter: {
      ...ll_filters,
      created_at_ini: null,
      ll_active_at_end: null,
      snoa_ticket_verification: "",
      created_at_end: null,
      ll_active_at_ini: null
    },
    page: paginator.currentPage,
    limit: paginator.pageSize,
    code_act: "DR_COC1A1"
  };
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
          { type: "LLS_FETCHED", payload: resp.data },
          { type: "CHANGE_LL_MAX_PAGE_QTD", payload: maxPagesQtd }
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

export function change_ot_paginator(paginator) {
  return async dispatch => {
    await dispatch([{ type: "CHANGE_OT_PAGINATOR", payload: paginator }]);
  };
}

export function change_ll_paginator(paginator) {
  return async dispatch => {
    await dispatch([{ type: "CHANGE_LL_PAGINATOR", payload: paginator }]);
  };
}

export function searchUser(searchParams, reducer) {
  const params = {
    name: searchParams?.name || "",
    reg: searchParams?.reg || "",
    page: reducer?.paginator.currentPage || 1
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
          {
            type: "CHANGE_USERS_MAX_PAGE_QTD",
            payload: maxPagesQtd
          }
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
        dispatch({ type: "HIDE_OVERLAY" });
      });
  };
}

export function change_users_paginator(paginator) {
  return async dispatch => {
    await dispatch([{ type: "CHANGE_USERS_PAGINATOR", payload: paginator }]);
  };
}

export const getCriticasHigienizacao = () => async dispatch => {
  await axios
    .post(
      `${process.env.REACT_APP_API_URL}/ot_leasedline_cleanner/get_criticas_higienizacao`
    )
    .then(resp => {
      dispatch({ type: "SET_BDCONFIGIMPORT_CRITICS", payload: resp.data });
    })
    .catch(e => {
      toastr.warning(
        "Atenção",
        "FALHA AO CARREGAR LISTA DE CRITICAS PARA BDCONFIG."
      );
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
    });
};

export const getSnoaHigieneCritics = () => async dispatch => {
  await axios
    .post(`${process.env.REACT_APP_API_URL}/snoa/get_snoa_hygiene_critics`)
    .then(resp => {
      dispatch({ type: "SET_SNOA_CRITICS", payload: resp.data });
    })
    .catch(e => {
      toastr.warning(
        "Atenção",
        "FALHA AO CARREGAR LISTA DE CRITICAS PARA LINKS SNOA."
      );
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
    });
};

export function getEvtList(pesquisaParams, limit = 100, page = 1) {
  const params = {
    o: pesquisaParams,
    limit,
    page
  };

  return dispatch => {
    dispatch([{ type: "SHOW_OVERLAY" }]);
    axios
      .post("/evts/get_all_evts_by_filter", params)
      .then(res => {
        let maxPagesQtd = res.data[1];

        if (maxPagesQtd % 1 !== 0) {
          maxPagesQtd = Math.ceil(maxPagesQtd);
        }

        const rows = res.data[0].map(r => ({
          ots: r.ot_code,
          enderecoA: r.ot.address_a_id,
          interfaceA: r.ot.element_a_interface,
          enderecoB: r.ot.address_b_id,
          interfaceB: r.ot.element_b_interface,
          situacao: r.description,
          evt: r.request_protocol,
          provedor: r.vendor_name,
          pms: r.pms_id !== null ? "Sim" : "Não",
          mes: `R$ ${get(r, "monthly_cost", 0)}`,
          inst: `R$ ${get(r, "installation_cost", 0)}`,
          proj: `R$ ${get(r, "project_cost", 0)}`,
          qtd: r.quantity,
          pzConst: r.contract_time,
          pzAtiv: r.activation_time,
          pzResp: r.deadline_at
            ? moment(r.deadline_at).format("DD/MM/YYYY")
            : "",
          status: r.status_name
        }));

        const rows_view = res.data[0].map(r => ({
          evt_id: r.id,
          ot_segmentation_id: r.ot_segmentation.id,
          vendor_id: r.vendor_id,
          qtd_links: r.ot_segmentation?.qtd_links
        }));

        dispatch([
          {
            type: "SET_ROWS",
            payload: rows
          },
          { type: "CHANGE_EVT_MAX_PAGE_QTD", payload: maxPagesQtd },
          {
            type: "SET_QUANTIDADE_TOTAL_REGISTROS",
            payload: res.data[2]
          },
          { type: "SET_ROWS_VIEW", payload: rows_view }
        ]);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        dispatch([{ type: "HIDE_OVERLAY" }]);
      });
  };
}

export function change_evt_paginator(paginator) {
  return async dispatch => {
    await dispatch([{ type: "CHANGE_EVT_PAGINATOR", payload: paginator }]);
  };
}
