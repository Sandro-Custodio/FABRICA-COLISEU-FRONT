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

export const clear_filter = (form = "filtroContestacao") => {
  return dispatch =>
    dispatch([reset(form) /* , change_field('network', 'MÓVEL') */]);
};

export const get_bills_contestations = data => {
  return async dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    await axios
      .post("/bill_contestations/get_bills_contestations", data)
      .then(res => {
        dispatch({ type: "GET_BILLS_CONTESTATIONS", payload: res.data });
        dispatch({ type: "SET_FILTER_DATA", payload: data });
        dispatch({ type: "HIDE_OVERLAY" });
      })
      .catch(e => dispatch(handle_error(e)));
  };
};

export const export_all = (data, per_page) => {
  return async dispatch => {
    if (Object.entries(data).length === 0) {
      toastr.warning("Faça uma busca primeiro.");
    } else {
      dispatch({ type: "SHOW_OVERLAY" });
      await axios
        .post("/bill_contestations/get_bills_contestations", {
          ...data,
          per_page
        })
        .then(res => {
          dispatch({ type: "EXPORT_ALL", payload: res.data.bills });
          dispatch({ type: "HIDE_OVERLAY" });
          setTimeout(() => document.getElementById("export-all").click(), 1300);
        })
        .catch(e => dispatch(handle_error(e)));
    }
  };
};

export const get_all_contestation_items = id => {
  return async dispatch => {
    dispatch({ type: "SHOW_TABLE_OVERFLOW" });
    await axios
      .post("/bill_contestations/get_all_contestation_items", { id })
      .then(res => {
        dispatch([
          { type: "GET_ALL_CONTESTATION_ITEMS", payload: res.data },
          { type: "HIDE_TABLE_OVERFLOW" }
        ]);
      })
      .catch(e => dispatch(handle_error(e)));
  };
};

export const get_combos_lote = () => {
  return async dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    await axios
      .get("/bill_contestations/get_combos_lote")
      .then(res => {
        dispatch({ type: "GET_COMBOS_LOTE", payload: res.data });
        dispatch({ type: "HIDE_OVERLAY" });
      })
      .catch(e => dispatch(handle_error(e)));
  };
};

export const get_bill_conc_lot = data => {
  return async dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    await axios
      .post("/bill_contestations/get_bill_conc_lot", data)
      .then(res => {
        dispatch({ type: "GET_BILL_CONC_LOT", payload: res.data });
        dispatch({ type: "HIDE_OVERLAY" });
      })
      .catch(e => dispatch(handle_error(e)));
  };
};

export const get_items_lot_conciliate = id => {
  return async dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    await axios
      .post("/bill_contestations/get_items_lot_conciliate", { id })
      .then(res => {
        dispatch({ type: "GET_DETALHES_LOTE", payload: res.data });
        dispatch({ type: "HIDE_OVERLAY" });
        window.$("#detalhes-lote").modal("show");
      })
      .catch(e => dispatch(handle_error(e)));
  };
};

export const get_hist_envio_email = id => {
  return async dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    await axios
      .post("/bill_contestations/get_hist_envio_email", { id })
      .then(res => {
        dispatch({ type: "GET_HIST_ENVIO_EMAIL", payload: res.data });
        dispatch({ type: "HIDE_OVERLAY" });
        window.$("#historico-email").modal("show");
      })
      .catch(e => dispatch(handle_error(e)));
  };
};

export const gera_lote_contestation = params => {
  return async dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    await axios
      .post("/bill_contestations/gera_lote_contestation", params)
      .then(res => {
        console.log("res", res);
        dispatch({ type: "HIDE_OVERLAY" });
        if(res.status === 200){
          window.$("#gerar-lote").modal("hide")
          window.$("#box-confirmar-email-gerar-lote").modal("show")
          dispatch({ type: "LOTE_GERADO", payload: res?.data});
        }
        // dispatch({ type: "GET_HIST_ENVIO_EMAIL", payload: res.data });
        // dispatch({ type: "HIDE_OVERLAY" });
        // window.$("#historico-email").modal("show");
      })
      .catch(e => dispatch(handle_error(e)));
  };
};

export const gera_new_file_contestation = value => {
  const params = {
    bcl: value
  };
  return async dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    await axios
      .post("/bill_contestations/gera_new_file_contestation", params)
      .then(res => {
        console.log("res", res);
        dispatch([
          { type: "HIDE_OVERLAY" },
          { type: "SET_DOWNLOAD_FILE_NAME", payload: res.data.file_name }
        ]);
      })
      .catch(e => dispatch(handle_error(e)));
  };
};

export const gera_new_file_negados = value => {
  const params = {
    lote: value
  };
  return async dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    await axios
      .post("/bill_contestations/gera_new_file_negados", params)
      .then(res => {
        console.log("res", res);
        dispatch([{ type: "HIDE_OVERLAY" }]);
        window.$("#detalhes-lote").modal("hide");
        window.$("#box-confirmar-email-gerar-lote").modal("show");
        // dispatch([{ type: "HIDE_OVERLAY" },
        // { type: "SET_DOWNLOAD_FILE_NAME", payload: res.data.file_name}]);
      })
      .catch(e => dispatch(handle_error(e)));
  };
};

export const gera_items_lote = params => {
  return async dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    await axios
      .post("/bill_contestations/gera_items_lote", params)
      .then(res => {
        console.log("res", res);
        dispatch([
          { type: "HIDE_OVERLAY" },
          { type: "SET_DOWNLOAD_FILE_NAME", payload: res.data }
        ]);
      })
      .catch(e => dispatch(handle_error(e)));
  };
};

export const down_items_negados = params => {
  return async dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    await axios
      .post("/bill_contestations/down_items_negados", params)
      .then(res => {
        console.log("res", res);
        dispatch([
          { type: "HIDE_OVERLAY" },
          { type: "SET_DOWNLOAD_FILE_NAME", payload: res.data }
        ]);
      })
      .catch(e => dispatch(handle_error(e)));
  };
};

export const upload_resposta_lote = (selectedRow, newname, user_id) => {
  const params = {
    bcl: selectedRow,
    file_name: newname,
    user_id: user_id
  };
  return async dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    await axios
      .post("/bill_contestations/upload_resposta_lote", params)
      .then(resp => {
        console.log("resp", resp.data);
        if (resp.data?.length > 0) {
          window.$("#criticas-upload-contestacao").modal("show");
          dispatch([
            { type: "HIDE_OVERLAY" },
            { type: "SET_CRITICA_UPLOAD_CONTESTACAO", payload: resp.data }
          ]);
        }
      })
      .catch(e => dispatch(handle_error(e)));
  };
};

export const upload_items_negados = (selectedRow, newname, user_id) => {
  const params = {
    lote: selectedRow,
    file_name: newname,
    user_id
  };
  return async dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    await axios
      .post("/bill_contestations/upload_items_negados", params)
      .then(resp => {
        if (resp.data?.resposta?.length > 0) {
          console.log("resp", resp.data?.resposta);
          throw resp.data?.resposta;
        }
      })
      .finally(() => dispatch({ type: "HIDE_OVERLAY" }));
    // .catch(e => dispatch(handle_error(e)));
  };
};

export const save_resposta_lote = (user_id, file_name) => {
  const params = {
    user_id,
    file_name
  };
  return async dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    await axios
      .post("/bill_contestations/save_resposta_lote", params)
      .then(resp => {
        window.$("#criticas-upload-contestacao").modal("hide");
        dispatch([
          { type: "HIDE_OVERLAY" },
          { type: "SET_CRITICA_UPLOAD_CONTESTACAO", payload: [] }
        ]);
      })
      .catch(e => dispatch(handle_error(e)));
  };
};

export const set_bill_conc_lote = params => {
  return async dispatch => {
    await dispatch({type: "SET_BILL_CONC_LOTE", payload: params})
  }
}

export const send_email = params => {
  return async dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    await axios
      .post("/bill_contestations/send_email", params)
      .then(resp => {
        window.$("#envio-email").modal("hide");
        toastr.success("E-mail enviado.")
        dispatch({ type: "HIDE_OVERLAY" });
      })
      .catch(e => dispatch(handle_error(e)));
  };
};

export function download(filename) {
  setTimeout(() => {
    const response = {
      file: process.env.REACT_APP_API_URL + "/contestacao/" + filename
    };
    window.open(response.file);
  }, 100);
}
