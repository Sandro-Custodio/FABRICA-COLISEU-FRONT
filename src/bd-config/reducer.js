const INITIAL_STATE = {
  list:[],
  columns:[
    { name: 'provedor_bd', title: 'BD CONFIG' },
    { name: 'name', title: 'NOME PROVEDOR COLISEU' }
  ],
  defaultColumnWidths:[
    { columnName: 'provedor_bd', width: 200 },
    { columnName: 'name', width: 200 }
  ],
  vendors: [],
  bd_config: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "BD_CONFIG_VENDORS_LIST_FETCHED":
      if (!action.payload) {
        return state;
      }
      return {
        ...state,
        list: action.payload
      };
    case "VENDORS_LIST_FETCHED":
      if (!action.payload) {
        return state;
      }
      return {
        ...state,
        vendors: action.payload
      };
    case "SET_BD_CONFIG":
      if (!action.payload) {
        return state;
      }
      return {
        ...state,
        bd_config: action.payload
      };
    default:
      return state;
  }
};
