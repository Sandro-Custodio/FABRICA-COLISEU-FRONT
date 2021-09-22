import axios from "axios";
import { toastr } from "react-redux-toastr";
import get from "lodash/get";

const baseUrl = process.env.REACT_APP_API_URL;

export const uploadFileOtMult = form => async dispatch => {
  let criticas = [];
  try {
    dispatch({ type: "MULTIPLEOT_CLEAR" });
    dispatch({ type: "MULTIPLEOT_SET_LOADING", payload: true });

    const config = { headers: { "content-type": "multipart/form-data" } };
    await axios.post(`${baseUrl}/flex_upload/attachment`, form, config);
    const { data } = await axios.post(
      `${baseUrl}/ots/import_mult_ot`,
      form,
      config
    );

    criticas = get(data, "ot_errors", []);
    dispatch({ type: "MULTIPLEOT_SET_CRITICAS", payload: criticas });
    if (criticas.length) {
      toastr.warning("Atenção", "Algumas OTS foram criticadas");
      dispatch({
        type: "MULTIPLEOT_SET_FILE_CRITICA",
        payload: data.critic_file
      });
      dispatch({
        type: "MULTIPLEOT_SET_FILE_CREATED",
        payload: data.created_file
      });
    }

    dispatch({ type: "MULTIPLEOT_SET_OTS", payload: data.ots });
  } catch (error) {
    toastr.error(
      "Erro",
      get(error, "response.data.message", "Erro ao realizar upload")
    );
  } finally {
    dispatch({ type: "MULTIPLEOT_SET_LOADING", payload: false });
  }
};

export const createOts = () => async (dispatch, getState) => {
  try {
    const ot_ids = get(getState(), "OtMultiple.ots", []).map(el => el.id);
    const user_id = get(getState(), "auth.user.id");
    const { data } = await axios.post(`${baseUrl}/ots/save_ot_mult_complete`, {
      user_id,
      ot_ids
    });
    return data;
  } catch (error) {
    toastr.error(
      "Erro",
      get(error, "response.data.message", "Erro ao realizar carga")
    );
    return [];
  }
};
