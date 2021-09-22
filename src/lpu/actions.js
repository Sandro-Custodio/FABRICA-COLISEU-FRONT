import axios from "axios";
import { toastr } from "react-redux-toastr";
import { reset } from "redux-form";

export const get_combos_lpu = () => {
  return async dispatch => {
    dispatch([{ type: "SHOW_OVERLAY" }]);
    await axios
      .get(`${process.env.REACT_APP_API_URL}/lpu/get_combos_lpu`)
      .then(resp => {
        dispatch([
          { type: "COMBOS_LPU_FETCHED", payload: resp.data },
          { type: "HIDE_OVERLAY" }
        ]);
      })
      .catch(e => {
        toastr.warning("Atenção", "FALHA AO CARREGAR LISTA DE PROVEDORES.");
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

export const get_vendor_degraus = () => {
  return async dispatch => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/lpu/get_vendor_degraus`)
      .then(resp => {
        dispatch([
          { type: "DEGRAU_LIST_FETCHED", payload: resp.data }
        ]);
      })
      .catch(e => {
        toastr.warning("Atenção", "FALHA AO CARREGAR DEGRAUS PARA LPU.");
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
  };
};

export const get_lpu_items_by_vendor = value => {
  const params = {
    vendor_id: value
  };
  return async dispatch => {
    dispatch([{ type: "SHOW_OVERLAY" }]);
    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/lpu/get_lpu_items_by_vendor`,
        params
        )
      .then(resp => {
        dispatch([
          { type: "LPUS_FETCHED", payload: resp.data },
          { type: "HIDE_OVERLAY" }
        ]);
      })
      .catch(e => {
        toastr.warning("Atenção", "FALHA AO CARREGAR LPUS.");
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

export const get_lpu_contracts_by_vendor = vendor => {
  const params = {
    vendor_id: vendor.id
  }

  return async dispatch => {
    dispatch([{ type: "SHOW_OVERLAY" }]);
    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/lpu/get_contract`,
        params
        )
      .then(resp => {
        dispatch([
          { type: "LPUS_CONTRACTS_FETCHED", payload: resp.data },
          { type: "HIDE_OVERLAY" }
        ]);
      })
      .catch(e => {
      toastr.warning("Atenção", "FALHA AO CARREGAR CONTRATOS DE LPU.");
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

export const save_lpu_item = params => {
  return async dispatch => {
    dispatch([{ type: "SHOW_OVERLAY" }]);
    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/lpu/save_lpu_item`,
        params
        )
      .then(resp => {
        dispatch({ type: "HIDE_OVERLAY" });
        if(resp?.data?.lpu_guid){
          toastr.success("ITEM DE LPU SALVO.",resp.data.lpu_guid,{timeOut:0});
        }
      })
      .catch(e => {
        toastr.warning("Atenção", "FALHA AO SALVAR ITEM DE LPU.");
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

export const set_lpu_items = params => {
  return dispatch => {
    dispatch([{
      type: "SET_LPU_ITEMS",
      payload: params
    }])
  }
}

export const create_lpu = params => {
  const fields = {
    vendor_id: "Provedor",
    contract_id: "Contrato",
    network: "Rede",
    lpu_description: "Descrição",
    lpu_begin_at: "Data Início",
    lpu_end_at: "Data Fim",
    "lpu_items.vendor_degrau_id": "Degrau",
    "lpu_items.speed": "Velocidade",
    "lpu_items.speed_unity": "Unidade",
    "lpu_items.speed_symbol": "Simbolo",
    "lpu_items.vendor_prazo": "Prazo",
    "lpu_items.mens_s_imp": "Valor S/ Impostos",
    "lpu_items.inst_s_imp": "Taxa S/ Immpostos"
  }

  return async dispatch => {
    dispatch([{ type: "SHOW_OVERLAY" }]);

    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/lpu/create`,
        params
        )
      .then(resp => {
        dispatch({ type: "HIDE_OVERLAY" });
        dispatch({ type: "SET_LPU_ITEMS", payload: [] })
        dispatch(reset('CreateLPUForm'));
        if(resp?.data?.lpu_code){
          toastr.success("SALVO!", "LPU CRIADO COM CÓDIGO: " + resp.data.lpu_code, {timeOut:0});
        }
      })
      .catch(e => {
        toastr.warning("Atenção", "FALHA AO SALVAR LPU.");
        if (e.response) {
          if (e.response.data.errors) {
            Object.keys(e.response.data.errors).forEach(field => {
              toastr.error("O campo " + fields[field] + " não pode ser vazio")
            })
          } else {
            toastr.error(String(e.response.status), e.response.statusText);
          }
        } else if (e.request) {
          if (e.message === "Network Error") {
            toastr.error("Erro", "Servidor OFFLINE");
          }
        }
        dispatch([{ type: "HIDE_OVERLAY" }]);
        return false;
      });
  };
}
export const delete_lpu_items_by_id = params => {
  return async dispatch => {
    dispatch([{ type: "SHOW_OVERLAY" }]);
    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/lpu/delete_lpu_items_by_id`,
        params
        )
      .then(resp => {
        dispatch({ type: "HIDE_OVERLAY" });
        if(resp.status === 200){
          toastr.success("ITEM(S) DE LPU REMOVIDO(S)");
        }
      })
      .catch(e => {
        toastr.warning("Atenção", "FALHA AO REMOVER ITEM DE LPU.");
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
