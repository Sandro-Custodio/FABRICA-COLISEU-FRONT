const INITIAL_STATE = {
  higienizar_ot_list: [],
  fields_ot_project_list: [],
  filters: {},
  paginator: { currentPage: 1, pageSize: 100 },
  maxPagesQtd: 1,
  grouping_column_name: "code",
  columns: [
    { name: "code", title: "Nome" },
    {
      name: "project",
      title: "Projeto",
      getCellValue: row => (row.project ? row.project.name : undefined)
    },
    {
      name: "sub_project",
      title: "Subprojeto",
      getCellValue: row => (row.sub_project ? row.sub_project.name : undefined)
    },
    {
      name: "operator_a",
      title: "Regional A",
      getCellValue: row =>
        row.operator_a ? row.operator_a.regional : undefined
    },
    {
      name: "element_a",
      title: "Ponta A",
      getCellValue: row =>
        row.element_a ? row.element_a.elemento_id : undefined
    },
    {
      name: "operator_b",
      title: "Regional B",
      getCellValue: row =>
        row.operator_b ? row.operator_b.regional : undefined
    },
    {
      name: "element_b",
      title: "Ponta B",
      getCellValue: row =>
        row.element_b ? row.element_b.elemento_id : undefined
    },
    { name: "tipo_ot", title: "Tipo OT" },
    {
      name: "ot_status",
      title: "Situação",
      getCellValue: row => (row.ot_status ? row.ot_status.name : undefined)
    },
    {
      name: "links",
      title: "Links",
      getCellValue: row => (row.ot_speed ? row.ot_speed.qt_sublinks : undefined)
    },
    {
      name: "ot_speed",
      title: "Velocidade",
      getCellValue: row => (row.ot_speed ? row.ot_speed.name : undefined)
    },
    { name: "rede", title: "Rede" }
  ],
  columnsWidth: [
    { width: 120, columnName: "code" },
    { width: 110, columnName: "project" },
    { width: 110, columnName: "sub_project" },
    { width: 100, columnName: "operator_a" },
    { width: 100, columnName: "element_a" },
    { width: 100, columnName: "operator_b" },
    { width: 100, columnName: "element_b" },
    { width: 100, columnName: "tipo_ot" },
    { width: 100, columnName: "ot_status" },
    { width: 100, columnName: "links" },
    { width: 100, columnName: "ot_speed" },
    { width: 100, columnName: "rede" },
    { width: 100, columnName: "actions" }
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
      return { ...state, higienizar_ot_list: action.payload[0], paginator };
    case "CHANGE_HIGIEPROGETOS_PAGINATOR":
      return { ...state, paginator: action.payload };
    case "CHANGE_HIGIEPROGETOS_MAX_PAGE_QTD":
      return { ...state, maxPagesQtd: action.payload };
    case "FIELDS_OT_PROJECT_FETCHED":
      return { ...state, fields_ot_project_list: action.payload };
    case "CLEAR_FILTERS":
      return { ...state, filters: {} };
    case "CHANGE_FILTER":
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case "FILTERS_FETCHED":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
