import moment from "moment";

moment.locale("pt-BR");

const INITIAL_STATE = {
  loading_ambv_boq: false,
  loading_charge_mask_boq: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOADING_CHARGE_MASK_BOQ":
      return { ...state, loading_charge_mask_boq: action.payload };

    default:
      return state;
  }
};
