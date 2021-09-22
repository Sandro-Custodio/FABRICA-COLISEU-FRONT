const INITIAL_STATE = {
  hubRows: [
    {
      idLicceu: "",
      pontaARegional: "",
      pontaAUf: "",
      pontaAMunicipio: "",
      pontaAElementoId: "",
      pontaBRegional: "",
      pontaBUf: "",
      pontaBMunicipio: "",
      pontaBElementoId: "",
      status: "",
      capacidadeSolicitada: "",
      capacidadeContratada: "",
      tipoLink: "",
      modelo: "",
      vendorFornecedorOrigemMw: "",
      vendorFornecedorOrigemFoLl: "",
      vendorFornecedorDestFoLl: "",
      vendorFornecedorDestMw: "",
      tecnologia: "",
      conceitoHub: "",
      desCircuito: "",
      interfaceHub: "",
      accId: "",
      trailId: "",
      slotPorta: "",
      ot: "",
      engTx: "",
      engenheiroResp: "",
      dependenciaRotaLd: "",
      observacao: "",
      bandaMediaAtualEndId: "",
      bandaMediaAtualEth: "",
      bandaMediaProjetEndId: "",
      bandaMediaProjetEth: "",
      uniqueBandaMediaLink: {
        bandaMediaAtualEndId: "",
        bandaMediaAtualEth: "",
        bandaMediaProjetEndId: "",
        bandaMediaProjetEth: "",
        tipoLink: ""
      }
    }
  ],
  page: 1,
  limit: 100,
  total: 0,
  idCircuitFromRedirect: -1
};

const INITIAL_STATE_FILTER = {
  regional: [],
  municipios: [],
  interfaces: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "SHOW_HUB":
      return {
        ...state,
        hubRows: action.payload.content,
        page: action.page,
        limit: action.limit,
        total: action.payload.totalElements,
        last: action.payload.totalPages,
        filter: action.filter
      };
    case "PREVIOUS_PAGE":
      return {
        ...state,
        hubRows: action.payload.content,
        page: action.page,
        limit: action.limit,
        total: action.payload.totalElements,
        filter: action.filter
      };
    case "NEXT_PAGE":
      return {
        ...state,
        hubRows: action.payload.content,
        page: action.page,
        limit: action.limit,
        total: action.payload.totalElements,
        filter: action.filter
      };
    case "LAST_PAGE":
      return {
        ...state,
        hubRows: action.payload.content,
        page: action.page,
        limit: action.limit,
        total: action.payload.totalElements,
        filter: action.filter
      };

    case "REDIRECT_TO_HUB":
      return {
        ...state,
        idCircuitFromRedirect: action.payload
      };

    case "GET_LIST_HUBS_FROM_REDIRECT":
      return {
        ...state,
        hubRows: action.payload
      };

    case "RESET_ID_CIRCUIT_REDIRECT":
      return {
        ...state,
        idCircuitFromRedirect: -1,
        hubRows: []
      };

    default:
      return state;
  }
}

export function licceuHubOpenFilterReducer(
  state = INITIAL_STATE_FILTER,
  action
) {
  switch (action.type) {
    case "GET_ALL_REGIONAL":
      return {
        ...state,
        regional: action.payload
      };
    case "GET_ALL_MUNICIPIOS":
      return {
        ...state,
        municipios: action.payload
      };
    case "GET_ALL_INTERFACE":
      return {
        ...state,
        interfaces: action.payload
      };
    default:
      return state;
  }
  //
}
