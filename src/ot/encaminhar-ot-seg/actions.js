import axios from "axios";
import { reset, change } from "redux-form";
import { toastr } from "react-redux-toastr";

export function get_ot_auxiliar_tables() {
  return dispatch => {
    dispatch([{ type: "SHOW_OVERLAY" }]);

    axios
      .post(`${process.env.REACT_APP_API_URL}/ots/get_ot_auxiliar_tables`, "")
      .then(resp => {
        dispatch([{ type: "AUXILIAR_TABLES_FETCHED", payload: resp.data }]);
      })
      .catch(e => {
        toastr.warning("Atenção", "FALHA AO CARREGAR TABELAS AUXILIARES.");
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
      });
    // HIDE_OVERLAY ESTÁ CAUSANDO ERRO NO LOADER DO LISTAR OT
    /* .finally(() => {
        dispatch({ type: "HIDE_OVERLAY" });
      }); */
  };
}

export default function update_object_ot_seg_forward(ot_seg_id) {
  const params = {
    ot_seg_id
  };
  return async dispatch => {
    dispatch([{ type: "SHOW_OVERLAY" }]);
    await axios
      .post(`${process.env.REACT_APP_API_URL}/ots/update_object_ot_seg`, params)
      .then(resp => {
        dispatch([
          { type: "OT_SEG_FETCHED", payload: resp.data },
          change(
            "FormEncaminharOtSeg",
            "qtd_links",
            resp.data.ot_seg.attributes.qtd_links,
            []
          ),
          change(
            "FormEncaminharOtSeg",
            "ot_speed",
            resp.data.ot_seg.virtual_attributes.ot_speed,
            []
          ),
          change(
            "FormEncaminharOtSeg",
            "ot_redundancy",
            resp.data.ot_seg.virtual_attributes.ot_redundancy
          ),
          change(
            "FormEncaminharOtSeg",
            "ot_protection_type",
            resp.data.ot_seg.attributes.protection_type
          ),
          { type: "HIDE_OVERLAY" }
        ]);
      })
      .catch(e => {
        toastr.warning("Atenção", "FALHA AO CARREGAR SEGMENTO.");
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

export const check_if_possible = params => {
  return async dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/ot_segmentations/check_if_possible`,
        params
      )
      .then(resp => {
        dispatch([
          { type: "HIDE_OVERLAY" },
          { type: "SET_MULTI_FORWARD_SEG_LIST", payload: resp.data }
        ]);
      })
      .catch(e => {
        toastr.warning("Atenção", "FALHA AO VERIFICAR SEGMENTOS.");
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

export const edit_multi_segmentation = values => {
  return async dispatch => {
    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/ot_segment/edit_segmentation`,
        values
      )
      .then(resp => {
        dispatch({
          type: "SET_RESPONSE_FORWARD_SEG",
          payload: { ...resp.data.ot_seg, done: 1 }
        });
      })
      .catch(() => {
        dispatch({
          type: "SET_RESPONSE_FORWARD_SEG",
          payload: { id: values?.ot_seg_id?.id, done: -1 }
        });
      });
  };
};

export function edit_segmentation(values) {
  return dispatch => {
    dispatch([{ type: "SHOW_OVERLAY" }]);
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/ot_segment/edit_segmentation`,
        values
      )
      .then(resp => {
        if (resp.status === 200) {
          // const ot = resp.data[0];
          window.$("#encaminhar_seg").modal("hide");
          const toastrOptions = {
            timeOut: 0
          };
          toastr.success(
            resp.data.ot_seg.project,
            "SEGMENTO DE OT ENCAMINHADO",
            toastrOptions
          );
        } else {
          toastr.info("Erro", "FALHA AO ENCAMINHAR SEGMENTO DE OT");
        }
        dispatch([{ type: "HIDE_OVERLAY" }, reset()]);
      })
      .catch(e => {
        toastr.info("Erro", "FALHA AO ENCAMINHAR SEGMENTO DE OT");
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

export const show_overlay = () => {
  return dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
  };
};

export const hide_overlay = () => {
  return dispatch => {
    dispatch({ type: "HIDE_OVERLAY" });
  };
};
