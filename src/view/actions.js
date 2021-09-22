import axios from "axios";
import { toastr } from "react-redux-toastr";

export function getViewsList(user_id) {
  const params = {
    user_id: user_id
  };
  return dispatch => {
    dispatch([{ type: "SHOW_OVERLAY" }]);
    axios
      .post(`${process.env.REACT_APP_API_URL}/views/generate_report`, params)
      .then(resp => {
        dispatch([
          { type: "VIEWS_FETCHED", payload: resp.data },
          { type: "HIDE_OVERLAY" }
        ]);
      })
      .catch(e => {
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

export function download(filename) {
  setTimeout(() => {
    const response = {
      file: process.env.REACT_APP_API_URL + "/database_views/" + filename
    };
    window.open(response.file);
  }, 100);
}
