import axios from "axios";

export const getTableData = (allValues, area) => axios.post(`${process.env.REACT_APP_API_URL}/dashboard/get_all_by_year_and_area`, { ano: allValues , area: area});

export const getProjectInfo = (projeto, area, year) => 
  Promise.all([
    getAcoesOfensoras(projeto, area, year),
    getProjectDetails(projeto, year)
  ]).then(res => res.map(el => el.data));


export const getAcoesOfensoras = (projeto, area, year) => {
  const params = {
    projeto,
    area,
    year: year
  }
  return axios.post("/dashboard/get_acoes_ofensoras", params);
};

export const getProjects = () => {
  return axios.post("/dashboard/get_dashboard_projects");
};

export const getProjectDetails = (projeto, year) => {
  const params = {
    projeto,
    ano: year
  }
  return axios.post("/dashboard/get_ficha_by_project_year", params);
};

export const saveAuxiliarTables = (projeto, area, acoesOfensoresForm, year) => {
  const params = {
    projeto: projeto.name,
    area,
    acaoDone: acoesOfensoresForm.values.acoesDone,
    acaoEmVerificacao: acoesOfensoresForm.values.acoesEmverificacao,
    year
  }

  return axios.post("/dashboard/save_acoes_ofensoras", params);
};
