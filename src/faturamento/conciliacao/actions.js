import axios from "axios";
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

export const getMonths = () => axios.post(`${process.env.REACT_APP_API_URL}/bills/get_months`);

export const getOperatorsAndVendors = () =>
  axios.post(`${process.env.REACT_APP_API_URL}/bills/get_operators_and_vendors`);

export const getGroups = () =>
  axios.post(`${process.env.REACT_APP_API_URL}/bills/get_groups`, {
    operator_id: 1000000000.0,
    vendor_id: 1000000000.0,
    rede: ""
  });

export const selectGroups = (operator, vendor, rede) => {
  let operator_id = 1000000000;
  let vendor_id = 1000000000;

  if (operator !== null && vendor !== null) {
    operator_id = operator;
    vendor_id = vendor;
  } else if (operator !== null && vendor === null) {
    operator_id = operator;
  } else if (operator === null && vendor !== null) {
    vendor_id = vendor;
  }
  return axios.post(`${process.env.REACT_APP_API_URL}/bills/get_groups`, { operator_id, vendor_id, rede });
};

export const getAllGroupsForConciliate = group => {

  if ((group.month_begin) && group.month_begin.length === 10 ){
    group.month_begin = group.month_begin.slice(3, 10)
  }
  if ((group.month_end) && group.month_end.length === 10 ) {
    group.month_end = group.month_end.slice(3, 10)
  }

  return axios.post(`${process.env.REACT_APP_API_URL}/bill_conciliates/get_all_groups_for_conciliate`, {
    group,
    code_action: "DR_COF1F1"
  });
}

export const getAllByBillId = (bill_id, user_id) =>
  axios.post(`${process.env.REACT_APP_API_URL}/bill_conciliates/get_all_by_bill_id`, { bill_id, user_id });

export const finalBills = bills =>
  axios.post(`${process.env.REACT_APP_API_URL}/bill_conciliates/final_bills`, { bills });

export const aprovBills = bills =>
  axios.post(`${process.env.REACT_APP_API_URL}/bill_conciliates/aprov_bills`, { bills });

export const saveConciliate = (conciliates, type) =>
  axios.post(`${process.env.REACT_APP_API_URL}/bill_conciliates/save_conciliate`, { conciliates, type });
