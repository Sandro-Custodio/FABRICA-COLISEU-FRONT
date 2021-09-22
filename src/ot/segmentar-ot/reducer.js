const INITIAL_STATE = {
  seg: {},
  optionsData: {},
  regionalData: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_SEGMENTAR_DATA":
      if (!action.payload) {
        return state;
      }
      return {
        ...state,
        seg: action.payload[0],
        optionsData: action.payload[1],
        regionalData: action.payload[2]
      };
    default:
      return state;
  }
};
