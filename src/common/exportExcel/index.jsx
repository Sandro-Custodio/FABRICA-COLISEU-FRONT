import React from "react";
import ReactExport from "react-data-export";

const {
  ExcelFile,
  ExcelFile: { ExcelSheet, ExcelColumn }
} = ReactExport;

const ExportExcel = ({ rows, columns, children, name }) => {
  return (
    <ExcelFile element={children}>
      <ExcelSheet data={rows} name={name}>
        {columns.map(col => (
          <ExcelColumn key={col.name} label={col.title} value={col.name} />
        ))}
      </ExcelSheet>
    </ExcelFile>
  );
};

ExportExcel.defaultProps = {
  rows: [],
  columns: [],
  name: "Excel"
};

export default ExportExcel;
