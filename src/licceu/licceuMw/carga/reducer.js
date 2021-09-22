const INITIAL_STATE = {
  rows: [],
  loading: false
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "CARGAMW_SET_LOADING":
      return { ...state, loading: action.payload };
    case "CARGAMW_SET_ROWS":
      return { ...state, rows: action.payload };
    default:
      return state;
  }
}
