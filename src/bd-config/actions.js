import axios from "axios";
import { toastr } from "react-redux-toastr";
import { reset } from "redux-form";

export const get_all_bd_config_vendors = () => {
  return dispatch => {
    dispatch([{ type: "SHOW_OVERLAY" }]);
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/vendors/get_all_bd_config_vendors`
      )
      .then(resp => {
        dispatch([
          { type: "BD_CONFIG_VENDORS_LIST_FETCHED", payload: resp.data },
          { type: "HIDE_OVERLAY" }
        ]);
      })
      .catch(e => {
        toastr.warning("Atenção", "FALHA AO CARREGAR BD CONFIG.");
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

export const save_bd_config_vendor = values => {
  const params = {
    bd_config_vendor:{
      provedor_bd: values.provedor_bd,
      vendor_id: values.vendor.id
    }
  };
  return dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/vendors/save_bd_config_vendor`,
        params
      )
      .then(resp => {
        window.$("#cadastrar_bd_config_vendor").modal("hide");
        dispatch({ type: "HIDE_OVERLAY" });
        dispatch(reset('CreateBdConfigVendor'));
        setTimeout(() => {
          toastr.success("DE-PARA Salvo", resp.data.bd_config_vendor.provedor_bd, {timeOut: 0});
        }, 3000)
      })
      .catch(e => {
        toastr.warning("Atenção", "FALHA AO SALVAR DE-PARA BD CONFIG.");
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

export const edit_bd_config_vendor = (new_bd_config, old_bd_config) => {
  const params = {
    new_bd_config_vendor:{
      provedor_bd: new_bd_config.provedor_bd,
      vendor_id: new_bd_config.vendor.id
    },
    old_bd_config_vendor:{
      provedor_bd: old_bd_config.provedor_bd,
      vendor_id: old_bd_config.vendor_id
    }
  };
  return dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/vendors/edit_bd_config_vendor`,
        params
      )
      .then(resp => {
        window.$("#editar_bd_config_vendor").modal("hide");
        dispatch({ type: "HIDE_OVERLAY" });
        dispatch(reset('EditBdConfigVendor'));
        setTimeout(() => {
          toastr.success("DE-PARA Editado", resp.data.bd_config_vendor.provedor_bd, {timeOut: 0});
        }, 3000)
      })
      .catch(e => {
        toastr.warning("Atenção", "FALHA AO SALVAR DE-PARA BD CONFIG.");
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

export const set_bd_config = bd_config => {
  return dispatch => {
    dispatch({ type: "SET_BD_CONFIG", payload: bd_config});
  }
};
