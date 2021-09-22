const initial_state = {
    columns: [
        { name: "id", title: "ID Vinculação" },
        { name: "tipo_vinculacao", title: "Tipo" },
        { name: "rec_month_ref", title: "Mês Ref." },
        { name: "rec_circuito", title: "Circuito Recebido" },
        { name: "rec_creditado", title: "R$ Creditado" },
        { name: "rec_saldo", title: "Saldo" },
        { name: "prev_month_ref", title: "Mês Prev." },
        { name: "prev_circuito", title: "Circuito Previsto" },
        { name: "prev_esperado", title: "R$ Esperado" },
        { name: "prev_deduzido_acc", title: "R$ Deduzido" },
        { name: "prev_pendente", title: "R$ Pendente" },
        { name: "status_credito", title: "Status Credito" },
    ],
    rows: [],
    pages: 1,
    items: 0,
    data_export: []
}

export default (state = initial_state, action) => {
    switch (action.type) {
        case "GET_ALL_INCOMING_DETAILS":
            return { ...state, ...action.payload }
        case "EXPORT_ALL":
            return { ...state, data_export: action.payload }
        default:
            return state
    }
}