import React from "react";
import { bindActionCreators } from "redux";
// import SimpleReactValidator from "simple-react-validator";
import { connect } from "react-redux";
import { reduxForm, Field, formValueSelector } from "redux-form";
import { toastr } from "react-redux-toastr";
import { DebounceInput } from "react-debounce-input";
import {
  DropdownListField,
  DateTimePickerField,
  TextareaField,
  LabelInput
} from "../../../common/form/components";
import Grid from "../../../common/layout/grid";
import Row from "../../../common/layout/row";
import Overlay from "../../../common/msg/overlay/overlay";
import {
  update_evt_status,
  get_all_by_ot_segmentation_id,
  get_ot_data_radar
} from "../actions";
import "./styles.css";
import moment from "moment";

const _ = require("lodash");

const CancelarEvtPanel = props => {
  const {
    radarPossibilidades: { evt },
    selection,
    list,
    get_all_by_ot_segmentation_id,
    get_ot_data_radar
  } = props;

  const reloadParent = async () => {
    await get_ot_data_radar(evt.ot_segmentation_id);
    get_all_by_ot_segmentation_id(evt.ot_segmentation_id);
  };

  const buildParams = () => {
    const {
      radarPossibilidades: { evt },
      auth,
      status_id,
      remarks,
      cancelled_at,
      motivo_distrato
    } = props;

    const params = {
      evt: {
        ...evt,
        status_id: _.get(status_id, "id"),
        remarks,
        cancelled_at,
        motivo_distrato
      },
      user: auth.user
    };

    return params;
  };

  const submitForm = async () => {
    const {
      update_evt_status,
      status_id,
      cancelled_at,
      motivo_distrato
    } = props;
    var message = "";
    if (!status_id) {
      message += "Campo Situação obrigatório; ";
    }
    if (!cancelled_at) {
      message += "Campo Data Cancelamento obrigatório; ";
    }
    if (!motivo_distrato) {
      message += "Campo Distrato obrigatório; ";
    }
    if (status_id && cancelled_at && motivo_distrato) {
      await update_evt_status(buildParams());
    } else {
      toastr.warning("Validação", message);
    }
    // console.log(buildParams());
  };

  const status_id_list = [
    { name: "Cancelado", id: 6 },
    { name: "Inviável", id: 9 },
    { name: "Recusado", id: 8 },
    { name: "Eliminado", id: 5 },
    { name: "Distratado", id: 10 }
  ];

  const motivo_distrato = [
    "Proposta Projeto Especial Não Enviada",
    "Projeto Especial Não Aprovado",
    "Atraso da Ativação",
    "Pendência TIM",
    "Demanda Cancelada pela TIM",
    "Outros"
  ];

  return (
    <div className="overlay-wrapper">
      <div className="box-body formatInputPlaceholder">
        {/* Pedido */}
        <div className="box box-solid box-default">
          <div className="box-header with-border">
            <Grid>
              <h3 className="box-title">Pedido de Cotação</h3>
            </Grid>
          </div>
          <div className="box-body inner-box">
            <Row>
              <Row>
                <LabelInput
                  cols="12 2"
                  readOnly
                  placeholder={
                    _.get(evt, "requested_at") ? moment(_.get(evt, "requested_at")).format("DD/MM/YYYY") :
                    "[n/a]"
                  }
                  label="Data do Pedido"
                />
                <LabelInput
                  cols="12 2"
                  readOnly
                  placeholder={_.get(evt, "vendor.name")}
                  label="Provedor"
                />
                <LabelInput
                  cols="12 1"
                  readOnly
                  placeholder={_.get(evt, "")}
                  label="Contratos"
                />
                <Grid cols="12 1">
                  <div className="form-group">
                    <label>
                      <input
                        type="checkbox"
                        readOnly
                        disabled
                        defaultChecked={false}
                        // onClick={event => this.checkProtection(event)}
                        // value="receita"
                      />{" "}
                      Possui receita?
                    </label>
                  </div>
                </Grid>
                <LabelInput
                  cols="12 2"
                  readOnly
                  placeholder={_.get(evt, "request_protocol")}
                  label="Código EVT"
                />
                <LabelInput
                  cols="12 2"
                  readOnly
                  placeholder={
                    _.get(evt, "deadline_at") ? moment(_.get(evt, "deadline_at")).format("DD/MM/YYYY") :
                    "[n/a]"
                  }
                  label="Limite Recebimento"
                />
                <LabelInput
                  cols="12 2"
                  readOnly
                  placeholder={_.get(evt, "contract_time")}
                  label="Pz. contratação"
                />
              </Row>
              <Row>
                <Grid>
                  <h4>
                    <span className="label label-default">
                      EVT aberta por: {_.get(evt, "user_id_open")}
                    </span>
                    <span className="label label-default">
                      Status: {_.get(evt, "evt_status.description")}
                    </span>
                    <span className="label label-default">
                      Quantidade de Links:{" "}
                      {_.get(evt, "ot_segmentation.qtd_links")}
                    </span>
                    <span className="label label-default">
                      Velocidade: {_.get(evt, "ot_speed.name")}
                    </span>
                  </h4>
                </Grid>
              </Row>
            </Row>
          </div>
        </div>

        {/* Proposta */}
        <div className="box box-solid box-default">
          <div className="box-header with-border">
            <Grid>
              <h3 className="box-title">Proposta</h3>
            </Grid>
          </div>
          <div className="box-body inner-box">
            <Row>
              <Row>
                <Grid cols="12 8">
                  <Row>
                    <LabelInput
                      cols="12 3"
                      readOnly
                      placeholder="Real"
                      label="Moeda"
                    />
                    <LabelInput
                      cols="12 3"
                      readOnly
                      label="Data Proposta"
                      placeholder={
                        _.get(evt, "responsed_at") ?  moment(_.get(evt, "responsed_at")).format(
                          "DD/MM/YYYY"
                        ) : "[n/a]"
                      }
                    />
                    <LabelInput
                      cols="12 3"
                      readOnly
                      placeholder={_.get(evt, "response_validity_through")}
                      label="Validade"
                    />
                    <LabelInput
                      cols="12 3"
                      readOnly
                      placeholder={_.get(evt, "activation_time")}
                      label="Pz. ativação"
                    />
                  </Row>
                  <Row>
                    <Grid>
                      <div className="box box-default bg-secondary box_valores_ll">
                        <div className="box-body">
                          <Row>
                            <Grid cols="2">
                              <label>Custo Unitário</label>
                            </Grid>
                            <Grid cols="1">
                              <label>PE</label>
                            </Grid>
                            <Grid cols="2">
                              <label>Sem Impostos</label>
                            </Grid>
                            <Grid cols="2">
                              <label>Com Impostos</label>
                            </Grid>
                            <Grid cols="2">
                              <label>Lpu</label>
                            </Grid>
                            <Grid cols="1">
                              <label>Qtd.</label>
                            </Grid>
                            <Grid cols="2">
                              <label>Total</label>
                            </Grid>
                          </Row>
                          <Row>
                            <Grid cols="2">
                              <label>Mensal</label>
                            </Grid>
                            <Grid cols="1">
                              <input
                                type="checkbox"
                                readOnly
                                disabled
                                defaultChecked={false}
                              />
                            </Grid>
                            <Grid cols="2">
                              <DebounceInput
                                className="form-control"
                                debounceTimeout={800}
                                readOnly
                                placeholder={_.get(evt, "monthly_cost")}
                              />
                            </Grid>
                            <Grid cols="2">
                              <DebounceInput
                                className="form-control"
                                debounceTimeout={800}
                                readOnly
                                placeholder={_.get(evt, "monthly_cost_taxes")}
                              />
                            </Grid>
                            <Grid cols="2">
                              <DebounceInput
                                className="form-control"
                                debounceTimeout={800}
                                readOnly
                                placeholder="Não Aplicável"
                              />
                            </Grid>
                            <Grid cols="1">
                              <DebounceInput
                                className="form-control"
                                debounceTimeout={800}
                                readOnly
                                placeholder={_.get(evt, "quantity")}
                              />
                            </Grid>
                            <Grid cols="2">
                              <DebounceInput
                                className="form-control"
                                debounceTimeout={800}
                                readOnly
                                placeholder={_.get(evt, "monthly_cost_taxes")}
                              />
                            </Grid>
                          </Row>
                          <Row>
                            <Grid cols="2">
                              <label>Instalação</label>
                            </Grid>
                            <Grid cols="1">
                              <input
                                type="checkbox"
                                readOnly
                                disabled
                                defaultChecked={false}
                              />
                            </Grid>
                            <Grid cols="2">
                              <DebounceInput
                                className="form-control"
                                debounceTimeout={800}
                                readOnly
                                placeholder={_.get(evt, "installation_cost")}
                              />
                            </Grid>
                            <Grid cols="2">
                              <DebounceInput
                                className="form-control"
                                debounceTimeout={800}
                                readOnly
                                placeholder={_.get(
                                  evt,
                                  "installation_cost_taxes"
                                )}
                              />
                            </Grid>
                            <Grid cols="2">
                              <DebounceInput
                                className="form-control"
                                debounceTimeout={800}
                                readOnly
                                placeholder="Não Aplicável"
                              />
                            </Grid>
                            <Grid cols="1">
                              <DebounceInput
                                className="form-control"
                                debounceTimeout={800}
                                readOnly
                                placeholder={_.get(evt, "quantity")}
                              />
                            </Grid>
                            <Grid cols="2">
                              <DebounceInput
                                className="form-control"
                                debounceTimeout={800}
                                readOnly
                                placeholder={_.get(
                                  evt,
                                  "installation_cost_taxes"
                                )}
                              />
                            </Grid>
                          </Row>
                        </div>
                      </div>
                    </Grid>
                  </Row>
                </Grid>
                <Grid cols="12 4">
                  <LabelInput cols="12" rows="3" readOnly label="Observação" />
                </Grid>
              </Row>
            </Row>
          </div>
        </div>

        {/* Contratação */}
        <div className="box box-solid box-default">
          <div className="box-header with-border">
            <Grid>
              <h3 className="box-title">Contratação</h3>
            </Grid>
          </div>
          <div className="box-body inner-box">
            <Row>
              <Row>
                <Grid cols="8">
                  <Row>
                    <LabelInput
                      cols="12 2"
                      readOnly
                      placeholder={
                        _.get(evt, "approved_at") ? moment(_.get(evt, "approved_at")).format(
                          "DD/MM/YYYY"
                        ) : "[n/a]"
                      }
                      label="Data de aprovação"
                    />
                    <LabelInput cols="12 2" readOnly label="Contrato" />
                    <LabelInput
                      cols="12 2"
                      readOnly
                      placeholder={_.get(evt, "ot_segmentation.degrau")}
                      label="Degrau Anatel"
                    />
                    <LabelInput
                      cols="12 3"
                      readOnly
                      label="Previsão de Ativação"
                    />
                    <LabelInput cols="12 2" readOnly label="Meio de Acesso" />
                  </Row>
                  <Row>
                    <LabelInput
                      cols="12 4"
                      readOnly
                      label="Previsão de Ativação Negociada"
                    />
                    <LabelInput cols="12 3" readOnly label="Nº de Parcelas" />
                  </Row>
                </Grid>
                <Grid cols="4">
                  <LabelInput cols="12" readOnly label="Observação" />
                </Grid>
              </Row>
            </Row>
          </div>
        </div>

        {/* Cancelamento */}
        <div className="box box-solid box-warning">
          <div className="box-header with-border">
            <Grid>
              <h3 className="box-title">Cancelamento</h3>
            </Grid>
          </div>
          <div className="box-body inner-box">
            <Row>
              <Row>
                <Field
                  name="cancelled_at"
                  label="Data Cancelamento"
                  component={DateTimePickerField}
                  cols="12 2"
                  time={false}
                  placeholder="Data Cancelamento"
                  // msgvalidation={validator.message(
                  //   "cancelled_at",
                  //   cancelled_at,
                  //   "required"
                  // )}
                />
                <Field
                  label="Situação"
                  component={DropdownListField}
                  cols="2"
                  name="status_id"
                  data={status_id_list}
                  textField={item => item.name}
                  textValue={({ item }) => item.id}
                  placeholder="Selecione"
                  // msgvalidation={validator.message(
                  //   "status_id",
                  //   status_id,
                  //   "required"
                  // )}
                />
                <Field
                  label="Distrato"
                  component={DropdownListField}
                  cols="3"
                  name="motivo_distrato"
                  data={motivo_distrato}
                  textField={item => item}
                  textValue={({ item }) => item}
                  placeholder="Selecione"
                  // msgvalidation={validator.message(
                  //   "motivo_distrato",
                  //   motivo_distrato,
                  //   "required"
                  // )}
                />
                <Field
                  component={TextareaField}
                  cols="12 5"
                  rows="1"
                  name="remarks"
                  placeholder="Motivo"
                  label="Motivo"
                />
              </Row>
            </Row>
          </div>
        </div>
      </div>
      <div className="box-footer">
        <button
          type="submit"
          className="btn btn-success pull-left"
          onClick={async () => {
            await submitForm();
            toastr.success("EVT", "EVT atualizado com sucesso.");
            reloadParent();
          }}
        >
          CANCELAR EVT
        </button>
      </div>
      <Overlay />
    </div>
  );
};

const Form = reduxForm({ form: "CancelarEvtPanel" })(CancelarEvtPanel);
const seletor = formValueSelector("CancelarEvtPanel");
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      update_evt_status,
      get_all_by_ot_segmentation_id,
      get_ot_data_radar
    },
    dispatch
  );
const mapStateToProps = state => ({
  auth: state.auth,
  radarPossibilidades: state.radarPossibilidades,
  status_id: seletor(state, "status_id"),
  remarks: seletor(state, "remarks"),
  cancelled_at: seletor(state, "cancelled_at"),
  motivo_distrato: seletor(state, "motivo_distrato")
});
export default connect(mapStateToProps, mapDispatchToProps)(Form);
