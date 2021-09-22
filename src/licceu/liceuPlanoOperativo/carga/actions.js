import { toastr } from "react-redux-toastr";
import axios from "axios";
import get from "lodash/get";

import { url_list_download } from "./config.json";

export const listDownload = ({ code, form }) => async dispatch => {
  try {
    dispatch({ type: "SET_CARGA_PLO_LOADING_TABLE", payload: true });
    const baseUrl = `${process.env.REACT_APP_API_URL_JAVA}/${url_list_download[code]}`;
    const { data } = await axios.get(`${baseUrl}/${form.year}/${form.po}`);
    dispatch({ type: "SET_CARGA_PLO_ROWS", payload: data });
  } catch (erro) {
    toastr.error("Erro", "Erro ao buscar lista de downloads");
  } finally {
    dispatch({ type: "SET_CARGA_PLO_LOADING_TABLE", payload: false });
  }
};

export const validateFile = form => async dispatch => {
  try {
    dispatch({ type: "SET_CARGA_PLO_LOADING_UPLOAD_TABLE", payload: true });
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL_JAVA}/carga/validar`,
      form
    );
    dispatch({ type: "SET_CARGA_PLO_ROWSUPLOAD", payload: data });
  } catch (error) {
    toastr.error(
      "Erro",
      get(
        error,
        "response.data.message",
        "Erro ao validar arquivo. Verifique se o layout está correto"
      )
    );
  } finally {
    dispatch({ type: "SET_CARGA_PLO_LOADING_UPLOAD_TABLE", payload: false });
  }
};

export const sendFile = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "SET_CARGA_PLO_LOADING_UPLOAD_TABLE", payload: true });
    await axios.post(
      `${process.env.REACT_APP_API_URL_JAVA}/carga/upload`,
      getState().licceuCargaPLO.rows_selected_upload
    );
    toastr.success("Sucesso", "Upload realizado com sucesso!");
  } catch (error) {
    toastr.error(
      "Erro",
      get(error, "response.data.message", "Erro ao realizar upload do arquivo")
    );
  } finally {
    dispatch({ type: "SET_CARGA_PLO_LOADING_UPLOAD_TABLE", payload: false });
  }
};
