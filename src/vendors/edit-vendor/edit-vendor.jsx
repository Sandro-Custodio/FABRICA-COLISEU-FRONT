import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { reduxForm, Field, formValueSelector} from "redux-form";
import get from "lodash/get";
import Overlay from "../../common/msg/overlay/overlay";
import Grid from "../../common/layout/grid";
import Row from "../../common/layout/row";
import SimpleTable from "../../common/layout/simple-table";
import {
  LabelField,
  DropdownListField
} from "../../common/form/components";
import { formatCnpj } from "common/utils";
import {
  edit_vendor,
  get_all_vendors_by_area,
  get_vendor_state_list,
  get_vendor_city_list } from "../list/actions";

const required = value => value ? undefined : 'Campo obrigatório';
const validateCnpj = value => value && value.length === 18 ? undefined : `Campo CNPJ deve conter 18 caracteres`;

const EditVendor = props => {

  const {
    editVendorForm,
    vendorsReducer: {
      vendor,
      contracts,
      contract_columns
    },
    get_all_vendors_by_area
  } = props;

  const submitForm = () => {
    const {
      editVendorForm,
      edit_vendor
    } = props;
    if(editVendorForm && !editVendorForm.syncErrors)
      edit_vendor(editVendorForm.values);
  };

  const handleCnpj = e => {
    e.target.value = formatCnpj((""+e.target.value).substr(0,18));
  }

  const [stateList, setStateList] = React.useState([]);
  const [cityList, setCityList] = React.useState([]);

  React.useEffect(() => {
    get_vendor_state_list().then(resp => setStateList(resp.data))
  }, [])

  const handleUfChange = () => {
    if(editVendorForm && editVendorForm.values && editVendorForm.values.address_state){
      get_vendor_city_list({
        uf: editVendorForm.values.address_state
      }).then(resp => setCityList(resp.data))
    }
  }

  return (
    <div className="overlay-wrapper">
      <form>
        <div className="box-body">
          <Grid>
            <Row>
              <Field
                label="Nome"
                name="name"
                cols="12 4"
                component={LabelField}
                type="text"
                validate={required}
              />
              <Field
                label="Short Name"
                name="short_name"
                cols="12 4"
                component={LabelField}
                type="text"
                validate={required}
              />
              <Field
                label="Endereço"
                name="address"
                cols="12 4"
                component={LabelField}
                type="text"
                validate={required}
              />
            </Row>
            <Row>
              <Field
                label="Cidade"
                name="address_city"
                cols="12 4"
                component={DropdownListField}
                type="text"
                data={cityList}
                textField={item => item}
                textValue={({ item }) => item}
                validate={required}
              />
              <Field
                label="Estado"
                name="address_state"
                cols="12 4"
                component={DropdownListField}
                type="text"
                data={stateList}
                textField={item => item}
                textValue={({ item }) => item}
                validate={required}
                onBlur={handleUfChange}
              />
              <Field
                label="País"
                name="address_country"
                cols="12 4"
                component={LabelField}
                type="text"
                disabled
              />
            </Row>
            <Row>
              <Field
                label="Grupo"
                name="grupo"
                cols="12 4"
                component={LabelField}
                type="text"
              />
              <Field
                label="CNPJ"
                name="cnpj"
                cols="12 4"
                component={LabelField}
                type="text"
                onInput={handleCnpj}
                validate={[required,validateCnpj]}
              />
              <Field
                label="INSC_ESTADUAL"
                name="insc_estadual"
                cols="12 4"
                component={LabelField}
                type="text"
              />
            </Row>
            <Row>
              <div style={{height: "15vw"}}>
                <SimpleTable
                  column_content={contract_columns}
                  row_content={contracts}
                />
              </div>
            </Row>
          </Grid>
        </div>
        <div className="box-footer">
          <button
            type="button"
            className="btn btn-success pull-right"
            disabled={(editVendorForm && editVendorForm.syncErrors)}
            onClick={() => {
              submitForm()
              setTimeout(() => {
                get_all_vendors_by_area(editVendorForm.values.name)
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

const Form = reduxForm({ form: "EditVendor" })(EditVendor);
const seletor = formValueSelector("EditVendor");

const mapDispatchToProps = dispatch => bindActionCreators({
  edit_vendor,
  get_all_vendors_by_area
}, dispatch);

const mapStateToProps = (state,props) => {

  const id = get(state, "vendorsReducer.vendor.id", "id");
  const name = get(state, "vendorsReducer.vendor.name", "name");
  const short_name = get(state, "vendorsReducer.vendor.short_name", "short_name");
  const address = get(state, "vendorsReducer.vendor.address", "address");
  const address_city = get(state, "vendorsReducer.vendor.address_city", "address_city");
  const address_state = get(state, "vendorsReducer.vendor.address_state", "address_state");
  const address_country = get(state, "vendorsReducer.vendor.address_country", "address_country");
  const grupo = get(state, "vendorsReducer.vendor.grupo", "grupo");
  const cnpj = get(state, "vendorsReducer.vendor.cnpj", "cnpj");
  const insc_estadual = get(state, "vendorsReducer.vendor.insc_estadual", "insc_estadual");

  return{
    editVendorForm: state.form.EditVendor,
    vendorsReducer: state.vendorsReducer,
    initialValues: {
      id,
      name,
      short_name,
      address,
      address_city,
      address_state,
      address_country,
      grupo,
      cnpj,
      insc_estadual
    },
    enableReinitialize: true
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);

const uf_list = [
  "Acre",
  "Alagoas",
  "Amapá",
  "Amazonas",
  "Bahia",
  "Ceará",
  "Espírito Santo",
  "Goiás",
  "Maranhão",
  "Mato Grosso",
  "Mato Grosso do Sul",
  "Minas Gerais",
  "Pará",
  "Paraíba",
  "Paraná",
  "Pernambuco",
  "Piauí",
  "Rio de Janeiro",
  "Rio Grande do Norte",
  "Rio Grande do Sul",
  "Rondônia",
  "Roraima",
  "Santa Catarina",
  "São Paulo",
  "Sergipe",
  "Tocantins"
]
