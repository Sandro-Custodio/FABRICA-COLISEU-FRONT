const initial_state = {
    columns: [
        { name: "id_fat", title: "ID Faturamento" },
        { name: "circuito", title: "Circuito Normalizado" },
        { name: "ot_code", title: "OT" },
        { name: "regional", title: "Regional" },
        { name: "status_ll", title: "Status LL" },
        { name: "provedor", title: "Provedor" },
        { name: "velocidade", title: "Velocidade Seg" },
        { name: "agrupador", title: "Agrupador" },
        { name: "data_ativacao", title: "Data Ativação" },
        { name: "prev_fat_tx_instalacao", title: "Previsao Faturamento Tx Instalação" },
        { name: "mes_fat_tx_instalacao", title: "Mês Faturamento Tx Instalação" },
        { name: "taxa_ins_fat_s_imp", title: "R$ Taxa Instalação Faturada Sem Impostos" },
        { name: "taxa_ins_fat_c_imp", title: "R$ Taxa Instalação Faturada Com Impostos" },
        { name: "taxa_ins_s_imp", title: "R$ Taxa Instalação Sem Impostos" },
        { name: "taxa_ins_c_imp", title: "R$ Taxa Instalação Com Impostos" },
    ],
    rows: [],
    pages: 1,
    items: 0,
    data_export: [],
}

export default (state = initial_state, action) => {
    switch (action.type) {
        case "GET_POS_FAT":
            return { ...state, ...action.payload }
        case "EXPORT_ALL":
            return { ...state, data_export: action.payload }
        default:
            return state
    }
}