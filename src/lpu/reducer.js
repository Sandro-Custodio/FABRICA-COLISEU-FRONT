import Moment from "moment";

const INITIAL_STATE = {
  list: [],
  lpu_items: [],
  columns: [
    {
      name: "lpu_code",
      title: "LPU Code",
      getCellValue: row => (row.lpu.lpu_code ? row.lpu.lpu_code : "-")
    },
    { name: "lpu_guid", title: "LPU Guid" },
    {
      name: "degrau",
      title: "Degrau",
      getCellValue: row =>
        row.vendor_degrau.descricao ? row.vendor_degrau.descricao : "-"
    },
    {
      name: "status",
      title: "Status",
      getCellValue: row => (row.lpu.status ? row.lpu.status : "-")
    },
    {
      name: "lpu_begin_at",
      title: "LPU Começo",

      getCellValue: row =>
        row.lpu.lpu_begin_at
          ? `${Moment(row.lpu.lpu_begin_at).format("DD/MM/YYYY")}`
          : ``
    },
    {
      name: "lpu_end_at",
      title: "LPU Fim",
      getCellValue: row =>
        row.lpu.lpu_end_at
          ? `${Moment(row.lpu.lpu_end_at).format("DD/MM/YYYY")}`
          : ``
    },
    {
      name: "mens_s_imp",
      title: "Mensalidade sem impostos",
      getCellValue: row => (row.mens_s_imp ? "R$ " + row.mens_s_imp : "")
    },
    {
      name: "inst_s_imp",
      title: "Taxa Instalação sem impostos",
      getCellValue: row => (row.inst_s_imp ? "R$ " + row.inst_s_imp : "")
    }
  ],
  defaultColumnWidths: [
    { columnName: "lpu_code", width: 140 },
    { columnName: "lpu_guid", width: 120 },
    { columnName: "lpu_begin_at", width: 110 },
    { columnName: "lpu_end_at", width: 110 },
    { columnName: "status", width: 120 },
    { columnName: "degrau", width: 90 },
    { columnName: "mens_s_imp", width: 200 },
    { columnName: "inst_s_imp", width: 210 }
  ],
  types: [],
  vendors: [],
  indice_reajuste: [],
  tecnologias_incluidas: [],
  detentora: [],
  degrau_list: [],
  lpu_contracts: [],
  create_columns: [
    {
      name: "degrau",
      title: "Degrau",
      getCellValue: row => row.degrau.descricao
    },
    {
      name: "speed",
      title: "Velocidade",
      getCellValue: row => row.speed || "-"
    },
    { name: "speed_unity", title: "Unidade" },
    { name: "speed_symbol", title: "Simbolo" },
    { name: "vendor_prazo", title: "Prazo Contratação" },
    {
      name: "mens_s_imp",
      title: "Valor sem impostos",
      getCellValue: row => row.mens_s_imp || "-"
    },
    {
      name: "inst_s_imp",
      title: "Taxa Instalação sem impostos",
      getCellValue: row => row.inst_s_imp || "-"
    }
  ],
  defaultCreateColumnsWidths: [
    { columnName: "degrau", width: 120 },
    { columnName: "speed", width: 120 },
    { columnName: "speed_unity", width: 120 },
    { columnName: "speed_symbol", width: 120 },
    { columnName: "vendor_prazo", width: 180 },
    { columnName: "mens_s_imp", width: 200 },
    { columnName: "inst_s_imp", width: 220 }
  ]
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "COMBOS_LPU_FETCHED":
      if (!action.payload) {
        return state;
      }
      return {
        ...state,
        types: action.payload[0],
        vendors: action.payload[1],
        indice_reajuste: action.payload[2],
        tecnologias_incluidas: action.payload[3],
        detentora: action.payload[4]
      };
    case "LPUS_FETCHED":
      if (!action.payload) {
        return state;
      }
      return {
        ...state,
        list: action.payload
      };
    case "DEGRAU_LIST_FETCHED":
      if (!action.payload) {
        return state;
      }
      return {
        ...state,
        degrau_list: action.payload
      };
    case "SET_LPU_ITEMS":
      if (!action.payload) {
        return state;
      }
      return {
        ...state,
        lpu_items:
          action.payload.length == 0
            ? []
            : state.lpu_items.concat(action.payload)
      };
    case "LPUS_CONTRACTS_FETCHED":
      if (!action.payload) {
        return state;
      }
      return {
        ...state,
        lpu_contracts: action.payload
      };
    default:
      return state;
  }
};
