import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Overlay from "common/msg/overlay/overlay";
import ReactTooltip from "react-tooltip";
import Grid from "common/layout/grid";
import Row from "common/layout/row";
import ModalFormOT from "common/layout/modal";
import {
  DropdownListField,
  DateTimePickerField,
  TextareaField,
  LabelInput,
  SpanLabel
} from "common/form/components";
import OtMultiGrid from "./ot-multi-grid";
import { reduxForm, Field, formValueSelector, change } from "redux-form";
import get from "lodash/get";
import { check_if_possible } from "./actions";

const _ = require("lodash");

const required = value => (value ? undefined : "Campo obrigatório");

const EncaminharMultiplosSegs = props => {
  const {
    encaminharOtSegReducer: {
      attributes,
      virtual_attributes,
      auxiliar_tables,
      seg_list
    },
    encaminharMultiplosSegs,
    interface_a,
    interface_b,
    ot_redundancy,
    ot_protection_type,
    qtd_links,
    ot_speed,
    order_deadline_at,
    order_code,
    order_remarks,
    auth,
    // actions
    change,
    check_if_possible,
    handleReloadParentPage
  } = props;

  const [enableQtd, setEnableQtd] = React.useState(false);
  const [enableVelocidade, setEnableVelocidade] = React.useState(false);
  const [enableProtecao, setEnableProtecao] = React.useState(false);

  const [segsToSend, setSegsToSend] = React.useState([]);

  const speed_name =
    auxiliar_tables && Object.values(auxiliar_tables)[2].map(n => n);

  const tipo_protecao = _.get(attributes, "protection_type", "");
  const protection_type_boxes = {
    provedor: tipo_protecao ? tipo_protecao.includes("Provedor") : false,
    placa: tipo_protecao ? tipo_protecao.includes("Placa") : false,
    dupla: tipo_protecao ? tipo_protecao.includes("Dupla Abord.") : false
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

  const protection_type = [{ name: "Sem proteção" }, { name: "Com proteção" }];

  const checkProtection = event => {
    const { ot_protection_type, change } = props;
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

  const getSegmentsToSend = () => {
    const {
      encaminharOtSegReducer: {
        attributes,
        virtual_attributes,
        seg_list,
        auxiliar_tables
      },
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
    } = props;

    const fixed_protection_type = ot_protection_type
      ? ot_protection_type.replace(" ", "|")
      : "";

    const getTypeId = nome => {
      var type_list = _.get(auxiliar_tables, "type");

      type_list = type_list.filter(type => type.name === nome);

      if (type_list?.length > 0) {
        return type_list[0].id;
      } else {
        return null;
      }
    };

    var segmentsToSend = [];
    seg_list.map(row => {
      var segmentToSend = {
        ot_seg_id: {
          new_area_owner_id: 120,
          id: _.get(row, "seg_id")
        },
        link_a: {
          solution: "LL",
          element_b_interface: _.get(row, "element_b_interface"),
          redundancy: enableProtecao
            ? _.get(ot_redundancy, "name") === "Com proteção"
              ? 1
              : 2
            : _.get(row, "ot_redundancy_id"),
          qtd_links: qtd_links,
          speed: enableVelocidade
            ? _.get(ot_speed, "id")
            : _.get(row, "ot_speed_id"),
          protection_type: enableProtecao
            ? fixed_protection_type
            : _.get(row, "protection_type"),
          type_solution_ll: "LL",
          element_a_interface: _.get(row, "element_a_interface"),
          ot_type_id: getTypeId(_.get(row, "ot_type_name"))
        },
        order: {
          order_deadline_at: order_deadline_at,
          order_code: order_code,
          order_remarks: order_remarks
        },
        user_id: auth.user.id
      };
      segmentsToSend.push(segmentToSend);
    });
    setSegsToSend(segmentsToSend);
  };

  return (
    <div className="overlay-wrapper">
      <form>
        <div className="box-body">
          <Grid>
            <div className="box box-default">
              <div className="box-body">
                <div className="box-header with-border">
                  <h3 className="box-title">Link</h3>
                </div>
                <Row>
                  <Grid cols="4">
                    <div className="form-group">
                      <label>
                        <input
                          type="checkbox"
                          defaultChecked={false}
                          onChange={event => setEnableQtd(event.target.checked)}
                          value="Qtd.Links"
                        />{" "}
                        Qtd.Links
                      </label>
                    </div>
                  </Grid>
                  <Grid cols="4">
                    <div className="form-group">
                      <label>
                        <input
                          type="checkbox"
                          defaultChecked={false}
                          onChange={event =>
                            setEnableVelocidade(event.target.checked)
                          }
                          value="Velocidade"
                        />{" "}
                        Velocidade
                      </label>
                    </div>
                  </Grid>
                  <Grid cols="4">
                    <div className="form-group">
                      <label>
                        <input
                          type="checkbox"
                          defaultChecked={false}
                          onChange={event =>
                            setEnableProtecao(event.target.checked)
                          }
                          value="Proteção"
                        />{" "}
                        Proteção
                      </label>
                    </div>
                  </Grid>
                </Row>
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
                    validate={required}
                    disabled={!enableQtd}
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
                    validate={required}
                    disabled={!enableVelocidade}
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
                    validate={required}
                    onChange={item => {
                      if (item.name === "Sem proteção")
                        change("ot_protection_type", "");
                    }}
                    disabled={!enableProtecao}
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
                            onChange={event => checkProtection(event)}
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
                            onChange={event => checkProtection(event)}
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
                            onChange={event => checkProtection(event)}
                            value="Dupla Abord."
                          />{" "}
                          Dupla Abord.
                        </label>
                      </div>
                    </Grid>
                    <SpanLabel type="danger" cols="12">
                      {/* {this.validator.message(
                        "ot_protection",
                        {
                          ot_redundancy,
                          ot_protection_type
                        },
                        `required|protecao`
                      )} */}
                    </SpanLabel>
                  </Row>
                )}
                <Row>
                  <LabelInput
                    cols="12"
                    readOnly
                    placeholder="LL"
                    label="Atendimento"
                  />
                </Row>
                <Row>
                  <LabelInput
                    cols="12"
                    readOnly
                    placeholder="LL"
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
                    dropUp
                    time={false}
                    placeholder="Selecione"
                    onInput={e => (e.target.value = "")}
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
                </Row>
              </div>
            </div>
          </Grid>
        </div>
        <div className="box-footer">
          <button
            type="button"
            className="btn btn-primary"
            data-toggle="modal"
            data-target="#ot_multi_grid_encaminhar"
            onClick={() => {
              check_if_possible({
                is_multi_action: true,
                list_of_segments: seg_list
              }).finally($ => getSegmentsToSend());
            }}
            disabled={encaminharMultiplosSegs?.syncErrors}
          >
            Salvar Múltiplos Segmentos
          </button>
        </div>
      </form>
      <Overlay />
      <ModalFormOT
        LabelButtonSubmit=" "
        id="ot_multi_grid_encaminhar"
        title="Ação Múltipla"
        dimension="modal"
      >
        <OtMultiGrid
          segsToSend={segsToSend}
          handleReloadParentPage={handleReloadParentPage}
        />
      </ModalFormOT>
    </div>
  );
};

const EncaminharMultiplosSegForm = reduxForm({
  form: "EncaminharMultiplosSegs"
})(EncaminharMultiplosSegs);
const seletor = formValueSelector("EncaminharMultiplosSegs");

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      check_if_possible
    },
    dispatch
  );

const mapStateToProps = state => {
  return {
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
    encaminharMultiplosSegs: state.form.EncaminharMultiplosSegs,
    encaminharOtSegReducer: state.encaminharOtSeg,
    auth: state.auth,
    ot: state.ot,
    initialValues: {
      qtd_links: get(state, "encaminharOtSeg.attributes.qtd_links"),
      ot_speed: get(state, "encaminharOtSeg.virtual_attributes.ot_speed"),
      ot_redundancy: get(
        state,
        "encaminharOtSeg.virtual_attributes.ot_redundancy"
      )
    },
    enableReinitialize: true
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EncaminharMultiplosSegForm);
