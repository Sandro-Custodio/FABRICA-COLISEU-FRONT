import axios from "axios";
import { reset, change } from "redux-form";
import { toastr } from "react-redux-toastr";
import { selectTab, showTabs } from "../../common/tabs/actions";

export function loadFieldsOtForm() {
  return dispatch => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/ots/get_filter_save_list`, {})
      .then(resp => {
        dispatch([{ type: "FIELDS_OT_FORM_FETCHED", payload: resp.data }]);
      })
      .catch(e => {
        toastr.error(
          "Erro",
          "ALGUNS CAMPOS NO FORMULÁRIO DE OT NÃO FORAM CARREGADOS."
        );
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

export function saveOtPadrao(values) {
  // values = {
  //   ot_from_params: {
  //     operator_a_id: "TRJ",
  //     address_a_id: "ESAUE_0001",
  //     address_b_id: "SPBRU_0030",
  //     operator_manager_id: 8,
  //     ot_element_type_a: "BTS",
  //     qtd_links: 1,
  //     data_solicitacao: "2019-02-08T10:16:44-03:00",
  //     duration: "12 meses",
  //     frequencia: "850",
  //     project_id: 2032,
  //     ot_finality_id: 8,
  //     solicitant_id: 9585,
  //     trx_final: "",
  //     period: "Permanente",
  //     element_a_id: "ADNO01",
  //     ot_redundancy_id: 2,
  //     area_solicitant_id: 67,
  //     ot_speed_id: 10680,
  //     rede: "MÓVEL",
  //     element_b_id: "BBRU01",
  //     protection_type: "",
  //     sub_project_id: 2097,
  //     element_a_interface: "G703/G704 Eletrica",
  //     ot_status_id: 20,
  //     banda_final: "",
  //     ot_element_type_b: "BSC",
  //     incremento_trx: "",
  //     observacao: "Teste 24/04/2019",
  //     element_b_interface: "G703/G704 Eletrica",
  //     referencia: "",
  //     element_id_b: 15353,
  //     projeto_itx: "",
  //     element_id_a: 15353,
  //     data_ativ_desejada: null,
  //     operator_b_id: "TSP"
  //   },
  //   user_id: 9585
  // };

  return dispatch => {
    dispatch([{ type: "SHOW_OVERLAY" }]);
    axios
      .post(`${process.env.REACT_APP_API_URL}/ot/save`, values)
      .then(resp => {
        if (resp.status === 200 && resp.data.length > 0) {
          const ot = resp.data[2];
          if (ot === "Frequencia inexistente.") {
            toastr.error(`COD:  ${ot}`, {
              timeOut: 10000,
              removeOnHover: false
            });
          } else {
            dispatch([reset("OTForm")]);
            toastr.success(`COD:  ${ot}`, "Cadastro feito com sucesso!", {
              timeOut: 0,
              removeOnHover: false
            });
          }
        } else {
          toastr.info("Erro", "FALHA AO TENTAR SALVAR OS DADOS DA OT");
        }
      })
      .catch(e => {
        toastr.info("Erro", "FALHA AO TENTAR SALVAR OS DADOS DA OT");
        toastr.info(e);
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

export function clearValuesForm(nameForm) {
  return dispatch => dispatch(reset(nameForm));
}

export function checkSegmentUnique(params, values) {
  return dispatch => {
    dispatch([{ type: "SHOW_OVERLAY" }]);
    axios
      .post(`${process.env.REACT_APP_API_URL}/ot/validate_greencard`, params)
      .then(resp => {
        if (resp.data[0].ot_possible === null) {
          dispatch(saveOtPadrao(values));
        } else {
          toastr.warning("Atenção", resp.data[0].ot_possible);
        }
      })
      .catch(e => {
        toastr.info("Erro", "FALHA AO TENTAR SALVAR OS DADOS DA OT");

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
        } else {
          toastr.error("Erro", e.message);
        }
      });
    // HIDE_OVERLAY CAUSANDO HIDE PRECOCE AO SALVAR OT
    /* 
      .finally(() => {
        dispatch([{ type: "HIDE_OVERLAY" }]);
      }); 
    */
  };
}

export function loadElementTypesA(params) {

  return dispatch => {
    dispatch([{ type: "ELEMENTTYPESA_FETCHED", payload: { vw_element: [] } }]);
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/elements/get_element_types`,
        params
      )
      .then(resp => {
        dispatch([{ type: "ELEMENTTYPESA_FETCHED", payload: resp.data }]);
      })
      .catch(e => {
        toastr.error("Erro", "TIPOS DE ELEMENTOS A NÃO CARREGADOS.");
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

export function loadElementTypesB(params) {
  return dispatch => {
    dispatch([{ type: "ELEMENTTYPESB_FETCHED", payload: { vw_element: [] } }]);
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/elements/get_element_types`,
        params
      )
      .then(resp => {
        dispatch([{ type: "ELEMENTTYPESB_FETCHED", payload: resp.data }]);
      })
      .catch(e => {
        toastr.error("Erro", "TIPOS DE ELEMENTOS B NÃO CARREGADOS.");
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

export function loadElementsA(params) {
  return dispatch => {
    dispatch([{ type: "ELEMENTSA_FETCHED", payload: { elemento: [] } }]);
    axios
      .post(`${process.env.REACT_APP_API_URL}/elements/get_element_id`, params)
      .then(resp => {
        dispatch([{ type: "ELEMENTSA_FETCHED", payload: resp.data }]);
      })
      .catch(e => {
        toastr.warning("Erro", "ELEMENTOS DA ORIGEM NÃO CARREGADOS.");
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

export function loadElementsB(params) {
  return dispatch => {
    dispatch([{ type: "ELEMENTSB_FETCHED", payload: { elemento: [] } }]);
    axios
      .post(`${process.env.REACT_APP_API_URL}/elements/get_element_id`, params)
      .then(resp => {
        dispatch([{ type: "ELEMENTSB_FETCHED", payload: resp.data }]);
      })
      .catch(e => {
        toastr.warning("Erro", "ELEMENTOS DO DESTINO NÃO CARREGADOS.");
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

export function loadAddressAById(params) {

  return dispatch => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/elements/get_address_by_id`,
        params
      )
      .then(resp => {
        dispatch([
          { type: "ADDRESSA_FETCHED_SETTING", payload: resp.data },
          change("OTForm", "ot_address_a_id", resp.data[0], [])
          // change("OTForm", "ot_degrau", "")
        ]);
      })
      .catch(e => {
        toastr.warning("Atenção", "ENDEREÇOS DA ORIGEM NÃO CARREGADOS.");
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

export function loadAddressBById(params) {
  return dispatch => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/elements/get_address_by_id`,
        params
      )
      .then(resp => {
        dispatch([
          { type: "ADDRESSB_FETCHED_SETTING", payload: resp.data },
          change("OTForm", "ot_address_b_id", resp.data[0], [])
          // change("OTForm", "ot_degrau", "")
        ]);
      })
      .catch(e => {
        toastr.warning("Atenção", "ENDEREÇOS DA ORIGEM NÃO CARREGADOS.");
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

export function loadAddressA(params) {

  return dispatch => {
    dispatch([{ type: "ADDRESSA_FETCHED", payload: [[], ""] }]);
    axios
      .post(`${process.env.REACT_APP_API_URL}/elements/get_endereco_id`, params)
      .then(resp => {
        dispatch([{ type: "ADDRESSA_FETCHED", payload: resp.data }]);
      })
      .catch(e => {
        toastr.warning("Atenção", "ENDEREÇOS DA ORIGEM NÃO CARREGADOS.");
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

export function loadAddressB(params) {
  return dispatch => {
    dispatch([{ type: "ADDRESSB_FETCHED", payload: [[], ""] }]);
    axios
      .post(`${process.env.REACT_APP_API_URL}/elements/get_endereco_id`, params)
      .then(resp => {
        dispatch([{ type: "ADDRESSB_FETCHED", payload: resp.data }]);
      })
      .catch(e => {
        toastr.warning("Atenção", "ENDEREÇOS DO DESTINO NÃO CARREGADOS.");
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

export function init() {
  return [
    showTabs("tabOtPadrao"),
    selectTab("tabOtPadrao"),
    loadFieldsOtForm()
  ];
}
