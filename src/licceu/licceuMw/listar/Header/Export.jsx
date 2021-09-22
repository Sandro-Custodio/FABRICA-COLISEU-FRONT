import React from "react";
import { connect } from "react-redux";

import { ExportExcel, IconButton } from "common";
import columns from "../columns.json";

const Export = ({ rows }) => (
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

export default connect(state => ({ rows: state.listarMW.rows }))(Export);
