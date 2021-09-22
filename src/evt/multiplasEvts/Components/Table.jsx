import React from "react";
import { Table } from "common";
import { columns, columnWidths } from "../mock.json";

export default ({ loading, rows }) => {
  return (
    <Table
    {...console.log("columnWidths --->",columnWidths)}
      style={{ height: "auto !important" }}
      rows={rows}
      columns={columns}
      columnWidths={columnWidths}
      loading={loading}
      disablePagination
      tableSelectionProps={{
        showSelectionColumn: false,
        selectByRowClick: true,
        highlightRow: true
      }}
    />
  );
};
