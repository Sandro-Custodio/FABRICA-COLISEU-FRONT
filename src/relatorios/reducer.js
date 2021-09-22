const initial_state = {
    combos: [],
    groups: []
}

export default (state = initial_state, action) => {
    switch(action.type) {
        case "GET_GROUPS":
            return { ...state, groups: action.payload }
        case "GET_COMBOS":
            return { ...state, combos: action.payload }
        default:
            return state
    }
}