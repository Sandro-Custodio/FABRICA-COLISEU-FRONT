import axios from "axios";
import get from "lodash/get";
import { toastr } from "react-redux-toastr";

const baseUrl = process.env.REACT_APP_API_URL;

export const listMW = (page = 1) => async (dispatch, getState) => {
  try {
    const filter = get(getState(), "form.listarMwFilter.values", {});
    const params = { filter, page, limit: 100 };
    dispatch({ type: "LISTARMW_SET_LOADING", payload: true });
    const { data } = await axios.post(`${baseUrl}/mw/all_links`, params);
    const rows = data.data;
    const meta = { ...data.meta, page };
    dispatch({ type: "LISTARMW_SET_TABLE", payload: { rows, ...meta } });
  } catch (error) {
    toastr.error("Erro", "Erro ao listar MW");
  } finally {
    dispatch({ type: "LISTARMW_SET_LOADING", payload: false });
  }
};

export const listMWFast = id_licceu => async dispatch => {
  try {
    const filter = {
      capacidade_prefixo: 0,
      capacidade_valor: 100,
      id_licceu
    };
    const params = { filter, page: 1, limit: 100 };
    dispatch({ type: "LISTARMW_SET_LOADING", payload: true });
    const { data } = await axios.post(`${baseUrl}/mw/all_links`, params);
    const rows = data.data;
    const meta = { ...data.meta, page: 1 };
    dispatch({ type: "LISTARMW_SET_TABLE", payload: { rows, ...meta } });
  } catch (error) {
    toastr.error("Erro", "Erro ao listar MW");
  } finally {
    dispatch({ type: "LISTARMW_SET_LOADING", payload: false });
  }
};

export const listByRota = id_rota => async dispatch => {
  try {
    const filter = { id_rota };
    const params = { filter, page: 1, limit: 100 };
    dispatch({ type: "LISTARMW_SET_LOADING", payload: true });
    const { data } = await axios.post(`${baseUrl}/mw/all_links`, params);
    const rows = data.data;
    const meta = { ...data.meta, page: 1 };
    dispatch({ type: "LISTARMW_SET_TABLE", payload: { rows, ...meta } });
  } catch (error) {
    toastr.error("Erro", "Erro ao listar MW");
  } finally {
    dispatch({ type: "LISTARMW_SET_LOADING", payload: false });
  }
};

const listComboMw = async () => {
  const { data } = await axios.get(`${baseUrl}/mw/get_combos_for_mw`);
  return data;
};

const listVendorArea = async () => {
  const { data } = await axios.post(
    `${baseUrl}/vendors/get_all_vendors_by_area`
  );
  return data;
};

const listStationCity = async () => {
  const { data } = await axios.get(`${baseUrl}/mw/get_all_station_cities`);
  return data;
};

const listUf = async () => {
  const { data } = await axios.get(`${baseUrl}/mw/get_all_uf`);
  return data;
};

const listChave = async () => {
  const { data } = await axios.post(`${baseUrl}/mw/get_all_chave`);
  return data;
};

export const listFilter = () => async dispatch => {
  try {
    dispatch({ type: "LISTARMW_FILTER_SET_LOADING", payload: true });
    const [comboMw, vendorArea, stationCity, uf, chave] = await Promise.all([
      listComboMw(),
      listVendorArea(),
      listStationCity(),
      listUf(),
      listChave()
    ]);
    dispatch({
      type: "LISTARMW_FILTER_SET_SELECTS",
      payload: {
        comboMw,
        vendorArea,
        stationCity,
        uf,
        chave
      }
    });
  } catch (error) {
    toastr.error("Erro", "Erro ao buscar filtros");
  } finally {
    dispatch({ type: "LISTARMW_FILTER_SET_LOADING", payload: false });
  }
};

export const changeStatus = status => async (dispatch, getState) => {
  try {
    dispatch({ type: "LISTARMW_SET_LOADING", payload: true });
    const rows = get(getState(), "listarMW.selected_rows", []);
    const user_id = get(getState(), "auth.user.id");
    await axios.post(`${baseUrl}/mw/set_status_multiple_alter`, {
      rows: rows.map(el => ({ id: parseInt(el.id, 10) })),
      status,
      user_id
    });
    listMW()(dispatch, getState);
  } catch (error) {
    toastr.error("Erro", "Erro ao alterar status");
  } finally {
    dispatch({ type: "LISTARMW_SET_LOADING", payload: false });
  }
};

export const editarMw = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "LISTARMW_SET_LOADING", payload: true });
    const dados = get(getState(), "form.mwEditarVisualizarForm.values", {});
    const user_id = get(getState(), "auth.user.id", 0);
    let podeSalvar = true;
    if (dados.status === "CANCELADO") {
      const response = await verificaPodeEditar(dados.id);
      podeSalvar = response.data;
    }
    if (podeSalvar) {
      await realizarEdicaoMw(dados, user_id);
      listMW()(dispatch, getState);
    } else {
      toastr.error(
        "Erro",
        "O enlace está associado a um circuito não cancelado. Não foi possível atualizar!"
      );
      dispatch({ type: "LISTARMW_SET_LOADING", payload: false });
    }
  } catch (error) {
    toastr.error("Erro", "Erro ao editar MW");
    dispatch({ type: "LISTARMW_SET_LOADING", payload: false });
  }
};

export const verificaPodeEditar = id =>
  axios.post(`${baseUrl}/mw/verify_cancel`, { id });

export const realizarEdicaoMw = (dados, user_id) =>
  axios.post(`${baseUrl}/mw/save_detail_data`, { dados, user_id });
