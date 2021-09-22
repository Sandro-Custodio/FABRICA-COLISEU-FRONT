import mapKeys from "lodash/mapKeys";

const INITIAL_STATE = {
  rows: [],
  selection: [],
  loading: false,
  total: 0,
  page: 0,
  selected_rows: [],
  loading_filter: false,
  comboMw: [],
  vendorArea: [],
  stationCity: [],
  uf: [],
  chave: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "LISTARMW_SET_TABLE":
      console.log("rows", action.payload);
      return {
        ...state,
        ...action.payload,
        rows: action.payload.rows.map(row =>
          mapKeys(row, (_, key) => key.replace("_par", ""))
        ),
        selected_rows: [],
        selection: []
      };

    case "LISTARMW_SET_LOADING":
      return { ...state, loading: action.payload };

    case "LISTARMW_SET_SELECTION":
      return {
        ...state,
        selection: action.payload,
        selected_rows: state.rows.filter((_, idx) =>
          action.payload.includes(idx)
        )
      };

    case "LISTARMW_FILTER_SET_LOADING":
      return { ...state, loading_filter: action.payload };

    case "LISTARMW_FILTER_SET_SELECTS":
      return { ...state, ...action.payload };

    case "LISTARMW_CLEAR":
      return INITIAL_STATE;

    default:
      return state;
  }
}
