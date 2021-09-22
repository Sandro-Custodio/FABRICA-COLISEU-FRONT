import moment from "moment";

moment.locale("pt-BR");

const INITIAL_STATE = {
  rows: [],
  loading_ambv_boq: false,
  loading_filter: false,
  rows_selected: [],
  table_selections: [],
  tipo_doc: [],
  vendorsFiltro: [],
  page: 1,
  size: 100,
  total: 0
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_VENDORS_FILTER":
      return { ...state, vendorsFiltro: action.payload };

    case "LOADING_FILTER":
      return { ...state, loading_filter: action.payload };

    case "SET_RESULT_BOQS_WITH_FILTER":
      return { ...state, rows: action.payload, total: action.total };

    case "CLEAN_TABLE_BOQS":
      return INITIAL_STATE;

    case "SET_LOADING_CARGA_AMBV_BOQ":
      return { ...state, loading_ambv_boq: action.payload };

    case "SET_NEXT_PAGE_LIST_BOQ":
      return { ...state, page: action.payload };

    // case "SET_GERACAO_PLO_ROWS":
    //   return {
    //     ...state,
    //     rows: action.payload.map(row => ({
    //       ...row,
    //       dataUltimaGeracao: moment(row.dataUltimaGeracao).format("LL")
    //     })),
    //     table_selections: [],
    //     rows_selected: []
    //   };

    // case "SET_GERACAO_PLO_SELECTION":
    //   return {
    //     ...state,
    //     table_selections: action.payload,
    //     rows_selected: action.payload.map(idx => state.rows[idx])
    //   };

    // case "SET_GERACAO_PLO_TIPODOC":
    //   return {
    //     ...state,
    //     tipo_doc: action.payload
    //   };

    // case "SET_GERACAO_PLO_LOADING_TIPODOC":
    //   return {
    //     ...state,
    //     loading_tipodoc: action.payload
    //   };

    // case "RESET_SELECTIONS_GERACAO_PLO":
    //   return { ...state, table_selections: [], rows_selected: [] };

    // case "RESET_GERACAO_PLO":
    //   return INITIAL_STATE;

    default:
      return state;
  }
};
