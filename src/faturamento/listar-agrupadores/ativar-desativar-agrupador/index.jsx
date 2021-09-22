import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import Overlay from "common/msg/overlay/overlay";
import Grid from "common/layout/grid";
import Row from "common/layout/row";
import {
  DropdownListField,
  LabelField,
  DateTimePickerField,
  TextareaFieldValidation,
} from "common/form/components";
import get from "lodash/get";

import {
  update_group_status
} from "../actions";

const required = value => value ? undefined : 'Campo obrigatório'
const checkInactiveReference = (value, allValues) =>
  allValues.inactive_reference ?
  (compareDates(allValues.inactive_reference, formatDate(value)) ? undefined :
  "Data deve ser maior que "+allValues.inactive_reference) : undefined;

const checkValidMonth = (value, allValues) =>
  ( compareDates(allValues.validate_month_ini, formatDate(value)) &&
    compareDates(formatDate(value), allValues.validate_month_end ) ) ? undefined :
  "Data deve estar entre "+allValues.validate_month_ini+"e "+allValues.validate_month_end;
const compareDates = (start, end) => {
  if(!(start && end))
    return false
  var d1 = start.split("/")
  var d2 = end.split("/")

  if(parseInt(d1[1]) < parseInt(d2[1])){
    return true //ano fim maior que ano inicio
  }else if (parseInt(d1[1]) === parseInt(d2[1])){
    if(parseInt(d1[0]) < parseInt(d2[0])){
      return true //mesmo ano, mês fim maior que mês inicio
    }else{
      return false //mesmo ano, mês fim menor ou igual ao mês inicio
    }
  }else{
    return false //ano inicio maior que ano fim
  }
}

const formatDate = value => {
  var aux = (""+value).split("/");
  if (!(aux?.length === 3))
    return ""
  else{
    return ""+aux[1]+"/"+aux[2]
  }
}

const AtivarDesativarGroup = props => {

  const {
    auth,
    toggleStatusGroupForm,
    agrupadoresReducer: {
      operators,
      vendors,
      groups,
    },
    reloadParent,
    row,
    //actions
    update_group_status,
  } = props;

  const submitForm = () => {
    if(toggleStatusGroupForm && row && !toggleStatusGroupForm.syncErrors){
      Promise.all([update_group_status({
        reference_month: formatDate(""+toggleStatusGroupForm?.values?.reference_month),
        id: row.id,
        remarks: toggleStatusGroupForm?.values?.remarks,
        status_id: row.status_id === 63 ? 62 : 63,
        user_id: auth.user.id,
      },reloadParent)])
    }
  }

  return (
    <div className="overlay-wrapper">
      <form>
        <div className="body">
          <Grid cols="12">
            <Row>
              <Field
                label="Regional"
                name="operators"
                cols="12"
                component={DropdownListField}
                data={operators}
                textField={item => item.regional}
                textValue={({ item }) => item}
                placeholder={"Selecione"}
                type="text"
                readOnly
                validate={required}
              />
            </Row>
            <Row>
              <Field
                label="Provedor"
                name="vendors"
                cols="12"
                component={DropdownListField}
                data={vendors}
                textField={item => item.name}
                textValue={({ item }) => item}
                placeholder={"Selecione"}
                type="text"
                readOnly
                validate={required}
              />
            </Row>
            <Row>
              <Field
                label="Agrupador"
                name="group"
                cols="12"
                component={LabelField}
                type="text"
                readOnly
                validate={required}
              />
            </Row>
            <Row>
              <Field
                label="A partir de"
                name="reference_month"
                cols="12 4"
                component={DateTimePickerField}
                time={false}
                formatacao='MM/YYYY'
                visualizacao={['year']}
                onInput={e => e.target.value = ""}
                placeholder="Selecione"
                validate={[required, checkInactiveReference, checkValidMonth]}
              />
            </Row>
            <Row>
              <Field
                label="Observação"
                name="remarks"
                cols="12"
                component={TextareaFieldValidation}
                type="text"
                validate={required}
              />
            </Row>
            <Row>
              <button
                type="button"
                className="btn btn-success pull-left"
                disabled={(toggleStatusGroupForm && toggleStatusGroupForm.syncErrors)}
                onClick={() => submitForm() }
              >
                {row?.status?.description === "Ativo" ? "DESATIVAR" : "ATIVAR"}
              </button>
            </Row>
          </Grid>
        </div>
      </form>
      <Overlay/>
    </div>
  );
};

AtivarDesativarGroup.defaultProps = {
  reloadParent: () => {}
}

const Form = reduxForm({ form: "AtivarDesativarGroup" })(AtivarDesativarGroup);

const mapDispatchToProps = dispatch => bindActionCreators({
  update_group_status,
}, dispatch);

const mapStateToProps = (state, props) => {
  return {
    auth: state.auth,
    toggleStatusGroupForm: state.form.AtivarDesativarGroup,
    agrupadoresReducer: state.agrupadoresReducer,
    initialValues:{
      group: get(props.row, "name", ""),
      vendors: get(props.row, "vendor", ""),
      operators: get(props.row, "operator", ""),

      inactive_reference: get(props.row, "inactive_reference", ""),
      validate_month_ini: get(props.row, "validate_month_ini", ""),
      validate_month_end: get(props.row, "validate_month_end", ""),
    },
    enableReinitialize: true
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);
