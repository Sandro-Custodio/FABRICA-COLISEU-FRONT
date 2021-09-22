const INITIAL_STATE = {
  odsList: {
    odsRows: [],
    pageSize: 100
  },
  currentPage: 1,
  loading: false,
  filter_loading: false,
  projects: [],
  status: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ODS_LIST":
      return {
        ...state,
        odsList: action.payload,
        loading: action.loading,
        currentPage: action.currentPage
      };
    case "SET_SELECTS":
      return { ...state, ...action.payload };
    case "LOADING":
      return { ...state, loading: action.loading };
    case "FILTER_LOADING":
      return { ...state, filter_loading: action.payload };
    default:
      return state;
  }
};
