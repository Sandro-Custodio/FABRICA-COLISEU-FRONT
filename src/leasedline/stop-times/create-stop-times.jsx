import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { reduxForm, Field, formValueSelector } from "redux-form";
import Overlay from "../../common/msg/overlay/overlay";
import Grid from "../../common/layout/grid";
import Row from "../../common/layout/row";

import {
  DropdownListField,
  LabelField,
  DateTimePickerField
} from "../../common/form/components";

import {
  create_ll_stop_time,
  get_stop_times_by_ll
} from "../stop-times/actions";

const required = value => (value ? undefined : "Campo obrigatório");
const compareDates = (value, allValues) =>
  formatDate(value) < formatDate(allValues.data_inicio)
    ? "Data Fim não pode anteceder Início"
    : undefined;
const formatDate = date => {
  if (date) {
    var splitDate = date.split("/");
    if (splitDate.length === 3) {
      return new Date(
        "" + splitDate[2] + "-" + splitDate[1] + "-" + splitDate[0]
      );
    } else {
      return undefined;
    }
  } else {
    return undefined;
  }
};

const CreateStopTimes = props => {
  const { createStopTimesForm, get_stop_times_by_ll, ll_id, parent_id } = props;

  const submitForm = () => {
    const { createStopTimesForm, create_ll_stop_time, auth, ll_id } = props;
    const values = {
      ...createStopTimesForm.values,
      user_id: auth.user.id,
      ll_id: ll_id.id,
      parent_id
    };
    if (createStopTimesForm && !createStopTimesForm.syncErrors)
      Promise.all([create_ll_stop_time(values)]).finally($ => {
        setTimeout(() => {
          get_stop_times_by_ll(ll_id.id);
        }, 1000);
      });
  };

  return (
    <div className="overlay-wrapper">
      <form>
        <div className="box-body">
          <Grid>
            <Row>
              <Field
                label="Observação"
                name="observacao"
                cols="12 6"
                component={LabelField}
                type="text"
                validate={required}
              />
              <Field
                label="Data Início"
                name="data_inicio"
                cols="12 3"
                time={false}
                component={DateTimePickerField}
                type="text"
                validate={required}
              />
              <Field
                label="Data Fim"
                name="data_fim"
                cols="12 3"
                time={false}
                component={DateTimePickerField}
                type="text"
                validate={compareDates}
              />
            </Row>
            <Row>
              <Field
                label="Motivo"
                name="motivo"
                cols="12 6"
                component={LabelField}
                type="text"
                validate={required}
              />
            </Row>
          </Grid>
        </div>
        <div className="box-footer">
          <button
            type="button"
            className="btn btn-success pull-right"
            disabled={createStopTimesForm && createStopTimesForm.syncErrors}
            onClick={() => {
              submitForm();
            }}
          >
            CADASTRAR
          </button>
        </div>
      </form>
      <Overlay />
    </div>
  );
};

const Form = reduxForm({ form: "CreateStopTimes" })(CreateStopTimes);

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      create_ll_stop_time,
      get_stop_times_by_ll
    },
    dispatch
  );

const mapStateToProps = state => ({
  auth: state.auth,
  createStopTimesForm: state.form.CreateStopTimes,
  stopTimesReducer: state.stopTimesReducer
});
export default connect(mapStateToProps, mapDispatchToProps)(Form);
