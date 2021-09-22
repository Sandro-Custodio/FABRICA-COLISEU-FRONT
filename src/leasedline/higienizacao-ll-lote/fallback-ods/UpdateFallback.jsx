import React from "react";
import { TextareaField } from "common/form/components";

export default ({ setChange, change, isError }) => {
  return (
    <TextareaField
      style={{ height: 103 }}
      value={change}
      onChange={e => setChange(e.target.value)}
      label="Justificativa"
      error={isError}
    />
  );
};
