const INITIAL_STATE = {
    show: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SHOW_OVERLAY':
            return { ...state, show: true }
        case 'HIDE_OVERLAY':
            return { ...state, show: false }
        default:
            return state
    }
}