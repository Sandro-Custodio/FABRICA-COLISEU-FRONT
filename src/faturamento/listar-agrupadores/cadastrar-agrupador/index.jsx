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
  DateTimePickerField
} from "common/form/components";
import { toastr } from "react-redux-toastr";

import {
  save_group
} from "../actions";

const required = value => value ? undefined : 'Campo obrigatório'
const validate_months = (value, allValues) => compareDates(
    allValues.validate_month_ini, allValues.validate_month_end
    ) ? undefined : "A data de validade final deve ser maior que a data de validade inicial."

const validate_boxes = v => {
  var months = ['m-1','m','m+1'];
  var valid = false;
  console.log(v)
  if (months.indexOf(v?.month_end_combo) >= months.indexOf(v?.month_begin_combo)){
    valid = true;
    if (months.indexOf(v?.month_end_combo) == months.indexOf(v?.month_begin_combo)
      &&(parseInt(v?.month_end_number) <= parseInt(v?.month_begin_number))){
      toastr.warning("A data fim de medição deve ser maior que a data início de medição.")
      return false;
    }
  }else{
    toastr.warning("A data início de medição deve ser maior que a data fim de medição.")
    return false;
  }
  if (months.indexOf(v?.deadline_at_combo) >= months.indexOf(v?.order_at_combo)){
    valid = true;
    if (months.indexOf(v?.deadline_at_combo) == months.indexOf(v?.order_at_combo)
      &&(parseInt(v?.deadline_at_number) <= parseInt(v?.order_at_number))){
      toastr.warning("A data de vencimento da fatura deve ser maior que a data de emissão.")
      return false;
    }
  }else{
    toastr.warning("A data de vencimento da fatura deve ser maior que a data de emissão.")
    return false;
  }
  if (months.indexOf(v?.month_begin_combo) == 0 && months.indexOf(v?.month_end_combo) == 2){
    valid = true;
  }else if (months.indexOf(v?.date_curt_combo) == months.indexOf(v?.month_begin_combo) ||
    months.indexOf(v?.date_curt_combo) == months.indexOf(v?.month_end_combo)){
    valid = true;
  }else{
    toastr.warning("A data de corte tem que estar entre a data início de medição e fim de medição.")
    return false;
  }
  return valid;
}

const checkMinMaxValues = value => {
  if(value){
    if(parseInt(""+value) < 1)
      return 1
    if(parseInt(""+value) > 31)
      return 31
    return value
  }else
    return 1
}

const compareDates = (start, end) => {
  if(!(start && end))
    return false
  var d1 = start.split("/")
  var d2 = end.split("/")

  if(parseInt(d1[2]) < parseInt(d2[2])){
    return true //ano fim maior que ano inicio
  }else if (parseInt(d1[2]) === parseInt(d2[2])){
    if(parseInt(d1[1]) < parseInt(d2[1])){
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

const concatDate = (number,combo) => {
  if(parseInt(number) <= 9){
    return "0"+number+"/"+combo;
  }else{
    return ""+number+"/"+combo;
  }
}

const CadastrarAgrupadores = props => {

  const {
    addGroupForm,
    agrupadoresReducer: {
      operators,
      vendors,
      groups,
    },
    reloadParent,
    //actions
    save_group,
  } = props;

  const submitForm = () => {
    if( addGroupForm && !addGroupForm.syncErrors ){
      if(validate_boxes(addGroupForm.values)){
        Promise.all([
          save_group({
            name:         addGroupForm?.values?.group,
            vendor_id:    addGroupForm?.values?.vendors?.id,
            operator_id:  addGroupForm?.values?.operators?.id,
            network:      addGroupForm?.values?.network,
            competence:   addGroupForm?.values?.competence,
            month_begin:  concatDate(addGroupForm?.values?.month_begin_number, addGroupForm?.values?.month_begin_combo),
            month_end:    concatDate(addGroupForm?.values?.month_end_number, addGroupForm?.values?.month_end_combo),
            order_at:     concatDate(addGroupForm?.values?.order_at_number, addGroupForm?.values?.order_at_combo),
            deadline_at:  concatDate(addGroupForm?.values?.deadline_at_number, addGroupForm?.values?.deadline_at_combo),
            date_curt:    concatDate(addGroupForm?.values?.date_curt_number, addGroupForm?.values?.date_curt_combo),
            entry_date:   concatDate(addGroupForm?.values?.entry_date_number, addGroupForm?.values?.entry_date_combo),
            available_dd: concatDate(addGroupForm?.values?.available_dd_number, addGroupForm?.values?.available_dd_combo),
            ni:           addGroupForm?.values?.ni,
            ncon:         addGroupForm?.values?.ncon,
            naprov:       addGroupForm?.values?.naprov,
            cost_center:  addGroupForm?.values?.cost_center,
            validate_month_ini: formatDate(addGroupForm?.values?.validate_month_ini),
            validate_month_end: formatDate(addGroupForm?.values?.validate_month_end),
          })
        ]).finally($ => reloadParent())
      }
    }
  }

  return (
    <div className="overlay-wrapper">
      <form>
        <div className="body">
          <Grid cols="12">
            <Row>
              <Field
                label="Agrupador"
                name="group"
                cols="12 4"
                component={LabelField}
                type="text"
                validate={required}
              />
              <Field
                label="Regional"
                name="operators"
                cols="12 4"
                component={DropdownListField}
                data={operators}
                textField={item => item.regional}
                textValue={({ item }) => item}
                placeholder={"Selecione"}
                type="text"
                validate={required}
              />
              <Field
                label="Rede"
                name="network"
                cols="12 4"
                component={DropdownListField}
                data={["MÓVEL", "FIXA", "FIBER"]}
                textField={item => item}
                textValue={({ item }) => item}
                placeholder={"Selecione"}
                type="text"
                validate={required}
              />
            </Row>
            <Row>
              <Field
                label="Provedor"
                name="vendors"
                cols="12 4"
                component={DropdownListField}
                data={vendors}
                textField={item => item.name}
                textValue={({ item }) => item}
                placeholder={"Selecione"}
                type="text"
                validate={required}
              />
              <Field
                label="Validade (Início)"
                name="validate_month_ini"
                cols="12 2"
                component={DateTimePickerField}
                time={false}
                formatacao='MM/YYYY'
                visualizacao={['year']}
                onInput={e => e.target.value = ""}
                placeholder="Selecione"
                validate={[required, validate_months]}
              />
              <Grid cols="2"></Grid>
              <Field
                label="Validade (Fim)"
                name="validate_month_end"
                cols="12 2"
                component={DateTimePickerField}
                time={false}
                formatacao='MM/YYYY'
                visualizacao={['year']}
                onInput={e => e.target.value = ""}
                placeholder="Selecione"
                validate={[required, validate_months]}
              />
            </Row>
            <Row>
              <Grid>
                <div className="box box-info" style={{padding: '1vw'}}>
                  <Row>
                    <h4 style={{paddingBottom: '1vw', paddingLeft: '1vw'}}>
                      Medição
                    </h4>
                  </Row>
                  <Row>
                    <Field
                      label="Início"
                      name="month_begin_number"
                      cols="12 2"
                      component={LabelField}
                      type="number"
                      onInput={e => e.target.value = checkMinMaxValues(e.target.value)}
                      min="1"
                      max="31"
                    />
                    <Field
                      label=""
                      name="month_begin_combo"
                      cols="12 2"
                      component={DropdownListField}
                      data={["m","m-1","m+1"]}
                      textField={item => item}
                      textValue={({ item }) => item}
                      placeholder={"Selecione"}
                      type="text"
                      style={{paddingTop: '1.6vw'}}
                    />
                    <Field
                      label="Fim"
                      name="month_end_number"
                      cols="12 2"
                      component={LabelField}
                      type="number"
                      onInput={e => e.target.value = checkMinMaxValues(e.target.value)}
                      min="1"
                      max="31"
                    />
                    <Field
                      label=""
                      name="month_end_combo"
                      cols="12 2"
                      component={DropdownListField}
                      data={["m","m-1","m+1"]}
                      textField={item => item}
                      textValue={({ item }) => item}
                      placeholder={"Selecione"}
                      type="text"
                      style={{paddingTop: '1.6vw'}}
                    />
                    <Field
                      label="Corte"
                      name="date_curt_number"
                      cols="12 2"
                      component={LabelField}
                      type="number"
                      onInput={e => e.target.value = checkMinMaxValues(e.target.value)}
                      min="1"
                      max="31"
                    />
                    <Field
                      label=""
                      name="date_curt_combo"
                      cols="12 2"
                      component={DropdownListField}
                      data={["m","m-1","m+1"]}
                      textField={item => item}
                      textValue={({ item }) => item}
                      placeholder={"Selecione"}
                      type="text"
                      style={{paddingTop: '1.6vw'}}
                    />
                  </Row>
                </div>
              </Grid>
            </Row>
            <Row>
              <Grid>
                <div className="box box-info" style={{padding: '1vw'}}>
                  <Row>
                    <h4 style={{paddingBottom: '1vw', paddingLeft: '1vw'}}>
                      Fatura
                    </h4>
                  </Row>
                  <Row>
                    <Field
                      label="Emissão"
                      name="order_at_number"
                      cols="12 2"
                      component={LabelField}
                      type="number"
                      onInput={e => e.target.value = checkMinMaxValues(e.target.value)}
                      min="1"
                      max="31"
                    />
                    <Field
                      label=""
                      name="order_at_combo"
                      cols="12 2"
                      component={DropdownListField}
                      data={["m","m-1","m+1"]}
                      textField={item => item}
                      textValue={({ item }) => item}
                      placeholder={"Selecione"}
                      type="text"
                      style={{paddingTop: '1.6vw'}}
                    />
                    <Field
                      label="Vencimento"
                      name="deadline_at_number"
                      cols="12 2"
                      component={LabelField}
                      type="number"
                      onInput={e => e.target.value = checkMinMaxValues(e.target.value)}
                      min="1"
                      max="31"
                    />
                    <Field
                      label=""
                      name="deadline_at_combo"
                      cols="12 2"
                      component={DropdownListField}
                      data={["m","m-1","m+1"]}
                      textField={item => item}
                      textValue={({ item }) => item}
                      placeholder={"Selecione"}
                      type="text"
                      style={{paddingTop: '1.6vw'}}
                    />
                    <Field
                      label="Ent. no Gate"
                      name="entry_date_number"
                      cols="12 2"
                      component={LabelField}
                      type="number"
                      onInput={e => e.target.value = checkMinMaxValues(e.target.value)}
                      min="1"
                      max="31"
                    />
                    <Field
                      label=""
                      name="entry_date_combo"
                      cols="12 2"
                      component={DropdownListField}
                      data={["m","m-1","m+1"]}
                      textField={item => item}
                      textValue={({ item }) => item}
                      placeholder={"Selecione"}
                      type="text"
                      style={{paddingTop: '1.6vw'}}
                    />
                  </Row>
                  <Row>
                    <Field
                      label="Disp. DD"
                      name="available_dd_number"
                      cols="12 2"
                      component={LabelField}
                      type="number"
                      onInput={e => e.target.value = checkMinMaxValues(e.target.value)}
                      min="1"
                      max="31"
                    />
                    <Field
                      label=""
                      name="available_dd_combo"
                      cols="12 2"
                      component={DropdownListField}
                      data={["m","m-1","m+1"]}
                      textField={item => item}
                      textValue={({ item }) => item}
                      placeholder={"Selecione"}
                      type="text"
                      style={{paddingTop: '1.6vw'}}
                    />
                    <Field
                      label="Competência"
                      name="competence"
                      cols="12 2"
                      component={DropdownListField}
                      data={["m","m-1","m+1"]}
                      textField={item => item}
                      textValue={({ item }) => item}
                      placeholder={"Selecione"}
                      type="text"
                    />
                    <Field
                      label="Tipo de Mercado"
                      name="cost_center"
                      cols="12 2"
                      component={DropdownListField}
                      data={["LL", "LM"]}
                      textField={item => item}
                      textValue={({ item }) => item}
                      placeholder={"Selecione"}
                      type="text"
                    />
                  </Row>
                </div>
              </Grid>
            </Row>
            <Row>
              <Grid>
                <div className="box box-info" style={{padding: '1vw'}}>
                  <Row>
                    <h4 style={{paddingBottom: '1vw', paddingLeft: '1vw'}}>
                      Alertas
                    </h4>
                  </Row>
                  <Row>
                    <Field
                      label="Ni"
                      name="ni"
                      cols="12 2"
                      component={LabelField}
                      type="number"
                      onInput={e => e.target.value = checkMinMaxValues(e.target.value)}
                      min="1"
                      max="31"
                    />
                    <Field
                      label="Ncon"
                      name="ncon"
                      cols="12 2"
                      component={LabelField}
                      type="number"
                      onInput={e => e.target.value = checkMinMaxValues(e.target.value)}
                      min="1"
                      max="31"
                    />
                    <Field
                      label="Naprov"
                      name="naprov"
                      cols="12 2"
                      component={LabelField}
                      type="number"
                      onInput={e => e.target.value = checkMinMaxValues(e.target.value)}
                      min="1"
                      max="31"
                    />
                  </Row>
                </div>
              </Grid>
            </Row>
            <Row>
              <button
                type="button"
                className="btn btn-success pull-left"
                disabled={(addGroupForm && addGroupForm.syncErrors)}
                onClick={() => submitForm() }
              >
                CADASTRAR
              </button>
            </Row>
          </Grid>
        </div>
      </form>
      <Overlay/>
    </div>
  );
};

CadastrarAgrupadores.defaultProps = {
  reloadParent: () => {}
}

const Form = reduxForm({ form: "CadastrarAgrupadores" })(CadastrarAgrupadores);

const mapDispatchToProps = dispatch => bindActionCreators({
  save_group,
}, dispatch);

const mapStateToProps = state => {
  return {
    auth: state.auth,
    addGroupForm: state.form.CadastrarAgrupadores,
    agrupadoresReducer: state.agrupadoresReducer,
    initialValues:{
      month_begin_number: 1,
      month_end_number: 1,
      date_curt_number: 1,
      order_at_number: 1,
      deadline_at_number: 1,
      entry_date_number: 1,
      available_dd_number: 1,
      month_begin_combo: "m",
      month_end_combo: "m",
      date_curt_combo: "m",
      order_at_combo: "m",
      deadline_at_combo: "m",
      entry_date_combo: "m",
      available_dd_combo: "m",
      ni: 1,
      ncon: 1,
      naprov: 1,
    },
    enableReinitialize: true
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);
