import axios from "axios";
import { toastr } from "react-redux-toastr";
import { reset } from "redux-form";

export const get_all_vendors_by_area = (message = undefined) => {
  const params = {
    area: "LL"
  };
  return dispatch => {
    dispatch([{ type: "SHOW_OVERLAY" }]);
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/vendors/get_all_vendors_by_area`,
        params
      )
      .then(resp => {
        dispatch([
          { type: "VENDORS_LIST_FETCHED", payload: resp.data },
          { type: "HIDE_OVERLAY" }
        ]);
        if (message) {
          toastr.success("Provedor Salvo", message, { timeOut: 0 });
        }
      })
      .catch(e => {
        toastr.warning("Atenção", "FALHA AO CARREGAR PROVEDORES.");
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

export const get_contracts_by_vendor = vendor_id => {
  const params = {
    vendor_id: vendor_id
  };
  return dispatch => {
    dispatch([{ type: "SHOW_OVERLAY" }]);
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/contracts/get_contracts_by_vendor`,
        params
      )
      .then(resp => {
        dispatch([
          { type: "CONTRACT_LIST_FETCHED", payload: resp.data },
          { type: "HIDE_OVERLAY" }
        ]);
      })
      .catch(e => {
        toastr.warning("Atenção", "FALHA AO CARREGAR CONTRATOS.");
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

export const save_vendor = values => {
  const params = {
    vendor: {
      name: values.name,
      short_name: values.short_name,
      long_name: values.name,
      address: values.address,
      address_city: values.address_city,
      address_state: values.address_state,
      address_country: values.address_country,
      grupo: values.grupo,
      cnpj: values.cnpj,
      user_id: values.user_id,
      insc_estadual: values.insc_estadual,
      status: "Ativo",
      vendor_area: "LL"
    }
  };
  return dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    axios
      .post(`${process.env.REACT_APP_API_URL}/vendors/save_vendor`, params)
      .then(resp => {
        window.$("#cadastrar_provedor").modal("hide");
        dispatch({ type: "HIDE_OVERLAY" });
        dispatch(reset("CreateVendor"));
      })
      .catch(e => {
        toastr.warning("Atenção", "FALHA AO SALVAR PROVEDOR.");
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

export const set_vendor = vendor => {
  return dispatch => {
    dispatch({ type: "SET_VENDOR", payload: vendor });
  };
};

export const edit_vendor = values => {
  const params = {
    vendor: {
      id: values.id,
      name: values.name,
      short_name: values.short_name,
      long_name: values.long_name,
      address: values.address,
      address_city: values.address_city,
      address_state: values.address_state,
      address_country: values.address_country,
      grupo: values.grupo,
      cnpj: values.cnpj,
      insc_estadual: values.insc_estadual
    }
  };
  return dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    axios
      .post(`${process.env.REACT_APP_API_URL}/vendors/edit_vendor`, params)
      .then(resp => {
        window.$("#editar_provedor").modal("hide");
        dispatch({ type: "HIDE_OVERLAY" });
      })
      .catch(e => {
        toastr.warning("Atenção", "FALHA AO EDITAR PROVEDOR.");
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

export const get_vendor_state_list = () => {
  return axios.get(
    `${process.env.REACT_APP_API_URL}/vendors/get_vendor_state_list`
  );
};

export const get_vendor_city_list = params => {
  return axios.post(
    `${process.env.REACT_APP_API_URL}/vendors/get_vendor_city_list`,
    params
  );
};
