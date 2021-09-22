import React from "react";

import Filtro from "./filtro";
import DownloadModelo from "./downloadModelo";
import Exportar from "./exportar";
import Editar from "./editar";
import Upload from "./upload";

export default ({
  setLoading,
  setRows,
  rows,
  columns,
  selection,
  onSelectionChange
}) => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ display: "flex" }}>
        <Filtro setLoading={setLoading} setRows={setRows} />
        <DownloadModelo />
        <Upload setLoading={setLoading} />
        {selection.length > 0 && (
          <Editar
            setLoading={setLoading}
            setRows={setRows}
            rows={selection.map(select => rows[select])}
            onSelectionChange={onSelectionChange}
          />
        )}
      </div>
      <Exportar rows={rows} columns={columns} />
    </div>
  );
};
