import Moment from "moment";

const INITIAL_STATE = {
  evt_list: [],
  get_demand_classifications: [],
  columns: [
    { name: "buttons", title: " " },
    {
      name: "pms_id",
      title: "PMS",
      getCellValue: row => (row.pms_id ? "Sim" : "Não")
    },
    { name: "request_protocol", title: "EVT" },
    {
      name: "requested_at",
      title: "Dt. Pedido",
      getCellValue: row =>
        row.requested_at
          ? `${Moment(row.requested_at).format("DD/MM/YYYY")}`
          : ``
    },
    {
      name: "vendor",
      title: "Provedor",
      getCellValue: row => (row.vendor ? row.vendor.name : undefined)
    },
    { name: "monthly_cost", title: "$ Mês" },
    { name: "installation_cost", title: "$ Inst." },
    { name: "project_cost", title: "$ Proj." },
    { name: "month_with_project", title: "PE - Mensal" },
    { name: "ins_with_project", title: "PE - Instalação" },
    { name: "quantity", title: "Qtd." },
    { name: "contract_time", title: "Pz Cont." },
    { name: "activation_time", title: "Pz. Ativ." },
    {
      name: "deadline_at",
      title: "Pz. Resp.",
      getCellValue: row =>
        row.deadline_at ? `${Moment(row.deadline_at).format("DD/MM/YYYY")}` : ``
    },
    {
      name: "evt_status",
      title: "Status",
      getCellValue: row =>
        row.evt_status ? row.evt_status.description : undefined
    },
    {
      name: "delivered_at", title: "Dt. Envio E-mail", getCellValue: row =>
        row.delivered_at
          ? `${Moment(row.delivered_at).format('DD/MM/YYYY')}`
          : ``
    }
  ],
  attaches: [],
  attach_list: [],
  attach_columns: [
    { name: "id_noticacao", title: "ID" },
    { name: "nm_processo", title: "PROCESSO" },
    { name: "code", title: "CÓDIGO" },
    {
      name: "created_at",
      title: "DATA_UPLOAD",
      getCellValue: row =>
        row.created_at ? `${Moment(row.created_at).format("DD/MM/YYYY")}` : ``
    },
    { name: "attach_type", title: "TIPO DE ANEXO" },
    { name: "file_type", title: "TIPO DE ARQUIVO" },
    { name: "original_name", title: "NOME DO ANEXO" },
    {
      name: "area",
      title: "AREA",
      getCellValue: row => (row.area ? row.area.code : "")
    },
    {
      name: "protocol_date",
      title: "DATA  PROTOCOLO",
      getCellValue: row =>
        row.protocol_date
          ? `${Moment(row.protocol_date).format("DD/MM/YYYY")}`
          : ``
    },
    { name: "buttons", title: " " }
  ],
  attach_columns_widths: [
    { columnName: "id_noticacao", width: "50" },
    { columnName: "nm_processo", width: "auto" },
    { columnName: "code", width: "180" },
    { columnName: "created_at", width: "150" },
    { columnName: "attach_type", width: "auto" },
    { columnName: "file_type", width: "auto" },
    { columnName: "original_name", width: "240" },
    { columnName: "area", width: "70" },
    { columnName: "protocol_date", width: "150" },
    { columnName: "buttons", width: "70" }
  ],
  evt: "",
  description: "",
  protocol_date: "",
  vendor: "",
  sendRequest: false,
  formEvtAfterAction: {},
  vendorProviders: [],
  provSelected: [
    { validatePms: {}, getVendorContracts: {}, checkContractedQuantity: {} }
  ],
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "RADAR_INFO_FETCHED":
      // console.log("RADAR_INFO_FETCHED", action);
      state = INITIAL_STATE;
      if (!action.payload) {
        return state;
      }
      let response = action.payload;
      return {
        ...state,
        response
      };
    case "RADAR_EVTS_FETCHED":
      // console.log("RADAR_EVTS_FETCHED");
      return {
        ...state,
        evt_list: action.payload
      };
      case "DEMAND_CLASSIFICATIONS_FETCHED":
        // console.log("RADAR_EVTS_FETCHED");
        return {
          ...state,
          get_demand_classifications: action.payload
        };
    case "TRACKING_ATTACHS_FETCHED":
      return {
        ...state,
        attach_list: action.payload
      };
    case "EVT_STORED":
      return {
        ...state,
        evt: action.payload
      };
    case "SET_VENDOR":
      return {
        ...state,
        vendor: action.payload
      };
    case "SEND_REQUEST":
      return {
        ...state,
        sendRequest: true
      };
    case "SEND_REQUEST_OFF":
      return {
        ...state,
        sendRequest: false
      };
    case "FORM_EVT":
      return {
        ...state,
        formEvtAfterAction: action.payload
      };
    case "GET_VENDOR_PROVIDERS":
      return {
        ...state,
        vendorProviders: action.payload
      };
    case "SET_PROVEDOR":
      return {
        ...state,
        provSelected: {
          validatePms: action.payload[0],
          getVendorContracts: action.payload[1],
          checkContractedQuantity: action.payload[2]
        }
      };
    case "LOADING":
      return {
        ...state,
        loading: action.payload
      };
    case "LOADING_OFF":
      return {
        ...state,
        loading: action.payload
      };
    case "SET_ATTACHES":
      return {
        ...state,
        attaches: action.payload
      };

    case "DELETE_ATTACHES":
      return {
        ...state,
        attaches: {}
      };
    default:
      return state;
  }
};
