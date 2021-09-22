import { toastr } from "react-redux-toastr";
import axios from "axios";


const baseUrl = process.env.REACT_APP_API_URL;

export const downloadModeloBdConfig = () => {
    window.open(`${baseUrl}/modelo/modelo_higienizacao_bd_config.xls`);    
}

export const uploadFileBdConfig = file => {
    const form = new FormData();
    form.append("folder_name", "higienizacao_bd_config");
    form.append("new_file_name", file.name);
    form.append("Filedata", file);
    return new Promise(resolve =>
      axios
        .post(`${baseUrl}/flex_upload/attachment`, form)
        .then(() => {
          axios
            .post(`${baseUrl}/ot_leasedline_cleanner/upload_bdconfig_higienizacao`, {
              pFileName: file.name
            })
            .then(() => {
              toastr.info("Upload realizado com sucesso");
              resolve();
            })
            .catch(() => {
              toastr.error("Erro", "Erro ao realizar upload");
              resolve();
            });
        })
        .catch(() => {
          toastr.error("Erro", "Erro ao realizar upload");
          resolve();
        })
    );  
}

export const downloadCriticas = () => {
    window.open(`${baseUrl}/bd_config_critcs/BdCriticas.xls`);    
}

export const getCriticasHigienizacao = () => async dispatch => {
        await axios
          .post(`${baseUrl}/ot_leasedline_cleanner/get_criticas_higienizacao`)
          .then(resp => {
            console.log("resp", resp);
            dispatch(
              { type: "SET_BDCONFIGIMPORT_CRITICS", payload: resp.data });
          })
          .catch(e => {
            toastr.warning("Atenção", "FALHA AO CARREGAR LISTA DE CRITICAS PARA BDCONFIG.");
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
}

export const downloadModeloLinksSnoa = () => {
    window.open(`${baseUrl}/modelo/modelo_higienizacao_snoa.xls`);    
}

export const uploadFileLinksSnoa = file => {
    const form = new FormData();
    form.append("folder_name", "higienizacao_snoa");
    form.append("new_file_name", file.name);
    form.append("Filedata", file);
    return new Promise(resolve =>
      axios
        .post(`${baseUrl}/flex_upload/attachment`, form)
        .then(() => {
          axios
            .post(`${baseUrl}/ot_leasedline_cleanner/upload_bdconfig_higienizacao`, {
              pFileName: file.name
            })
            .then(() => {
              toastr.info("Upload realizado com sucesso");
              resolve();
            })
            .catch(() => {
              toastr.error("Erro", "Erro ao realizar upload");
              resolve();
            });
        })
        .catch(() => {
          toastr.error("Erro", "Erro ao realizar upload");
          resolve();
        })
    );  
}

export const getSnoaHigieneCritics = () => async dispatch => {
    await axios
      .post(`${baseUrl}/snoa/get_snoa_hygiene_critics`)
      .then(resp => {
        console.log("resp", resp);
        dispatch(
          { type: "SET_SNOA_CRITICS", payload: resp.data });
      })
      .catch(e => {
        toastr.warning("Atenção", "FALHA AO CARREGAR LISTA DE CRITICAS PARA LINKS SNOA.");
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
}

export const downloadCriticasSnoa = () => {
    window.open(`${baseUrl}/criticas_higienizacao_snoa/criticas_links_snoa.xls`);    
}

