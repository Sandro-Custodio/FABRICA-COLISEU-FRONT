const initial_state = {
    columns: [
        { name: "circuito_id", title: "Circuito Normalizado" },
        { name: "ot_code", title: "OT" },
        { name: "regional", title: "Regional" },
        { name: "status_ll", title: "Status LL" },
        { name: "provedor", title: "Provedor" },
        { name: "velocidade", title: "Velocidade Segmento" },
        { name: "data_ativacao", title: "Data Ativação" },
        { name: "mes_cobranca", title: "Previsão Faturamento TX Instalação" },
        { name: "agrupador", title: "Agrupador" },
        { name: "taxa_ins_s_imp", title: "R$ Taxa Inst Sem Imposto" },
        { name: "taxa_ins_c_imp", title: "R$ Taxa Inst Com Imposto" },
    ],
    rows: [],
    pages: 1,
    items: 0,
    data_export: [],
}

export default (state = initial_state, action) => {
    switch (action.type) {
        case "GET_NOT_FAT":
            return { ...state, ...action.payload }
        case "EXPORT_ALL":
            return { ...state, data_export: action.payload }
        default:
            return state
    }
}