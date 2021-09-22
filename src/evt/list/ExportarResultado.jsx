import React from "react";
import { ExportExcel } from "common";
import { IconButton } from "../comps";

export default ({ selection, rows, columns }) => {
  const rowsExport = rows.filter(
    (_, idx) => !selection.length || selection.includes(idx)
  );

  return (
    <div>
      <ExportExcel
        name="Plano Operativo Acesso"
        rows={rowsExport}
        columns={columns}
      >
        <IconButton
          icon="file-excel-o"
          typeTooltip="success"
          className="btn btn-success"
          iconProps={{ style: { fontSize: "16px", marginRight: "5px" } }}
          disabled={!rowsExport.length}
        >
          Exportar
        </IconButton>
      </ExportExcel>
    </div>
  );
};
