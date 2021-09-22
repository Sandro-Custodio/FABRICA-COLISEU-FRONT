import axios from "axios";
import { toastr } from "react-redux-toastr";
import { initialize } from "redux-form";
import { selectTab, showTabs } from "../common/tabs/actions";

const URL = "http://localhost:3003/api";

export function getList() {
  const request = axios.get(`${URL}/billingCycles`);
  return {
    type: "BILLING_CYCLES_FETCHED",
    payload: request
  };
}

function submit(values, method) {
  return dispatch => {
    const id = values._id ? values._id : "";
    axios[method](`${URL}/billingCycles/${id}`, values)
      .then(resp => {
        dispatch(init());
        toastr.success("Sucesso", "Operação realizada com sucesso");
      })
      .catch(e => {
        e.response.data.errors.forEach(e => toastr.error("Falha", e));
      });
  };
}

export function insert(values) {
  return submit(values, "post");
}

export function showUpdate(bc) {
  return [
    showTabs("tabUpdate"),
    selectTab("tabUpdate"),
    initialize("billingCycleForm", bc)
  ];
}

export function remove(id) {
  const values = { _id: id };
  return submit(values, "delete");
}

export function update(values) {
  return submit(values, "put");
}

export function init() {
  return [
    showTabs("tabList", "tabCreate"),
    selectTab("tabList"),
    getList(),
    initialize("billingCycleForm", { credits: [{}], debts: [{}] })
  ];
}
