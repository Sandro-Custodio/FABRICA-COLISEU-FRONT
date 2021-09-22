import React from "react";

import { ExportExcel, IconButton } from "common";
import ViewODS from "./viewODS";
import { columns } from "./mock.json";

export default ({ size, describe, rows }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%"
      }}
    >
      <ViewODS size={size} describe={describe} />
      {size.length === 1 && (describe && describe.code)}
      <ExportExcel rows={rows} columns={columns}>
        <IconButton
          title="Exportar"
          icon="file-excel-o"
          color="#28a745"
          typeTooltip="success"
        />
      </ExportExcel>
    </div>
  );
};
