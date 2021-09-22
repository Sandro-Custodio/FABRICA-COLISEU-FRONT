import React from "react";
import { Table } from "common";

export default ({
  columns,
  rows,
  actions,
  selectionProps,
  loading,
  columnWidths
}) => {
  return (
    <Table
      columns={columns}
      loading={loading}
      rows={rows}
      actions={actions}
      selectionProps={selectionProps}
      selectByRowClick={false}
      columnWidths={columnWidths}
    />
  );
};
