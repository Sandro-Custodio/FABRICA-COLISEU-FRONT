const initial_state = {
    columns: [
        { name: "id", title: "ID" },
        { name: "circuito_id", title: "ID Circuito" },
        { name: "provedor", title: "Provedor" },
        { name: "regional", title: "Regional" },
        { name: "status_ll", title: "Status LL" },
        { name: "status_tracking", title: "Status Tracking" },
        { name: "caracterizacao_eild", title: "Caracterização EILD" },
        { name: "ot", title: "OT" },
        { name: "vl_mensal_s_impostos", title: "Valor Mensal S/ Imposto" },
        { name: "vl_mensal_c_impostos", title: "Valor Mensal C/ Imposto" },
        { name: "tx_instalacao_s_impostos", title: "Instalação S/ Imposto" },
        { name: "tx_instalacao_c_impostos", title: "Instalação C/ Imposto" },
        { name: "mes_previsao_credito", title: "Mês Previsão Crédito" },
        { name: "data_contratacao", title: "Data Contratação" },
        { name: "previsao_ativacao_regulamentar", title: "Previsão Ativação Regulamentar" },
        { name: "previsao_ativacao_negociada", title: "Previsão Ativação Negociada" },
        { name: "data_report", title: "Data Extração" },
        { name: "dias_pendentes", title: "Dias Pendentes" },
        { name: "limite_cobranca_multa_contrato", title: "Limite Cobrança Multa Contrato" },
        { name: "previsao_multa_atraso_ativacao", title: "Previsão Multa Atraso Ativação" },
        { name: "previsao_multa_por_canc", title: "Previsão Multa Cancelamento" },
        { name: "data_inicio_pend_tim", title: "Data Início Pendência TIM" },
        { name: "data_conclusao_pend_tim", title: "Data Conclusão Pendência TIM" },
        { name: "dias_de_pend_tim", title: "Dias de Pendência TIM" },
    ],
    rows: [],
    pages: 1,
    items: 0,
    data_export: [],
}

export default (state = initial_state, action) => {
    switch (action.type) {
        case "GET_ALL_BILL_FORESIGHTS":
            return { ...state, ...action.payload }
        case "EXPORT_ALL":
            return { ...state, data_export: action.payload }
        default:
            return state
    }
}