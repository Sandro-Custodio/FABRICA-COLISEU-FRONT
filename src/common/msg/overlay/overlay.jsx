import React from "react";
import { connect } from "react-redux";
import { Loading } from "common";

const Overlay = ({ overlay }) => {
  return overlay && <Loading />;
};

const mapStateToProps = state => ({ overlay: state.overlay.show });
export default connect(mapStateToProps)(Overlay);
