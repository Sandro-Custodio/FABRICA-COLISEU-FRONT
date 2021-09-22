/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
import React from "react";
import { bindActionCreators } from "redux";
import { LabelInput, Label, DateTimePickerField } from "common/form/components";
import Row from "common/layout/row";
import Grid from "common/layout/grid";
import get from "lodash/get";
import Dropzone from "react-dropzone";
import { toastr } from "react-redux-toastr";
import ReactTooltip from "react-tooltip";
import { Modal, IconButton } from "common";
import Overlay from "common/msg/overlay/overlay";
import { Field, reduxForm } from "redux-form";
import { connect, useDispatch } from "react-redux";
import { Select, Input } from "common/input";
import moment from "moment";
import { labels, OPH } from "./columns.json";
import { Section, LabelInputCompRead } from "./comps";
import HistoricoProposta from "./historico-proposta";
import {
  uploadFile,
  saveAnexoEvt,
  salvarResposta,
  show_loader,
  hide_loader,
  setAttaches,
  deleteAttaches,
  get_ot_data_radar,
  get_all_by_ot_segmentation_id,
  validaForm
} from "../actions";

const _ = require("lodash");

const FormularioEvt = props => {
  const {
    radarPossibilidades,
    pedidoAccord,
    linhaSelecionada,
    user,
    formValues,
    evt_list,
    show_loader,
    hide_loader,
    setAttaches,
    deleteAttaches,
    get_ot_data_radar,
    get_all_by_ot_segmentation_id,
    seg_id,
    isLoading,
    change
  } = props;

  const [open, setOpen] = React.useState(false);
  const [hasDropedFile, setHasDropedFile] = React.useState(false);

  React.useEffect(() => {
    return () => {
      deleteAttaches();
    };
  }, []);

  React.useEffect(() => {
    isLoading ? show_loader() : hide_loader();
  }, [isLoading]);

  const MONTHLY_TAXES = 0.9635;
  const INSTALLATION_TAXES = 0.8765;

  const reloadParent = async () => {
    await get_ot_data_radar(seg_id);
    get_all_by_ot_segmentation_id(seg_id);
  };

  const underLinkLimit = value => {
    // status_id 3 === contratado
    const qtd_contratados = evt_list
      .filter(evt => evt.evt_status.id === 3)
      .reduce((inicial, evt) => {
        return evt.quantity + inicial;
      }, 0);

    const qtdPropostaSomandoContratados = parseInt(value, 10) + qtd_contratados;

    if (
      qtdPropostaSomandoContratados >
      parseInt(
        get(radarPossibilidades, "response.ot_segmentation.qtd_links"),
        10
      )
    ) {
      toastr.info("Quantidade de links Excedida");
      return;
    }

    if (value <= 0) {
      return 1;
    }
    return value;
  };

  const onDrop = files => {
    show_loader();
    const formData = new FormData();
    formData.append("Filedata", files[0]);
    formData.append("new_file_name", files[0].name);
    formData.append("folder_name", "pms/evidencias");

    const parameters = {
      attaches: {
        evt_attaches: [
          {
            original_name: files[0].name,
            repository_name: "pms/evidencias",
            attach_type: "PROPOSTA",
            file_type: files[0].name.split(".").pop(),
            code: linhaSelecionada.request_protocol,
            evt_id: linhaSelecionada.id,
            protocol_date: new Date(),
            user_id: user.id,
            id: 0,
            created_at: new Date()
          }
        ]
      }
    };

    uploadFile(formData)
      .then(({ data }) => {
        toastr.info(data[0]);
        return saveAnexoEvt(parameters);
      })
      .then(() => {
        const aux = get(linhaSelecionada, "evt_attaches", []);
        aux.push({
          original_name: files[0].name,
          created_at: new Date().toLocaleDateString()
        });
        setAttaches(aux);
        setHasDropedFile(true);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        hide_loader();
      });
  };

  // const required = value => value ? undefined : 'Campo obrigatório'
  const dispatch = useDispatch();

  return (
    <div className="overlay-wrapper">
      <Overlay />
      <form className="form">
        <div className="box-body">
          <Section>
            <Row>
              <Label text="PEDIDO DE COTAÇÃO" />
            </Row>
            <Row>
              <LabelInput
                cols="2"
                readOnly
                label="Data do pedido"
                placeholder={
                  _.get(pedidoAccord, "evt.requested_at")
                    ? moment(_.get(pedidoAccord, "evt.requested_at")).format(
                        "DD/MM/YYYY"
                      )
                    : "[n/a]"
                }
              />
              <LabelInputCompRead
                cols="2"
                value={get(linhaSelecionada, "vendor.name", "")}
                label="Provedor"
              />
              <LabelInputCompRead
                value={get(pedidoAccord, "evt.request_protocol", "")}
                label="Código EVT"
                cols="2"
              />
              <LabelInput
                cols="2"
                readOnly
                placeholder={
                  _.get(pedidoAccord, "evt.deadline_at")
                    ? moment(_.get(pedidoAccord, "evt.deadline_at")).format(
                        "DD/MM/YYYY"
                      )
                    : "[n/a]"
                }
                label="Limite recebimento"
              />
              <LabelInputCompRead
                cols="2"
                value={get(pedidoAccord, "evt.contract_time", "")}
                label="Pz. contratação"
              />
            </Row>
          </Section>
          <Section>
            <Row>
              <Label text="PROPOSTA" />
            </Row>
            <div style={{ display: "flex" }}>
              <Field
                style={{
                  paddingLeft: 0
                }}
                name="moeda"
                component={Select}
                data={OPH}
                valueKey="value"
                textKey="name"
                label="Moeda"
                contentProps="col-xs-2"
                size="md"
                defaultSelect
              />
              <Field
                name="responsed_at"
                time={false}
                label="Data Proposta"
                component={DateTimePickerField}
                cols="2"
                onInput={e => {
                  e.target.value = "";
                  return e.target.value;
                }}
              />
              <Field
                name="response_validity_through"
                type="text"
                component={Input}
                text="Validade (1)"
                size="md"
                contentProps="col-xs-2"
              />
              <Field
                name="activation_time"
                component={Input}
                size="md"
                text="Pz. ativação (1)"
                contentProps="col-xs-2"
              />

              <div className="col-xs-4" style={{ display: "flex" }}>
                <Label cols="4" text="(1) em dias" />
                <Dropzone onDrop={onDrop}>
                  {({ getRootProps, getInputProps }) => (
                    <div
                      className="dropzone col-xs-4"
                      data-for="top_dark_float"
                      data-tip="SOLTE O ARQUIVO AQUI."
                      {...getRootProps()}
                    >
                      <input {...getInputProps()} />
                      <i className="fa fa-upload" />
                    </div>
                  )}
                </Dropzone>

                <IconButton
                  className="form-group col-xs-4"
                  icon="search"
                  data-for="top_dark_float"
                  data-tip="Histórico de Propostas Comerciais"
                  onClick={() => {
                    setOpen(true);
                  }}
                />
                <ReactTooltip
                  id="top_dark_float"
                  place="top"
                  type="dark"
                  effect="float"
                />
              </div>
              {open && (
                <Modal
                  open={open}
                  title="Histórico de Propostas Comerciais"
                  dimension="sm"
                  width="60vw"
                  onClose={() => setOpen(false)}
                >
                  <HistoricoProposta linhaSelecionada={linhaSelecionada} />
                </Modal>
              )}
            </div>
            <Row>
              {labels.map((todo, index) => (
                <Label key={index} {...todo} />
              ))}
            </Row>

            <Row>
              <Label cols="1" text="Mensal" />
              <div className="col-xs-1">
                <input
                  type="checkbox"
                  onChange={e => {
                    e.target.checked
                      ? change("month_with_project", 1)
                      : change("month_with_project", 0);
                  }}
                />
              </div>
              <Field
                name="monthly_cost"
                size="sm"
                contentProps="col-xs-1"
                disabled={!hasDropedFile}
                component={Input}
                onBlur={() => {
                  if (
                    get(formValues, "monthly_cost") !== null &&
                    get(formValues, "quantity") != null
                  ) {
                    change(
                      "monthly_cost_taxes",
                      (
                        parseFloat(get(formValues, "monthly_cost")) /
                        MONTHLY_TAXES
                      ).toFixed(2)
                    );
                  }
                }}
              />
              <LabelInputCompRead
                cols="1"
                value={parseFloat(
                  get(formValues, "monthly_cost", "0.0") / MONTHLY_TAXES
                ).toFixed(2)}
              />

              <Field
                name="lpu_mens_cost"
                size="sm"
                contentProps="col-xs-1"
                component={Input}
                disabled
              />

              <Label cols="1" text="X" />

              <Field
                name="quantity"
                size="sm"
                contentProps="col-xs-1"
                component={Input}
                type="number"
                min={1}
                max={get(
                  radarPossibilidades,
                  "response.ot_segmentation.qtd_links",
                  1
                )}
                normalize={underLinkLimit}
                onBlur={() => {
                  if (
                    get(formValues, "monthly_cost") !== null &&
                    get(formValues, "quantity") != null
                  ) {
                    change(
                      "monthly_cost_taxes",
                      (
                        parseFloat(get(formValues, "monthly_cost")) /
                        MONTHLY_TAXES
                      ).toFixed(2)
                    );

                    change(
                      "installation_cost_taxes",
                      (
                        parseFloat(get(formValues, "installation_cost")) /
                        INSTALLATION_TAXES
                      ).toFixed(2)
                    );
                  }
                }}
              />

              <Label cols="1" text="=" />

              <LabelInputCompRead
                cols="1"
                value={
                  get(formValues, "monthly_cost") !== null &&
                  get(formValues, "quantity") != null
                    ? (
                        (parseFloat(get(formValues, "monthly_cost")) /
                          MONTHLY_TAXES) *
                        get(formValues, "quantity")
                      ).toFixed(2)
                    : "0.0"
                }
              />
            </Row>

            <Row>
              <Label cols="1" text="Instalação" />
              <div className="col-xs-1">
                <input
                  type="checkbox"
                  onChange={e => {
                    e.target.checked
                      ? change("ins_with_project", 1)
                      : change("ins_with_project", 0);
                  }}
                />
              </div>
              <Field
                name="installation_cost"
                size="sm"
                contentProps="col-xs-1"
                disabled={!hasDropedFile}
                component={Input}
                onBlur={() => {
                  if (
                    get(formValues, "installation_cost") !== null &&
                    get(formValues, "quantity") != null
                  ) {
                    change(
                      "installation_cost_taxes",
                      (
                        parseFloat(get(formValues, "installation_cost")) /
                        INSTALLATION_TAXES
                      ).toFixed(2)
                    );
                  }
                }}
              />

              <LabelInputCompRead
                cols="1"
                value={parseFloat(
                  get(formValues, "installation_cost", "0.0") /
                    INSTALLATION_TAXES
                ).toFixed(2)}
              />

              <Field
                name="lpu_ins_cost"
                size="sm"
                contentProps="col-xs-1"
                component={Input}
                disabled
              />

              <Label cols="1" text="X" />

              <Field
                name="quantity"
                size="sm"
                contentProps="col-xs-1"
                component={Input}
                type="number"
                initialValue={1}
                min={1}
                max={get(
                  radarPossibilidades,
                  "response.ot_segmentation.qtd_links",
                  1
                )}
                normalize={underLinkLimit}
              />

              <Label cols="1" text="=" />

              <LabelInputCompRead
                cols="1"
                value={
                  get(formValues, "installation_cost") !== null &&
                  get(formValues, "quantity") != null
                    ? (
                        (parseFloat(get(formValues, "installation_cost")) /
                          INSTALLATION_TAXES) *
                        get(formValues, "quantity")
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
              <LabelInput
                cols="2"
                placeholder={
                  (_.get(pedidoAccord, "evt.approved_at") &&
                    moment(_.get(pedidoAccord, "evt.approved_at")).format(
                      "DD/MM/YYYY"
                    )) ||
                  "[n/a]"
                }
                label="Data de Aprovação"
                readOnly
              />
              <LabelInput
                cols="2"
                readOnly
                value={get(pedidoAccord, "evt.contract_protocol", "[n/a]")}
                label="Contrato"
              />
              <LabelInput
                cols="2"
                readOnly
                value={get(pedidoAccord, "evt.degrau", "[n/a]")}
                label="Degrau Anatel"
              />
              <LabelInput
                cols="2"
                label={
                  get(pedidoAccord, "evt.pms_id") &&
                  get(pedidoAccord, "evt.pms_id") !== null
                    ? "Previsão de Ativação Regulamentar"
                    : "Previsão de Ativação"
                }
                placeholder={
                  (_.get(pedidoAccord, "evt.estimated_activation_at") &&
                    moment(
                      _.get(pedidoAccord, "evt.estimated_activation_at")
                    ).format("DD/MM/YYYY")) ||
                  "[n/a]"
                }
                readOnly
              />
              <LabelInput
                cols="2"
                readOnly
                value={get(pedidoAccord, "evt.meio_acesso", "[n/a]")}
                label="Meio de Acesso"
              />
              <LabelInput
                cols="2"
                readOnly
                value={get(pedidoAccord, "evt.numero_parcelas", "[n/a]")}
                label="Nº de Parcelas"
              />
            </Row>
          </Section>
          <Section>
            <Row>
              <Label cols="2" text="CANCELAMENTO" />
            </Row>
            <Row>
              <LabelInput
                cols="2"
                placeholder={
                  (_.get(pedidoAccord, "evt.cancelled_at") &&
                    moment(_.get(pedidoAccord, "evt.cancelled_at")).format(
                      "DD/MM/YYYY"
                    )) ||
                  "[n/a]"
                }
                label="Data Cancelamento"
                readOnly
              />

              <LabelInputCompRead
                cols="2"
                value={get(pedidoAccord, "evt.status_name", "")}
                label="Situação"
              />

              <LabelInputCompRead
                cols="2"
                value={get(pedidoAccord, "evt.motivo_distrato", "")}
                label="Distrato"
              />
              <LabelInputCompRead
                cols="2"
                value={get(pedidoAccord, "evt.remarks", "")}
                item="remarks"
                label="Motivo"
              />
            </Row>
          </Section>
          <div className="box-footer">
            <Row>
              <Grid cols="2">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-toggle="modal"
                  data-target="#editar_proposta"
                  disabled={dispatch(validaForm()) === false}
                  onClick={() => {
                    toastr.confirm(
                      "Esta ação salvará a proposta e alterações no pedido, deseja continuar?",

                      {
                        onOk: () => {
                          salvarResposta({ ...formValues, status_id: 2 }, user);
                          reloadParent();
                        }
                      }
                    );
                  }}
                >
                  Salvar Proposta
                </button>
              </Grid>

              {/* warning */}
              <IconButton
                icon="info"
                title="Ajuda."
                onClick={() => {
                  toastr.info(
                    "Campos obrigatórios: Moeda, Data Proposta, Validade, Pz.ativação, Mensal, Instalação e Quantidade."
                  );
                }}
              />
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
      show_loader,
      hide_loader,
      setAttaches,
      deleteAttaches,
      get_ot_data_radar,
      get_all_by_ot_segmentation_id
    },
    dispatch
  );

const mapStateToProps = (state, props) => {
  const ot_id = get(props, "linhaSelecionada.ot_id", "ot_id");
  const id = get(props, "linhaSelecionada.id", "id");
  const vendor_id = get(props, "linhaSelecionada.vendor_id", "vendor_id");
  const activation_time = get(
    props,
    "linhaSelecionada.activation_time",
    "activation_time"
  );
  const response_validity_through = get(
    props,
    "linhaSelecionada.response_validity_through",
    "response_validity_through"
  );
  const monthly_cost = get(props, "linhaSelecionada.monthly_cost", 0);
  const lpu_mens_cost = get(
    props,
    "linhaSelecionada.lpu_mens_cost",
    "lpu_mens_cost"
  );
  const lpu_ins_cost = get(
    props,
    "linhaSelecionada.lpu_ins_cost",
    "lpu_ins_cost"
  );
  const installation_cost = get(
    props,
    "linhaSelecionada.installation_cost",
    0
  );
  const responsed_at = get(
    props,
    "linhaSelecionada.responsed_at",
    "responsed_at"
  );

  const status_id = get(props, "linhaSelecionada.status_id", "status_id");
  const pms_id = get(props, "linhaSelecionada.pms_id", "pms_id");
  const user_id_cancel = get(
    props,
    "linhaSelecionada.user_id_cancel",
    "user_id_cancel"
  );
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
  const quantity = get(props, "linhaSelecionada.pedidoAccord.evt.quantity", 1);
  const monthly_cost_taxes = get(
    props,
    "linhaSelecionada.monthly_cost_taxes",
    0
  );
  const installation_cost_taxes = get(
    props,
    "linhaSelecionada.installation_cost_taxes",
    0
  );

  return {
    radarPossibilidades: get(state, "radarPossibilidades"),
    evt_list: get(state, "radarPossibilidades.evt_list"),
    user: get(state, "auth.user"),
    formValues: get(state, "form.Proposta.values", {}),
    attaches: get(state, "radarPossibilidades.attaches", []),
    initialValues: {
      quantity,
      ot_id,
      vendor_id,
      status_id,
      id,
      activation_time,
      response_validity_through,
      monthly_cost,
      monthly_cost_taxes,
      month_with_project: 0,
      lpu_mens_cost,
      lpu_ins_cost,
      installation_cost,
      installation_cost_taxes,
      ins_with_project: 0,
      responsed_at,
      moeda: get(props, "linhaSelecionada.moeda")
        ? get(props, "linhaSelecionada.moeda")
        : "REAL",
      pms_id,
      user_id_cancel,
      user_id_close,
      user_id_open
    },
    enableReinitialize: true
  };
};

function PropsAreEqual(prevProps, nextProps) {
  return (
    prevProps.pedidoAccord === nextProps.pedidoAccord &&
    prevProps.linhaSelecionada === nextProps.linhaSelecionada &&
    prevProps.isLoading === nextProps.isLoading &&
    prevProps.formValues === nextProps.formValues
  );
}

const formWrapper = reduxForm({
  form: "Proposta"
})(FormularioEvt);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(formWrapper, PropsAreEqual));
