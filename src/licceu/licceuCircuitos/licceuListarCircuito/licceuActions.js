/* eslint-disable no-param-reassign */
import axios from "axios";
import { toastr } from "react-redux-toastr";
import { reset } from "redux-form";

const baseURL = process.env.REACT_APP_API_URL;

export const postFilter = (url, data) => {
  return dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    axios({
      method: "post",
      url,
      baseURL,
      data
    })
      .then(res =>
        dispatch([
          {
            type: "POST_CIRCUITO_FILTER",
            payload: res.data[0],
            newFilter: data.filter
          },
          { type: "HIDE_OVERLAY" }
        ])
      )
      .catch(error => {
        if (!error) {
          toastr.error(
            String(error.response.data.message),
            error.response.statusText
          );
          if (error) {
            console.log("error: ", error.response);
          }
          dispatch({ type: "HIDE_OVERLAY" });
        }
      });
  };
};

export const getAllVendorByArea = () => {
  return dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    axios({
      method: "post",
      url: "/vendors/get_all_vendors_by_area",
      baseURL,
      data: { area: "MW" }
    })
      .then(res =>
        dispatch([
          {
            type: "GET_ALL_VENDOR_BY_AREA",
            payload: res.data
          },
          { type: "HIDE_OVERLAY" }
        ])
      )
      .catch(
        error =>
          toastr.error(
            String(error.response.data.message),
            error.response.statusText
          ),
        dispatch({ type: "HIDE_OVERLAY" })
      );
  };
};

export const getAllRegional = () => {
  return dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    axios({
      method: "get",
      url: "/mw/get_all_regional",
      baseURL
    })
      .then(res =>
        dispatch([
          {
            type: "GET_ALL_REGIONAL",
            payload: res.data
          },
          { type: "HIDE_OVERLAY" }
        ])
      )
      .catch(error => {
        if (error) {
          if (!error) {
            toastr.error(
              String(error.response.data.message),
              error.response.statusText
            );
          }
        } else {
          console.log(error.response);
        }
        dispatch({ type: "HIDE_OVERLAY" });
      });
  };
};

export const getAllUf = () => {
  return dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    axios({
      method: "get",
      url: "/mw/get_all_uf",
      baseURL
    })
      .then(res =>
        dispatch([
          {
            type: "GET_ALL_UF",
            payload: res.data
          },
          { type: "HIDE_OVERLAY" }
        ])
      )
      .catch(error => {
        if (error) {
          if (!error) {
            toastr.error(
              String(error.response.data.message),
              error.response.statusText
            );
          }
        } else {
          console.log(error.response);
        }
        dispatch({ type: "HIDE_OVERLAY" });
      });
  };
};

export const getSN = () => {
  return dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    axios({
      method: "get",
      url: "/mw/feed_route_filter_autocomplete",
      baseURL
    })
      .then(res =>
        dispatch([
          {
            type: "GET_SN",
            payload: res.data
          },
          { type: "HIDE_OVERLAY" }
        ])
      )
      .catch(error => {
        if (!error) {
          toastr.error(
            String(error.response.data.message),
            error.response.statusText
          );
        } else {
          console.log(error.response);
        }
        dispatch({ type: "HIDE_OVERLAY" });
      });
  };
};

export const clearFilter = () => {
  return dispatch => dispatch(reset("licceuCircuitoFilter"));
};

// PAGINATE
// TODO
const url = "mw/get_all_rotas_find_flex";

export const firstPage = filter => {
  return dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    axios({
      method: "post",
      url,
      baseURL,
      data: {
        filter,
        export: false,
        page: 1,
        limit: 100
      }
    })
      .then(resp => {
        dispatch([
          {
            type: "SHOW_MW",
            payload: resp.data[0],
            page: 1,
            last: Math.ceil(resp.data[1]),
            total: resp.data[2],
            limit: 100
          },
          { type: "HIDE_OVERLAY" }
        ]);
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

export const previousPage = (page, filter) => {
  return dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    axios({
      method: "post",
      url,
      baseURL,
      data: {
        filter,
        export: false,
        page,
        limit: 100
      }
    })
      .then(resp =>
        dispatch([
          {
            type: "PREVIOUS_PAGE",
            payload: resp.data[0],
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

export const nextPage = (page, filter) => {
  return dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    axios({
      method: "post",
      url,
      baseURL,
      data: {
        filter,
        export: false,
        page,
        limit: 100
      }
    })
      .then(resp =>
        dispatch([
          {
            type: "NEXT_PAGE",
            payload: resp.data[0],
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

export const lastPage = (page, filter) => {
  return dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    axios({
      method: "post",
      url,
      baseURL,
      data: {
        filter,
        export: false,
        page,
        limit: 100
      }
    })
      .then(resp =>
        dispatch([
          {
            type: "LAST_PAGE",
            payload: resp.data[0],
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

export const postAlteracaoMassiva = data => () =>
  axios({
    method: "post",
    url: "mw/set_status_multiple_alter_circuit",
    baseURL,
    data
  })
    .then(() => toastr.success("Sucesso", "Status atualizado"))
    .catch(() => toastr.error("Erro", "Erro ao alterar o status"));

export const getCircuit = (circuit_id, ot) => dispatch => {
  const data = { ot, circuit: { id: circuit_id } };
  dispatch({ type: "LOADING_TABLE", payload: true });
  axios
    .post(`${baseURL}/mw/get_circuit_link_info`, data)
    .then(({ data: { links, segments } }) => {
      dispatch({ type: "POPULATE_TABLE", payload: links });
      dispatch({ type: "POPULATE_SEGMENTS", payload: segments || [] });
      dispatch({ type: "LOADING_TABLE", payload: false });
    })
    .catch(() => {
      dispatch({ type: "LOADING_TABLE", payload: false });
      dispatch({ type: "POPULATE_SEGMENTS", payload: [] });
      toastr.error("Erro", "Erro ao buscar os dados da tabela");
    });
};

const keyToCircuitLog = key => {
  const key_list = {
    status: "status",
    tipo_demanda: "demand_type",
    frequencia: "frequency",
    tecnologia: "technology",
    interface: "interface",
    ot: false,
    capacidade_desejada: "capacity",
    ordem_complexa: false
  };
  const convert = key_list[key];
  return convert && { new: `new_${convert}`, old: `old_${convert}` };
};

export const updateCircuit = data => () => {
  const form_keys = [
    "status",
    "tipo_demanda",
    "frequencia",
    "tecnologia",
    "interface",
    "ot",
    "capacidade_desejada",
    "ordem_complexa"
  ];

  const {
    circuit_initial,
    circuit_values,
    user_id,
    links,
    row: { id }
  } = data;
  const form = {};
  form.circuit = { user_id };
  form.circuit_id = id;
  form.links = links
    .filter(({ capacidade }) => capacidade)
    .map(({ id_link, capacidade }) => ({
      id: id_link,
      capacidade
    }));

  form.segments = links.map(({ id_link, seg }) => ({ id_link, seg }));
  const circuit_update = {};
  const circuit_logs = Object.keys(circuit_values).reduce((object, key) => {
    if (
      form_keys.includes(key) &&
      circuit_values[key] !== circuit_initial[key]
    ) {
      if (key === "capacidade_desejada")
        circuit_update.capacidade = circuit_values[key];
      else circuit_update[key] = circuit_values[key];
      const keys = keyToCircuitLog(key);
      if (keys) {
        object[keys.old] = circuit_initial[key];
        object[keys.new] = circuit_values[key];
      }
    }
    return object;
  }, {});
  form.circuit = { id, user_id, ...circuit_update };
  form.circuit_logs = { user_id, circuit_id: id, ...circuit_logs };
  return axios.post(`${baseURL}/mw/edit_circuit`, form);
};

export const handleAllCapacity = value => dispatch =>
  dispatch({
    type: "CHANGE_CAPACITY",
    payload: value
  });

export const getCircuitsFromBandaMedia = rowSelected => {
  const params = {
    0: {
      ring_id: rowSelected
    },
    pagina: 1,
    limite: 100
  };

  return dispatch => {
    dispatch({ type: "SHOW_OVERLAY" });
    axios({
      method: "post",
      url: "licceu_fo_rings/get_circuit_banda_media",
      baseURL,
      data: params
    })
      .then(res => {
        const listCircuits = res.data[0];
        dispatch([
          {
            type: "SHOW_MW_FROM_LIST_FO_RING",
            payload: listCircuits,
            page: 1,
            total: listCircuits.length,
            limit: 100
          },
          { type: "HIDE_OVERLAY" }
        ]);
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

export const cleanIdAnelRedirect = () => {
  return dispatch => {
    dispatch({ type: "RESET_ID_ANEL_FO" });
  };
};

export const redirectToAnelFO = idCircuit => {
  return dispatch => {
    dispatch({ type: "REDIRECT_TO_ANEL_FO", payload: idCircuit });
  };
};

export const redirectToHub = idCircuit => {
  return dispatch => {
    dispatch({ type: "REDIRECT_TO_HUB", payload: idCircuit });
  };
};
