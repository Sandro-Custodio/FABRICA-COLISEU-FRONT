import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { IconButton } from "common";
// import ColumnsExport from "../cargaAMBV/Header/columnsExport";
import { exportBoqExcel } from "../cargaAMBV/actions";

const ExportBoqExcel = ({ rows, exportBoqExcel }) => {
  return (
    <div className="fade-in fade-out">
      <IconButton
        icon="file-excel-o"
        typeTooltip="success"
        className="btn btn-success"
        iconProps={{ style: { fontSize: "16px", marginRight: "5px" } }}
        // disabled={!rows.length}
        onClick={() => exportBoqExcel(rows)}
      >
        Exportar
      </IconButton>
    </div>
  );
};

const mapStateTable = state => ({
  rows: state.licceuControleBoq.rows
  // loading: state.licceuControleBoq.loading
  // selection: state.licceuGeracaoPLO.table_selections
});

const mapActionsTable = dispatch =>
  bindActionCreators({ exportBoqExcel, dispatch }, dispatch);

export default connect(
  mapStateTable,
  mapActionsTable
)(ExportBoqExcel);
