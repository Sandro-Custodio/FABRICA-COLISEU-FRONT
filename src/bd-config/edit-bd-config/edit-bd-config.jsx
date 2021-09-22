import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { reduxForm, Field} from "redux-form";
import get from "lodash/get";
import Overlay from "../../common/msg/overlay/overlay";
import Grid from "../../common/layout/grid";
import Row from "../../common/layout/row";

import {
  DropdownListField,
  LabelField
} from "../../common/form/components";

import { get_all_bd_config_vendors, edit_bd_config_vendor } from "../actions";

const required = value => value ? undefined : 'Campo obrigatório'

const EditBdConfigVendor = props => {

  const {
    editBdConfigVendorForm,
    bdConfigReducer: {
      vendors
    },
    get_all_bd_config_vendors
  } = props;

  const submitForm = () => {
    const {
      editBdConfigVendorForm,
      edit_bd_config_vendor,
      bdConfigReducer: {
        bd_config
      }
    } = props;
    if(editBdConfigVendorForm && !editBdConfigVendorForm.syncErrors)
      edit_bd_config_vendor(editBdConfigVendorForm.values, bd_config)
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
            disabled={(editBdConfigVendorForm && editBdConfigVendorForm.syncErrors)}
            onClick={() => {
              submitForm()
              setTimeout(() => {
                get_all_bd_config_vendors()
              }, 1000)
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

const Form = reduxForm({ form: "EditBdConfigVendor" })(EditBdConfigVendor);

const mapDispatchToProps = dispatch => bindActionCreators({
  edit_bd_config_vendor,
  get_all_bd_config_vendors
}, dispatch);

const mapStateToProps = state => {

  const provedor_bd = get(state,  "bdConfigReducer.bd_config.provedor_bd", "provedor_bd");
  const vendor = {
    id: get(state,  "bdConfigReducer.bd_config.vendor_id", "vendor_id"),
    name: get(state,  "bdConfigReducer.bd_config.name", "name"),
  };

  return{
    editBdConfigVendorForm: state.form.EditBdConfigVendor,
    bdConfigReducer: state.bdConfigReducer,
    initialValues:{
      provedor_bd,
      vendor
    },
    enableReinitialize: true
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);
