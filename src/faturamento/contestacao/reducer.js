import grid from "./contestacao.json";
import { download } from "./actions";

const initialValues = {
  bills: [], //grid.mockData,
  all_bills: [],
  page: 1,
  qtd_pages: 1,
  qtd_bills: 0,
  months: [],
  groups: [],
  operators: [],
  vendors: [],
  filter: {},
  table_overflow: false,
  inconsistencies: [],
  lotes: [],
  status: [],
  provedor: [],
  detalhes_lote: {
    inc: [],
    det: {},
    isNovoLoteGerado: null,
  },
  envio_email: [],
  criticas_upload: [],
  bcl: {},
  updated_vendor: {},
  vendor_contacts: []
}

export default (state = initialValues, action) => {
  switch (action.type) {

    case "GET_MONTHS":
      return { ...state, months: action.payload };

    case "GET_GROUPS":
      return { ...state, groups: action.payload };

    case "GET_OPERATORS_AND_VENDORS":
      return { ...state, operators: action.payload[0], vendors: action.payload[1] };

    case "GET_BILLS_CONTESTATIONS":
      return { ...state, ...action.payload };

    case "SET_FILTER_DATA":
      return { ...state, filter: action.payload };

    case "EXPORT_ALL":
      return { ...state, all_bills: action.payload };

    case "GET_ALL_CONTESTATION_ITEMS":
      return { ...state, ...action.payload };

    case "SHOW_TABLE_OVERFLOW":
      return { ...state, table_overflow: true };

    case "HIDE_TABLE_OVERFLOW":
      return { ...state, table_overflow: false };

    case "GET_BILL_CONC_LOT":
      return { ...state, ...action.payload };

    case "GET_COMBOS_LOTE":
      return { ...state, ...action.payload };

    case "GET_DETALHES_LOTE":
      return { ...state, detalhes_lote: action.payload };

    case "GET_HIST_ENVIO_EMAIL":
      return { ...state, envio_email: action.payload };

    case "SET_DOWNLOAD_FILE_NAME":
      download(action.payload)
      return { ...state};

    case "SET_CRITICA_UPLOAD_CONTESTACAO":
      return { ...state, criticas_upload: action.payload};

    case "LOTE_GERADO":
      return { ...state, bcl: action.payload[0], updated_vendor: action.payload[1] }

    case "SET_BILL_CONC_LOTE":
      return { ...state, bcl: action.payload }
    default:
      return { ...state };

  }
}
