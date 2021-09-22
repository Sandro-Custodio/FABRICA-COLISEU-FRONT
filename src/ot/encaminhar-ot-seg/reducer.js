const INITIAL_STATE = {
  ot_seg: {
    regional_a: "",
    regional_b: "",
    tipo_elemento_a: "",
    tipo_elemento_b: "",
    elemento_id_a: "",
    elemento_id_b: "",
    endereco_id_a: "",
    endereco_id_b: "",
    endereco_a: "",
    endereco_b: "",
    interface_a: "",
    interface_b: "",
    ot_speed: { name: "", qt_sublinks: "" },
    redundancy: "",
    solution: "",
    ot_type: "",
    observacao: "",
    order_code: "",
    order_deadline_at: ""
  },
  seg_list: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "OT_SEG_FETCHED":
      if (!action.payload.ot_seg) {
        return state;
      }
      let attributes = { ...action.payload.ot_seg.attributes };
      let virtual_attributes = { ...action.payload.ot_seg.virtual_attributes };
      return { ...state, attributes, virtual_attributes };
    case "AUXILIAR_TABLES_FETCHED":
      if (!action.payload) {
        return state;
      }
      let auxiliar_tables = { ...action.payload };
      return { ...state, auxiliar_tables };
    case "SET_MULTI_FORWARD_SEG_LIST":
      if (!action.payload) {
        return state;
      }
      return { ...state, seg_list: action.payload };
    case "SET_RESPONSE_FORWARD_SEG":
      if (!action.payload) {
        return state;
      }
      var aux = state.seg_list.map(seg => {
        if(seg.seg_id === action.payload.id){
          return {...action.payload, seg_id: action.payload.id}
        }
        return seg
      })
      return { ...state, seg_list: aux };
    default:
      return state;
  }
};
