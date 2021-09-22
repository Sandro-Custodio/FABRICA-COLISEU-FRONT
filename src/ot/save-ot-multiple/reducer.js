const INITIAL_STATE = {
  ots: [],
  criticas: [],
  loading: false,
  file_critica: "",
  file_created: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "MULTIPLEOT_SET_CRITICAS":
      return {
        ...state,
        criticas: action.payload
      };

    case "MULTIPLEOT_SET_OTS":
      return {
        ...state,
        ots: action.payload
      };

    case "MULTIPLEOT_SET_LOADING":
      return {
        ...state,
        loading: action.payload
      };

    case "MULTIPLEOT_SET_FILE_CRITICA":
      return {
        ...state,
        file_critica: action.payload
      };

    case "MULTIPLEOT_SET_FILE_CREATED":
      return {
        ...state,
        file_created: action.payload
      };

    case "MULTIPLEOT_CLEAR":
      return INITIAL_STATE;
    default:
      return state;
  }
};
