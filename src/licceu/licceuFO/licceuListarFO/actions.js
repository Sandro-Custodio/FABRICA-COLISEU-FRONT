import axios from "axios";
import { toastr } from "react-redux-toastr";
import _ from "lodash";
import { reset } from "redux-form";

function trataListaJson(data) {
  const jsonLista = data;
  const jsonUniqueList = _.uniqBy(jsonLista, function(o) {
    return o.id_licceu_anel;
  });

  for (let i = 0; i < jsonUniqueList.length; i++) {
    const listaElementsSeremAdicionados = [];
    for (let j = 0; j < jsonLista.length; j++) {
      if (jsonUniqueList[i].id_licceu_anel === jsonLista[j].id_licceu_anel) {
        listaElementsSeremAdicionados.push(jsonLista[j]);
      }
    }
    // listaElementsSeremAdicionados.sort(function(a,b){
    //     return a.id_licceu_anel.localeCompare(b.id_licceu_anel);
    // })
    jsonUniqueList[i].elementos = listaElementsSeremAdicionados;
  }
  data = jsonUniqueList;

  data.sort(function(a, b) {
    if (a.id_licceu_anel < b.id_licceu_anel) {
      return -1;
    }
    if (a.id_licceu_anel > b.id_licceu_anel) {
      return 1;
    }
    return 0;
  });

  return data;
}

const baseURL = process.env.REACT_APP_API_URL;

export function getFoList() {
  return dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    axios({
      method: "post",
      url: "licceu_fo_rings/get_filtered_rings",
      baseURL,
      data: {
        filtros: {},
        pagina: 1,
        limite: 100
      }
    })
      .then(resp =>
        dispatch([
          {
            type: "SHOW_FO",
            payload: trataListaJson(resp.data[0]),
            page: 1,
            last: Math.ceil(resp.data[1]),
            total: resp.data[2],
            limit: 100
          },
          { type: "HIDE_OVERLAY" }
        ])
      )
      .catch(err => {
        toastr.error(
          String(err.response.data.message),
          err.response.statusText
        );
        dispatch({ type: "HIDE_OVERLAY" });
      });
  };
}

export const firstPage = newFilter => {
  return dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    axios({
      method: "post",
      url: "licceu_fo_rings/get_filtered_rings",
      baseURL,
      data: {
        filtros: newFilter !== {} ? newFilter : {},
        pagina: 1,
        limite: 100
      }
    })
      .then(resp =>
        dispatch([
          {
            type: "SHOW_FO",
            payload: trataListaJson(resp.data[0]),
            page: 1,
            last: Math.ceil(resp.data[1]),
            total: resp.data[2],
            limit: 100
          },
          { type: "HIDE_OVERLAY" }
        ])
      )
      .catch(err => {
        toastr.error(
          String(err.response.data.message),
          err.response.statusText
        );
        dispatch({ type: "HIDE_OVERLAY" });
      });
  };
};

export const previousPage = (page, newFilter) => {
  return dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    axios({
      method: "post",
      url: "licceu_fo_rings/get_filtered_rings",
      baseURL,
      data: {
        filtros: newFilter,
        pagina: page > 1 ? (page -= 1) : 1,
        limite: 100
      }
    })
      .then(resp =>
        dispatch([
          {
            type: "PREVIOUS_PAGE",
            payload: trataListaJson(resp.data[0]),
            page,
            total: resp.data[2],
            limit: 100
          },
          { type: "HIDE_OVERLAY" }
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

export const nextPage = (page, last, newFilter) => {
  return dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    axios({
      method: "post",
      url: "licceu_fo_rings/get_filtered_rings",
      baseURL,
      data: {
        filtros: newFilter,
        pagina: page < last ? (page += 1) : last,
        limite: 100
      }
    })
      .then(resp =>
        dispatch([
          {
            type: "NEXT_PAGE",
            payload: trataListaJson(resp.data[0]),
            page,
            total: resp.data[2],
            limit: 100
          },
          { type: "HIDE_OVERLAY" }
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

export const lastPage = (page, newFilter) => {
  return dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    axios({
      method: "post",
      url: "licceu_fo_rings/get_filtered_rings",
      baseURL,
      data: {
        filtros: newFilter,
        pagina: page,
        limite: 100
      }
    })
      .then(resp =>
        dispatch([
          {
            type: "LAST_PAGE",
            payload: trataListaJson(resp.data[0]),
            page,
            total: resp.data[2],
            limit: 100
          },
          { type: "HIDE_OVERLAY" }
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

export const postFilter = (url, data) => {
  return dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    axios({
      method: "post",
      url,
      baseURL,
      data
    })
      .then(res => {
        dispatch([
          {
            type: "POST_FO_FAST_SEARCH",
            payload: trataListaJson(res.data[0]),
            page: res.data[1],
            total: res.data[2],
            limit: 100,
            newFilter: data.filtros
          },
          { type: "HIDE_OVERLAY" }
          // reset("licceuFoFilter")
        ]);
      })
      .catch(error => {
        toastr.error(
          String(error.response.data.message),
          error.response.statusText
        );
        dispatch({ type: "HIDE_OVERLAY" });
      });
  };
};

export const clearFilter = () => {
  return dispatch => dispatch(reset("licceuFoFilter"));
};

export const getAllStation_cities = () => {
  return dispatch => {
    axios({
      method: "get",
      url: "/licceu_fo_rings/get_all_station_cities",
      baseURL,
      data: {}
    })
      .then(res => {
        dispatch({
          type: "GET_ALL_STATION_CITIES",
          payload: res.data
        });
      })
      .catch(error =>
        toastr.error(
          String(error.response.data.message),
          error.response.statusText
        )
      );
  };
};

export const getAnelData = () => {
  return dispatch => {
    axios({
      method: "get",
      url: "/licceu_fo_rings/load_anel_data",
      baseURL,
      data: {}
    })
      .then(res => {
        dispatch([
          {
            type: "GET_ALL_ANEL_DATA",
            payload: res.data
          }
        ]);
      })
      .catch(err => {
        toastr.error(
          String(err.response.data.message),
          err.response.statusText
        );
      });
  };
};

export const getSiglas = (pagina, limite, filtro_sigla, isScroll) => {
  return dispatch => {
    axios({
      method: "get",
      url: "/licceu_fo_rings/load_siglas",
      baseURL,
      params: {
        pagina,
        limite,
        filtro_sigla
      }
    })
      .then(res => {
        dispatch([
          {
            type: "GET_SIGLAS",
            payload: res.data,
            isScroll
          }
        ]);
      })
      .catch(err => {
        toastr.error(
          String(err.response.data.message),
          err.response.statusText
        );
      });
  };
};

export const cancelRingFo = (idFo, userId, id_licceu_anel) => {
  const params = {
    0: idFo,
    1: userId
  };

  return dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    axios({
      method: "post",
      url: "/licceu_fo_rings/cancel_fo_ring",
      baseURL,
      data: params
    })
      .then(res => {
        dispatch({ type: "CANCEL_ANEL_FO", payload: res.data });
        dispatch({ type: "HIDE_OVERLAY" });
        toastr.success(
          "Sucesso",
          `O anel ${id_licceu_anel} foi cancelado com sucesso!`
        );
      })
      .catch(err => {
        toastr.error(
          String(err.response.data.message),
          err.response.statusText
        );
        dispatch({ type: "HIDE_OVERLAY" });
      });
  };
};

export const getBandaMedia = idFo => {
  const params = {
    0: idFo
  };

  return dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    axios({
      method: "post",
      url: "/mw_banda_media/get_banda_media_data_fo",
      baseURL,
      data: params
    })
      .then(res => {
        dispatch({ type: "GET_BANDA_MEDIA", payload: res.data });
        dispatch({ type: "HIDE_OVERLAY" });
      })
      .catch(err => {
        toastr.error(
          String(err.response.data.message),
          err.response.statusText
        );
        dispatch({ type: "HIDE_OVERLAY" });
      });
  };
};

export const redirectListCircuits = rowSelected => {
  return dispatch => {
    dispatch({ type: "REDIRECT_LIST_CIRCUITS", payload: rowSelected });
  };
};

export const getRingFromCircuit = circuitId => {
  const params = {
    0: circuitId
  };

  return dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    axios({
      method: "post",
      url: "mw/get_ring_from_circuit",
      baseURL,
      data: params
    })
      .then(res => {
        dispatch({
          type: "GET_LIST_RINGS_FROM_CIRCUITS",
          payload: trataListaJson(res.data)
        });
        dispatch({ type: "HIDE_OVERLAY" });
      })
      .catch(err => {
        toastr.error(
          String(err.response.data.message),
          err.response.statusText
        );
        dispatch({ type: "HIDE_OVERLAY" });
      });
  };
};

export const cleanIdCircuitRedirect = () => {
  return dispatch => {
    dispatch({ type: "RESET_ID_CIRCUIT_REDIRECT" });
  };
};
