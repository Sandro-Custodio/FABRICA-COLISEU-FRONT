import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

export const getFaturaList = pesquisaParams => {
  const params = {
    filter_fields: pesquisaParams,
    3: "DR_COF1B1",
    2: 100,
    qtd_bills: 100
  };
  return axios.post("/bills/get_all_bills_by_filter", params);
};

const getFilterList = () =>
  axios
    .post("/bills/get_operators_and_vendors")
    .then(({ data: [regional, provedor, fatura] }) => {
      regional = regional.map(r => ({
        text: r.regional,
        value: r.id
      }));
      provedor = provedor.map(r => ({
        text: r.name,
        value: r.id
      }));
      fatura = fatura.map(r => ({
        text: r.description,
        value: r.id
      }));

      return { regional, provedor, fatura };
    });

const getGrupos = (operator_id, vendor_id, rede) =>
  axios
    .post("/bills/get_groups", {
      operator_id,
      vendor_id,
      rede
    })
    .then(grupo =>
      grupo.data.map(r => ({
        text: r.name,
        value: r.id
      }))
    );
export const getFiltros = (operator_id, vendor_id, rede) =>
  Promise.all([getFilterList(), getGrupos(operator_id, vendor_id, rede)]);

const getBills = bill_id =>
  axios.post("/bills/get_all_bill_dd", { bill_id, qtd_page: 100 });

const getClassificationsVendor = (vendor_id, network) =>
  axios.post("/bill_classifications/get_all_classifications_by_vendor", {
    vendor_id,
    network
  });
export const getDetalhamentoFatura = (bill_id, vendor_id, network) =>
  Promise.all([
    getBills(bill_id),
    getClassificationsVendor(vendor_id, network)
  ]).then(res => res.map(el => el.data));
