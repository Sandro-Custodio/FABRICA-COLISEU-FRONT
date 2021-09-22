const INITIAL_STATE = {
  critica: "",
  jobExecutionId: "",
  count: "",
  salvar: "",
  uploadData: [
    {
      idLicceu: "",
      regionalA: "",
      ufA: "",
      municipioA: "",
      pontaA: "",
      regionalB: "",
      ufB: "",
      municipioB: "",
      pontaB: "",
      status: "",
      capacidadeSolicitada: "",
      capacidadeContratada: "",
      tipoLink: "",
      modelo: "",
      vendorFornecedorOrigemMw: "",
      vendorFornecedorOrigemFoLl: "",
      vendorFornecedorDestinoFoLl: "",
      vendorFornecedorDestinoMw: "",
      tecnologia: "",
      conceitoHub: "",
      desCircuito: "",
      interfaceHub: "",
      accId: "",
      trailId: "",
      slotPorta: "",
      ot: "",
      engTx: "",
      engenheiroResp: "",
      dependenciaRotaLd: "",
      observacao: "",
      bandaMediaAtualEth: "",
      bandaMediaProjetEth: "",
      bandaMediaAtualEndId: "",
      bandaMediaProjetEndId: ""
    }
  ]
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "UPLOAD_HUB_FILE":
      return {
        ...state,
        critica: action.payload[0][0],
        jobExecutionId: action.payload[0][1],
        count: action.payload[0][2],
        salvar:
          action.payload[0][0] === "Novo Link" ||
          action.payload[0][0] ===
            "Status inválido para novo Hub, status deverá ser Em Estudo"
      };
    case "DETALHES_UPLOAD":
      return {
        ...state,
        uploadData: action.payload
      };
    default:
      return state;
  }
}
