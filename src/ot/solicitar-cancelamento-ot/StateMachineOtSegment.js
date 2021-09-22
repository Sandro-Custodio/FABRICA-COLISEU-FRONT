const CRIADA = 30;
const AGUARDANDO_NFE = 31;
const AGUARDANDO_MUX = 35;
const AGUARDANDO_AGRD = AGUARDANDO_MUX;
const AGUARDANDO_MSE = 36;
const AGUARDANDO_BBIP = 37;
const AGUARDANDO_BONE = 224;
const AGUARDANDO_ONE = 127;
const AGUARDANDO_TEF = 168;
const AGUARDANDO_SAT = 169;
const AGUARDANDO_PROV = 170;
const AGUARDANDO_RSE = 173;
const CANCELADA = 38;
const SOLICITADO = 50;
const IMPLANTACAO_FIBER = 174;
const INVIAVEL = 51;
const CONCLUIDO = 52;
const DESATIVADO = 53;
const LINK_ALTERADO = 73;
const EM_CONFIGURACAO = 171;
const CONFIGURADO = 172;
const AGUARDANDO_OTNP = 228;
const AG_NEGOCIACAO = 229;
const OTNP_APROVACAO = 230;
const AG_FECHAMENTO_ACORDO = 231;
const AG_OTNP_PROJETO = 232;

const AGUARDANDO_E2E = 227;

const AGUARDANDO_CONFIGURACAO = 233;

// Novo flow cancelamento
const AGUARDANDO_CANCELAMENTO = 179;
const AGUARDANDO_CANCELAMENTO_EM_CONFIGURACAO = 180;
const AGUARDANDO_CANCELAMENTO_CONFIGURADO = 181;

// Novo Flow de REVISAO
// AGUARDANDO_REVISAO = 190
const AGUARDANDO_REVISAO = 266;

// Fallback
const EM_FALLBACK = 182;
const FALLBACK = 183;

const AGUARDANDO_CRIACAO_GL = 184;

const SALVAR = "editar OT";
const OT_EM_ANDAMENTO = "colocar Ot em Andamento";
const SEGMENTAR = "Segmentar";
const ENCAMINHAR = "Encaminhar";
const INVIABILIZAR = "Inviabilizar";
const CANCELAR = "Cancelamento";
const SOLICITAR = "Solicitar";
const ALTERAR_CARACT = "Alterar Caracteristica";
const CONTRATAR = "Contratar";
const DISTRATAR = "Distratar";
const CONCLUIR = "Concluir";
const DESATIVAR = "Desativar";
const CONFIGURAR = "Configurar Segmento";
const CONCLUIR_CONFIGURACAO = "Concluir Configuração";
const DEVOLVER_CONFIG_ENGENHARIA = "Devolver para Configuração Engenharia";
const DEVOLVER_ENGENHARIA = "Devolver Engenharia";
const DEVOLVER_ENGENHARIA_BONE = "Devolver Engenharia BONE";
const DEVOLVER_ENGENHARIA_RSE = "Devolver Engenharia RSE";
const DEVOLVER_CONFIGURACAO = "Devolver para Configuração";
const DEVOLVER_CONFIG_IMPLEMENTACAO =
  "Devolver para Configuração Implementação";
const DEVOLVER_OTNP = "Devolver para OTNP";
const ASSOCIAR_PROV = "Associar Provision";
const SOLICITAR_FALLBACK = "Em Fallback";
const CONFIRMAR_FALLBACK = "Fallback";
const GERAR_GL = "Gerar GL";
const GRAVAR_GL = "Gravar GL";
const ADD_JUMPER = "Golden Jumper";
const APROVAR = "Aprovar Alçada";

const AVALIA_DEMANDA = "Avalia Demanda";
const PROSPECTA_PARCEIROS = "Prospecta Parceiros e Estrutura Contrapartida";
const CARIMBO_IRU = "Carimbo IRU/ Criar OT TIM Cedente";
const FECHA_ACORDO = "Fecha Acordo";
const SOLICITA_PROJETO = "Solicita Projeto";
const ESTUDA_VIABILIDADE_MW_FTTS = "Estuda Viabilidade de MW e FTTS";
const ESTUDA_VIABILIDADE_FO = "Estuda Viabilidade de FO";
const DEMADA_ONE = "Demanda de ONE";

const DEVOLVER_E2E = "Devolver E2E para o posto"; // 7288
const DEVOLVER_CONFIG_IMPLEMENTACAO_E2E =
  "Devolver para Configuração Implementacao E2E"; // 18012

// Novo flow de cancelamento -- Transição
const SOLICITAR_CANCELAMENTO = "Solicitar Cancelamento";
const CONFIRMAR_CANCELAMENTO_EM_CONF = "Confirma Cancelamento em Configuração";
const CONFIRMAR_CANCELAMENTO_EM_CONF_ONE =
  "Confirma Cancelamento em Configuração ONE";
const CONFIRMAR_CANCELAMENTO = "Confirma Cancelamento";
const CONFIRMAR_CANCELAMENTO_AREA_ABRIU =
  "Confirma Cancelamento da Area que Abriu";
const CONFIRMAR_CANCELAMENTO_CONF = "Confirma Cancelamento em Configurado";
//
// Novo flow de revisão -- Transição
const SOLICITAR_REVISAO = "Solicitar Revisão";
const SOLICITAR_REVISAO_E2E = "Solicitar Revisão PIM E2E";
const SOLICITAR_REVISAO_BONE = "Solicitar Revisão BONE";
const SOLICITAR_REVISAO_ONE = "Solicitar Revisão ONE";
const SOLICITAR_REVISAO_FNIM = "Solicitar Revisão FNIM";
const SOLICITAR_REVISAO_MUX = "Solicitar Revisão MUX";
const CONFIRMAR_REVISAO = "Confirma Revisão";
//

const STATES_OUT_FLOW_CANCEL = [
  INVIAVEL,
  CANCELADA,
  LINK_ALTERADO,
  CONCLUIDO,
  DESATIVADO,
  FALLBACK
];
const STATES = [
  CRIADA,
  AGUARDANDO_NFE,
  AGUARDANDO_MUX,
  AGUARDANDO_AGRD,
  AGUARDANDO_MSE,
  AGUARDANDO_BBIP,
  AGUARDANDO_BONE,
  AGUARDANDO_ONE,
  AGUARDANDO_TEF,
  AGUARDANDO_SAT,
  AGUARDANDO_PROV,
  CANCELADA,
  SOLICITADO,
  INVIAVEL,
  CONCLUIDO,
  DESATIVADO,
  EM_CONFIGURACAO,
  CONFIGURADO,
  AGUARDANDO_CANCELAMENTO,
  AGUARDANDO_REVISAO
];
const EVENTS = [
  SALVAR,
  OT_EM_ANDAMENTO,
  SEGMENTAR,
  ENCAMINHAR,
  INVIABILIZAR,
  CANCELAR,
  SOLICITAR,
  ALTERAR_CARACT,
  CONTRATAR,
  DISTRATAR,
  CONCLUIR,
  DESATIVAR,
  CONFIGURAR,
  CONCLUIR_CONFIGURACAO,
  DEVOLVER_ENGENHARIA,
  DEVOLVER_ENGENHARIA_BONE,
  DEVOLVER_CONFIGURACAO,
  ASSOCIAR_PROV,
  SOLICITAR_CANCELAMENTO,
  CONFIRMAR_CANCELAMENTO_EM_CONF,
  CONFIRMAR_CANCELAMENTO,
  SOLICITAR_REVISAO,
  SOLICITAR_REVISAO_E2E,
  SOLICITAR_REVISAO_MUX,
  SOLICITAR_REVISAO_BONE,
  SOLICITAR_REVISAO_ONE,
  SOLICITAR_REVISAO_FNIM,
  CONFIRMAR_REVISAO
];

const BBIP = 3;
const NFE = 5;
const MSE = 67;
const MUX = 68;
const AGRD = MUX;
const BONE = 322;
const ONE = 94;
const FNIM = 97;
const PIM_MW = 99;
const PIM_LL = 70;
const TN_BACK = 91;
const TN_OTNP = 92;
const TEF = 120;
const SAT = 122;
const PIM_SAT = 123;
const PROV = 124;
const RSE = 125;
const FIBER = 126;
const FACILITY_LL = 99;
const FACILITY_ONE = 134;
const PIM_E2E = 274; // 7288
const WSL = 89;
const PSBI = 294; // 46076

const AREAS_NAME = [
  "BBIP",
  "NFE",
  "MSE",
  "MUX",
  "BONE",
  "ONE",
  "FNIM",
  "PIM_MW",
  "PIM_LL",
  "TN_BACK",
  "TN_OTNP",
  "TEF",
  "SAT",
  "PIM_SAT",
  "PROV",
  "RSE",
  "FIBER",
  "FACILITY_LL",
  "FACILITY_ONE",
  "PIM_E2E",
  "PSBI"
]; // 7288 / // 46076

const AREAS = [
  BBIP,
  NFE,
  MSE,
  MUX,
  BONE,
  ONE,
  FNIM,
  PIM_MW,
  PIM_LL,
  TN_BACK,
  TN_OTNP,
  TEF,
  SAT,
  PIM_SAT,
  PROV,
  RSE,
  FIBER,
  FACILITY_LL,
  FACILITY_ONE,
  PIM_E2E,
  PSBI
]; // 7288 / // 46076

const ENGENHARIA_MASTER = [NFE, ONE, BONE];
const ENGENHARIAS = [BBIP, NFE, MSE, MUX, ONE, BONE];
const IMPLEMENTACAO = [FNIM, PIM_MW, PIM_LL];
const S_FACI_BACK = "MW";
const S_FACI_OTN = "FO";
const S_BBIP = "BBIP";
const S_LL = "LL";
const S_MW = "MW";
const S_MUX = "MUX";
const S_AGRD = "AGREGADORES";
const S_SAT = "SAT";
const S_FACI = "FACILITY"; // 41637

const SOLUCOES_PLANNERS = [S_FACI_BACK, S_FACI_OTN]; // REMOVER
const SOLUCOES = [
  S_FACI_BACK,
  S_FACI_OTN,
  S_BBIP,
  S_LL,
  S_MW,
  S_MUX,
  S_SAT,
  S_AGRD,
  S_FACI
]; // 41637

export const SEGTRANSITIONS = [
  {
    de: CRIADA,
    para: CRIADA,
    transicao: SALVAR,
    solucao: null,
    area_owner_id: null,
    area_from_id: null
  },

  //  44631
  {
    de: CRIADA,
    para: AGUARDANDO_OTNP,
    transicao: AVALIA_DEMANDA,
    solucao: null,
    area_owner_id: TN_OTNP,
    area_from_id: null
  },
  {
    de: CRIADA,
    para: AG_OTNP_PROJETO,
    transicao: AVALIA_DEMANDA,
    solucao: null,
    area_owner_id: TN_OTNP,
    area_from_id: null
  },

  {
    de: CRIADA,
    para: AGUARDANDO_NFE,
    transicao: OT_EM_ANDAMENTO,
    solucao: null,
    area_owner_id: NFE,
    area_from_id: null
  },
  {
    de: CRIADA,
    para: AGUARDANDO_BONE,
    transicao: OT_EM_ANDAMENTO,
    solucao: null,
    area_owner_id: BONE,
    area_from_id: null
  },

  {
    de: AGUARDANDO_NFE,
    para: AGUARDANDO_NFE,
    transicao: SEGMENTAR,
    solucao: null,
    area_owner_id: null,
    area_from_id: null
  },
  {
    de: AGUARDANDO_SAT,
    para: AGUARDANDO_SAT,
    transicao: SEGMENTAR,
    solucao: null,
    area_owner_id: null,
    area_from_id: null
  },

  {
    de: AGUARDANDO_NFE,
    para: AGUARDANDO_NFE,
    transicao: ENCAMINHAR,
    solucao: S_FACI_BACK,
    area_owner_id: NFE,
    area_from_id: null
  },
  {
    de: AGUARDANDO_NFE,
    para: AGUARDANDO_BONE,
    transicao: ENCAMINHAR,
    solucao: S_FACI_OTN,
    area_owner_id: BONE,
    area_from_id: null
  },
  {
    de: AGUARDANDO_NFE,
    para: AGUARDANDO_ONE,
    transicao: ENCAMINHAR,
    solucao: S_FACI_OTN,
    area_owner_id: ONE,
    area_from_id: null
  },
  {
    de: AGUARDANDO_NFE,
    para: AGUARDANDO_PROV,
    transicao: ENCAMINHAR,
    solucao: S_FACI_OTN,
    area_owner_id: PROV,
    area_from_id: null
  },

  //  44631
  {
    de: AGUARDANDO_OTNP,
    para: AG_NEGOCIACAO,
    transicao: PROSPECTA_PARCEIROS,
    solucao: S_FACI_OTN,
    area_owner_id: WSL,
    area_from_id: null
  },
  {
    de: AG_NEGOCIACAO,
    para: OTNP_APROVACAO,
    transicao: CARIMBO_IRU,
    solucao: S_FACI_OTN,
    area_owner_id: TN_OTNP,
    area_from_id: null
  },
  {
    de: OTNP_APROVACAO,
    para: AG_FECHAMENTO_ACORDO,
    transicao: FECHA_ACORDO,
    solucao: S_FACI_OTN,
    area_owner_id: WSL,
    area_from_id: null
  },
  {
    de: AG_FECHAMENTO_ACORDO,
    para: AG_OTNP_PROJETO,
    transicao: SOLICITA_PROJETO,
    solucao: S_FACI_OTN,
    area_owner_id: TN_OTNP,
    area_from_id: null
  },
  {
    de: AG_OTNP_PROJETO,
    para: AGUARDANDO_BONE,
    transicao: ESTUDA_VIABILIDADE_MW_FTTS,
    solucao: S_FACI_OTN,
    area_owner_id: BONE,
    area_from_id: null
  },
  {
    de: AG_OTNP_PROJETO,
    para: AGUARDANDO_ONE,
    transicao: ESTUDA_VIABILIDADE_FO,
    solucao: S_FACI_OTN,
    area_owner_id: ONE,
    area_from_id: null
  },

  //  44631 - Devolucoes
  {
    de: AGUARDANDO_BONE,
    para: AG_OTNP_PROJETO,
    transicao: DEVOLVER_OTNP,
    solucao: S_FACI_OTN,
    area_owner_id: TN_OTNP,
    area_from_id: null
  },
  {
    de: AGUARDANDO_ONE,
    para: AG_OTNP_PROJETO,
    transicao: DEVOLVER_OTNP,
    solucao: S_FACI_OTN,
    area_owner_id: TN_OTNP,
    area_from_id: null
  },

  //  44631 - Cancelamentos
  {
    de: AGUARDANDO_OTNP,
    para: CANCELADA,
    transicao: CANCELAR,
    solucao: null,
    area_owner_id: TN_OTNP,
    area_from_id: null
  },
  {
    de: OTNP_APROVACAO,
    para: CANCELADA,
    transicao: CANCELAR,
    solucao: null,
    area_owner_id: TN_OTNP,
    area_from_id: null
  },
  {
    de: AG_OTNP_PROJETO,
    para: CANCELADA,
    transicao: CANCELAR,
    solucao: null,
    area_owner_id: TN_OTNP,
    area_from_id: null
  },
  {
    de: AG_FECHAMENTO_ACORDO,
    para: CANCELADA,
    transicao: CANCELAR,
    solucao: null,
    area_owner_id: TN_OTNP,
    area_from_id: null
  },
  {
    de: AG_NEGOCIACAO,
    para: CANCELADA,
    transicao: CANCELAR,
    solucao: null,
    area_owner_id: TN_OTNP,
    area_from_id: null
  },

  //  O area_owner_id da transição abaixo foi modificada na CR// 28922 (do desenvolvimento // 26700), de MUX para MSE
  //  para que o perfil ENGENHARIA MSE/MUX pudesse visualizar o segmento que foi encaminhado para MUX
  //  O perfil ENGENHARIA MSE/MUX está associado a area 67 - MSE
  {
    de: AGUARDANDO_NFE,
    para: AGUARDANDO_MUX,
    transicao: ENCAMINHAR,
    solucao: S_MUX,
    area_owner_id: MSE,
    area_from_id: null
  },
  {
    de: AGUARDANDO_NFE,
    para: AGUARDANDO_MSE,
    transicao: ENCAMINHAR,
    solucao: S_MW,
    area_owner_id: MSE,
    area_from_id: null
  },
  {
    de: AGUARDANDO_NFE,
    para: AGUARDANDO_BBIP,
    transicao: ENCAMINHAR,
    solucao: S_BBIP,
    area_owner_id: BBIP,
    area_from_id: null
  },
  {
    de: AGUARDANDO_NFE,
    para: AGUARDANDO_TEF,
    transicao: ENCAMINHAR,
    solucao: S_LL,
    area_owner_id: TEF,
    area_from_id: null
  },
  {
    de: AGUARDANDO_NFE,
    para: AGUARDANDO_SAT,
    transicao: ENCAMINHAR,
    solucao: S_SAT,
    area_owner_id: SAT,
    area_from_id: null
  },
  {
    de: AGUARDANDO_NFE,
    para: AGUARDANDO_RSE,
    transicao: ENCAMINHAR,
    solucao: S_FACI_OTN,
    area_owner_id: RSE,
    area_from_id: null
  },
  {
    de: AGUARDANDO_NFE,
    para: AGUARDANDO_MSE,
    transicao: ENCAMINHAR,
    solucao: S_FACI_BACK,
    area_owner_id: MSE,
    area_from_id: null
  },

  {
    de: AGUARDANDO_NFE,
    para: AGUARDANDO_AGRD,
    transicao: ENCAMINHAR,
    solucao: S_FACI_OTN,
    area_owner_id: AGRD,
    area_from_id: null
  },
  {
    de: AGUARDANDO_BONE,
    para: AGUARDANDO_AGRD,
    transicao: ENCAMINHAR,
    solucao: S_FACI_OTN,
    area_owner_id: AGRD,
    area_from_id: null
  },
  {
    de: AGUARDANDO_ONE,
    para: AGUARDANDO_AGRD,
    transicao: ENCAMINHAR,
    solucao: S_FACI_OTN,
    area_owner_id: AGRD,
    area_from_id: null
  },
  {
    de: AGUARDANDO_PROV,
    para: AGUARDANDO_BONE,
    transicao: ENCAMINHAR,
    solucao: S_FACI_OTN,
    area_owner_id: BONE,
    area_from_id: null
  },
  {
    de: AGUARDANDO_BONE,
    para: AGUARDANDO_PROV,
    transicao: ENCAMINHAR,
    solucao: S_FACI_OTN,
    area_owner_id: PROV,
    area_from_id: null
  },
  {
    de: AGUARDANDO_PROV,
    para: AGUARDANDO_ONE,
    transicao: ENCAMINHAR,
    solucao: S_FACI_OTN,
    area_owner_id: ONE,
    area_from_id: null
  },
  {
    de: AGUARDANDO_ONE,
    para: AGUARDANDO_PROV,
    transicao: ENCAMINHAR,
    solucao: S_FACI_OTN,
    area_owner_id: PROV,
    area_from_id: null
  },

  {
    de: AGUARDANDO_SAT,
    para: AGUARDANDO_BONE,
    transicao: ENCAMINHAR,
    solucao: S_FACI_OTN,
    area_owner_id: BONE,
    area_from_id: null
  },
  {
    de: AGUARDANDO_SAT,
    para: AGUARDANDO_ONE,
    transicao: ENCAMINHAR,
    solucao: S_FACI_OTN,
    area_owner_id: ONE,
    area_from_id: null
  },
  {
    de: AGUARDANDO_SAT,
    para: AGUARDANDO_SAT,
    transicao: ENCAMINHAR,
    solucao: S_SAT,
    area_owner_id: SAT,
    area_from_id: null
  },

  {
    de: AGUARDANDO_RSE,
    para: AGUARDANDO_ONE,
    transicao: ENCAMINHAR,
    solucao: S_FACI_OTN,
    area_owner_id: ONE,
    area_from_id: null
  },
  {
    de: AGUARDANDO_RSE,
    para: AGUARDANDO_BONE,
    transicao: ENCAMINHAR,
    solucao: S_FACI_OTN,
    area_owner_id: BONE,
    area_from_id: null
  },

  {
    de: AGUARDANDO_NFE,
    para: CANCELADA,
    transicao: CANCELAR,
    solucao: null,
    area_owner_id: NFE,
    area_from_id: null
  },
  // { de: AGUARDANDO_NFE , para: SOLICITADO, transicao: SOLICITAR, solucao: S_FACI_BACK, area_owner_id: NFE , area_from_id: null },
  // { de: AGUARDANDO_NFE , para: SOLICITADO, transicao: SOLICITAR, solucao: S_MW, area_owner_id: PIM_MW , area_from_id: null },

  {
    de: AGUARDANDO_BONE,
    para: SOLICITADO,
    transicao: SOLICITAR,
    solucao: S_FACI_OTN,
    area_owner_id: FNIM,
    area_from_id: null
  },
  {
    de: AGUARDANDO_ONE,
    para: SOLICITADO,
    transicao: SOLICITAR,
    solucao: S_FACI_OTN,
    area_owner_id: FNIM,
    area_from_id: null
  },
  // { de: AGUARDANDO_MUX , para: SOLICITADO, transicao: SOLICITAR, solucao: S_MUX, area_owner_id: MUX , area_from_id: null },
  {
    de: AGUARDANDO_MSE,
    para: SOLICITADO,
    transicao: SOLICITAR,
    solucao: S_MW,
    area_owner_id: PIM_MW,
    area_from_id: null
  },
  {
    de: AGUARDANDO_BBIP,
    para: SOLICITADO,
    transicao: SOLICITAR,
    solucao: S_BBIP,
    area_owner_id: BBIP,
    area_from_id: null
  },
  {
    de: AGUARDANDO_SAT,
    para: SOLICITADO,
    transicao: SOLICITAR,
    solucao: S_SAT,
    area_owner_id: PIM_SAT,
    area_from_id: null
  },
  {
    de: AGUARDANDO_RSE,
    para: IMPLANTACAO_FIBER,
    transicao: SOLICITAR,
    solucao: S_FACI_OTN,
    area_owner_id: FIBER,
    area_from_id: null
  },

  {
    de: SOLICITADO,
    para: EM_CONFIGURACAO,
    transicao: CONFIGURAR,
    solucao: S_FACI_OTN,
    area_owner_id: PROV,
    area_from_id: null
  },
  // { de: SOLICITADO , para: AGUARDANDO_CRIACAO_GL, transicao: GERAR_GL, solucao: S_FACI_OTN, area_owner_id: PROV , area_from_id: null },// 00037 Alteração Fluxo Encaminhamento PROV
  {
    de: AGUARDANDO_CRIACAO_GL,
    para: EM_CONFIGURACAO,
    transicao: GRAVAR_GL,
    solucao: S_FACI_OTN,
    area_owner_id: PROV,
    area_from_id: null
  },

  {
    de: AGUARDANDO_PROV,
    para: CONFIGURADO,
    transicao: CONCLUIR_CONFIGURACAO,
    solucao: S_FACI_OTN,
    area_owner_id: FNIM,
    area_from_id: null
  },
  {
    de: EM_CONFIGURACAO,
    para: CONFIGURADO,
    transicao: CONCLUIR_CONFIGURACAO,
    solucao: S_FACI_OTN,
    area_owner_id: FNIM,
    area_from_id: null
  },

  {
    de: IMPLANTACAO_FIBER,
    para: CONCLUIDO,
    transicao: CONCLUIR,
    solucao: S_FACI_OTN,
    area_owner_id: null,
    area_from_id: null
  },
  {
    de: SOLICITADO,
    para: CONCLUIDO,
    transicao: CONCLUIR,
    solucao: S_MUX,
    area_owner_id: null,
    area_from_id: null
  },
  {
    de: SOLICITADO,
    para: CONCLUIDO,
    transicao: CONCLUIR,
    solucao: S_MW,
    area_owner_id: null,
    area_from_id: null
  },
  {
    de: SOLICITADO,
    para: CONCLUIDO,
    transicao: CONCLUIR,
    solucao: S_BBIP,
    area_owner_id: null,
    area_from_id: null
  },
  {
    de: SOLICITADO,
    para: CONCLUIDO,
    transicao: CONCLUIR,
    solucao: S_SAT,
    area_owner_id: null,
    area_from_id: null
  },
  {
    de: SOLICITADO,
    para: CONCLUIDO,
    transicao: CONCLUIR,
    solucao: S_FACI_OTN,
    area_owner_id: null,
    area_from_id: null
  },

  {
    de: CONFIGURADO,
    para: CONCLUIDO,
    transicao: CONCLUIR,
    solucao: S_FACI_OTN,
    area_owner_id: null,
    area_from_id: null
  },
  {
    de: EM_CONFIGURACAO,
    para: CONCLUIDO,
    transicao: CONCLUIR_CONFIGURACAO,
    solucao: S_MW,
    area_owner_id: null,
    area_from_id: null
  },
  {
    de: EM_CONFIGURACAO,
    para: CONCLUIDO,
    transicao: CONCLUIR_CONFIGURACAO,
    solucao: S_LL,
    area_owner_id: null,
    area_from_id: null
  },
  {
    de: EM_CONFIGURACAO,
    para: CONCLUIDO,
    transicao: CONCLUIR_CONFIGURACAO,
    solucao: S_FACI_OTN,
    area_owner_id: null,
    area_from_id: null
  },

  {
    de: CONFIGURADO,
    para: EM_CONFIGURACAO,
    transicao: DEVOLVER_CONFIGURACAO,
    solucao: S_FACI_OTN,
    area_owner_id: PROV,
    area_from_id: null
  },

  {
    de: AGUARDANDO_TEF,
    para: SOLICITADO,
    transicao: CONTRATAR,
    solucao: S_LL,
    area_owner_id: TEF,
    area_from_id: null
  },
  {
    de: SOLICITADO,
    para: AGUARDANDO_TEF,
    transicao: DISTRATAR,
    solucao: S_LL,
    area_owner_id: TEF,
    area_from_id: null
  },
  {
    de: AGUARDANDO_TEF,
    para: LINK_ALTERADO,
    transicao: ALTERAR_CARACT,
    solucao: null,
    area_owner_id: null,
    area_from_id: null
  },

  {
    de: CONCLUIDO,
    para: DESATIVADO,
    transicao: DESATIVAR,
    solucao: null,
    area_owner_id: null,
    area_from_id: null
  },

  {
    de: AGUARDANDO_NFE,
    para: INVIAVEL,
    transicao: INVIABILIZAR,
    solucao: S_FACI_BACK,
    area_owner_id: NFE,
    area_from_id: null
  },
  {
    de: AGUARDANDO_BONE,
    para: INVIAVEL,
    transicao: INVIABILIZAR,
    solucao: S_FACI_OTN,
    area_owner_id: NFE,
    area_from_id: null
  },
  {
    de: AGUARDANDO_ONE,
    para: INVIAVEL,
    transicao: INVIABILIZAR,
    solucao: S_FACI_OTN,
    area_owner_id: NFE,
    area_from_id: null
  },
  {
    de: AGUARDANDO_MUX,
    para: INVIAVEL,
    transicao: INVIABILIZAR,
    solucao: S_MUX,
    area_owner_id: NFE,
    area_from_id: null
  },
  {
    de: AGUARDANDO_MUX,
    para: INVIAVEL,
    transicao: INVIABILIZAR,
    solucao: S_LL,
    area_owner_id: NFE,
    area_from_id: null
  }, // 37824
  {
    de: AGUARDANDO_MUX,
    para: INVIAVEL,
    transicao: INVIABILIZAR,
    solucao: S_FACI_OTN,
    area_owner_id: NFE,
    area_from_id: null
  }, // 37824
  {
    de: AGUARDANDO_MUX,
    para: INVIAVEL,
    transicao: INVIABILIZAR,
    solucao: S_MW,
    area_owner_id: NFE,
    area_from_id: null
  }, // 37824
  {
    de: AGUARDANDO_MSE,
    para: INVIAVEL,
    transicao: INVIABILIZAR,
    solucao: S_MW,
    area_owner_id: NFE,
    area_from_id: null
  },
  {
    de: AGUARDANDO_BBIP,
    para: INVIAVEL,
    transicao: INVIABILIZAR,
    solucao: S_BBIP,
    area_owner_id: NFE,
    area_from_id: null
  },
  {
    de: AGUARDANDO_TEF,
    para: INVIAVEL,
    transicao: INVIABILIZAR,
    solucao: S_LL,
    area_owner_id: NFE,
    area_from_id: null
  },
  {
    de: AGUARDANDO_SAT,
    para: INVIAVEL,
    transicao: INVIABILIZAR,
    solucao: S_SAT,
    area_owner_id: NFE,
    area_from_id: null
  },
  {
    de: AGUARDANDO_RSE,
    para: INVIAVEL,
    transicao: INVIABILIZAR,
    solucao: S_FACI_OTN,
    area_owner_id: NFE,
    area_from_id: null
  },
  {
    de: AGUARDANDO_PROV,
    para: INVIAVEL,
    transicao: INVIABILIZAR,
    solucao: S_FACI_OTN,
    area_owner_id: NFE,
    area_from_id: null
  },
  {
    de: EM_CONFIGURACAO,
    para: INVIAVEL,
    transicao: INVIABILIZAR,
    solucao: S_MW,
    area_owner_id: NFE,
    area_from_id: null
  }, // 38888
  {
    de: EM_CONFIGURACAO,
    para: INVIAVEL,
    transicao: INVIABILIZAR,
    solucao: S_LL,
    area_owner_id: NFE,
    area_from_id: null
  }, // 38888

  {
    de: EM_CONFIGURACAO,
    para: INVIAVEL,
    transicao: INVIABILIZAR,
    solucao: S_FACI_OTN,
    area_owner_id: NFE,
    area_from_id: null
  }, // 41637
  {
    de: EM_CONFIGURACAO,
    para: INVIAVEL,
    transicao: INVIABILIZAR,
    solucao: S_FACI,
    area_owner_id: NFE,
    area_from_id: null
  }, // 41637
  {
    de: AGUARDANDO_NFE,
    para: INVIAVEL,
    transicao: INVIABILIZAR,
    solucao: S_FACI,
    area_owner_id: NFE,
    area_from_id: null
  }, // 41637
  {
    de: AGUARDANDO_MUX,
    para: INVIAVEL,
    transicao: INVIABILIZAR,
    solucao: S_FACI,
    area_owner_id: NFE,
    area_from_id: null
  }, // 41637
  {
    de: AGUARDANDO_ONE,
    para: INVIAVEL,
    transicao: INVIABILIZAR,
    solucao: S_FACI,
    area_owner_id: NFE,
    area_from_id: null
  }, // 41637
  {
    de: AGUARDANDO_BONE,
    para: INVIAVEL,
    transicao: INVIABILIZAR,
    solucao: S_FACI,
    area_owner_id: NFE,
    area_from_id: null
  }, // 41637
  {
    de: AGUARDANDO_BBIP,
    para: INVIAVEL,
    transicao: INVIABILIZAR,
    solucao: S_FACI,
    area_owner_id: NFE,
    area_from_id: null
  }, // 41637
  {
    de: AGUARDANDO_TEF,
    para: INVIAVEL,
    transicao: INVIABILIZAR,
    solucao: S_FACI,
    area_owner_id: NFE,
    area_from_id: null
  }, // 41637
  {
    de: AGUARDANDO_SAT,
    para: INVIAVEL,
    transicao: INVIABILIZAR,
    solucao: S_FACI,
    area_owner_id: NFE,
    area_from_id: null
  }, // 41637
  {
    de: AGUARDANDO_RSE,
    para: INVIAVEL,
    transicao: INVIABILIZAR,
    solucao: S_FACI,
    area_owner_id: NFE,
    area_from_id: null
  }, // 41637
  {
    de: AGUARDANDO_PROV,
    para: INVIAVEL,
    transicao: INVIABILIZAR,
    solucao: S_FACI,
    area_owner_id: NFE,
    area_from_id: null
  }, // 41637
  {
    de: SOLICITADO,
    para: INVIAVEL,
    transicao: INVIABILIZAR,
    solucao: S_FACI,
    area_owner_id: NFE,
    area_from_id: null
  }, // 41637

  {
    de: AGUARDANDO_CONFIGURACAO,
    para: INVIAVEL,
    transicao: INVIABILIZAR,
    solucao: S_MW,
    area_owner_id: NFE,
    area_from_id: null
  }, // 46376

  //  44631 - Inviabilizar
  {
    de: AGUARDANDO_OTNP,
    para: INVIAVEL,
    transicao: INVIABILIZAR,
    solucao: S_FACI_OTN,
    area_owner_id: TN_OTNP,
    area_from_id: null
  },
  {
    de: AG_NEGOCIACAO,
    para: INVIAVEL,
    transicao: INVIABILIZAR,
    solucao: S_FACI_OTN,
    area_owner_id: TN_OTNP,
    area_from_id: null
  },
  {
    de: OTNP_APROVACAO,
    para: INVIAVEL,
    transicao: INVIABILIZAR,
    solucao: S_FACI_OTN,
    area_owner_id: TN_OTNP,
    area_from_id: null
  },
  {
    de: AG_FECHAMENTO_ACORDO,
    para: INVIAVEL,
    transicao: INVIABILIZAR,
    solucao: S_FACI_OTN,
    area_owner_id: TN_OTNP,
    area_from_id: null
  },
  {
    de: AG_OTNP_PROJETO,
    para: INVIAVEL,
    transicao: INVIABILIZAR,
    solucao: S_FACI_OTN,
    area_owner_id: TN_OTNP,
    area_from_id: null
  },
  {
    de: AG_OTNP_PROJETO,
    para: INVIAVEL,
    transicao: INVIABILIZAR,
    solucao: S_FACI_OTN,
    area_owner_id: TN_OTNP,
    area_from_id: null
  },

  // { de: SOLICITADO , para: AGUARDANDO_NFE, transicao: DEVOLVER_ENGENHARIA, solucao: S_FACI_BACK, area_owner_id: NFE , area_from_id: null },
  {
    de: SOLICITADO,
    para: AGUARDANDO_BONE,
    transicao: DEVOLVER_ENGENHARIA_BONE,
    solucao: S_FACI_OTN,
    area_owner_id: BONE,
    area_from_id: null
  },
  {
    de: SOLICITADO,
    para: AGUARDANDO_ONE,
    transicao: DEVOLVER_ENGENHARIA,
    solucao: S_FACI_OTN,
    area_owner_id: ONE,
    area_from_id: null
  },
  {
    de: SOLICITADO,
    para: AGUARDANDO_MUX,
    transicao: DEVOLVER_ENGENHARIA,
    solucao: S_MUX,
    area_owner_id: MUX,
    area_from_id: null
  },
  {
    de: SOLICITADO,
    para: AGUARDANDO_MSE,
    transicao: DEVOLVER_ENGENHARIA,
    solucao: S_MW,
    area_owner_id: MSE,
    area_from_id: null
  },
  {
    de: SOLICITADO,
    para: AGUARDANDO_BBIP,
    transicao: DEVOLVER_ENGENHARIA,
    solucao: S_BBIP,
    area_owner_id: BBIP,
    area_from_id: null
  },
  {
    de: SOLICITADO,
    para: AGUARDANDO_SAT,
    transicao: DEVOLVER_ENGENHARIA,
    solucao: S_SAT,
    area_owner_id: SAT,
    area_from_id: null
  },
  {
    de: IMPLANTACAO_FIBER,
    para: AGUARDANDO_RSE,
    transicao: DEVOLVER_ENGENHARIA_RSE,
    solucao: S_FACI_OTN,
    area_owner_id: RSE,
    area_from_id: null
  },

  {
    de: AGUARDANDO_NFE,
    para: EM_CONFIGURACAO,
    transicao: CONFIGURAR,
    solucao: S_LL,
    area_owner_id: FACILITY_LL,
    area_from_id: null
  },
  {
    de: AGUARDANDO_NFE,
    para: EM_CONFIGURACAO,
    transicao: CONFIGURAR,
    solucao: S_FACI_OTN,
    area_owner_id: FACILITY_ONE,
    area_from_id: null
  },

  {
    de: AGUARDANDO_NFE,
    para: AGUARDANDO_CONFIGURACAO,
    transicao: CONFIGURAR,
    solucao: S_MW,
    area_owner_id: MSE,
    area_from_id: null
  }, // 46376
  {
    de: AGUARDANDO_CONFIGURACAO,
    para: AGUARDANDO_NFE,
    transicao: DEVOLVER_CONFIG_ENGENHARIA,
    solucao: S_MW,
    area_owner_id: NFE,
    area_from_id: null
  }, // 46376
  {
    de: AGUARDANDO_CONFIGURACAO,
    para: SOLICITADO,
    transicao: SOLICITAR,
    solucao: S_MW,
    area_owner_id: PIM_E2E,
    area_from_id: null
  }, // 46376
  {
    de: SOLICITADO,
    para: AGUARDANDO_CONFIGURACAO,
    transicao: DEVOLVER_E2E,
    solucao: S_MW,
    area_owner_id: MSE,
    area_from_id: null
  }, // 46376

  {
    de: EM_CONFIGURACAO,
    para: AGUARDANDO_NFE,
    transicao: DEVOLVER_CONFIG_ENGENHARIA,
    solucao: S_MW,
    area_owner_id: NFE,
    area_from_id: null
  },
  {
    de: EM_CONFIGURACAO,
    para: AGUARDANDO_NFE,
    transicao: DEVOLVER_CONFIG_ENGENHARIA,
    solucao: S_LL,
    area_owner_id: NFE,
    area_from_id: null
  },
  {
    de: EM_CONFIGURACAO,
    para: AGUARDANDO_NFE,
    transicao: DEVOLVER_CONFIG_ENGENHARIA,
    solucao: S_FACI_OTN,
    area_owner_id: NFE,
    area_from_id: null
  },
  {
    de: EM_CONFIGURACAO,
    para: SOLICITADO,
    transicao: DEVOLVER_CONFIG_IMPLEMENTACAO,
    solucao: S_FACI_OTN,
    area_owner_id: FNIM,
    area_from_id: null
  },

  {
    de: EM_CONFIGURACAO,
    para: EM_CONFIGURACAO,
    transicao: ASSOCIAR_PROV,
    solucao: S_FACI_OTN,
    area_owner_id: PROV,
    area_from_id: null
  },
  {
    de: AGUARDANDO_PROV,
    para: AGUARDANDO_PROV,
    transicao: ASSOCIAR_PROV,
    solucao: S_FACI_OTN,
    area_owner_id: PROV,
    area_from_id: null
  },

  // 7288
  // Encaminhar a PIM E2E ----------------------------------------------------------------------------------------
  {
    de: IMPLANTACAO_FIBER,
    para: AGUARDANDO_E2E,
    transicao: ENCAMINHAR,
    solucao: S_FACI_OTN,
    area_owner_id: null,
    area_from_id: null
  },
  {
    de: SOLICITADO,
    para: AGUARDANDO_E2E,
    transicao: ENCAMINHAR,
    solucao: S_MW,
    area_owner_id: null,
    area_from_id: null
  },
  {
    de: SOLICITADO,
    para: AGUARDANDO_E2E,
    transicao: ENCAMINHAR,
    solucao: S_SAT,
    area_owner_id: null,
    area_from_id: null
  },
  {
    de: SOLICITADO,
    para: AGUARDANDO_E2E,
    transicao: ENCAMINHAR,
    solucao: S_FACI_OTN,
    area_owner_id: null,
    area_from_id: null
  },
  // { de: AGUARDANDO_MUX , para: AGUARDANDO_E2E, transicao: ENCAMINHAR, solucao: S_MUX , area_owner_id: null , area_from_id: null }, 46076

  {
    de: CONFIGURADO,
    para: AGUARDANDO_E2E,
    transicao: ENCAMINHAR,
    solucao: S_FACI_OTN,
    area_owner_id: null,
    area_from_id: null
  },

  {
    de: AGUARDANDO_E2E,
    para: CONCLUIDO,
    transicao: CONCLUIR,
    solucao: S_FACI_OTN,
    area_owner_id: null,
    area_from_id: null
  },
  {
    de: AGUARDANDO_E2E,
    para: CONCLUIDO,
    transicao: CONCLUIR,
    solucao: S_MW,
    area_owner_id: null,
    area_from_id: null
  },
  {
    de: AGUARDANDO_E2E,
    para: CONCLUIDO,
    transicao: CONCLUIR,
    solucao: S_SAT,
    area_owner_id: null,
    area_from_id: null
  },
  {
    de: AGUARDANDO_E2E,
    para: CONCLUIDO,
    transicao: CONCLUIR_CONFIGURACAO,
    solucao: S_LL,
    area_owner_id: null,
    area_from_id: null
  },

  {
    de: EM_CONFIGURACAO,
    para: AGUARDANDO_E2E,
    transicao: CONCLUIR_CONFIGURACAO,
    solucao: S_MW,
    area_owner_id: null,
    area_from_id: null
  },
  {
    de: EM_CONFIGURACAO,
    para: AGUARDANDO_E2E,
    transicao: CONCLUIR_CONFIGURACAO,
    solucao: S_LL,
    area_owner_id: null,
    area_from_id: null
  },
  {
    de: EM_CONFIGURACAO,
    para: AGUARDANDO_E2E,
    transicao: CONCLUIR_CONFIGURACAO,
    solucao: S_FACI_OTN,
    area_owner_id: null,
    area_from_id: null
  },

  {
    de: AGUARDANDO_BONE,
    para: SOLICITADO,
    transicao: SOLICITAR,
    solucao: S_FACI_OTN,
    area_owner_id: PIM_E2E,
    area_from_id: null
  }, // 18012
  {
    de: AGUARDANDO_ONE,
    para: SOLICITADO,
    transicao: SOLICITAR,
    solucao: S_FACI_OTN,
    area_owner_id: PIM_E2E,
    area_from_id: null
  }, // 18012
  {
    de: EM_CONFIGURACAO,
    para: SOLICITADO,
    transicao: DEVOLVER_CONFIG_IMPLEMENTACAO_E2E,
    solucao: S_FACI_OTN,
    area_owner_id: PIM_E2E,
    area_from_id: null
  }, // 18012
  {
    de: EM_CONFIGURACAO,
    para: CONFIGURADO,
    transicao: CONCLUIR_CONFIGURACAO,
    solucao: S_FACI_OTN,
    area_owner_id: PIM_E2E,
    area_from_id: null
  }, // 18012

  {
    de: AGUARDANDO_MSE,
    para: SOLICITADO,
    transicao: SOLICITAR,
    solucao: S_MW,
    area_owner_id: PIM_E2E,
    area_from_id: null
  }, // 45816
  {
    de: EM_CONFIGURACAO,
    para: SOLICITADO,
    transicao: DEVOLVER_CONFIG_IMPLEMENTACAO_E2E,
    solucao: S_MW,
    area_owner_id: PIM_E2E,
    area_from_id: null
  }, // 45816

  {
    de: AGUARDANDO_MUX,
    para: AGUARDANDO_E2E,
    transicao: SOLICITAR,
    solucao: S_MUX,
    area_owner_id: PIM_E2E,
    area_from_id: null
  }, // 46076

  //  fim Encaminhar E2E

  // Encaminhar para prov // 42778
  //  { de: AGUARDANDO_E2E , para: AGUARDANDO_CRIACAO_GL, transicao: GERAR_GL, solucao: S_MW, area_owner_id: PROV , area_from_id: null },// 42778 // 00037 Alteração Fluxo Encaminhamento PROV
  //  { de: AGUARDANDO_E2E , para: AGUARDANDO_CRIACAO_GL, transicao: GERAR_GL, solucao: S_SAT, area_owner_id: PROV , area_from_id: null },// 42778 // 00037 Alteração Fluxo Encaminhamento PROV
  //  { de: AGUARDANDO_E2E , para: AGUARDANDO_CRIACAO_GL, transicao: GERAR_GL, solucao: S_LL, area_owner_id: PROV , area_from_id: null },// 42778 // 00037 Alteração Fluxo Encaminhamento PROV
  //  { de: AGUARDANDO_E2E , para: AGUARDANDO_CRIACAO_GL, transicao: GERAR_GL, solucao: S_MUX, area_owner_id: PROV , area_from_id: null },// 42778 // 00037 Alteração Fluxo Encaminhamento PROV
  //  { de: AGUARDANDO_E2E , para: AGUARDANDO_CRIACAO_GL, transicao: GERAR_GL, solucao: S_BBIP, area_owner_id: PROV , area_from_id: null },// 42778 // 00037 Alteração Fluxo Encaminhamento PROV
  //  { de: AGUARDANDO_E2E , para: AGUARDANDO_CRIACAO_GL, transicao: GERAR_GL, solucao: S_FACI, area_owner_id: PROV , area_from_id: null },// 42778 // 00037 Alteração Fluxo Encaminhamento PROV

  {
    de: AGUARDANDO_CONFIGURACAO,
    para: EM_CONFIGURACAO,
    transicao: CONFIGURAR,
    solucao: S_MW,
    area_owner_id: PROV,
    area_from_id: null
  }, // 46850
  //  { de: AGUARDANDO_CONFIGURACAO , para: AGUARDANDO_CRIACAO_GL, transicao: GERAR_GL, solucao: S_MW, area_owner_id: PROV , area_from_id: null }, // 46850 // 00037 Alteração Fluxo Encaminhamento PROV

  {
    de: AGUARDANDO_MSE,
    para: EM_CONFIGURACAO,
    transicao: CONFIGURAR,
    solucao: S_MW,
    area_owner_id: PROV,
    area_from_id: null
  }, // 46850
  //  { de: AGUARDANDO_MSE , para: AGUARDANDO_CRIACAO_GL, transicao: GERAR_GL, solucao: S_MW, area_owner_id: PROV , area_from_id: null }, // 46850 // 00037 Alteração Fluxo Encaminhamento PROV

  {
    de: AGUARDANDO_E2E,
    para: EM_CONFIGURACAO,
    transicao: CONFIGURAR,
    solucao: S_MW,
    area_owner_id: PROV,
    area_from_id: null
  }, // 42778
  {
    de: AGUARDANDO_E2E,
    para: EM_CONFIGURACAO,
    transicao: CONFIGURAR,
    solucao: S_SAT,
    area_owner_id: PROV,
    area_from_id: null
  }, // 42778
  {
    de: AGUARDANDO_E2E,
    para: EM_CONFIGURACAO,
    transicao: CONFIGURAR,
    solucao: S_LL,
    area_owner_id: PROV,
    area_from_id: null
  }, // 42778
  {
    de: AGUARDANDO_E2E,
    para: EM_CONFIGURACAO,
    transicao: CONFIGURAR,
    solucao: S_MUX,
    area_owner_id: PROV,
    area_from_id: null
  }, // 42778
  {
    de: AGUARDANDO_E2E,
    para: EM_CONFIGURACAO,
    transicao: CONFIGURAR,
    solucao: S_BBIP,
    area_owner_id: PROV,
    area_from_id: null
  }, // 42778
  {
    de: AGUARDANDO_E2E,
    para: EM_CONFIGURACAO,
    transicao: CONFIGURAR,
    solucao: S_FACI,
    area_owner_id: PROV,
    area_from_id: null
  }, // 42778

  {
    de: SOLICITADO,
    para: EM_CONFIGURACAO,
    transicao: CONFIGURAR,
    solucao: S_MW,
    area_owner_id: PROV,
    area_from_id: null
  }, // 45816
  //  { de: SOLICITADO , para: AGUARDANDO_CRIACAO_GL, transicao: GERAR_GL, solucao: S_MW, area_owner_id: PROV , area_from_id: null }, // 45816 // 00037 Alteração Fluxo Encaminhamento PROV

  // Devolver de prov para pim E2E // 4277
  {
    de: EM_CONFIGURACAO,
    para: AGUARDANDO_E2E,
    transicao: DEVOLVER_CONFIG_IMPLEMENTACAO_E2E,
    solucao: S_MW,
    area_owner_id: PIM_E2E,
    area_from_id: null
  }, // 42778
  {
    de: EM_CONFIGURACAO,
    para: AGUARDANDO_E2E,
    transicao: DEVOLVER_CONFIG_IMPLEMENTACAO_E2E,
    solucao: S_SAT,
    area_owner_id: PIM_E2E,
    area_from_id: null
  }, // 42778
  {
    de: EM_CONFIGURACAO,
    para: AGUARDANDO_E2E,
    transicao: DEVOLVER_CONFIG_IMPLEMENTACAO_E2E,
    solucao: S_LL,
    area_owner_id: PIM_E2E,
    area_from_id: null
  }, // 42778
  {
    de: EM_CONFIGURACAO,
    para: AGUARDANDO_E2E,
    transicao: DEVOLVER_CONFIG_IMPLEMENTACAO_E2E,
    solucao: S_MUX,
    area_owner_id: PIM_E2E,
    area_from_id: null
  }, // 42778
  {
    de: EM_CONFIGURACAO,
    para: AGUARDANDO_E2E,
    transicao: DEVOLVER_CONFIG_IMPLEMENTACAO_E2E,
    solucao: S_BBIP,
    area_owner_id: PIM_E2E,
    area_from_id: null
  }, // 42778
  {
    de: EM_CONFIGURACAO,
    para: AGUARDANDO_E2E,
    transicao: DEVOLVER_CONFIG_IMPLEMENTACAO_E2E,
    solucao: S_FACI,
    area_owner_id: PIM_E2E,
    area_from_id: null
  }, // 42778

  //  Associar prov
  {
    de: EM_CONFIGURACAO,
    para: EM_CONFIGURACAO,
    transicao: ASSOCIAR_PROV,
    solucao: S_MW,
    area_owner_id: PROV,
    area_from_id: null
  }, // 42778
  {
    de: EM_CONFIGURACAO,
    para: EM_CONFIGURACAO,
    transicao: ASSOCIAR_PROV,
    solucao: S_SAT,
    area_owner_id: PROV,
    area_from_id: null
  }, // 42778
  {
    de: EM_CONFIGURACAO,
    para: EM_CONFIGURACAO,
    transicao: ASSOCIAR_PROV,
    solucao: S_LL,
    area_owner_id: PROV,
    area_from_id: null
  }, // 42778
  {
    de: EM_CONFIGURACAO,
    para: EM_CONFIGURACAO,
    transicao: ASSOCIAR_PROV,
    solucao: S_MUX,
    area_owner_id: PROV,
    area_from_id: null
  }, // 42778
  {
    de: EM_CONFIGURACAO,
    para: EM_CONFIGURACAO,
    transicao: ASSOCIAR_PROV,
    solucao: S_BBIP,
    area_owner_id: PROV,
    area_from_id: null
  }, // 42778
  {
    de: EM_CONFIGURACAO,
    para: EM_CONFIGURACAO,
    transicao: ASSOCIAR_PROV,
    solucao: S_FACI,
    area_owner_id: PROV,
    area_from_id: null
  }, // 42778

  // Concluir Configuracao em Prov
  {
    de: EM_CONFIGURACAO,
    para: CONFIGURADO,
    transicao: CONCLUIR_CONFIGURACAO,
    solucao: S_MW,
    area_owner_id: PIM_E2E,
    area_from_id: null
  }, // 42778
  {
    de: EM_CONFIGURACAO,
    para: CONFIGURADO,
    transicao: CONCLUIR_CONFIGURACAO,
    solucao: S_SAT,
    area_owner_id: PIM_E2E,
    area_from_id: null
  }, // 42778
  {
    de: EM_CONFIGURACAO,
    para: CONFIGURADO,
    transicao: CONCLUIR_CONFIGURACAO,
    solucao: S_LL,
    area_owner_id: PIM_E2E,
    area_from_id: null
  }, // 42778
  {
    de: EM_CONFIGURACAO,
    para: CONFIGURADO,
    transicao: CONCLUIR_CONFIGURACAO,
    solucao: S_MUX,
    area_owner_id: PIM_E2E,
    area_from_id: null
  }, // 42778
  {
    de: EM_CONFIGURACAO,
    para: CONFIGURADO,
    transicao: CONCLUIR_CONFIGURACAO,
    solucao: S_BBIP,
    area_owner_id: PIM_E2E,
    area_from_id: null
  }, // 42778
  {
    de: EM_CONFIGURACAO,
    para: CONFIGURADO,
    transicao: CONCLUIR_CONFIGURACAO,
    solucao: S_FACI,
    area_owner_id: PIM_E2E,
    area_from_id: null
  }, // 42778

  // Concluir Configuracao em PIM PIM_E2E
  {
    de: CONFIGURADO,
    para: CONCLUIDO,
    transicao: CONCLUIR,
    solucao: S_MW,
    area_owner_id: null,
    area_from_id: null
  }, // 42778
  {
    de: CONFIGURADO,
    para: CONCLUIDO,
    transicao: CONCLUIR,
    solucao: S_SAT,
    area_owner_id: null,
    area_from_id: null
  }, // 42778
  {
    de: CONFIGURADO,
    para: CONCLUIDO,
    transicao: CONCLUIR,
    solucao: S_LL,
    area_owner_id: null,
    area_from_id: null
  }, // 42778
  {
    de: CONFIGURADO,
    para: CONCLUIDO,
    transicao: CONCLUIR,
    solucao: S_MUX,
    area_owner_id: null,
    area_from_id: null
  }, // 42778
  {
    de: CONFIGURADO,
    para: CONCLUIDO,
    transicao: CONCLUIR,
    solucao: S_BBIP,
    area_owner_id: null,
    area_from_id: null
  }, // 42778
  {
    de: CONFIGURADO,
    para: CONCLUIDO,
    transicao: CONCLUIR,
    solucao: S_FACI,
    area_owner_id: null,
    area_from_id: null
  }, // 42778

  // Devolver Configuracao
  {
    de: CONFIGURADO,
    para: EM_CONFIGURACAO,
    transicao: DEVOLVER_CONFIGURACAO,
    solucao: S_MW,
    area_owner_id: PROV,
    area_from_id: null
  }, // 42778
  {
    de: CONFIGURADO,
    para: EM_CONFIGURACAO,
    transicao: DEVOLVER_CONFIGURACAO,
    solucao: S_SAT,
    area_owner_id: PROV,
    area_from_id: null
  }, // 42778
  {
    de: CONFIGURADO,
    para: EM_CONFIGURACAO,
    transicao: DEVOLVER_CONFIGURACAO,
    solucao: S_LL,
    area_owner_id: PROV,
    area_from_id: null
  }, // 42778
  {
    de: CONFIGURADO,
    para: EM_CONFIGURACAO,
    transicao: DEVOLVER_CONFIGURACAO,
    solucao: S_MUX,
    area_owner_id: PROV,
    area_from_id: null
  }, // 42778
  {
    de: CONFIGURADO,
    para: EM_CONFIGURACAO,
    transicao: DEVOLVER_CONFIGURACAO,
    solucao: S_BBIP,
    area_owner_id: PROV,
    area_from_id: null
  }, // 42778
  {
    de: CONFIGURADO,
    para: EM_CONFIGURACAO,
    transicao: DEVOLVER_CONFIGURACAO,
    solucao: S_FACI,
    area_owner_id: PROV,
    area_from_id: null
  }, // 42778

  // Concluir Segmento
  {
    de: AGUARDANDO_E2E,
    para: CONCLUIDO,
    transicao: CONCLUIR,
    solucao: S_MUX,
    area_owner_id: null,
    area_from_id: null
  }, // 42778
  {
    de: AGUARDANDO_E2E,
    para: CONCLUIDO,
    transicao: CONCLUIR,
    solucao: S_BBIP,
    area_owner_id: null,
    area_from_id: null
  }, // 42778
  {
    de: AGUARDANDO_E2E,
    para: CONCLUIDO,
    transicao: CONCLUIR,
    solucao: S_FACI,
    area_owner_id: null,
    area_from_id: null
  }, // 42778

  //  Devolver ao posto --------------------------------------------------------------------------------------------

  {
    de: AGUARDANDO_E2E,
    para: IMPLANTACAO_FIBER,
    transicao: DEVOLVER_E2E,
    solucao: S_FACI_OTN,
    area_owner_id: FIBER,
    area_from_id: null
  },
  {
    de: AGUARDANDO_E2E,
    para: SOLICITADO,
    transicao: DEVOLVER_E2E,
    solucao: S_MW,
    area_owner_id: PIM_MW,
    area_from_id: null
  },
  {
    de: AGUARDANDO_E2E,
    para: SOLICITADO,
    transicao: DEVOLVER_E2E,
    solucao: S_SAT,
    area_owner_id: PIM_SAT,
    area_from_id: null
  },
  {
    de: AGUARDANDO_E2E,
    para: SOLICITADO,
    transicao: DEVOLVER_E2E,
    solucao: S_FACI_OTN,
    area_owner_id: FNIM,
    area_from_id: null
  },
  {
    de: AGUARDANDO_E2E,
    para: SOLICITADO,
    transicao: DEVOLVER_E2E,
    solucao: S_FACI_OTN,
    area_owner_id: BONE,
    area_from_id: null
  }, // 18012

  {
    de: AGUARDANDO_E2E,
    para: CONFIGURADO,
    transicao: DEVOLVER_E2E,
    solucao: S_FACI_OTN,
    area_owner_id: FNIM,
    area_from_id: null
  },

  {
    de: AGUARDANDO_E2E,
    para: EM_CONFIGURACAO,
    transicao: DEVOLVER_E2E,
    solucao: S_MW,
    area_owner_id: PIM_MW,
    area_from_id: null
  },
  {
    de: AGUARDANDO_E2E,
    para: EM_CONFIGURACAO,
    transicao: DEVOLVER_E2E,
    solucao: S_LL,
    area_owner_id: PIM_MW,
    area_from_id: null
  },
  {
    de: AGUARDANDO_E2E,
    para: EM_CONFIGURACAO,
    transicao: DEVOLVER_E2E,
    solucao: S_FACI_OTN,
    area_owner_id: FNIM,
    area_from_id: null
  },

  {
    de: AGUARDANDO_E2E,
    para: AGUARDANDO_MUX,
    transicao: DEVOLVER_E2E,
    solucao: S_MUX,
    area_owner_id: MSE,
    area_from_id: null
  }, // 42487
  {
    de: AGUARDANDO_E2E,
    para: AGUARDANDO_MUX,
    transicao: DEVOLVER_E2E,
    solucao: S_MUX,
    area_owner_id: MUX,
    area_from_id: null
  }, // 42487

  {
    de: SOLICITADO,
    para: AGUARDANDO_MSE,
    transicao: DEVOLVER_E2E,
    solucao: S_MW,
    area_owner_id: MSE,
    area_from_id: null
  }, // 45816

  //  fim 7288

  // // // // // // // // // // // // // // // // // // // // // // // //  Novo Flow de Cancelamento  // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //

  {
    de: EM_CONFIGURACAO,
    para: AGUARDANDO_CANCELAMENTO_EM_CONFIGURACAO,
    transicao: SOLICITAR_CANCELAMENTO,
    solucao: S_FACI_OTN,
    area_owner_id: PROV,
    area_from_id: null
  },
  {
    de: EM_CONFIGURACAO,
    para: AGUARDANDO_CANCELAMENTO_EM_CONFIGURACAO,
    transicao: SOLICITAR_CANCELAMENTO,
    solucao: S_FACI_OTN,
    area_owner_id: FACILITY_ONE,
    area_from_id: null
  },
  {
    de: EM_CONFIGURACAO,
    para: AGUARDANDO_CANCELAMENTO_EM_CONFIGURACAO,
    transicao: SOLICITAR_CANCELAMENTO,
    solucao: S_FACI_BACK,
    area_owner_id: PIM_MW,
    area_from_id: null
  },
  {
    de: EM_CONFIGURACAO,
    para: AGUARDANDO_CANCELAMENTO_EM_CONFIGURACAO,
    transicao: SOLICITAR_CANCELAMENTO,
    solucao: S_LL,
    area_owner_id: FACILITY_LL,
    area_from_id: null
  },

  {
    de: SOLICITADO,
    para: AGUARDANDO_CANCELAMENTO_EM_CONFIGURACAO,
    transicao: SOLICITAR_CANCELAMENTO,
    solucao: S_FACI_OTN,
    area_owner_id: FNIM,
    area_from_id: null
  },
  {
    de: SOLICITADO,
    para: AGUARDANDO_CANCELAMENTO,
    transicao: SOLICITAR_CANCELAMENTO,
    solucao: S_FACI_BACK,
    area_owner_id: PIM_MW,
    area_from_id: null
  },
  {
    de: SOLICITADO,
    para: AGUARDANDO_CANCELAMENTO,
    transicao: SOLICITAR_CANCELAMENTO,
    solucao: S_LL,
    area_owner_id: TEF,
    area_from_id: null
  },
  {
    de: SOLICITADO,
    para: AGUARDANDO_CANCELAMENTO,
    transicao: SOLICITAR_CANCELAMENTO,
    solucao: S_MUX,
    area_owner_id: MUX,
    area_from_id: null
  },
  {
    de: SOLICITADO,
    para: AGUARDANDO_CANCELAMENTO,
    transicao: SOLICITAR_CANCELAMENTO,
    solucao: S_SAT,
    area_owner_id: PIM_SAT,
    area_from_id: null
  },

  {
    de: CONFIGURADO,
    para: AGUARDANDO_CANCELAMENTO_CONFIGURADO,
    transicao: SOLICITAR_CANCELAMENTO,
    solucao: S_FACI_OTN,
    area_owner_id: FNIM,
    area_from_id: null
  },

  {
    de: IMPLANTACAO_FIBER,
    para: AGUARDANDO_CANCELAMENTO,
    transicao: SOLICITAR_CANCELAMENTO,
    solucao: S_FACI_OTN,
    area_owner_id: FIBER,
    area_from_id: null
  },

  {
    de: AGUARDANDO_BONE,
    para: AGUARDANDO_CANCELAMENTO,
    transicao: SOLICITAR_CANCELAMENTO,
    solucao: S_FACI_OTN,
    area_owner_id: BONE,
    area_from_id: null
  },
  {
    de: AGUARDANDO_ONE,
    para: AGUARDANDO_CANCELAMENTO,
    transicao: SOLICITAR_CANCELAMENTO,
    solucao: S_FACI_OTN,
    area_owner_id: ONE,
    area_from_id: null
  },
  {
    de: AGUARDANDO_RSE,
    para: AGUARDANDO_CANCELAMENTO,
    transicao: SOLICITAR_CANCELAMENTO,
    solucao: S_FACI_OTN,
    area_owner_id: RSE,
    area_from_id: null
  },
  {
    de: AGUARDANDO_PROV,
    para: AGUARDANDO_CANCELAMENTO,
    transicao: SOLICITAR_CANCELAMENTO,
    solucao: S_FACI_OTN,
    area_owner_id: PROV,
    area_from_id: null
  },
  {
    de: AGUARDANDO_MSE,
    para: AGUARDANDO_CANCELAMENTO,
    transicao: SOLICITAR_CANCELAMENTO,
    solucao: S_FACI_BACK,
    area_owner_id: MSE,
    area_from_id: null
  },
  {
    de: AGUARDANDO_TEF,
    para: AGUARDANDO_CANCELAMENTO,
    transicao: SOLICITAR_CANCELAMENTO,
    solucao: S_LL,
    area_owner_id: TEF,
    area_from_id: null
  },
  {
    de: AGUARDANDO_NFE,
    para: AGUARDANDO_CANCELAMENTO,
    transicao: SOLICITAR_CANCELAMENTO,
    solucao: null,
    area_owner_id: NFE,
    area_from_id: null
  },
  {
    de: AGUARDANDO_MUX,
    para: AGUARDANDO_CANCELAMENTO,
    transicao: SOLICITAR_CANCELAMENTO,
    solucao: S_MUX,
    area_owner_id: MUX,
    area_from_id: null
  },
  {
    de: AGUARDANDO_SAT,
    para: AGUARDANDO_CANCELAMENTO,
    transicao: SOLICITAR_CANCELAMENTO,
    solucao: S_SAT,
    area_owner_id: SAT,
    area_from_id: null
  },

  {
    de: AGUARDANDO_CANCELAMENTO,
    para: AGUARDANDO_CANCELAMENTO,
    transicao: CONFIRMAR_CANCELAMENTO,
    solucao: S_FACI_OTN,
    area_owner_id: RSE,
    area_from_id: FIBER
  },
  {
    de: AGUARDANDO_CANCELAMENTO,
    para: AGUARDANDO_CANCELAMENTO,
    transicao: CONFIRMAR_CANCELAMENTO,
    solucao: S_FACI_OTN,
    area_owner_id: BONE,
    area_from_id: RSE
  },
  {
    de: AGUARDANDO_CANCELAMENTO,
    para: AGUARDANDO_CANCELAMENTO,
    transicao: CONFIRMAR_CANCELAMENTO,
    solucao: S_FACI_OTN,
    area_owner_id: ONE,
    area_from_id: RSE
  },
  {
    de: AGUARDANDO_CANCELAMENTO,
    para: AGUARDANDO_CANCELAMENTO,
    transicao: CONFIRMAR_CANCELAMENTO,
    solucao: S_FACI_OTN,
    area_owner_id: NFE,
    area_from_id: PROV
  },
  {
    de: AGUARDANDO_CANCELAMENTO,
    para: AGUARDANDO_CANCELAMENTO,
    transicao: CONFIRMAR_CANCELAMENTO,
    solucao: S_FACI_OTN,
    area_owner_id: BONE,
    area_from_id: FNIM
  },
  {
    de: AGUARDANDO_CANCELAMENTO,
    para: AGUARDANDO_CANCELAMENTO,
    transicao: CONFIRMAR_CANCELAMENTO,
    solucao: S_FACI_OTN,
    area_owner_id: NFE,
    area_from_id: BONE
  },
  {
    de: AGUARDANDO_CANCELAMENTO,
    para: AGUARDANDO_CANCELAMENTO,
    transicao: CONFIRMAR_CANCELAMENTO,
    solucao: S_FACI_OTN,
    area_owner_id: ONE,
    area_from_id: FNIM
  },
  {
    de: AGUARDANDO_CANCELAMENTO,
    para: AGUARDANDO_CANCELAMENTO,
    transicao: CONFIRMAR_CANCELAMENTO,
    solucao: S_FACI_OTN,
    area_owner_id: NFE,
    area_from_id: ONE
  },
  {
    de: AGUARDANDO_CANCELAMENTO,
    para: AGUARDANDO_CANCELAMENTO,
    transicao: CONFIRMAR_CANCELAMENTO,
    solucao: S_FACI_BACK,
    area_owner_id: MSE,
    area_from_id: PIM_MW
  },
  {
    de: AGUARDANDO_CANCELAMENTO,
    para: AGUARDANDO_CANCELAMENTO,
    transicao: CONFIRMAR_CANCELAMENTO,
    solucao: S_FACI_BACK,
    area_owner_id: NFE,
    area_from_id: MSE
  },
  {
    de: AGUARDANDO_CANCELAMENTO,
    para: AGUARDANDO_CANCELAMENTO,
    transicao: CONFIRMAR_CANCELAMENTO,
    solucao: S_LL,
    area_owner_id: NFE,
    area_from_id: PIM_LL
  },
  {
    de: AGUARDANDO_CANCELAMENTO,
    para: CANCELADA,
    transicao: CONFIRMAR_CANCELAMENTO,
    solucao: S_LL,
    area_owner_id: NFE,
    area_from_id: TEF
  },
  {
    de: AGUARDANDO_CANCELAMENTO,
    para: AGUARDANDO_CANCELAMENTO,
    transicao: CONFIRMAR_CANCELAMENTO,
    solucao: S_MUX,
    area_owner_id: NFE,
    area_from_id: MUX
  },
  {
    de: AGUARDANDO_CANCELAMENTO,
    para: AGUARDANDO_CANCELAMENTO,
    transicao: CONFIRMAR_CANCELAMENTO,
    solucao: S_BBIP,
    area_owner_id: NFE,
    area_from_id: BBIP
  },
  {
    de: AGUARDANDO_CANCELAMENTO,
    para: AGUARDANDO_CANCELAMENTO,
    transicao: CONFIRMAR_CANCELAMENTO,
    solucao: S_SAT,
    area_owner_id: SAT,
    area_from_id: PIM_SAT
  },
  {
    de: AGUARDANDO_CANCELAMENTO,
    para: AGUARDANDO_CANCELAMENTO,
    transicao: CONFIRMAR_CANCELAMENTO,
    solucao: S_SAT,
    area_owner_id: NFE,
    area_from_id: SAT
  },

  {
    de: AGUARDANDO_CANCELAMENTO,
    para: AGUARDANDO_CANCELAMENTO,
    transicao: CONFIRMAR_CANCELAMENTO,
    solucao: null,
    area_owner_id: NFE,
    area_from_id: null
  },

  {
    de: AGUARDANDO_CANCELAMENTO,
    para: CANCELADA,
    transicao: CONFIRMAR_CANCELAMENTO_AREA_ABRIU,
    solucao: null,
    area_owner_id: null,
    area_from_id: null
  },

  {
    de: AGUARDANDO_CANCELAMENTO_CONFIGURADO,
    para: AGUARDANDO_CANCELAMENTO_CONFIGURADO,
    transicao: CONFIRMAR_CANCELAMENTO_CONF,
    solucao: S_FACI_OTN,
    area_owner_id: PROV,
    area_from_id: FNIM
  },
  {
    de: AGUARDANDO_CANCELAMENTO_CONFIGURADO,
    para: AGUARDANDO_CANCELAMENTO,
    transicao: CONFIRMAR_CANCELAMENTO_CONF,
    solucao: S_FACI_OTN,
    area_owner_id: BONE,
    area_from_id: PROV
  },
  {
    de: AGUARDANDO_CANCELAMENTO_CONFIGURADO,
    para: AGUARDANDO_CANCELAMENTO,
    transicao: CONFIRMAR_CANCELAMENTO_CONF,
    solucao: S_FACI_OTN,
    area_owner_id: ONE,
    area_from_id: PROV
  },

  {
    de: AGUARDANDO_CANCELAMENTO_EM_CONFIGURACAO,
    para: AGUARDANDO_CANCELAMENTO,
    transicao: CONFIRMAR_CANCELAMENTO_EM_CONF,
    solucao: S_MW,
    area_owner_id: NFE,
    area_from_id: PIM_MW
  },
  {
    de: AGUARDANDO_CANCELAMENTO_EM_CONFIGURACAO,
    para: AGUARDANDO_CANCELAMENTO,
    transicao: CONFIRMAR_CANCELAMENTO_EM_CONF,
    solucao: S_LL,
    area_owner_id: NFE,
    area_from_id: FACILITY_LL
  },
  {
    de: AGUARDANDO_CANCELAMENTO_EM_CONFIGURACAO,
    para: AGUARDANDO_CANCELAMENTO,
    transicao: CONFIRMAR_CANCELAMENTO_EM_CONF,
    solucao: S_FACI_OTN,
    area_owner_id: NFE,
    area_from_id: FACILITY_ONE
  },
  {
    de: AGUARDANDO_CANCELAMENTO_EM_CONFIGURACAO,
    para: AGUARDANDO_CANCELAMENTO_EM_CONFIGURACAO,
    transicao: CONFIRMAR_CANCELAMENTO_EM_CONF,
    solucao: S_FACI_OTN,
    area_owner_id: FNIM,
    area_from_id: PROV
  },
  {
    de: AGUARDANDO_CANCELAMENTO_EM_CONFIGURACAO,
    para: AGUARDANDO_CANCELAMENTO,
    transicao: CONFIRMAR_CANCELAMENTO_EM_CONF,
    solucao: S_FACI_OTN,
    area_owner_id: ONE,
    area_from_id: FNIM
  },

  {
    de: CONCLUIDO,
    para: EM_FALLBACK,
    transicao: SOLICITAR_FALLBACK,
    solucao: null,
    area_owner_id: null,
    area_from_id: null
  },
  {
    de: EM_FALLBACK,
    para: FALLBACK,
    transicao: CONFIRMAR_FALLBACK,
    solucao: null,
    area_owner_id: NFE,
    area_from_id: null
  },

  {
    de: SOLICITADO,
    para: AGUARDANDO_TEF,
    transicao: ADD_JUMPER,
    solucao: null,
    area_owner_id: TEF,
    area_from_id: null
  },
  {
    de: CONCLUIDO,
    para: AGUARDANDO_TEF,
    transicao: ADD_JUMPER,
    solucao: null,
    area_owner_id: TEF,
    area_from_id: null
  },
  // // // // // // // // // // // // // // // // // // // // // // // //  Novo Flow de Cancelamento // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //

  // // // // // // // // // // // // // // // // // // // // // // // //  Novo Flow de REVISAO  // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
  // PROV
  {
    de: EM_CONFIGURACAO,
    para: AGUARDANDO_REVISAO,
    transicao: SOLICITAR_REVISAO,
    solucao: S_FACI_OTN,
    area_owner_id: BONE,
    area_from_id: null
  },
  {
    de: EM_CONFIGURACAO,
    para: AGUARDANDO_REVISAO,
    transicao: SOLICITAR_REVISAO,
    solucao: S_MW,
    area_owner_id: MSE,
    area_from_id: null
  },
  {
    de: EM_CONFIGURACAO,
    para: AGUARDANDO_REVISAO,
    transicao: SOLICITAR_REVISAO,
    solucao: S_MUX,
    area_owner_id: MSE,
    area_from_id: null
  },
  {
    de: EM_CONFIGURACAO,
    para: AGUARDANDO_REVISAO,
    transicao: SOLICITAR_REVISAO_MUX,
    solucao: S_MUX,
    area_owner_id: MUX,
    area_from_id: null
  },
  {
    de: EM_CONFIGURACAO,
    para: AGUARDANDO_REVISAO,
    transicao: SOLICITAR_REVISAO,
    solucao: S_MUX,
    area_owner_id: MUX,
    area_from_id: null
  },
  {
    de: EM_CONFIGURACAO,
    para: AGUARDANDO_REVISAO,
    transicao: SOLICITAR_REVISAO_E2E,
    solucao: S_FACI_OTN,
    area_owner_id: PIM_E2E,
    area_from_id: null
  },
  {
    de: EM_CONFIGURACAO,
    para: AGUARDANDO_REVISAO,
    transicao: SOLICITAR_REVISAO,
    solucao: S_MW,
    area_owner_id: PIM_E2E,
    area_from_id: null
  },
  {
    de: EM_CONFIGURACAO,
    para: AGUARDANDO_REVISAO,
    transicao: SOLICITAR_REVISAO,
    solucao: S_MUX,
    area_owner_id: PIM_E2E,
    area_from_id: null
  },
  // PIM_E2E
  {
    de: AGUARDANDO_E2E,
    para: AGUARDANDO_REVISAO,
    transicao: SOLICITAR_REVISAO_BONE,
    solucao: S_FACI_OTN,
    area_owner_id: BONE,
    area_from_id: null
  },
  {
    de: AGUARDANDO_E2E,
    para: AGUARDANDO_REVISAO,
    transicao: SOLICITAR_REVISAO_FNIM,
    solucao: S_FACI_OTN,
    area_owner_id: FNIM,
    area_from_id: null
  },
  {
    de: AGUARDANDO_E2E,
    para: AGUARDANDO_REVISAO,
    transicao: SOLICITAR_REVISAO,
    solucao: S_MW,
    area_owner_id: MSE,
    area_from_id: null
  },
  {
    de: AGUARDANDO_E2E,
    para: AGUARDANDO_REVISAO,
    transicao: SOLICITAR_REVISAO,
    solucao: S_LL,
    area_owner_id: PIM_MW,
    area_from_id: null
  },
  {
    de: AGUARDANDO_E2E,
    para: AGUARDANDO_REVISAO,
    transicao: SOLICITAR_REVISAO,
    solucao: S_MUX,
    area_owner_id: MSE,
    area_from_id: null
  },
  {
    de: AGUARDANDO_E2E,
    para: AGUARDANDO_REVISAO,
    transicao: SOLICITAR_REVISAO_MUX,
    solucao: S_MUX,
    area_owner_id: MUX,
    area_from_id: null
  },
  {
    de: AGUARDANDO_REVISAO,
    para: AGUARDANDO_REVISAO,
    transicao: SOLICITAR_REVISAO,
    solucao: S_MW,
    area_owner_id: MSE,
    area_from_id: null
  },
  {
    de: AGUARDANDO_REVISAO,
    para: AGUARDANDO_REVISAO,
    transicao: SOLICITAR_REVISAO,
    solucao: S_MW,
    area_owner_id: MSE,
    area_from_id: null
  },
  // FNIM
  {
    de: SOLICITADO,
    para: AGUARDANDO_REVISAO,
    transicao: SOLICITAR_REVISAO_BONE,
    solucao: S_FACI_OTN,
    area_owner_id: BONE,
    area_from_id: null
  },
  {
    de: SOLICITADO,
    para: AGUARDANDO_REVISAO,
    transicao: SOLICITAR_REVISAO_ONE,
    solucao: S_FACI_OTN,
    area_owner_id: ONE,
    area_from_id: null
  },
  {
    de: AGUARDANDO_REVISAO,
    para: AGUARDANDO_REVISAO,
    transicao: SOLICITAR_REVISAO_BONE,
    solucao: S_FACI_OTN,
    area_owner_id: BONE,
    area_from_id: null
  },
  {
    de: AGUARDANDO_REVISAO,
    para: AGUARDANDO_REVISAO,
    transicao: SOLICITAR_REVISAO_ONE,
    solucao: S_FACI_OTN,
    area_owner_id: ONE,
    area_from_id: null
  },

  // INVIAVEL
  {
    de: AGUARDANDO_REVISAO,
    para: INVIAVEL,
    transicao: INVIABILIZAR,
    solucao: S_FACI_OTN,
    area_owner_id: ONE,
    area_from_id: null
  },
  {
    de: AGUARDANDO_REVISAO,
    para: INVIAVEL,
    transicao: INVIABILIZAR,
    solucao: S_FACI_OTN,
    area_owner_id: BONE,
    area_from_id: null
  },
  {
    de: AGUARDANDO_REVISAO,
    para: INVIAVEL,
    transicao: INVIABILIZAR,
    solucao: S_FACI_OTN,
    area_owner_id: FNIM,
    area_from_id: null
  },
  {
    de: AGUARDANDO_REVISAO,
    para: INVIAVEL,
    transicao: INVIABILIZAR,
    solucao: S_FACI_OTN,
    area_owner_id: PIM_E2E,
    area_from_id: null
  },
  {
    de: AGUARDANDO_REVISAO,
    para: INVIAVEL,
    transicao: INVIABILIZAR,
    solucao: S_MW,
    area_owner_id: PIM_E2E,
    area_from_id: null
  },
  {
    de: AGUARDANDO_REVISAO,
    para: INVIAVEL,
    transicao: INVIABILIZAR,
    solucao: S_MUX,
    area_owner_id: PIM_E2E,
    area_from_id: null
  },
  {
    de: AGUARDANDO_REVISAO,
    para: INVIAVEL,
    transicao: INVIABILIZAR,
    solucao: S_MW,
    area_owner_id: MSE,
    area_from_id: null
  },
  {
    de: AGUARDANDO_REVISAO,
    para: INVIAVEL,
    transicao: INVIABILIZAR,
    solucao: S_MUX,
    area_owner_id: MSE,
    area_from_id: null
  },

  // SOLICITAR DE AG. REVISAO
  {
    de: AGUARDANDO_REVISAO,
    para: SOLICITADO,
    transicao: SOLICITAR,
    solucao: S_FACI_OTN,
    area_owner_id: FNIM,
    area_from_id: null
  },
  {
    de: AGUARDANDO_REVISAO,
    para: SOLICITADO,
    transicao: SOLICITAR,
    solucao: S_FACI_OTN,
    area_owner_id: PIM_E2E,
    area_from_id: null
  }, // 18012

  // DEVOLVER
  {
    de: AGUARDANDO_REVISAO,
    para: AG_OTNP_PROJETO,
    transicao: DEVOLVER_OTNP,
    solucao: S_FACI_OTN,
    area_owner_id: TN_OTNP,
    area_from_id: null
  },
  {
    de: AGUARDANDO_REVISAO,
    para: AG_OTNP_PROJETO,
    transicao: DEVOLVER_ENGENHARIA,
    solucao: S_FACI_OTN,
    area_owner_id: TN_OTNP,
    area_from_id: null
  },

  {
    de: AGUARDANDO_REVISAO,
    para: AGUARDANDO_MUX,
    transicao: DEVOLVER_E2E,
    solucao: S_MUX,
    area_owner_id: MSE,
    area_from_id: null
  }, // 42487

  {
    de: AGUARDANDO_REVISAO,
    para: IMPLANTACAO_FIBER,
    transicao: DEVOLVER_E2E,
    solucao: S_FACI_OTN,
    area_owner_id: FIBER,
    area_from_id: null
  },
  {
    de: AGUARDANDO_REVISAO,
    para: EM_CONFIGURACAO,
    transicao: DEVOLVER_E2E,
    solucao: S_FACI_OTN,
    area_owner_id: FNIM,
    area_from_id: null
  },

  {
    de: AGUARDANDO_REVISAO,
    para: EM_CONFIGURACAO,
    transicao: DEVOLVER_E2E,
    solucao: S_MW,
    area_owner_id: PIM_MW,
    area_from_id: null
  },

  {
    de: AGUARDANDO_REVISAO,
    para: AGUARDANDO_NFE,
    transicao: DEVOLVER_CONFIG_ENGENHARIA,
    solucao: S_MW,
    area_owner_id: NFE,
    area_from_id: null
  }, // 46376

  // CONFIGURAR
  {
    de: AGUARDANDO_REVISAO,
    para: EM_CONFIGURACAO,
    transicao: CONFIGURAR,
    solucao: S_FACI_OTN,
    area_owner_id: PROV,
    area_from_id: null
  },
  {
    de: AGUARDANDO_REVISAO,
    para: EM_CONFIGURACAO,
    transicao: CONFIGURAR,
    solucao: S_MW,
    area_owner_id: PROV,
    area_from_id: null
  },
  {
    de: AGUARDANDO_REVISAO,
    para: EM_CONFIGURACAO,
    transicao: CONFIGURAR,
    solucao: S_MUX,
    area_owner_id: PROV,
    area_from_id: null
  },
  {
    de: AGUARDANDO_REVISAO,
    para: EM_CONFIGURACAO,
    transicao: CONFIGURAR,
    solucao: S_MUX,
    area_owner_id: PROV,
    area_from_id: null
  }
  //  { de: AGUARDANDO_REVISAO , para: EM_CONFIGURACAO, transicao: GERAR_GL, solucao: S_FACI_OTN, area_owner_id: PROV , area_from_id: null },// 00037 Alteração Fluxo Encaminhamento PROV
  //  { de: AGUARDANDO_REVISAO , para: EM_CONFIGURACAO, transicao: GERAR_GL, solucao: S_MW, area_owner_id: PROV , area_from_id: null },// 00037 Alteração Fluxo Encaminhamento PROV
  //  { de: AGUARDANDO_REVISAO , para: EM_CONFIGURACAO, transicao: GERAR_GL, solucao: S_MUX, area_owner_id: PROV , area_from_id: null },// 00037 Alteração Fluxo Encaminhamento PROV
  //  { de: AGUARDANDO_REVISAO , para: EM_CONFIGURACAO, transicao: GERAR_GL, solucao: S_MUX, area_owner_id: PROV , area_from_id: null }// 00037 Alteração Fluxo Encaminhamento PROV

  // Sem mapeamento de flow
  // { de: AGUARDANDO_BONE , para: AGUARDANDO_REVISAO , transicao: SOLICITAR_REVISAO , solucao: S_FACI_OTN , area_owner_id: TN_OTNP , area_from_id: null },
  // { de: AGUARDANDO_ONE , para: AGUARDANDO_REVISAO , transicao: SOLICITAR_REVISAO , solucao: S_FACI_OTN , area_owner_id: ONE , area_from_id: null },
  // { de: AGUARDANDO_PROV , para: AGUARDANDO_REVISAO , transicao: SOLICITAR_REVISAO , solucao: S_FACI_OTN , area_owner_id: PROV , area_from_id: null },
  // { de: AGUARDANDO_MSE , para: AGUARDANDO_REVISAO , transicao: SOLICITAR_REVISAO , solucao: S_FACI_BACK , area_owner_id: MSE , area_from_id: null },
  // { de: AGUARDANDO_MUX , para: AGUARDANDO_REVISAO , transicao: SOLICITAR_REVISAO , solucao: S_MUX , area_owner_id: MUX , area_from_id: null },

  // coisa de Milhoner
  // { de:AGUARDANDO_REVISAO, para: SOLICITADO, transicao: SOLICITAR_REVISAO , solucao: S_FACI_OTN , area_owner_id: FNIM , area_from_id: null },
  // { de:AGUARDANDO_REVISAO, para: SOLICITADO, transicao: SOLICITAR_REVISAO , solucao: S_FACI_BACK , area_owner_id: PIM_MW , area_from_id: null },
  // { de:AGUARDANDO_REVISAO, para: SOLICITADO, transicao: SOLICITAR_REVISAO , solucao: S_MUX , area_owner_id: MUX , area_from_id: null },
  // { de:AGUARDANDO_REVISAO, para: SOLICITADO, transicao: SOLICITAR_REVISAO, solucao: S_FACI_OTN, area_owner_id: BONE , area_from_id: null },
  // { de:AGUARDANDO_REVISAO, para: SOLICITADO, transicao: SOLICITAR_REVISAO, solucao: S_FACI_OTN, area_owner_id: ONE , area_from_id: null },
  // { de:AGUARDANDO_REVISAO, para: SOLICITADO, transicao: SOLICITAR_REVISAO, solucao: S_MW, area_owner_id: MSE , area_from_id: null },

  // Coisa do Milhoner
  // { de: AGUARDANDO_E2E , para: IMPLANTACAO_FIBER , transicao: SOLICITAR_REVISAO_E2E, solucao: S_FACI_OTN, area_owner_id: FNIM , area_from_id: null },
  // { de: AGUARDANDO_E2E , para: SOLICITADO, transicao: SOLICITAR_REVISAO_E2E, solucao: S_MW, area_owner_id: PIM_MW , area_from_id: null },
  // { de: AGUARDANDO_E2E , para: SOLICITADO, transicao: SOLICITAR_REVISAO_E2E, solucao: S_MW, area_owner_id: MSE , area_from_id: null },
  // { de: AGUARDANDO_E2E , para: SOLICITADO, transicao: SOLICITAR_REVISAO_E2E, solucao: S_MUX, area_owner_id: MUX , area_from_id: null },
  // { de: AGUARDANDO_E2E , para: SOLICITADO, transicao: SOLICITAR_REVISAO_E2E, solucao: S_FACI_OTN, area_owner_id: FNIM , area_from_id: null },
  // { de: AGUARDANDO_E2E , para: SOLICITADO, transicao: SOLICITAR_REVISAO_E2E, solucao: S_FACI_OTN, area_owner_id: BONE , area_from_id: null },
];
