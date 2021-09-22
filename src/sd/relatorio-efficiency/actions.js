import axios from 'axios';
import { toastr } from 'react-redux-toastr';

const baseURL = process.env.REACT_APP_API_URL;

export const get_meta_efficiency_report = (year) => {
  return async dispatch => {
    if (year === "") {
      toastr.warning("Por favor selecione um ano");
      return;
    }
    dispatch([{ type: "SHOW_OVERLAY" }]);
    await axios
      .post(`${baseURL}/sds/get_meta_efficiency_report`, { ano: year })
      .then(resp => {
        dispatch([
          { type: "SD_EFFICIENCY_SET_ROWS", payload: resp.data },
          { type: "HIDE_OVERLAY" }
        ]);
      })
      .catch(e => {
        toastr.warning("Atenção", "FALHA AO CARREGAR LISTA DE SDS.");
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

export const get_year_options = () => {
  return dispatch => {
    const year = (new Date()).getFullYear();
    const years = Array.from(new Array(20), (val, index) => year - index);
    dispatch({ type: "SD_EFFICIENCY_SET_YEARS_OPTIONS", payload: years });
  }
}

export const upload_odsd_report = (user_id, file) => {
  return async dispatch => {
    const fileName = file[0].name;

    const formData = new FormData();
    formData.append("Filedata", file[0]);
    formData.append("new_file_name", fileName);
    formData.append("folder_name", "/Carga");
    await axios.post(`${baseURL}/flex_upload/attachment`, formData);

    dispatch([{ type: "SHOW_OVERLAY" }]);
    console.log(user_id, file);
    await axios
      .post(`${baseURL}/sds/upload_odsd_report`, { file_name: fileName, user_id })
      .then(resp => {
        dispatch([
          { type: "HIDE_OVERLAY" }
        ]);
        toastr.success("")
      })
      .catch(e => {
        toastr.warning("Atenção", "FALHA AO FAZER UPLOAD DE ARQUIVO.");
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

export const export_retencao_links = (user_id, year) => {
  return async dispatch => {
    if (year == "") {
      toastr.warning('Ano não selecionado');
      return;
    }
    dispatch([{ type: "SHOW_OVERLAY" }]);
    await axios
      .post(`${baseURL}/sds/export_retencao_links`, { ano: year, user_id })
      .then(resp => {
        setTimeout(() => {
          window.open(`${baseURL}/${resp.data.path}`);
        }, 1000);
      })
      .catch(e => {
        toastr.warning("Atenção", "FALHA AO FAZER DOWNLOAD DE ARQUIVO.");
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
    dispatch([{ type: "HIDE_OVERLAY" }]);
  };
};

export const generate_base_od_sd = (user_id, year) => {
  return async dispatch => {
    if (year == "") {
      toastr.warning('Ano não selecionado');
      return;
    }
    dispatch([{ type: "SHOW_OVERLAY" }]);
    await axios
      .post(`${baseURL}/sds/generate_base_od_sd`, { ano: year, user_id })
      .then(resp => {
        if(resp.data.filename !== ''){
          setTimeout(() => {
            window.open(`${baseURL}/base_od_sd/${resp.data.filename}`);
          }, 100);
        }else{
          toastr.warning('Erro ao gerar relatório');
        }        
      })
      .catch(e => {
        toastr.warning("Atenção", "FALHA AO FAZER DOWNLOAD DE ARQUIVO.");
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
    dispatch([{ type: "HIDE_OVERLAY" }]);
  };
};