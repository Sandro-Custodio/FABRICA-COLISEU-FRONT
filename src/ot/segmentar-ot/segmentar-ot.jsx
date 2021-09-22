import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { reduxForm, Field, clearFields } from "redux-form";
import Overlay from "common/msg/overlay/overlay";
import Grid from "common/layout/grid";
import Row from "common/layout/row";
import {
  LabelField,
  LabelInput,
  DropdownListField,
  TextareaField
} from "common/form/components";
import get from "lodash/get";
import { Loading } from "common";
import { toastr } from "react-redux-toastr";

import {
  getSegmentarData,
  getElementTypes,
  getElementId,
  getEnderecoId,
  segmentarOT
} from "./actions";

const required = value => (value ? undefined : "Campo obrigatório");
const requiredIfLLA = (value, allValues) =>
  allValues.atendimentoA === "LL"
    ? value
      ? undefined
      : "Campo obrigatório"
    : undefined;
const requiredIfLLB = (value, allValues) =>
  allValues.atendimentoB === "LL"
    ? value
      ? undefined
      : "Campo obrigatório"
    : undefined;

const SegmentarOt = ({ handleReloadParentPage, ...props }) => {
  const {
    segmentarOtForm,
    segmentarOtReducer: { seg, optionsData, regionalData },
    id_seg,
    user_id,
    clearFields
  } = props;

  const [loading, setLoading] = React.useState(false);

  const [placa_a, setPlaca_a] = React.useState(false);
  const [provedor_a, setProvedor_a] = React.useState(false);
  const [dupla_a, setDupla_a] = React.useState(false);

  const [placa_b, setPlaca_b] = React.useState(false);
  const [provedor_b, setProvedor_b] = React.useState(false);
  const [dupla_b, setDupla_b] = React.useState(false);

  const [listEnviarParaA, setListEnviarParaA] = React.useState([]);
  const [listEnviarParaB, setListEnviarParaB] = React.useState([]);

  const regional_list = Array.isArray(regionalData) ? regionalData : [];
  const [elementTypeList, setElementTypeList] = React.useState([]);
  const [elementIdList, setElementIdList] = React.useState([]);
  const [addressList, setAddressList] = React.useState([]);
  const interface_list = [
    "Ethernet Fast",
    "Ethernet GB Eletrica",
    "Ethernet GB Optica Mono",
    "Ethernet GB Optica Multi",
    "G703/G704 Eletrica",
    "STM-m Eletrica",
    "STM-n Optica Mono",
    "STM-n Optica Multi",
    "Interconex",
    "V35"
  ];

  const handleSubmit = () => {
    if (
      segmentarOtForm &&
      segmentarOtForm.values &&
      !segmentarOtForm.syncErrors
    ) {
      // validar se há tipo de proteção caso "Com Proteção" seja escolhido
      if (
        segmentarOtForm.values.redundancyA &&
        segmentarOtForm.values.redundancyA.id === 1 &&
        !placa_a &&
        !provedor_a &&
        !dupla_a
      ) {
        toastr.warning("Escolha um Tipo de Proteção para o Ponto A");
        return;
      }
      if (
        segmentarOtForm.values.redundancyB &&
        segmentarOtForm.values.redundancyB.id === 1 &&
        !placa_b &&
        !provedor_b &&
        !dupla_b
      ) {
        toastr.warning("Escolha um Tipo de Proteção para o Ponto B");
        return;
      }
      // caso haja tipo de proteção, monta em formato string na ordem correta para o banco
      var fixedProtectionTypeA = "";
      var fixedProtectionTypeB = "";
      if (
        segmentarOtForm.values.redundancyA &&
        segmentarOtForm.values.redundancyA.id === 1
      ) {
        if (provedor_a) {
          fixedProtectionTypeA += "Provedor";
        }
        if (placa_a) {
          if (fixedProtectionTypeA.length > 0) {
            fixedProtectionTypeA += "|Placa";
          } else {
            fixedProtectionTypeA += "Placa";
          }
        }
        if (dupla_a) {
          if (fixedProtectionTypeA.length > 0) {
            fixedProtectionTypeA += "|Dupla Abord.";
          } else {
            fixedProtectionTypeA += "Dupla Abord.";
          }
        }
      }
      if (
        segmentarOtForm.values.redundancyB &&
        segmentarOtForm.values.redundancyB.id === 1
      ) {
        if (provedor_b) {
          fixedProtectionTypeB += "Provedor";
        }
        if (placa_b) {
          if (fixedProtectionTypeB.length > 0) {
            fixedProtectionTypeB += "|Placa";
          } else {
            fixedProtectionTypeB += "Placa";
          }
        }
        if (dupla_b) {
          if (fixedProtectionTypeB.length > 0) {
            fixedProtectionTypeB += "|Dupla Abord.";
          } else {
            fixedProtectionTypeB += "Dupla Abord.";
          }
        }
      }
      var link_a = {
        solution: segmentarOtForm.values.atendimentoA,
        speed: segmentarOtForm.values.speedA.id,
        qtd_links: segmentarOtForm.values.qtd_links_a,
        type_solution_ll: segmentarOtForm.values.tipoLLA,
        protection_type: fixedProtectionTypeA,
        redundancy: segmentarOtForm.values.redundancyA.id
      };
      var link_b = {
        solution: segmentarOtForm.values.atendimentoB,
        speed: segmentarOtForm.values.speedB.id,
        qtd_links: segmentarOtForm.values.qtd_links_b,
        type_solution_ll: segmentarOtForm.values.tipoLLB,
        protection_type: fixedProtectionTypeB,
        redundancy: segmentarOtForm.values.redundancyB.id
      };
      var novo_ponto = {
        element_id: segmentarOtForm.values.element_id.elemento_id,
        element_interface: segmentarOtForm.values.interface,
        endereco_id: segmentarOtForm.values.endereco_id.endereco_id,
        element_type: segmentarOtForm.values.element_type.element_type,
        operator: segmentarOtForm.values.regional.operator,
        new_area_owner_id_a: segmentarOtForm.values.enviarParaA
          ? segmentarOtForm.values.enviarParaA.id
          : null,
        new_area_owner_id_b: segmentarOtForm.values.enviarParaB
          ? segmentarOtForm.values.enviarParaB.id
          : null
      };
      // console.log("link_a",link_a)
      // console.log("link_b",link_b)
      // console.log("novo_ponto",novo_ponto)
      setLoading(true);
      const segmentar = segmentarOT(
        id_seg,
        novo_ponto,
        link_a,
        link_b,
        user_id,
        segmentarOtForm.values.observacaoA,
        segmentarOtForm.values.observacaoB
      );

      segmentar
        .then(() => {
          handleReloadParentPage();
          window.$("#segmentar_ot").modal("hide");
          toastr.info("Segmento criado com sucesso!");
        })
        .catch(() => {
          toastr.error("Erro", "Erro ao criar segmento");
          console.log("erro");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <div className="overlay-wrapper" width="device-width">
      <Grid style={{ padding: "0.1vw" }}>
        <Row>
          <Grid cols="2" className="box-body">
            <Row className="box-header with-border">
              <h4 className="box-title" style={{ paddingLeft: "1vw" }}>
                Ponto A
              </h4>
            </Row>
            <Row>
              <Field
                name="regionalA"
                label="Regional"
                component={LabelField}
                disabled
              />
            </Row>
            <Row>
              <Field
                name="tipoElementoA"
                label="Tipo Elemento"
                component={LabelField}
                disabled
              />
            </Row>
            <Row>
              <Field
                name="elementoIdA"
                label="Elemento ID"
                component={LabelField}
                disabled
              />
            </Row>
            <Row>
              <Field
                name="enderecoIdA"
                label="Endereço"
                component={LabelField}
                disabled
              />
            </Row>
            <Row>
              {/* <Field
                name="enderecoA"
                label=""
                component={LabelField}
                disabled={true}
              /> */}
              <div style={{ paddingLeft: "1vw", paddingBottom: "0.6vw" }}>
                {get(segmentarOtForm, "values.enderecoA", "")}
              </div>
            </Row>
            <Row>
              <Field
                name="interfaceA"
                label="Interface"
                component={LabelField}
                disabled
              />
            </Row>
          </Grid>
          <Grid cols="3" className="box-body">
            <Row className="box-header with-border">
              <h4 className="box-title" style={{ paddingLeft: "1vw" }}>
                Link Pontos A-Novo
              </h4>
            </Row>
            <Row>
              <Field
                component={LabelField}
                cols="4"
                type="number"
                name="qtd_links_a"
                min="1"
                validate={required}
              />
              <Grid cols="12 2" style={{ padding: "0vw" }}>
                link(s) de
              </Grid>
              <Field
                label=""
                name="speedA"
                cols="12 6"
                component={DropdownListField}
                data={optionsData.speed}
                textField={item => item.name}
                textValue={({ item }) => item.id}
                validate={required}
              />
            </Row>
            <Row>
              <Field
                label="Proteção"
                name="redundancyA"
                cols="12"
                component={DropdownListField}
                data={optionsData.redundancy}
                textField={item => item.name}
                textValue={({ item }) => item.id}
                validate={required}
              />
            </Row>
            <Row>
              {segmentarOtForm &&
                segmentarOtForm.values &&
                segmentarOtForm.values.redundancyA &&
                segmentarOtForm.values.redundancyA.id === 1 && (
                  <Row>
                    <div style={{ marginLeft: "1vw" }}>
                      <Grid cols="4">
                        <div className="form-group">
                          <label>
                            <input
                              type="checkbox"
                              onClick={() => setProvedor_a(!provedor_a)}
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
                              onClick={() => setPlaca_a(!placa_a)}
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
                              onClick={() => setDupla_a(!dupla_a)}
                              value="Dupla Abord."
                            />{" "}
                            Dupla Abord.
                          </label>
                        </div>
                      </Grid>
                    </div>
                  </Row>
                )}
            </Row>
            <Row>
              <Field
                label="Atendimento"
                name="atendimentoA"
                cols="12"
                component={DropdownListField}
                data={["LL"]}
                textField={item => item}
                textValue={({ item }) => item}
                // validate={required}
              />
            </Row>
            {segmentarOtForm &&
              segmentarOtForm.values &&
              segmentarOtForm.values.atendimentoA &&
              segmentarOtForm.values.atendimentoA === "LL" && (
                <>
                  <Row>
                    <Field
                      label="Tipo de LL"
                      name="tipoLLA"
                      cols="12"
                      component={DropdownListField}
                      // data={["LL", "LL ADSL", "LL SATELITE", "UPGRADE"]}
                      data={["LL"]}
                      textField={item => item}
                      textValue={({ item }) => item}
                      onChange={value => {
                        clearFields("SegmentarOt", false, false, [
                          "enviarParaA"
                        ]);
                        if (value === "LL") {
                          setListEnviarParaA([
                            { id: 120, name: "TEF" },
                            { id: 99, name: "FACILITY LL" }
                          ]);
                        }
                        if (value === "LL ADSL") {
                          setListEnviarParaA([{ id: 120, name: "TEF" }]);
                        }
                        if (value === "LL SATELITE") {
                          setListEnviarParaA([
                            { id: 120, name: "TEF" },
                            { id: 99, name: "FACILITY LL" }
                          ]);
                        }
                        if (value === "LL") {
                          setListEnviarParaA([{ id: 120, name: "TEF" }]);
                        }
                      }}
                      validate={requiredIfLLA}
                    />
                  </Row>
                  <Row>
                    <Field
                      label="Enviar para"
                      name="enviarParaA"
                      cols="12"
                      component={DropdownListField}
                      data={listEnviarParaA}
                      textField={item => item.name}
                      textValue={({ item }) => item.id}
                      validate={requiredIfLLA}
                    />
                  </Row>
                </>
              )}
            <Row>
              <Field
                label="Observação"
                name="observacaoA"
                cols="12"
                component={TextareaField}
                // validate={required}
              />
            </Row>
          </Grid>
          <Grid cols="2" className="box-body">
            <Row className="box-header with-border">
              <h4 className="box-title" style={{ paddingLeft: "1vw" }}>
                Novo Ponto
              </h4>
            </Row>
            <Row>
              <Field
                label="Regional"
                name="regional"
                cols="12"
                component={DropdownListField}
                data={regional_list}
                textField={item => item.operator}
                textValue={({ item }) => item.operator}
                onChange={item => {
                  setLoading(true);
                  clearFields("SegmentarOt", false, false, ["element_type"]);
                  clearFields("SegmentarOt", false, false, ["element_id"]);
                  clearFields("SegmentarOt", false, false, ["endereco_id"]);
                  const tipo = getElementTypes(item.operator);
                  tipo
                    .then(({ elementType }) => {
                      console.log(elementType);
                      setElementTypeList(elementType);
                    })
                    .catch(() => {
                      toastr.error("Falha ao obter dados de Elemento");
                    })
                    .finally(() => {
                      setLoading(false);
                    });
                }}
                validate={required}
              />
            </Row>
            <Row>
              <Field
                label="Tipo Elemento"
                name="element_type"
                cols="12"
                component={DropdownListField}
                data={elementTypeList}
                textField={item => item.element_type}
                textValue={({ item }) => item.element_type}
                onChange={item => {
                  setLoading(true);
                  clearFields("SegmentarOt", false, false, ["element_id"]);
                  clearFields("SegmentarOt", false, false, ["endereco_id"]);
                  const tipo = getElementId(
                    segmentarOtForm.values.regional.operator,
                    item.element_type
                  );
                  tipo
                    .then(({ elementId }) => {
                      console.log(elementId);
                      setElementIdList(elementId);
                    })
                    .catch(() => {
                      toastr.error("Falha ao obter dados de Elemento");
                    })
                    .finally(() => {
                      setLoading(false);
                    });
                }}
                validate={required}
              />
            </Row>
            <Row>
              <Field
                label="Elemento ID"
                name="element_id"
                cols="12"
                component={DropdownListField}
                data={elementIdList}
                textField={item => item.elemento_id}
                textValue={({ item }) => item}
                onChange={item => {
                  setLoading(true);
                  clearFields("SegmentarOt", false, false, ["endereco_id"]);
                  const tipo = getEnderecoId(
                    segmentarOtForm.values.regional.operator,
                    segmentarOtForm.values.element_type.element_type,
                    item.elemento_id
                  );
                  tipo
                    .then(({ enderecoId }) => {
                      console.log(enderecoId);
                      setAddressList(enderecoId);
                    })
                    .catch(() => {
                      toastr.error("Falha ao obter dados de Endereço");
                    })
                    .finally(() => {
                      setLoading(false);
                    });
                }}
                validate={required}
              />
            </Row>
            <Row>
              <Field
                label="Endereço ID"
                name="endereco_id"
                cols="12"
                component={DropdownListField}
                data={addressList}
                textField={item => item.endereco_id}
                textValue={({ item }) => item}
                validate={required}
              />
            </Row>
            <Row>
              <Field
                label="Interface"
                name="interface"
                cols="12"
                component={DropdownListField}
                data={interface_list}
                textField={item => item}
                textValue={({ item }) => item}
                validate={required}
              />
            </Row>
          </Grid>
          <Grid cols="3" className="box-body">
            <Row className="box-header with-border">
              <h4 className="box-title" style={{ paddingLeft: "1vw" }}>
                Link Pontos B-Novo
              </h4>
            </Row>
            <Row>
              <Field
                component={LabelField}
                cols="4"
                type="number"
                name="qtd_links_b"
                min="1"
                validate={required}
              />
              <Grid cols="12 2" style={{ padding: "0vw" }}>
                link(s) de
              </Grid>
              <Field
                label=""
                name="speedB"
                cols="12 6"
                component={DropdownListField}
                data={optionsData.speed}
                textField={item => item.name}
                textValue={({ item }) => item.id}
                validate={required}
              />
            </Row>
            <Row>
              <Field
                label="Proteção"
                name="redundancyB"
                cols="12"
                component={DropdownListField}
                data={optionsData.redundancy}
                textField={item => item.name}
                textValue={({ item }) => item.id}
                validate={required}
              />
            </Row>
            <Row>
              {segmentarOtForm &&
                segmentarOtForm.values &&
                segmentarOtForm.values.redundancyB &&
                segmentarOtForm.values.redundancyB.id === 1 && (
                  <Row>
                    <div style={{ marginLeft: "1vw" }}>
                      <Grid cols="4">
                        <div className="form-group">
                          <label>
                            <input
                              type="checkbox"
                              onClick={() => setProvedor_b(!provedor_b)}
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
                              onClick={() => setPlaca_b(!placa_b)}
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
                              onClick={() => setDupla_b(!dupla_b)}
                              value="Dupla Abord."
                            />{" "}
                            Dupla Abord.
                          </label>
                        </div>
                      </Grid>
                    </div>
                  </Row>
                )}
            </Row>
            <Row>
              <Field
                label="Atendimento"
                name="atendimentoB"
                cols="12"
                component={DropdownListField}
                data={["LL"]}
                textField={item => item}
                textValue={({ item }) => item}
                // validate={required}
              />
            </Row>
            {segmentarOtForm &&
              segmentarOtForm.values &&
              segmentarOtForm.values.atendimentoB &&
              segmentarOtForm.values.atendimentoB === "LL" && (
                <>
                  <Row>
                    <Field
                      label="Tipo de LL"
                      name="tipoLLB"
                      cols="12"
                      component={DropdownListField}
                      // data={["LL", "LL ADSL", "LL SATELITE", "UPGRADE"]}
                      data={["LL"]}
                      textField={item => item}
                      textValue={({ item }) => item}
                      onChange={value => {
                        clearFields("SegmentarOt", false, false, [
                          "enviarParaB"
                        ]);
                        if (value === "LL") {
                          setListEnviarParaB([
                            { id: 120, name: "TEF" },
                            { id: 99, name: "FACILITY LL" }
                          ]);
                        }
                        if (value === "LL ADSL") {
                          setListEnviarParaB([{ id: 120, name: "TEF" }]);
                        }
                        if (value === "LL SATELITE") {
                          setListEnviarParaB([
                            { id: 120, name: "TEF" },
                            { id: 99, name: "FACILITY LL" }
                          ]);
                        }
                        if (value === "LL") {
                          setListEnviarParaB([{ id: 120, name: "TEF" }]);
                        }
                      }}
                      validate={requiredIfLLB}
                    />
                  </Row>
                  <Row>
                    <Field
                      label="Enviar para"
                      name="enviarParaB"
                      cols="12"
                      component={DropdownListField}
                      data={listEnviarParaB}
                      textField={item => item.name}
                      textValue={({ item }) => item.id}
                      validate={requiredIfLLB}
                    />
                  </Row>
                </>
              )}
            <Row>
              <Field
                label="Observação"
                name="observacaoB"
                cols="12"
                component={TextareaField}
                // validate={required}
              />
            </Row>
          </Grid>
          <Grid cols="2" className="box-body">
            <Row className="box-header with-border">
              <h4 className="box-title" style={{ paddingLeft: "1vw" }}>
                Ponto B
              </h4>
            </Row>
            <Row>
              <Field
                name="regionalB"
                label="Regional"
                component={LabelField}
                disabled
              />
            </Row>
            <Row>
              <Field
                name="tipoElementoB"
                label="Tipo Elemento"
                component={LabelField}
                disabled
              />
            </Row>
            <Row>
              <Field
                name="elementoIdB"
                label="Elemento ID"
                component={LabelField}
                disabled
              />
            </Row>
            <Row>
              <Field
                name="enderecoIdB"
                label="Endereço"
                component={LabelField}
                disabled
              />
            </Row>
            <Row>
              {/* <Field
              name="enderecoB"
              label=""
              component={LabelField}
              disabled={true}
            /> */}
              <div style={{ paddingLeft: "1vw", paddingBottom: "0.6vw" }}>
                {get(segmentarOtForm, "values.enderecoB", "")}
              </div>
            </Row>
            <Row>
              <Field
                name="interfaceB"
                label="Interface"
                component={LabelField}
                disabled
              />
            </Row>
          </Grid>
        </Row>
        <Row>
          <button
            type="button"
            className="btn btn-primary pull-right"
            onClick={() => handleSubmit()}
            disabled={segmentarOtForm && segmentarOtForm.syncErrors}
          >
            Adicionar Ponto
          </button>
        </Row>
      </Grid>
      <Overlay />
      {loading && <Loading />}
    </div>
  );
};

SegmentarOt.defaultProps = {
  seg: { id: 1 },
  handleReloadParentPage: () => {
    return false;
  }
};

const Form = reduxForm({ form: "SegmentarOt" })(SegmentarOt);

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      clearFields
    },
    dispatch
  );

const mapStateToProps = (state, props) => {
  let initialOptionsData = get(state, "segmentarOtReducer.optionsData", "");

  return {
    segmentarOtForm: state.form.SegmentarOt,
    segmentarOtReducer: state.segmentarOtReducer,
    id_seg: get(state, "segmentarOtReducer.seg.ot_seg.attributes.id", ""),
    user_id: state.auth.user.id,
    initialValues: {
      regionalA: get(
        state,
        "segmentarOtReducer.seg.ot_seg.virtual_attributes.element_a.operator",
        ""
      ),
      tipoElementoA: get(
        state,
        "segmentarOtReducer.seg.ot_seg.virtual_attributes.element_a.element_type",
        ""
      ),
      elementoIdA: get(
        state,
        "segmentarOtReducer.seg.ot_seg.virtual_attributes.element_a.elemento_id",
        ""
      ),
      enderecoIdA: get(
        state,
        "segmentarOtReducer.seg.ot_seg.virtual_attributes.element_a.endereco_id",
        ""
      ),
      enderecoA: `${get(
        state,
        "segmentarOtReducer.seg.ot_seg.virtual_attributes.element_a.address.endereco_equipamento",
        ""
      )} ${get(
        state,
        "segmentarOtReducer.seg.ot_seg.virtual_attributes.element_a.city",
        ""
      )} - ${get(
        state,
        "segmentarOtReducer.seg.ot_seg.virtual_attributes.element_a.state",
        ""
      )}`,
      interfaceA: get(
        state,
        "segmentarOtReducer.seg.ot_seg.attributes.element_a_interface",
        ""
      ),
      regionalB: get(
        state,
        "segmentarOtReducer.seg.ot_seg.virtual_attributes.element_b.operator",
        ""
      ),
      tipoElementoB: get(
        state,
        "segmentarOtReducer.seg.ot_seg.virtual_attributes.element_b.element_type",
        ""
      ),
      elementoIdB: get(
        state,
        "segmentarOtReducer.seg.ot_seg.virtual_attributes.element_b.elemento_id",
        ""
      ),
      enderecoIdB: get(
        state,
        "segmentarOtReducer.seg.ot_seg.virtual_attributes.element_b.endereco_id",
        ""
      ),
      enderecoB: `${get(
        state,
        "segmentarOtReducer.seg.ot_seg.virtual_attributes.element_b.address.endereco_equipamento",
        ""
      )} ${get(
        state,
        "segmentarOtReducer.seg.ot_seg.virtual_attributes.element_b.city",
        ""
      )} - ${get(
        state,
        "segmentarOtReducer.seg.ot_seg.virtual_attributes.element_b.state",
        ""
      )}`,
      interfaceB: get(
        state,
        "segmentarOtReducer.seg.ot_seg.attributes.element_b_interface",
        ""
      ),
      qtd_links_a: get(
        state,
        "segmentarOtReducer.seg.ot_seg.attributes.qtd_links",
        ""
      ),
      speedA: get(
        state,
        "segmentarOtReducer.seg.ot_seg.virtual_attributes.ot_speed",
        ""
      ),
      qtd_links_b: get(
        state,
        "segmentarOtReducer.seg.ot_seg.attributes.qtd_links",
        ""
      ),
      speedB: get(
        state,
        "segmentarOtReducer.seg.ot_seg.virtual_attributes.ot_speed",
        ""
      ),
      redundancyA: get(
        state,
        "segmentarOtReducer.seg.ot_seg.virtual_attributes.ot_redundancy",
        ""
      ),
      protectionTypeA: get(
        state,
        "segmentarOtReducer.seg.ot_seg.attributes.protection_type",
        "Sem proteção"
      ),
      redundancyB: get(
        state,
        "segmentarOtReducer.seg.ot_seg.virtual_attributes.ot_redundancy",
        ""
      ),
      protectionTypeB: get(
        state,
        "segmentarOtReducer.seg.ot_seg.attributes.protection_type",
        "Sem proteção"
      )
      // qtdLinksA: get(state, "segmentarOtReducer.seg.ot_seg.attributes.qtd_links",""),
      // qtdLinksB: get(state, "segmentarOtReducer.seg.ot_seg.attributes.qtd_links",""),
    },
    enableReinitialize: true
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Form);
