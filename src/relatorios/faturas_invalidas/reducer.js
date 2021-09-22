const initial_state = {
    columns: [
        { name: "regional_tim", title: "Regional" },
        { name: "provedor", title: "Provedor" },
        { name: "mes_fatura", title: "Mês Referência" },
        { name: "competence_month", title: "Mês de Competência" },
        { name: "bill_number", title: "Fatura" },
        { name: "agrupador", title: "Agrupador" },
        { name: "linhas_dd", title: "Linha DD" },
        { name: "quantidade_circuitos", title: "Quantidade Circuitos" },
        { name: "emissao", title: "Emissão" },
        { name: "vencimento", title: "Vencimento" },
        { name: "valor_fatura", title: "Valor Fatura (R$)" },
        { name: "custo_dd", title: "Valor DD (R$)" },
        { name: "diferenca", title: "Diferença (R$)" },
    ],
    rows: [],
    vendors: [],
    months: [],
    operators: [],
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
        case "GET_ALL_FATURAS_INVALIDAS":
            return { ...state, ...action.payload }
        case "EXPORT_ALL":
            return { ...state, data_export: action.payload }
        default:
            return state
    }
}