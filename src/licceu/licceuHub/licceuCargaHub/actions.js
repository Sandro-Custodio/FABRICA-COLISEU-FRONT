import axios from "axios";
import { toastr } from "react-redux-toastr";

const baseURL = process.env.REACT_APP_API_URL_JAVA;

export const uploadHubFile = formData => {
  return dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    axios({
      method: "post",
      url: "hub/upload",
      baseURL,
      headers: {
        "content-type":
          "multipart/form-data; boundary=--------------------------449000853760909950360697"
      },
      data: formData
    })
      .then(resp => {
        dispatch([
          {
            type: "UPLOAD_HUB_FILE",
            payload: resp.data
          },
          {
            type: "HIDE_OVERLAY"
          }
        ]);
        toastr.info("Carga realizada com sucesso");
      })
      .catch(err => {
        toastr.error(
          String(err.response.data.message),
          err.response.statusText
        );
        dispatch({ type: "HIDE_OVERLAY" });
      });
  };
};

export const confirmUpload = (uploadData, useStatusUrl) => {
  return dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    axios({
      method: "post",
      url: `hub/${
        useStatusUrl ? "salvar-novo-link-status" : "salvar-novo-link"
      }`,
      baseURL,
      headers: {
        "content-type": "application/json"
      },
      data: uploadData.jobExecutionId
    })
      .then(() => {
        dispatch([
          {
            type: "HIDE_OVERLAY"
          }
        ]);
        toastr.info(`${uploadData.count} linha(s) salva(s) com sucesso`);
      })
      .catch(err => {
        toastr.error(
          String(err.response.data.message),
          err.response.statusText
        );
        dispatch({ type: "HIDE_OVERLAY" });
      });
  };
};

export const showDetalhes = uploadData => {
  return dispatch => {
    axios({
      method: "post",
      url: "hub/detalhes",
      baseURL,
      data: {
        critica: uploadData.critica,
        jobExecutionId: uploadData.jobExecutionId
      }
    })
      .then(resp => {
        dispatch([
          {
            type: "DETALHES_UPLOAD",
            payload: resp.data
          }
        ]);
      })
      .catch(err => {
        toastr.error(
          String(err.response.data.message),
          err.response.statusText
        );
      });
  };
};
