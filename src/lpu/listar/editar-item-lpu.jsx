import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import get from "lodash/get";
import Overlay from "../../common/msg/overlay/overlay";
import Grid from "../../common/layout/grid";
import Row from "../../common/layout/row";
import {
  DropdownListField,
  LabelField,
 } from "../../common/form/components";
 import { formatPositiveMoneyValue } from "common/utils";

 import { save_lpu_item } from "../actions";

const required = value => value ? undefined : 'Campo obrigatório';

const EditarItemLpu = props => {

  const {
    editarItemLpuForm,
    comandoLpuReducer: {
      degrau_list
    },
    auth,
    selected_lpu_item,
    reloadParent,
    //actions
    save_lpu_item,
  } = props;

  const [selection, setSelection] = React.useState([]);

  const submitForm = () => {
    const {
      editarItemLpuForm,
      selected_lpu_item,
      auth
    } = props
    const values = {
      lpu_item:{
        ...editarItemLpuForm.values,
        lpu_id: selected_lpu_item.lpu_id,
        id: selected_lpu_item.id
      },
      logged_user_id: auth?.user?.id
    };

    if(editarItemLpuForm && !editarItemLpuForm.syncErrors){
      Promise.all([save_lpu_item(values)]).then($ => {
        window.$(`#editar_item_lpu`).modal("hide");
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

EditarItemLpu.defaultProps = {
  reloadParent: () => {}
}

const Form = reduxForm({ form: "EditarItemLpu" })(EditarItemLpu);

const mapDispatchToProps = dispatch => bindActionCreators({
  save_lpu_item
}, dispatch);

const mapStateToProps = (state,props) => {
  const vendor_degrau = get(props, "selected_lpu_item.vendor_degrau", "vendor_degrau");
  const vendor_prazo  = get(props, "selected_lpu_item.vendor_prazo", "vendor_prazo");
  const speed         = get(props, "selected_lpu_item.speed", "speed");
  const speed_unity   = get(props, "selected_lpu_item.speed_unity", "speed_unity");
  const speed_symbol  = get(props, "selected_lpu_item.speed_symbol", "speed_symbol");
  const mens_s_imp    = get(props, "selected_lpu_item.mens_s_imp", "mens_s_imp");
  const inst_s_imp    = get(props, "selected_lpu_item.inst_s_imp", "inst_s_imp");

  return {
    editarItemLpuForm: state.form.EditarItemLpu,
    comandoLpuReducer: state.comandoLpuReducer,
    auth: state.auth,
    initialValues:{
      vendor_degrau,
      vendor_prazo,
      speed,
      speed_unity,
      speed_symbol,
      mens_s_imp,
      inst_s_imp,
    },
    enableReinitialize: true
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);
