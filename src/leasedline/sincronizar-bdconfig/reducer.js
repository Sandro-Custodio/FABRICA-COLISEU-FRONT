const INITIAL_STATE = {
    bdconfig_critics_list: [],
    snoa_critics_list: [],
    loading: true,
    paginator: { currentPage: 1, pageSize: 100 },
    maxPagesQtd: 1  
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "SET_BDCONFIGIMPORT_CRITICS":
            return { ...state, bdconfig_critics_list: action.payload[0] }
        case "SET_SNOA_CRITICS":
            return { ...state, snoa_critics_list: action.payload }
        case "SET_LOADING_BDCONFIG":
            return { ...state, loading: action.payload }
        case "RESET_BDCONFIG_REDUCER":
            return INITIAL_STATE
        default:
            return state;
    }
};
