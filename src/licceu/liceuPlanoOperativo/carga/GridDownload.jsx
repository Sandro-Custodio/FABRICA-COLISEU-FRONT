import React from "react";
import { connect } from "react-redux";

import { Table } from "common";

const columns = [
  { name: "name", title: "Nome do Arquivo" },
  { name: "tipo", title: "Tipo do Arquivo" },
  { name: "version", title: "Versão" },
  { name: "data", title: "Data" }
];

const GridDownload = ({ loading, rows, selection, dispatch }) => {
  return (
    <Table
      columns={columns}
      loading={loading}
      rows={rows}
      disablePagination
      tableSelectionProps={{ showSelectAll: true }}
      enableDefaultFilter
      selectionProps={{
        selection,
        onSelectionChange: payload =>
          dispatch({ type: "SET_CARGA_PLO_SELECTION", payload })
      }}
    />
  );
};

const mapStateGrid = state => ({
  rows: state.licceuCargaPLO.rows,
  loading: state.licceuCargaPLO.loading,
  selection: state.licceuCargaPLO.table_selections
});

export default connect(mapStateGrid)(GridDownload);
