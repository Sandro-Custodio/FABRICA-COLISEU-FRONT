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
import { formatCnpj } from "common/utils";
import {
  save_vendor,
  get_all_vendors_by_area,
  get_vendor_state_list,
  get_vendor_city_list
} from "../list/actions";

const required = value => value ? undefined : 'Campo obrigatório'
const validateCnpj = value => value && value.length === 18 ? undefined : `Campo CNPJ deve conter 18 caracteres`

const CreateVendor = props => {

  const {
    createVendorForm,
    vendorsReducer: {
      contracts
    },
    get_all_vendors_by_area
  } = props;

  const submitForm = () => {
    const {
      createVendorForm,
      save_vendor
    } = props;
    if(createVendorForm && !createVendorForm.syncErrors)
      save_vendor(createVendorForm.values);
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
    if(createVendorForm && createVendorForm.values && createVendorForm.values.address_state){
      get_vendor_city_list({
        uf: createVendorForm.values.address_state
      }).then(resp => setCityList(resp.data))
    }
  }

  return (
    <div className="overlay-wrapper">
      <form>
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
              filter
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
        </Grid>
        <div className="box-footer">
          <button
            type="button"
            className="btn btn-success pull-right"
            disabled={(createVendorForm && createVendorForm.syncErrors)}
            onClick={() => {
              submitForm()
              setTimeout(() => {
                get_all_vendors_by_area(createVendorForm.values.name)
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

const Form = reduxForm({ form: "CreateVendor" })(CreateVendor);
const seletor = formValueSelector("CreateVendor");

const mapDispatchToProps = dispatch => bindActionCreators({
  save_vendor,
  get_all_vendors_by_area
}, dispatch);

const mapStateToProps = state => ({
  createVendorForm: state.form.CreateVendor,
  vendorsReducer: state.vendorsReducer,
  initialValues: {
    address_country:"Brasil"
  },
  enableReinitialize: true
});

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
