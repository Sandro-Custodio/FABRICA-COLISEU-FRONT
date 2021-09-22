import axios from "axios";
import { toastr } from "react-redux-toastr";
import { reset, change } from "redux-form";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const handle_error = e => dispatch => {
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
  dispatch({ type: "HIDE_OVERLAY" });
};

export const clear_filter = () => {
  return dispatch =>
    dispatch([reset("inconsistencias"), change_field("rede", "MÓVEL")]);
};

export const clear_field = field => {
  return dispatch => dispatch(change("inconsistencias", field, null));
};

export const change_field = (field, value) => {
  return dispatch => dispatch(change("inconsistencias", field, value));
};

export const get_all_inconsistency = () => {
  return async dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    await axios
      .post("/bill_reports/get_all_inconsistency")
      .then(res =>
        dispatch([
          { type: "GET_ALL_INCONSISTENCY", payload: res.data.result },
          { type: "HIDE_OVERLAY" }
        ])
      )
      .catch(e => dispatch(handle_error(e)));
  };
};

export const get_all_grid_exports = ({ model_name, user_id }) => {
  return async dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    await axios
      .post("/grid_exports/get_all", { model_name, user_id })
      .then(res =>
        dispatch([
          { type: "GET_ALL_GRID_EXPORTS", payload: res.data },
          { type: "HIDE_OVERLAY" }
        ])
      )
      .catch(e => dispatch(handle_error(e)));
  };
};

export const delete_grid_by_user = ({ model_name, user_id }) => {
  return async dispatch => {
    // dispatch({ type: "SHOW_OVERLAY" })
    await axios
      .post("/grid_exports/delete_by_user", { model_name, user_id })
      .then(_ => { })
      .catch(e => dispatch(handle_error(e)));
  };
};

export const save_grid_export = (
  { user_id, grid_export_id },
  get_grids = false
) => {
  return async dispatch => {
    // dispatch({ type: "SHOW_OVERLAY" })
    await axios
      .post("/grid_exports/save_export", { user_id, grid_export_id })
      .then(res => {
        if (get_grids)
          dispatch(
            get_all_grid_exports({
              user_id,
              model_name: "inconsistency_report"
            })
          );
      })
      .catch(e => dispatch(handle_error(e)));
  };
};

export const show_overlay = () => dispatch =>
  dispatch({ type: "SHOW_OVERLAY" });

export const hide_overlay = () => dispatch =>
  dispatch({ type: "HIDE_OVERLAY" });

export const get_all_justifications = () => {
  return async dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    await axios
      .post("/bill_conciliates/get_all_justifications")
      .then(res =>
        dispatch([
          { type: "GET_ALL_JUSTIFICATIONS", payload: res.data },
          { type: "HIDE_OVERLAY" }
        ])
      )
      .catch(e => dispatch(handle_error(e)));
  };
};

export const get_report_inconsistence = ({ params, limit, page }) => {
  Object.entries(params).forEach(([key, value]) => {
    if (params[key] === "false") delete params[key];
  });

  if (params.month_begin && params.month_begin.length === 10) {
    params.month_begin = params.month_begin.slice(3, 10)
  }
  if (params.month_end && params.month_end.length === 10) {
    params.month_end = params.month_end.slice(3, 10)
  }
  if (params.competence_month && params.competence_month.length === 10) {
    params.competence_month = params.competence_month.slice(3, 10)
  }

  return async dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    await axios
      .post("/bill_reports/get_report_inconsistence", { params, limit, page })
      .then(res =>
        dispatch([
          { type: "GET_REPORT_INCONSISTENCE", payload: res.data },
          { type: "HIDE_OVERLAY" }
        ])
      )
      .catch(e => dispatch(handle_error(e)));
  };
};

export const export_all = ({ params, user_id, access_token }) => {
  return async dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    await axios
      .post("/bill_reports/send_detail_bill_inconsistency_data_url", {
        params: {
          ...params,
          logged_user_id: user_id
        },
        user_id,
        code: "DR_COF1J1D1",
        no_limit: true
      })
      .then(res => {
        download(res.data, access_token)
        setTimeout(() => {
          dispatch({ type: "HIDE_OVERLAY" });
        }, 2000);
      })
      .catch(e => dispatch(handle_error(e)));
  };
};

export function download(filename, token) {
  fetch(`${process.env.REACT_APP_API_URL}/download`, {
    method: "POST",
    headers: { Authorization: token, "Content-Type": "application/json" },
    body: JSON.stringify({
      path: `${filename}`//filename de resposta já contém path nesse caso
    })
  })
    .then(resp => {
      if (resp.status === 200) {
        return resp.blob();
      } else {
        toastr.error("ERRO", "Arquivo não encontrado");
      }
    })
    .then(blob => {
      if (!blob) {
        return;
      }
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    });
}

export const upload_file = file => {
  return async dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    let formData = new FormData();
    formData.append("file", file);
    await axios
      .post("/bill_reports/import_files_inconsistency", formData, {
        headers: { "Content-Type": "multipart/form-data", charset: "utf-8" }
      })
      .then(res => {
        dispatch({ type: "UPLOAD_FILE", payload: res.data });
        dispatch({ type: "HIDE_OVERLAY" });
      })
      .catch(e => dispatch(handle_error(e)));
  };
};

export const open_import_modal = () => {
  return dispatch => {
    dispatch([
      {
        type: "UPLOAD_FILE",
        payload: {
          inconsistencias: [],
          erros: 0,
          ok: 0,
          file: ""
        }
      },
      () => window.$("#import").modal("show")
    ]);
  };
};

export const send_import = (data, ok) => {
  return async dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    await axios
      .post("/bill_reports/send_import_report_inconsistence", data)
      .then(res => {
        dispatch([
          {
            type: "UPLOAD_FILE",
            payload: {
              inconsistencias: [],
              erros: 0,
              ok: 0,
              file: ""
            }
          },
          { type: "HIDE_OVERLAY" }
        ]);
        window.$(".modal").modal("hide");
        toastr.success(`${ok} Item(s) importado(s) com sucesso!`);
      })
      .catch(e => dispatch(handle_error(e)));
  };
};
