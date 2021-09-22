import moment from "moment";

const INITIAL_STATE = {
    sdRows: [{
        abertura_od: "",
        abertura_sd: "",
        circuitos: "",
        code: "",
        delivered_at: "",
        encerramento_sd: "",
        id: "",
        multa: "",
        od_id: "",
        odcode: "",
        provedor: "",
        provedor_id: "",
        saving: "",
        sla: "",
        status_id: "",
        statusoddesc: "",
        statussddesc: "",
        user_id: "",
        valor: ""
    }],
    lastPage: "",
    total: "",
    page: 1,
    odStatus: [{
        created_at: "",
        description: "",
        id: "",
        is_final: "",
        model_name: "",
        not_ok_status_id: "",
        ok_status_id: "",
        scale: "",
        updated_at: ""
    }],
    sdStatus: [{
        created_at: "",
        description: "",
        id: "",
        is_final: "",
        model_name: "",
        not_ok_status_id: "",
        ok_status_id: "",
        scale: "",
        updated_at: ""
    }],
    vendors: [{
        address: "",
        address_cep: "",
        address_city: "",
        address_complement: "",
        address_country: "",
        address_neighborhood: "",
        address_number: "",
        address_state: "",
        authorized_contact2_id: "",
        authorized_contact3_id: "",
        authorized_contact_id: "",
        cnpj: "",
        contact_mail: "",
        contact_name: "",
        created_at: "",
        default_contact2_id: "",
        default_contact_id: "",
        degrau_anatel: "",
        degrau_proprio: "",
        desc_provedor: "",
        garantia_receita: "",
        grupo: "",
        id: "",
        insc_estadual: "",
        long_name: "",
        name: "",
        prazo_aceitacao: "",
        prazo_desativacao: "",
        print_attach: "",
        reg_propria: "",
        short_name: "",
        status: "",
        template_form: "",
        tipo_localidade: "",
        tp_localidade: "",
        updated_at: "",
        user_id: "",
        vendor_area: ""
    }],
    visualizarData: {
        id: "",
        mensalidade_sem_imposto: "",
        multa: "",
        observacoes: "",
        od_code: "",
        od_dt_abertura: "",
        od_id: "",
        od_status: "",
        od_user: "",
        provedor: "",
        saving: "",
        sd_code: "",
        sd_dt_criacao: "",
        sd_dt_envio_email: "",
        sd_status: "",
        sd_user: "",
        taxa_desativacao: ""
    },
    visualizarTableData: [{
        ativacao: "",
        circuito_id: "",
        contrato: "",
        id: "",
        id_circuit_bill: "",
        mensalidade_com_imposto: "",
        mensalidade_sem_imposto: "",
        multa: "",
        observacao: "",
        previsao_desligamento: "",
        saving: "",
        status_description: "",
        status_id: "",
        taxa_desativacao: "",
        termino_vigencia: ""
    }]
};

const convertDate = params => {
    return params === null ? "" : moment(params).format("DD/MM/YYYY");
};

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case "SHOW_SD":
            return {
                ...state,
                sdRows: action.payload[0].map(n => ({
                    ...n,
                    abertura_od: convertDate(n.abertura_od),
                    abertura_sd: convertDate(n.abertura_od),
                    delivered_at: convertDate(n.delivered_at)
                })),
                lastPage: Math.ceil(action.payload[1]),
                total: action.payload[2],
                page: action.payload[3]
            };
        case "OD_STATUSES":
            return {
                ...state,
                odStatus: action.payload
            };
        case "SD_STATUSES":
            return {
                ...state,
                sdStatus: action.payload
            };
        case "ALL_VENDORS":
            return {
                ...state,
                vendors: action.payload
            };
        case "DADOS_VISUALIZAR":
            return {
                ...state,
                visualizarData: {
                    ...action.payload[0],
                    od_dt_abertura: convertDate(action.payload[0].od_dt_abertura),
                    sd_dt_criacao: convertDate(action.payload[0].sd_dt_criacao),
                    sd_dt_envio_email: convertDate(action.payload[0].sd_dt_envio_email)
                },
                visualizarTableData: action.payload[1].map(n => ({
                    ...n,
                    ativacao: convertDate(n.ativacao),
                    termino_vigencia: convertDate(n.termino_vigencia),
                    previsao_desligamento: convertDate(n.previsao_desligamento)
                }))
            };
        case "ADD_FILTER":
            return {
                ...state,
                filter: action.payload
            };
        default:
            return state;
    }
}