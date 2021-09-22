const initial_state = {
    columns: [
        { name: "regional_tim", title: "Regional" },
        { name: "provedor", title: "Provedor" },
        { name: "circuito_id_a", title: "Circuito" },
        { name: "status", title: "Status" },
        { name: "mes_fatura", title: "Mês Referência" },
        { name: "competence_month", title: "Mês de Competência" },
        { name: "bill_dd_classification_list", title: "Classificação" },
        { name: "class_group", title: "Grupo" },
        { name: "agrupador", title: "Agrupador" },
        { name: "cost_center", title: "Tipo Mercado" },
        { name: "invoice_description", title: "Descrição" },
        { name: "bill_dd_service_id", title: "Serviço" },
        { name: "invoice_sequence", title: "Sequencial" },
        { name: "value_taxes", title: "Valor com Impostos" },
        { name: "element_name_a", title: "Elemento A" },
        { name: "element_name_b", title: "Elemento B" },
        { name: "aliquot", title: "Aliquota" },
        { name: "value_icms", title: "Valor ICMS" },
    ],
    rows: [],
    operators: [],
    vendors: [],
    months: [],
    groups: [],
    pages: 1,
    items: 0,
    data_export: [],
    filename: ""
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
        case "GET_BILL_CLASS_GROUP":
            return { ...state, groups: action.payload }
        case "GET_ALL_CIRCUITOS_FATURADOS":
            return { ...state, ...action.payload }
        case "EXPORT_ALL":
            return { ...state, data_export: action.payload }
        case "SET_REPORT_FILENAME":
            return { ...state, filename: action.payload?.link}
        default:
            return state
    }
}
