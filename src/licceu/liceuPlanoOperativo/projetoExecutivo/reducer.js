import moment from "moment";

const INITIAL_STATE = {
  rows: [],
  loading_table: false,
  loading_filter: false,
  rows_selected: [],
  table_selections: [],
  ots: [],
  sites: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "PROJETOEXECUTIVOLISTAR_SET_LOADING_TABLE":
      return { ...state, loading_table: action.payload };

    case "PROJETOEXECUTIVOLISTAR_SET_LOADING_FILTER":
      return { ...state, loading_filter: action.payload };

    case "PROJETOEXECUTIVOLISTAR_SET_ROWS":
      return {
        ...state,
        rows: action.payload.map(({ data, ...el }) => ({
          ...el,
          data: moment(data).format("LL")
        }))
      };

    case "PROJETOEXECUTIVOLISTAR_SET_SELECTION":
      return {
        ...state,
        table_selections: action.payload,
        rows_selected: action.payload.map(idx => state.rows[idx])
      };

    case "PROJETOEXECUTIVOLISTAR_SET_OTS":
      return { ...state, ots: action.payload };

    case "PROJETOEXECUTIVOLISTAR_SET_SITES":
      return { ...state, sites: action.payload };

    default:
      return state;
  }
};
