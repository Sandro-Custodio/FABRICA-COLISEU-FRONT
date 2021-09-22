const INITIAL_STATE = {
    list: [],
    grouping_column_name: 'description',
    buttonColumns:['filename'],
    dateColumns:['update_at'],
    columns: [
        { name: 'description', title: 'DESCRIÇÃO' },
        { name: 'update_at', title: 'ATUALIZADO EM' },
        { name: 'filename', title: 'DOWNLOAD' }
    ]
}

export default (state = INITIAL_STATE, action) => {
    let list = null
    switch(action.type){
        case 'VIEWS_FETCHED':
            list = action.payload.views
            return { ...state, list }
        default:
            return state
    }
}