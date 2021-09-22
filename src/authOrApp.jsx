import React from "react";
import { ThroughProvider } from "react-through";
import "./common/adminLTE/dependences";
import axios from "axios";
import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";
import { bindActionCreators } from "redux";
import App from "./App";
import Auth from "./auth/auth";
import { validateToken, login, setApplication, logout } from "./auth/actions";

class AuthOrApp extends React.Component {
  componentWillMount() {
    const {
      auth: { user },
      validateToken
    } = this.props;
    if (user) {
      validateToken(user.access_token);
    }
  }

  componentDidMount() {
    const { setApplication } = this.props;
    setApplication();
  }

  render() {
    const {
      auth: { user, validToken, application },
      children,
      login,
      logout
    } = this.props;
    window.document.title = `TIM → ${application.toUpperCase()}`;

    let hidden;
    let visibilityChange;
    if (typeof document.hidden !== "undefined") {
      // Suporte para Opera 12.10 e Firefox 18 em diante
      hidden = "hidden";
      visibilityChange = "visibilitychange";
    } else if (typeof document.mozHidden !== "undefined") {
      hidden = "mozHidden";
      visibilityChange = "mozvisibilitychange";
    } else if (typeof document.msHidden !== "undefined") {
      hidden = "msHidden";
      visibilityChange = "msvisibilitychange";
    } else if (typeof document.webkitHidden !== "undefined") {
      hidden = "webkitHidden";
      visibilityChange = "webkitvisibilitychange";
    }

    const ALLOWED_IDDLE_TIME_IN_MINUTES = 120;
    let startIddleTime;

    const handleVisibilityChange = () => {
      if (document[hidden] && user) {
        startIddleTime = new Date();
      } else {
        const now = new Date();
        const IDDLE_TIME = Math.abs(now - startIddleTime);
        const IDDLE_TIME_IN_MINUTES = Math.floor(IDDLE_TIME / 1000 / 60);

        if (
          IDDLE_TIME_IN_MINUTES >= ALLOWED_IDDLE_TIME_IN_MINUTES &&
          startIddleTime !== null &&
          user
        ) {
          Promise.all([logout(user.id)]).finally(() => {
            startIddleTime = null;
            // window.location.href = "/logout";
            setTimeout(() => {
              toastr.message("Aviso", "Deslogado por inatividade no sistema!");
            }, 1000);
          });
        }
      }
    };

    if (
      typeof document.addEventListener === "undefined" ||
      typeof document.hidden === "undefined"
    ) {
      toastr.info(
        "Alerta",
        "Por favor, utilize o sistema em um navegador mais recente."
      );
    } else {
      document.addEventListener(visibilityChange, handleVisibilityChange);
    }

    if (application === "licceu") {
      window
        .$("body")
        .removeClass("skin-black")
        .addClass("skin-blue");
    }
    if (user && validToken) {
      axios.defaults.headers.common.authorization = user.access_token;
      return (
        <ThroughProvider>
          <App>{children}</App>
        </ThroughProvider>
      );
    }

    if (!user && !validToken) {
      return <Auth onSubmit={login} />;
    }

    return null;
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { validateToken, login, setApplication, logout },
    dispatch
  );
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, mapDispatchToProps)(AuthOrApp);
