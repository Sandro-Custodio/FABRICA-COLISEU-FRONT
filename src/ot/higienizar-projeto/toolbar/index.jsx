import React from "react";

import Filter from "./filter";
import FastForm from "common/FastForm/";
import NewProject from "./newProject";
import InactivateProject from "./inactivateProject";
import EditSubproject from "./editSubproject";
import Export from "./export";
import { listFastProjects } from "../actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const Toolbar = ({listFastProjects, auth}) => {
  return (
    <section style={{ display: "flex", alignItems: "center" }}>
      <Filter />
      <FastForm
        auth={auth}
        handleSubmit={listFastProjects}
        filter="codOt"
        filterName="filters"
        inputProps={{ placeholder: "Cód. OT" }}
      />
      <NewProject />
      <InactivateProject />
      <EditSubproject />
      <Export />
    </section>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      listFastProjects
    },
    dispatch
  );
const mapStateToProps = state => ({
  auth: state.auth,
});
export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);