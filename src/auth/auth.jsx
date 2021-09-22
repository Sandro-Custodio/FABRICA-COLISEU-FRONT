import "./auth.css";
import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import Grid from "../common/layout/grid";
import Row from "../common/layout/row";
import Messages from "../common/msg/messages";
import { Input } from "../common/form/components";
import { login } from "./actions";
import Overlay from "../common/msg/overlay/overlay";
import logo from "../common/images/tim-logo.png";
import ChangePassword from "./change_password/change_password";

let Auth = props => {
  const {
    handleSubmit,
    application,
    auth: { expiredPassword }
  } = props;

  return (
    <div>
      <div className="login-box fade-in fade-out">
        <div className="login-logo">
          <span className="logo-lg">
            <img alt="" width="8%" src={logo} />
          </span>
          <b> TIM</b> BRASIL
        </div>
        <div className="login-box-body box box-radius bg-navy">
          <div className="login-logo">
            <b style={{ textTransform: "uppercase" }}>{application}</b>
            {expiredPassword && <h4>Senha Expirada</h4>}
          </div>
          {!expiredPassword && (
            <form
              onSubmit={evt => {
                handleSubmit();
                evt.preventDefault();
              }}
            >
              <Field
                component={Input}
                type="input"
                name="login"
                placeholder="LOGIN"
                icon="user"
              />
              <p />
              <Field
                component={Input}
                type="password"
                name="password"
                placeholder="SENHA"
                icon="lock"
              />
              <p />
              <Row>
                <Grid cols="4">
                  {/* <a href="#/">ESQUECI MINHA SENHA</a> */}
                </Grid>
                <Grid cols="4">
                  <button
                    type="submit"
                    // disabled={submitting}
                    className="btn btn-danger btn-block pull-right"
                  >
                    LOGIN
                  </button>
                </Grid>
              </Row>
            </form>
          )}
          {expiredPassword && <ChangePassword />}
          <Overlay />
        </div>
        <Messages />
      </div>
    </div>
  );
};

Auth = reduxForm({ form: "authForm" })(Auth);
const mapStateToProps = state => ({
  auth: state.auth,
  application: state.auth.application
});
const mapDispatchToProps = dispatch => bindActionCreators({ login }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
