import axios from "axios";
import { toastr } from "react-redux-toastr";
import { reset } from "redux-form";

export const get_stop_times_by_ll = ll_id => {
  const params = {
    ll_id
  };
  return dispatch => {
    dispatch([{ type: "SHOW_OVERLAY" }]);
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/ll_stop_times/get_stop_times_by_ll`,
        params
      )
      .then(resp => {
        dispatch([
          { type: "STOP_TIMES_LIST_FETCHED", payload: resp.data },
          { type: "HIDE_OVERLAY" }
        ]);
        if (resp.data.length < 1)
          toastr.info(
            "Lista Vazia",
            "Sem Stop-Times cadastrados para LL selecionada.",
            { timeOut: 4000 }
          );
      })
      .catch(e => {
        toastr.warning("Atenção", "FALHA AO CARREGAR STOP TIMES.");
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

export const create_ll_stop_time = values => {
  const params = {
    stop_time: {
      ll_id: values.ll_id,
      data_inicio: values.data_inicio,
      data_fim: values.data_fim,
      motivo: values.motivo,
      observacao: values.observacao,
      user_id: values.user_id
    }
  };
  return async dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/ll_stop_times/create_ll_stop_time`,
        params
      )
      .then(resp => {
        window.$("#cadastrar_stop_times" + values.parent_id).modal("hide");
        dispatch({ type: "HIDE_OVERLAY" });
        dispatch(reset("CreateStopTimes"));
        setTimeout(() => {
          toastr.success("Stop-Time Salvo", resp.data.stop_time.motivo, {
            timeOut: 0
          });
        }, 2500);
      })
      .catch(e => {
        toastr.warning("Atenção", "FALHA AO SALVAR STOP-TIMES.");
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

export const edit_ll_stop_time = values => {
  const params = {
    stop_time: {
      id: values.id,
      ll_id: values.ll_id,
      data_inicio: values.data_inicio,
      data_fim: values.data_fim,
      motivo: values.motivo,
      observacao: values.observacao,
      user_id: values.user_id
    }
  };
  return async dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/ll_stop_times/edit_ll_stop_time`,
        params
      )
      .then(resp => {
        window.$("#editar_stop_times" + values.parent_id).modal("hide");
        dispatch({ type: "HIDE_OVERLAY" });
        dispatch(reset("EditStopTimes"));
        setTimeout(() => {
          toastr.success("Stop-Time Editado", "", { timeOut: 0 });
        }, 2500);
      })
      .catch(e => {
        toastr.warning("Atenção", "FALHA AO EDITAR STOP-TIMES.");
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
