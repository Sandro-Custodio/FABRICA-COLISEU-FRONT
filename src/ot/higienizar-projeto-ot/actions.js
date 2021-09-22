import axios from "axios";
import { reset } from "redux-form";
import { toastr } from "react-redux-toastr";

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
      get_ots(auth, { filters: {} }, false)
    ]);
  };
}

export function loadFieldsOtForm() {
  console.log("loadFieldsOtForm");
  return dispatch => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/ots/get_filter_save_list`, {})
      .then(resp => {
        dispatch([{ type: "FIELDS_OT_PROJECT_FETCHED", payload: resp.data }]);
      })
      .catch(e => {
        toastr.error(
          "Erro",
          "ALGUNS CAMPOS NO FORMULÁRIO NÃO FORAM CARREGADOS."
        );
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

export function set_ot_project_multi(list, selection, project, subproject) {
  let ot_ids = [];
  // console.log("-=-=-=-=-=-=-");
  // console.log(list);
  // console.log(selection);
  // console.log(project);
  // console.log(subproject);

  selection.forEach(item => {
    ot_ids = ot_ids.concat(list[item].id);
  });

  const params = {
    ot_ids,
    proj_id: project.id,
    spro_id: subproject.id
  };
  return dispatch => {
    dispatch([{ type: "SHOW_OVERLAY" }]);
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/projects/set_ot_project_multi`,
        params
      )
      .then(resp => {
        if (resp.status === 200) {
          window.$("#editar_projeto_ot").modal("hide");
          const toastrOptions = {
            timeOut: 0
          };
          toastr.success(
            "PROJETO/SUBPROJETO DA OT HIGIENIZADO",
            "",
            toastrOptions
          );
        } else {
          toastr.info("Erro", "FALHA AO HIGIENIZAR PROJETO OT");
        }
        dispatch([{ type: "HIDE_OVERLAY" }, reset()]);
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

export default function changeFilterOT(filter) {
  return dispatch => {
    dispatch([{ type: "CHANGE_FILTER", payload: filter }]);
  };
}
