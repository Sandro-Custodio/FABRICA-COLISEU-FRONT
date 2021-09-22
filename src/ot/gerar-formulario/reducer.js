import Moment from "moment";

const INITIAL_STATE = {
  rows: [],
  remarks: [],
  seg_id: "",
  field: "",
  message: false,
  download_link: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_FILTERED_SEGMENTS":
      if (!action.payload) {
        return state;
      }
      return {
        ...state,
        rows: action.payload,
        message: false,
        download_link: false
      };
    case "SET_REMARKS_PARAMS":
      if (!action.payload) {
        return state;
      }
      return {
        ...state,
        field: action.payload[0],
        remarks: action.payload[1],
        seg_id: action.payload[2],
        message: false,
        download_link: false
      };
    case "SET_GENERATE_FORM_RESPONSE":
      if (!action.payload) {
        return state;
      }
      var message = false;
      var download_link = false;
      if(action.payload[0]?.done)
        message = "done"
      if(action.payload[0]?.fault)
        message = "fault"
      if(action.payload[0]?.download_form)
        download_link = action.payload[0]?.download_form
      return {
        ...state,
        message: message,
        download_link: download_link
      };
    case "SET_GENERATE_REPORT_RESPONSE":
      if (!action.payload) {
        return state;
      }
      var message = false;
      var download_link = false;
      if(action.payload[1][0]?.done)
        message = "done"
      if(action.payload[1][0]?.fault)
        message = "fault"
      if(action.payload[0])
        download_link = action.payload[0]
      return {
        ...state,
        message: message,
        download_link: download_link
      };
    default:
      return state;
  }
};
