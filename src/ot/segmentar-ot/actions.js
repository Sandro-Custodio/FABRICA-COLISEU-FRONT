import { toastr } from "react-redux-toastr";
import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL;

export const dispatchSegmentarData = ({ data, optionsData, regionalData }) => {
  return dispatch => {
    dispatch({
      type: "SET_SEGMENTAR_DATA",
      payload: [data, optionsData, regionalData]
    });
  };
};

export const setOverlay = loading => {
  return dispatch => {
    if (loading) {
      dispatch({ type: "SHOW_OVERLAY" });
    } else {
      dispatch({ type: "HIDE_OVERLAY" });
    }
  };
};

export const getSegmentarData = seg_id => {
  return new Promise((resolve, reject) => {
    const otSeg = updateObjectOtSeg(seg_id);
    const auxiliarTables = getOtAuxiliarTables();
    const operators = getOperators();

    Promise.all([otSeg, auxiliarTables, operators])
      .then(response => {
        resolve({
          data: response[0].data,
          optionsData: response[1].data,
          regionalData: response[2].data
        });
      })
      .catch(err => {
        console.log(err);
        toastr.error("Erro", "Erro ao buscar informações de Segmentação");
        reject();
      });
  });
};

const updateObjectOtSeg = ot_seg_id =>
  axios.post(`${baseUrl}/ots/update_object_ot_seg`, { ot_seg_id });

const getOtAuxiliarTables = () =>
  axios.post(`${baseUrl}/ots/get_ot_auxiliar_tables`, {});

const getOperators = () => axios.post(`${baseUrl}/elements/get_operators`, {});

export const getElementTypes = regional => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${baseUrl}/elements/get_element_types`, { regional })
      .then(response => {
        resolve({
          elementType: response.data.vw_element
        });
      })
      .catch(err => {
        console.log(err);
        toastr.error("Erro", "Erro ao buscar informações de Segmentação");
        reject();
      });
  });
};

export const getElementId = (regional, type) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${baseUrl}/elements/get_element_id`, { regional, type })
      .then(response => {
        resolve({
          elementId: response.data.elemento
        });
      })
      .catch(err => {
        console.log(err);
        toastr.error("Erro", "Erro ao buscar informações de Segmentação");
        reject();
      });
  });
};

export const getEnderecoId = (operator, element_type, elemento_id) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${baseUrl}/elements/get_endereco_id`, {
        operator,
        element_type,
        elemento_id
      })
      .then(response => {
        resolve({
          enderecoId: response.data[0]
        });
      })
      .catch(err => {
        console.log(err);
        toastr.error("Erro", "Erro ao buscar informações de Segmentação");
        reject();
      });
  });
};

export const segmentarOT = (
  id_seg,
  novo_ponto,
  link_a,
  link_b,
  user_id,
  obs_a = "",
  obs_b = ""
) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${baseUrl}/ot_segmentations/do_ot_segmentation`, {
        id_seg,
        novo_ponto,
        link_a,
        link_b,
        user_id,
        obs_a,
        obs_b
      })
      .then(() => {
        resolve();
      })
      .catch(err => {
        console.log(err);
        reject();
      });
  });
};
