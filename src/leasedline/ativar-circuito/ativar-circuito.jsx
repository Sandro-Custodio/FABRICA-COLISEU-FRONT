import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import Overlay from "../../common/msg/overlay/overlay";
import Grid from "../../common/layout/grid";
import Row from "../../common/layout/row";
import {
  DropdownListField,
  LabelField,
  DateTimePickerField
} from "../../common/form/components";
import ListarStopTimes from "../stop-times/list-stop-times";
import moment from "moment";
import 'moment/locale/pt-br'

import { activate_leasedline, has_stop_times_open } from "./actions";
import { get_ll_list } from "../list/actions";
import { toastr } from "react-redux-toastr";

Date.prototype.subtractDays = function (d) {
  this.setTime(this.getTime() - d * 24 * 60 * 60 * 1000);
  return this;
};

Date.prototype.subtractDaysToday = function (d) {
  this.setTime(this.getTime() + d * 24 * 60 * 60 * 1000);
  return this;
};

const gfg_Run = () => {
  var a = new Date();
  return a.subtractDays(15);
};
const gfg_Run_today = () => {
  var a = new Date();
  return a.subtractDaysToday(1);
};

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

const today = gfg_Run_today();
const minDate = gfg_Run();



const required = value => (value ? undefined : "Campo obrigatório");
const compareDates = (value, allValues) =>
  formatDate(value) < formatDate(allValues.data_ativacao)
    ? "Data Aceite não pode anteceder Ativação"
    : undefined;
// const minDays15 = value => formatDate(value) < minDate ? 'Data não pode ser anterior a 15 dias' : undefined;

const AtivarCircuito = props => {

  const { ativarCircuitoForm, auth, listarLL, get_ll_list, ll } = props;

  const submitForm = async () => {

    const { ativarCircuitoForm, ll, activate_leasedline, auth } = props;

    const hasStopTimes = has_stop_times_open({ ll_id: ll.id });
    await hasStopTimes.then(({ resp }) => {
      if (resp) {
        toastr.warning("Existem Stop Times sem Data Fim para essa LL");
        return;
      } else {
        const values = {
          ll: {
            ...ativarCircuitoForm.values,
            id: ll.id,
            activate_user_id: auth.user.id,
            data_ativacao: ativarCircuitoForm.values.data_ativacao,
            data_aceite: ativarCircuitoForm.values.data_aceite
            // data_ativacao: normalizeDate(ativarCircuitoForm.values.data_ativacao),
            // data_aceite: normalizeDate(ativarCircuitoForm.values.data_aceite)

          },
          ot_id: ll.ot_id,
          seg_id: ll.ot_segmentation_id
        };
        if (ativarCircuitoForm && !ativarCircuitoForm.syncErrors)
          activate_leasedline(values);
        setTimeout(() => {
          get_ll_list(auth, listarLL);
        }, 1000);
      }
    });
  };

  const normalizeDate = value => {
    if (value) {
      moment.locale("pt-br");
      var splitDate = value.split("/");
      var year = splitDate[2]
      var month = parseInt(splitDate[1]) - 1
      var day = splitDate[0]
      const date = new Date(year, month.toString(), day)
      var dateFormated = moment(date).format("DD/MM/YYYY");
      return dateFormated;
    }
  }

  const [data, setData] = React.useState(true);

  const handleClearFilters = () => {
    if (ativarCircuitoForm && ativarCircuitoForm.values) {
      setData(false);
      setTimeout(() => {
        setData(true);
      }, 1);
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
                cols="6"
                component={LabelField}
                type="text"
              />
              <Field
                label="Circuito ID"
                name="circuito_id"
                cols="6"
                component={LabelField}
                type="text"
              />
            </Row>
            <Row>
              <Field
                label="DID TX A"
                name="did_tx_a"
                cols="12 6"
                component={LabelField}
                type="text"
              />
              <Field
                label="DID TX B"
                name="did_tx_b"
                cols="12 6"
                component={LabelField}
                type="text"
              />
            </Row>
            <Row>
              {data && (
                <>
                  <Field
                    label="Data Ativação"
                    name="data_ativacao"
                    cols="12 6"
                    time={false}
                    min={minDate}
                    max={today}
                    component={DateTimePickerField}
                    type="text"
                    validate={required}
                    onInput={e => (e.target.value = "")}
                    placeholder="Selecione:"
                  />
                  <Field
                    label="Data Aceite"
                    name="data_aceite"
                    cols="12 6"
                    time={false}
                    min={minDate}
                    max={today}
                    component={DateTimePickerField}
                    type="text"
                    validate={required}
                    validate={[required, compareDates]}
                    onInput={e => (e.target.value = "")}
                    placeholder="Selecione:"
                  />
                </>
              )}
            </Row>
          </Grid>
        </div>
        <div className="box-footer">
          <button
            type="button"
            className="btn btn-success pull-right"
            disabled={ativarCircuitoForm && ativarCircuitoForm.syncErrors}
            onClick={() => {
              submitForm();
              handleClearFilters();
            }}
          >
            ATIVAR
          </button>
        </div>
        <div className="box-footer">
          <h4>Stop Times</h4>
          {ll && <ListarStopTimes ll_id={ll} parent_id={"-ativar-circuito"} />}
        </div>
      </form>
      <Overlay />
    </div>
  );
};

const Form = reduxForm({ form: "AtivarCircuito" })(AtivarCircuito);

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      activate_leasedline,
      get_ll_list
    },
    dispatch
  );

const mapStateToProps = state => ({
  ativarCircuitoForm: state.form.AtivarCircuito,
  stopTimesReducer: state.stopTimesReducer,
  auth: state.auth,
  listarLL: state.listarLL
});
export default connect(mapStateToProps, mapDispatchToProps)(Form);
