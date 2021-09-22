// default reducer
import Moment from "moment";

const INITIAL_STATE = {
  list: [],
  filters: {},
  tempFilters: {},
  paginator: { currentPage: 1, pageSize: 100 },
  maxPagesQtd: 1,
  grouping_column_name: "code",
  columns: [
    { name: "code", title: " " },
    { name: "own_ot_seg_code", title: "Posto Responsável" },
    { name: "ot_status", title: "Status" },
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
          ? `${Moment(row.created_at).diff(row.ot_ended_at, "days")} dias`
          : `${Moment(row.created_at).diff(new Date(), "days")} dias`
    }
  ],
  defaultColumnWidths: [
    { columnName: "code", width: 80 },
    { columnName: "own_ot_seg_code", width: 150 },
    { columnName: "ot_status", width: 112 },
    { columnName: "seg_id", width: 120 },
    { columnName: "seg_operator_a", width: 100 },
    { columnName: "seg_ponta_a", width: 90 },
    { columnName: "frequencia", width: 100 },
    { columnName: "seg_operator_b", width: 100 },
    { columnName: "seg_ponta_b", width: 100 },
    { columnName: "solution", width: 100 },
    { columnName: "ot_type_name", width: 80 },
    { columnName: "seg_situation", width: 100 },
    { columnName: "seg_qtd_links", width: 80 },
    { columnName: "seg_speed", width: 80 },
    { columnName: "seg_project", width: 80 },
    { columnName: "ot_subproject_name", width: 80 },
    { columnName: "rede", width: 80 },
    { columnName: "ot_ended_at", width: 80 }
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
      return { ...state, filters: {}, tempFilters: {} };
    case "CHANGE_FILTER":
      return { ...state, filters: { ...state.filters, ...action.payload } };
      case "CHANGE_TEMP_FILTER":
        return { ...state, tempFilters: { ...state.tempFilters, ...action.payload } };
    case "CHANGE_OT_PAGINATOR":
      return { ...state, paginator: action.payload };
    case "CHANGE_OT_MAX_PAGE_QTD":
      return { ...state, maxPagesQtd: action.payload };
    case "FILTERS_FETCHED":
      return { ...state, ...action.payload };
    case "CONFIRM_CANCEL":
      return { ...state, confirm_cancel: action.payload };
    default:
      return state;
  }
};
