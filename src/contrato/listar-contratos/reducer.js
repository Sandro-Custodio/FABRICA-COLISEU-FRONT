import React from "react";
import moment from "moment";
import GreenLight from "common/images/Green_Light.png";
import Yellowlight from "common/images/Yellow_Light.png";
import RedLight from "common/images/Red_Light.png";

const checkVencimentoContrato = vencimentoContrato => {
  var componente;
  var days;

  if (vencimentoContrato != null) {
    var expiration = moment(vencimentoContrato).format("YYYY-MM-DD");
    var current_date = moment().format("YYYY-MM-DD");
    var days = moment(expiration).diff(current_date, "days");
  }

  if (days > 30) {
    /////verde
    componente = <img src={GreenLight} style={{ width: 15 }} alt="Prazo OK" />;
  } else if (days >= 0 && days <= 30) {
    ///// amarelo
    componente = (
      <img
        src={Yellowlight}
        style={{ width: 15 }}
        alt="Prazo Próximo Expirar"
      />
    );
  } else if (days < 30) {
    /////vermelho
    componente = (
      <img src={RedLight} style={{ width: 15 }} alt="Prazo Expirado" />
    );
  } else {
    componente = "";
  }

  return <>{componente}</>;
};

const formatDate = value => {
  if (value === "[n/a]") {
    return "[n/a]";
  }
  return value && moment(value).format("DD/MM/YYYY");
};

const INITIAL_STATE = {
  contrato_list: [],
  paginator: { currentPage: 1, pageSize: 30 },
  maxPagesQtd: 1,
  columns: [
    { title: "Contrato Tim", name: "contrato_automatico" },
    { title: "Provedor", name: "provedor" },
    { title: "Grupo", name: "grupo" },
    {
      title: "Contrato Prov.",
      name: "vendor_contract",
      getCellValue: row => row?.contrato
    },
    { title: "Objetivo", name: "objeto_contrato" },
    { title: "Detalhe Objeto", name: "objeto_descricao" },
    { title: "Gestor", name: "gestor" },
    { title: "Rede", name: "rede" },
    {
      title: "Data Assinatura",
      name: "data_assinatura",
      getCellValue: row => formatDate(row.data_assinatura)
    },
    {
      title: "Alerta Vigência",
      name: "alertaVigencia",
      getCellValue: row =>
        row.contract_start_at && checkVencimentoContrato(row.contract_end_at)
    },
    {
      title: "Início de Vigência",
      name: "contract_start_at",
      getCellValue: row => formatDate(row.contract_start_at)
    },
    { title: "Vigência", name: "vigencia" },
    { title: "Prazo de Manifestação", name: "prazo_contratual" },
    { title: "Renovação Automática", name: "renovacao_automatica" },
    { title: "Prazo em Meses", name: "prazo_renovacao" },
    { title: " ", name: "actions" }
  ],
  columnsWidth: [
    { width: 120, columnName: "contrato_automatico" },
    { width: 100, columnName: "provedor" },
    { width: 100, columnName: "grupo" },
    { width: 115, columnName: "vendor_contract" },
    { width: 100, columnName: "objeto_contrato" },
    { width: 110, columnName: "objeto_descricao" },
    { width: 100, columnName: "gestor" },
    { width: 100, columnName: "rede" },
    { width: 100, columnName: "data_assinatura" },
    { width: 100, columnName: "alertaVigencia" },
    { width: 100, columnName: "contract_start_at" },
    { width: 100, columnName: "vigencia" },
    { width: 100, columnName: "prazo_contratual" },
    { width: 100, columnName: "renovacao_automatica" },
    { width: 100, columnName: "prazo_renovacao" },
    { width: 100, columnName: "actions" }
  ],
  contract_hist_columns: [
    { title: "Id", name: "id" },
    { title: "Provedor", name: "provedor" },
    { title: "Contrato", name: "contrato" },
    {
      title: "Início Vigência",
      name: "contract_start_at",
      getCellValue: row => formatDate(row.contract_start_at)
    },
    {
      title: "Término Vigência",
      name: "contract_end_at",
      getCellValue: row => formatDate(row.contract_end_at)
    },
    { title: "Motivo", name: "reason" },
    { title: "Nome do Usuário", name: "change_user_name" },
    { title: "Login do Usuário", name: "change_user_login" }
  ],
  provedor_list: [],
  detalhe_objeto_list: [],
  contrato_tim_list: [],
  contrato_provedor_list: [],
  rede_list: [],
  abrangencia_list: [],
  contract_hist_list: [],
  contract_resume: {
    contract: {},
    contract_additives: [],
    contract_attaches: [],
    contract_dependencies_count: {},
    contract_dependencies: {}
  },
  openVigencia: false,
  openViewContract: false,
  // auxiliar tables
  network: [],
  vendor: [],
  classification: [],
  objeto_contrato: [],
  objeto_descricao: [],
  // end
  // editar contrato
  attachments_list: [],
  remarks_list: {}
  // end
};

export default (state = INITIAL_STATE, action) => {
  const { paginator } = state;
  switch (action.type) {
    case "COMBOS_CONTRATO_FETCHED":
      if (!action.payload) {
        return state;
      }
      return {
        ...state,

        provedorList: action.payload[0].map(r => ({
          provedor: r.name,
          provedorId: r.id
        })),
        grupoList: action.payload[3].map(r => ({
          grupoAll: r.grupo,
        })),
        detalheObjetoList: action.payload[6].map(r => ({
          detalheObjeto: r.descricao
        })),
        contratoTimList: action.payload[9].map(r => ({
          contratoTim: r.contrato_automatico
        })),
        contratoProvedorList: action.payload[1].map(r => ({
          contratoProvedor: r.contrato
        })),
        redeList: action.payload[7].map(r => ({
          rede: r.rede
        })),
        abrangenciaList: action.payload[2].map(r => ({
          abrangencia: r.parameter_value
        }))
      };
    case "CONTRATO_FETCHED":
      return { ...state, contrato_list: action.payload[0], paginator };
    case "CHANGE_LISTCONTRATO_PAGINATOR":
      return { ...state, paginator: action.payload };
    case "CHANGE_LISTCONTRATO_MAX_PAGE_QTD":
      return { ...state, maxPagesQtd: action.payload };
    case "CONTRATO_HIST_FETCHED":
      return { ...state, contract_hist_list: action.payload };
    case "CONTRATO_RESUME_FETCHED":
      return { ...state, contract_resume: action.payload };
    case "OPEN_VIGENCIA_FETCHED":
      return { ...state, openVigencia: action.payload };
    case "OPEN_VIEW_CONTRACT_FETCHED":
      return { ...state, openViewContract: action.payload };
    case "AUXILIAR_TABLES_FETCHED":
      if (!action.payload) {
        return state;
      }
      let obj_contrato = [];
      let obj_descricao = [];
      if (action.payload[6]?.length > 0) {
        action.payload[6].map(item => {
          obj_contrato.push(item?.objeto_contrato);
          obj_descricao.push(item?.descricao);
        });
      }
      // limpa duplicatas
      obj_contrato = [...new Set(obj_contrato)];
      return {
        ...state,
        objeto_contrato: obj_contrato,
        objeto_descricao: obj_descricao,
        network: action.payload[7],
        vendor: action.payload[3],
        classification: action.payload[8]
      };
    case "ATTACHMENTS_AND_REMARKS_FETCHED":
      return {
        ...state,
        attachments_list: action.payload[0],
        remarks_list: action.payload[1]
      };
    case "SET_FILE_LIST":
      return { ...state, attachments_list: action.payload };
    default:
      return state;
  }
};
