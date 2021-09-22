import axios from "axios";
import { toastr } from "react-redux-toastr";

const baseUrl = process.env.REACT_APP_API_URL_JAVA;

export const getList = () => async dispatch => {
  try {
    dispatch({ type: "GERENCIAMENTO_LOADING_TABLE", payload: true });
    const { data } = await axios.get(`${baseUrl}/base-cadeia/get-files`);
    dispatch({ type: "GERENCIAMENTO_ROWS", payload: data });
  } catch (error) {
    toastr.error("Erro", "Erro ao buscar registros da tabela");
  } finally {
    dispatch([
      { type: "GERENCIAMENTO_LOADING_TABLE", payload: false },
      { type: "RESET_SELECTIONS_GERENCIAMENTO" }
    ]);
  }
};

export const uploadFile = file => async dispatch => {
  try {
    const form = new FormData();
    form.append("arquivo", file);
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    dispatch({ type: "GERENCIAMENTO_LOADING_TABLE", payload: true });
    const { data } = await axios.post(
      `${baseUrl}/base-cadeia/validar`,
      form,
      config
    );
    if (data && data.warning) toastr.warning("Atenção", data.warning);
    else {
      await axios.post(`${baseUrl}/base-cadeia/upload`, form, config);
      dispatch(getList());
      toastr.success("Sucesso", "Upload realizado com sucesso");
    }
  } catch (error) {
    toastr.error("Erro", "Arquivo fora do layout");
  } finally {
    dispatch({ type: "GERENCIAMENTO_LOADING_TABLE", payload: false });
  }
};
