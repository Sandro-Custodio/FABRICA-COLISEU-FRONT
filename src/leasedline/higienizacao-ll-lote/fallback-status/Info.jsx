import React from "react";

export default ({ info }) => (
  <div style={styles}>
    <i
      className="fa fa-exclamation-triangle fa-2x text-danger"
      aria-hidden="true"
      style={{ marginRight: 10 }}
    ></i>
    <span>{info}</span>
  </div>
);

const styles = {
  display: "flex",
  alignItems: "center",
  fontWeight: "bold",
  width: "100%"
};
