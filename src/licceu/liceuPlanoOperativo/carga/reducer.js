import moment from "moment";
import Immutable from "seamless-immutable";

moment.locale("pt-BR");

const INITIAL_STATE = {
  rows: [],
  loading: false,
  rows_selected: [],
  table_selections: [],
  table_selections_upload: [],
  loading_upload: false,
  rows_upload: Immutable([]),
  rows_selected_upload: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_CARGA_PLO_LOADING_TABLE":
      return { ...state, loading: action.payload };

    case "SET_CARGA_PLO_ROWS":
      return {
        ...state,
        rows: action.payload.map(row => ({
          ...row,
          data: moment(row.data).format("LL")
        })),
        table_selections: [],
        rows_selected: []
      };

    case "SET_CARGA_PLO_SELECTION":
      return {
        ...state,
        table_selections: action.payload,
        rows_selected: action.payload.map(idx => state.rows[idx])
      };

    case "SET_CARGA_PLO_LOADING_UPLOAD_TABLE":
      return {
        ...state,
        loading_upload: action.payload
      };

    case "SET_CARGA_PLO_ROWSUPLOAD": {
      return {
        ...state,
        rows_upload: state.rows_upload.concat([action.payload])
      };
    }

    case "REMOVE_CARGA_PLO_ROWSUPLOAD":
      return {
        ...state,
        rows_selected_upload: [],
        rows_upload: state.rows_upload.filter(
          (_, idx) => !state.table_selections_upload.includes(idx)
        )
      };

    case "SET_CARGA_PLO_SELECTIONUPLOAD":
      return {
        ...state,
        table_selections_upload: action.payload,
        rows_selected_upload: action.payload.map(idx => state.rows_upload[idx])
      };

    case "RESET_SELECTIONS_CARGA_PLO":
      return { ...state, table_selections: [], rows_selected: [] };

    case "RESET_CARGA_PLO":
      return INITIAL_STATE;

    default:
      return state;
  }
};
