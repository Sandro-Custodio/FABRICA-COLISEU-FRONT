import axios from "axios";
import { toastr } from "react-redux-toastr";

const baseUrl = process.env.REACT_APP_API_URL_JAVA;

export const list = () =>
  axios
    .post(`${baseUrl}/geracao-po/search-pendentes-plo`, {})
    .then(response => response.data)
    .catch(() => {
      toastr.error("Erro", "Erro ao buscar registros");
      return [];
    });

export const remove = rows =>
  axios
    .post(`${baseUrl}/geracao-po/deletePendentsCircuits`, rows)
    .then(() => toastr.success("Sucesso", "Registro removido com sucesso"))
    .catch(() => toastr.error("Erro", "Erro ao remover registro"));
