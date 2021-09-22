import axios from "axios";
import { toastr } from "react-redux-toastr";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

export default od_id =>
  axios
    .post("ot_leasedlines/get_related_lls", { od_id })
    .catch(() => toastr.error("Erro", "Erro ao buscar lista"));

export const getDetails = od_id =>
  axios
    .get(`ot_leasedlines/get_ll_details/${od_id}`)
    .catch(() => toastr.error("Erro", "Erro ao buscar dados"));

export const updateOd = params =>
  axios({
    method: "post",
    url: "ods/update_od",
    data: params
  });

export const getAllStatus = () => async dispatch => {
  dispatch({ type: "SHOW_OVERLAY" });
  return axios
    .post("sds/get_all_status")
    .then(res => res.data, dispatch({ type: "HIDE_OVERLAY" }))
    .catch(
      () => toastr.error("Erro", "Erro ao buscar dados"),
      dispatch({ type: "HIDE_OVERLAY" })
    );
};

export const hideOverlay = () => dispatch => dispatch({ type: "HIDE_OVERLAY" });
