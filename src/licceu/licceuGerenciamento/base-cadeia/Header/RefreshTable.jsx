import React from "react";
import { connect } from "react-redux";

import { IconButton } from "common";
import { getList } from "../actions";

const RefreshTable = ({ getList }) => {
  return (
    <IconButton icon="refresh" onClick={getList} title="Atualizar Lista" />
  );
};

export default connect(
  null,
  { getList }
)(RefreshTable);
