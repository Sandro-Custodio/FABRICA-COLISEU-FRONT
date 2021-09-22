const initial_state = {
  columns: [
    { name: "provedor", title: "Provedor" },
    { name: "regional", title: "Regional" },
    { name: "agrupador", title: "Agrupador" },
    { name: "mes_ref", title: "Mês de Referência" },
    { name: "pro_rata_ativacao", title: "Pró-rata Ativ." },
    { name: "pro_rata_desativacao", title: "Pró-rata Des." },
    { name: "valor_mensalidade", title: "Mensalidade" },
    { name: "taxa_ativacao", title: "Taxa Ativação" },
    { name: "total_previsto", title: "Total Previsto" }
  ],
  rows: [],
  circuitos: {
    columns: [
      { name: "agrupador", title: "Agrupador" },
      { name: "regional", title: "Regional" },
      { name: "provedor", title: "Provedor" },
      { name: "mes_cobranca", title: "Mês de Referência" },
      { name: "circuito_id", title: "Circuito" },
      { name: "valor_mensalidade", title: "Mensalidade" },
      { name: "pro_rata_desativacao", title: "Pró-Rata Des." },
      { name: "pro_rata_ativacao", title: "Pró-Rata Ativ." },
      { name: "taxa_ativacao", title: "Taxa Ativ." }
    ],
    rows: []
  }
};

export default (state = initial_state, action) => {
  // console.log(action.payload)
  switch (action.type) {
    case "GET_BILL_PREVISION": {
      return { ...state, rows: action.payload };
    }

    case "GET_CIRCUIT_SUM": {
      return {
        ...state,
        circuitos: { rows: action.payload, columns: state.circuitos.columns }
      };
    }

    case "CLEAR_CIRCUITS": {
      return {
        ...state,
        circuitos: { rows: [], columns: state.circuitos.columns }
      };
    }

    default:
      return state;
  }
};
