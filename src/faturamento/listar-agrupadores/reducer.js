const INITIAL_STATE = {
  operators: [],
  vendors: [],
  groups: [],
  list: [],
  columns: [
    {
      title: "Rede",
      name: "network"
    },
    {
      title: "Agrupador",
      name: "name"
    },
    {
      title: "Regional",
      name: "operator",
      getCellValue: row => (row.operator.regional ? row.operator.regional : "")
    },
    {
      title: "Provedor",
      name: "provedor",
      getCellValue: row => (row.vendor.name ? row.vendor.name : "")
    },
    {
      title: "Status",
      name: "status",
      getCellValue: row => (row.status.description ? row.status.description : "")
    },
    {
      title: "Início Medição",
      name: "month_begin"
    },
    {
      title: "Fim Medição",
      name: "month_end"
    },
    {
      title: "Competência",
      name: "competence"
    },
    {
      title: "Data Emissão",
      name: "available_dd"
    },
    {
      title: "Data Vencimento",
      name: "deadline_at"
    },
    {
      title: "Data de Corte",
      name: "date_curt"
    },
    {
      title: " ",
      name: "tableAction"
    }
  ],
  columnsWidth: [
    {
      width: 120,
      columnName: "network"
    },
    {
      width: 130,
      columnName: "name"
    },
    {
      width: 120,
      columnName: "operator"
    },
    {
      width: 120,
      columnName: "provedor"
    },
    {
      width: 120,
      columnName: "status"
    },
    {
      width: 140,
      columnName: "month_begin"
    },
    {
      width: 140,
      columnName: "month_end"
    },
    {
      width: 140,
      columnName: "competence"
    },
    {
      width: 140,
      columnName: "available_dd"
    },
    {
      width: 170,
      columnName: "deadline_at"
    },
    {
      width: 140,
      columnName: "date_curt"
    },
    {
      width: 1,
      columnName: "tableAction"
    }
  ],
  historico_columns: [
    {title: "Status", name: "status",
      getCellValue: row => (row.status.description ? row.status.description : "")},
    {title: "Início", name: "month_ini"},
    {title: "Fim", name: "month_end"},
    {title: "Observação", name: "remarks"},
    {title: " ", name: "tableAction"}
  ],
  historico_column_width: [
    {width: 100 , columnName: "status"},
    {width: 100 , columnName: "month_ini"},
    {width: 100 , columnName: "month_end"},
    {width: 250 , columnName: "remarks"},
    {width: 100 , columnName: "tableAction"}
  ],
  historico_list: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "OPERATORS_AND_VENDORS_FETCHED":
      if (!action.payload) {
        return state;
      }
      return {
        ...state,
        operators: action.payload[0],
        vendors: action.payload[1]
      };
    case "GROUPS_FETCHED":
      if (!action.payload) {
        return state;
      }
      return {
        ...state,
        groups: action.payload
      };
    case "GROUP_LIST_FETCHED":
      if (!action.payload) {
        return state;
      }
      return {
        ...state,
        list: action.payload[0]
      };
    case "GROUP_HISTORY_FETCHED":
      if (!action.payload) {
        return state;
      }
      return {
        ...state,
        historico_list: action.payload
      };
    default:
      return state;
  }
};
