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
    dispatch([reset("faturasInvalidas"), change_field("rede", "MÓVEL")]);
};

export const clear_field = field => {
  return dispatch => dispatch(change("faturasInvalidas", field, null));
};

export const change_field = (field, value) => {
  return dispatch => dispatch(change("faturasInvalidas", field, value));
};

export const get_all_faturas_invalidas = ({ params, limit, page }) => {
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
      .post("/bill_reports/get_all_faturas_invalidas", { params, limit, page })
      .then(res =>
        dispatch([
          { type: "GET_ALL_FATURAS_INVALIDAS", payload: res.data },
          { type: "HIDE_OVERLAY" }
        ])
      )
      .catch(e => dispatch(handle_error(e)));
  };
};

export const export_all = ({ params }) => {
  return async dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    await axios
      .post("/bill_reports/get_all_faturas_invalidas", {
        params,
        no_limit: true
      })
      .then(res => {
        dispatch({ type: "EXPORT_ALL", payload: res.data.rows });
        setTimeout(() => {
          window.$("#export-all").click();
          dispatch({ type: "HIDE_OVERLAY" });
        }, 2000);
      })
      .catch(e => dispatch(handle_error(e)));
  };
};
