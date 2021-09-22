import React from "react";
import { connect } from "react-redux";

import { ExportExcel, IconButton } from "common";
import columns from "../columns.json";

const EditName = ({ rows }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        flex: "1",
        alignItems: "center"
      }}
    >
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
    </div>
  );
};

export default connect(state => ({ rows: state.higienizarProjetos.rows }))(
  EditName
);
