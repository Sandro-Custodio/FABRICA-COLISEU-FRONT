import React, { Component } from "react";
import { reduxForm, Field, formValueSelector } from "redux-form";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { init } from "./actions";
import { LabelInput } from "../common/form/components";
import Grid from "../common/layout/grid";
import ItemList from "./ItemList";
import Summary from "./summary";

class Insert extends Component {
  calculateSummary() {
    const sum = (t, v) => t + v;
    return {
      sumOfCredits: this.props.credits.map(c => +c.value || 0).reduce(sum),
      sumOfDebts: this.props.debts.map(d => +d.value || 0).reduce(sum)
    };
  }

  render() {
    const { handleSubmit, readOnly, credits, debts } = this.props;
    const { sumOfCredits, sumOfDebts } = this.calculateSummary();
    return (
      <form onSubmit={handleSubmit}>
        <div className="box-body">
          <Field
            name="name"
            component={LabelInput}
            cols="12 4"
            label="Nome"
            placeholder="Informe o nome"
          />
          <Field
            name="month"
            component={LabelInput}
            cols="12 4"
            label="Mês"
            placeholder="Informe o mês"
          />
          <Field
            name="year"
            component={LabelInput}
            cols="12 4"
            label="Ano"
            placeholder="Informe o ano"
            type="Number"
          />
          <Summary credit={sumOfCredits} debt={sumOfDebts} />
          <ItemList
            cols="12 12 6"
            readOnly={readOnly}
            field="credits"
            legend="Créditos"
            list={credits}
          />
          <ItemList
            cols="12 12 6"
            readOnly={readOnly}
            field="debts"
            legend="Débitos"
            list={debts}
          />
        </div>
        <div className="box-footer">
          <Grid cols="6 4 2 1">
            <button
              type="submit"
              className={`btn btn-${this.props.submitClass}`}
            >
              {this.props.textPrimaryButton}
            </button>
          </Grid>
          <Grid cols="6 8 6 11">
            <button
              type="button"
              className="btn btn-default"
              onClick={this.props.init}
            >
              Cancelar
            </button>
          </Grid>
        </div>
      </form>
    );
  }
}
Insert = reduxForm({ form: "billingCycleForm", destroyOnUnmount: false })(
  Insert
);
const seletor = formValueSelector("billingCycleForm");
const mapDispatchToProps = dispatch => bindActionCreators({ init }, dispatch);
const mapStateToProps = state => ({
  credits: seletor(state, "credits"),
  debts: seletor(state, "debts")
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Insert);
