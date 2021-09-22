import React from "react";

const LicceuIconButton = ({ icon }) => (
  <button type="button" className="btn-lg btn-link pull-left">
    <i className={`fa fa-${icon} menu-table__icon`} />
  </button>
);

export default LicceuIconButton;
