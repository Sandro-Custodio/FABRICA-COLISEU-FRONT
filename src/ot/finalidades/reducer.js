const INITIAL_STATE = {
  list:[],
  columns:[
    { name: 'finalidade', title: 'FINALIDADE' },
    { name: 'blank_column', title: ' ' },
    { name: 'tipo_elemento_a', title: 'TIPO ELEMENTO A' },
    { name: 'tipo_elemento_b', title: 'TIPO ELEMENTO B' }
  ],
  defaultColumnWidths:[
    { columnName: 'finalidade', width: 200 },
    { columnName: 'blank_column', width: 210 },
    { columnName: 'tipo_elemento_a', width: 220 },
    { columnName: 'tipo_elemento_b', width: 220 }
  ],
  groupingColumns: [{ columnName: 'finalidade' }],
  finalities: [],
  element_types: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "FINALITY_ELEMENTS_LIST_FETCHED":
      if (!action.payload) {
        return state;
      }
      return {
        ...state,
        list: action.payload
      };
    case "FINALITIES_AND_ELEMENT_TYPES_FETCHED":
      if (!action.payload) {
        return state;
      }
      return {
        ...state,
        finalities: action.payload?.finalities,
        element_types: action.payload?.element_types
      };
    default:
      return state;
  }
};
