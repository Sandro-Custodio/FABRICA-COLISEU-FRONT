import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { clearFilter } from "../../licceuActions";

const ClearFilter = ({ clearFilter }) => {
  return (
    <button type="button" className="btn btn-danger" onClick={clearFilter}>
      <i className="fa fa-bitbucket" style={{ margin: "0 10px 0 0" }} />
      Limpar
    </button>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ clearFilter }, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(ClearFilter);
