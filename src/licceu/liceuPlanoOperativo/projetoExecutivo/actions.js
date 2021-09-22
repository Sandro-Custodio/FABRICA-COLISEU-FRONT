import axios from "axios";
import { toastr } from "react-redux-toastr";
import get from "lodash/get";

const baseUrl = process.env.REACT_APP_API_URL_JAVA;

const getOts = () => axios.get(`${baseUrl}/vendor/ots/`);

const getSites = () => axios.get(`${baseUrl}/vendor/sites-id/`);

export const filterLoad = () => async dispatch => {
  try {
    dispatch({
      type: "PROJETOEXECUTIVOLISTAR_SET_LOADING_FILTER",
      payload: true
    });
    const [ots, sites] = await Promise.all([getOts(), getSites()]);
    dispatch([
      {
        type: "PROJETOEXECUTIVOLISTAR_SET_OTS",
        payload: ots.data.map(val => ({ value: val, text: val }))
      },
      {
        type: "PROJETOEXECUTIVOLISTAR_SET_SITES",
        payload: sites.data.map(([val]) => ({ value: val, text: val }))
      }
    ]);
  } catch (error) {
    toastr.error("Erro", "Erro ao carregar filtros");
  } finally {
    dispatch({
      type: "PROJETOEXECUTIVOLISTAR_SET_LOADING_FILTER",
      payload: false
    });
  }
};

export const listTable = () => async (dispatch, getState) => {
  try {
    dispatch([
      {
        type: "PROJETOEXECUTIVOLISTAR_SET_LOADING_TABLE",
        payload: true
      },
      { type: "PROJETOEXECUTIVOLISTAR_SET_SELECTION", payload: [] }
    ]);
    const { acesso, transporte, ...params } = get(
      getState(),
      "form.filterProjetoExecutivo.values",
      {}
    );
    if (!acesso !== !transporte)
      params.tipoCarga = `${acesso ? "ACESSO" : ""}${
        transporte ? "TRANSPORTE" : ""
      }`;
    const { data } = await axios.get(`${baseUrl}/vendor/search`, { params });
    dispatch({ type: "PROJETOEXECUTIVOLISTAR_SET_ROWS", payload: data || [] });
  } catch (error) {
    toastr.error("Erro", "Erro ao listar registros da tabela");
  } finally {
    dispatch({
      type: "PROJETOEXECUTIVOLISTAR_SET_LOADING_TABLE",
      payload: false
    });
  }
};
