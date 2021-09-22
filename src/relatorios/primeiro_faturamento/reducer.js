const initial_state = {
    columns: [
        { name: "id_faturamento", title: "ID Faturamento" },
        { name: "provedor", title: "Provedor" },
        { name: "circuito", title: "Circuito" },
        { name: "classificacao", title: "Classificação" },
        { name: "grupo", title: "Grupo" },
        { name: "mes_referencia_1_fat", title: "Mês Referência" },
        { name: "mes_competencia_1_fat", title: "Mês Competência" },
        { name: "valor_faturado_1_fat", title: "Valor Faturado" },
        { name: "data_ativacao", title: "Data Ativação" },
        { name: "status_coliseu", title: "Status Coliseu" },
        { name: "valor_mensal_s_imp", title: "Mensal S/ Imposto" },
        { name: "valor_mensal_c_imp_a", title: "Mensal C/ Imposto A" },
        { name: "valor_mensal_c_imp_b", title: "Mensal C/ Imposto B" },
        { name: "valor_taxa_s_imp", title: "Taxa S/ Imposto" },
        { name: "valor_taxa_c_imp_a", title: "Taxa C/ Imposto A" },
        { name: "valor_taxa_c_imp_b", title: "Taxa C/ Imposto B" },
    ],
    rows: [],
    operators: [],
    vendors: [],
    mes_ref: [],
    grupo_classe: [],
    data_export: [],
    pages: 1,
    items: 0,
}

export default (state = initial_state, action) => {
    switch (action.type) {
        case "GET_1_FAT":
            return { ...state, ...action.payload }
        case "GET_COMBOS":
            return { ...state, ...action.payload }
        case "EXPORT_ALL":
            return { ...state, data_export: action.payload }
        default:
            return state
    }
}