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
    dispatch([reset("primeiroFaturamento"), change_field("rede", "MÓVEL")]);
};

export const clear_field = field => {
  return dispatch => dispatch(change("primeiroFaturamento", field, null));
};

export const change_field = (field, value) => {
  return dispatch => dispatch(change("primeiroFaturamento", field, value));
};

export const get_1_fat = ({ params, page, limit }) => {
  Object.entries(params).forEach(([key, value]) => {
    if (params[key] === "false") delete params[key];
  });
  if (params.MesIniCom && params.MesIniCom.length === 10) {
    params.MesIniCom = params.MesIniCom.slice(3, 10)
  }
  if (params.MesFimCom && params.MesFimCom.length === 10) {
    params.MesFimCom = params.MesFimCom.slice(3, 10)
  }
  if (params.MesIniRef && params.MesIniRef.length === 10) {
    params.MesIniRef = params.MesIniRef.slice(3, 10)
  }
  if (params.MesFimRef && params.MesFimRef.length === 10) {
    params.MesFimRef = params.MesFimRef.slice(3, 10)
  }
  if (params.MesIniAti && params.MesIniAti.length === 10) {
    params.MesIniAti = params.MesIniAti.slice(3, 10)
  }
  if (params.MesFimAti && params.MesFimAti.length === 10) {
    params.MesFimAti = params.MesFimAti.slice(3, 10)
  }
  return async dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    await axios
      .post("/bill_reports/get_1_fat", { params, page, limit })
      .then(res =>
        dispatch([
          { type: "GET_1_FAT", payload: res.data },
          { type: "HIDE_OVERLAY" }
        ])
      )
      .catch(e => dispatch(handle_error(e)));
  };
};

export const export_all = (columns, data) => {
  return async dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    await axios
      .post("/bill_reports/", { no_limit: true })
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
