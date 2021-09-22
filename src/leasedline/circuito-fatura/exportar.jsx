import React from "react";

import { IconButton, ExportExcel } from "common";

export default ({ rows, columns }) => (
  <ExportExcel name="todo" rows={rows} columns={columns}>
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
