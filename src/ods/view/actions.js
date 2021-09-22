import axios from "axios";
import { toastr } from "react-redux-toastr";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const handleError = e => dispatch => {
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

export const getOdByCode = code => {
  return async dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    await axios
      .post(`/ods/construct_od_query/`, {
        filter: {},
        flag: code,
        page: 1,
        qtd_page: 1
      })
      .then(res => {
        const od = res.data.odsRows[0];
        dispatch({ type: "GET_OD_BY_CODE", payload: od });
        dispatch({ type: "HIDE_OVERLAY" });
      })
      .catch(e => dispatch(handleError(e)));
  };
};
