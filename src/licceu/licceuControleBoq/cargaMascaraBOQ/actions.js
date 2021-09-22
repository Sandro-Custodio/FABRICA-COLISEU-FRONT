/* eslint-disable import/prefer-default-export */
import { toastr } from "react-redux-toastr";
import axios from "axios";
import get from "lodash/get";

const baseUrl = process.env.REACT_APP_API_URL_JAVA;

export const getFiles = () =>
  new Promise((resolve, reject) =>
    axios
      .post(
        `${baseUrl}/mascara-boq/get-files`,
        {},
        { headers: { "Content-Type": "application/json" } }
      )
      .then(response => {
        resolve({ rows: response.data });
      })
      .catch(() => {
        toastr.error("Erro", "Erro ao carregar lista de arquivos");
        reject();
      })
  );

export const uploadFileMascaraBoq = async form => {
  try {
    const config = { headers: { "content-type": "multipart/form-data" } };
    const baseURL = `${process.env.REACT_APP_API_URL_JAVA}/mascara-boq`;
    await axios.post(`${baseURL}/upload2`, form, config);
    toastr.info("Sucesso", "Arquivo carregado com sucesso");
    console.log("Sucesso!");
  } catch (error) {
    toastr.error(
      "Erro",
      get(error, "response.data.message", "Erro ao realizaar upload do arquivo")
    );
  }
};
