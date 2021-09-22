import moment from "moment";

moment.locale("pt-BR");

const INITIAL_STATE = {
  rows: [],
  loading: false,
  rows_selected: [],
  table_selections: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GERENCIAMENTO_LOADING_TABLE":
      return { ...state, loading: action.payload };

    case "GERENCIAMENTO_ROWS":
      return {
        ...state,
        rows: action.payload.map(row => ({
          ...row,
          dataUltimaGeracao: moment(row.dataUltimaGeracao).format("LL")
        })),
        table_selections: [],
        rows_selected: []
      };

    case "GERENCIAMENTO_SELECTION":
      return {
        ...state,
        table_selections: action.payload,
        rows_selected: action.payload.map(idx => state.rows[idx])
      };

    case "RESET_SELECTIONS_GERENCIAMENTO":
      return { ...state, table_selections: [], rows_selected: [] };

    case "GERENCIAMENTO_RESET":
      return INITIAL_STATE;

    default:
      return state;
  }
};
