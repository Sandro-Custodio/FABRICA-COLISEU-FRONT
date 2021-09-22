const initialState = {
    describe: {},
    ll: [],
}

export default (state = initialState, action) => {
    switch (action.type) {
        case "GET_OD_BY_CODE":
            return { ...state, describe: action.payload }
        case "GET_RELATED_LLS":
            return { ...state, describe: action.payload }
        default:
            return state
    }
}