import axios from "axios";

const getOperatorsAndVendors = () =>
  axios
    .post("/bills/get_operators_and_vendors")
    .then(({ data: [regional, provedor] }) => {
      regional = regional.map(r => ({
        text: r.regional,
        value: r.id
      }));
      provedor = provedor.map(r => ({
        text: r.name,
        value: r.id
      }));
      return { regional, provedor };
    });

const getGrupos = (operator_id, vendor_id) =>
  axios
    .post("/bills/get_groups", {
      operator_id,
      vendor_id
    })
    .then(grupo => {
      grupo = grupo.data.map(r => ({
        text: r.name,
        value: r.id
      }));
      return grupo;
    });

export const getSelectOptions = (operator_id, vendor_id) =>
  Promise.all([getOperatorsAndVendors(), getGrupos(operator_id, vendor_id)]);

export const getAgrupadorByCode = pesquisaParams => {
  const params = {
    filter_fields: pesquisaParams,
    3: "DR_COF1D1",
    page_group: 1,
    qtd_group: 100
  };
  return axios.post("bills/get_all_groups_by_filter", params);
};

export const salvarNovoAgrupador = paramsAgrupador => {
  const params = {
    novoAgrupador: paramsAgrupador
  };

  return axios.post("bills/save_group", params);
};
export const salvarAtivdesativAgrupador = paramsAgrupador => {
  const params = {
    AtivDesativ: paramsAgrupador
  };
  return axios.post("bills/update_group_status", params);
};
export const getHistoricoAgrupador = paramsAgrupador => {
  const params = {
    group_id: paramsAgrupador
  };
  return axios.post("bills/get_group_history", params);
};
export const removeHistoricoAgrupador = paramsAgrupador => {
  return axios.post("bills/remove_status", paramsAgrupador);
};
