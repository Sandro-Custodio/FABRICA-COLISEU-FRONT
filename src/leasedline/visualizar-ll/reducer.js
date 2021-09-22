const INITIAL_STATE = {

};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LL_FETCHED":
      state = INITIAL_STATE
      if (!action.payload) {
        return state;
      }
      let resp = action.payload;

      return {
        ...state,
        resp
      };
    default:
      return state;
  }
};
