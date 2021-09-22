import Immutable from "seamless-immutable";

const INITIAL_STATE = {
  mwRows: [],
  page: 1,
  limit: 100,
  total: 0,
  form: {},
  newFilter: {},
  idFoRingFromRedirec: -1
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "SHOW_MW":
      return {
        ...state,
        mwRows: action.payload,
        page: action.page,
        limit: 100,
        total: action.total,
        last: action.last
      };
    case "PREVIOUS_PAGE":
      return {
        ...state,
        mwRows: action.payload,
        page: action.page,
        limit: 100,
        total: action.total
      };
    case "NEXT_PAGE":
      return {
        ...state,
        mwRows: action.payload,
        page: action.page,
        limit: 100,
        total: action.total
      };
    case "LAST_PAGE":
      return {
        ...state,
        mwRows: action.payload,
        page: action.page,
        limit: 100,
        total: action.total
      };
    case "POST_CIRCUITO_FILTER":
      return {
        ...state,
        mwRows: action.payload,
        page: 1,
        limit: 100,
        total: action.total,
        newFilter: action.newFilter
      };

    case "REDIRECT_LIST_CIRCUITS":
      return {
        ...state,
        idFoRingFromRedirec: action.payload
      };

    case "SHOW_MW_FROM_LIST_FO_RING":
      return {
        ...state,
        mwRows: action.payload,
        page: action.page,
        limit: 100,
        total: action.total
      };

    case "RESET_ID_ANEL_FO":
      return {
        ...state,
        idFoRingFromRedirec: -1,
        mwRows: []
      };

    default:
      return state;
  }
}

// FILTER
const INITIAL_STATE_FILTER = {
  filter: {
    anel_cluster: "",
    uf: "",
    end_id_z: "",
    meio_tx: "",
    c_interface: "",
    regional: "",
    site_a: "",
    capacidade_min: "",
    tecnologia: "",
    site_z: "",
    has_sigla: true,
    sigla: "",
    frequencia: "",
    sn: "",
    municipio: "",
    capacidade_max: "",
    end_id_a: "",
    nome: "",
    codOt: ""
  },

  sn: [
    [{ id: null, sn: "" }],
    [{ id: null, anel_cluster: "" }],
    [{ id: null, banda_media: "" }],
    [{ id: null, municipio_estacao: "" }]
  ],
  uf: [
    {
      id: null,
      uf_estacao: ""
    }
  ],
  regional: [
    {
      id: null,
      regional: ""
    }
  ],
  vendor_by_area: []
};

export function licceuOpenFilterReducer(state = INITIAL_STATE_FILTER, action) {
  switch (action.type) {
    case "FILTER":
      return { filter: action.payload };
    case "GET_ALL_VENDOR_BY_AREA":
      return { ...state, vendor_by_area: action.payload };

    case "GET_ALL_REGIONAL":
      return { ...state, regional: action.payload };

    case "GET_ALL_UF":
      return { ...state, uf: action.payload };

    case "GET_SN":
      return { ...state, sn: action.payload };
    default:
      return state;
  }
}

const INITIAL_STATE_EDIT = {
  tableRows: [],
  segments: [],
  tableLoading: false
};

export const licceuEditarCircuito = (state = INITIAL_STATE_EDIT, action) => {
  switch (action.type) {
    case "POPULATE_TABLE":
      return { ...state, tableRows: Immutable(action.payload || []) };
    case "POPULATE_SEGMENTS":
      return { ...state, segments: Immutable(action.payload || []) };
    case "LOADING_TABLE":
      return { ...state, tableLoading: action.payload };
    case "CHANGE_TABLE": {
      const { path, value, idx } = action.payload;
      return { ...state, tableRows: state.tableRows.setIn([idx, path], value) };
    }
    case "CHANGE_CAPACITY":
      return {
        ...state,
        tableRows: state.tableRows.map(el => ({
          ...el,
          capacidade: action.payload
        }))
      };
    default:
      return state;
  }
};
