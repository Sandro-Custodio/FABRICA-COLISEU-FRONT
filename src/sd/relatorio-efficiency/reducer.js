const INITIAL_STATE = {
  rows: [],
  tableColumns: [
    { name: "projeto", title: "Projetos" },
    { name: "ll", title: "LLS" },
    { name: "valor", title: "Valor" },
    { name: "sd_aberto_ll", title: "SD Abertas" },
    { name: "sd_aberto_ll_valor", title: "Valor SD" },
    { name: "sla_dia_ll", title: "Qtd" },
    { name: "sla_dia_valor", title: "R$" },
    { name: "passivel_envio_ll", title: "QTD" },
    { name: "passivel_envio_ll_valor", title: "R$" },
    { name: "nao_passivel_envio_ll", title: "QTD" },
    { name: "nao_passivel_envio_ll_valor", title: "R$" },
    { name: "multa_valor", title: "R$ Multa" }
  ],
  columnBands: [
    {
      title: "SLA",
      children: [
        { columnName: "sla_dia_ll" },
        { columnName: "sla_dia_valor" },
      ]
    },
    {
      title: "Passível Envio",
      children: [
        {
          title: "Sim",
          children: [
            { columnName: "passivel_envio_ll" },
            { columnName: "passivel_envio_ll_valor" },
          ]
        },
        {
          title: "Não",
          children: [
            { columnName: "nao_passivel_envio_ll" },
            { columnName: "nao_passivel_envio_ll_valor" },
            { columnName: "multa_valor" },
          ]
        }
      ]
    },
  ],
  yearFilterOptions: []
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case "SD_EFFICIENCY_SET_ROWS":
      return {
        ...state,
        rows: action.payload
      }

    case "SD_EFFICIENCY_SET_YEARS_OPTIONS":
      return {
        ...state,
        yearFilterOptions: action.payload
      }

    default:
      return { ...state }
  }
}