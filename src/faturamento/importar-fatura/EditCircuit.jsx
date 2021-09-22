import React from "react";
import { Field, reduxForm } from "redux-form";
import { bindActionCreators } from "redux";
import { connect, useDispatch } from "react-redux";
import {
  LabelField,
  DateTimePickerField,
  DropdownListField
} from "../../common/form/components";
import get from "lodash/get";
import Overlay from "common/msg/overlay/overlay";
import { formatPositiveMoneyValue, toDate } from "common/utils";
import {
  edit_circuits_by_vendor,
  get_circuits_by_vendor
} from "./actions";

const Row = ({ children }) => <div className="row">{children}</div>;

const EditCircuit = props => {

  const {
    editCircuitForm,
    edit_circuits_by_vendor,
    get_circuits_by_vendor
  } = props;

  const handleSubmit = () => {
    const {
      editCircuitForm,
      vendor_id,
      network,
      circuit_id
    } = props;

    const params = {
      id: circuit_id,
      circuito_id_clean: get(editCircuitForm, "values.circuito_id_clean") ? get(editCircuitForm, "values.circuito_id_clean") : null,
      service: get(editCircuitForm, "values.service") ? get(editCircuitForm, "values.service") : null,
      group_id_a: get(editCircuitForm, "values.group_id_a") ? get(editCircuitForm, "values.group_id_a") : null,
      group_id_b: get(editCircuitForm, "values.group_id_b") ? get(editCircuitForm, "values.group_id_b") : null,
      degrau: get(editCircuitForm, "values.degrau") ? get(editCircuitForm, "values.degrau") : null,
      val_link_c_imp_a: get(editCircuitForm, "values.val_link_c_imp_a") ? get(editCircuitForm, "values.val_link_c_imp_a").replace(",",".") : null,
      val_link_c_imp_b: get(editCircuitForm, "values.val_link_c_imp_b") ? get(editCircuitForm, "values.val_link_c_imp_b").replace(",",".") : null,
      taxa_ins_c_imp_a: get(editCircuitForm, "values.taxa_ins_c_imp_a") ? get(editCircuitForm, "values.taxa_ins_c_imp_a").replace(",",".") : null,
      taxa_ins_c_imp_b: get(editCircuitForm, "values.taxa_ins_c_imp_b") ? get(editCircuitForm, "values.taxa_ins_c_imp_b").replace(",",".") : null,
      data_ativacao: get(editCircuitForm, "values.data_ativacao") ? get(editCircuitForm, "values.data_ativacao") : null,
      credit_a: get(editCircuitForm, "values.credit_a") ? get(editCircuitForm, "values.credit_a").replace(",",".") : null,
      credit_b: get(editCircuitForm, "values.credit_b") ? get(editCircuitForm, "values.credit_b").replace(",",".") : null,
      juros_a: get(editCircuitForm, "values.juros_a") ? get(editCircuitForm, "values.juros_a").replace(",",".") : null,
      juros_b: get(editCircuitForm, "values.juros_b") ? get(editCircuitForm, "values.juros_b").replace(",","."): null,
      id_circuit_bill: get(editCircuitForm, "values.id_circuit_bill") ? get(editCircuitForm, "values.id_circuit_bill") : null,
      moeda: get(editCircuitForm, "values.moeda") ? get(editCircuitForm, "values.moeda") : null,
      cambio: get(editCircuitForm, "values.cambio") ? get(editCircuitForm, "values.cambio").replace(",",".") : null,
      data_cambio: get(editCircuitForm, "values.data_cambio") ? get(editCircuitForm, "values.data_cambio") : null,
    }
    console.log("params",params)
    console.log("vendor_id",vendor_id)
    console.log("network",network)
    Promise.all([edit_circuits_by_vendor(params, vendor_id)])
    .then(() => get_circuits_by_vendor(vendor_id, network));
  }

  return (
    <div className="overlay-wrapper">
      <Overlay />
      <div className="box-body">
        <form className="form">
          <Row>
            <Field
              label="Circuito"
              name="circuito_id_clean"
              cols="12 2"
              component={LabelField}
            />
            <Field
              label="Serviço"
              name="service"
              cols="12 2"
              component={LabelField}
            />
            <Field
              label="Agrupador A"
              name="group_id_a"
              cols="12 2"
              component={LabelField}
            />
            <Field
              label="Agrupador B"
              name="group_id_b"
              cols="12 2"
              component={LabelField}
            />
            <Field
              label="Degrau"
              name="degrau"
              cols="12 2"
              component={LabelField}
            />
          </Row>

          <Row>
            <Field
              label="Valor c/ Impostos A"
              name="val_link_c_imp_a"
              cols="12 2"
              component={LabelField}
              onInput={e => e.target.value = formatPositiveMoneyValue(e.target.value)}

            />
            <Field
              label="Valor c/ Impostos A"
              name="val_link_c_imp_b"
              cols="12 2"
              component={LabelField}
              onInput={e => e.target.value = formatPositiveMoneyValue(e.target.value)}

            />
            <Field
              label="Instalação A"
              name="taxa_ins_c_imp_a"
              cols="12 2"
              component={LabelField}
              onInput={e => e.target.value = formatPositiveMoneyValue(e.target.value)}

            />
            <Field
              label="Instalação B"
              name="taxa_ins_c_imp_b"
              cols="12 2"
              component={LabelField}
              onInput={e => e.target.value = formatPositiveMoneyValue(e.target.value)}

            />
            <Field
              label="Data Ativação"
              name="data_ativacao"
              cols="12 2"
              time={false}
              onInput={e => {
                e.target.value = "";
                return e.target.value;
              }}
              component={DateTimePickerField}
            />
          </Row>

          <Row>
            <Field
              label="Crédito A"
              name="credit_a"
              cols="12 2"
              component={LabelField}
            />
            <Field
              label="Crédito B"
              name="credit_b"
              cols="12 2"
              component={LabelField}
            />
            <Field
              label="Multa e Juros A"
              name="juros_a"
              cols="12 2"
              component={LabelField}
            />
            <Field
              label="Multa e Juros B"
              name="juros_b"
              cols="12 2"
              component={LabelField}
            />
            <Field
              label="Circuito ID Fatura"
              name="id_circuit_bill"
              cols="12 2"
              component={LabelField}
            />
          </Row>

          <Row>
            <Field
              label="Moeda"
              name="moeda"
              cols="12 2"
              component={DropdownListField}
              data={["REAL", "DOLAR"]}
              textField={item => item}
              textValue={item => item}
            />
            <Field
              label="Câmbio"
              name="cambio"
              cols="12 2"
              component={LabelField}
              onInput={e => e.target.value = formatPositiveMoneyValue(e.target.value)}

            />
            <Field
              label="Data Câmbio"
              name="data_cambio"
              cols="12 2"
              time={false}
              dropUp
              placeholder={get(editCircuitForm, "values.data_cambio") ? toDate(get(editCircuitForm, "values.data_cambio")) : ""}
              onInput={e => {
                e.target.value = "";
                return e.target.value;
              }}
              component={DateTimePickerField}
            />
          </Row>

          <Row>
            <button
              className="btn btn-success"
              type="button"
              onClick={() => handleSubmit()}
            >
              Atualizar
            </button>
          </Row>
        </form>
      </div>
    </div>
  );
}

const formWrapper = reduxForm({
  form: "EditCircuit"
})(EditCircuit);

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      edit_circuits_by_vendor,
      get_circuits_by_vendor
    },
    dispatch
  );

const mapStateToProps = state => {
  // const editCircuitForm = get(form.EditCircuit, "values", null);
  // console.log( get(state, "importarFaturaReducer.edit_circuit"))
  return {
    editCircuitForm: state.form.EditCircuit,
    circuit_id: get(state, "importarFaturaReducer.edit_circuit.id"),
    initialValues: {
      // moeda: "REAL",
      // bill: true,
      circuito_id_clean: get(state, "importarFaturaReducer.edit_circuit.circuito_id_clean"),
      service: get(state, "importarFaturaReducer.edit_circuit.service"),
      group_id_a: get(state, "importarFaturaReducer.edit_circuit.group_id_a"),
      group_id_b: get(state, "importarFaturaReducer.edit_circuit.group_id_b"),
      degrau: get(state, "importarFaturaReducer.edit_circuit.degrau"),
      val_link_c_imp_a: get(state, "importarFaturaReducer.edit_circuit.val_link_c_imp_a"),
      val_link_c_imp_b: get(state, "importarFaturaReducer.edit_circuit.val_link_c_imp_b"),
      taxa_ins_c_imp_a: get(state, "importarFaturaReducer.edit_circuit.taxa_ins_c_imp_a"),
      taxa_ins_c_imp_b: get(state, "importarFaturaReducer.edit_circuit.taxa_ins_c_imp_b"),
      data_ativacao: get(state, "importarFaturaReducer.edit_circuit.data_ativacao"),
      credit_a: get(state, "importarFaturaReducer.edit_circuit.credit_a"),
      credit_b: get(state, "importarFaturaReducer.edit_circuit.credit_b"),
      juros_a: get(state, "importarFaturaReducer.edit_circuit.juros_a"),
      juros_b: get(state, "importarFaturaReducer.edit_circuit.juros_b"),
      id_circuit_bill: get(state, "importarFaturaReducer.edit_circuit.id_circuit_bill"),
      moeda: get(state, "importarFaturaReducer.edit_circuit.moeda"),
      cambio: get(state, "importarFaturaReducer.edit_circuit.cambio"),
      data_cambio: get(state, "importarFaturaReducer.edit_circuit.data_cambio"),
    },
    enableReinitialize: true
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(formWrapper);
