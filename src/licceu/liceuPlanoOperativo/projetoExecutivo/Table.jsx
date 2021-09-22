import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Table } from "common";
import { listTable } from "./actions";

const columns = [
  { name: "nome", title: "Nome do Arquivo" },
  { name: "tipoDoc", title: "Tipo do Documento" },
  { name: "version", title: "Versão" },
  { name: "data", title: "Data" }
];

const MyTable = ({ listTable, rows, loading, dispatch, selection }) => {
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    listTable();
  }, [listTable]);
  const onSelectionChange = payload => {
    console.log("onSelectionChange", payload);
    dispatch({ type: "PROJETOEXECUTIVOLISTAR_SET_SELECTION", payload });
  };

  return (
    <Table
      enableDefaultFilter
      columns={columns}
      rows={rows.slice((page - 1) * 100, page * 100)}
      loading={loading}
      selectionProps={{ selection, onSelectionChange }}
      currentPage={page}
      changePage={setPage}
      total={rows.length}
    />
  );
};

const mapStateTable = state => ({
  rows: state.licceuProjetoExecutivoListar.rows,
  loading: state.licceuProjetoExecutivoListar.loading_table,
  selection: state.licceuProjetoExecutivoListar.table_selections
});

const actionsTable = dispatch =>
  bindActionCreators({ listTable, dispatch }, dispatch);

export default connect(
  mapStateTable,
  actionsTable
)(MyTable);
