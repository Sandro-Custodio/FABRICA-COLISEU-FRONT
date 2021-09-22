// import mapKeys from "lodash/mapKeys";

const INITIAL_STATE = {
  rows: [],
  selection: [],
  loading_criar_base: false,
  loading_edit_base: false,
  total: 0,
  page: 0,
  selected_rows: [],
  loading_filter: false,
  filtro: {
    chave: "",
    status_single_chave: "",
    epm: "",
    carimbo_projetos: "",
    end_id_ponta_a: "",
    end_id_ponta_b: "",
    ponta_a: "",
    ponta_b: "",
    regional: "",
    dt_inicio_atualizacao: "",
    dt_fim_atualizacao: "",
    vendor_execucao: "",
    saldo_lo: ""
  },
  openPopup: true
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "LISTAR_BASEGERENCIAL_SET_LOADING":
      return { ...state, loading: action.payload };

    case "LISTAR_BASEGERENCIAL_SET_TABLE":
      return {
        ...state,
        rows: action.payload,
        page: action.page,
        total: action.total
      };

    case "LISTAR_BASEGERENCIAL_SET_SELECTION":
      return {
        ...state,
        selection: action.payload,
        selected_rows: state.rows.filter((_, idx) =>
          action.payload.includes(idx)
        )
      };

    case "RESETA_TABELA_BASEGERENCIAL":
      return { ...state, rows: [], selection: [], selected_rows: [] };

    case "POPUP_CRIAR_BASEGERENCIAL_SET_LOADING":
      return { ...state, loading_criar_base: action.payload };

    case "POPUP_EDIT_BASEGERENCIAL_SET_LOADING":
      return { ...state, loading_edit_base: action.payload };

    default:
      return state;
  }
}
