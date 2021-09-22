import React from "react";
import { connect } from "react-redux";
import Header from "./common/adminLTE/header";
import SideBar from "./common/adminLTE/sidebar";
import Main from "./common/adminLTE/Main";
import Routes from "./routes/routes";
import LicceuRoutes from "./routes/licceuRoutes";
import Messages from "./common/msg/messages";
import 'moment/locale/pt-br'
import Moment from "moment";
import momentLocalizer from "react-widgets-moment";

const App = ({ application }) => {
  if (application === "coliseu") {
    Moment.locale("pt-br"); // configuração de tradução data globalmente
    momentLocalizer();
  }

  return (
    <div className="wrapper">
      <Header />
      <Main>
        <SideBar />
        <div className="content-wrapper">
          {application === "coliseu" ? <Routes /> : <LicceuRoutes />}
        </div>
        <Messages />
      </Main>
    </div>
  );
};

const mapStateToProps = state => ({ application: state.auth.application });

export default connect(mapStateToProps)(App);
