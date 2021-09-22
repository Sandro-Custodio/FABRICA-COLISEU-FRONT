import React from "react";

import { ExportExcel, IconButton } from "common";
import columns from "../columns.json";

export default rows => (
  <ExportExcel rows={rows} columns={columns}>
    <IconButton
      icon="file-excel-o"
      typeTooltip="success"
      className="btn btn-success"
      iconProps={{ style: { fontSize: "16px", marginRight: "5px" } }}
      disabled={!rows.length}
    >
      Exportar
    </IconButton>
  </ExportExcel>
);
