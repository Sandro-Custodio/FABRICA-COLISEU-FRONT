import axios from "axios";
import { toastr } from "react-redux-toastr";
import { reset } from "redux-form";

export const get_operators_and_vendors = () => {
  return dispatch => {
    dispatch([{ type: "SHOW_OVERLAY" }]);
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/bills/get_operators_and_vendors`,
        {}
      )
      .then(resp => {
        dispatch([
          { type: "HIDE_OVERLAY" },
          { type: "OPERATORS_AND_VENDOR_LIST_FETCHED", payload: resp.data }
        ]);
      })
      .catch(e => {
        toastr.warning("Atenção", "FALHA AO CARREGAR DADOS.");
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

export const get_groups = params => {
  return dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    axios
      .post(`${process.env.REACT_APP_API_URL}/bills/get_groups`, params)
      .then(resp => {
        dispatch([
          { type: "HIDE_OVERLAY" },
          { type: "GROUPS_FETCHED", payload: resp.data }
        ]);
      })
      .catch(e => {
        toastr.warning("Atenção", "FALHA AO CARREGAR AGRUPADORES.");
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

export const import_files = params => {
  return async dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    await axios
      .post(`${process.env.REACT_APP_API_URL}/bills/import_files`, params)
      .then(resp => {
        dispatch({ type: "HIDE_OVERLAY" });
        if (resp.data[1] === null || resp.data[1] === "oi") {
          toastr.success("Fatura importada com sucesso.");
          dispatch({ type: "BILL_DDS_SAVED", payload: resp.data });
        } else {
          toastr.error(resp.data[1], "", { timeOut: 0 });
        }
        // console.log(resp.data);
      })
      .catch(e => {
        // console.log(e);
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

export const delete_bill_dds = bill_id => {
  const params = {
    bill_id
  };
  return dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    axios
      .post(`${process.env.REACT_APP_API_URL}/bills/delete_bill_dds`, params)
      .then(resp => {
        dispatch({ type: "HIDE_OVERLAY" });
        toastr.success("Fatura recusada com sucesso.");
        dispatch({ type: "BILL_DDS_REMOVED", payload: resp.data });
        console.log("resposta", resp.data);
      })
      .catch(e => {
        console.log(e);
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

export const get_circuits_by_vendor = (vendor_id, rede) => {
  console.log(
    "executando: get_circuits_by_vendor",
    `params: ${(vendor_id, rede)}`
  );
  const params = {
    vendor_id,
    rede
  };
  return dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/bills/get_circuits_by_vendor`,
        params
      )
      .then(res => {
        dispatch({ type: "SET_CIRCUITS", payload: res.data });
      })
      .catch(err => {
        toastr.warning("Atenção", "FALHA AO CARREGAR OS CIRCUITOS.");
        if (err.response) {
          if (err.response.data.errors) {
            err.response.data.errors.forEach(error =>
              toastr.error("Erro", error)
            );
          } else {
            toastr.error(String(err.response.status), err.response.statusText);
          }
        } else if (err.request) {
          if (err.message === "Network Error") {
            toastr.error("Erro", "Servidor OFFLINE");
          }
        }
      })
      .finally(() => {
        dispatch({ type: "HIDE_OVERLAY" });
      });
  };
};

export const save_circuits_by_vendor = (circuit, vendor_id) => {
  //Formatação de valores
  if (circuit.val_link_c_imp_a){
    circuit.val_link_c_imp_a =  circuit.val_link_c_imp_a.replace(/\,/g, ".");
  }
  if (circuit.val_link_c_imp_b){
    circuit.val_link_c_imp_b =  circuit.val_link_c_imp_b.replace(/\,/g, ".");
  }
  if (circuit.taxa_ins_c_imp_a){
    circuit.taxa_ins_c_imp_a =  circuit.taxa_ins_c_imp_a.replace(/\,/g, ".");
  }
  if (circuit.taxa_ins_c_imp_b){
    circuit.taxa_ins_c_imp_b =  circuit.taxa_ins_c_imp_b.replace(/\,/g, ".");
  }
  if (circuit.juros_a){
    circuit.juros_a =  circuit.juros_a.replace(/\,/g, ".");
  }
  if (circuit.juros_b){
    circuit.juros_b =  circuit.juros_b.replace(/\,/g, ".");
  }
  const params = {
    circuit: Object.assign(circuit, { provedor_id: vendor_id, type: "Salvar" })
  };
  return async dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/bills/save_circuit_by_vendor`,
        params
      )
      .then(res => {
        if (res.data) {
          toastr.success("Circuito cadastrado com sucesso.");
        }
      })
      .catch(err => {
        toastr.warning("Atenção", "FALHA AO CADASTRAR CIRCUITO.");
        if (err.response) {
          if (err.response.data.errors) {
            err.response.data.errors.forEach(error =>
              toastr.error("Erro", error)
            );
          } else {
            toastr.error(String(err.response.status), err.response.statusText);
          }
        } else if (err.request) {
          if (err.message === "Network Error") {
            toastr.error("Erro", "Servidor OFFLINE");
          }
        }
      })
      .finally(() => {
        dispatch({ type: "HIDE_OVERLAY" });
      });
  };
};

export const edit_circuits_by_vendor = (circuit, vendor_id) => {
  const params = {
    circuit: Object.assign(circuit, { provedor_id: vendor_id, type: "Atualizar" })
  };
  return async dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/bills/save_circuit_by_vendor`,
        params
      )
      .then(res => {
        if (res.data) {
          window.$("#modal_edit_circuit").modal("hide")
          toastr.success("Circuito atualizado com sucesso.");
        }
      })
      .catch(err => {
        toastr.warning("Atenção", "FALHA AO ATUALIZAR CIRCUITO.");
        if (err.response) {
          if (err.response.data.errors) {
            err.response.data.errors.forEach(error =>
              toastr.error("Erro", error)
            );
          } else {
            toastr.error(String(err.response.status), err.response.statusText);
          }
        } else if (err.request) {
          if (err.message === "Network Error") {
            toastr.error("Erro", "Servidor OFFLINE");
          }
        }
      })
      .finally(() => {
        dispatch({ type: "HIDE_OVERLAY" });
      });
  };
};

export const delete_circuit_from_state = circuit => {
  return dispatch => {
    dispatch({ type: "DELETE_CIRCUIT", payload: circuit });
  };
};

export const add_circuit_from_state = circuit => {
  return dispatch => {
    dispatch({ type: "ADD_CIRCUIT", payload: circuit });
  };
};

export const setEditCircuit = circuit => {
  return dispatch => {
    dispatch({ type: "IMPORT_SET_EDIT_CIRCUIT", payload: circuit });
  };
};

export const delete_bill_circ = circuit => {
  const params = {
    circuit
  };

  return dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    axios
      .post(`${process.env.REACT_APP_API_URL}/bills/delete_bill_circ`, params)
      .then(res => {
        if (res.data) {
          toastr.success("Circuito deletado com sucesso do faturamento.");
          delete_circuit_from_state(res.data);
        }
      })
      .catch(err => {
        toastr.warning(
          "Atenção",
          "FALHA AO EXCLUIR O CIRCUITO DO FATURAMENTO."
        );
        if (err.response) {
          if (err.response.data.errors) {
            err.response.data.errors.forEach(error =>
              toastr.error("Erro", error)
            );
          } else {
            toastr.error(String(err.response.status), err.response.statusText);
          }
        } else if (err.request) {
          if (err.message === "Network Error") {
            toastr.error("Erro", "Servidor OFFLINE");
          }
        }
      })
      .finally(() => {
        dispatch({ type: "HIDE_OVERLAY" });
      });
  };
};
