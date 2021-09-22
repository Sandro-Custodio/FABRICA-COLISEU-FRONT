import axios from "axios";
import { toastr } from "react-redux-toastr";

export function update_ll_element_and_address(fileName) {
  const params = {
    "Newname": fileName
  };
  return async dispatch => {
    await axios
      .post(`${process.env.REACT_APP_API_URL}/ot_ll/update_ll_element_and_address`, params)
  };
}
