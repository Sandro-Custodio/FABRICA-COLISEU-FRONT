import Moment from "moment";

const INITIAL_STATE = {
  ll_list: [],
  ll_filters: {},
  ll_tempFilters: {},
  paginator: { currentPage: 1, pageSize: 100 },
  maxPagesQtd: 1,
  grouping_column_name: "ll_guid",
  columns: [
    { name: "ll_guid", title: "ll guid" },
    { name: "ot_rede", title: "rede" },
    { name: "vendor_name", title: "provedor" },
    { name: "status_description", title: "status" },
    { name: "status_tracking_description", title: "status tracking" },
    { name: "ot_code", title: "código OT" },
    { name: "od_code", title: "código OD" },
    {
      name: "created_at", title: "criada em",
      getCellValue: row =>
        row.created_at
          ? `${Moment(row.created_at).format("DD/MM/YYYY")}`
          : ``
    },
    {
      name: "data_ativacao",
      title: "ativada em",
      getCellValue: row =>
        row.data_ativacao
          ? `${Moment(row.data_ativacao).format("DD/MM/YYYY")}`
          : ``
    },
    { name: "contrato", title: "contrato" },
    { name: "vigencia", title: "vigência" },
    {
      name: "data_solicitacao",
      title: "data solicitação",
      getCellValue: row =>
        row.data_solicitacao
          ? `${Moment(row.data_solicitacao).format("DD/MM/YYYY")}`
          : ``
    },
    { name: "tecnologia", title: "tecnologia" },
    { name: "group_a_name", title: "agrupador a" },
    { name: "group_b_name", title: "agrupador b" },
    { name: "did_tx_a", title: "DID tx a " },
    { name: "did_tx_b", title: "did tx b " },
    { name: "taxa_ins_s_imp", title: "taxa de instalação" },
    { name: "val_link_s_imp", title: "valor mensal" },
    { name: "circuito_id", title: "circuito" },
    { name: "degrau", title: "degrau" },
    { name: "taxa_ins_c_imp_a", title: "taxa de instalação ponta A" },
    { name: "taxa_ins_c_imp_b", title: "taxa de instalação ponta B" },
    { name: "val_link_c_imp_a", title: "valor com impostos ponta A" },
    { name: "val_link_c_imp_b", title: "valor com impostos ponta B" },
    { name: "segmento_mercado", title: "segmento de mercado" },
    { name: "os_id", title: "OS ID" },
    { name: "lpu_guid", title: "LPU GUID" },
    { name: "garantia_receita", title: "garantia de receita" },
    { name: "valor_modem_s_imp", title: "valor modem sem imposto" },
    { name: "valor_modem_c_imp", title: "valor modem com imposto" }
  ],
  defaultColumnWidths: [
    { columnName: "ll_guid", width: 100 },
    { columnName: "ot_rede", width: 100 },
    { columnName: "vendor_name", width: 100 },
    { columnName: "status_description", width: 100 },
    { columnName: "status_tracking_description", width: 100 },
    { columnName: "ot_code", width: 100 },
    { columnName: "od_code", width: 100 },
    { columnName: "created_at", width: 100 },
    { columnName: "data_ativacao", width: 100 },
    { columnName: "contrato", width: 100 },
    { columnName: "vigencia", width: 100 },
    { columnName: "data_solicitacao", width: 100 },
    { columnName: "tecnologia", width: 100 },
    { columnName: "group_a_name", width: 100 },
    { columnName: "group_b_name", width: 100 },
    { columnName: "did_tx_a", width: 100 },
    { columnName: "did_tx_b", width: 100 },
    { columnName: "taxa_ins_s_imp", width: 100 },
    { columnName: "val_link_s_imp", width: 100 },
    { columnName: "circuito_id", width: 100 },
    { columnName: "degrau", width: 100 },
    { columnName: "taxa_ins_c_imp_a", width: 100 },
    { columnName: "taxa_ins_c_imp_b", width: 100 },
    { columnName: "val_link_c_imp_a", width: 100 },
    { columnName: "val_link_c_imp_b", width: 100 },
    { columnName: "segmento_mercado", width: 100 },
    { columnName: "os_id", width: 100 },
    { columnName: "lpu_guid", width: 100 },
    { columnName: "garantia_receita", width: 100 },
    { columnName: "valor_modem_s_imp", width: 100 },
    { columnName: "valor_modem_c_imp", width: 100 }
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
  ot_list: "",
  ll_data: {},
  demand_classifications: []
};

export default (state = INITIAL_STATE, action) => {
  const { paginator } = state;
  switch (action.type) {
    case "LLS_FETCHED":
      return { ...state, ll_list: action.payload[0], paginator };
    case "LL_CLEAR_FILTERS":
      return { ...state, ll_filters: {}, ll_tempFilters: {} };
    case "LL_CHANGE_FILTER":
      return {
        ...state,
        ll_filters: { ...state.ll_filters, ...action.payload }
      };
    case "LL_CHANGE_TEMP_FILTER":
      return {
        ...state,
        ll_tempFilters: { ...state.ll_tempFilters, ...action.payload }
      };
    case "CHANGE_LL_PAGINATOR":
      return { ...state, paginator: action.payload };
    case "CHANGE_LL_MAX_PAGE_QTD":
      return { ...state, maxPagesQtd: action.payload };
    case "LL_FILTERS_FETCHED":
      return { ...state, ...action.payload };
    case "LEASEDLINE_DATA_FETCHED":
      return { ...state, ll_data: action.payload };
    case "DEMAND_CLASSIFICATIONS_FETCHED":
      return { ...state, demand_classifications: action.payload };
    default:
      return state;
  }
};
