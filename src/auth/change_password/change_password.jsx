/* eslint-disable import/no-cycle */
import React from "react";
import { toastr } from "react-redux-toastr";
import { bindActionCreators } from "redux";
import { reduxForm, Field, formValueSelector } from "redux-form";
import { connect } from "react-redux";
import Overlay from "../../common/msg/overlay/overlay";
import { LabelInput } from "../../common/form/components";
// import Grid from "../../common/layout/grid";
import Row from "../../common/layout/row";
import { changePass } from "../actions";

const _ = require("lodash");

const ChangePassword = props => {
  // const {
  //   auth
  // } = props;

  const submitForm = () => {
    const {
      formValues,
      changePass,
      auth: {
        values: { login }
      }
    } = props;

    const message = validateFields();
    if (message.length > 0) {
      toastr.error("Login", message);
    } else {
      changePass(login, formValues.old_password, formValues.new_password);
    }
  };

  const validateFields = () => {
    const {
      formValues: { new_password, new_password_confirmation, old_password },
      auth: {
        values: { login, password }
      }
    } = props;
    let validation_message = "";
    if (old_password && new_password && new_password_confirmation) {
      if (new_password === login) {
        validation_message +=
          "A senha não pode ser igual a matrícula do usuário. ";
      }
      if (old_password !== password) {
        validation_message += "Senha atual incorreta. ";
      }
      if (new_password !== new_password_confirmation) {
        validation_message +=
          "A nova senha não está igual a senha do campo de confirmação. ";
      }
      if (new_password.length < 8) {
        validation_message += "A senha deve possuir pelo menos 8 caracteres. ";
      }
      var lastChar = "";
      var RegSym = "%*&-$#@_+=!][´`^~,<>.;/?:()\\|// ";
      let hasSymbols = false;
      for (var i = 0; i < new_password.length; i++) {
        var char = new_password.charAt(i);
        if (char === lastChar) {
          validation_message +=
            "A senha não pode ter caracteres iguais subsequentes. ";
          break;
        }
        if (RegSym.indexOf(char) >= 0) {
          hasSymbols = true;
        }
        lastChar = char;
      }
      if (!hasSymbols) {
        validation_message += "A senha deve conter pelo menos um símbolo. ";
      }
      if (!/[a-z]/.test(new_password)) {
        validation_message +=
          "A senha deve conter pelo menos um caracter minúsculo. ";
      }
      if (!/[A-Z]/.test(new_password)) {
        validation_message +=
          "A senha deve conter pelo menos um caracter maiúsculo .";
      }
      if (!/[0-9]/.test(new_password)) {
        validation_message += "A senha deve conter pelo menos um número. ";
      }
    } else {
      validation_message += "Todos os campos são obrigatórios.";
    }
    return validation_message;
  };

  return (
    <div className="box-body formatInputPlaceholder">
      <Row>
        <Field
          cols="12"
          name="old_password"
          component={LabelInput}
          type="password"
          label="Senha atual"
          required
        />
      </Row>
      <Row>
        <Field
          cols="12"
          name="new_password"
          component={LabelInput}
          type="password"
          label="Nova senha"
          required
        />
      </Row>
      <Row>
        <Field
          cols="12"
          name="new_password_confirmation"
          component={LabelInput}
          type="password"
          label="Confirme nova senha"
          required
        />
      </Row>
      <Row>
        <button
          type="submit"
          className="btn btn-primary pull-right"
          onClick={() => {
            submitForm();
          }}
        >
          SALVAR
        </button>
      </Row>
    </div>
  );
};

const Form = reduxForm({ form: "changePassword" })(ChangePassword);
const seletor = formValueSelector("changePassword");
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changePass
    },
    dispatch
  );
const mapStateToProps = state => ({
  auth: state.auth,
  formValues: _.get(state, "form.changePassword.values", {})
});
export default connect(mapStateToProps, mapDispatchToProps)(Form);
