const INITIAL_STATE = {
  rules_list:[],
  rules_columns:[
    { name: 'class_group', title: 'Grupo' },
    {
      name: "classification",
      title: "Classificação",
      getCellValue: row => (row.bill_dd_classification.name ? row.bill_dd_classification.name : "N/A")
    },
    { name: 'logical_view', title: 'Condição' }
  ],
  defaultColumnWidths:[
    { columnName: 'class_group', width: 350 },
    { columnName: 'classification', width: 350 },
    { columnName: 'logical_view', width: 500 },
  ],
  vendor_list: [],
  operator_list: [],
  groups: [],
  billDdColumns: [],
  billDdSqlOperations: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "RULES_OPERATORS_AND_VENDOR_LIST_FETCHED":
      if (!action.payload) {
        return state;
      }
      return {
        ...state,
        vendor_list: action.payload[1]
      };
    case "RULES_CLASS_GROUPS_FETCHED":
      if (!action.payload) {
        return state;
      }
      return {
        ...state,
        groups: action.payload
      };
    case "CLASSIFICATION_RULES_LIST_FETCHED":
      if (!action.payload) {
        return state;
      }
      return {
        ...state,
        rules_list: action.payload[0],
        billDdColumns: action.payload[1],
        billDdSqlOperations: action.payload[2],
      };
    default:
      return state;
  }
};
