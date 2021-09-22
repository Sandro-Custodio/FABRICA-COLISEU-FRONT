import { toastr } from "react-redux-toastr";
import axios from "axios";
import get from "lodash/get";

export const listFiles = () => async (dispatch, gestate) => {
  try {
    dispatch({ type: "SET_GERACAO_PLO_LOADING_TABLE", payload: true });
    const URL = `${process.env.REACT_APP_API_URL_JAVA}/geracao-po/get-files`;
    const FILTER = get(
      gestate(),
      "form.filterFormGeracao.values.tipo_documento",
      "TODOS"
    );
    const header = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(URL, FILTER, header);
    dispatch({ type: "SET_GERACAO_PLO_ROWS", payload: data });
  } catch (error) {
    toastr.error("Erro", "Erro ao buscar lista de arquivos");
  } finally {
    dispatch({ type: "SET_GERACAO_PLO_LOADING_TABLE", payload: false });
  }
};

export const listDocuments = () => async dispatch => {
  try {
    dispatch({ type: "SET_GERACAO_PLO_LOADING_TIPODOC", payload: true });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL_JAVA}/geracao-po/get-documentos`
    );
    dispatch({ type: "SET_GERACAO_PLO_TIPODOC", payload: data });
  } catch (error) {
    toastr.error("Erro", "Erro ao buscar tipos de documentos");
  } finally {
    dispatch({ type: "SET_GERACAO_PLO_LOADING_TIPODOC", payload: false });
  }
};

export const addTipoDocumento = txt => async dispatch => {
  try {
    dispatch({ type: "SET_GERACAO_PLO_LOADING_TIPODOC", payload: true });
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL_JAVA}/geracao-po/add-documento`,
      txt,
      { headers: { "Content-Type": "application/json" } }
    );
    dispatch({ type: "SET_GERACAO_PLO_TIPODOC", payload: data });
  } catch (error) {
    toastr.error("Erro", "Erro ao buscar tipos de documentos");
  } finally {
    dispatch({ type: "SET_GERACAO_PLO_LOADING_TIPODOC", payload: false });
  }
};

export const removeTipoDocumento = txt => async dispatch => {
  try {
    dispatch({ type: "SET_GERACAO_PLO_LOADING_TIPODOC", payload: true });
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL_JAVA}/geracao-po/remover-documento`,
      txt,
      { headers: { "Content-Type": "application/json" } }
    );
    dispatch({ type: "SET_GERACAO_PLO_TIPODOC", payload: data });
  } catch (error) {
    toastr.error("Erro", "Erro ao buscar tipos de documentos");
  } finally {
    dispatch({ type: "SET_GERACAO_PLO_LOADING_TIPODOC", payload: false });
  }
};

export const uploadFile = form => async (dispatch, getState) => {
  try {
    dispatch({ type: "SET_GERACAO_PLO_LOADING_TABLE", payload: true });
    const config = { headers: { "content-type": "multipart/form-data" } };
    const baseURL = `${process.env.REACT_APP_API_URL_JAVA}/geracao-po`;
    await axios.post(`${baseURL}/validar`, form, config);
    await axios.post(`${baseURL}/upload`, form, config);
    toastr.success("Sucesso", "Upload realizado com sucesso");
    listDocuments()(dispatch, getState);
  } catch (error) {
    toastr.error(
      "Erro",
      "Erro ao subir arquivo. Verifique se o layout está correto"
    );
  } finally {
    dispatch({ type: "SET_GERACAO_PLO_LOADING_TABLE", payload: false });
  }
};
