/* eslint-disable import/no-cycle */
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ChangePassword from "./change_password/change_password";
import { openChangePassword } from "./actions";

function CheckPasswordValidity({ openChangePassword, auth }) {
  const { isPasswordAltered, passwordWillExpire } = auth;

  return (
    <div>
      <ul style={{ listStyle: "none" }}>
        <li>
          {isPasswordAltered === false && (
            <p style={{ fontSize: "1.1em", color: "orange" }}>
              Sua senha irá expirar em breve! Por favor, altere sua senha
              clicando
              <button
                type="button"
                style={{ border: "none", color: "blue", background: "none" }}
                onClick={() => {
                  openChangePassword();
                }}
              >
                aqui
              </button>
            </p>
          )}
          {isPasswordAltered === true && (
            <p style={{ fontSize: "1.1em", color: "black" }}>
              Senha alterada com sucesso!
            </p>
          )}
        </li>
      </ul>

      {passwordWillExpire && <ChangePassword />}
    </div>
  );
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ openChangePassword }, dispatch);

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckPasswordValidity);
