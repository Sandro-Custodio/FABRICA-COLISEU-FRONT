import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { reduxForm, Field, formValueSelector} from "redux-form";
import Overlay from "../../common/msg/overlay/overlay";
import Grid from "../../common/layout/grid";
import Row from "../../common/layout/row";
import get from "lodash/get";

import {
  DropdownListField,
  LabelField
} from "../../common/form/components";

import { edit_finality_element } from "./actions";

const required = value => value ? undefined : 'Campo obrigatório'

const EditarFinalidade = props => {

  const {
    editarFinalidadeForm,
    finalidadesReducer:{
      finalities,
      element_types,
    },
    finality_row,
    //actions
    edit_finality_element,
    reload_parent,
  } = props;

  const submitForm = () => {
    const {
      editarFinalidadeForm,
      edit_finality_element
    } = props;
    if(editarFinalidadeForm && !editarFinalidadeForm.syncErrors)
      Promise.all([edit_finality_element({
        finality_element:{
          finalidade: finality_row?.finalidade,
          tipo_elemento_a: finality_row?.tipo_elemento_a,
          tipo_elemento_b: finality_row?.tipo_elemento_b,
        },
        new_finality_element:{
          finalidade: editarFinalidadeForm.values?.finalidade?.name,
          tipo_elemento_a: editarFinalidadeForm.values?.tipo_elemento_a?.element_type,
          tipo_elemento_b: editarFinalidadeForm.values?.tipo_elemento_b?.element_type,
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
            disabled={(editarFinalidadeForm && editarFinalidadeForm.syncErrors)}
            onClick={() => {
              if(window.confirm('Confirma edição de Finalidade?')){
                submitForm()
              }
            }}
          >
            EDITAR
          </button>
        </div>
      </form>
      <Overlay/>
    </div>
  );
};

// EditarFinalidade.defaultProps = {
//   finality_row: {
//     finalidade: "",
//     tipo_elemento_a: "",
//     tipo_elemento_b: ""
//   }
// };

const Form = reduxForm({ form: "EditarFinalidade" })(EditarFinalidade);

const mapDispatchToProps = dispatch => bindActionCreators({
  edit_finality_element
}, dispatch);

const mapStateToProps = (state, props) => {

  const finalidade = {name: get(props,  "finality_row.finalidade", "finalidade")};
  const tipo_elemento_a = {element_type: get(props,  "finality_row.tipo_elemento_a", "tipo_elemento_a")};
  const tipo_elemento_b = {element_type: get(props,  "finality_row.tipo_elemento_b", "tipo_elemento_b")};
  // const vendor = {
  //   id: get(state,  "bdConfigReducer.bd_config.vendor_id", "vendor_id"),
  //   name: get(state,  "bdConfigReducer.bd_config.name", "name"),
  // };

  return{
    editarFinalidadeForm: state.form.EditarFinalidade,
    finalidadesReducer: state.finalidadesReducer,
    initialValues:{
      finalidade,
      tipo_elemento_a,
      tipo_elemento_b
    },
    enableReinitialize: true
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);
