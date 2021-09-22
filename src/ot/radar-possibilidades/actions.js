import axios from "axios";
import { toastr } from "react-redux-toastr";
import get from "lodash/get";
import { reset } from "redux-form";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

export function getOtList(auth, ot) {
  const { filters, paginator } = ot;
  const { user } = auth;
  const params = {
    "0": { ...filters, user_id: user.id, code_action: "DR_COA1B1" },
    "1": paginator.currentPage,
    "2": paginator.pageSize,
    "3": ""
  };
  // console.log("@@@@@@@@@@@params@@@@@", params);
  return dispatch => {
    dispatch([{ type: "SHOW_OVERLAY" }]);
    axios
      .post(`${process.env.REACT_APP_API_URL}/ots/list`, params)
      .then(resp => {
        let maxPagesQtd = resp.data[1];

        if (maxPagesQtd % 1 !== 0) {
          maxPagesQtd = Math.ceil(maxPagesQtd);
        }

        dispatch([
          { type: "OTS_FETCHED", payload: resp.data },
          { type: "CHANGE_OT_MAX_PAGE_QTD", payload: maxPagesQtd }
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
      })
      .finally(() => {
        dispatch([{ type: "HIDE_OVERLAY" }]);
      });
  };
}

export function get_ot_data_radar(ot_segmentation_id) {
  const params = {
    ot_segmentation_id
  };
  return dispatch => {
    dispatch([{ type: "SHOW_OVERLAY" }]);
    axios
      .post(`${process.env.REACT_APP_API_URL}/radar/get_ot_data`, params)
      .then(resp => {
        dispatch([{ type: "RADAR_INFO_FETCHED", payload: resp.data }]);
      })
      .catch(e => {
        toastr.warning("Atenção", "FALHA AO CARREGAR INFORMAÇÕES DO RADAR.");
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
}

export const validaForm = () => (_, getState) => {
  const form = get(getState(), `form.Proposta.values`, {});
  const filleds = [
    "moeda",
    "responsed_at",
    "response_validity_through",
    "activation_time",
    "quantity",
    "monthly_cost",
    "installation_cost"
  ].every(key => !!form[key]);
  if (!filleds) {
    return false;
  }
  return true;
};

export const validaFormContratarEVT = () => (_, getState) => {
  const form = get(getState(), `form.Contrato.values`, {});
  const filleds = [
    "approved_at",
    "contract_protocol",
    "degrau",
    "estimated_activation_at",
    "meio_acesso",
    "numero_parcelas",
    "classificacao_demanda"
  ].every(key => !!form[key]);
  if (!filleds) {
    return false;
  }
  return true;
};

export function show_loader() {
  return dispatch => {
    dispatch([{ type: "SHOW_OVERLAY" }]);
  };
}

export function hide_loader() {
  return dispatch => {
    dispatch([{ type: "HIDE_OVERLAY" }]);
  };
}

export function get_all_by_ot_segmentation_id(ot_segmentation_id) {
  const params = {
    ot_segmentation_id
  };
  return dispatch => {
    dispatch([{ type: "SHOW_OVERLAY" }]);
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/evts/get_all_by_ot_segmentation_id`,
        params
      )
      .then(resp => {
        dispatch([{ type: "RADAR_EVTS_FETCHED", payload: resp.data }]);
      })
      .catch(e => {
        toastr.warning("Atenção", "FALHA AO CARREGAR INFORMAÇÕES DO RADAR.");
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
      })
      .finally(() => {
        dispatch([{ type: "HIDE_OVERLAY" }]);
      });
  };
}

export function get_tracking_attachs(evt_id) {
  const params = {
    object: { ll_guid: "", id: evt_id }
  };
  return dispatch => {
    dispatch([{ type: "SHOW_OVERLAY" }]);
    axios
      .post(`${process.env.REACT_APP_API_URL}/pms/get_tracking_attachs`, params)
      .then(resp => {
        dispatch([{ type: "TRACKING_ATTACHS_FETCHED", payload: resp.data }]);
      })
      .catch(e => {
        toastr.warning("Atenção", "FALHA AO CARREGAR ANEXOS.");
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
      })
      .finally(() => {
        dispatch([{ type: "HIDE_OVERLAY" }]);
      });
  };
}

export function save_tracking_attachs(evt, attachments, auxiliar, user_id) {
  const params = {
    evt: {
      pms_id: evt.pms_id,
      id: evt.id
    },
    attachments: {
      ll_attachs: attachments
    },
    auxiliar,
    user: { id: user_id }
  };
  return dispatch => {
    dispatch([{ type: "SHOW_OVERLAY" }]);
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/pms/save_tracking_attachs`,
        params
      )
      .then(resp => {
        window.$("#form_anexar").modal("hide");
      })
      .catch(e => {
        toastr.warning("Atenção", "FALHA AO CARREGAR ANEXOS.");
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
      })
      .finally(() => {
        dispatch([{ type: "HIDE_OVERLAY" }]);
      });
  };
}

export function setEvt(evt) {
  return dispatch => {
    dispatch([{ type: "EVT_STORED", payload: evt }]);
  };
}

export function update_evt_status(params) {
  return dispatch => {
    dispatch([{ type: "SHOW_OVERLAY" }]);
    axios
      .post(`${process.env.REACT_APP_API_URL}/evts/update_evt_status`, params)
      .then(resp => {
        window.$("#cancelar_evt").modal("hide");
      })
      .catch(e => {
        toastr.warning("Atenção", "FALHA AO CANCELAR EVT.");
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
      })
      .finally(() => {
        dispatch([{ type: "HIDE_OVERLAY" }]);
      });
  };
}

export function download(path, filename, token) {
  fetch(`${process.env.REACT_APP_API_URL}/download`, {
    method: "POST",
    headers: { Authorization: token, "Content-Type": "application/json" },
    body: JSON.stringify({
      path: `${path}${filename}`
    })
  })
    .then(resp => resp.blob())
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    })
    .catch(() => alert("Erro ao buscar arquivo para Download"));
}

const getVendorIndices = () => axios.get("/evts/get_vendor_indices");

const get_all_demand_classifications = () => axios.get("/demand_classifications/get_all_demand_classifications");

const getPedidoAccord = (evt_id, ot_segmentation_id) =>
  axios.post("/evts/get_ot_data_pedido_accord", {
    evt_id,
    ot_segmentation_id
  });

const getContratoEvt = vendor_id =>
  axios.post("/evts/get_contracts_evt_pms", {
    vendor_id
  });

export const getVisualizar = (evt_id, ot_segmentation_id, vendor_id) =>
  Promise.all([
    getVendorIndices(),
    getPedidoAccord(evt_id, ot_segmentation_id),
    getContratoEvt(vendor_id)
  ]).then(res => res.map(el => el.data));

export const uploadFile = formData => {
  return axios({
    method: "post",
    baseURL: process.env.REACT_APP_API_URL,
    url: "/flex_upload/attachment",
    data: formData,
    headers: { "content-type": "application/octet-stream" },
    json: true
  });
};

export function saveAnexoEvt(params) {
  return axios
    .post(`${process.env.REACT_APP_API_URL}/evts/save_attaches`, params)
    .then(resp => {
      if (resp.status === 200) {
        toastr.success("", "Anexos inseridos com sucesso!");
      } else {
        toastr.info("Erro", "Falha de ......");
      }
    })
    .catch(e => {
      toastr.warning("Atenção", "ERROR");
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
    });
}

export function salvarResposta(evt, user) {
  const params = {
    0: evt,
    1: user
  };
  return axios
    .post(`${process.env.REACT_APP_API_URL}/evts/save_resposta`, params)
    .then(resp => {
      if (resp.status === 200) {
        toastr.success("", "Proposta salva com sucesso!");
      } else {
        toastr.info("Erro", "Ocorreu um erro ao atualizar a base!");
      }
    })
    .catch(e => {
      toastr.warning("Atenção", "ERROR");
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
    });
}
export function salvarContrato(evt, user) {
  const params = {
    o: evt,
    type: "contract",
    user
  };
  // console.log("!!!!!!!!!!!!!!!!!!!params!!!!!!!", params);
  return axios
    .post(`${process.env.REACT_APP_API_URL}/evts/save`, params)
    .then(resp => {
      if (resp.status === 200) {
        toastr.success("", "Contrato salvo com sucesso!");
      } else {
        toastr.info("Erro", "Ocorreu um erro ao atualizar a base!");
      }
    })
    .catch(e => {
      toastr.warning("Atenção", "ERROR");
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
    });
}

const getSegAttach = ot_segmentation_id =>
  axios.post("/evts/check_seg_attach_contract", {
    0: ot_segmentation_id
  });

export const getVendorArea = () =>
  axios.post("/vendors/get_all_vendors_by_area", {
    area: "LL"
  });

export const getContrato = (ot_segmentation_id, vendor_id) =>
  Promise.all([
    getVendorIndices(),
    getSegAttach(ot_segmentation_id),
    getVendorArea(ot_segmentation_id),
    getContratoEvt(vendor_id),
    get_all_demand_classifications()
  ]).then(res => res.map(el => el.data));

// export const getContrato = (ot_segmentation_id, vendor_id) => dispatch => {
//   dispatch([{ type: "SHOW_OVERLAY" }]);
//   Promise.all(
//     getVendorIndices(),
//     getSegAttach(ot_segmentation_id),
//     getVendorArea(ot_segmentation_id),
//     getContratoEvt(vendor_id)
//   )
//     .then(res => res.map(el => el.data))
//     .catch(erro => console.log("ERRO", erro))
//     .finally(dispatch([{ type: "HIDE_OVERLAY" }]));
// };

export function ChecarQtdeContratos(ot_segmentation_id, vendor_id, quantity) {
  const params = {
    ot_segmentation_id,
    vendor_id,
    quantity
  };
  return axios.post(
    `${process.env.REACT_APP_API_URL}/evts/check_contracted_quantity`,
    params
  );
}

export function deleteAnexo(row) {
  return dispatch => {
    dispatch([{ type: "ASSINAR_DELETE", payload: { id: row.id } }]);
    if (!row.new) {
      axios
        .post(`${process.env.REACT_APP_API_URL}/ots/delete_segAttachment`, {
          id: row.id
        })
        .catch(function(error) {
          toastr.error("Houve um Erro ao Deletar");
        });
    }
  };
}

export const setSendRequest = (evtForm, vendorProvider, others) => dispatch => {
  dispatch([
    { type: "LOADING", payload: true },
    { type: "SHOW_OVERLAY" },
    { type: "FORM_EVT", payload: evtForm }
  ]);

  if (others) {
    dispatch([{ type: "SEND_REQUEST" }]);
  }

  return axios
    .post("/vendors/get_all_data_providers", vendorProvider)
    .then(res => dispatch({ type: "GET_VENDOR_PROVIDERS", payload: res.data }))
    .catch(err => console.log(err))
    .finally(() =>
      dispatch([
        { type: "LOADING_OFF", payload: false },
        { type: "HIDE_OVERLAY" }
      ])
    );
};

export const sendEmailSaveEvt = params => {
  axios
    .post("/evts/send_email_save_evt", params)
    .then(res => {
      toastr.success("", "Email enviado com sucesso!");
      console.log(res.data);
    })
    .catch(err => {
      toastr.error("Houve um Erro ao enviar o email");
      console.log(err);
    })
    .finally(() => {
      window.$("#ped_cotacao").modal("hide");
    });
};

export const sendRequestOff = () => dispatch => {
  dispatch([{ type: "SEND_REQUEST_OFF" }]);
  // dispatch([reset("PedidoProposta")]);
};

export const setAttaches = attach => dispatch => {
  dispatch({ type: "SET_ATTACHES", payload: attach });
};

export const deleteAttaches = () => dispatch => {
  dispatch({ type: "DELETE_ATTACHES" });
};
