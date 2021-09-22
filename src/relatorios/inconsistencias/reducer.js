const initial_state = {
    columns: [
        { name: "id", title: "ID" },
        { name: "competence_month", title: "Mês de Competência" },
        { name: "bill_month", title: "Mês Referência" },
        { name: "bill_id", title: "ID da Fatura" },
        { name: "nome_relatorio", title: "Nome do Relatório" },
        { name: "regional", title: "Regional" },
        { name: "provedor", title: "Provedor" },
        { name: "agrupador_name", title: "Agrupador DELIN" },
        { name: "circuito", title: "Circuito" },
        { name: "bill_number", title: "Número da Fatura" },
        { name: "historico_tx_inst", title: "Histórico Tx Inst" },
        { name: "mes_previsto_tx_inst", title: "Mês Prev Tx Inst" },
        { name: "base_fatura", title: "Valor C/ Imp - Base Fatura" },
        { name: "base_fisica", title: "Valor C/ Imp - COLISEU" },
        { name: "bill_cost_dd", title: "Custo Total DD" },
        { name: "apontado", title: "Diferença" },
        { name: "contestar", title: "A Contestar" },
        { name: "acao", title: "Ação" },
        { name: "ll_guid", title: "LL Guid" },
        { name: "justificativa", title: "Justificativa" },
        { name: "remarks", title: "Observação" },
        { name: "bill_dd_classification_list", title: "Classificação COLISEU" },
        { name: "invoice_description", title: "Descrição DELIN" },
        { name: "class_group", title: "Grupo COLISEU" },
        { name: "dt_ativacao_delin", title: "Data Ativação DELIN" },
        { name: "dt_desativacao_delin", title: "Data Desativação DELIN" },
        { name: "endereco_a_delin", title: "Endereço A DELIN" },
        { name: "endereco_b_delin", title: "Endereço B DELIN" },
        { name: "status_ll_coliseu", title: "Status LL COLISEU" },
        { name: "id_ll", title: "ID LL" },
        { name: "dt_ativacao_coliseu", title: "Data Ativação COLISEU" },
        { name: "codigo_ot", title: "Código OT" },
        { name: "dt_desativacao_coliseu", title: "Data Desativação COLISEU" },
        { name: "codigo_od", title: "Código OD" },
        { name: "val_link_c_imp_a", title: "Valor Mensal C/ Imp A COLISEU" },
        { name: "val_link_c_imp_b", title: "Valor Mensal C/ Imp B COLISEU" },
        { name: "historico_dd_agrupador_a", title: "Histórico DELIN Agrupador A" },
        { name: "historico_dd_agrupador_b", title: "Histórico DELIN Agrupador B" },
        { name: "status_conciliacao", title: "Status Conciliação" },
        { name: "historico_fat", title: "Histórico Fatura" },
        { name: "seg_a_regional", title: "Seg Regional A" },
        { name: "seg_a_elemento", title: "Seg Elemento A" },
        { name: "seg_a_endereco", title: "Seg Endereço A" },
        { name: "seg_a_tipo_elemento", title: "Seg Tipo Elemento A" },
        { name: "seg_regional_b", title: "Seg Regional B" },
        { name: "seg_b_elemento", title: "Seg Elemento B" },
        { name: "seg_b_tipo_elemento", title: "Seg Tipo Elemento B" },
        { name: "seg_b_endereco", title: "Seg Endereço B" },
        { name: "solucao", title: "Solução" },
        { name: "seg_speed", title: "Velocidade Seg" },
        { name: "degrau", title: "Degrau" },
        { name: "observacao_ll", title: "Observação Geral LL" },
        { name: "data_envio_email_sd", title: "Data Envio Email SD" },
        { name: "data_fim_faturamento", title: "Data Fim Faturamento" },
        { name: "data_pendencia_aceitacao", title: "Data Pendêcia Aceitação" },
        { name: "observacao_pendencia_aceitacao", title: "Observação Pendência Aceitação LL" },
        { name: "caracterizacao_eild", title: "Caracterização EILD" },
        { name: "sla_ativacao_provedor", title: "SLA Ativação Provedor" },
        { name: "credito_atraso_ativacao", title: "Previsão R$ Crédito Atraso Ativação" },
        { name: "credito_cancelamento", title: "Previsão R$ Crédito Cancelamento" },
        { name: "data_servico", title: "Data de Serviço" },
    ],
    rows: [],
    operators: [],
    vendors: [],
    months: [],
    inconsistency: [],
    actions: [
        { title: "Devido" },
        { title: "Contestar Integral" },
        { title: "Contestar Parcial" }
    ],
    justifications: [],
    gridexports: {
        export_model: [],
        grid_model: [],
    },
    pages: 1,
    items: 0,
    data_export: [],
    upload_file: {
        inconsistencias: [],
        erros: 0,
        ok: 0,
        file: "",
    },
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
        case "GET_ALL_INCONSISTENCY":
            return { ...state, inconsistency: action.payload }
        case "GET_ALL_GRID_EXPORTS":
            return { ...state, gridexports: action.payload }
        case "GET_REPORT_INCONSISTENCE":
            return { ...state, ...action.payload }
        case "GET_ALL_JUSTIFICATIONS":
            return { ...state, justifications: action.payload }
        case "EXPORT_ALL":
            return { ...state, data_export: action.payload }
        case "UPLOAD_FILE":
            return { ...state, upload_file: action.payload }
        default:
            return state
    }
}