/* eslint-disable no-param-reassign */
import axios from "axios";
import { toastr } from "react-redux-toastr";
import { reset } from "redux-form";

const baseURL = process.env.REACT_APP_API_URL_JAVA;

export const getHub = filter => {
  return dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    axios({
      method: "post",
      url: "hub/searchAllHubPage",
      baseURL,
      data: filter,
      params: {
        page: 0,
        size: 100
      }
    })
      .then(resp =>
        dispatch([
          {
            type: "SHOW_HUB",
            payload: resp.data,
            page: 0,
            total: resp.data.totalElements,
            limit: 100,
            last: resp.data.totalPages,
            filter
          },
          {
            type: "HIDE_OVERLAY"
          }
        ])
      )
      .catch(
        err =>
          toastr.error(
            String(err.response.data.message),
            err.response.statusText
          ),
        dispatch({ type: "HIDE_OVERLAY" })
      );
  };
};

export const previousPage = (page, filter) => {
  return dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    axios({
      method: "post",
      url: "hub/searchAllHubPage",
      baseURL,
      data: filter,
      params: {
        page: page > 0 ? (page -= 1) : 0,
        size: 100
      }
    })
      .then(resp =>
        dispatch([
          {
            type: "PREVIOUS_PAGE",
            payload: resp.data,
            page,
            total: resp.data.totalElements,
            limit: 100,
            filter
          },
          {
            type: "HIDE_OVERLAY"
          }
        ])
      )
      .catch(
        err =>
          toastr.error(
            String(err.response.data.message),
            err.response.statusText
          ),
        dispatch({ type: "HIDE_OVERLAY" })
      );
  };
};

export const nextPage = (page, last, filter) => {
  return dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    axios({
      method: "post",
      url: "hub/searchAllHubPage",
      baseURL,
      data: filter,
      params: {
        page: page < last - 1 ? (page += 1) : last - 1,
        size: 100
      }
    })
      .then(resp =>
        dispatch([
          {
            type: "NEXT_PAGE",
            payload: resp.data,
            page,
            total: resp.data.totalElements,
            limit: 100,
            filter
          },
          {
            type: "HIDE_OVERLAY"
          }
        ])
      )
      .catch(
        err =>
          toastr.error(
            String(err.response.data.message),
            err.response.statusText
          ),
        dispatch({ type: "HIDE_OVERLAY" })
      );
  };
};

export const lastPage = (page, filter) => {
  return dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    axios({
      method: "post",
      url: "hub/searchAllHubPage",
      baseURL,
      data: filter,
      params: {
        page: (page -= 1),
        size: 100
      }
    })
      .then(resp =>
        dispatch([
          {
            type: "LAST_PAGE",
            payload: resp.data,
            page,
            total: resp.data.totalElements,
            limit: 100,
            filter
          },
          {
            type: "HIDE_OVERLAY"
          }
        ])
      )
      .catch(
        err =>
          toastr.error(
            String(err.response.data.message),
            err.response.statusText
          ),
        dispatch({ type: "HIDE_OVERLAY" })
      );
  };
};

export const clearFilter = () => {
  return dispatch => dispatch(reset("licceuHubFilter"));
};

export const getAllRegional = () => {
  return dispatch => {
    axios({
      method: "get",
      url: "hub/regionais",
      baseURL
    })
      .then(resp =>
        dispatch({
          type: "GET_ALL_REGIONAL",
          payload: resp.data
        })
      )
      .catch(err =>
        toastr.error(String(err.response.data.message), err.response.statusText)
      );
  };
};

export const getAllMunicipios = () => {
  return dispatch => {
    axios({
      method: "get",
      url: "hub/cidades",
      baseURL
    })
      .then(resp =>
        dispatch({
          type: "GET_ALL_MUNICIPIOS",
          payload: resp.data
        })
      )
      .catch(err =>
        toastr.error(String(err.response.data.message), err.response.statusText)
      );
  };
};

export const getAllInterface = () => {
  return dispatch => {
    axios({
      method: "get",
      url: "hub/interfaces",
      baseURL
    })
      .then(resp =>
        dispatch({
          type: "GET_ALL_INTERFACE",
          payload: resp.data
        })
      )
      .catch(err =>
        toastr.error(String(err.response.data.message), err.response.statusText)
      );
  };
};

export const postAlteracaoMassivaStatus = (status, datails) => {
  return async dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    await axios({
      method: "post",
      url: "hub/changeStatus",
      baseURL,
      data: {
        status,
        datails
      }
    })
      .then(() => {
        dispatch({ type: "HIDE_OVERLAY" });
        toastr.info("Status alterado com sucesso");
      })
      .catch(err => {
        dispatch({ type: "HIDE_OVERLAY" });
        toastr.error(
          String(err.response.data.message),
          err.response.statusText
        );
      });
  };
};

export const postEditarHub = (codigoHub, hubData) => {
  return async dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    await axios({
      method: "post",
      url: `hub/editarHub/${codigoHub}`,
      baseURL,
      headers: {
        "content-type": "application/json"
      },
      data: hubData
    })
      .then(() => {
        dispatch({ type: "HIDE_OVERLAY" });
        toastr.info("Hub editado com sucesso");
      })
      .catch(err => {
        dispatch({ type: "HIDE_OVERLAY" });
        toastr.error(
          String(err.response.data.message),
          err.response.statusText
        );
      });
  };
};

export const getHubsByCircuitIdRedirect = circuitoId => {
  return async dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    await axios({
      method: "post",
      url: `hub/circuito/${circuitoId}`,
      baseURL,
      headers: {
        "content-type": "application/json"
      },
      data: circuitoId
    })
      .then(resp => {
        dispatch({ type: "GET_LIST_HUBS_FROM_REDIRECT", payload: resp.data });
        dispatch({ type: "HIDE_OVERLAY" });
      })
      .catch(err => {
        dispatch({ type: "HIDE_OVERLAY" });
        toastr.error(
          String(err.response.data.message),
          err.response.statusText
        );
      });
  };
};

export const cleanIdCircuitRedirect = () => {
  return dispatch => {
    dispatch({ type: "RESET_ID_CIRCUIT_REDIRECT" });
  };
};
