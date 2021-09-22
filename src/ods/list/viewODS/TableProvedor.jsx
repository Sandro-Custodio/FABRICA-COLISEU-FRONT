import React from "react";
import { Table } from "common";
import { provedor_table } from "./tableOdsColumns.json";

export default props => {
  return (
    <Table
      style={{ height: "auto !important" }}
      columns={provedor_table}
      disablePagination
      tableSelectionProps={{
        showSelectionColumn: false,
        selectByRowClick: true,
        highlightRow: true
      }}
      {...props}
    />
  );
};
