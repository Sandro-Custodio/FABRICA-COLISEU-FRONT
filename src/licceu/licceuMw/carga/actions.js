import axios from "axios";
import { toastr } from "react-redux-toastr";
import get from "lodash/get";

const baseUrl = process.env.REACT_APP_API_URL;
export const uploadFile = ({ file, user_id }) => async dispatch => {
  try {
    dispatch({ type: "CARGAMW_SET_ROWS", payload: [] });
    dispatch({ type: "CARGAMW_SET_LOADING", payload: true });
    const form = new FormData();
    form.append("folder_name", "flex_upload");
    form.append("new_file_name", file.name);
    form.append("Filedata", file);
    await axios.post(`${baseUrl}/flex_upload/attachment`, form);
    await axios.post(`${baseUrl}/mw_routes/preload_mw_file`, {
      user_id,
      filename: file.name
    });
    const { data } = await axios.get(`${baseUrl}/mw_routes/situations`, {
      params: { user_id }
    });
    dispatch({ type: "CARGAMW_SET_ROWS", payload: data });
  } catch (error) {
    toastr.error(
      "Erro",
      get(error, "response.data.message", "Erro ao realizar upload do arquivo")
    );
  } finally {
    dispatch({ type: "CARGAMW_SET_LOADING", payload: false });
  }
};
