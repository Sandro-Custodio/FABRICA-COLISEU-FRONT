import moment from "moment";

const INITIAL_STATE = {
  operator_list: [],
  status_fatura_list: [],
  vendor_list: [],
  group_list: [],
  list: [],
  columns: [
    {
      title: "Rede",
      name: "network"
    },
    {
      name: "regional",
      title: "Regional",
      getCellValue: row => (row.operator.regional ? row.operator.regional : "N/A")
    },
    {
      title: "Provedor",
      name: "provedor",
      getCellValue: row => (row.vendor.name ? row.vendor.name : "N/A")
    },
    {
      title: "Agrupador",
      name: "agrupador",
      getCellValue: row => (row.group.name ? row.group.name : "N/A")
    },
    {
      title: "Mês/Ano de Referência",
      name: "competence_month"
    },
    {
      title: "Número da Fatura",
      name: "bill_number"
    },
    {
      title: "Valor da Fatura",
      name: "valorFatura",
      getCellValue: row => (row.bill_total ? `R$ ${row.bill_total}` : "R$ 0")
    },
    {
      title: "Total Nota Fiscal",
      name: "totalNota",
      getCellValue: row => (" ")
    },
    {
      title: "Emissão",
      name: "emissao",
      getCellValue: row => (row.order_at ? moment(row.order_at).format("DD/MM/YYYY") : "")
    },
    {
      title: "Vencimento",
      name: "vencimento",
      getCellValue: row => (row.deadline_at ? moment(row.deadline_at).format("DD/MM/YYYY") : "")
    },
    {
      title: "Status",
      name: "status",
      getCellValue: row => (row.status.description ? row.status.description : "")
    },
    {
      title: "DD Prévio",
      name: "ddPrevio",
      getCellValue: row => (row.dd_previo ? "SIM" : "NÃO")
    }
  ],
  defaultColumnWidths:[
    { columnName: 'network', width: 100 },
    { columnName: 'regional', width: 100 },
    { columnName: 'provedor', width: 120 },
    { columnName: 'agrupador', width: 120 },
    { columnName: 'competence_month', width: 150 },
    { columnName: 'bill_number', width: 150 },
    { columnName: 'valorFatura', width: 150 },
    { columnName: 'totalNota', width: 150 },
    { columnName: 'emissao', width: 100 },
    { columnName: 'vencimento', width: 120 },
    { columnName: 'status', width: 100 },
    { columnName: 'ddPrevio', width: 100 }
  ],
  columns3: [
    {
      title: "Classificação",
      name: "bill_dd_classification_list"
    },
    {
      title: "Grupo",
      name: "class_group"
    },
    {
      title: "Circuito",
      name: "circuito_id_a"
    },
    {
      title: "Descrição",
      name: "invoice_description"
    },
    {
      title: "Serviço",
      name: "bill_dd_service_id"
    },
    {
      title: "Sequencial",
      name: "invoice_sequence"
    },
    {
      title: "Valor com Impostos",
      name: "value_taxes"
    },
    {
      title: "Elemento A",
      name: "bill_dd_element_id_a"
    },
    {
      title: "Elemento B",
      name: "bill_dd_element_id_b"
    },
    {
      title: "Aliquota",
      name: "aliquot"
    },
    {
      title: "Valor ICMS",
      name: "value_icms"
    }
  ],
  classification_list: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_BILL_LIST_FILTERS":
      if (!action.payload) {
        return state;
      }
      return {
        ...state,
        operator_list: action.payload[0],
        vendor_list: action.payload[1],
        status_fatura_list: action.payload[2],
      };
    case "GROUPS_FETCHED":
      if (!action.payload) {
        return state;
      }
      return {
        ...state,
        group_list: action.payload
      };
    case "SET_BILL_LIST":
      if (!action.payload) {
        return state;
      }
      return {
        ...state,
        list: action.payload[0]
      };
    case "SET_BILL_DD_WITH_CLASSIFICATIONS":
      if (!action.payload) {
        return state;
      }
      return {
        ...state,
        classification_list: action.payload[0]
      };
    default:
      return state;
  }
};
