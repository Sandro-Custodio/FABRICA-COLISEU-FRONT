// CÓDIGOS PODEM SER ENCONTRADOS NA TB_FUNCTIONS
export const actions = {
  DR_COA1: {
    path: "#/ordens-transmissao",
    label: "Ordens de Transmissão OT",
    icon: "globe"
  },
  DR_COA1O1: {
    order: 5,
    path: "#/ordens-transmissao/higienizar-projetos",
    label: "Higienizar Projeto",
    icon: "file-text-o"
  },

  DR_COE1: {
    path: "#/sds",
    label: "Solicitação Desligamento SD",
    icon: "power-off"
  },
  DR_COM1: { path: "#/views", label: "Relatórios", icon: "file-excel-o" },

  DR_COB1: { path: "#/evts", label: "EVT", icon: "table" },
  DR_COC1: { path: "#/leasedlines", label: "Leased Lines", icon: "link" },
  DR_COD1: { path: "#/ods", label: "Ordem de Desligamento OD", icon: "plug" },
  DR_COQ1: { path: "#/lpu", label: "LPU", icon: "clipboard" },

  DR_COF1: {
    path: "#/faturamento",
    label: "Faturamento",
    icon: "money"
  },
  DR_COP1: {
    path: "#/acesso",
    label: "Acesso",
    icon: "user-o"
  },
  // DR_COQ1: {
  DR_COJ1B1: {
    path: "#/contratos",
    label: "Contratos",
    icon: "handshake-o"
  },
  //CÓDIGO TEMPORÁRIO PARA MENU VENDORS
  DR_COJ1A1: { path: "#/vendors", label: "Provedores", icon: "group" },

  // // -- SUBMENU SÃO OS CARDS--\\
  DR_COA1A1: { order: 1, path: "#/ots/new-ot", label: "OT", icon: "plus" },
  DR_COA1B1: { order: 2, path: "#/ots/list", label: "OT", icon: "list" },
  DR_COA1C1: {
    order: 4,
    path: "#/ots/ot-multiple",
    label: "Multiplas OT",
    icon: "clipboard"
  },
  DR_COA1G1: { order: 3, path: "#/ots/ot-consult", label: "OT", icon: "book" },
  DR_COA1I1: {
    order: 7,
    path: "#/ots/ot-solicit-cancel",
    label: "Cancelamento OT",
    icon: "trash"
  },
  DR_COB1B1: { path: "#/evt/list", label: "Listar EVT", icon: "list" },
  DR_COD1B1: {
    path: "#/ods-list",
    label: "Listar ODs",
    icon: "list"
  },
  DR_COC1A1: {
    path: "#/ll/list",
    label: "Leasedlines",
    icon: "list"
  },
  DR_COE1B1: {
    path: "#/sd/list",
    label: "Listar SDs",
    icon: "list"
  },
  DR_COE1E1: {
    path: "#/sd/efficiency",
    label: "SD Report",
    icon: "book"
  },
  DR_COE1A1: {
    path: "#/sd/create",
    label: "Criar SD",
    icon: "plus"
  },

  DR_COC1F1: {
    path: "#/ll/hig-ll-lote",
    label: "Higienização de LL em Lote",
    icon: "list"
  },
  DR_COD1A1: {
    path: "#/criar-ods",
    label: "Criar OD",
    icon: "plus"
  },

  DR_COA1S1: {
    order: 6,
    path: "#/ots/higienizar-projetos-ot",
    label: "Higienizar Projeto da OT",
    icon: "edit"
  },
  DR_COB1C1: {
    path: "#/multiplas-evts",
    label: "Multiplas EVTs",
    icon: "sitemap"
  },

  DR_COF1B1: {
    path: "#/visualizar",
    label: "Visualizar Fatura",
    icon: "eye"
  },

  DR_COF1A1: {
    path: "#/importar-fatura",
    label: "Importar Fatura",
    icon: "upload"
  },
  DR_COF1C1: {
    path: "#/regras-classificacao",
    label: "Regras de Classificação",
    icon: "balance-scale"
  },
  DR_COB1E1: {
    path: "#/emissao-evt",
    label: "EVTs Multiplas",
    icon: "list"
  },
  DR_COJ1A1B1: {
    path: "#/vendor/list",
    label: "EILD",
    icon: "list"
  },
  DR_COA2A1: {
    path: "#/bd-config/list",
    label: "BD Config",
    icon: "cogs"
  },
  DR_COF1F1: {
    path: "#/faturamentoConciliacao",
    label: "Faturamento",
    icon: "file-text-o"
  },
  DR_COF1D1: {
    path: "#/listarAgrupadores",
    label: "Listar Agrupadores",
    icon: "file-text"
  },
  DR_COA1B3: {
    path: "#/listarFinalidades",
    label: "Listar Finalidades",
    icon: "file-text"
  },
  DR_COP1A1: {
    path: "#/administrarUsuarios",
    label: "Administrar Usuários",
    icon: "user-o"
  },
  DR_COQ1B1: {
    path: "#/lpu-list",
    label: "Listar LPU",
    icon: "file-text"
  },
  DR_COQ1A1: {
    path: "#/lpu-create",
    label: "Criar LPU",
    icon: "plus"
  },
  DR_COJ1B1B1: {
    path: "#/listarContratos",
    label: "Listar Contratos",
    icon: "file-text"
  },
  DR_COJ1B1A1: {
    path: "#/cadastrarContrato",
    label: "Novo Contrato",
    icon: "plus"
  },
  // SUBMENU_2
  DR_COC1F1B1: {
    path: "#/ll/precos-contratos",
    label: "Preços e Contratos",
    icon: "money"
  },
  DR_COC1F1A3: {
    path: "#/ll/base-dashboard",
    label: "Base Dashboard",
    icon: "dashboard"
  },
  DR_COC1G1A1: {
    path: "#/ll/fallback-od",
    label: "Fallback de OD",
    icon: "power-off"
  },
  DR_COC1F1A1: {
    path: "#ll/fallback-status",
    label: "Atualização",
    icon: "pencil-square-o"
  },
  DR_COC1F1A2: {
    path: "#/ll/atualizar-endereco-elemento",
    label: "Atualização",
    icon: "pencil-square-o"
  },
  DR_COC1F1E1: {
    path: "#/ll/designacao-circuitos-lote",
    label: "Designação de Circuitos em Lote",
    icon: "globe"
  },

  DR_COC1D1: {
    path: "#/ll/circuito-fatura",
    label: "Circuito Fatura",
    icon: "microchip"
  },

  DR_COC1F1D1: {
    path: "#/ll/lpu",
    label: "Atualização de LPU",
    icon: "list"
  },

  DR_COF1J1: {
    path: "#/relatorios/submenu",
    label: "Relatórios",
    icon: "list"
  },

  DR_COF1J1A1: {
    path: "#/relatorios/previsao-de-faturamento",
    label: "Previsão de Faturamento",
    icon: "file"
  },

  DR_COF1J1B1: {
    path: "#/relatorios/circuitos-faturados",
    label: "Circuitos Faturados",
    icon: "file"
  },

  DR_COF1J1D1: {
    path: "#/relatorios/inconsistencias",
    label: "Inconsistências",
    icon: "file"
  },

  DR_COF1J1E1: {
    path: "#/relatorios/circuitos-nao-faturados",
    label: "Circuitos Não Faturados",
    icon: "file"
  },

  DR_COF1J1G1: {
    path: "#/relatorios/circuitos-contestados",
    label: "Circuitos Contestados",
    icon: "file"
  },

  DR_COF1J1H1: {
    path: "#/relatorios/circuitos-pendentes-de-ativacao",
    label: "Circuitos Pendentes de Ativação",
    icon: "file"
  },

  DR_COF1J1J1: {
    path: "#/relatorios/circuitos-ativados-e-cancelados",
    label: "Circuitos Ativados e Cancelados",
    icon: "file"
  },

  DR_COF1J1K1: {
    path: "#/relatorios/taxa-de-instalacao-prevista-nao-faturada",
    label: "Tx de Inst Prevista Não Faturada",
    icon: "file"
  },

  DR_COF1J1L1: {
    path: "#/relatorios/taxa-de-instalacao-faturada-apos-previsao",
    label: "Tx de Inst Faturada Após Previsão",
    icon: "file"
  },

  DR_COF1J1M1: {
    path: "#/relatorios/primeiro-faturamento",
    label: "Primeiro Faturamento",
    icon: "file"
  },

  DR_COF1J1C1: {
    path: "#/relatorios/faturas-invalidas",
    label: "Faturas Inválidas",
    icon: "file"
  },

  DR_COF1J1I1: {
    path: "#/relatorios/creditos-recebidos-x-previstos",
    label: "Créditos Recebidos X Previsto",
    icon: "file"
  },

  DR_COF1H1: {
    path: "#/contestacao",
    label: "Contestação",
    icon: "check"
  },
  DR_COC1H1:{
    path: "#/ll/sincronizar-bdconfig",
    label: "Sincronizar BdConfig",
    icon: "database"
  }
};

// LICCEU
export const actions_licceu = {
  DR_COA1: {
    path: "#/ordens-transmissao",
    label: "Ordens de Transmissão",
    icon: "globe"
  },
  DR_COM1: { path: "#/views", label: "Views COLISEU", icon: "file-excel-o" },
  DR_POBY: { path: "#/powerbi", label: "Power BI", icon: "line-chart" },
  // DR_CON1I1: { path: "#/", label: "Views Base Licceu", icon: "ban" },
  // DR_CON1E1: { path: "#/ot-report", label: "OT Report", icon: "paste" },
  // DR_CON1G1: { path: "#/", label: "TELLABS", icon: "ban" },

  // MW
  DR_CON1A1: { path: "#/mw", label: "MW", icon: "industry" },
  DR_CON1A1B1: { path: "#/mw/listar", label: "MW", icon: "list", order: 1 },
  DR_CON1A1A1: { path: "#/mw/carga", label: "MW", icon: "upload", order: 2 },

  DR_CON1B1: { path: "#/fo", label: "FO", icon: "circle-o-notch" },
  DR_CON1C1: { path: "#/circuitos", label: "Circuitos", icon: "microchip" },
  DR_COY1: { path: "#/hubs", label: "Hub", icon: "connectdevelop" },

  // Base Gerencial
  DR_CON1N1: {
    path: "#/basegerencial",
    label: "Base Gerencial",
    icon: "ban"
  },
  DR_CON1N1B1: {
    path: "#/basegerencial/listar",
    label: "Listar Base Gerencial",
    icon: "list",
    order: 1
  },
  DR_CON1N1A1: {
    path: "#/basegerencial/carga",
    label: "Carga Base Gerencial",
    icon: "upload",
    order: 2
  },

  // Views Base Licceu
  DR_CON1I1: {
    path: "#/views-base",
    label: "Relatórios",
    icon: "archive"
  },
  DR_CON1I1A1: {
    path: "#/views-base/enlace",
    label: "Base de Enlaces",
    icon: "list"
  },
  DR_CON1I1B1: {
    path: "#/views-base/aneis",
    label: "Base Aneis",
    icon: "list"
  },
  DR_CON1I1C1: {
    path: "#/views-base/circuitos",
    label: "Base de Circuitos",
    icon: "list"
  },
  DR_CON1I1D1: {
    path: "#/views-base/licenciamento-anatel",
    label: "Base de Licenciamento Anatel",
    icon: "list"
  },
  DR_CON1I1E1: {
    path: "#/views-base/projeto-executivo",
    label: "View Carga Projeto Executivo",
    icon: "list"
  },
  DR_CON1I1F1: {
    path: "#/views-base/plano-operativo-ot",
    label: "Chaves OT tipo plano operativo",
    icon: "list"
  },
  DR_CON1I1G1: {
    path: "#/views-base/e2e",
    label: "Projetos E2E",
    icon: "list"
  },
  DR_CON1I1H1: {
    path: "#/views-base/banda-enlace",
    label: "Banda Média por Enlace",
    icon: "list"
  },
  DR_CON1I1I1: {
    path: "#/views-base/plo-consolidado",
    label: "Plano Operativo Consolidado",
    icon: "list"
  },
  DR_CON1I1J1: {
    path: "#/views-base/base-licenciamento-anatel",
    label: "Base Licenciamento Anatel",
    icon: "list"
  },

  // Controle de Boq
  DR_CON1P1: {
    path: "#/controle-boq",
    label: "Controle de Boq",
    icon: "ban"
  },
  // Submenus controle de Boq
  DR_CON1P1A1: {
    path: "#/controle-boq/carga-boq",
    label: "Carga AMBV",
    icon: "upload"
  },
  DR_CON1P1B1: {
    path: "#/controle-boq/carga-mascara-boq",
    label: "Carga de Máscara Boq",
    icon: "upload"
  },
  // Plano Operativo
  DR_COX1: {
    path: "#/plano-operativo",
    label: "Plano Operativo",
    icon: "calendar-check-o"
  }, // No banco está "Projeto Integrado"
  DR_COX1M1: {
    path: "#/plano-operativo/geracao",
    label: "Geração de PLO",
    icon: "list",
    order: 1
  },
  DR_COX1F1: {
    path: "#/plano-operativo/listar",
    label: "PLO",
    icon: "list",
    order: 2
  },
  DR_COX1G1: {
    path: "#/plano-operativo/acesso",
    label: "PLO Acesso",
    icon: "list",
    order: 3
  },
  DR_COX1A1: {
    path: "#/plano-operativo/carga-acesso",
    label: "PLO Acesso",
    icon: "upload",
    order: 4
  },

  // Projeto Executivo
  DR_COX1E1: {
    path: "#/plano-operativo/projeto-executivo",
    label: "Listar Projeto Executivo",
    icon: "upload",
    order: 4
  },

  DR_COX1H1: {
    path: "#/plano-operativo/transporte",
    label: "PLO Transporte",
    icon: "list",
    order: 5
  },
  DR_COX1B1: {
    path: "#/plano-operativo/carga-transporte",
    label: "PLO Transporte",
    icon: "upload",
    order: 6
  },
  DR_CON1O1: {
    path: "#/plano-operativo/circuito-pendente",
    label: "PLO Circuitos Pendentes",
    icon: "list",
    order: 7
  },

  // -- SUBMENU SÃO OS CARDS --\\

  DR_COA1B1: { path: "#/ots/list", label: "OT", icon: "list" },
  DR_CON1C1C1: {
    path: "#/circuito/listarCircuitos",
    label: "Circuito",
    icon: "list"
  },

  DR_COY1A2: {
    path: "#/hub/listarHub",
    label: "Hub",
    icon: "list"
  },
  DR_CON1B1B1: {
    path: "#/fos/listarFOs",
    label: "Anel",
    icon: "list"
  },
  DR_COY1A1: {
    path: "#/hub/cargaHub",
    label: "Hub",
    icon: "upload"
  },

  // TxtProfile
  DR_CON1E1: {
    path: "#/txtprofile",
    label: "TX Profile",
    icon: "file-text"
  },
  DR_CON1E1B1: {
    path: "#/txtprofile/listar",
    label: "Listar Sites TX Profile",
    icon: "list"
  },

  // Gerenciamento
  DR_CON1K1: {
    path: "#/gerenciamento",
    label: "Gerenciamento",
    icon: "calendar-check-o"
  },
  DR_CON1K1H1: {
    path: "#/gerenciamento/base-cadeias",
    label: "Base de Cadeias",
    icon: "list"
  }
};
