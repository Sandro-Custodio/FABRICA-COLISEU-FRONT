import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { reduxForm, Field, formValueSelector} from "redux-form";
import Content from "../../common/adminLTE/content";
import ContentHeader from "../../common/adminLTE/contentHeader";
import Overlay from "../../common/msg/overlay/overlay";
import Grid from "../../common/layout/grid";
import Row from "../../common/layout/row";
import {
  DropdownListField,
  LabelField,
  DateTimePickerField
 } from "../../common/form/components";
 import { formatPositiveMoneyValue } from "common/utils";

 import { save_lpu_item } from "../actions";

const required = value => value ? undefined : 'Campo obrigatório';

const CadastrarItemLpu = props => {

  const {
    cadastrarItemLpuForm,
    comandoLpuReducer: {
      degrau_list
    },
    lpu_id,
    reloadParent,
    //actions
    save_lpu_item,
  } = props;

  const [selection, setSelection] = React.useState([]);

  const submitForm = () => {
    const {
      auth,
      cadastrarItemLpuForm,
      lpu_id
    } = props
    const values = {
      lpu_item:{
        ...cadastrarItemLpuForm.values,
        lpu_id: lpu_id,
        tipo: null,
        user_id: auth?.user?.id
      },
      logged_user_id: auth?.user?.id
    };

    if(cadastrarItemLpuForm && !cadastrarItemLpuForm.syncErrors){
      Promise.all([save_lpu_item(values)]).then($ => {
        window.$(`#cadastrar_item_lpu`).modal("hide");
        reloadParent();
      })
    }
  }

  return (
    <div className="overlay-wrapper">
      <form>
        <div className="body">
          <Grid>
            <Row>
              <Field
                label="Degrau"
                name="vendor_degrau"
                cols="12 2"
                component={DropdownListField}
                data={degrau_list}
                textField={item => item.descricao}
                textValue={item => item.id}
                placeholder={"Selecione"}
                validate={required}
              />
              <Field
                label="Prazo"
                name="vendor_prazo"
                cols="12 2"
                component={DropdownListField}
                data={["0","12","24","36","60"]}
                textField={item => item}
                textValue={({ item }) => item}
                placeholder={"Selecione"}
                validate={required}
              />
            </Row>
            <Row>
              <Field
                label="Velocidade"
                name="speed"
                cols="12 2"
                component={LabelField}
                validate={required}
                onInput={e => e.target.value = formatPositiveMoneyValue(e.target.value)}
              />
              <Field
                label="Unidade"
                name="speed_unity"
                cols="12 2"
                component={DropdownListField}
                data={["Kbps","Mbps"]}
                textField={item => item}
                textValue={({ item }) => item}
                placeholder={"Selecione"}
                validate={required}
              />
              <Field
                label="Simbolo"
                name="speed_symbol"
                cols="12 2"
                component={DropdownListField}
                data={["=","<="]}
                textField={item => item}
                textValue={({ item }) => item}
                placeholder={"Selecione"}
                validate={required}
              />
            </Row>
            <Row>
              <Field
                label="Mensalidade sem Imposto"
                name="mens_s_imp"
                cols="12 2"
                component={LabelField}
                validate={required}
                onInput={e => e.target.value = formatPositiveMoneyValue(e.target.value)}
              />
              <Field
                label="Instalação sem Imposto"
                name="inst_s_imp"
                cols="12 2"
                component={LabelField}
                onInput={e => e.target.value = formatPositiveMoneyValue(e.target.value)}
              />
            </Row>
            <Row>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => submitForm()}
              >
                Salvar
              </button>
            </Row>
          </Grid>
        </div>
      </form>
      <Overlay/>
    </div>
  );
};

CadastrarItemLpu.defaultProps = {
  reloadParent: () => {}
};

const Form = reduxForm({ form: "CadastrarItemLpu" })(CadastrarItemLpu);

const mapDispatchToProps = dispatch => bindActionCreators({
  save_lpu_item
}, dispatch);

const mapStateToProps = state => {

  return {
    auth: state.auth,
    cadastrarItemLpuForm: state.form.CadastrarItemLpu,
    comandoLpuReducer: state.comandoLpuReducer,
    initialValues:{
      speed_symbol: "=",
      speed_unity: "Mbps",
      vendor_prazo: "0",
    },
    enableReinitialize: true
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);
