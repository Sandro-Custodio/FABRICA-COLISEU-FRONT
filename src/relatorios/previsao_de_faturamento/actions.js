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

export const get_bill_prevision = ({
  operator,
  agrupador,
  mes_ref,
  vendor,
  rede,
  circuito
}) => {
  return async dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    await axios
      .post("/bill_reports/get_bill_prevision", {
        operator,
        agrupador,
        mes_ref,
        vendor,
        rede,
        circuito
      })
      .then(res =>
        dispatch([
          { type: "GET_BILL_PREVISION", payload: res.data },
          { type: "HIDE_OVERLAY" }
        ])
      )
      .catch(e => dispatch(handle_error(e)));
  };
};

export const get_circuit_sum = (agrupador, mes_ref) => {
  return async dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    await axios
      .post("/bill_reports/get_circuit_sum", { agrupador, mes_ref })
      .then(res =>
        dispatch([
          { type: "GET_CIRCUIT_SUM", payload: res.data },
          { type: "HIDE_OVERLAY" }
        ])
      )
      .catch(e => dispatch(handle_error(e)));
  };
};

export const clear_filter = () => {
  return async dispatch =>
    await dispatch([
      reset("previsaoDeFaturamento"),
      change_field("rede", "MÓVEL")
    ]);
};

export const clear_field = field => {
  return async dispatch =>
    await dispatch(change("previsaoDeFaturamento", field, "false"));
};

export const change_field = (field, value) => {
  return async dispatch =>
    await dispatch(change("previsaoDeFaturamento", field, value));
};

export const clear_circuits = () => dispatch =>
  dispatch({ type: "CLEAR_CIRCUITS" });
