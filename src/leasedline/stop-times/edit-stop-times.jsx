import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import get from "lodash/get";
import { toastr } from "react-redux-toastr";
import { list } from "licceu/liceuPlanoOperativo/circuito/actions";
import Overlay from "../../common/msg/overlay/overlay";
import Grid from "../../common/layout/grid";
import Row from "../../common/layout/row";

import { LabelField, DateTimePickerField } from "../../common/form/components";

import { edit_ll_stop_time, get_stop_times_by_ll } from "../stop-times/actions";

const required = value => (value ? undefined : "Campo obrigatório");
const compareDates = (value, allValues) =>
  formatDate(allValues.data_fim) < formatDate(allValues.data_inicio)
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

const EditStopTimes = props => {
  const {
    editStopTimesForm,
    get_stop_times_by_ll,
    stop_time,
    list,
    parent_id
  } = props;

  const submitForm = () => {
    const { editStopTimesForm, edit_ll_stop_time, stop_time } = props;
    const values = {
      ...editStopTimesForm.values,
      id: stop_time.id,
      ll_id: stop_time.ll_id,
      user_id: stop_time.user_id,
      parent_id
    };
    if (editStopTimesForm && !editStopTimesForm.syncErrors)
      if (
        formatDate(editStopTimesForm?.values?.data_fim) >=
        formatDate(editStopTimesForm?.values?.data_inicio)
      ) {
        Promise.all([edit_ll_stop_time(values)]).finally($ => {
          setTimeout(() => {
            get_stop_times_by_ll(stop_time.ll_id);
          }, 1000);
        });
      } else {
        toastr.warning("Validação", "Data Fim não pode anteceder Início");
      }
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
                placeholder={
                  get(props, "stop_time.data_inicio", "data_inicio")
                    ? new Date(
                        get(props, "stop_time.data_inicio", "data_inicio")
                      ).toLocaleDateString("pt-BR", {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric"
                      })
                    : ""
                }
                validate={(required, compareDates)}
              />
              <Field
                label="Data Fim"
                name="data_fim"
                cols="12 3"
                time={false}
                component={DateTimePickerField}
                type="text"
                placeholder={
                  get(props, "stop_time.data_fim", "data_fim")
                    ? new Date(
                        get(props, "stop_time.data_fim", "data_fim")
                      ).toLocaleDateString("pt-BR", {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric"
                      })
                    : ""
                }
                validate={(required, compareDates)}
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
            disabled={editStopTimesForm && editStopTimesForm.syncErrors}
            onClick={() => {
              submitForm();
            }}
          >
            EDITAR
          </button>
        </div>
      </form>
      <Overlay />
    </div>
  );
};

const Form = reduxForm({ form: "EditStopTimes" })(EditStopTimes);

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      edit_ll_stop_time,
      get_stop_times_by_ll
    },
    dispatch
  );

const mapStateToProps = (state, props) => {
  const id = get(props, "stop_time.id", "id");
  const ll_id = get(props, "stop_time.ll_id", "ll_id");
  const data_inicio = get(props, "stop_time.data_inicio", "data_inicio");
  const data_fim = get(props, "stop_time.data_fim", "data_fim");
  const motivo = get(props, "stop_time.motivo", "motivo");
  const observacao = get(props, "stop_time.observacao", "observacao");
  const user_id = get(props, "stop_time.user_id", "user_id");

  return {
    auth: state.auth,
    editStopTimesForm: state.form.EditStopTimes,
    stopTimesReducer: state.stopTimesReducer,
    initialValues: {
      id,
      ll_id,
      data_inicio: new Date(data_inicio).toLocaleDateString("pt-BR", {
        year: "numeric",
        month: "numeric",
        day: "numeric"
      }),
      data_fim: new Date(data_fim).toLocaleDateString("pt-BR", {
        year: "numeric",
        month: "numeric",
        day: "numeric"
      }),
      motivo,
      observacao,
      user_id
    },
    enableReinitialize: true
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Form);
