import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { reduxForm, Field, formValueSelector} from "redux-form";
import Overlay from "../../common/msg/overlay/overlay";
import Grid from "../../common/layout/grid";
import Row from "../../common/layout/row";

import {
  DropdownListField,
  LabelField
} from "../../common/form/components";

import { create_finality_element } from "./actions";

const required = value => value ? undefined : 'Campo obrigatório'

const CadastrarFinalidade = props => {

  const {
    cadastrarFinalidadeForm,
    finalidadesReducer:{
      finalities,
      element_types,
    },
    //actions
    create_finality_element,
    reload_parent,
  } = props;

  const submitForm = () => {
    const {
      cadastrarFinalidadeForm,
      create_finality_element
    } = props;
    if(cadastrarFinalidadeForm && !cadastrarFinalidadeForm.syncErrors)
      Promise.all([create_finality_element({
        finality_element:{
          finalidade: cadastrarFinalidadeForm.values?.finalidade?.name,
          tipo_elemento_a: cadastrarFinalidadeForm.values?.tipo_elemento_a?.element_type,
          tipo_elemento_b: cadastrarFinalidadeForm.values?.tipo_elemento_b?.element_type,
        }
      })]).then($ => {
        reload_parent()
      })
  };

  return (
    <div className="overlay-wrapper">
      <form>
        <div className="box-body">
          <Grid>
            <Row>
              <Field
                label="Finalidade"
                name="finalidade"
                cols="12"
                component={DropdownListField}
                data={finalities}
                textField={item => item.name}
                textValue={({ item }) => item.name}
                type="text"
                validate={required}
              />
            </Row>
            <Row>
              <Field
                label="Tipo de Elemento A"
                name="tipo_elemento_a"
                cols="12"
                component={DropdownListField}
                data={element_types}
                textField={item => item.element_type}
                textValue={({ item }) => item.element_type}
                type="text"
                validate={required}
              />
            </Row>
            <Row>
              <Field
                label="Tipo de Elemento B"
                name="tipo_elemento_b"
                cols="12"
                component={DropdownListField}
                data={element_types}
                textField={item => item.element_type}
                textValue={({ item }) => item.element_type}
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
            disabled={(cadastrarFinalidadeForm && cadastrarFinalidadeForm.syncErrors)}
            onClick={() => {
              if(window.confirm('Confirma cadastro de Finalidade?')){
                submitForm()
              }
            }}
          >
            CADASTRAR
          </button>
        </div>
      </form>
      <Overlay/>
    </div>
  );
};

const Form = reduxForm({ form: "CadastrarFinalidade" })(CadastrarFinalidade);

const mapDispatchToProps = dispatch => bindActionCreators({
  create_finality_element
}, dispatch);

const mapStateToProps = state => {

  // const finalidade = get(state,  "finalidadesReducer.finalities", "");
  // const tipo_elemento_a = get(state,  "finalidadesReducer.element_types", "");
  // const tipo_elemento_b = get(state,  "finalidadesReducer.element_types", "");
  // const vendor = {
  //   id: get(state,  "bdConfigReducer.bd_config.vendor_id", "vendor_id"),
  //   name: get(state,  "bdConfigReducer.bd_config.name", "name"),
  // };

  return{
    cadastrarFinalidadeForm: state.form.CadastrarFinalidade,
    finalidadesReducer: state.finalidadesReducer,
    // initialValues:{
    //   finalidade,
    //   tipo_elemento_a,
    //   tipo_elemento_b
    // },
    // enableReinitialize: true
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);
