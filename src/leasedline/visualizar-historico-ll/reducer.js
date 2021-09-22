import Moment from "moment";

const INITIAL_STATE = {
  ll_hist_list: [],
  columns: [
    { name: "id", title: "ID" },
    { name: "ot_code", title: "Código" },
    { name: "lpu_guid", title: "LPU Guid" },
    { name: "vendor_name", title: "Provedor" },
    { name: "agrupador", title: "Agrupador" },
    { name: "status_description", title: "Status" },
    {
      name: "data_ativacao",
      title: "Ativada em:",
      getCellValue: row =>
        row.data_ativacao
          ? `${Moment(row.data_ativacao).format("DD/MM/YYYY")}`
          : ``
    },
    {
      name: "created_at",
      title: "Data Alteração",
      getCellValue: row =>
        row.created_at ? `${Moment(row.created_at).format("DD/MM/YYYY")}` : ``
    },
    { name: "ref_vigencia_end_at", title: "Término" },
    { name: "contract_contrato", title: "Contrato" },
    { name: "vigencia", title: "Vigência" },
    { name: "tipo_reajuste", title: "Tipo Reajuste" },
    { name: "taxa_ins_s_imp", title: "Taxa de Instalação (s/imp)" },
    { name: "val_link_s_imp", title: "Valor Mensal (s/imp)" },
    { name: "circuito_id", title: "Circuito" },
    { name: "degrau", title: "Degrau" },
    { name: "usuario_alteracao", title: "Usuário Alteração" }
  ],
  grouping_column_name: "id"
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LL_HIST_FETCHED":
      state = INITIAL_STATE;
      if (!action.payload) {
        return state;
      }
      let ll_hist_list = action.payload;

      return {
        ...state,
        ll_hist_list
      };
    default:
      return state;
  }
};
