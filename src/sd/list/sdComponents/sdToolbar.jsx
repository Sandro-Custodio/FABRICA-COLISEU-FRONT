import React from "react";
import { ExportExcel, IconButton } from "common";
import "./styles.css";

const SDToolbar = ({ children, rows, columns }) => (
  <>
    <div
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      {children}
    </div>
    <ExportExcel name="Plano Operativo Acesso" rows={rows} columns={columns}>
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
  </>
);

export default SDToolbar;
