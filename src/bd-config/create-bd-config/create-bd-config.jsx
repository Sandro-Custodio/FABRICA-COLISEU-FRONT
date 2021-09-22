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

import { get_all_bd_config_vendors, save_bd_config_vendor } from "../actions";

const required = value => value ? undefined : 'Campo obrigatório'

const CreateBdConfigVendor = props => {

  const {
    createBdConfigVendorForm,
    bdConfigReducer: {
      vendors
    },
    get_all_bd_config_vendors
  } = props;

  const submitForm = () => {
    const {
      createBdConfigVendorForm,
      save_bd_config_vendor
    } = props;
    if(createBdConfigVendorForm && !createBdConfigVendorForm.syncErrors)
      save_bd_config_vendor(createBdConfigVendorForm.values)
  };

  return (
    <div className="overlay-wrapper">
      <form>
        <div className="box-body">
          <Grid>
            <Row>
              <Field
                label="Nome em BD CONFIG"
                name="provedor_bd"
                cols="12 6"
                component={LabelField}
                type="text"
                validate={required}
              />
            </Row>
            <Row>
              <Field
                label="Nome do Provedor no Coliseu"
                name="vendor"
                cols="12 6"
                component={DropdownListField}
                data={vendors}
                textField={item => item.name}
                textValue={({ item }) => item.id}
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
            disabled={(createBdConfigVendorForm && createBdConfigVendorForm.syncErrors)}
            onClick={() => {
              submitForm()
              setTimeout(() => {
                get_all_bd_config_vendors()
              }, 1000)
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

const Form = reduxForm({ form: "CreateBdConfigVendor" })(CreateBdConfigVendor);

const mapDispatchToProps = dispatch => bindActionCreators({
  save_bd_config_vendor,
  get_all_bd_config_vendors
}, dispatch);

const mapStateToProps = state => ({
  createBdConfigVendorForm: state.form.CreateBdConfigVendor,
  bdConfigReducer: state.bdConfigReducer
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);
