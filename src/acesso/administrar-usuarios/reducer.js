const INITIAL_STATE = {
  usuario_list: [],
  paginator: { currentPage: 1, pageSize: 100 },
  maxPagesQtd: 1,
  columns: [
    { title: "Login", name: "login" },
    { title: "Usuário", name: "name" },
    { title: "E-mail", name: "email" },
    { title: "Perfil", name: "role_name" },
    { title: "Status", name: "status" },
    { title: " ", name: "actions" }
  ],
  perfil_list: [],
  new_area_id: null,
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  const { paginator } = state;
  switch (action.type) {
    case "COMBOS_CODSOX_FETCHED":
      if (!action.payload) {
        return state;
      }
      return {
        ...state,
        perfil_list: action.payload.map(r => ({
          codSox: r.sox_code,
          area_id: r.area_id,
          role_id: r.id
        }))
      };
    case "USUARIO_FETCHED":
      return { ...state, usuario_list: action.payload[0], paginator };
    case "SET_AREAID_EDITUSER":
      return { ...state, new_area_id: action.payload };
    case "SHOW_OVERLAY_ACESSO":
      return { ...state, loading: true };
    case "HIDE_OVERLAY_ACESSO":
      return { ...state, loading: false };
    case "CHANGE_USERS_PAGINATOR":
      return { ...state, paginator: action.payload };
    case "CHANGE_USERS_MAX_PAGE_QTD":
      return { ...state, maxPagesQtd: action.payload };
    case "RESET_ACESSO_REDUCER":
      return INITIAL_STATE
    default:
      return state;
  }
};
