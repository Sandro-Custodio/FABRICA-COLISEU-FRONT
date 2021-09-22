const INITIAL_STATE = {
  list: [],
  columns: [
    { name: "competence_month", title: "Mês Referência" },
    {
      name: "vendor",
      title: "Provedor",
      getCellValue: row => (row.vendor.name ? row.vendor.name : "N/A")
    },
    {
      name: "operator",
      title: "Regional",
      getCellValue: row =>
        row.operator.regional ? row.operator.regional : "N/A"
    },
    {
      name: "group",
      title: "Agrupador",
      getCellValue: row => (row.group.name ? row.group.name : "N/A")
    },
    { name: "bill_dd_circuits", title: "Qtd. Circuitos" },
    { name: "bill_total", title: "Valor Fatura" },
    { name: "bill_cost_dd", title: "Valor DD" }
  ],
  defaultColumnWidths: [
    { columnName: "bill_dd_circuits", width: 200 },
    { columnName: "bill_total", width: 200 },
    { columnName: "bill_cost_dd", width: 200 }
  ],
  vendor_list: [],
  operators: [],
  status: [],
  status_for_conciliation: [],
  groups: [],
  circuits: [],
  edit_circuit: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "OPERATORS_AND_VENDOR_LIST_FETCHED":
      if (!action.payload) {
        return state;
      }
      let pseudo_provedores = [
        { name: "TELEFONICA FBB", id: 25, febrabran: true },
        { name: "TELEFONICA IP", id: 25, ip: true },
        { name: "CTBC ALGAR", id: 10, algar: true },
        { name: "OI SUPERFAST", id: 182 }
      ];
      return {
        ...state,
        operators: action.payload[0],
        vendor_list: pseudo_provedores
          .concat(action.payload[1])
          .sort((a, b) => (a.name > b.name ? 1 : -1))
      };
    case "GROUPS_FETCHED":
      if (!action.payload) {
        return state;
      }
      return {
        ...state,
        groups: action.payload
      };
    case "BILL_DDS_SAVED":
      if (!action.payload) {
        return state;
      }
      return {
        ...state,
        list: action.payload[0]
      };
    case "BILL_DDS_REMOVED":
      if (!action.payload) {
        return state;
      }
      return {
        ...state,
        list: []
      };
    case "SET_CIRCUITS":
      if (!action.payload) {
        return state;
      }
      return {
        ...state,
        circuits: action.payload
      };
    
      case "DELETE_CIRCUIT": 
      if (!action.payload) {
        return state;
      }
      return {
        ...state,
        circuits: [ state.circuits[0].filter(circuit => circuit !== action.payload), state.circuits[1]]
      };
    case "ADD_CIRCUIT":
      let circuits_aux = [...state.circuits];
      circuits_aux[0].push(action.payload);
      return { ...state, circuits: circuits_aux };
    case "IMPORT_SET_EDIT_CIRCUIT":
      if (!action.payload) {
        return state;
      }
      return {
        ...state,
        edit_circuit: action.payload
      };
    default:
      return state;
  }
};
