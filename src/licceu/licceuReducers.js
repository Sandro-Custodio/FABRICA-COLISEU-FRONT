const INITIAL_STATE = { payload: false };

export default (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case "LICCEU_LOGIN":
      return { payload: action.payload };
    default:
      return state;
  }
}
