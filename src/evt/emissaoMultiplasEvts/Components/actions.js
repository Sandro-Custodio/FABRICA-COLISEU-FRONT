import axios from "axios";

export const getVendorLpus = () => axios.get("radar/get_vendor_lpus");

export const get_contracts_by_vendor_id = vendor_id =>
  axios.post("contracts/get_contracts_by_vendor", { vendor_id });

export const show_overlay = () => dispatch => {
  dispatch([{ type: "SHOW_OVERLAY" }]);
};

export const hide_overlay = () => dispatch => {
  dispatch([{ type: "HIDE_OVERLAY" }]);
};
