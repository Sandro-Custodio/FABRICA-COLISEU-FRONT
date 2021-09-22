import axios from "axios";
import { toastr } from "react-redux-toastr";
import { reset } from "redux-form";

const baseURL = process.env.REACT_APP_API_URL;

export const getSdList = (filter, page, flag) => {
  return async dispatch => {
    clearFilter();
    await axios({
      method: "post",
      url: "sds/get_all_report_sd",
      baseURL,
      data: {
        parameters: filter,
        page,
        qtd: 100,
        flag
      }
    })
      .then(resp =>
        dispatch([
          {
            type: "SHOW_SD",
            payload: resp.data
          },
          {
            type: "ADD_FILTER",
            payload: filter
          }
        ])
      )
      .catch(err => {
        toastr.error(
          String(err.response.data.message),
          err.response.statusText
        );
      });
  };
};

export const getOdStatuses = () => {
  return dispatch => {
    axios({
      method: "get",
      url: "ods/get_all_od_statuses",
      baseURL
    })
      .then(resp =>
        dispatch([
          {
            type: "OD_STATUSES",
            payload: resp.data
          }
        ])
      )
      .catch(err => {
        toastr.error(
          String(err.response.data.message),
          err.response.statusText
        );
      });
  };
};

export const getSdStatuses = () => {
  return dispatch => {
    axios({
      method: "get",
      url: "sds/get_all_sd_statuses",
      baseURL
    })
      .then(resp =>
        dispatch([
          {
            type: "SD_STATUSES",
            payload: resp.data
          }
        ])
      )
      .catch(err => {
        toastr.error(
          String(err.response.data.message),
          err.response.statusText
        );
      });
  };
};

export const getAllVendors = () => {
  return dispatch => {
    axios({
      method: "get",
      url: "vendors/get_all_vendors",
      baseURL
    })
      .then(resp =>
        dispatch([
          {
            type: "ALL_VENDORS",
            payload: resp.data
          }
        ])
      )
      .catch(err => {
        toastr.error(
          String(err.response.data.message),
          err.response.statusText
        );
      });
  };
};

export const carregarDadosVisualizar = sdId => {
  return async dispatch => {
    await axios({
      method: "get",
      url: "sds/get_visualizar_data",
      baseURL,
      params: {
        id: sdId
      }
    })
      .then(resp =>
        dispatch([
          {
            type: "DADOS_VISUALIZAR",
            payload: resp.data
          }
        ])
      )
      .catch(err => {
        toastr.error(
          String(err.response.data.message),
          err.response.statusText
        );
      });
  };
};

export const clearFilter = () => {
  return dispatch =>
    dispatch([reset("sdOpenFilter"), { type: "ADD_FILTER", payload: {} }]);
};
