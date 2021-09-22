import React from "react";

export const Box = ({ color, children }) => (
  <div className={`box box-${color}`} style={{ padding: 15, margin: 0 }}>
    <div className="row">{children}</div>
  </div>
);

export const Row = ({ md, sm, xs, children }) => (
  <section className="row">
    <div className={`col-md-${md} col-sm-${sm} col-xs-${xs}`}>{children}</div>
  </section>
);

export const Col = ({ md, sm, xs, children }) => (
  <div className={`col-md-${md} col-sm-${sm} col-xs-${xs}`}>{children}</div>
);
