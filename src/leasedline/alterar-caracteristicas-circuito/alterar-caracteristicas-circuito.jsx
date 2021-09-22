import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { reduxForm, Field, change } from "redux-form";
import ReactTooltip from "react-tooltip";
import get from "lodash/get";
import Overlay from "common/msg/overlay/overlay";
import Grid from "common/layout/grid";
import Row from "common/layout/row";
import {
  DropdownListField,
  LabelField,
  DateTimePickerField,
  TextareaField
} from "common/form/components";
import moment from "moment";
import { update_ll } from "../list/actions";

import { toastr } from "react-redux-toastr";

const required = value => (value ? undefined : "Campo obrigatório");

const AlterarCaracteristicasCircuito = props => {
  const {
    ll,
    edit_ll_form,
    leasedlineReducer: { ll_data, demand_classifications },
    //actions
    reloadParent,
    updateField
  } = props;

  const [checkBoxAjuste, setCheckBoxAjuste] = React.useState(false);

  console.log("@@@@@edit_ll_form@@@@@@", edit_ll_form)
  console.log("@@@@@ll@@@@@@", ll)
  console.log("@@@@@@@@@@@", !(edit_ll_form?.values?.lpu_guid?.lpu_guid  && ll?.status_id === 42))

  const submitForm = () => {
    const { auth, edit_ll_form, ll, update_ll } = props;
    const values = {
      ll: {
        moeda: edit_ll_form?.values?.moeda,
        taxa_ins_s_imp: (""+edit_ll_form?.values?.taxa_ins_s_imp).replace(",","."),
        change_user_id: auth?.user?.id,
        val_link_c_imp_a: (""+edit_ll_form?.values?.val_link_c_imp_a).replace(",","."),
        data_aceite: edit_ll_form?.values?.data_aceite,
        val_link_c_imp_b: (""+edit_ll_form?.values?.val_link_c_imp_b).replace(",","."),
        vigencia: edit_ll_form?.values?.vigencia,
        bilhete_snoa: edit_ll_form?.values?.bilhete_snoa,
        did_tx_b: edit_ll_form?.values?.did_tx_b,
        meio_acesso: edit_ll_form?.values?.meio_acesso,
        id: ll.id,
        lpu_guid: edit_ll_form?.values?.lpu_guid?.lpu_guid,
        val_link_s_imp: (""+edit_ll_form?.values?.val_link_s_imp).replace(",","."),
        taxa_ins_c_imp_a: (""+edit_ll_form?.values?.taxa_ins_c_imp_a).replace(",","."),
        did_tx_a: edit_ll_form?.values?.did_tx_a,
        valor_modem_s_imp: (""+edit_ll_form?.values?.valor_modem_s_imp).replace(",","."),
        data_prev_ativacao: edit_ll_form?.values?.data_prev_ativacao,
        taxa_ins_c_imp_b: edit_ll_form?.values?.taxa_ins_c_imp_b,
        circuito_id: edit_ll_form?.values?.circuito_id,
        os_id: edit_ll_form?.values?.os_id,
        month_with_project: edit_ll_form?.values?.month_with_project,
        segmento_mercado: edit_ll_form?.values?.segmento_mercado,
        status_snoa: edit_ll_form?.values?.status_snoa,
        data_rev_ativacao: edit_ll_form?.values?.data_rev_ativacao,
        group_id_a: edit_ll_form?.values?.agrupador_a.id,
        cambio: edit_ll_form?.values?.cambio,
        ins_with_project: edit_ll_form?.values?.ins_with_project,
        vendor_request_date: edit_ll_form?.values?.vendor_request_date,
        remarks: edit_ll_form?.values?.remarks,
        group_id_b: edit_ll_form?.values?.agrupador_b.id,
        cancel_end_at: edit_ll_form?.values?.cancel_end_at,
        possui_carencia: edit_ll_form?.values?.possui_carencia,
        valor_modem_c_imp: (""+edit_ll_form?.values?.valor_modem_c_imp).replace(",","."),
        data_ativacao: edit_ll_form?.values?.data_ativacao,
        id_circuit_bill: edit_ll_form?.values?.id_circuit_bill,
        degrau: edit_ll_form?.values?.degrau,
        vendor_date: edit_ll_form?.values?.vendor_date,
        gl: edit_ll_form?.values?.gl,

        classificacao_demanda: edit_ll_form?.values?.classificacao_demanda?.id,
        controle_ll_guid: edit_ll_form?.values?.controle_ll_guid,
        divulgacao: edit_ll_form?.values?.divulgacao,
        rede_normalizada: edit_ll_form?.values?.rede_normalizada,
        trail_id: edit_ll_form?.values?.trail_id,
        oc: edit_ll_form?.values?.oc
      },
      ll_itx: {
        equipamento: edit_ll_form?.values?.equipamento,
        ip_mascara: edit_ll_form?.values?.ip_mascara,
        rota_numero: edit_ll_form?.values?.rota_numero,
        tipo_rota_id: edit_ll_form?.values?.tipo_rota_id,
        porta: edit_ll_form?.values?.porta
      }
    };

    if (edit_ll_form && !edit_ll_form.syncErrors) {
      Promise.all([update_ll(values)]).then($ => {
        window.$(`#alterar-caracteristicas-circuito`).modal("hide");
        reloadParent();
      });
    }
  };

  const setLpuValues = value => {
    if (value?.mens_s_imp) {
      updateField("val_link_s_imp", value.mens_s_imp);
      updateField("val_link_c_imp_a", calculateTax(value.mens_s_imp));
    }
    // if(value?.mens_c_imp){
    //   updateField("val_link_c_imp_a", value.mens_c_imp)
    if (value?.inst_s_imp) updateField("taxa_ins_s_imp", value.inst_s_imp);
    if (value?.inst_c_imp) updateField("taxa_ins_c_imp_a", value.inst_c_imp);
  };

  const calculateTax = value => {
    if (!value) return parseFloat("0.00").toFixed(2);
    var aux = parseFloat(("" + value).replace(",", "."));
    if (aux > 0) return (aux / 0.9635).toFixed(2);
    else return parseFloat("0.00").toFixed(2);
  };

  return (
    <div className="overlay-wrapper">
      <form>
        <div className="body">
          <Grid cols="12">
            <div className="box box-default" style={{ padding: "0.6vw" }}>
              <Row>
                <Field
                  label="Código OT"
                  name="ot_code"
                  cols="12 2"
                  component={LabelField}
                  readOnly
                />
                <Field
                  label="Provedor"
                  name="vendor"
                  cols="12 2"
                  component={LabelField}
                  readOnly
                />
                <Field
                  label="Status"
                  name="status"
                  cols="12 2"
                  component={LabelField}
                  readOnly
                />
                <Field
                  label="Status Snoa"
                  name="status_snoa"
                  cols="12 2"
                  component={LabelField}
                  readOnly
                />
                <Field
                  label="Ponta A"
                  name="ponta_a"
                  cols="12 2"
                  component={LabelField}
                  readOnly
                />
                <Field
                  label="Ponta B"
                  name="ponta_b"
                  cols="12 2"
                  component={LabelField}
                  readOnly
                />
              </Row>
              <Row>
                <Field
                  label="Bilhete SNOA"
                  name="bilhete_snoa"
                  cols="12 2"
                  component={LabelField}
                  readOnly
                />
                <Field
                  label="EVT"
                  name="evt"
                  cols="12 2"
                  component={LabelField}
                  readOnly
                />
                <Field
                  label="Contrato"
                  name="contract"
                  cols="12 2"
                  component={LabelField}
                />
                <Field
                  label="Velocidade"
                  name="speed"
                  cols="12 2"
                  component={LabelField}
                  readOnly
                />
                <Field
                  label="Agrupador A"
                  name="agrupador_a"
                  cols="12 2"
                  component={DropdownListField}
                  data={ll_data?.llCombosArray?.agrupadores}
                  textField={item => item.name}
                  textValue={item => item}
                  placeholder={"Selecione"}
                  validate={required}
                />
                <Field
                  label="Agrupador B"
                  name="agrupador_b"
                  cols="12 2"
                  component={DropdownListField}
                  data={ll_data?.llCombosArray?.agrupadores}
                  textField={item => item.name}
                  textValue={item => item}
                  placeholder={"Selecione"}
                />
              </Row>
              <Row>
                <Field
                  label="Vigência"
                  name="vigencia"
                  cols="12 2"
                  component={LabelField}
                />
                <Field
                  label="Degrau"
                  name="degrau"
                  cols="12 2"
                  component={DropdownListField}
                  data={[
                    "D0",
                    "D1",
                    "D2",
                    "D3",
                    "D4",
                    "D5",
                    "D6",
                    "D7",
                    "D8",
                    "INT",
                    "SAT"
                  ]}
                  textField={item => item}
                  textValue={item => item}
                  placeholder={"Selecione"}
                  validate={required}
                />
                {ll?.status_id === 42 && (
                  <Field
                    label="Circuito"
                    name="circuito_id"
                    cols="12 2"
                    component={LabelField}
                    validate={required}
                  />
                )}
                {ll?.status_id != 42 && (
                  <Field
                    label="Circuito"
                    name="circuito_id"
                    cols="12 2"
                    component={LabelField}
                  />
                )}
                <Field
                  label="Id Circuito Fatura"
                  name="id_circuit_bill"
                  cols="12 2"
                  component={LabelField}
                />
                <Field
                  label="DID TX A"
                  name="did_tx_a"
                  cols="12 2"
                  component={LabelField}
                />
                <Field
                  label="DID TX B"
                  name="did_tx_b"
                  cols="12 2"
                  component={LabelField}
                />
              </Row>
            </div>
          </Grid>

          <Grid cols="6">
            <div className="box box-default" style={{ padding: "0.6vw" }}>
              <Row>
                <Field
                  label="Data de contratação"
                  name="data_contratacao"
                  cols="12 4"
                  component={DateTimePickerField}
                  time={false}
                  placeholder={
                    get(props.ll, "data_solicitacao")
                      ? moment(get(props.ll, "data_solicitacao")).format(
                          "DD/MM/YYYY"
                        )
                      : ""
                  }
                />
                <Field
                  label="Início de Vigência de Contrato"
                  name="inicio_vigencia"
                  cols="12 5"
                  component={DateTimePickerField}
                  time={false}
                  placeholder={
                    get(props.ll, "contract_begin_at")
                      ? moment(get(props.ll, "contract_begin_at")).format(
                          "DD/MM/YYYY"
                        )
                      : ""
                  }
                />
                <Grid cols="3">
                  <Row>
                    <label>Possui Carência?</label>
                  </Row>
                  <Row>
                    <Field
                      name="possui_carencia"
                      component="input"
                      type="radio"
                      value="1"
                      // checked={edit_ll_form?.values?.possui_carencia === "1"}
                    />{" "}
                    SIM
                  </Row>
                  <Row>
                    <Field
                      name="possui_carencia"
                      component="input"
                      type="radio"
                      value="0"
                      // checked={edit_ll_form?.values?.possui_carencia === "0"}
                    />{" "}
                    NÃO
                  </Row>
                </Grid>
              </Row>
              <Row>
                <Field
                  label="Prev de Ativação"
                  name="data_prev_ativacao"
                  cols="12 4"
                  component={DateTimePickerField}
                  time={false}
                  placeholder={
                    get(props.ll, "data_prev_ativacao")
                      ? moment(get(props.ll, "data_prev_ativacao")).format(
                          "DD/MM/YYYY"
                        )
                      : ""
                  }
                />
                <Field
                  label="Término de Vigência de Contrato"
                  name="contract_end_at"
                  cols="12 5"
                  component={DateTimePickerField}
                  time={false}
                  placeholder={
                    get(props.ll, "contract_end_at")
                      ? moment(get(props.ll, "contract_end_at")).format(
                          "DD/MM/YYYY"
                        )
                      : ""
                  }
                />
              </Row>
              <Row>
                <Field
                  label="Observação"
                  name="remarks"
                  cols="8"
                  component={TextareaField}
                  type="text"
                />
                <Grid cols="4">
                  <Row>
                    <Field
                      name="check_box_ajuste_preco"
                      component="input"
                      type="checkbox"
                      onClick={() => setCheckBoxAjuste(!checkBoxAjuste)}
                      disabled={!(ll?.status_id === 42)}
                    />
                    <label
                      style={{ paddingLeft: "0.3vw", paddingBottom: "0.3vw" }}
                    >
                      Ajuste de Preço
                    </label>
                  </Row>
                  {checkBoxAjuste && ll?.status_id === 42 && (
                    <Row>
                      <Field
                        label=""
                        name="ajuste_preco"
                        cols="12"
                        component={DateTimePickerField}
                        time={false}
                        validate={required}
                      />
                    </Row>
                  )}
                </Grid>
              </Row>
            </div>
          </Grid>

          <Grid cols="6">
            <div
              className="box box-default"
              style={{ padding: "0.6vw", backgroundColor: "#F8F8F8" }}
            >
              <Row>
                <Grid cols="3">
                  <label
                    className="pull-right"
                    data-for="top_dark_float"
                    data-tip="Projetos Especiais"
                    style={{ color: "red" }}
                  >
                    {"PE"}
                  </label>
                  <ReactTooltip
                    id="top_dark_float"
                    place="top"
                    type="dark"
                    effect="float"
                  />
                </Grid>
                <Grid cols="3">
                  <label>{"Sem Impostos"}</label>
                </Grid>
                <Grid cols="3">
                  <label>{"Com Impostos A"}</label>
                </Grid>
                <Grid cols="3">
                  <label>{"Com Impostos B"}</label>
                </Grid>
              </Row>
              <Row>
                <Grid cols="3">
                  <Field
                    className="pull-right"
                    component="input"
                    type="checkbox"
                    name="month_with_project"
                    checked={edit_ll_form?.values?.month_with_project}
                  />
                  <label className="pull-right" style={{ marginRight: "1vw" }}>
                    {"Mensal"}
                  </label>
                </Grid>
                <Field
                  label=""
                  name="val_link_s_imp"
                  cols="12 3"
                  component={LabelField}
                  disabled={!(!edit_ll_form?.values?.lpu_guid?.lpu_guid  && ll?.status_id === 42)}
                  onInput={e => {
                    e.target.value = ("" + e.target.value).replace(
                      /[^0-9,.]/g,
                      ""
                    );
                    updateField(
                      "val_link_c_imp_a",
                      calculateTax(e.target.value)
                    );
                  }}
                />
                <Field
                  label=""
                  name="val_link_c_imp_a"
                  cols="12 3"
                  component={LabelField}
                  disabled={!(!edit_ll_form?.values?.lpu_guid?.lpu_guid  && ll?.status_id === 42)}
                  onInput={e => {
                    e.target.value = ("" + e.target.value).replace(
                      /[^0-9,.]/g,
                      ""
                    );
                  }}
                />
                <Field
                  label=""
                  name="val_link_c_imp_b"
                  cols="12 3"
                  component={LabelField}
                  disabled={!(!edit_ll_form?.values?.lpu_guid?.lpu_guid  && ll?.status_id === 42)}
                  onInput={e => {
                    e.target.value = ("" + e.target.value).replace(
                      /[^0-9,.]/g,
                      ""
                    );
                  }}
                />
              </Row>
              <Row>
                <Grid cols="3">
                  <Field
                    className="pull-right"
                    component="input"
                    type="checkbox"
                    name="ins_with_project"
                    checked={edit_ll_form?.values?.ins_with_project}
                  />
                  <label className="pull-right" style={{ marginRight: "1vw" }}>
                    {"Instalação"}
                  </label>
                </Grid>
                <Field
                  label=""
                  name="taxa_ins_s_imp"
                  cols="12 3"
                  component={LabelField}
                  disabled={!(!edit_ll_form?.values?.lpu_guid?.lpu_guid  && ll?.status_id === 42)}
                  onInput={e => {
                    e.target.value = ("" + e.target.value).replace(
                      /[^0-9,.]/g,
                      ""
                    );
                  }}
                />
                <Field
                  label=""
                  name="taxa_ins_c_imp_a"
                  cols="12 3"
                  component={LabelField}
                  disabled={!(!edit_ll_form?.values?.lpu_guid?.lpu_guid  && ll?.status_id === 42)}
                  onInput={e => {
                    e.target.value = ("" + e.target.value).replace(
                      /[^0-9,.]/g,
                      ""
                    );
                  }}
                />
                <Field
                  label=""
                  name="taxa_ins_c_imp_b"
                  cols="12 3"
                  component={LabelField}
                  disabled={!(!edit_ll_form?.values?.lpu_guid?.lpu_guid  && ll?.status_id === 42)}
                  onInput={e => {
                    e.target.value = ("" + e.target.value).replace(
                      /[^0-9,.]/g,
                      ""
                    );
                  }}
                />
              </Row>
              <Row>
                <Grid cols="3">
                  <label className="pull-right">{"Modem"}</label>
                </Grid>
                <Field
                  label=""
                  name="valor_modem_s_imp"
                  cols="12 3"
                  component={LabelField}
                  onInput={e => {
                    e.target.value = ("" + e.target.value).replace(
                      /[^0-9,.]/g,
                      ""
                    );
                  }}
                />
                <Field
                  label=""
                  name="valor_modem_c_imp"
                  cols="12 3"
                  component={LabelField}
                  onInput={e => {
                    e.target.value = ("" + e.target.value).replace(
                      /[^0-9,.]/g,
                      ""
                    );
                  }}
                />
              </Row>
              <Row>
                <Field
                  label="Moeda"
                  name="moeda"
                  cols="12 3"
                  component={DropdownListField}
                  data={["REAL", "DOLAR", "EURO"]}
                  textField={item => item}
                  textValue={item => item}
                  placeholder={"Selecione"}
                />
                <Field
                  label="Câmbio"
                  name="cambio"
                  cols="12 3"
                  component={LabelField}
                />
                <Field
                  label="Rede"
                  name="rede"
                  cols="12 3"
                  component={LabelField}
                  readOnly
                />
              </Row>
            </div>
          </Grid>

          <Grid cols="12">
            <div className="box box-default" style={{ padding: "0.6vw" }}>
              <Row>
                <Field
                  label="Previsão Revisada"
                  name="data_rev_ativacao"
                  cols="12 2"
                  component={DateTimePickerField}
                  time={false}
                  placeholder={
                    get(props.ll, "data_rev_ativacao")
                      ? moment(get(props.ll, "data_rev_ativacao")).format(
                          "DD/MM/YYYY"
                        )
                      : ""
                  }
                />
                <Field
                  label="Data de Agendamento"
                  name="vendor_request_date"
                  cols="12 2"
                  component={DateTimePickerField}
                  time={false}
                  placeholder={
                    get(props.ll, "vendor_request_date")
                      ? moment(get(props.ll, "vendor_request_date")).format(
                          "DD/MM/YYYY"
                        )
                      : ""
                  }
                />
                <Field
                  label="Ativada em"
                  name="data_ativacao"
                  cols="12 2"
                  component={DateTimePickerField}
                  time={false}
                  placeholder={
                    get(props.ll, "data_ativacao")
                      ? moment(get(props.ll, "data_ativacao")).format(
                          "DD/MM/YYYY"
                        )
                      : ""
                  }
                  readOnly
                />
                <Field
                  label="Data de Aceite"
                  name="data_aceite"
                  cols="12 2"
                  component={DateTimePickerField}
                  time={false}
                  placeholder={
                    get(props.ll, "data_aceite")
                      ? moment(get(props.ll, "data_aceite")).format(
                          "DD/MM/YYYY"
                        )
                      : ""
                  }
                  readOnly
                />
                <Field
                  label="Data de Desativação"
                  name="cancel_end_at"
                  cols="12 2"
                  component={DateTimePickerField}
                  time={false}
                  placeholder={
                    get(props.ll, "cancel_end_at")
                      ? moment(get(props.ll, "cancel_end_at")).format(
                          "DD/MM/YYYY"
                        )
                      : ""
                  }
                  readOnly
                />
                <Field
                  label="GL"
                  name="gl"
                  cols="12 2"
                  component={LabelField}
                  type="number"
                />
              </Row>
              <Row>
                <Field
                  label="Tipo de Rota"
                  name="tipo_rota_id"
                  cols="12 2"
                  component={LabelField}
                />
                <Field
                  label="Data de Entrega"
                  name="vendor_date"
                  cols="12 2"
                  component={DateTimePickerField}
                  time={false}
                  placeholder={
                    get(props.ll, "vendor_date")
                      ? moment(get(props.ll, "vendor_date")).format(
                          "DD/MM/YYYY"
                        )
                      : ""
                  }
                />
                <Field
                  label="Rota Número"
                  name="rota_numero"
                  cols="12 2"
                  component={LabelField}
                />
                <Field
                  label="End IP / Máscara"
                  name="ip_mascara"
                  cols="12 2"
                  component={LabelField}
                />
                <Field
                  label="Porta"
                  name="porta"
                  cols="12 2"
                  component={LabelField}
                />
                <Field
                  label="Equipamento"
                  name="equipamento"
                  cols="12 2"
                  component={LabelField}
                />
              </Row>
              <Row>
                <Field
                  label="Segmento de Mercado"
                  name="segmento_mercado"
                  cols="12 2"
                  component={LabelField}
                />
                <Field
                  label="OS ID"
                  name="os_id"
                  cols="12 1"
                  component={LabelField}
                />
                <Field
                  label="LPU Guid"
                  name="lpu_guid"
                  cols="12 2"
                  component={DropdownListField}
                  data={ll_data?.llCombosArray?.lpu}
                  textField={item => item.lpu_guid}
                  textValue={item => item}
                  placeholder={"Selecione"}
                  onChange={value => {
                    setLpuValues(value);
                    updateField("lpu_guid", value);
                  }}
                  disabled={edit_ll_form?.values?.lpu_guid?.lpu_guid != null}
                />
                <Grid cols="1">
                  <Row>
                    {edit_ll_form?.values?.lpu_guid?.lpu_guid && (
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => {
                          updateField("lpu_guid", null);
                        }}
                        style={{ marginTop: "1.6vw" }}
                      >
                        DESVINCULAR
                      </button>
                    )}
                  </Row>
                </Grid>
                <Field
                  label="Tipo Reajuste"
                  name="tipo_reajuste"
                  cols="12 2"
                  component={LabelField}
                />
                <Field
                  label="Garantia Receita"
                  name="garantia_receita"
                  cols="12 2"
                  component={LabelField}
                />
                <Field
                  label="Meio de Acesso"
                  name="meio_acesso"
                  cols="12 2"
                  component={DropdownListField}
                  data={[" ", "JMP", "SAT"]}
                  textField={item => item}
                  textValue={item => item}
                  placeholder={"Selecione"}
                />
              </Row>
              <Row>
                <Field
                  label="Classificação da Demanda"
                  name="classificacao_demanda"
                  cols="12 2"
                  component={DropdownListField}
                  data={demand_classifications}
                  textField={item => item.description}
                  textValue={item => item.id}
                  placeholder={"Selecione"}
                />
                <Field
                  label="Controle LL GUID"
                  name="controle_ll_guid"
                  cols="12 2"
                  component={LabelField}
                />
                <Field
                  label="Divulgação"
                  name="divulgacao"
                  cols="12 2"
                  component={LabelField}
                />
                <Field
                  label="Rede Normalizada"
                  name="rede_normalizada"
                  cols="12 2"
                  component={LabelField}
                />
                <Field
                  label="Trail ID"
                  name="trail_id"
                  cols="12 2"
                  component={LabelField}
                />
                <Field
                  label="OC"
                  name="oc"
                  cols="12 2"
                  component={LabelField}
                />
              </Row>
            </div>
          </Grid>

          <Grid cols="2">
            <button
              type="button"
              className="btn btn-success"
              disabled={edit_ll_form && edit_ll_form.syncErrors}
              onClick={() => submitForm()}
            >
              Alterar Características do Circuito
            </button>
          </Grid>
        </div>
      </form>
      <Overlay />
    </div>
  );
};

AlterarCaracteristicasCircuito.defaultProps = {
  reloadParent: () => {}
};

const Form = reduxForm({
  form: "AlterarCaracteristicasCircuito"
})(AlterarCaracteristicasCircuito);

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      update_ll,
      updateField: (field, data) => {
        return dispatch(change("AlterarCaracteristicasCircuito", field, data));
      }
    },
    dispatch
  );

const mapStateToProps = (state, props) => {
  var carencia = get(props.ll, "possui_carencia");
  if (carencia === "SIM") {
    carencia = "1";
  } else if (carencia === "NÃO") {
    carencia = "0";
  }
  var classificacao_demanda_id = get(props.ll, "classificacao_demanda");
  var classificacao_demanda = null;
  if (classificacao_demanda_id){
    classificacao_demanda = state?.listarLL?.demand_classifications?.filter(item => item?.id == classificacao_demanda_id)
    if(classificacao_demanda?.length > 0){
      classificacao_demanda = classificacao_demanda[0]
    }
  }
  return {
    auth: state.auth,
    edit_ll_form: state.form.AlterarCaracteristicasCircuito,
    leasedlineReducer: state.listarLL,
    initialValues: {
      ot_code: get(props.ll, "[ot].code"),
      vendor: get(props.ll, "[vendor].name"),
      status: get(props.ll, "[status].description"),
      status_snoa: get(props.ll, "status_snoa"),
      ponta_a: get(props.ll, "ot_elemento_id_a"),
      ponta_b: get(props.ll, "ot_elemento_id_b"),

      bilhete_snoa: get(props.ll, "bilhete_snoa"),
      evt: get(state.listarLL, "ll_data.lls.evt_request_protocol"),
      contract: get(state.listarLL, "ll_data.lls.contrato"),
      speed: get(props.ll, "ot_segmentation_speed_name"),
      agrupador_a: { name: get(props.ll, "group_a_name") },
      agrupador_b: { name: get(props.ll, "group_b_name") },

      vigencia: get(props.ll, "vigencia"),
      degrau: get(props.ll, "degrau"),
      circuito_id: get(props.ll, "circuito_id"),
      id_circuit_bill: get(props.ll, "id_circuit_bill"),
      did_tx_a: get(props.ll, "did_tx_a"),
      did_tx_b: get(props.ll, "did_tx_b"),

      data_contratacao: get(props.ll, "data_solicitacao"),
      inicio_vigencia: get(props.ll, "contract_begin_at"),
      possui_carencia: carencia,
      data_prev_ativacao: get(props.ll, "data_prev_ativacao"),
      contract_end_at: get(props.ll, "contract_end_at"),
      remarks: get(props.ll, "remarks"),

      month_with_project: get(props.ll, "month_with_project"),
      ins_with_project: get(props.ll, "ins_with_project"),

      val_link_s_imp: get(props.ll, "val_link_s_imp"),
      val_link_c_imp_a: get(props.ll, "val_link_c_imp_a"),
      val_link_c_imp_b: get(props.ll, "val_link_c_imp_b"),
      taxa_ins_s_imp: get(props.ll, "taxa_ins_s_imp"),
      taxa_ins_c_imp_a: get(props.ll, "taxa_ins_c_imp_a"),
      taxa_ins_c_imp_b: get(props.ll, "taxa_ins_c_imp_b"),
      valor_modem_s_imp: get(props.ll, "valor_modem_s_imp"),
      valor_modem_c_imp: get(props.ll, "valor_modem_c_imp"),

      moeda: get(props.ll, "moeda"),
      cambio: get(props.ll, "cambio"),
      rede: get(props.ll, "[ot].rede"),

      data_rev_ativacao: get(props.ll, "data_rev_ativacao"),
      vendor_request_date: get(props.ll, "vendor_request_date"),
      data_ativacao: get(props.ll, "data_ativacao"),
      data_aceite: get(props.ll, "data_aceite"),
      cancel_end_at: get(props.ll, "cancel_end_at"),

      tipo_rota_id: get(props.ll, "tipo_rota_id"),
      vendor_date: get(props.ll, "vendor_date"),
      rota_numero: get(props.ll, "rota_numero"),
      ip_mascara: get(props.ll, "ip_mascara"),
      porta: get(props.ll, "porta"),
      equipamento: get(props.ll, "equipamento"),

      segmento_mercado: get(props.ll, "segmento_mercado"),
      os_id: get(props.ll, "os_id"),
      lpu_guid: { lpu_guid: get(props.ll, "lpu_guid") },
      tipo_reajuste: get(props.ll, "tipo_reajuste"),
      garantia_receita: get(props.ll, "garantia_receita_txt"),
      meio_acesso: get(props.ll, "meio_acesso"),
      gl: get(props.ll, "gl"),

      classificacao_demanda: classificacao_demanda,
      controle_ll_guid: get(props.ll, "controle_ll_guid"),
      divulgacao: get(props.ll, "divulgacao"),
      rede_normalizada: get(props.ll, "rede_normalizada"),
      trail_id: get(props.ll, "trail_id"),
      oc: get(props.ll, "oc")
    },
    enableReinitialize: true
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Form);
