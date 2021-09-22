/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-shadow */
import React, { Component } from "react";
import { reduxForm, Field, formValueSelector } from "redux-form";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SimpleReactValidator from "simple-react-validator";
import Moment from "moment";
import momentLocalizer from "react-widgets-moment";
import {
  DropdownListField,
  DateTimePickerField,
  TextareaField,
  LabelInput,
  SpanLabel
} from "../../common/form/components";
import If from "../../common/operator/if";
import Row from "../../common/layout/row";
import ModalObsEventual from "../../common/layout/modal";
import Grid from "../../common/layout/grid";
import Overlay from "../../common/msg/overlay/overlay";
import {
  checkSegmentUnique,
  loadElementTypesA,
  loadElementTypesB,
  loadElementsA,
  loadElementsB,
  loadAddressA,
  loadAddressB,
  clearValuesForm,
  loadAddressAById,
  loadAddressBById
} from "./actions";

Moment.locale("en");
momentLocalizer();

const _ = require("lodash");

const duration = {
  Permanente: [
    { period: "12 meses" },
    { period: "24 meses" },
    { period: "36 meses" },
    { period: "48 meses" },
    { period: "60 meses" }
  ],
  Temporário: [
    { period: "1 mês" },
    { period: "2 meses" },
    { period: "3 meses" },
    { period: "4 meses" },
    { period: "5 meses" },
    { period: "6 meses" },
    { period: "7 meses" },
    { period: "8 meses" },
    { period: "9 meses" },
    { period: "10 meses" },
    { period: "11 meses" }
  ]
};

const interfaces = [
  { interface: "Ethernet Fast" },
  { interface: "Ethernet GB Eletrica" },
  { interface: "Ethernet GB Optica Mono" },
  { interface: "Ethernet GB Optica Multi" },
  { interface: "G703/G704 Eletrica" },
  { interface: "STM-m Eletrica" },
  { interface: "STM-n Optica Mono" },
  { interface: "STM-n Optica Multi" },
  { interface: "V35" }
];

class FormPadrao extends Component {
  state = {
    speed: 0,
    speed_unity: "Mbps",
    subProjectsFiltered: []
  };

  componentWillMount() {
    this.validator = new SimpleReactValidator({
      messages: {
        duracao: "Campo Obrigatório",
        required: "Campo Obrigatório",
        protecao: "Campo Obrigatório",
        regionalB: "Campo Obrigatório",
        alpha: "Somente Letras",
        pontaAB: "Ponta A igual a Ponta B, selecione outra opção!",
        regionalResponsavelPontaAB:
          "A regional não coincide com a de Origem ou Destino.",
        BBIP: "Configuração válida apenas para área BBIP.",
        default: "Validation has failed!"
      },
      validators: {
        regionalResponsavelPontaAB: {
          rule: (val, params) => {
            return params.find(param => param === val) !== undefined;
          },
          required: true
        },
        pontaAB: {
          rule: (val, params) => {
            return val !== params[0];
          },
          required: true
        },
        regionalB: {
          rule: (val, params) => {
            if (params === "PORTA IP") {
              return true;
            }
            if (val.ot_operator_b === undefined) {
              return true;
            }
            if (val.ot_operator_b) {
              return true;
            }
            return false;
          }
        },
        duracao: {
          rule: (val, params) => {
            if (
              _.get(val.ot_period, "name", "") === "Eventual" ||
              typeof val.ot_period === "undefined"
            ) {
              return true;
            }
            if (val.ot_duration) {
              return true;
            }

            return false;
          }
        },
        protecao: {
          rule: (val, params) => {
            if (_.get(val.ot_protection, "name", "") === "Sem proteção") {
              return true;
            }
            if (
              _.get(val.ot_protection, "name", "") === "Com proteção" &&
              !!val.ot_protection_type
            ) {
              return true;
            }
            return false;
          }
        },
        BBIP: {
          rule: (area, params) => {
            const ot_element_type_a = params[0];
            const ot_element_type_b = params[1];
            const solutions = "MGW MGX M-MGW";
            return !(
              solutions.indexOf(ot_element_type_a) > -1 &&
              solutions.indexOf(ot_element_type_b) > -1 &&
              ot_element_type_b !== ot_element_type_a &&
              area !== "BBIP"
            );
          },
          required: true
        }
      },
      element: message => message
    });
  }

  componentDidMount() {
    this.init();
  }

  setSpeed(speed) {
    this.state.speed = speed;
  }

  setSpeedUnity(speed_unity) {
    this.state.speed_unity = speed_unity;
  }

  init = () => {
    const { auth, initialize } = this.props;
    if (process.env.NODE_ENV === "development") {
      initialize({
        ot_solicitant_login: auth.user.registry,
        ot_solicitant_name: auth.user.name,
        ot_solicitant_area: auth.user.area.name,
        ot_status_name: "Somente Gravada",
        // ot_protection_type: "Placa",

        ot_operator_manager: { regional: "TNO", id: 5 },
        ot_finality: { name: "BANDA LARGA", id: 11 },
        ot_network: { name: "MÓVEL" },
        ot_project: { name: "4G Coverage", id: 2011 },
        ot_sub_project: { name: "Cobertura Móvel - COW", id: 2181 },
        ot_reference: "123456",
        ot_period: { name: "Permanente" },
        ot_duration: { period: "60 meses" },
        ot_observacao: "",

        // ot_operator_a: { regional: "TNO" },
        // ot_element_type_a: { element_type: "POP" },
        // ot_element_a_id: { elemento_id: "ACD-GAS01-CSW01", id: 200328 },
        // ot_address_a_id: { endereco_id: "MAACD_0001" },
        ot_interface_a: { interface: "STM-m Eletrica" },

        // ot_operator_b: { regional: "TNO" },
        // ot_element_type_b: { element_type: "BSC" },
        // ot_element_b_id: { elemento_id: "BBLM01", id: 36748 },
        // ot_address_b_id: { endereco_id: "PABLM_0001" },
        ot_interface_b: { interface: "G703/G704 Eletrica" },

        ot_degrau: "D8",
        ot_banda_final: "",
        ot_inc_trx: "",
        ot_trx: "",
        ot_frequency: { nome: "" },
        ot_solution: { name: "SAT" },
        ot_qtd_links: "2",
        ot_speed: { name: "52 Mbps", id: 10595 }
        // ot_protection: { name: "Sem proteção", id: 2 }
      });
    } else {
      initialize({
        ot_solicitant_login: auth.user.registry,
        ot_solicitant_name: auth.user.name,
        ot_solicitant_area: auth.user.area.name,
        ot_status_name: "Somente Gravada",
        ot_protection_type: ""
      });
    }
  };

  changePrazo = prazo => {
    if (prazo === "Eventual") {
      // eslint-disable-next-line no-undef
      window.$("#obs_eventual").modal("show");
    }
    this.loadDuration();
  };

  loadDuration = () => {
    const { change } = this.props;
    change("ot_duration", "");
  };

  loadSubProjects = project_id => {
    const { change, sub_projects } = this.props;
    change("ot_sub_project", "");
    this.setState({
      subProjectsFiltered: sub_projects.filter(sub_project => {
        return sub_project.parent_id === project_id;
      })
    });
  };

  changeFinality = finality => {
    const { ot_operator_a, ot_operator_b } = this.props;
    this.loadElementTypesA(_.get(ot_operator_a, "regional", ""), finality);
    this.loadElementTypesB(_.get(ot_operator_b, "regional", ""), finality);
  };

  loadElementTypesA = (regional, finality) => {
    const { change, loadElementTypesA } = this.props;
    change("ot_element_type_a", "");
    change("ot_element_a_id", "");
    change("ot_address_a_id", "");
    change("ot_degrau", "");
    loadElementTypesA({
      regional,
      finality,
      type: "Selecione"
    });
  };

  loadElementTypesB = (regional, finality) => {
    const { change, loadElementTypesB } = this.props;
    change("ot_element_type_b", "");
    change("ot_element_b_id", "");
    change("ot_address_b_id", "");
    change("ot_degrau", "");
    loadElementTypesB({
      regional,
      finality,
      type: "Selecione"
    });
  };

  loadElementsA = element_type => {
    const { change, loadElementsA, ot_operator_a } = this.props;
    change("ot_element_a_id", "");
    change("ot_address_a_id", "");
    change("ot_degrau", "");
    loadElementsA({
      regional: _.get(ot_operator_a, "regional", ""),
      type: element_type
    });
  };

  loadElementsB = element_type => {
    const { change, loadElementsB, ot_operator_b } = this.props;
    change("ot_element_b_id", "");
    change("ot_address_b_id", "");
    change("ot_degrau", "");
    loadElementsB({
      regional: _.get(ot_operator_b, "regional", ""),
      type: element_type
    });
  };

  loadAddressA = element => {
    const {
      // change,
      loadAddressA,
      ot_operator_a,
      ot_element_type_a,
      ot_element_b_id,
      loadAddressAById
    } = this.props;

    const param = {
      endereco_id: element.endereco_id
    };
    // change("ot_degrau", "");
    loadAddressAById(param);
    loadAddressA({
      operator: _.get(ot_operator_a, "regional", ""),
      element_type: _.get(ot_element_type_a, "element_type", ""),
      elemento_id: _.get(element, "elemento_id", ""),
      otherElementId: _.get(ot_element_b_id, "elemento_id", "")
    });
  };

  loadAddressB = element => {
    const {
      // change,
      loadAddressB,
      ot_operator_b,
      ot_element_type_b,
      ot_element_a_id,
      loadAddressBById
    } = this.props;

    const param = {
      endereco_id: element.endereco_id
    };
    // change("ot_degrau", "");
    loadAddressBById(param);
    loadAddressB({
      operator: _.get(ot_operator_b, "regional", ""),
      element_type: _.get(ot_element_type_b, "element_type", ""),
      elemento_id: _.get(element, "elemento_id", ""),
      otherElementId: _.get(ot_element_a_id, "elemento_id", "")
    });
  };

  unityChange = unity => {
    const { ot_speed, change } = this.props;
    const speed = ot_speed ? ot_speed.name.split(" ")[0] : "";
    change("ot_speed", { name: `${speed}|${unity}` });
  };

  speedChange = speed => {
    const { ot_speed, change } = this.props;
    const unity = ot_speed ? ot_speed.name.split(" ")[1] : "";
    change("ot_speed", { name: `${speed}|${unity}` });
  };

  changeInterfaceA = item => {
    const { ot_interface_a, change } = this.props;

    /* if ((item.indexOf("Ethernet") >= 0 &&
    _.get(ot_interface_a, "interface", "").indexOf("GB") >= 0) ){
      this.setSpeedUnity("Gbps");
    } */

    if (
      (item.indexOf("Ethernet") >= 0 &&
        _.get(ot_interface_a, "interface", "").indexOf("Ethernet") < 0) ||
      (item.indexOf("Ethernet") < 0 &&
        _.get(ot_interface_a, "interface", "").indexOf("Ethernet") >= 0) ||
      _.get(ot_interface_a, "interface", "") === ""
    ) {
      change("ot_speed", "");
    }
  };

  checkProtection = event => {
    const { ot_protection_type, change } = this.props;
    let protection = ot_protection_type || "";
    if (!event.target.checked) {
      protection = protection.replace(` ${event.target.value}`, ``);
      protection = protection.replace(`${event.target.value} `, ``);
      protection = protection.replace(`${event.target.value}`, ``);
    } else {
      protection = `${protection.trim()} ${event.target.value}`.trim();
    }
    change("ot_protection_type", protection);
  };

  onChangeSelectProtecao = nomeAtributo => {
    const { change } = this.props;
    change(nomeAtributo, "Sem Proteção");
  };

  getObjectOTSave = () => {
    const SOMENTE_GRAVADA = 21;
    const {
      auth,
      ot_operator_manager,
      ot_finality,
      ot_project,
      ot_sub_project,
      ot_reference,
      ot_period,
      ot_duration,
      ot_project_itx,
      ot_observacao,
      ot_network,
      ot_operator_a,
      ot_operator_b,
      ot_element_type_a,
      ot_element_type_b,
      ot_element_a_id,
      ot_element_b_id,
      ot_address_a_id,
      ot_address_b_id,
      ot_interface_a,
      ot_interface_b,
      ot_banda_final,
      ot_inc_trx,
      ot_trx,
      ot_frequency,
      ot_qtd_links,
      ot_speed,
      ot_protection,
      ot_protection_type,
      ot_activation_at,
      ot_rota_nome,
      ot_rota_num,
      ot_obs_eventual
    } = this.props;

    const ObjectOTSave = {
      user_id: auth.user.id,
      ot_from_params: {
        solicitant_id: auth.user.id,
        data_solicitacao: new Date().toISOString(),
        ot_finality_id: _.get(ot_finality, "id", ""),
        frequencia: _.get(ot_frequency, "nome", ""),
        period: _.get(ot_period, "name", ""),
        duration: _.get(ot_duration, "period", ""),
        rede: _.get(ot_network, "name", ""),
        operator_manager_id: _.get(ot_operator_manager, "id", ""),
        ot_element_type_a: _.get(ot_element_type_a, "element_type", ""),
        operator_a_id: _.get(ot_operator_a, "regional", ""),
        element_a_id: _.get(ot_element_a_id, "elemento_id", ""),
        address_a_id: _.get(ot_address_a_id, "id", ""),
        ot_element_type_b:
          _.get(ot_finality, "name", "") === "PORTA IP"
            ? _.get(ot_element_type_a, "element_type", "")
            : _.get(ot_element_type_b, "element_type", ""),
        element_b_id:
          ot_finality.name === "PORTA IP"
            ? _.get(ot_element_a_id, "elemento_id", "")
            : _.get(ot_element_b_id, "elemento_id", ""),
        address_b_id:
          ot_finality.name === "PORTA IP"
            ? _.get(ot_address_a_id, "id", "")
            : _.get(ot_address_b_id, "id", ""),
        operator_b_id:
          ot_finality.name === "PORTA IP"
            ? _.get(ot_operator_a, "regional", "")
            : _.get(ot_operator_b, "regional", ""),
        qtd_links: ot_qtd_links,
        ot_speed_id:
          !ot_interface_a?.interface?.search("Ethernet") >= 0 ? ot_speed?.id : "",
        speed_name:
          ot_interface_a.interface.search("Ethernet") >= 0
            ? `${this.state.speed} ${this.state.speed_unity}`
            : ot_speed.name,
        ot_redundancy_id: _.get(ot_protection, "id", ""),
        element_a_interface: _.get(ot_interface_a, "interface", ""),
        element_b_interface:
          ot_finality.name === "PORTA IP"
            ? _.get(ot_interface_a, "interface", "")
            : _.get(ot_interface_b, "interface", ""),
        area_solicitant_id: 5,
        project_id: _.get(ot_project, "id", ""),
        sub_project_id: _.get(ot_sub_project, "id", ""),
        protection_type:
          ot_protection_type !== "Sem Proteção" ? ot_protection_type : "",
        observacao: ot_observacao,
        referencia: ot_reference,
        banda_final: ot_banda_final,
        incremento_trx: ot_inc_trx,
        trx_final: ot_trx,
        obs_eventual: ot_obs_eventual,
        ot_status_id: SOMENTE_GRAVADA,
        projeto_itx: auth.user.area.code === "CNII" ? ot_project_itx : "",
        ot_ativacao_at: auth.user.area.name === "CNII" ? ot_activation_at : "",
        ot_rota_name: auth.user.area.name === "CNII" ? ot_rota_nome : "",
        ot_rota_numero: auth.user.area.name === "CNII" ? ot_rota_num : ""
      }
    };
    return ObjectOTSave;
  };

  submitForm = () => {
    const {
      checkSegmentUnique,
      auth,
      ot_element_a_id,
      ot_element_b_id
    } = this.props;

    if (this.validator.allValid()) {
      const params = {
        element_id_a: ot_element_a_id.id,
        element_id_b: ot_element_b_id.id,
        area_solicitant_id: 5
      };
      checkSegmentUnique(params, this.getObjectOTSave());
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };

  clear_fields = () => {
    const { clearValuesForm } = this.props;
    clearValuesForm("OTForm");
  };

  render() {
    const {
      operators,
      projects,
      finality,
      frequencia,
      submitting,
      element_types_a,
      element_types_b,
      auth,
      elements_a,
      elements_b,
      address_a,
      address_b,
      ot_redundancies,
      speeds,
      ot_address_a_id,
      ot_address_b_id,
      ot_sub_project,
      ot_element_b_id,
      ot_element_a_id,
      ot_period,
      ot_duration,
      ot_element_type_a,
      ot_element_type_b,
      ot_operator_a,
      ot_operator_b,
      ot_interface_a,
      ot_speed,
      ot_protection,
      ot_solution,
      ot_operator_manager,
      ot_finality,
      ot_project,
      // ot_observacao,
      ot_interface_b,
      ot_network,
      ot_degrau,
      ot_banda_final,
      ot_inc_trx,
      ot_trx,
      ot_frequency,
      ot_protection_type,
      ot_qtd_links
      // change
    } = this.props;

    const { subProjectsFiltered } = this.state;

    return (
      <form>
        <div className="overlay-wrapper">
          <div className="box-body">
            <Row>
              <Grid cols="12 4">
                <div className="box box-default">
                  <div className="box-body">
                    <Row>
                      <Field
                        name="ot_solicitant_login"
                        component={LabelInput}
                        type="text"
                        readOnly
                        cols="3"
                        label="Matrícula"
                        placeholder=""
                      />
                      <Field
                        name="ot_solicitant_name"
                        component={LabelInput}
                        type="text"
                        readOnly
                        cols="9"
                        label="Nome do Solicitante"
                        placeholder=""
                      />
                    </Row>
                    <Row>
                      <Field
                        name="ot_solicitant_area"
                        component={LabelInput}
                        readOnly
                        type="text"
                        cols="12"
                        label="Área"
                        placeholder=""
                      />
                    </Row>
                    <Row>
                      <Field
                        component={DropdownListField}
                        label="Regional Responsável"
                        cols="12 6"
                        name="ot_operator_manager"
                        busySpinner={<span className="fa fa-refresh fa-spin" />}
                        busy={!!(operators.length === 0)}
                        data={operators}
                        textField="regional"
                        textValue={({ item }) => item.regional}
                        itemComponent={({ item }) => (
                          <span>{item.regional}</span>
                        )}
                        placeholder="Regional responsável"
                        msgvalidation={this.validator.message(
                          "ot_operator_manager",
                          _.get(ot_operator_manager, "regional", ""),
                          `required|regionalResponsavelPontaAB:${_.get(
                            ot_operator_a,
                            "regional",
                            ""
                          )},${_.get(ot_operator_b, "regional", "")}`
                        )}
                      />
                      <Field
                        name="ot_status_name"
                        readOnly
                        component={LabelInput}
                        type="text"
                        cols="6"
                        label="Status"
                        placeholder="Status"
                      />
                    </Row>
                    <Row>
                      <Field
                        name="ot_created_at"
                        disabled
                        cols="12 4"
                        component={DateTimePickerField}
                        time={false}
                        placeholder="Cadastrada em"
                      />
                      <Field
                        name="ot_solicited_at"
                        disabled
                        cols="12 4"
                        component={DateTimePickerField}
                        time={false}
                        placeholder="Enviada em"
                      />
                      <Field
                        name="ot_ended_at"
                        disabled
                        cols="12 4"
                        component={DateTimePickerField}
                        time={false}
                        placeholder="Concluida em"
                      />
                    </Row>
                    <Row>
                      <Field
                        name="ot_finality"
                        component={DropdownListField}
                        label="Finalidade"
                        cols="12 6"
                        busySpinner={<span className="fa fa-refresh fa-spin" />}
                        busy={!!(finality.length === 0)}
                        data={finality}
                        textField="name"
                        textValue={({ item }) => item.name}
                        itemComponent={({ item }) => <span>{item.name}</span>}
                        placeholder="Finalidade"
                        onChange={item => this.changeFinality(item.name)}
                        msgvalidation={this.validator.message(
                          "ot_finality",
                          _.get(ot_finality, "name", ""),
                          "required"
                        )}
                      />
                      <Field
                        name="ot_network"
                        component={DropdownListField}
                        label="Rede"
                        cols="12 6"
                        data={[{ name: "MÓVEL" }, { name: "FIXA" }]}
                        textField="name"
                        textValue={({ item }) => item.name}
                        itemComponent={({ item }) => <span>{item.name}</span>}
                        placeholder="Rede"
                        msgvalidation={this.validator.message(
                          "ot_network",
                          _.get(ot_network, "name", ""),
                          "required"
                        )}
                      />
                    </Row>
                    <Row>
                      <Field
                        name="ot_project"
                        component={DropdownListField}
                        label="Projeto"
                        cols="12 6"
                        busySpinner={<span className="fa fa-refresh fa-spin" />}
                        busy={!!(projects.length === 0)}
                        data={projects}
                        textField="name"
                        textValue={({ item }) => item.name}
                        itemComponent={({ item }) => <span>{item.name}</span>}
                        placeholder="Projeto"
                        onChange={project => this.loadSubProjects(project.id)}
                        msgvalidation={this.validator.message(
                          "ot_project",
                          _.get(ot_project, "name", ""),
                          "required"
                        )}
                      />

                      <Field
                        name="ot_sub_project"
                        component={DropdownListField}
                        label="Subprojeto"
                        cols="12 6"
                        busySpinner={<span className="fa fa-refresh fa-spin" />}
                        busy={!!(projects.length === 0)}
                        disabled={subProjectsFiltered.length === 0}
                        data={subProjectsFiltered}
                        textValue={({ item }) => item.name}
                        textField={item => (ot_sub_project ? item.name : "")}
                        itemComponent={({ item }) => <span>{item.name}</span>}
                        placeholder="Subprojeto"
                        msgvalidation={this.validator.message(
                          "ot_sub_project",
                          _.get(ot_sub_project, "name", ""),
                          "required"
                        )}
                      />
                    </Row>
                    <Row>
                      <Field
                        name="ot_reference"
                        component={LabelInput}
                        type="text"
                        cols="12"
                        label="Referencia"
                        placeholder="Referencia"
                      />
                    </Row>
                    <Row>
                      <Field
                        name="ot_period"
                        component={DropdownListField}
                        label="Prazo"
                        cols="12 4"
                        data={[
                          { name: "Permanente" },
                          { name: "Temporário" },
                          { name: "Eventual" }
                        ]}
                        textField="name"
                        textValue={({ item }) => item.name}
                        itemComponent={({ item }) => <span>{item.name}</span>}
                        placeholder="Prazo"
                        onChange={item => this.changePrazo(item.name)}
                        msgvalidation={this.validator.message(
                          "ot_period",
                          _.get(ot_period, "name", ""),
                          "required"
                        )}
                      />
                      <If test={_.get(ot_period, "name", "") === "Eventual"}>
                        {/* <div className="form-group" style={{}}>
                          <button
                            type="button"
                            data-toggle="modal"
                            data-target="#obs_eventual"
                            className="btn btn-danger"
                          >
                            <span className="fa fa-pencil" />
                          </button>
                        </div> */}
                        <div className="col-xs-12 col-sm-2 ">
                          <div className="form-group">
                            <label
                              style={{ width: "100%", visibility: "hidden" }}
                            >
                              Obs Prazo
                            </label>
                            <button
                              type="button"
                              data-toggle="modal"
                              data-target="#obs_eventual"
                              className="btn btn-danger"
                            >
                              <span className="fa fa-pencil" />
                            </button>
                          </div>
                        </div>
                      </If>
                      <Field
                        name="ot_duration"
                        component={DropdownListField}
                        label="Duração"
                        cols="12 6"
                        data={ot_period ? duration[ot_period.name] : []}
                        disabled={
                          ot_period
                            ? ot_period.name === "Eventual" ||
                            ot_period.name === ""
                            : true
                        }
                        textField={item => (ot_duration ? item.period : "")}
                        textValue={({ item }) => item.period}
                        itemComponent={({ item }) => <span>{item.period}</span>}
                        placeholder="Duração"
                        msgvalidation={this.validator.message(
                          "ot_period",
                          {
                            ot_period,
                            ot_duration
                          },
                          "required|duracao"
                        )}
                      />
                    </Row>
                    <If test={auth.user.area.code === "CNII"}>
                      <Row>
                        <Field
                          name="ot_project_itx"
                          component={LabelInput}
                          type="text"
                          cols="8"
                          label="Projeto ITX"
                          placeholder="Projeto ITX"
                        />
                      </Row>
                    </If>
                    <Row>
                      <Field
                        name="ot_observacao"
                        component={TextareaField}
                        cols="12"
                        label="Observação"
                        placeholder="OBS"
                        rows="5"
                      // msgvalidation={this.validator.message(
                      //   "ot_observacao",
                      //   ot_observacao || "",
                      //   "required"
                      // )}
                      />
                    </Row>
                    <If test={auth.user.area.name === "CNII"}>
                      <Row>
                        <Field
                          name="ot_activation_at"
                          label="Data de Ativação"
                          component={DateTimePickerField}
                          cols="12 4"
                          time={false}
                          placeholder="Ativado em"
                        />
                        <Field
                          name="ot_rota_nome"
                          component={LabelInput}
                          type="text"
                          cols="12 4"
                          label="Rota"
                          placeholder="Nome"
                        />
                        <Field
                          cols="12 4"
                          name="ot_rota_num"
                          label="Número"
                          component={LabelInput}
                          placeholder="Nº Rota"
                        />
                      </Row>
                    </If>
                  </div>
                </div>
              </Grid>

              <Grid cols="12 4">
                <div className="box box-default">
                  <div className="box-body">
                    <div className="box-header with-border">
                      <h3 className="box-title">Origem</h3>
                    </div>
                    <Row>
                      <Grid cols="12">
                        <div className="form-group" />
                      </Grid>
                    </Row>
                    <Row>
                      <Field
                        component={DropdownListField}
                        label="Regional A"
                        name="ot_operator_a"
                        cols="12"
                        busySpinner={<span className="fa fa-refresh fa-spin" />}
                        busy={!!(operators.length === 0)}
                        data={operators}
                        textField={() => _.get(ot_operator_a, "regional", "")}
                        textValue={({ item }) => item.regional}
                        itemComponent={({ item }) => (
                          <span>{item.regional}</span>
                        )}
                        placeholder="Regional A"
                        onChange={item => this.loadElementTypesA(item.regional)}
                        msgvalidation={this.validator.message(
                          "ot_operator_a",
                          _.get(ot_operator_a, "regional", ""),
                          "required|alpha"
                        )}
                      />
                    </Row>
                    <Row>
                      <Field
                        component={DropdownListField}
                        label="Tipo de Elemento A"
                        cols="12"
                        name="ot_element_type_a"
                        busySpinner={<span className="fa fa-refresh fa-spin" />}
                        busy={!!(ot_operator_a && element_types_a.length === 0)}
                        data={ot_operator_a ? element_types_a : []}
                        textField={item =>
                          ot_element_type_a ? item.element_type : ""
                        }
                        textValue={({ item }) => item.element_type}
                        itemComponent={({ item }) => (
                          <span>{item.element_type}</span>
                        )}
                        placeholder="Tipo de Elemento A"
                        onChange={item => this.loadElementsA(item.element_type)}
                        msgvalidation={
                          this.validator.message(
                            "ot_element_type_a",
                            auth.user.area.name,
                            `required|BBIP:${_.get(
                              ot_element_type_a,
                              "element_type",
                              ""
                            )},${_.get(ot_element_type_b, "element_type", "")}`
                          ) ||
                          this.validator.message(
                            "ot_element_type_a",
                            _.get(ot_element_type_a, "element_type", ""),
                            "required"
                          )
                        }
                      />
                    </Row>
                    <Row>
                      <Field
                        component={DropdownListField}
                        label="Elemento A"
                        cols="12"
                        name="ot_element_a_id"
                        busySpinner={<span className="fa fa-refresh fa-spin" />}
                        busy={!!(ot_element_type_a && elements_a.length === 0)}
                        data={ot_element_type_a ? elements_a : []}
                        textField={item =>
                          ot_element_a_id ? item.elemento_id : ""
                        }
                        textValue={({ item }) => item.elemento_id}
                        itemComponent={({ item }) => (
                          <span>{item.elemento_id}</span>
                        )}
                        placeholder="Elemento A"
                        onChange={item => {
                          this.loadAddressA(item);
                        }}
                        msgvalidation={this.validator.message(
                          "ot_element_a_id",
                          _.get(ot_element_a_id, "elemento_id", ""),
                          `required|pontaAB:${_.get(
                            ot_element_b_id,
                            "elemento_id",
                            ""
                          )}`
                        )}
                      />
                    </Row>
                    <Row>
                      <Field
                        component={DropdownListField}
                        label="Endereço A"
                        cols="12"
                        name="ot_address_a_id"
                        busySpinner={<span className="fa fa-refresh fa-spin" />}
                        busy={!!(ot_element_a_id && address_a.length === 0)}
                        // data={
                        //   ot_element_a_id
                        //     ? [_.get(ot_element_a_id, "address", null)]
                        //     : []
                        // }
                        data={address_a}
                        textField={item => (ot_address_a_id ? item.id : "")}
                        textValue={({ item }) => item.id}
                        itemComponent={({ item }) => (
                          <span>{`${item.id}`}</span>
                        )}
                        placeholder="Endereço A"
                        msgvalidation={this.validator.message(
                          "ot_address_a_id",
                          _.get(ot_address_a_id, "id", ""),
                          "required"
                        )}
                      />
                      <If
                        test={
                          _.get(ot_address_a_id, "endereco_equipamento", "") !==
                          ""
                        }
                      >
                        <SpanLabel type="primary" cols="12">
                          {_.get(ot_address_a_id, "endereco_equipamento", "")}
                        </SpanLabel>
                        <SpanLabel type="danger" cols="12">
                          {`${_.get(ot_element_a_id, "city", "")} - ${_.get(
                            ot_element_a_id,
                            "state",
                            ""
                          )}`}
                        </SpanLabel>
                      </If>
                    </Row>
                    <Row>
                      <Field
                        component={DropdownListField}
                        name="ot_interface_a"
                        label="Interface A"
                        cols="12"
                        data={interfaces}
                        textField={item => item.interface}
                        textValue={({ item }) => item.interface}
                        itemComponent={({ item }) => (
                          <span>{item.interface}</span>
                        )}
                        placeholder="Interface A"
                        onChange={item => this.changeInterfaceA(item.interface)}
                        msgvalidation={this.validator.message(
                          "ot_interface_a",
                          _.get(ot_interface_a, "interface", ""),
                          "required"
                        )}
                      />
                    </Row>
                    <Row>
                      <Field
                        name="ot_degrau"
                        component={LabelInput}
                        label="Degrau"
                        readOnly
                        validator={this.validator.message(
                          "ot_degrau",
                          ot_degrau || "",
                          "required|alpha_num"
                        )}
                        type="text"
                        cols="6"
                        placeholder="Degrau"
                      />
                      <Field
                        name="ot_banda_final"
                        component={LabelInput}
                        label="Banda Final"
                        validator={this.validator.message(
                          "ot_banda_final",
                          ot_banda_final || "",
                          "integer"
                        )}
                        type="number"
                        min="1"
                        cols="6"
                        placeholder="Banda Final"
                      />
                    </Row>
                    <Row>
                      <Field
                        name="ot_inc_trx"
                        component={LabelInput}
                        label="Incremento de TRX"
                        msgvalidation={this.validator.message(
                          "ot_inc_trx",
                          ot_inc_trx || "",
                          "integer"
                        )}
                        type="number"
                        min="1"
                        cols="6"
                        placeholder="Incremento de TRX"
                      />
                      <Field
                        name="ot_trx"
                        component={LabelInput}
                        label="TRX Final"
                        msgvalidation={this.validator.message(
                          "ot_trx",
                          ot_trx || "",
                          "integer"
                        )}
                        type="number"
                        min="1"
                        cols="6"
                        placeholder="TRX Final"
                      />
                    </Row>
                    <Row>
                      <Field
                        component={DropdownListField}
                        name="ot_frequency"
                        label="Frequência"
                        cols="12 6"
                        busySpinner={<span className="fa fa-refresh fa-spin" />}
                        busy={!!(frequencia.length === 0)}
                        data={frequencia}
                        textField="nome"
                        textValue={({ item }) => item.nome}
                        itemComponent={({ item }) => <span>{item.nome}</span>}
                        placeholder="Frequência"
                        msgvalidation={this.validator.message(
                          "ot_frequency",
                          _.get(ot_frequency, "nome", ""),
                          "required"
                        )}
                      />
                      <Field
                        component={DropdownListField}
                        name="ot_solution"
                        label="Atendimento"
                        cols="12 6"
                        // data={[
                        //   { name: "LL" },
                        //   { name: "FO" },
                        //   { name: "BBIP" },
                        //   { name: "MUX" },
                        //   { name: "MW" },
                        //   { name: "SAT" }
                        // ]}
                        data={[{ name: "LL" }]}
                        textField="name"
                        textValue={({ item }) => (ot_solution ? item.name : "")}
                        itemComponent={({ item }) => <span>{item.name}</span>}
                        placeholder="Atendimento"
                        msgvalidation={this.validator.message(
                          "ot_solution",
                          _.get(ot_solution, "name", ""),
                          "required|alpha_space"
                        )}
                      />
                    </Row>
                    <Row>
                      <Field
                        component={LabelInput}
                        cols="12 4"
                        label="Quant. de links"
                        name="ot_qtd_links"
                        type="number"
                        min="1"
                        placeholder=""
                        msgvalidation={this.validator.message(
                          "ot_qtd_links",
                          ot_qtd_links || "",
                          "required|integer"
                        )}
                      />
                      {ot_interface_a &&
                        ot_interface_a.interface?.search("Ethernet") >= 0 && (
                          <>
                            <Field
                              component={LabelInput}
                              cols="12 4"
                              type="number"
                              label="Velocidade"
                              name="ethernet_ot_speed"
                              min="1"
                              placeholder="0"
                              /* onBlur={event => {
                                 this.setSpeed(event.target.value);
                               }} */
                              onKeyUp={event => {
                                if (event.target.value < 1) {
                                  //this.setSpeed(1)
                                  event.target.value = 0
                                }
                                this.setSpeed(event.target.value);
                              }}
                            />
                            <Field
                              component={DropdownListField}
                              cols="12 4"
                              label="Unidade"
                              name="ethernet_ot_speed_unity"
                              data={[
                                { name: "Kbps" },
                                { name: "Mbps" },
                                { name: "Gbps" }
                              ]}
                              textField="name"
                              placeholder="Mbps"
                              textValue={({ item }) => item.name}
                              // itemComponent={({ item }) => <span>{item.name}</span>}
                              onChange={item => {
                                this.setSpeedUnity(item.name);
                              }}
                              value={({ item }) => item.name}
                            />
                          </>
                        )}
                      {ot_interface_a &&
                        ot_interface_a.interface?.search("Ethernet") < 0 && (
                          <>
                            <Field
                              component={DropdownListField}
                              label="Velocidade"
                              cols="12 8"
                              name="ot_speed"
                              busySpinner={
                                <span className="fa fa-refresh fa-spin" />
                              }
                              busy={!!(speeds.length === 0)}
                              data={speeds}
                              placeholder="Selecionar"
                              textValue={({ item }) =>
                                ot_speed ? item.name : ""
                              }
                              itemComponent={({ item }) => (
                                <span>{item.name}</span>
                              )}
                              textField="name"
                              msgvalidation={this.validator.message(
                                "ot_speed",
                                _.get(ot_speed, "name", ""),
                                "required"
                              )}
                            />
                          </>
                        )}
                    </Row>
                    <Row>
                      <Field
                        component={DropdownListField}
                        name="ot_protection"
                        label="Proteção"
                        cols="12"
                        busySpinner={<span className="fa fa-refresh fa-spin" />}
                        busy={!!(ot_redundancies.length === 0)}
                        data={ot_redundancies}
                        textField="name"
                        textValue={({ item }) =>
                          ot_protection ? item.name : ""
                        }
                        itemComponent={({ item }) => <span>{item.name}</span>}
                        placeholder="Proteção"
                        // onChange={item => {
                        //   if (item.name === "Sem proteção")
                        //     change("ot_protection_type", "");
                        // }}
                        msgvalidation={this.validator.message(
                          "ot_protection",
                          _.get(ot_protection, "name", ""),
                          "required"
                        )}
                      />
                    </Row>
                    <Row>
                      <If
                        test={
                          ot_protection && ot_protection.name === "Com proteção"
                        }
                      >
                        <Grid cols="12 4">
                          <div className="form-group">
                            <label>
                              <input
                                type="checkbox"
                                onClick={event => this.checkProtection(event)}
                                value="Provedor"
                              />
                              Provedor
                            </label>
                          </div>
                        </Grid>
                        <Grid cols="12 4">
                          <div className="form-group">
                            <label>
                              <input
                                type="checkbox"
                                onClick={event => this.checkProtection(event)}
                                value="Placa"
                              />
                              Placa
                            </label>
                          </div>
                        </Grid>
                        <Grid cols="12 4">
                          <div className="form-group">
                            <label>
                              <input
                                type="checkbox"
                                onClick={event => this.checkProtection(event)}
                                value="Dupla"
                              />
                              Dupla Abord.
                            </label>
                          </div>
                        </Grid>
                      </If>
                    </Row>
                    <Row>
                      <If
                        test={
                          ot_protection && ot_protection.name === "Com proteção"
                        }
                      >
                        <SpanLabel type="danger" cols="12">
                          {this.validator.message(
                            "ot_protection",
                            {
                              ot_protection,
                              ot_protection_type
                            },
                            `required|protecao`
                          )}
                        </SpanLabel>
                      </If>
                    </Row>
                  </div>
                </div>
              </Grid>

              {/* <If test={_.get(ot_finality, "name", "") !== "PORTA IP"}> */}
              <Grid cols="12 4">
                <div className="box box-default fade-in">
                  <div className="box-body">
                    <div className="box-header with-border">
                      <h3 className="box-title">Destino</h3>
                    </div>
                    <Row>
                      <Grid cols="12">
                        <div className="form-group" />
                      </Grid>
                    </Row>
                    <Row>
                      <Field
                        component={DropdownListField}
                        label="Regional B"
                        name="ot_operator_b"
                        cols="12"
                        pullright
                        busySpinner={<span className="fa fa-refresh fa-spin" />}
                        busy={!!(operators.length === 0)}
                        data={operators}
                        textField={() => _.get(ot_operator_b, "regional", "")}
                        textValue={({ item }) => item.regional}
                        itemComponent={({ item }) => (
                          <span>{item.regional}</span>
                        )}
                        placeholder="Regional B"
                        onChange={item => this.loadElementTypesB(item.regional)}
                        msgvalidation={this.validator.message(
                          "ot_operator_b",
                          { ot_operator_b },
                          `regionalB:${_.get(ot_finality, "name", "")}`
                        )}
                      />
                    </Row>
                    <Row>
                      <Field
                        component={DropdownListField}
                        label="Tipo de Elemento B"
                        // pullright
                        cols="12"
                        name="ot_element_type_b"
                        busySpinner={<span className="fa fa-refresh fa-spin" />}
                        busy={!!(ot_operator_b && element_types_b.length === 0)}
                        data={element_types_b}
                        textField={item =>
                          ot_element_type_b ? item.element_type : ""
                        }
                        textValue={({ item }) => item.element_type}
                        itemComponent={({ item }) => (
                          <span>{item.element_type}</span>
                        )}
                        placeholder="Tipo de Elemento B"
                        onChange={item => this.loadElementsB(item.element_type)}
                        msgvalidation={
                          this.validator.message(
                            "ot_element_type_b",
                            auth.user.area.name,
                            `required|BBIP:${_.get(
                              ot_element_type_a,
                              "element_type",
                              ""
                            )},${_.get(ot_element_type_b, "element_type", "")}`
                          ) ||
                          this.validator.message(
                            "ot_element_type_b",
                            _.get(ot_element_type_b, "element_type", ""),
                            "required"
                          )
                        }
                      />
                    </Row>
                    <Row>
                      <Field
                        component={DropdownListField}
                        label="Elemento B"
                        cols="12"
                        // pullright
                        name="ot_element_b_id"
                        busySpinner={<span className="fa fa-refresh fa-spin" />}
                        busy={!!(ot_element_type_b && elements_b.length === 0)}
                        data={ot_element_type_b ? elements_b : []}
                        textField={item =>
                          ot_element_b_id ? item.elemento_id : ""
                        }
                        textValue={({ item }) => item.elemento_id}
                        itemComponent={({ item }) => (
                          <span>{item.elemento_id}</span>
                        )}
                        placeholder="Elemento B"
                        onChange={item => {
                          this.loadAddressB(item);
                        }}
                        msgvalidation={this.validator.message(
                          "ot_element_b_id",
                          _.get(ot_element_b_id, "elemento_id", ""),
                          `required|pontaAB:${_.get(
                            ot_element_a_id,
                            "elemento_id",
                            ""
                          )}`
                        )}
                      />
                    </Row>
                    <Row>
                      <Field
                        component={DropdownListField}
                        label="Endereço B"
                        cols="12"
                        name="ot_address_b_id"
                        // pullright
                        busySpinner={<span className="fa fa-refresh fa-spin" />}
                        busy={!!(ot_element_b_id && address_b.length === 0)}
                        data={address_b}
                        textField={item => (ot_address_b_id ? item.id : "")}
                        textValue={({ item }) => item.id}
                        itemComponent={({ item }) => (
                          <span>{`${item.id}`}</span>
                        )}
                        placeholder="Endereço B"
                        msgvalidation={this.validator.message(
                          "ot_address_b_id",
                          _.get(ot_address_b_id, "id", ""),
                          "required"
                        )}
                      />
                      <If
                        test={
                          _.get(ot_address_b_id, "endereco_equipamento", "") !==
                          ""
                        }
                      >
                        <SpanLabel type="primary" cols="12">
                          {_.get(ot_address_b_id, "endereco_equipamento", "")}
                        </SpanLabel>
                        <SpanLabel type="danger" cols="12">
                          {`${_.get(ot_element_b_id, "city", "")} - ${_.get(
                            ot_element_b_id,
                            "state",
                            ""
                          )}`}
                        </SpanLabel>
                      </If>
                    </Row>
                    <Row>
                      <Field
                        component={DropdownListField}
                        name="ot_interface_b"
                        label="Interface B"
                        // pullright
                        cols="12"
                        data={interfaces}
                        textField={item => item.interface}
                        textValue={({ item }) => item.interface}
                        itemComponent={({ item }) => (
                          <span>{item.interface}</span>
                        )}
                        placeholder="Interface B"
                        msgvalidation={this.validator.message(
                          "ot_interface_b",
                          _.get(ot_interface_b, "interface", ""),
                          "required"
                        )}
                      />
                    </Row>
                    <Row>
                      <Grid cols="12">
                        <div className="form-group" />
                      </Grid>
                    </Row>
                  </div>
                </div>
              </Grid>
              {/* </If> */}
            </Row>
          </div>
          <div className="box-footer">
            <Grid cols="6 4 2 1">
              <button
                type="button"
                disabled={submitting}
                className="btn btn-primary"
                onClick={this.submitForm}
              >
                SALVAR
              </button>
            </Grid>
            <Grid cols="6 8 6 11">
              <button
                type="button"
                disabled={submitting}
                className="btn btn-default"
                onClick={this.clear_fields}
              >
                Limpar
              </button>
            </Grid>
          </div>
          <Overlay />
        </div>
        <ModalObsEventual
          LabelButtonSubmit="SALVAR"
          handleClickBtnSubmit={() => { }}
          id="obs_eventual"
          title="OBSERVAÇÃO"
          dimension=""
        >
          <Field
            name="ot_obs_eventual"
            component={TextareaField}
            rows="5"
            cols="auto"
          />
        </ModalObsEventual>
      </form>
    );
  }
}

const Form = reduxForm({ form: "OTForm" })(FormPadrao);
const seletor = formValueSelector("OTForm");
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      checkSegmentUnique,
      loadElementTypesA,
      loadElementTypesB,
      loadElementsA,
      loadElementsB,
      loadAddressA,
      loadAddressB,
      clearValuesForm,
      loadAddressAById,
      loadAddressBById
    },
    dispatch
  );
const mapStateToProps = state => ({
  ot_operator_a: seletor(state, "ot_operator_a"),
  ot_operator_b: seletor(state, "ot_operator_b"),
  ot_element_a_id: seletor(state, "ot_element_a_id"),
  ot_element_b_id: seletor(state, "ot_element_b_id"),
  ot_finality: seletor(state, "ot_finality"),
  ot_element_type_a: seletor(state, "ot_element_type_a"),
  ot_element_type_b: seletor(state, "ot_element_type_b"),
  ot_address_a_id: seletor(state, "ot_address_a_id"),
  ot_address_b_id: seletor(state, "ot_address_b_id"),
  ot_period: seletor(state, "ot_period"),
  ot_duration: seletor(state, "ot_duration"),
  ot_degrau: seletor(state, "ot_degrau"),
  ot_sub_project: seletor(state, "ot_sub_project"),
  ot_interface_a: seletor(state, "ot_interface_a"),
  ot_interface_b: seletor(state, "ot_interface_b"),
  ot_speed: seletor(state, "ot_speed"),
  ot_protection_type: seletor(state, "ot_protection_type"),
  ot_solution: seletor(state, "ot_solution"),
  ot_created_at: seletor(state, "ot_created_at"),
  ot_frequency: seletor(state, "ot_frequency"),
  ot_observacao: seletor(state, "ot_observacao"),
  ot_inc_trx: seletor(state, "ot_inc_trx"),
  ot_trx: seletor(state, "ot_trx"),
  ot_qtd_links: seletor(state, "ot_qtd_links"),
  ot_protection: seletor(state, "ot_protection"),
  ot_banda_final: seletor(state, "ot_banda_final"),
  ot_project: seletor(state, "ot_project"),
  ot_operator_manager: seletor(state, "ot_operator_manager"),
  ot_network: seletor(state, "ot_network"),
  ot_reference: seletor(state, "ot_reference"),
  ot_project_itx: seletor(state, "ot_project_itx"),
  ot_activation_at: seletor(state, "ot_activation_at"),
  ot_rota_nome: seletor(state, "ot_rota_nome"),
  ot_rota_num: seletor(state, "ot_rota_num"),
  ot_obs_eventual: seletor(state, "ot_obs_eventual"),

  frequencia: state.saveOt.dataPreLoad.frequencia,
  operators: state.saveOt.dataPreLoad.operators,
  projects: state.saveOt.dataPreLoad.projects,
  sub_projects: state.saveOt.dataPreLoad.sub_projects,
  finality: state.saveOt.dataPreLoad.finality,
  auth: state.auth,
  element_types: state.saveOt.dataPreLoad.element_types,
  element_types_a: state.saveOt.dataPreLoad.element_types_a,
  element_types_b: state.saveOt.dataPreLoad.element_types_b,
  elements_a: state.saveOt.dataPreLoad.elements_a,
  elements_b: state.saveOt.dataPreLoad.elements_b,
  address_a: state.saveOt.dataPreLoad.address_a,
  address_b: state.saveOt.dataPreLoad.address_b,
  degrau: state.saveOt.dataPreLoad.degrau,
  ot_redundancies: state.saveOt.dataPreLoad.ot_redundancies,
  speeds: state.saveOt.dataPreLoad.speeds
});
export default connect(mapStateToProps, mapDispatchToProps)(Form);
