import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { FastForm } from "common";
import { listMWFast } from "../actions";

const Form = ({ listMWFast }) => {
  return (
    <FastForm
      inputProps={{ placeholder: "Licceu ID" }}
      handleSubmit={listMWFast}
    />
  );
};

const mapActionsForm = dispatch => bindActionCreators({ listMWFast }, dispatch);

export default connect(
  null,
  mapActionsForm
)(Form);
