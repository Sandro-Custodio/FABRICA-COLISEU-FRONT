import React from "react";
import { connect } from "react-redux";

import { Table } from "common";

const columns = [
  { name: "nomeArquivo", title: "Nome do Arquivo" },
  { name: "ano", title: "Ano" },
  { name: "planoOperativo", title: "Tipo do Arquivo" }
];

const GridUpload = ({ loading, rows, selection, dispatch }) => {
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
          dispatch({ type: "SET_CARGA_PLO_SELECTIONUPLOAD", payload })
      }}
    />
  );
};

export default connect(state => ({
  loading: state.licceuCargaPLO.loading_upload,
  rows: state.licceuCargaPLO.rows_upload,
  selection: state.licceuCargaPLO.table_selections_upload
}))(GridUpload);
