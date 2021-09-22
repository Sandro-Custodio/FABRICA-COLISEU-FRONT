import React from "react";
import get from "lodash/get";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { firstPage } from "../../licceuActions";

const FilterCircuit = ({ filter, firstPage, handleClose }) => (
  <button
    type="submit"
    className="btn btn-primary filtar"
    onClick={() => {
      firstPage(filter);
      handleClose();
    }}
  >
    <i className="fa fa-search" style={{ margin: "0 10px 0 0" }} />
    Buscar
  </button>
);

const mapStateToProps = state => ({
  filter: get(state, "form.licceuCircuitoFilter.values", {}),
  limit: state.licceuCircuitoOpenFilter.limit
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ firstPage }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterCircuit);
