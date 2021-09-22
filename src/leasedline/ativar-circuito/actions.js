import axios from "axios";
import { toastr } from "react-redux-toastr";
import { reset } from "redux-form";

export const activate_leasedline = params => {
  return dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/ot_ll/activate_leasedline`,
        params
      )
      .then(resp => {
        window.$("#ativar_circuito").modal("hide");
        dispatch({ type: "HIDE_OVERLAY" });
        dispatch(reset("AtivarCircuito"));
        setTimeout(() => {
          toastr.success("Circuito Ativado", resp.data.ll.ll_guid, {
            timeOut: 0
          });
        }, 2500);
      })
      .catch(e => {
        toastr.warning("Atenção", "FALHA AO ATIVAR CIRCUITO.");
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
};

export const has_stop_times_open = params => {
  return new Promise(resolve =>
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/ll_stop_times/has_stop_times_open`,
        params
      )
      .then(response => resolve({ resp: response.data }))
      .catch(() => {
        toastr.error("Erro", "");
        resolve();
      })
  );
};
