import axios from "axios";
import { toastr } from "react-redux-toastr";
import get from "lodash/get";
import { download } from "ot/radar-possibilidades/actions";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

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
export const setFormData = ({ action, data, od_user, circ }) => {
  return dispatch => {
    const openSdForm = () => {
      window.$("#sd-form").modal("show");
    };
    dispatch({ type: "SHOW_OVERLAY" });
    axios
      .post("ot_ll/get_user_by_id", { user_id: od_user })
      .then(odUser => {
        if (data.sd) {
          axios
            .post("ot_ll/get_user_by_id", { user_id: data.sd.user_id })
            .then(res => {
              dispatch([
                {
                  type: "SET_OD_USER",
                  payload: odUser.data
                },
                {
                  type: "SET_SD_USER",
                  payload: res.data
                },
                {
                  type: "SET_FORM_DATA",
                  payload: { action, data, circ }
                },
                openSdForm(),
                {
                  type: "HIDE_OVERLAY"
                }
              ]);
            })
            .catch(e => dispatch(handle_error(e)));
        } else {
          dispatch([
            {
              type: "SET_OD_USER",
              payload: odUser.data
            },
            {
              type: "SET_SD_USER",
              payload: {}
            },
            {
              type: "SET_FORM_DATA",
              payload: { action, data, circ }
            },
            openSdForm(),
            {
              type: "HIDE_OVERLAY"
            }
          ]);
        }
      })
      .catch(e => dispatch(handle_error(e)));
  };
};

export const setContract = contractData => {
  return dispatch =>
    dispatch({
      type: "SET_CONTRACT",
      payload: contractData
    });
};

export const saveSd = (data, init) => {
  return async dispatch => {
    if (data.sd_leasedlines.length < 1) {
      return toastr.warning("Selecione no mínimo 1 circuito.");
    }
    dispatch({ type: "SHOW_OVERLAY" });
    await axios
      .post("sds/save_sd", { sd: data })
      .then(res => {
        dispatch([
          () => {
            init();
            setTimeout(() => {
              window.$("#sd-form").modal("hide");
              init();
            }, 2000);
          }
        ]);
        toastr.success(data.code + " salva com sucesso!");
      })
      .catch(e => dispatch(handle_error(e)));
  };
};

export const get_files_by_sd = (sd_id, open_modal = true) => {
  return async dispatch => {
    dispatch({ type: "SHOW_FILE_OVERLAY" });
    if (open_modal) window.$("#sd-files").modal("show");
    await axios
      .post("/sd_attachs/get_files_by_sd", { sd_id })
      .then(res => {
        dispatch([
          { type: "GET_FILES_BY_SD", payload: res.data },
          { type: "HIDE_FILE_OVERLAY" }
        ]);
      })
      .catch(e => dispatch([handle_error(e), { type: "HIDE_FILE_OVERLAY" }]));
  };
};

export const save_file = (file_name, file_name_db, sd_id) => {
  return async dispatch => {
    dispatch({ type: "SHOW_FILE_OVERLAY" });
    await axios
      .post("/sd_attachs/save_files", {
        params: { sd_id, file_name_db, file_name }
      })
      .then(res => {
        toastr.success("Arquivo enviado com sucesso!");
        dispatch(get_files_by_sd(sd_id));
      })
      .catch(e => dispatch([handle_error(e), { type: "HIDE_FILE_OVERLAY" }]));
  };
};

export const remove_file = (file_id, sd_id) => {
  return async dispatch => {
    dispatch({ type: "SHOW_FILE_OVERLAY" });
    await axios
      .post("/sd_attachs/remove_file", { file_id })
      .then($ => {
        toastr.success("Arquivo excluído com sucesso!");
        dispatch(get_files_by_sd(sd_id, false));
      })
      .catch(e => dispatch([handle_error(e), { type: "HIDE_FILE_OVERLAY" }]));
  };
};

export const upload_file = (file, sd_id) => {
  return async dispatch => {
    dispatch({ type: "SHOW_FILE_OVERLAY" });

    const name = file.name;
    const base_name = Date.now() + "_" + name;
    const form_data = new FormData();

    form_data.append("file_name", name);
    form_data.append("base_name", base_name);
    form_data.append("file_data", file);

    await axios
      .post("/upload/attachmentSd", form_data, {
        headers: { "Content-Type": "multipart/form-data" }
      })
      .then(res => {
        console.log(res);
        dispatch([
          { type: "HIDE_FILE_OVERLAY" },
          save_file(name, base_name, sd_id)
        ]);
      })
      .catch(e => dispatch([handle_error(e), { type: "HIDE_FILE_OVERLAY" }]));
  };
};

export const get_all_data_providers = (
  vendor_id,
  open_modal = true,
  print_attach = false
) => {
  return async dispatch => {
    dispatch({ type: "SHOW_VENDOR_OVERLAY" });

    const get = async () => {
      await axios
        .post(`/vendors/get_all_data_providers?vendor_id=${vendor_id}`)
        .then(res => {
          dispatch([
            { type: "GET_ALL_DATA_PROVIDER", payload: res.data },
            { type: "HIDE_VENDOR_OVERLAY" }
          ]);
        })
        .catch(e =>
          dispatch([handle_error(e), { type: "HIDE_PROVIDER_OVERLAY" }])
        );
    };

    if (open_modal) {
      window.$("#sd-vendor").modal("show");
      axios
        .post("/vendors/get_vendor_by_id", { vendor_id })
        .then(res => {
          dispatch({ type: "SET_VENDOR", payload: res.data });
          document.getElementById("imprimir-assinar-provedor").checked =
            res.data.print_attach;
          get();
        })
        .catch(e => {
          dispatch(handle_error(e));
          get();
        });
    } else {
      get();
    }
  };
};

export const addNewContact = provider_id => dispatch => {
  const newContact = {
    id: "NEW" + Date.now(),
    contact_name: "NOVO CONTATO",
    contact_number: null,
    contact_mail: null,
    address: null,
    address_number: null,
    address_complement: null,
    address_cep: null,
    address_neighborhood: null,
    address_city: null,
    address_state: null,
    provedor_id: provider_id,
    addressee: "To",
    contact_number2: null,
    contact_number3: null,
    cpf: null,
    identidade: null,
    ocupacao: null,
    site: null,
    is_new: 1
  };
  dispatch({ type: "ADD_NEW_CONTACT", payload: newContact });
};

export const saveData = (contacts, provider) => {
  return async dispatch => {
    dispatch({ type: "SHOW_VENDOR_OVERLAY" });
    await axios
      .post("vendors/save_provider_and_contacts", { contacts, provider })
      .then(res => {
        toastr.success("E-mail(s) cadastrado(s) com sucesso!");
        dispatch(get_all_data_providers(provider.id, false));
        dispatch({ type: "HIDE_VENDOR_OVERLAY" });
      })
      .catch(e => dispatch([handle_error(e), { type: "HIDE_VENDOR_OVERLAY" }]));
  };
};

export const remove_contact = contact => {
  return async dispatch => {
    dispatch({ type: "SHOW_VENDOR_OVERLAY" });
    await axios
      .post("vendors/remove_contact", { contact })
      .then(res => {
        dispatch({ type: "HIDE_VENDOR_OVERLAY" });
        toastr.success("Contato excluído com suesso!");
      })
      .catch(e => dispatch(handle_error(e)));
  };
};

export const updateLocalContacts = data => dispatch =>
  dispatch({
    type: "SET_CONTACTS",
    payload: data // .sort((a, b) => a.id - b.id)
  });

export const get_intelig_contract_forms = od_code => {
  return async dispatch => {
    dispatch({ type: "SHOW_INTELIG_OVERLAY" });
    window.$("#sd-intelig").modal("show");
    await axios
      .post("/sds/get_intelig_contract_forms", { od_code })
      .then(res => {
        dispatch({ type: "SET_INTELIG", payload: res.data });
        dispatch({ type: "HIDE_INTELIG_OVERLAY" });
      })
      .catch(e => {
        dispatch(handle_error(e));
        dispatch({ type: "HIDE_INTELIG_OVERLAY" });
      });
  };
};

export const save_then_send_email = (data, init) => {
  return async dispatch => {
    // dispatch({ type: "SHOW_OVERLAY" });

    if (data.anexos.length < 1) delete data.anexos;

    await axios
      .post("/sds/save_then_send_email", data)
      .then(res => {
        // console.log(res)
        init();
        setTimeout(() => {
          init();
          window.$("#sd-mail").modal("hide");
          window.$("#sd-form").modal("hide");
          toastr.success("E-mail enviado com sucesso!");
          dispatch({ type: "HIDE_OVERLAY" });
        }, 2000);
      })
      .catch(e => dispatch(handle_error(e)));
  };
};

export const get_ot_segmentations = circs => {
  return async dispatch => {
    dispatch({ type: "SHOW_CIRCS_OVERLAY" });
    if (circs.length > 0) {
      await axios
        .post("ot_segmentations/get_ot_segmentations", {
          id_list: circs.map(c => Number(c.ot_segmentation_id).toFixed(0))
        })
        .then(res => {
          const circuitos = circs.map(c => ({
            ...c,
            ot_segmentation: res.data.filter(
              e => e.id == Number(c.ot_segmentation_id).toFixed(0)
            )[0]
          }));
          dispatch([
            { type: "GET_OT_SEGMENTATIONS", payload: circuitos },
            { type: "HIDE_CIRCS_OVERLAY" }
          ]);
        })
        .catch(e =>
          dispatch([handle_error(e), { type: "HIDE_CIRCS_OVERLAY" }])
        );
    } else {
      dispatch({ type: "HIDE_CIRCS_OVERLAY" });
    }
  };
};

export const get_form_data = object => {
  return async dispatch => {
    dispatch({ type: "SHOW_VENDOR_OVERLAY" });
    window.$("#sd-vendor-form").modal("show");
    await axios
      .post("/vendors/get_form_data", object)
      .then(res => {
        dispatch({ type: "HIDE_VENDOR_OVERLAY" });
        dispatch({ type: "SET_VENDOR_FORM", payload: res.data });
      })
      .catch(e => {
        window.$("#sd-vendor-form").modal("hide");
        dispatch([{ type: "HIDE_VENDOR_OVERLAY" }, handle_error(e)]);
      });
  };
};

export const update_vendor_form = forms => {
  return dispatch => {
    dispatch({ type: "UPDATE_VENDOR_FORM", payload: forms });
  };
};

export const save_form_data = (
  forms,
  format,
  download,
  sd_id,
  name,
  operator
) => {
  return async dispatch => {
    dispatch({ type: "SHOW_VENDOR_OVERLAY" });
    await axios
      .post("/vendors/save_form_data", { forms })
      .then(async res => {
        // dispatch({ type: "HIDE_VENDOR_OVERLAY" });
        if (download) {
          if (format == "pdf") {
            await axios
              .post("/ots/generate_pdf", { sd_id, name, operator })
              .then(res => {
                dispatch({ type: "HIDE_VENDOR_OVERLAY" });
                toastr.success(
                  "PDF Gerado com Sucesso!",
                  "Caso o arquivo não abra, verifique se o pop-up foi bloqueado."
                );
                window.open(
                  `${process.env.REACT_APP_API_URL}/${res.data.file}`,
                  "_blank"
                );
              })
              .catch(e =>
                dispatch([{ type: "HIDE_VENDOR_OVERLAY" }, handle_error(e)])
              );
          } else if (format == "csv") {
            await axios
              .post("/ots/generate_csv", { sd_id, name, operator })
              .then(res => {
                dispatch({ type: "HIDE_VENDOR_OVERLAY" });
                toastr.success(
                  "CSV Gerado com Sucesso!",
                  "Caso o arquivo não abra, verifique se o pop-up foi bloqueado."
                );
                window.open(
                  `${process.env.REACT_APP_API_URL}/csv/${res.data.file}`,
                  "_blank"
                );
              })
              .catch(e =>
                dispatch([{ type: "HIDE_VENDOR_OVERLAY" }, handle_error(e)])
              );
          }
        } else {
          dispatch({ type: "HIDE_VENDOR_OVERLAY" });
        }
      })
      .catch(e => dispatch([{ type: "HIDE_VENDOR_OVERLAY" }, handle_error(e)]));
  };
};

export const show_overlay = () => dispatch =>
  dispatch({ type: "SHOW_OVERLAY" });

export const hide_overlay = () => dispatch =>
  dispatch({ type: "HIDE_OVERLAY" });
