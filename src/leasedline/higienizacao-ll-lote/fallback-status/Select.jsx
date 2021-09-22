import React from "react";
import { select_status } from "./mock.json";

export default ({ ...props }) => (
  <div className="form-group col-xs-7" style={{ margin: 0, width: "100%" }}>
    <select className="form-control" {...props}>
      <option value="">Selecione</option>
      {select_status.map(({ description, id }, index) => (
        <option key={index} value={id}>
          {description}
        </option>
      ))}
    </select>
  </div>
);
