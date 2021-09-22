import axios from "axios";
import { toastr } from "react-redux-toastr";

export function getOtDataFormularioAnexo(linhaSelecionada) {
  const params = {
    seg_id: linhaSelecionada.seg_id,
    1: "FORMULARIO_ASSINADO"
  };
  return dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    axios
      .post(`${process.env.REACT_APP_API_URL}/ots/get_seg_attachments`, params)
      .then(resp => {
        dispatch({
          type: "ASSINAR_OT_FETCHED_GET_INFO",
          payload: resp.data,
          linhaSelecionada
        });
        dispatch([{ type: "HIDE_OVERLAY" }]);
      })
      .catch(e => {
        toastr.warning("Atenção", "ERROR");
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
        dispatch({ type: "HIDE_OVERLAY" });
      });
  };
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

export function uploadFileOtMult(formData) {
  axios({
    method: "post",
    baseURL: process.env.REACT_APP_API_URL,
    url: "/flex_upload/attachment",
    data: formData,
    headers: { "content-type": "application/octet-stream" },
    json: true
  })
    .then(function(response) {
      // handle success
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    });
}

export function rowAlterarState(files) {
  const params = {
    name: files[0].name,
    lastModifiedDate: new Date().toDateString(),
    size: files[0].size,
    path: files[0].path.split(".", 2)[1],
    type: files[0].type,
    repository_name: files[0].repository_name,
    attach_type: "FORMULARIO_ASSINADO"
  };
  return dispatch => {
    dispatch({ type: "ASSINAR_ROW_CHANGED", payload: params });
  };
}

export function saveAnexoOT(formularioData, ot) {
  const params = {
    seg: ot,
    attachment: formularioData
  };

  return dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });

    return axios
      .post(
        `${process.env.REACT_APP_API_URL}/ot_segmentations/save_seg_attachments`,
        params
      )
      .then(resp => {
        if (resp.status === 200) {
          dispatch([{ type: "ASSINAR_RESET" }]);

          toastr.success("", "Anexos inseridos/atualizados com sucesso!");
        } else {
          toastr.info("Erro", "Falha de ......");
        }
        dispatch([{ type: "HIDE_OVERLAY" }]);
      })
      .catch(e => {
        toastr.warning("Atenção", "ERROR");
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

export function download(path, filename, token) {
  fetch(`${process.env.REACT_APP_API_URL}/download`, {
    method: "POST",
    headers: { Authorization: token, "Content-Type": "application/json" },
    body: JSON.stringify({
      path: `${path}${filename}`
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
