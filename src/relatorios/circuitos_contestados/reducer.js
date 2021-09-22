const initial_state = {
    columns: [
        { name: "regional_tim", title: "Regional" },
        { name: "provedor", title: "Provedor" },
        { name: "inconsistencia", title: "Inconsistência" },
        { name: "agrupador", title: "Agrupador" },
        { name: "bill_month", title: "Mês Fatura" },
        { name: "circuito", title: "Circuito" },
        { name: "valor", title: "Valor Contestado" },
        { name: "valor_compensado", title: "Valor Compensado" },
        { name: "status_fatura", title: "Status Fatura" },
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
        case "GET_CIRCUIT_CONTESTATION":
            return { ...state, ...action.payload }
        case "EXPORT_ALL":
            return { ...state, data_export: action.payload }
        default:
            return state
    }
}