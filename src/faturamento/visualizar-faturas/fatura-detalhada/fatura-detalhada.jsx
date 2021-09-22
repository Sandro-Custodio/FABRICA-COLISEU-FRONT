import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { reduxForm, Field, clearFields } from "redux-form";
import Overlay from "common/msg/overlay/overlay";
import Grid from "common/layout/grid";
import Row from "common/layout/row";
import { LabelField, TextareaField } from "common/form/components";
import get from "lodash/get";
import GridClassificacao from "./grid-classificacao";

import { LabelInputComp } from "../../comps/componentesUsaveis";

const required = value => (value ? undefined : "Campo obrigatório");

const FaturaDetalhada = ({
  bill,
  update_dd_previo,
  handleFilter,
  setSelection,
  ...others
}) => {
  const {
    FaturaDetalhadaForm,
    visualizarFaturasReducer: { classification_list }
  } = others;

  return (
    <div className="overlay-wrapper" width="device-width">
      <Grid style={{ padding: "1vw" }}>
        <Row>
          <Grid cols="12 7">
            <Row>
              <Field
                label="Cadastrada por"
                name="user_name"
                cols="12 4"
                component={LabelField}
                disabled={true}
              />
              <Field
                label="Area"
                name="area_name"
                cols="12 4"
                component={LabelField}
                disabled={true}
              />
              <Field
                label="Status"
                name="status_description"
                cols="12 4"
                component={LabelField}
                disabled={true}
              />
            </Row>
            <Row>
              <Field
                label="Rede"
                name="network"
                cols="12 2"
                component={LabelField}
                disabled={true}
              />
              <Field
                label="Provedor"
                name="vendor"
                cols="12 4"
                component={LabelField}
                disabled={true}
              />
              <Field
                label="Regional"
                name="operator"
                cols="12 2"
                component={LabelField}
                disabled={true}
              />
              <Field
                label="Agrupador"
                name="group"
                cols="12 3"
                component={LabelField}
                disabled={true}
              />
            </Row>
            <Row>
              <Field
                label="Mês Referência"
                name="bill_month"
                cols="12 3"
                component={LabelField}
                disabled={true}
              />
              <Field
                label="Mês Competência"
                name="competence_month"
                cols="12 3"
                component={LabelField}
                disabled={true}
              />
            </Row>
          </Grid>
          <Grid cols="12 5">
            <Row>
              <Field
                label="Cadastrada em"
                item="created_at"
                cols="12 3"
                data={bill.created_at}
                component={LabelInputComp}
                isData
              />
              <Field
                label="Aceita em"
                item="accepted_at"
                data={bill.accepted_at}
                cols="12 3"
                component={LabelInputComp}
                disabled={true}
                isData
              />
              <Field
                label="Conciliada em"
                item="checked_at"
                data={bill.checked_at}
                cols="12 3"
                component={LabelInputComp}
                disabled={true}
                isData
              />
              <Field
                label="Aprovada em"
                item="approved_at"
                data={bill.approved_at}
                cols="12 3"
                component={LabelInputComp}
                disabled={true}
                isData
              />
            </Row>
            <Row>
              <Field
                label="Fatura"
                name="bill_number"
                cols="12 5"
                component={LabelField}
                disabled={true}
              />
              <Field
                label="Emissão"
                item="order_at"
                data={bill.order_at}
                cols="12 3"
                component={LabelInputComp}
                disabled={true}
                isData
              />
              <Field
                label="Vencimento"
                item="deadline_at"
                data={bill.deadline_at}
                cols="12 3"
                component={LabelInputComp}
                disabled={true}
                isData
              />
            </Row>
            <Row>
              <Field
                label="Linhas de DD"
                name="bill_dd_circuits"
                cols="12 3"
                component={LabelField}
                disabled={true}
              />
              <Field
                label="Valor DD(R$)"
                name="bill_cost_dd"
                cols="12 3"
                component={LabelField}
                disabled={true}
              />
              <Field
                label="Valor Fatura(R$)"
                name="bill_total"
                cols="12 3"
                component={LabelField}
                disabled={true}
              />
              <Field
                label="Diferença"
                name="bill_difference"
                cols="12 3"
                component={LabelField}
                disabled={true}
              />
            </Row>
          </Grid>
        </Row>
        <Row>
          <GridClassificacao />
        </Row>
      </Grid>
      <Overlay />
    </div>
  );
};

FaturaDetalhada.defaultProps = {
  bill: {
    user_name: 0,
    area_name: 0,
    status_description: 0,
    network: 0,
    vendor: 0,
    operator: 0,
    group: 0,
    bill_month: 0,
    competence_month: 0,
    created_at: 0,
    accepted_at: 0,
    checked_at: 0,
    approved_at: 0,
    bill_number: 0,
    order_at: 0,
    deadline_at: 0,
    bill_dd_circuits: 0,
    bill_cost_dd: 0,
    bill_total: 0,
    bill_difference: 0
  }
  // update_dd_previo: () => {return(false)},
  // handleFilter: () => {return(false)}
};

const Form = reduxForm({ form: "FaturaDetalhada" })(FaturaDetalhada);

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

const mapStateToProps = (state, props) => {
  let user_name = get(props, "bill.user.registry", "");
  let area_name = get(props, "bill.user_area.name", "");
  let status_description = get(props, "bill.status.description", "");
  let network = get(props, "bill.network", "");
  let vendor = get(props, "bill.vendor.name", "");
  let operator = get(props, "bill.operator.regional", "");
  let group = get(props, "bill.group.name", "");
  let bill_month = get(props, "bill.bill_month", "");
  let competence_month = get(props, "bill.competence_month", "");
  let created_at = get(props, "bill.created_at", "");
  let accepted_at = get(props, "bill.accepted_at", "");
  let checked_at = get(props, "bill.checked_at", "");
  let approved_at = get(props, "bill.approved_at", "");
  let bill_number = get(props, "bill.bill_number", "");
  let order_at = get(props, "bill.order_at", "");
  let deadline_at = get(props, "bill.deadline_at", "");
  let bill_dd_circuits = get(props, "bill.bill_dd_circuits", "");
  let bill_cost_dd = get(props, "bill.bill_cost_dd", "");
  let bill_total = get(props, "bill.bill_total", "");
  let bill_difference = parseFloat(bill_total - bill_cost_dd).toFixed(2);

  return {
    FaturaDetalhadaForm: state.form.FaturaDetalhada,
    visualizarFaturasReducer: state.visualizarFaturasReducer,
    auth: state.auth,
    initialValues: {
      user_name,
      area_name,
      status_description,
      network,
      vendor,
      operator,
      group,
      bill_month,
      competence_month,
      created_at,
      accepted_at,
      checked_at,
      approved_at,
      bill_number,
      order_at,
      deadline_at,
      bill_dd_circuits,
      bill_cost_dd,
      bill_total,
      bill_difference
    },
    enableReinitialize: true
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Form);
