import { reducer } from "redux-form";

export default reducer.plugin({
  OTForm: (state = {}, action) => {
    switch (action.type) {
      case "ADDRESSA_FETCHED":
        return {
          ...state,
          values: {
            ...state.values,
            ot_degrau: action.payload[1]
          },
          fields: {
            ...state.fields,
            ot_degrau: action.payload[1]
          }
        };
      case "ADDRESSB_FETCHED":
        return {
          ...state,
          values: {
            ...state.values,
            ot_degrau: action.payload[1]
          },
          fields: {
            ...state.fields,
            ot_degrau: action.payload[1]
          }
        };
      default:
        return state;
    }
  }
});
