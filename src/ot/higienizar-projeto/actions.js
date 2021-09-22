import axios from "axios";
import { toastr } from "react-redux-toastr";

axios.default.baseURL = process.env.REACT_APP_API_URL;

export const listProjects = filter => dispatch => {
  dispatch({ type: "SET_LOADING", payload: true });
  return axios
    .post("projects/get_projects", filter)
    .then(({ data }) => {
      if(filter==undefined){
        dispatch({ type: "SET_ALL_ROWS", payload: data })
      }
      dispatch({ type: "SET_ROWS", payload: data })
    })
    .catch(() => toastr.error("Erro", "Erro ao buscar lista no servidor"))
    .finally(() => dispatch({ type: "SET_LOADING", payload: false }));
};


export function listFastProjects(auth, ot) {

  const { filters, paginator } = ot;
  const { user } = auth;
  const params = {
    "0": { ...filters, user_id: user.id, code_action: "DR_COA1G1" },
    "1": paginator.currentPage,
    "2": paginator.pageSize,
    "3": ""
  };
  return dispatch => {
    dispatch([{ type: "SHOW_OVERLAY" }]);
    axios
      .post(`${process.env.REACT_APP_API_URL}/ots/list`, params)
      .then(resp => {
        dispatch({ type: "SET_FAST_ROWS", payload:  resp.data[0] })
      })
      .catch(e => {
        if (e.response) {
          if (e.response.data.errors) {
            e.response.data.errors.forEach(error =>
              toastr.error("Erro", error)
            );
          } else {
            toastr.error(String(e.response.status), e.response.statusText);
          }
        } else if (e.request) {
          if (e.message === "Network Error") {
            toastr.error("Erro", "Servidor OFFLINE");
          }
        }
      })
      .finally(() => {
        dispatch([{ type: "HIDE_OVERLAY" }]);
      });
  };
  };


const listStatusFilter = () =>
  axios.get("projects/get_status_list").then(res => res.data);

const listYearsFilter = () =>
  axios.get("projects/get_year_list").then(res => res.data);

export const listFilters = () => dispatch => {
  dispatch({ type: "SET_LOADING_FILTER", payload: true });
  return Promise.all([listStatusFilter(), listYearsFilter()])
    .then(([status, years]) => {
      dispatch([
        { type: "SET_STATUS_FILTER", payload: status },
        { type: "SET_YEARS_FILTER", payload: years }
      ]);
    })
    .catch(() => toastr.error("Erro", "Erro ao buscar lista no servidor"))
    .finally(() => dispatch({ type: "SET_LOADING_FILTER", payload: false }));
};

export const renameSubproject = ({ form, filter }) => dispatch => {
  dispatch({ type: "SET_LOADING", payload: true });
  return axios
    .patch(`projects/rename_project/${form.id}`, form)
    .then(() => {
      dispatch({ type: "RESET_SELECTIONS", payload: false });
      toastr.success("Sucesso", "Subprojeto alterado com sucesso!");
      listProjects(filter)(dispatch);
    })
    .catch(({ response: { data } }) => {
      if (data && data.message) toastr.error("Erro", data.message);
      else toastr.error("Erro", "Erro ao alterar subprojeto");
      dispatch({ type: "SET_LOADING", payload: false });
    });
};

export const inactivate = ({ filter, id, parent_id }) => dispatch => {
  dispatch({ type: "SET_LOADING", payload: true });
  return axios
    .post("projects/desactive_project", { parent_id, id })
    .then(() => {
      dispatch({ type: "RESET_SELECTIONS", payload: false });
      toastr.success(
        "Sucesso",
        `${parent_id ? "Projeto" : "Subprojeto"} inativado com sucesso!`
      );
      listProjects(filter)(dispatch);
    })
    .catch(() => {
      toastr.error("Erro", "Erro ao alterar subprojeto");
      dispatch({ type: "SET_LOADING", payload: false });
    });
};

export const newProject = ({ form, filter }) => dispatch => {
  dispatch({ type: "SET_LOADING", payload: true });
  return axios
    .post("projects/add_project", form)
    .then(({ data }) => {
      listProjects(filter)(dispatch);
      toastr.success("Sucesso", data.message);
    })
    .catch(({ response: { data } }) => {
      if (data && data.message) toastr.error("Erro", data.message);
      else toastr.error("Erro", "Erro ao alterar subprojeto");
      dispatch({ type: "SET_LOADING", payload: false });
    });
};
