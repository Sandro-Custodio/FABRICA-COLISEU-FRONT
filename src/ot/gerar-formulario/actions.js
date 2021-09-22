import axios from "axios";
import { toastr } from "react-redux-toastr";

export const filter_segments = (selection, list, type = "SET_FILTERED_SEGMENTS") => {
  var filteredSegments = selection.map(item => list[item]);
  return dispatch => {
    dispatch([
      {
        type: type,
        payload: filteredSegments
      }
    ]);
  };
};

export const set_remarks_params = params => {
  return dispatch => {
    dispatch([
      {
        type: "SET_REMARKS_PARAMS",
        payload: params
      }
    ]);
  };
};

export const save_remarks = params => {
  return async dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/ot_segmentations/save_remarks`,
        params
      )
      .then(() => {
        var updated_rows = params.rows.map(row => {
          if (row.seg_id === params.seg_id) {
            if (params.field === "conclucao_formulario") {
              row.conclucao_formulario = params.text;
            }
            if (params.field === "observacao_tef") {
              row.observacao_tef = params.text;
            }
          }
          return row;
        });
        dispatch([
          { type: "HIDE_OVERLAY" },
          { type: "SET_FILTERED_SEGMENTS", payload: updated_rows }
        ]);
        window.$("#generate_form_remarks").modal("hide");
      })
      .catch(e => {
        toastr.warning("Atenção", "FALHA AO SALVAR OBSERVAÇÃO.");
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

export const create_ot_report = params => {
  return async dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/ot_segmentations/create_ot_report`,
        params
      )
      .then(res => {
        dispatch([
          { type: "HIDE_OVERLAY" },
          { type: "SET_GENERATE_REPORT_RESPONSE", payload: res.data }
        ]);
      })
      .catch(e => {
        toastr.warning("Atenção", "FALHA AO GERAR RELATÓRIO.");
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

export const generate_pdf_form_contract = params => {
  return async dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/ots/generate_pdf_form_contract`,
        params
      )
      .then(res => {
        console.log(res.data);
        dispatch([
          { type: "HIDE_OVERLAY" },
          { type: "SET_GENERATE_FORM_RESPONSE", payload: res.data }
        ]);
      })
      .catch(e => {
        toastr.warning("Atenção", "FALHA AO GERAR FORMULÁRIO.");
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
