import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const validatePms = (vendor_id, segment_id) =>
  axios.post("evts/validate_pms", { vendor_id, segment_id });

const getVendorContracts = vendor_id =>
  axios.post("vendors/get_vendor_contracts", { vendor_id });

const checkContractedQuantity = (ot_segmentation_id, vendor_id, quantity) =>
  axios.post("evts/check_contracted_quantity", {
    ot_segmentation_id,
    vendor_id,
    quantity
  });

export const getProvedor = (
  vendor_id,
  segment_id,
  ot_segmentation_id,
  quantity
) => async dispatch => {
  await axios
    .all([
      validatePms(vendor_id, segment_id),
      getVendorContracts(vendor_id),
      checkContractedQuantity(ot_segmentation_id, vendor_id, quantity)
    ])
    .then(res => dispatch({ type: "SET_PROVEDOR", payload: res }))
    .catch(err => console.log(err));
};

// POST
// EvtsController#contracted_ll_quantity as AMF
// {"ot_segmentation_id": 557557}

// POST
// EvtsController#get_count_evt
// {"ot_segmentation_id": 557557}

// VendorsController#get_all_data_providers as AMF
// {"vendor_id"=>334}
