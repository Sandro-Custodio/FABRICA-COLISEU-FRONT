import React from "react";

export default ({ header, children, footer }) => (
  <div className="panel panel-default">
    {header && <div className="panel-heading">{header}</div>}
    <div className="panel-body">{children}</div>
    {footer && <div className="panel-footer">{footer}</div>}
  </div>
);
