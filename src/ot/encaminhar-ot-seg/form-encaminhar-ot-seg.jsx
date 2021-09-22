/* eslint-disable react/prefer-stateless-function */
import React, { Component } from "react";
import { reduxForm, Field, formValueSelector } from "redux-form";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SimpleReactValidator from "simple-react-validator";
import "react-widgets/dist/css/react-widgets.css";
import ContentHeader from "../../common/adminLTE/contentHeader";
import Overlay from "../../common/msg/overlay/overlay";
import Grid from "../../common/layout/grid";
import {
  DropdownListField,
  DateTimePickerField,
  TextareaField,
  LabelInput,
  SpanLabel
} from "../../common/form/components";
// import DateTimePicker from "react-widgets/lib/DateTimePicker";
import Row from "../../common/layout/row";
import { get_ot_auxiliar_tables, edit_segmentation } from "./actions";
import { getOtList } from "../list/actions";
import "./styles.css";

const _ = require("lodash");

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

const protection_type = [{ name: "Sem proteção" }, { name: "Com proteção" }];

class FormEncaminharOtSeg extends Component {
  componentWillMount() {
    this.validator = new SimpleReactValidator({
      messages: {
        required: "Campo Obrigatório",
        protecao: "Tipo de proteção obrigatório",
        default: "Validation has failed!"
      },
      validators: {
        protecao: {
          rule: (val, params) => {
            if (_.get(val.ot_redundancy, "name", "") === "Sem proteção") {
              return true;
            }
            if (
              _.get(val.ot_redundancy, "name", "") === "Com proteção" &&
              !!val.ot_protection_type
            ) {
              return true;
            }
            return false;
          }
        }
      },
      element: message => message
    });
  }

  componentDidMount() {
    const { get_ot_auxiliar_tables } = this.props;
    get_ot_auxiliar_tables();
  }

  submitForm = () => {
    const { edit_segmentation } = this.props;
    // this.getSegmentToSend();

    if (this.validator.allValid()) {
      edit_segmentation(this.getSegmentToSend());
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };

  getSegmentToSend = () => {
    const {
      EncaminharOtSeg: { attributes, virtual_attributes },
      interface_a,
      interface_b,
      ot_redundancy,
      ot_protection_type,
      qtd_links,
      ot_speed,
      order_deadline_at,
      order_code,
      order_remarks,
      auth
    } = this.props;

    const fixed_protection_type = ot_protection_type
      ? ot_protection_type.replace(" ", "|")
      : "";

    const SegmentToSend = {
      ot_seg_id: {
        new_area_owner_id: 120,
        id: _.get(attributes, "id")
      },
      link_a: {
        solution: "LL",
        element_b_interface: _.get(interface_b, "interface")
          ? _.get(interface_b, "interface")
          : _.get(attributes, "element_b_interface"),
        redundancy: _.get(ot_redundancy, "name") === "Com proteção" ? 1 : 2,
        qtd_links: qtd_links,
        speed: _.get(ot_speed, "id"),
        protection_type: fixed_protection_type,
        type_solution_ll: "LL",
        element_a_interface: _.get(interface_a, "interface")
          ? _.get(interface_a, "interface")
          : _.get(attributes, "element_a_interface"),
        ot_type_id: _.get(virtual_attributes, "ot_type.id")
      },
      order: {
        order_deadline_at: order_deadline_at,
        order_code: order_code,
        order_remarks: order_remarks
      },
      user_id: auth.user.id
    };
    return SegmentToSend;
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

  render() {
    const _ = require("lodash");

    const {
      EncaminharOtSeg: { attributes, virtual_attributes, auxiliar_tables },
      ot_redundancy,
      ot_protection_type,
      // interface_a,
      // interface_b,
      qtd_links,
      ot_speed,
      change,
      auth,
      ot,
      getOtList
    } = this.props;

    const speed_name =
      auxiliar_tables && Object.values(auxiliar_tables)[2].map(n => n);

    const tipo_protecao = _.get(attributes, "protection_type", "");
    const protection_type_boxes = {
      provedor: tipo_protecao ? tipo_protecao.includes("Provedor") : false,
      placa: tipo_protecao ? tipo_protecao.includes("Placa") : false,
      dupla: tipo_protecao ? tipo_protecao.includes("Dupla Abord.") : false
    };

    return (
      <div className="overlay-wrapper">
        <ContentHeader title="Encaminhar" small="Segmento de OT" />
        <div className="box-body formatInputPlaceholder">
          <Row>
            <Grid cols="12 4">
              <div className="box box-success">
                <div className="box-body">
                  <div className="box-header with-border">
                    <h3 className="box-title">Origem</h3>
                  </div>
                  <Row>
                    <LabelInput
                      cols="12"
                      readOnly
                      name="ot_operator_a"
                      placeholder={
                        _.get(virtual_attributes, "element_a.operator") ||
                        "[n/a]"
                      }
                      label="Regional A"
                    />
                  </Row>
                  <Row>
                    <LabelInput
                      cols="12"
                      readOnly
                      name="ot_element_type_a"
                      placeholder={
                        _.get(virtual_attributes, "element_a.element_type") ||
                        "[n/a]"
                      }
                      label="Tipo Elemento"
                    />
                  </Row>
                  <Row>
                    <LabelInput
                      cols="12"
                      readOnly
                      name="ot_element_a_id"
                      placeholder={
                        _.get(virtual_attributes, "element_a.elemento_id") ||
                        "[n/a]"
                      }
                      label="Elemento ID"
                    />
                  </Row>
                  <Row>
                    <LabelInput
                      cols="12"
                      readOnly
                      placeholder={
                        _.get(virtual_attributes, "element_a.address.id") ||
                        "[n/a]"
                      }
                      label="Endereço"
                    />
                  </Row>
                  <Row>
                    <Grid cols="12">
                      <div className="form-group">
                        <textarea
                          className="form-control"
                          rows="2"
                          id="comment"
                          readOnly
                          placeholder={
                            _.get(
                              virtual_attributes,
                              "element_a.address.endereco_equipamento"
                            ) || "[n/a]"
                          }
                        />
                      </div>
                    </Grid>
                  </Row>
                  <Row>
                    <Grid cols="8">
                      <div className="form-group">
                        <input
                          className="form-control"
                          type="text"
                          placeholder={
                            _.get(virtual_attributes, "element_a.city") ||
                            "[n/a]"
                          }
                          readOnly
                        />
                      </div>
                    </Grid>
                    <Grid cols="4">
                      <div className="form-group">
                        <input
                          className="form-control"
                          type="text"
                          placeholder={
                            _.get(virtual_attributes, "element_a.state") ||
                            "[n/a]"
                          }
                          readOnly
                        />
                      </div>
                    </Grid>
                  </Row>
                  <Row>
                    <Grid cols="12">
                      <div className="form-group">
                        <label>Interface A</label>
                        <Field
                          component={DropdownListField}
                          name="interface_a"
                          className="comboBox_interface"
                          data={interfaces}
                          textField={item => item.interface}
                          textValue={({ item }) => item.interface}
                          itemComponent={({ item }) => (
                            <span>{item.interface}</span>
                          )}
                          placeholder={_.get(attributes, "element_a_interface")}
                          // msgvalidation={this.validator.message(
                          //   "interface_a",
                          //   _.get(interface_a, "interface", ""),
                          //   "required"
                          // )}
                        />
                      </div>
                    </Grid>
                  </Row>
                </div>
              </div>
            </Grid>
            <Grid cols="12 4">
              <div className="box box-default">
                <div className="box-body">
                  <div className="box-header with-border">
                    <h3 className="box-title">Link</h3>
                  </div>
                  <Row>
                    <Grid>
                      <div className="form-group">
                        <label>Velocidade</label>
                      </div>
                    </Grid>
                  </Row>
                  <Row>
                    <Field
                      component={LabelInput}
                      cols="3"
                      type="number"
                      name="qtd_links"
                      min="1"
                      msgvalidation={this.validator.message(
                        "qtd_links",
                        qtd_links,
                        "required"
                      )}
                    />
                    <Grid cols="3">
                      <label>link(s) de </label>
                    </Grid>
                    <Field
                      component={DropdownListField}
                      cols="6"
                      name="ot_speed"
                      data={speed_name}
                      textField={item => item.name}
                      textValue={({ item }) => item.id}
                      placeholder="Selecione"
                      msgvalidation={this.validator.message(
                        "ot_speed",
                        ot_speed,
                        "required"
                      )}
                    />
                  </Row>
                  <Row>
                    <Field
                      component={DropdownListField}
                      name="ot_redundancy"
                      cols="12"
                      data={protection_type}
                      textField={item => item.name}
                      textValue={({ item }) => item.name}
                      placeholder="Tipo de proteção"
                      onChange={item => {
                        if (item.name === "Sem proteção")
                          change("ot_protection_type", "");
                      }}
                      msgvalidation={this.validator.message(
                        "ot_redundancy",
                        ot_redundancy,
                        "required"
                      )}
                    />
                  </Row>
                  {ot_redundancy && ot_redundancy.name === "Com proteção" && (
                    <Row>
                      <Grid cols="4">
                        <div className="form-group">
                          <label>
                            <input
                              type="checkbox"
                              defaultChecked={protection_type_boxes.provedor}
                              onClick={event => this.checkProtection(event)}
                              value="Provedor"
                            />{" "}
                            Provedor
                          </label>
                        </div>
                      </Grid>
                      <Grid cols="4">
                        <div className="form-group">
                          <label>
                            <input
                              type="checkbox"
                              defaultChecked={protection_type_boxes.placa}
                              onClick={event => this.checkProtection(event)}
                              value="Placa"
                            />{" "}
                            Placa
                          </label>
                        </div>
                      </Grid>
                      <Grid cols="4">
                        <div className="form-group">
                          <label>
                            <input
                              type="checkbox"
                              defaultChecked={protection_type_boxes.dupla}
                              onClick={event => this.checkProtection(event)}
                              value="Dupla Abord."
                            />{" "}
                            Dupla Abord.
                          </label>
                        </div>
                      </Grid>
                      <SpanLabel type="danger" cols="12">
                        {this.validator.message(
                          "ot_protection",
                          {
                            ot_redundancy,
                            ot_protection_type
                          },
                          `required|protecao`
                        )}
                      </SpanLabel>
                    </Row>
                  )}
                  <Row>
                    <LabelInput
                      cols="12"
                      readOnly
                      placeholder={"LL"}
                      label="Atendimento"
                    />
                  </Row>
                  <Row>
                    <LabelInput
                      cols="12"
                      readOnly
                      placeholder={"LL"}
                      label="Tipo de LL:"
                    />
                  </Row>
                  <Row>
                    <LabelInput
                      cols="12"
                      readOnly
                      placeholder={"TEF"}
                      label="Enviar Para:"
                    />
                  </Row>
                  <Row>
                    <LabelInput
                      cols="12"
                      readOnly
                      name="ot_type"
                      // value={_.get(virtual_attributes, 'ot_type.id') || '[n/a]'}
                      placeholder={
                        _.get(virtual_attributes, "ot_type.name") || "[n/a]"
                      }
                      label="Tipo"
                    />
                  </Row>
                  <Row>
                    <Field
                      cols="12 6"
                      name="order_code"
                      component={LabelInput}
                      value={_.get(attributes, "order_code") || "[n/a]"}
                      label="Documento"
                    />
                    <Field
                      name="order_deadline_at"
                      label="Prazo"
                      component={DateTimePickerField}
                      value={_.get(attributes, "order_deadline_at")}
                      cols="12 6"
                      time={false}
                      placeholder="Prazo"
                    />
                  </Row>
                  <Row>
                    <Field
                      cols="12"
                      rows="4"
                      name="observacao"
                      component={TextareaField}
                      value={_.get(attributes, "observacao_tef") || "[n/a]"}
                      label="Observação"
                    />
                    {/* <Grid cols="12">
                      <div className="form-group">
                        <label>Observação</label>
                        <textarea
                          className="form-control"
                          name="observacao"
                          rows="4"
                          id="comment"
                          readOnly
                          placeholder={_.get(attributes, 'observacao_tef') || '[n/a]'}
                        />
                      </div>
                    </Grid> */}
                  </Row>
                </div>
              </div>
            </Grid>
            <Grid cols="12 4">
              <div className="box box-info">
                <div className="box-body">
                  <div className="box-header with-border">
                    <h3 className="box-title">Destino</h3>
                  </div>
                  <Row>
                    <LabelInput
                      cols="12"
                      readOnly
                      placeholder={
                        _.get(virtual_attributes, "element_b.operator") ||
                        "[n/a]"
                      }
                      label="Regional B"
                    />
                  </Row>
                  <Row>
                    <LabelInput
                      cols="12"
                      readOnly
                      placeholder={
                        _.get(virtual_attributes, "element_b.element_type") ||
                        "[n/a]"
                      }
                      label="Tipo Elemento"
                    />
                  </Row>
                  <Row>
                    <LabelInput
                      cols="12"
                      readOnly
                      placeholder={
                        _.get(virtual_attributes, "element_b.elemento_id") ||
                        "[n/a]"
                      }
                      label="Elemento ID"
                    />
                  </Row>
                  <Row>
                    <LabelInput
                      cols="12"
                      readOnly
                      placeholder={
                        _.get(virtual_attributes, "element_b.address.id") ||
                        "[n/a]"
                      }
                      label="Endereço"
                    />
                  </Row>
                  <Row>
                    <Grid cols="12">
                      <div className="form-group">
                        <textarea
                          className="form-control"
                          rows="2"
                          id="comment"
                          readOnly
                          placeholder={
                            _.get(
                              virtual_attributes,
                              "element_b.address.endereco_equipamento"
                            ) || "[n/a]"
                          }
                        />
                      </div>
                    </Grid>
                  </Row>
                  <Row>
                    <Grid cols="8">
                      <div className="form-group">
                        <input
                          className="form-control"
                          type="text"
                          placeholder={
                            _.get(virtual_attributes, "element_b.city") ||
                            "[n/a]"
                          }
                          readOnly
                        />
                      </div>
                    </Grid>
                    <Grid cols="4">
                      <div className="form-group">
                        <input
                          className="form-control"
                          type="text"
                          placeholder={
                            _.get(virtual_attributes, "element_b.state") ||
                            "[n/a]"
                          }
                          readOnly
                        />
                      </div>
                    </Grid>
                  </Row>
                  <Row>
                    <Grid cols="12">
                      <div className="form-group">
                        <label>Interface B</label>
                        <Field
                          component={DropdownListField}
                          name="interface_b"
                          className="comboBox_interface"
                          data={interfaces}
                          textField={item => item.interface}
                          textValue={({ item }) => item.interface}
                          itemComponent={({ item }) => (
                            <span>{item.interface}</span>
                          )}
                          placeholder={_.get(attributes, "element_b_interface")}
                          // msgvalidation={this.validator.message(
                          //   "interface_b",
                          //   _.get(interface_b, "interface", ""),
                          //   "required"
                          // )}
                        />
                      </div>
                    </Grid>
                  </Row>
                </div>
              </div>
            </Grid>
          </Row>
        </div>
        <div className="box-footer">
          <Grid>
            <button
              type="submit"
              // disabled={submitting}
              className="btn btn-primary pull-right"
              onClick={() => {
                this.submitForm()
                setTimeout(() => {
                  getOtList(auth, ot)
                }, 3000)
              }}
            >
              SALVAR
            </button>
          </Grid>
        </div>
        <Overlay />
      </div>
    );
  }
}

const Form = reduxForm({ form: "FormEncaminharOtSeg" })(FormEncaminharOtSeg);
const seletor = formValueSelector("FormEncaminharOtSeg");
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      get_ot_auxiliar_tables,
      edit_segmentation,
      getOtList
    },
    dispatch
  );
const mapStateToProps = state => ({
  interface_a: seletor(state, "interface_a"),
  interface_b: seletor(state, "interface_b"),
  ot_redundancy: seletor(state, "ot_redundancy"),
  ot_protection_type: seletor(state, "ot_protection_type"),
  qtd_links: seletor(state, "qtd_links"),
  ot_speed: seletor(state, "ot_speed"),
  ot_type: seletor(state, "ot_type"),
  order_deadline_at: seletor(state, "order_deadline_at"),
  order_code: seletor(state, "order_code"),
  order_remarks: seletor(state, "observacao"),
  EncaminharOtSeg: state.encaminharOtSeg,
  auth: state.auth,
  ot: state.ot
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);
