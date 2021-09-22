import axios from "axios";
import get from "lodash/get";
import moment from "moment";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

export function getEvtList(pesquisaParams, limit = 100, page = 1) {
  const params = {
    o: pesquisaParams,
    limit,
    page
  };

  return dispatch => {
    dispatch([{ type: "SHOW_OVERLAY" }]);
    axios
      .post("/evts/get_all_evts_by_filter", params)
      .then(res => {
        let maxPagesQtd = res.data[1];

        if (maxPagesQtd % 1 !== 0) {
          maxPagesQtd = Math.ceil(maxPagesQtd);
        }

        const rows = res.data[0].map(r => ({
          ots: r.ot_code,
          enderecoA: r.ot.address_a_id,
          interfaceA: r.ot.element_a_interface,
          enderecoB: r.ot.address_b_id,
          interfaceB: r.ot.element_b_interface,
          situacao: r.description,
          evt: r.request_protocol,
          provedor: r.vendor_name,
          pms: r.pms_id !== null ? "Sim" : "Não",
          mes: `R$ ${get(r, "monthly_cost", 0)}`,
          inst: `R$ ${get(r, "installation_cost", 0)}`,
          proj: `R$ ${get(r, "project_cost", 0)}`,
          qtd: r.quantity,
          pzConst: r.contract_time,
          pzAtiv: r.activation_time,
          pzResp: r.deadline_at
            ? moment(r.deadline_at).format("DD/MM/YYYY")
            : "",
          status: r.status_name
        }));

        const rows_view = res.data[0].map(r => ({
          evt_id: r.id,
          ot_segmentation_id: r.ot_segmentation.id,
          vendor_id: r.vendor_id,
          qtd_links: r.ot_segmentation?.qtd_links
        }));

        dispatch([
          {
            type: "SET_ROWS",
            payload: rows
          },
          { type: "CHANGE_EVT_MAX_PAGE_QTD", payload: maxPagesQtd },
          {
            type: "SET_QUANTIDADE_TOTAL_REGISTROS",
            payload: res.data[2]
          },
          { type: "SET_ROWS_VIEW", payload: rows_view }
        ]);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        dispatch([{ type: "HIDE_OVERLAY" }]);
      });
  };
}

export function getFilterList() {
  return axios.post("/evts/get_filter_list");
}

const getVendorIndices = () => axios.get("/evts/get_vendor_indices");

const getPedidoAccord = (evt_id, ot_segmentation_id) =>
  axios.post("/evts/get_ot_data_pedido_accord", {
    evt_id,
    ot_segmentation_id
  });

const getContratoEvt = vendor_id =>
  axios.post("/evts/get_contracts_evt_pms", {
    vendor_id
  });

export const getVisualizar = (evt_id, ot_segmentation_id, vendor_id) =>
  Promise.all([
    getVendorIndices(),
    getPedidoAccord(evt_id, ot_segmentation_id),
    getContratoEvt(vendor_id)
  ]).then(res => res.map(el => el.data));

export const show_overlay = () => dispatch =>
  dispatch({ type: "SHOW_OVERLAY" });

export const hide_overlay = () => dispatch =>
  dispatch({ type: "HIDE_OVERLAY" });
