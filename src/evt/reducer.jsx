const INITIAL_STATE = {
  rows: [],
  rows_view: [],
  filters: {},
  quantidade_total_registros: 0,
  paginator: { currentPage: 1, pageSize: 100 },
  maxPagesQtd: 1
};

export default (state = INITIAL_STATE, action) => {
  const { paginator } = state;
  switch (action.type) {
    case "SET_ROWS":
      return { ...state, rows: action.payload, paginator };
    case "SET_ROWS_VIEW":
      return { ...state, rows_view: action.payload };
    case "SET_QUANTIDADE_TOTAL_REGISTROS":
      return {
        ...state,
        quantidade_total_registros: action.payload
      };
    case "CHANGE_EVT_PAGINATOR":
      return { ...state, paginator: action.payload };
    case "CHANGE_EVT_MAX_PAGE_QTD":
      return { ...state, maxPagesQtd: action.payload };
    default:
      return state;
  }
};
