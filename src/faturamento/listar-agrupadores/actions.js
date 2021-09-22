import { toastr } from "react-redux-toastr";
import axios from "axios";
import { reset, change } from "redux-form";

// const getOperatorsAndVendors = () =>
//   axios
//     .post("/bills/get_operators_and_vendors")
//     .then(({ data: [regional, provedor] }) => {
//       regional = regional.map(r => ({
//         text: r.regional,
//         value: r.id
//       }));
//       provedor = provedor.map(r => ({
//         text: r.name,
//         value: r.id
//       }));
//       return { regional, provedor };
//     });

// const getGrupos = (operator_id, vendor_id) =>
//   axios
//     .post("/bills/get_groups", {
//       operator_id,
//       vendor_id
//     })
//     .then(grupo => {
//       grupo = grupo.data.map(r => ({
//         text: r.name,
//         value: r.id
//       }));
//       return grupo;
//     });

// export const getSelectOptions = (operator_id, vendor_id) =>
//   Promise.all([getOperatorsAndVendors(), getGrupos(operator_id, vendor_id)]);

// export const getAgrupadorByCode = pesquisaParams => {
//   const params = {
//     filter_fields: pesquisaParams,
//     3: "DR_COF1D1",
//     page_group: 1,
//     qtd_group: 100
//   };
//   return axios.post("bills/get_all_groups_by_filter", params);
// };

// export const salvarNovoAgrupador = paramsAgrupador => {
//   const params = {
//     novoAgrupador: paramsAgrupador
//   };

//   return axios.post("bills/save_group", params);
// };
// export const salvarAtivdesativAgrupador = paramsAgrupador => {
//   const params = {
//     AtivDesativ: paramsAgrupador
//   };
//   return axios.post("bills/update_group_status", params);
// };
// export const getHistoricoAgrupador = paramsAgrupador => {
//   const params = {
//     group_id: paramsAgrupador
//   };
//   return axios.post("bills/get_group_history", params);
// };
// export const removeHistoricoAgrupador = paramsAgrupador => {
//   return axios.post("bills/remove_status", paramsAgrupador);
// };

export const get_operators_and_vendors = () => {
  return async dispatch => {
    dispatch([{ type: "SHOW_OVERLAY" }]);
    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/bills/get_operators_and_vendors`
        )
      .then(resp => {
        dispatch([
          { type: "OPERATORS_AND_VENDORS_FETCHED", payload: resp.data },
          { type: "HIDE_OVERLAY" }
        ]);
      })
      .catch(e => {
      toastr.warning("Atenção", "FALHA AO CARREGAR OPERADORES E PROVEDORES.");
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

export const get_groups = (operator_id = 1000000000, vendor_id = 1000000000) => {
  return async dispatch => {
    dispatch([{ type: "SHOW_OVERLAY" }]);
    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/bills/get_groups`, {
          operator_id,
          vendor_id
        })
      .then(resp => {
        dispatch([
          { type: "GROUPS_FETCHED", payload: resp.data },
          { type: "HIDE_OVERLAY" }
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
}

export const get_all_groups_by_filter = pesquisaParams => {
  const params = {
    filter_fields: pesquisaParams,
    3: "DR_COF1D1",
    page_group: 1,
    qtd_group: 100
  };
  return async dispatch => {
    dispatch([{ type: "SHOW_OVERLAY" }]);
    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/bills/get_all_groups_by_filter`,
          params
        )
      .then(resp => {
        dispatch([
          { type: "GROUP_LIST_FETCHED", payload: resp.data },
          { type: "HIDE_OVERLAY" }
        ]);
      })
      .catch(e => {
      toastr.warning("Atenção", "FALHA AO CARREGAR LISTA DE AGRUPADORES.");
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

export const save_group = value => {
  const params = {
    novoAgrupador: value
  };
  return async dispatch => {
    dispatch([{ type: "SHOW_OVERLAY" }]);
    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/bills/save_group`,
          params
        )
      .then(resp => {
        if(resp.status === 200 && resp.data){
          toastr.success("Agrupador Salvo", resp.data?.name)
          window.$("#cadastrar_agrupador").modal("hide");
          window.$("#editar_agrupador").modal("hide");
        }
        dispatch([{ type: "HIDE_OVERLAY" }]);
      })
      .catch(e => {
      toastr.warning("Atenção", "FALHA AO SALVAR AGRUPADOR.");
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

export const update_group_status = (value, reloadParent) => {
  const params = {
    AtivDesativ: value
  };
  return async dispatch => {
    dispatch([{ type: "SHOW_OVERLAY" }]);
    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/bills/update_group_status`,
          params
        )
      .then(resp => {
        dispatch([{ type: "HIDE_OVERLAY" }]);
        if(resp.status === 200){
          if(resp.data === "Existe fatura importada neste mês para este provedor."){
            toastr.warning("Existe fatura importada neste mês para este provedor.")
          }else{
            toastr.success("Agrupador Atualizado")
            window.$("#desativar_agrupador").modal("hide");
            reloadParent()
          }
        }
      })
      .catch(e => {
      toastr.warning("Atenção", "FALHA AO SALVAR AGRUPADOR.");
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
    }).finally( $ => dispatch([{ type: "HIDE_OVERLAY" }]));
  };
}

export const get_group_history = value => {
  const params = {
    group_id: value
  };
  return async dispatch => {
    dispatch([{ type: "SHOW_OVERLAY" }]);
    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/bills/get_group_history`,
          params
        )
      .then(resp => {
        if(resp.status === 200 && resp.data){
          dispatch([
            { type: "GROUP_HISTORY_FETCHED", payload: resp.data },
            { type: "HIDE_OVERLAY" }
          ]);
        }
      })
      .catch(e => {
      toastr.warning("Atenção", "FALHA AO BUSCAR HISTÓRICO DO AGRUPADOR.");
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

export const remove_status = value => {
  const params = {
    paramsAgrupador: value
  }
  return async dispatch => {
    dispatch([{ type: "SHOW_OVERLAY" }]);
    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/bills/remove_status`,
          params
        )
      .then(resp => {
        dispatch([{ type: "HIDE_OVERLAY" }]);
      })
      .catch(e => {
      toastr.warning("Atenção", "FALHA AO CANCELAR HISTÓRICO.");
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

export const resetForm = formName => {
  return dispatch => {
    dispatch(reset(formName));
  };
}

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

export const export_all = ({ filter, access_token }) => {
  return async dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    await axios
      .post("/bill_reports/send_group_data_url", {
        filter,
        code: "DR_COF1D1"
      })
      .then(res => {
        download(res.data, access_token)
        setTimeout(() => {
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
