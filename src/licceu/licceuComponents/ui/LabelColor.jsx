import React from "react";

const LabelColor = ({ label, text }) => (
  <span className={`label label-${label}`}>{text}</span>
);

export default LabelColor;
