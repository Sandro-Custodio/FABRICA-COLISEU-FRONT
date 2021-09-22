import axios from "axios";
import { toastr } from "react-redux-toastr";

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

export const get_combos = show => {
  return async dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    await axios
      .post("/bill_reports/get_combos")
      .then(res => {
        dispatch([
          { type: "GET_COMBOS", payload: res.data },
          { type: "HIDE_OVERLAY" }
        ]);
      })
      .catch(e => dispatch(handle_error(e)));
  };
};

export const get_groups = (
  vendor_id = 1000000000,
  operator_id = 1000000000,
  rede = 1000000000
) => {
  return async dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    await axios
      .post("/bills/get_groups", { vendor_id, operator_id, rede })
      .then(res => {
        dispatch([
          { type: "GET_GROUPS", payload: res.data },
          { type: "HIDE_OVERLAY" }
        ]);
      })
      .catch(e => dispatch(handle_error(e)));
  };
};

export const get_months = () => {
  return async dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    await axios
      .post("/bills/get_months")
      .then(res =>
        dispatch([
          { type: "GET_MONTHS", payload: res.data },
          { type: "HIDE_OVERLAY" }
        ])
      )
      .catch(e => dispatch(handle_error(e)));
  };
};

export const get_operators_and_vendors = () => {
  return async dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    await axios
      .post("/bills/get_operators_and_vendors")
      .then(res =>
        dispatch([
          { type: "GET_OPERATORS_AND_VENDORS", payload: res.data },
          { type: "HIDE_OVERLAY" }
        ])
      )
      .catch(e => dispatch(handle_error(e)));
  };
};
