const INITIAL_STATE = {
    rows: [],
    hasFinalizedPainel: false,
    rowValidated: {},
    painelRows: [],
    bill: [],
    billItems: [],
    userLogin: ""
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "SET_ROWSCONCILIACAO":
            return { ...state, rows: action.payload }
        case "SET_HASFINALIZEDPAINEL_CONCILIACAO":
            return { ...state, hasFinalizedPainel: action.payload }
        case "SET_ROWVALIDATED_CONCILIACAO":
            return { ...state, rowValidated: action.payload }
        case "SET_PAINELROWS_CONCILIACAO":
            return { ...state, painelRows: action.payload }
        case "SET_ALLBILL_CONCILIACAO":
            return { ...state, bill: action.payload }
        case "SET_BILLITEMS_CONCILIACAO":
            return { ...state, billItems: action.payload }
        case "SET_USERLOGIN_CONCILIACAO":
            return { ...state, userLogin: action.payload }
        case "RESET_FATURAMENTOCONCILIACAO_REDUCER":
            return INITIAL_STATE
        default:
            return state;
    }
};
