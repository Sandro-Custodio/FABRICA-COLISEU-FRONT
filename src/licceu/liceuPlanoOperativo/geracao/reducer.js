import moment from "moment";

moment.locale("pt-BR");

const INITIAL_STATE = {
  rows: [],
  loading: false,
  loading_filter: false,
  rows_selected: [],
  table_selections: [],
  tipo_doc: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_GERACAO_PLO_LOADING_TABLE":
      return { ...state, loading: action.payload };

    case "SET_GERACAO_PLO_ROWS":
      return {
        ...state,
        rows: action.payload.map(row => ({
          ...row,
          dataUltimaGeracao: moment(row.dataUltimaGeracao).format("LL")
        })),
        table_selections: [],
        rows_selected: []
      };

    case "SET_GERACAO_PLO_SELECTION":
      return {
        ...state,
        table_selections: action.payload,
        rows_selected: action.payload.map(idx => state.rows[idx])
      };

    case "SET_GERACAO_PLO_TIPODOC":
      return {
        ...state,
        tipo_doc: action.payload
      };

    case "SET_GERACAO_PLO_LOADING_TIPODOC":
      return {
        ...state,
        loading_tipodoc: action.payload
      };

    case "RESET_SELECTIONS_GERACAO_PLO":
      return { ...state, table_selections: [], rows_selected: [] };

    case "RESET_GERACAO_PLO":
      return INITIAL_STATE;

    default:
      return state;
  }
};
