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

export const get_post_fat = ({ page, limit }) => {
  return async dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    await axios
      .post("/bill_reports/get_pos_fat", { page, limit })
      .then(res =>
        dispatch([
          { type: "GET_POS_FAT", payload: res.data },
          { type: "HIDE_OVERLAY" }
        ])
      )
      .catch(e => dispatch(handle_error(e)));
  };
};

export const export_all = ({ access_token }) => {
  return async dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    await axios
      .post("/bill_reports/send_pos_fat_report", { code: "DR_COF1J1L1", no_limit: true })
      .then(res => {
        dispatch({ type: "EXPORT_ALL", payload: res.data.rows });
        setTimeout(() => {
         // window.$("#export-all").click();
          download(res.data, access_token)
          dispatch({ type: "HIDE_OVERLAY" });
        }, 2000);
      })
      .catch(e => dispatch(handle_error(e)));
  };
};

export function download(filename, token) {
  fetch(`${process.env.REACT_APP_API_URL}/download`, {
    method: "POST",
    headers: { Authorization: token, "Content-Type": "application/json" },
    body: JSON.stringify({
      path: `${filename}`//filename de resposta já contém path nesse caso
    })
  })
    .then(resp => {
      if (resp.status === 200) {
        return resp.blob();
      } else {
        toastr.error("ERRO", "Arquivo não encontrado");
      }
    })
    .then(blob => {
      if (!blob) {
        return;
      }
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    });
}
