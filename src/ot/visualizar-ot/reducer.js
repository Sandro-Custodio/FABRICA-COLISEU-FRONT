const INITIAL_STATE = {
  ot: {
    address_a_id: "",
    address_b_id: "",
    sub_project: "",
    element_b_id: "",
    element_a_id: "",
    period: "",
    element_type_a: "",
    element_type_b: "",
    operator_a: "",
    operator_b: "",
    rede: "",
    interface_a: "",
    interface_b: "",
    degrau: "",
    banda: "",
    inc_trx: "",
    trx: "",
    frequencia: "",
    qtd_links: "",
    redundancy_name: "",
    solution: "",
    regional: "",
    status_name: "",
    created_at: "",
    data_solicitacao: "",
    ended_at: "",
    finality: "",
    project: "",
    referencia: "",
    duration: "",
    project_itx: "",
    observacao: "",
    endereco_a: "",
    city_a: "",
    uf_a: "",
    endereco_b: "",
    city_b: "",
    uf_b: ""
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "OT_FETCHED":
      state = INITIAL_STATE
      if (!action.payload) {
        return state;
      }
      let virtual_attributes = action.payload.ot.virtual_attributes
      let attributes = action.payload.ot.attributes

      return {
        ...state,
        virtual_attributes,
        attributes
      };
    default:
      return state;
  }
};
