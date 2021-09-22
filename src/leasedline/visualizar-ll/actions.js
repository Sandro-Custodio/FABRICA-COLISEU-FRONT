import axios from "axios";
import { toastr } from "react-redux-toastr";

export default function get_leasedlines_data_view(ll_id) {
  const params = {
    ll_id
  };
  return dispatch => {
    dispatch([{ type: "SHOW_OVERLAY" }]);
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/ot_ll/get_leasedlines_data_view`,
        params
      )
      .then(resp => {
        dispatch([
          { type: "LL_FETCHED", payload: resp.data },
          { type: "HIDE_OVERLAY" }
        ]);
      })
      .catch(e => {
        toastr.warning("Atenção", "FALHA AO CARREGAR LEASEDLINE.");
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
