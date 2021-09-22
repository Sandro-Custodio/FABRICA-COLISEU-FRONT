/* eslint-disable jsx-a11y/anchor-has-content */
import React from "react";
import Img from "react-image";
import { connect } from "react-redux";
import Navbar from "./navbar";
import logo from "../images/tim-logo.png";

const header = props => {
  const { application } = props;
  return (
    <header className="main-header">
      <a href={`#/${application}`} className="logo">
        <span className="logo-mini">
          <Img width="40%" src={logo} />
        </span>
        <span className="logo-lg">
          <Img width="10%" src={logo} />
          <b style={{ textTransform: "uppercase" }}> {application} </b>
        </span>
      </a>
      <nav className="navbar navbar-static-top">
        <a
          href="/"
          className="sidebar-toggle sidebar-toggle-icon-white"
          data-toggle="push-menu"
        />
        <Navbar />
      </nav>
    </header>
  );
};

const mapStateToProps = state => ({ application: state.auth.application });

export default connect(mapStateToProps)(header);
