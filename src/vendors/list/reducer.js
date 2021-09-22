const INITIAL_STATE = {
  list:[],
  columns:[
    { name: 'name', title: 'NOME' },
    { name: 'address', title: 'ENDEREÇO' },
    { name: 'address_city', title: 'CIDADE' },
    { name: 'address_state', title: 'ESTADO' },
    { name: 'address_country', title: 'PAÍS' },
    { name: 'grupo', title: 'GRUPO' },
    { name: 'cnpj', title: 'CNPJ' },
    { name: 'insc_estadual', title: 'INSC_ESTADUAL' },
    { name: 'status', title: 'STATUS' },
    { name: 'vendor_area', title: 'AREA' },
  ],
  contracts:[],
  vendor: {
    name: '[n/a]'
  },
  contract_columns:[
    {name: 'contrato_automatico', title: 'Contrato TIM'},
    {name: 'contrato', title: 'Contrato'},
    {name: 'data_assinatura', title: 'Data Assinatura'},
    {name: 'vigencia', title: 'Vigência'},
    {name: 'tipo', title: 'Tipo'},
    {name: 'regional', title: 'Regional'},
    {name: 'abrangencia', title: 'Abrangência'},
    {name: 'fator_reajuste', title: 'Fator Reajuste'},
    {name: 'indice_reajuste', title: 'Indice Reajuste'},
    {name: 'data_corte', title: 'Data Corte'},
    {name: 'created_at', title: 'Criado em'},
    {name: 'contract_start_at', title: 'Data Começo'},
    {name: 'contract_end_at', title: 'Data Fim'},
    {name: 'rede', title: 'Rede'},
    {name: 'assinatura', title: 'Assinatura'},
    {name: 'gestor', title: 'Gestor'},
    {name: 'classificacao_objeto', title: 'Classificação Objeto'},
    {name: 'objeto_contrato', title: 'Objeto Contrato'},
    {name: 'status_cadastro', title: 'Status Cadastro'},
    {name: 'status_contrato', title: 'Status Contrato'},
    {name: 'prazo_contratual', title: 'Prazo Contratual'},
    {name: 'renovacao_automatica', title: 'Renovacao Automatica'},
    {name: 'prazo_renovacao', title: 'Prazo Renovacao'},
    {name: 'area_contratante', title: 'Area Contratante'},
    {name: 'objeto_descricao', title: 'Descrição'},
    {name: 'has_receita', title: 'Possui Receita'}
  ]
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "VENDORS_LIST_FETCHED":
      state = INITIAL_STATE;
      if (!action.payload) {
        return state;
      }
      return {
        ...state,
        list: action.payload,
        vendor: {}
      };
    case "SET_VENDOR":
      if (!action.payload) {
        return state;
      }
      return {
        ...state,
        vendor: action.payload
      };
    case "CONTRACT_LIST_FETCHED":
      if (!action.payload) {
        return state;
      }
      return {
        ...state,
        contracts: action.payload
      };
    default:
      return state;
  }
};
