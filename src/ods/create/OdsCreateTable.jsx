import React from "react";
import { Table } from "common";
import { toMoney } from "common/utils";
import { columns, columnWidths } from "./mock.json";

export default ({ rows, loading, setSelection, selection }) => {
  const maskRow = rows.map(el => ({
    ...el,
    val_link_s_imp: toMoney(el.val_link_s_imp)
  }));

  return (
    <Table
      loading={loading}
      rows={maskRow}
      columns={columns}
      columnWidths={columnWidths}
      enableDefaultFilter
      tableSelectionProps={{ showSelectAll: true }}
      selectionProps={{
        selection,
        onSelectionChange: setSelection
      }}
      disablePagination
    />
  );
};
