import axios from "axios";
import { toastr } from "react-redux-toastr";

export default function upload_list(data) {
  const formData = new FormData();

  formData.append("data", data);
  return axios({
    url: "/ots/upload_list",
    method: "post",
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      "Content-Type": "application/octet-stream"
    },
    data: formData
  })
    .then(res => {
      toastr.success(
        "Success",
        `O upload do arquivo ${res.data.original_filename} foi feito com sucesso!`,
        null
      );
    })
    .catch(e => {
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
      // dispatch([{ type: "HIDE_OVERLAY" }]);
    });
}

export const get_sm_seg_history = params => {
  return axios
    .post(
      `${process.env.REACT_APP_API_URL}/ot_segmentations/get_sm_seg_history`,
      { ot_seg_id: params }
    )
    .then(resp => resp.data)
    .catch(e => {
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
      return [];
    });
};

export const confirm_cancel_segment = params => {
  return axios
    .post(
      `${process.env.REACT_APP_API_URL}/ot_segmentations/confirm_cancel_segment`,
      params
    )
    .then(resp => resp.data)
    .catch(e => {
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
      return [];
    });
};
