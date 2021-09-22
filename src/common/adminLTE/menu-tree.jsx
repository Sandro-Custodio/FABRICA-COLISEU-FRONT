import React from "react";

export default props => {
  const { icon, label, children } = props;
  return (
    <li className="treeview">
      <a href="#/">
        <i className={`fa fa-${icon}`} /> <span>{label}</span>
        <i className="fa fa-angle-left pull-right" />
      </a>
      <ul className="treeview-menu">{children}</ul>
    </li>
  );
};
