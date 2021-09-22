// import Moment from "moment";

const INITIAL_STATE = {
  list: [],
  rowsDetails: [],
  paginator: { currentPage: 1, pageSize: 100 },
  grouping_column_name: "id_licceu_anel",
  columns: [
    { id: 1, name: "id_licceu_anel", title: "ID LICCEU ANEL" },
    { id: 2, name: "chave", title: "Chave" },
    { id: 3, name: "cluster_fo", title: "Cluster" },
    { id: 4, name: "anel_fo", title: "Anel" },
    { id: 5, name: "tipo", title: "Tipo" },
    { id: 6, name: "status", title: "Status" },
    { id: 7, name: "capacidade_min", title: "Cap. Min (Mbps)" },
    { id: 8, name: "capacidade_max", title: "Cap. Max (Mbps)" },
    { id: 9, name: "cap_ativo", title: "Cap. Em Serviço" },
    { id: 10, name: "cap_proj", title: "Cap. Planejada (Mbps)" },
    { id: 11, name: "cap_disp", title: "Cap. Disponível (Mbps)" },
    { id: 12, name: "ag_pop_1", title: "Pop Agregador 1" },
    { id: 13, name: "ag_pop_2", title: "Pop Agregador 2" },
    { id: 14, name: "colVazia1", title: "  " },
    { id: 15, name: "colVazia2", title: "  " }
  ],
  defaultColumnWidths: [
    // Este array é espelho do de cima
    { columnName: "id_licceu_anel", width: 125 },
    { columnName: "chave", width: 125 },
    { columnName: "cluster_fo", width: 125 },
    { columnName: "anel_fo", width: 125 },
    { columnName: "tipo", width: 125 },
    { columnName: "status", width: 125 },
    { columnName: "capacidade_min", width: 125 },
    { columnName: "capacidade_max", width: 125 },
    { columnName: "cap_ativo", width: 125 },
    { columnName: "cap_proj", width: 125 },
    { columnName: "cap_disp", width: 125 },
    { columnName: "ag_pop_1", width: 125 },
    { columnName: "ag_pop_2", width: 125 },
    { columnName: "colVazia1", width: 125 },
    { columnName: "colVazia2", width: 125 }
  ],
  operators: [],
  page: 1,
  limit: 100,
  newFilter: {},
  total: 0,
  listBandaMedia: [],
  idCircuitFromRedirect: -1
};

export default (state = INITIAL_STATE, action) => {
  const { paginator } = state;
  switch (action.type) {
    case "FOS_FETCHED":
      return {
        ...state,
        list: action.payload[0],
        paginator
      };
    case "SHOW_FO":
      return {
        ...state,
        list: action.payload,
        page: action.page,
        limit: 100,
        total: action.total,
        last: action.last
      };
    case "PREVIOUS_PAGE":
      return {
        ...state,
        list: action.payload,
        page: action.page,
        limit: 100,
        total: action.total
      };
    case "NEXT_PAGE":
      return {
        ...state,
        list: action.payload,
        page: action.page,
        limit: 100,
        total: action.total
      };
    case "LAST_PAGE":
      return {
        ...state,
        list: action.payload,
        page: action.page,
        limit: 100,
        total: action.total
      };
    case "POST_FO_FAST_SEARCH":
      return {
        ...state,
        list: action.payload,
        page: 1,
        limit: 100,
        total: action.total,
        newFilter: action.newFilter
      };

    case "CANCEL_ANEL_FO":
      return {
        ...state,
        list: state.list.filter(obj => obj.id !== action.payload.id)
      };

    case "GET_BANDA_MEDIA":
      return {
        ...state,
        listBandaMedia: action.payload
      };

    case "REDIRECT_TO_ANEL_FO":
      return {
        ...state,
        idCircuitFromRedirect: action.payload
      };

    case "GET_LIST_RINGS_FROM_CIRCUITS":
      return {
        ...state,
        list: action.payload
      };

    case "RESET_ID_CIRCUIT_REDIRECT":
      return {
        ...state,
        idCircuitFromRedirect: -1,
        list: []
      };

    default:
      return state;
  }
};

function trataListasSelectFiltros(data, tipoRetorno, state, siglasIsScroll) {
  const jsonLista = data;
  let jsonFormatadoReactSelect = [];

  switch (tipoRetorno) {
    case "id_licceu_anel_list":
      for (let i = 0; i < jsonLista.length; i += 1) {
        const jsonFormatado = {};

        jsonFormatado.id_licceu_anel = jsonLista[i].id_licceu_anel;

        jsonFormatadoReactSelect.push(jsonFormatado);
      }
      break;

    case "municipio_estacao":
      for (let i = 0; i < jsonLista.length; i += 1) {
        const jsonFormatado = {};

        jsonFormatado.municipio_estacao = jsonLista[i].municipio_estacao;

        jsonFormatadoReactSelect.push(jsonFormatado);
      }

      break;

    case "agrupadorList":
      for (let i = 0; i < jsonLista.length; i += 1) {
        const jsonFormatado = {};

        jsonFormatado.pop_agregador = jsonLista[i].agrupadores;

        jsonFormatadoReactSelect.push(jsonFormatado);
      }
      break;

    case "anel":
      for (let i = 0; i < jsonLista.length; i += 1) {
        const jsonFormatado = {};

        jsonFormatado.anel = jsonLista[i].anel_fo;

        jsonFormatadoReactSelect.push(jsonFormatado);
      }
      break;

    case "cluster":
      for (let i = 0; i < jsonLista.length; i += 1) {
        const jsonFormatado = {};

        jsonFormatado.cluster = jsonLista[i].cluster_fo;

        jsonFormatadoReactSelect.push(jsonFormatado);
      }
      break;

    case "siglas2g3gList":
      if (siglasIsScroll) {
        jsonFormatadoReactSelect = state.siglas2g3gList;
      }
      for (let i = 0; i < jsonLista.length; i += 1) {
        const jsonFormatado = {};

        const [cod, sigla] = jsonLista[i];

        jsonFormatado.sigla = sigla;
        jsonFormatado.cod = cod;

        jsonFormatadoReactSelect.push(jsonFormatado);
      }
      break;

    default:
      break;
  }

  return jsonFormatadoReactSelect;
}

const INITIAL_STATE_FILTER = {
  filter: {
    // tipo_anel: "",
    // status: "",
    // reg_a: "",
    // reg_b: "",
    // multi_address: "",
    // municipio_a: "",
    // municipio_b: "",
    // id_licceu: "",
    // sigla: "",
    // agrupador: "",
    // multi_sites: "",
    // anel: "",
    // cluster: "",
    // uf_anel: "",
    // address_a: "",
    // address_b: ""
  },
  id_licceu_anel_list: [{ id: "", id_licceu_anel: "" }],
  regionalList: [{ id: "", regional: "" }],
  municipioEstacaoList: [{ id: "", municipio_estacao: "" }],
  agrupadorList: [{ id: "", agrupadores: "" }],
  anelList: [{ id: "", anel_fo: "" }],
  clusterList: [{ id: "", cluster_fo: "" }],
  ufAnelList: [
    { id: "1", ufAnel: "AC" },
    { id: "2", ufAnel: "AL" },
    { id: "3", ufAnel: "AP" },
    { id: "4", ufAnel: "AM" },
    { id: "5", ufAnel: "BA" },
    { id: "6", ufAnel: "CE" },
    { id: "7", ufAnel: "DF" },
    { id: "8", ufAnel: "ES" },
    { id: "9", ufAnel: "GO" },
    { id: "10", ufAnel: "MA" },
    { id: "11", ufAnel: "MT" },
    { id: "12", ufAnel: "MS" },
    { id: "13", ufAnel: "MG" },
    { id: "14", ufAnel: "PA" },
    { id: "15", ufAnel: "PB" },
    { id: "16", ufAnel: "PR" },
    { id: "17", ufAnel: "PE" },
    { id: "18", ufAnel: "PI" },
    { id: "19", ufAnel: "RJ" },
    { id: "20", ufAnel: "RN" },
    { id: "21", ufAnel: "RS" },
    { id: "22", ufAnel: "RO" },
    { id: "23", ufAnel: "RR" },
    { id: "24", ufAnel: "SC" },
    { id: "25", ufAnel: "SP" },
    { id: "26", ufAnel: "SE" },
    { id: "27", ufAnel: "TO" }
  ],
  siglas2g3gList: [],
  siglaLoading: true,
  anelDataLoading: true
  // tipo_anel: "",
  // id_licceu: "",
  // status: "",
  // uf_anel: "",
};

export function licceuOpenFilterFOReducer(
  state = INITIAL_STATE_FILTER,
  action
) {
  switch (action.type) {
    case "GET_ALL_STATION_CITIES":
      return {
        ...state,
        municipioEstacaoList: trataListasSelectFiltros(
          action.payload,
          "municipio_estacao"
        )
      };

    case "GET_ALL_ANEL_DATA":
      return {
        ...state,
        id_licceu_anel_list: trataListasSelectFiltros(
          action.payload[0],
          "id_licceu_anel_list"
        ),
        anelList: trataListasSelectFiltros(action.payload[1], "anel"),
        clusterList: trataListasSelectFiltros(action.payload[2], "cluster"),
        regionalList: action.payload[3],
        agrupadorList: trataListasSelectFiltros(
          action.payload[4],
          "agrupadorList"
        ),
        anelDataLoading: false
      };
    case "GET_SIGLAS":
      return {
        ...state,
        siglas2g3gList: trataListasSelectFiltros(
          action.payload,
          "siglas2g3gList",
          state,
          action.isScroll
        ),
        siglaLoading: false
      };

    default:
      return state;
  }
}
