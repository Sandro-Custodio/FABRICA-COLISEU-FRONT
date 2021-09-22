import { toastr } from "react-redux-toastr";
import axios from "axios";

import { convertDate } from "common";

const baseUrl = process.env.REACT_APP_API_URL;

export const getCircuits = filter => {
  return new Promise(resolve =>
    axios
      .post(`${baseUrl}/ot_ll/get_circuits`, {
        filter
      })
      .then(response => {
        resolve({
          rows: response.data.circ.map(n => ({
            ...n,
            data_ativacao: convertDate(n.data_ativacao)
          }))
        });
      })
      .catch(() => {
        toastr.error("Erro", "Erro ao realizar filtro");
        resolve();
      })
  );
};

export const editar = (circs, circuit_bill) => {
  return new Promise(resolve =>
    axios
      .post(`${baseUrl}/ot_ll/update_circuit_ll`, {
        circs,
        circuit_bill
      })
      .then(() => {
        toastr.info("Circuito editado com sucesso");
        resolve();
      })
      .catch(() => {
        toastr.error("Erro", "Erro ao editar circuito");
        resolve();
      })
  );
};

export const uploadFile = file => {
  const form = new FormData();
  form.append("folder_name", "upload");
  form.append("new_file_name", file.name);
  form.append("Filedata", file);
  return new Promise(resolve =>
    axios
      .post(`${baseUrl}/flex_upload/attachment`, form)
      .then(() => {
        axios
          .post(`${baseUrl}/ot_ll/upload_ll_guid_update_circuit`, {
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
};

export const downloadModelo = () => {
  window.open(`${baseUrl}/modelo/modelo_filtro_circuito.csv`);
};
