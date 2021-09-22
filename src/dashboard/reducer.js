const INITIAL_STATE = {
  project: {},
  dataTable: [],
  dataAuxTable: [],
  yearChoosed: "Selecione",
  titleCurrent:"",
  projects:[],
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case "PROJECT_CHOOSED":
      return { ...state, project: action.payload };
    case "SET_PROJECTS":
      const todosProjetos = action.payload.map((el)=>({name: el.projeto}))
      return { ...state, projects: todosProjetos };
    case "CURRENT_YEAR":
      return { ...state, yearChoosed: action.payload };
    case "CURRENT_SCREEN":
      return { ...state, titleCurrent: action.payload };
    case "DATA_TABLE":
      return { ...state, dataTable: action.payload };
      case "CLEAR_DATA_TABLE":
      return { ...state, dataTable: [], dataAuxTable: [] };
    case "DATA_AUX_TABLE":
      return { ...state, dataAuxTable: action.payload };
    default:
      return state;
  }
}
