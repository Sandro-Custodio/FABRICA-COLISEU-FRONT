import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { reduxForm, Field, clearFields } from "redux-form";
import Overlay from "common/msg/overlay/overlay";
import Grid from "common/layout/grid";
import Row from "common/layout/row";
import { LabelField } from "common/form/components";
import get from "lodash/get";

const required = value => value ? undefined : 'Campo obrigatório'

const AtualizarDdDefinitivo = ({
  bill,
  update_dd_previo,
  handleFilter,
  setSelection,
  ...others
}) => {

  const { AtualizarDdDefinitivoForm } = others;

  const handleSubmit = () => {
    if(AtualizarDdDefinitivoForm && AtualizarDdDefinitivoForm.values &&
      AtualizarDdDefinitivoForm.values.invoice_cost){
        const params = {
          bill: {
            id: bill.id,
            invoice_number: AtualizarDdDefinitivoForm.values.invoice_number ? AtualizarDdDefinitivoForm.values.invoice_number : null,
            invoice_cost: AtualizarDdDefinitivoForm.values.invoice_cost
          }
        };
        update_dd_previo(params);
      }
  };

  return (
    <div className="overlay-wrapper" width="device-width">
      <Grid style={{padding: '1vw'}}>
        <Row>
          <Field
            label="Rede"
            name="network"
            cols="12 1"
            component={LabelField}
            disabled={true}
          />
          <Field
            label="Provedor"
            name="vendor"
            cols="12 2"
            component={LabelField}
            disabled={true}
          />
          <Field
            label="Regional"
            name="operator"
            cols="12 1"
            component={LabelField}
            disabled={true}
          />
          <Field
            label="Agrupador"
            name="group"
            cols="12 2"
            component={LabelField}
            disabled={true}
          />
        </Row>
        <Row>
          <Field
            label="Valor da Fatura"
            name="invoice_cost"
            cols="12 2"
            component={LabelField}
            validate={required}
          />
          <Field
            label="Número da Fatura"
            name="invoice_number"
            cols="12 3"
            component={LabelField}
          />
        </Row>
        <Row>
          <button
            type="button"
            className="btn btn-primary"
            disabled={(AtualizarDdDefinitivoForm && AtualizarDdDefinitivoForm.syncErrors)}
            onClick={() => {
              handleSubmit()
              setTimeout(() => {
                handleFilter()
                setSelection([])
              }, 1000)
            }}
          >
            Salvar
          </button>
        </Row>
      </Grid>
      <Overlay />
    </div>
  );
};

AtualizarDdDefinitivo.defaultProps = {
  bill: {id: 1},
  update_dd_previo: () => {return(false)},
  handleFilter: () => {return(false)}
};

const Form = reduxForm({ form: "AtualizarDdDefinitivo" })(AtualizarDdDefinitivo);

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

const mapStateToProps = (state,props) => {
  let network = get(props,"bill.network","")
  let vendor = get(props,"bill.vendor.name","")
  let operator = get(props,"bill.operator.regional","")
  let group = get(props,"bill.group.name","")
  let invoice_cost = get(props,"bill.bill_total","")
  return {
    AtualizarDdDefinitivoForm: state.form.AtualizarDdDefinitivo,
    auth: state.auth,
    initialValues:{
      network,
      vendor,
      operator,
      group,
      invoice_cost
    },
    enableReinitialize: true
  }
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);
