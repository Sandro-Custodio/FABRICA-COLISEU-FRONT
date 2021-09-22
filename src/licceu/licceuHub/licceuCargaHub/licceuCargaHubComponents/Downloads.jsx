import React from "react";
import ReactTooltip from "react-tooltip";
import ReactExport from "react-data-export";
import { columns } from "./modeloExportacao";

const {
  ExcelFile,
  ExcelFile: { ExcelSheet, ExcelColumn }
} = ReactExport;

const Download = () => {
  return (
    <React.Fragment>
      <ExcelFile
        element={
          <button type="button" className="btn btn-primary">
            <i className="fa fa-download" style={{ marginRight: "10px" }} />
            Download do Modelo de Exportação
          </button>
        }
      >
        <ExcelSheet data={[]} name="Hub">
          {columns.map(item => (
            <ExcelColumn key={item.id} label={item.title} />
          ))}
        </ExcelSheet>
      </ExcelFile>
      <ReactTooltip
        id="top_green_float"
        place="top"
        type="success"
        effect="float"
      />
    </React.Fragment>
  );
};

export default Download;
