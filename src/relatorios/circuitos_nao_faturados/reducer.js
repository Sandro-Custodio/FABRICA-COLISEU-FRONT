const initial_state = {
    columns: [
        { name: "regional", title: "Regional" },
        { name: "provedor", title: "Provedor" },
        { name: "mes_ref", title: "Mes Ref." },
        { name: "group_id_a", title: "Agrupador A" },
        { name: "group_id_b", title: "Agrupador B" },
        { name: "circuito_id", title: "Circuito" },
        { name: "description", title: "Descrição" },
        { name: "val_link_c_imp_a", title: "Mensal R$(A)" },
        { name: "val_link_c_imp_b", title: "Mensal R$(B)" },
    ],
    rows: [],
    operators: [],
    vendors: [],
    months: [],
    pages: 1,
    items: 0,
    data_export: [],
}

export default (state = initial_state, action) => {
    switch (action.type) {
        case "GET_MONTHS":
            return { ...state, months: action.payload }
        case "GET_OPERATORS_AND_VENDORS":
            return {
                ...state, 
                operators: action.payload[0], 
                vendors: action.payload[1],
            }
        case "GET_BILL_NOT_CIRCUIT":
            return { ...state, ...action.payload }
        case "EXPORT_ALL":
            return { ...state, data_export: action.payload }
        default:
            return state
    }
}