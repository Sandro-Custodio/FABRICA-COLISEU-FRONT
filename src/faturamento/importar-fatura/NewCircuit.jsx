import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import {
  LabelField,
  DateTimePickerField,
  DropdownListField
} from "../../common/form/components";
import get from "lodash/get";
import Overlay from "common/msg/overlay/overlay";

const Row = ({ children }) => <div className="row">{children}</div>;

const formatNum = value => {
  if (value === "") {
    return value
  } else {
    //let tempValue = parseInt(value).toLocaleString("pt-BR", { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' });
    value = value.replace("R$", "").trim().replace(/\./g, "")
    return value;
  } 
}

function NewCircuit() {
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
              normalize={formatNum}
            />
            <Field
              label="Valor c/ Impostos B"
              name="val_link_c_imp_b"
              cols="12 2"
              component={LabelField}
              normalize={formatNum}
            />
            <Field
              label="Instalação A"
              name="taxa_ins_c_imp_a"
              cols="12 2"
              component={LabelField}
              normalize={formatNum}
            />
            <Field
              label="Instalação B"
              name="taxa_ins_c_imp_b"
              cols="12 2"
              component={LabelField}
              normalize={formatNum}
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
              normalize={formatNum}
            />
            <Field
              label="Multa e Juros B"
              name="juros_b"
              cols="12 2"
              component={LabelField}
              normalize={formatNum}
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
            />
            <Field
              label="Data Câmbio"
              name="data_cambio"
              cols="12 2"
              time={false}
              onInput={e => {
                e.target.value = "";
                return e.target.value;
              }}
              component={DateTimePickerField}
            />
          </Row>
        </form>
      </div>
    </div>
  );
}

const formWrapper = reduxForm({
  form: "NewCircuit"
})(NewCircuit);

const mapStateToProps = form => {
  const NewCircuit = get(form.NewCircuit, "values", null);

  return {
    NewCircuit,
    initialValues: {
      moeda: "REAL",
      bill: true
    },
    enableReinitialize: true
  };
};

export default connect(mapStateToProps)(formWrapper);
