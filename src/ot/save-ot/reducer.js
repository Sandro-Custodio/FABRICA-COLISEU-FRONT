const INITIAL_STATE = {
  dataPreLoad: {
    ot_types: [],
    areas: [],
    element_types_a: [],
    element_types_b: [],
    elements_a: [],
    elements_b: [],
    address_a: [],
    address_b: [],
    operators: [],
    ot_status: [],
    ot_segment_status: [],
    projects: [],
    sub_projects: [],
    finality: [],
    reference: [],
    speeds: [],
    ot_redundancies: [],
    frequencia: [],
    degrau: ""
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "FIELDS_OT_FORM_FETCHED":
      return {
        ...state,
        dataPreLoad: {
          ...state.dataPreLoad,
          ...action.payload,
          ot_redundancies: [
            { id: 1, name: "Com proteção", type: "selecione" },
            { id: 2, name: "Sem proteção", type: "selecione" }
          ]
        }
      };
    case "ELEMENTTYPESA_FETCHED":
      return {
        ...state,
        dataPreLoad: {
          ...state.dataPreLoad,
          element_types_a: action.payload.vw_element,
          elements_a: [],
          address_a: [],
          degrau: ""
        }
      };
    case "ELEMENTTYPESB_FETCHED":
      return {
        ...state,
        dataPreLoad: {
          ...state.dataPreLoad,
          element_types_b: action.payload.vw_element,
          elements_b: [],
          address_b: [],
          degrau: ""
        }
      };
    case "ELEMENTSA_FETCHED":
      return {
        ...state,
        dataPreLoad: {
          ...state.dataPreLoad,
          elements_a: action.payload.elemento,
          address_a: [],
          degrau: ""
        }
      };
    case "ELEMENTSB_FETCHED":
      return {
        ...state,
        dataPreLoad: {
          ...state.dataPreLoad,
          elements_b: action.payload.elemento,
          address_b: [],
          degrau: ""
        }
      };
    case "ADDRESSA_FETCHED_SETTING":
      return {
        ...state,
        dataPreLoad: {
          ...state.dataPreLoad,
          address_a: action.payload
        }
      };
    case "ADDRESSB_FETCHED_SETTING":
      return {
        ...state,
        dataPreLoad: {
          ...state.dataPreLoad,
          address_b: action.payload
        }
      };
    case "ADDRESSA_FETCHED":
      return {
        ...state,
        dataPreLoad: {
          ...state.dataPreLoad,
          // address_a: action.payload[0],
          degrau: action.payload[1]
        }
      };
    case "ADDRESSB_FETCHED":
      return {
        ...state,
        dataPreLoad: {
          ...state.dataPreLoad,
          // address_b: action.payload[0],
          degrau: action.payload[1]
        }
      };
    case "AUXILIAR_TABLES_FETCHED":
      return {
        ...state,
        dataPreLoad: {
          ...state.dataPreLoad,
          ot_types: action.payload.type,
          projects: action.payload.project,
          speeds: action.payload.speed,
          ot_redundancies: action.payload.redundancy,
          finality: action.payload.finality,
          sub_projects: action.payload.sub_project
        }
      };
    default:
      return state;
  }
};
