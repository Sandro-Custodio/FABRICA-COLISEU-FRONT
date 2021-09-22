import orderBy from "lodash/orderBy";

const INITIAL_STATE = {
  rows: [],
  aux_rows: [],
  all_rows: [],
  loading: false,
  loading_filter: false,
  status_filter: [],
  years_filter: [],
  row_selected: null,
  table_selections: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };

    case "SET_ROWS":
      return {
        ...state,
        aux_rows: orderBy(action.payload, ["project_name", "ano"]) || [],
        rows: orderBy(action.payload, ["project_name", "ano"]) || []
      };
    case "SET_ALL_ROWS":
      return {
        ...state,
        all_rows: orderBy(action.payload, ["project_name", "ano"]) || []
      };
    case "SET_FAST_ROWS":
      return {
        ...state,
        row_selected: null,
        table_selections: [],
        rows: state.all_rows.filter( row => row.project_id === action.payload[0].project_id)
      };
    case "SET_LOADING_FILTER":
      return { ...state, loading_filter: action.payload };

    case "SET_STATUS_FILTER":
      return { ...state, status_filter: action.payload || [] };

    case "SET_YEARS_FILTER":
      return { ...state, years_filter: action.payload || [] };

    case "FILTER_ROWS":
      return {
        ...state,
        row_selected: null,
        table_selections: [],
        rows: state.aux_rows.filter(
          row =>
            !action.payload ||
            `${row.project_name}${row.sub_project_name}${row.project_name}`
              .toLowerCase()
              .replace(/\s+/g, "")
              .trim()
              .includes(
                action.payload
                  .toLowerCase()
                  .replace(/\s+/g, "")
                  .trim()
              )
        )
      };

    case "CHANGE_ROW_SELECTED": {
      const table_selections =
        action.payload.length > 1
          ? [action.payload[action.payload.length - 1]]
          : action.payload;
      return {
        ...state,
        table_selections,
        row_selected: state.rows[table_selections]
      };
    }

    case "RESET_SELECTIONS":
      return { ...state, table_selections: [], row_selected: null };

    default:
      return state;
  }
};
