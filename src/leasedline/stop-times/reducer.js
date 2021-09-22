const INITIAL_STATE = {
  list:[],
  columns:[
    { name: 'data_inicio', title: 'Data Inicio',
      getCellValue: row => row.data_inicio ?
        new Date(row.data_inicio).toLocaleDateString('pt-BR',
          {year: 'numeric', month: 'numeric', day: 'numeric'}) : ""
    },
    { name: 'data_fim', title: 'Data Fim',
      getCellValue: row => row.data_fim ?
        new Date(row.data_fim).toLocaleDateString('pt-BR',
          {year: 'numeric', month: 'numeric', day: 'numeric'}) : ""
    },
    {
      name: 'tempo_interrupcao',
      title: 'Tempo Interrupção (dias)',
      getCellValue: row => ((row.data_inicio && row.data_fim) ? getDaysBetweenDates(row.data_inicio,row.data_fim) : "")
    },
    { name: 'motivo', title: 'Motivo' },
    { name: 'observacao', title: 'Observação' }
  ],
  defaultColumnWidths:[
    { columnName: 'data_inicio', width: 100 },
    { columnName: 'data_fim', width: 100 },
    { columnName: 'tempo_interrupcao', width: 190 },
    { columnName: 'motivo', width: 400 },
    { columnName: 'observacao', width: 400 },
  ]
};

const getDaysBetweenDates = (date_start, date_end) => {
  var diff =  Math.floor(( Date.parse(date_end) - Date.parse(date_start) ) / 86400000);
  if (diff){
    if(diff <= 0)
      return 0
    else
      return diff
  }else
    return undefined
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "STOP_TIMES_LIST_FETCHED":
      if (!action.payload) {
        return state;
      }
      return {
        ...state,
        list: action.payload
      };
    default:
      return state;
  }
};
