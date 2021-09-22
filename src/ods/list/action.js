import axios from "axios";
import { toastr } from "react-redux-toastr";
import { reset, destroy } from "redux-form";
import get from "lodash/get";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const getProjects = () => axios.get("ods/get_all_projects");
const getStatus = () => axios.get("ods/get_all_od_statuses");

export const getSelects = () => dispatch => {
  dispatch({ type: "FILTER_LOADING", payload: true });
  Promise.all([getProjects(), getStatus()])
    .then(([projects, status]) => {
      dispatch({
        type: "SET_SELECTS",
        payload: { projects: projects.data, status: status.data }
      });
    })
    .catch(() => toastr.error("Erro", "Erro ao buscar dados"))
    .finally(() => dispatch({ type: "FILTER_LOADING", payload: false }));
};

export default currentPage => (dispatch, getState) => {
  dispatch({ type: "LOADING", loading: true });
  const filter = get(getState(), "form.filterODS.values", {});
  
  if (filter.od_code) {
    //remove all white spaces
    filter.od_code = filter.od_code.replace(/\s/g,'')
  }
  if (filter.circuito_id) {
    //remove all white spaces
    filter.circuito_id = filter.circuito_id.replace(/\s/g,'')
  }
  if (filter.circuit_id_multiple) {
    //remove all white spaces
    filter.circuit_id_multiple = filter.circuit_id_multiple.replace(/\s/g,'')
  }

  const flag = get(getState(), "form.flagODS.values.flag");
  axios
    .post("/ods/construct_od_query", {
      filter,
      flag,
      page: currentPage,
      qtd_page: 100
    })
    .then(response => {
      dispatch([
        {
          type: "ODS_LIST",
          payload: response.data,
          currentPage,
          loading: false
        }
      ]);
    })
    .catch(e => {
      if (e.response) {
        if (e.response.data.errors) {
          e.response.data.errors.forEach(error => toastr.error("Erro", error));
        } else {
          toastr.error(String(e.response.status), e.response.statusText);
        }
      } else if (e.request) {
        if (e.message === "Network Error") {
          toastr.error("Erro", "Servidor OFFLINE");
        }
      }
      dispatch({ type: "LOADING", loading: false });
    });
};

export const clearFilter = () => dispatch => {
  dispatch({
    type: "CLEAR_FILTER"
  });
};

export const destroyForm = (formName) => {
  return dispatch => {
    dispatch(destroy(formName))
  };
};
