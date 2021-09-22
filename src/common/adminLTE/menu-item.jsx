import React from "react";
import ReactTooltip from "react-tooltip";

const MenuItem = props => {
  const { label, icon, path } = props;
  return (
    <li>
      <ReactTooltip id="main-menu" place="right" type="error" effect="solid" />
      <a href={path} data-for="main-menu" data-tip={label}>
        <i className={`fa fa-${icon}`} /> <span>{label}</span>
      </a>
    </li>
  );
};

export default MenuItem;
