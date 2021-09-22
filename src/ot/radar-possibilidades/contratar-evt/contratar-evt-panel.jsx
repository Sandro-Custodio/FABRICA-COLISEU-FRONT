/* eslint-disable no-use-before-define */
import React, { useEffect } from "react";
import { LabelInput, Label, DateTimePickerField } from "common/form/components";
import DateTimePicker from "react-widgets/lib/DateTimePicker";
import Row from "common/layout/row";
import Grid from "common/layout/grid";
import { IconButton } from "common";
import get from "lodash/get";
import Overlay from "common/msg/overlay/overlay";
import { bindActionCreators } from "redux";
import { toastr } from "react-redux-toastr";
import DemandComp from "common/demand";
import { Field, reduxForm } from "redux-form";
import { connect, useDispatch, useSelector } from "react-redux";
import { Select } from "common/input";
import moment from "moment";
import {
  ChecarQtdeContratos,
  salvarContrato,
  get_ot_data_radar,
  get_all_by_ot_segmentation_id,
  validaFormContratarEVT,
  getOtList,
  show_loader,
  hide_loader
} from "../actions";
import { labels, OPH } from "./columns.json";
import { Section, LabelInputCompRead } from "./comps";
import { FORMAT_DATE_TO_PT_BR } from "common/utils";

const FormularioEvtContrato = props => {
  const {
    linhaSelecionada,
    user,
    formValues,
    contratoEvtInfo,
    getOtList,
    get_ot_data_radar,
    get_all_by_ot_segmentation_id,
    show_loader,
    hide_loader,
    seg_id,
    auth,
    ot,
    change,
    isLoading,
    demandClassifications,
    setDemandClassifications
  } = props;

  const dispatch = useDispatch();
  const reloadParent = async () => {
    await get_ot_data_radar(seg_id);
    get_all_by_ot_segmentation_id(seg_id);
  };

  const DatePicker = props => {
    const { cols, label } = props;
    return (
      <Grid cols={cols}>
        <div className="form-group">
          {label ? <label>{label}</label> : null}
          <DateTimePicker
            format={"DD/MM/YYYY"}
            views={["month", "year", "decade"]}
            {...props}
          />
        </div>
      </Grid>
    );
  };

  useEffect(() => {
    isLoading ? show_loader() : hide_loader();
  }, [isLoading]);

  return (
    <div className="overlay-wrapper">
      <Overlay />
      <form>
        <div className="box-body">
          <Section>
            <Row>
              <Label text="PEDIDO DE COTAÇÃO" />
            </Row>
            <Row>
              <LabelInputCompRead
                cols="2"
                label="Data do pedido"
                value={formataDataCerta(
                  get(linhaSelecionada, "requested_at", "")
                )}
                isData
              />
              <LabelInputCompRead
                cols="2"
                value={get(linhaSelecionada, "vendor.name", "")}
                label="Provedor"
              />
              <LabelInputCompRead
                value={get(linhaSelecionada, "request_protocol", "")}
                label="Código EVT"
                cols="2"
              />
              <LabelInputCompRead
                cols="2"
                value={formataDataCerta(
                  get(linhaSelecionada, "deadline_at", "")
                )}
                label="Limite recebimento"
                isData
              />
              <LabelInputCompRead
                cols="2"
                value={get(linhaSelecionada, "contract_time", "")}
                label="Pz. contratação"
              />
            </Row>
          </Section>
          <Section>
            <Row>
              <Label text="PROPOSTA" />
            </Row>
            <div style={{ display: "flex" }}>
              <LabelInputCompRead
                cols="2"
                value={get(linhaSelecionada, "moeda", "")}
                label="Moeda"
              />
              <LabelInputCompRead
                cols="2"
                value={get(linhaSelecionada, "responsed_at", "")}
                label="Data Proposta"
              />
              <LabelInputCompRead
                cols="2"
                value={get(linhaSelecionada, "response_validity_through", "")}
                label="Validade (1)"
              />
              <LabelInputCompRead
                cols="2"
                value={get(linhaSelecionada, "activation_time", "")}
                label="Pz. ativação (1)"
              />

              <div className="col-xs-4" style={{ display: "flex" }}>
                <Label cols="4" text="(1) em dias" />
              </div>
            </div>
            <Row>
              {labels.map((todo, index) => (
                <Label key={index} {...todo} />
              ))}
            </Row>

            <Row>
              <Label cols="1" text="Mensal" />
              <LabelInputCompRead
                cols="1"
                value={get(linhaSelecionada, "monthly_cost", "0.0")}
              />
              <LabelInputCompRead
                cols="1"
                value={parseFloat(
                  get(formValues, "monthly_cost", "0.0") / 0.9635
                ).toFixed(2)}
              />
              <LabelInputCompRead
                cols="1"
                value={get(linhaSelecionada, "lpu_mens_cost", "0.0")}
              />
              <Label cols="1" text="X" />
              <LabelInputCompRead
                cols="1"
                value={get(linhaSelecionada, "quantity", "")}
              />
              <Label cols="1" text="=" />

              <LabelInputCompRead
                cols="1"
                value={
                  get(linhaSelecionada, "monthly_cost") !== null &&
                    get(linhaSelecionada, "quantity") != null
                    ? (
                      (parseFloat(get(linhaSelecionada, "monthly_cost")) /
                        0.9635) *
                      get(linhaSelecionada, "quantity")
                    ).toFixed(2)
                    : "0.0"
                }
              />
            </Row>

            <Row>
              <Label cols="1" text="Instalação" />
              <LabelInputCompRead
                cols="1"
                value={get(linhaSelecionada, "installation_cost", "0.0")}
              />
              <LabelInputCompRead
                cols="1"
                value={parseFloat(
                  get(formValues, "installation_cost", "0.0") / 0.8765
                ).toFixed(2)}
              />

              <LabelInputCompRead
                cols="1"
                value={get(linhaSelecionada, "lpu_ins_cost", "0.0")}
              />

              <Label cols="1" text="X" />

              <LabelInputCompRead
                cols="1"
                value={get(linhaSelecionada, "quantity", "")}
              />

              <Label cols="1" text="=" />

              <LabelInputCompRead
                cols="1"
                value={
                  get(linhaSelecionada, "installation_cost") !== null &&
                    get(linhaSelecionada, "quantity") != null
                    ? (
                      (parseFloat(
                        get(linhaSelecionada, "installation_cost")
                      ) /
                        0.8765) *
                      get(linhaSelecionada, "quantity")
                    ).toFixed(2)
                    : "0.0"
                }
              />
            </Row>
          </Section>
          <Section>
            <Row>
              <Label cols="2" text="CONTRATAÇÃO" />
            </Row>
            <Row>
              <Field
                name="approved_at"
                time={false}
                label="Data de Aprovação"
                component={DateTimePickerField}
                cols="2"
                defaultValue={new Date()}
                onChange={value => {
                  const activation_time = get(formValues, "activation_time", 0);
                  // const vigencia = get(
                  //  props,
                  //  "linhaSelecionada.contract_time",
                  //  0
                  // );
                  const begin = moment(
                    value.replaceAll("/", "-"),
                    "DD-MM-YYYY"
                  ).toDate();
                  const contract_begin_at = begin.toLocaleDateString();

                  const begin_splited = contract_begin_at.split("/");
                  const begin_inverted = `${begin_splited[1]}/${begin_splited[0]}/${begin_splited[2]}`;
                  // const contract_end_at = moment(begin_inverted)
                  //  .add(vigencia, "month")
                  //  .format("DD/MM/YYYY");

                  const estimated_activation_at = moment(begin_inverted)
                    .add(activation_time, "days")
                    .format("DD/MM/YYYY");

                  dispatch(
                    change("estimated_activation_at", estimated_activation_at)
                  );
                  // dispatch(change("contract_begin_at", contract_begin_at));
                  // dispatch(change("contract_end_at", contract_end_at));
                }}
                onInput={e => {
                  e.target.value = "";
                  return e.target.value;
                }}
              />
              <Field
                contentProps="col-xs-2"
                label="Contrato"
                type="text"
                name="contract_protocol"
                defaultSelect
                size="md"
                component={Select}
                textKey="contrato"
                valueKey="contrato"
                data={contratoEvtInfo || []}
              />
              <Field
                name="degrau"
                label="Degrau Anatel"
                component={LabelInput}
                cols="2"
                disabled
              />
              <Field
                name="estimated_activation_at"
                time={false}
                cols="2"
                label="Previsão de Ativação"
                component={DatePicker}
                defaultValue={
                  get(formValues, "estimated_activation_at")
                    ? new Date(
                      FORMAT_DATE_TO_PT_BR(
                        moment(
                          get(
                            formValues,
                            "estimated_activation_at"
                          ).replaceAll("/", "-"),
                          "DD/MM/YYYY"
                        ).format("DD/MM/YYYY")
                      )
                    )
                    : new Date()
                }
                onInput={e => {
                  e.target.value = "";
                  return e.target.value;
                }}
              />
              <Field
                style={{
                  paddingLeft: 0
                }}
                name="meio_acesso"
                component={Select}
                data={OPH}
                valueKey="value"
                textKey="name"
                label="Meio de Acesso"
                contentProps="col-xs-2"
                size="md"
                defaultSelect
              />
              <Field
                name="numero_parcelas"
                label="Nº de Parcelas"
                component={LabelInput}
                cols="2"
              />
            </Row>
            <Row>
              <Field
                name="request_protocol"
                label="Insira o cód dos protocolos desta Evt separadas por (;)"
                component={LabelInput}
                cols="6"
              />
              <Field
                name="circuitos"
                label="Insira o cód dos circuitos desta Evt separadas por (;)"
                component={LabelInput}
                cols="6"
              />
            </Row>
            <Row>
              <Field
                name="contract_remarks"
                label="Observação"
                component={LabelInput}
                cols="6"
              />
              <Field
                name="gl"
                label="GL"
                component={LabelInput}
                cols="3"
                type='number'
              />
              <Field
                name="oc"
                label="OC"
                component={LabelInput}
                cols="3"
                type='text'
                maxlength='80'
              />
            </Row>
            <Row>
              <Field
                name="controle_ll_guid"
                label="Controle LL GUID"
                component={LabelInput}
                cols="3"
                type='text'
                maxlength='80'
              />
              <Field
                name="trail_id"
                label="Trail ID"
                component={LabelInput}
                cols="3"
                type='text'
                maxlength='80'
              />
              <Field
                style={{
                  paddingLeft: 0
                }}
                name="classificacao_demanda"
                component={Select}
                data={demandClassifications}
                valueKey="id"
                textKey="description"
                label="Classificação da Demanda"
                contentProps="col-xs-3"
                size="md"
                defaultSelect
              />
              {user.role_name === "Technical Efficiency - Governance" && <DemandComp />}
            </Row>
          </Section>
          <Section>
            <Row>
              <Label cols="2" text="CANCELAMENTO" />
            </Row>
            <Row>
              <LabelInputCompRead
                cols="2"
                value={get(linhaSelecionada, "cancelled_at", "")}
                label="Data Cancelamento"
              />

              <LabelInputCompRead
                cols="2"
                value={get(linhaSelecionada, "status_name", "")}
                label="Situação"
              />

              <LabelInputCompRead
                cols="2"
                value={get(linhaSelecionada, "motivo_distrato", "")}
                label="Distrato"
              />
              <LabelInputCompRead
                cols="2"
                value={get(linhaSelecionada, "remarks", "")}
                item="remarks"
                label="Motivo"
              />
            </Row>
          </Section>
          <div className="box-footer">
            <Row>
              <Grid cols="1">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-toggle="modal"
                  data-target="#contratar_evt"
                  disabled={dispatch(validaFormContratarEVT()) === false}
                  onClick={() => {
                    toastr.confirm(
                      "Esta ação salvará dados de contratação para esta EVT, deseja continuar?",
                      {
                        onOk: () => {
                          if (
                            props.segAttachsInfo &&
                            props.segAttachsInfo.length === 0
                          ) {
                            toastr.warning(
                              "A contratação só poderá ser realizada quando o formulário assinado for anexado ao segmento!",
                              "",
                              { timeOut: 0 }
                            );
                          } else {
                            ChecarQtdeContratos(
                              get(linhaSelecionada, "ot_segmentation_id"),
                              get(linhaSelecionada, "vendor_id"),
                              1
                            )
                              .then(async res => {
                                if (res.data[0]) {
                                  show_loader();
                                  await salvarContrato(formValues, user);
                                  await reloadParent();
                                  getOtList(auth, ot);
                                } else {
                                  toastr.info(
                                    "Limite de contratações desta OT já foi alcançado"
                                  );
                                }
                              })
                              .finally(() => {
                                hide_loader();
                              });
                          }
                        }
                      }
                    );
                  }}
                >
                  Contratar
                </button>
              </Grid>
              {/* warning */}
              <Grid cols="1">
                <IconButton
                  icon="info"
                  title="Ajuda."
                  onClick={() => {
                    toastr.info(
                      "Campos obrigatórios: Data de Aprovação, Contrato, Degrau Anatel, Previsão de Ativação, Meio de Acesso, Número de Parcelas e Classificação da Demanda",
                      "",
                      { timeOut: 10000 }
                    );
                  }}
                />
              </Grid>
            </Row>
          </div>
        </div>
      </form>
    </div>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      get_ot_data_radar,
      get_all_by_ot_segmentation_id,
      getOtList,
      show_loader,
      hide_loader
    },
    dispatch
  );

const mapStateToProps = (state, props) => {
  const formatDate = value => {
    return moment(value).toDate();
  };

  const date = new Date();
  const localeDate = date.toLocaleDateString();
  const estimated_date = date.setDate(
    date.getDate() + get(props, "linhaSelecionada.activation_time", 1)
  );
  const estimated_activation = new Date(estimated_date).toLocaleDateString();

  const contracts = get(props, "contratoEvtInfo", []);
  const contract_id = get(props, "linhaSelecionada.contract_id", 0);
  const contract =
    contracts.length > 0
      ? contracts.filter(contract => contract.id === contract_id)[0]?.contrato
      : [];
  // const begin = moment(localeDate.replaceAll("/", "-"), "DD-MM-YYYY").toDate();
  // const contract_begin_at = begin.toLocaleDateString();
  // const vigencia = get(props, "linhaSelecionada.contract_time", 0);
  // const begin_splited = contract_begin_at.split("/");
  // const begin_inverted = `${begin_splited[1]}/${begin_splited[0]}/${begin_splited[2]}`;
  // const contract_end_at = moment(begin_inverted)
  //  .add(vigencia, "month")
  //  .format("DD/MM/YYYY");
  const ot_id = get(props, "linhaSelecionada.ot_id", "");
  const id = get(props, "linhaSelecionada.id", "");
  const vendor_id = get(props, "linhaSelecionada.vendor_id", "");
  const activation_time = get(props, "linhaSelecionada.activation_time", "");
  const response_validity_through = get(
    props,
    "linhaSelecionada.response_validity_through",
    ""
  );
  const monthly_cost = get(props, "linhaSelecionada.monthly_cost", "");
  const lpu_mens_cost = get(props, "linhaSelecionada.lpu_mens_cost", "");
  const lpu_ins_cost = get(props, "linhaSelecionada.lpu_ins_cost", "");
  const installation_cost = get(
    props,
    "linhaSelecionada.installation_cost",
    ""
  );
  const responsed_at = get(props, "linhaSelecionada.responsed_at", "");
  const moeda = get(props, "linhaSelecionada.moeda", "");

  const ot_segmentation_id = get(
    props,
    "linhaSelecionada.ot_segmentation_id",
    ""
  );
  const status_id = get(props, "linhaSelecionada.status_id", "");
  const pms_id = get(props, "linhaSelecionada.pms_id", "");
  const user_id_cancel = get(props, "linhaSelecionada.user_id_cancel", "");
  const user_id_close = get(
    props,
    "linhaSelecionada.user_id_close",
    "user_id_close"
  );
  const user_id_open = get(
    props,
    "linhaSelecionada.user_id_open",
    "user_id_open"
  );
  const degrau = get(props, "linhaSelecionada.ot_segmentation.degrau", "D0");
  const circuitos = get(props, "linhaSelecionada.circuitos", "");
  const request_protocol = get(props, "linhaSelecionada.request_protocol", "");
  const contract_remarks = get(props, "linhaSelecionada.contract_remarks", "");
  const meio_acesso = get(props, "linhaSelecionada.meio_acesso", "");
  const quantity = get(props, "linhaSelecionada.quantity", 1);

  return {
    auth: state.auth,
    ot: state.ot,
    user: get(state, "auth.user"),
    formValues: get(state, "form.Contrato.values", {}),
    initialValues: {
      quantity,
      ot_id,
      circuitos,
      contract_remarks,
      request_protocol,
      numero_parcelas: get(props, "linhaSelecionada.numero_parcelas")
        ? get(props, "linhaSelecionada.numero_parcelas")
        : 1,

      approved_at: get(props, "linhaSelecionada.approved_at")
        ? get(props, "linhaSelecionada.approved_at")
        : localeDate,

      estimated_activation_at: get(
        props,
        "linhaSelecionada.estimated_activation_at"
      )
        ? formatDate(get(props, "linhaSelecionada.estimated_activation_at"))
        : estimated_activation,

      contract_protocol: get(props, "linhaSelecionada.contract_protocol")
        ? get(props, "linhaSelecionada.contract_protocol")
        : contract,

      meio_acesso,
      degrau,
      vendor_id,
      ot_segmentation_id,
      status_id,
      id,
      activation_time,
      response_validity_through,
      monthly_cost,
      lpu_mens_cost,
      lpu_ins_cost,
      installation_cost,
      responsed_at,
      moeda,
      pms_id,
      user_id_cancel,
      user_id_close,
      user_id_open
    },
    enableReinitialize: true
  };
};

const formWrapper = reduxForm({
  form: "Contrato"
})(FormularioEvtContrato);

function PropsAreEqual(prevProps, nextProps) {
  return (
    prevProps.linhaSelecionada === nextProps.linhaSelecionada &&
    prevProps.contratoEvtInfo === nextProps.contratoEvtInfo &&
    prevProps.validaFormContratarEVT === nextProps.validaFormContratarEVT &&
    (prevProps.formValues
      ? prevProps.formValues === nextProps.formValues
      : false)
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(formWrapper, PropsAreEqual));

const formataDataCerta = value =>
  value && moment(value, "YYYY-MM-DD").format("DD/MM/YYYY");
