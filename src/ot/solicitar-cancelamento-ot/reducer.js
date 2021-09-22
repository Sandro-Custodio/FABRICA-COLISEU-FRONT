import Moment from "moment";

const INITIAL_STATE = {
  list: [],
  filters: {},
  paginator: { currentPage: 1, pageSize: 20 },
  grouping_column_name: "code",
  columns: [
    { name: "code", title: " " },
    { name: "own_ot_code", title: "Posto Responsável" },
    { name: "seg_id", title: "Código Segmento" },
    { name: "seg_operator_a", title: "Regional A" },
    { name: "seg_ponta_a", title: "Ponta A" },
    { name: "frequencia", title: "Frequência" },
    { name: "seg_operator_b", title: "Regional B" },
    { name: "seg_ponta_b", title: "Ponta B" },
    { name: "solution", title: "Solução" },
    { name: "ot_type_name", title: "Tipo OT" },
    { name: "seg_situation", title: "Situação" },
    { name: "seg_qtd_links", title: "Links" },
    { name: "seg_speed", title: "Velocidade" },
    {
      name: "seg_project",
      title: "Projeto",
      getCellValue: row => (row.seg_project ? row.seg_project : "N/A")
    },
    { name: "ot_subproject_name", title: "Subprojeto" },
    { name: "rede", title: "Rede" },
    {
      name: "ot_ended_at",
      title: "SLA",
      getCellValue: row =>
        row.ot_ended_at
          ? `${Moment(row.created_at).diff(row.ot_ended_at, "days")}`
          : `${Moment(row.created_at).diff(new Date(), "days")}`
    }
  ],
  defaultColumnWidths: [
    // Este array é espelho do de cima
    { columnName: "code", width: 115 },
    { columnName: "own_ot_seg_code", width: 200 },
    { columnName: "seg_code", width: 112 },
    { columnName: "seg_operator_a", width: 63 },
    { columnName: "element_a_id", width: 50 },
    { columnName: "frequencia", width: 45 },
    { columnName: "seg_operator_b", width: 68 },
    { columnName: "element_b_id", width: 80 },
    { columnName: "solution", width: 80 },
    { columnName: "ot_type_name", width: 80 },
    { columnName: "ot_status.name", width: 80 },
    { columnName: "qtd_links", width: 80 },
    { columnName: "ot_speed.name", width: 80 },
    { columnName: "project.name", width: 80 },
    { columnName: "sub_project.name", width: 80 },
    { columnName: "rede", width: 80 },
    { columnName: "sla", width: 80 },
    { columnName: "seg_project", width: 80 }
  ],
  ot_types: [],
  areas: [],
  element_types: [],
  operators: [],
  ot_status: [],
  ot_segment_status: [],
  projects: [],
  sub_projects: [],
  finality: [],
  reference: [],
  speeds: [],
  ot_redundancies: [],
  projeto_one: [],
  response_areas: [],
  codOt: "",
  circuit_id_list: "",
  frequencia: "",
  element_list: "",
  element_id_a: "",
  element_id_b: "",
  address_id_a: "",
  address_id_b: "",
  route_name: "",
  route_number: "",
  ot_list: ""
};

export default (state = INITIAL_STATE, action) => {
  const { paginator } = state;
  switch (action.type) {
    case "OTS_FETCHED":
      return { ...state, list: action.payload[0], paginator };
    case "CLEAR_FILTERS":
      return { ...state, filters: {} };
    case "CHANGE_FILTER":
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case "FILTERS_FETCHED":
      return { ...state, payload: action.payload };
    case "SOLICITAR_CANCELAMENTO_OT":
      return state;
    default:
      return state;
  }
};
