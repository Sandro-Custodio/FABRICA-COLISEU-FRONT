import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Table } from "common";
import { getList } from "./actions";

const columns = [
  { name: "nomeArquivo", title: "Nome do arquivo" },
  { name: "usuarioCarga", title: "Usuário Carga" },
  { name: "dataUltimaGeracao", title: "Data" },
  { name: "status", title: "Status" }
];

const MyTable = ({ getList, rows, dispatch, selection, loading }) => {
  React.useEffect(() => {
    getList();
  }, [getList]);

  return (
    <Table
      disablePagination
      enableDefaultFilter
      selectionProps={{
        selection,
        onSelectionChange: payload =>
          dispatch({ type: "GERENCIAMENTO_SELECTION", payload })
      }}
      columns={columns}
      rows={rows}
      loading={loading}
      tableSelectionProps={{ showSelectAll: true }}
    />
  );
};

const mapStateTable = state => ({
  rows: state.licceuGerenciamento.rows,
  loading: state.licceuGerenciamento.loading,
  selection: state.licceuGerenciamento.table_selections
});

const actionsTable = () => dispatch =>
  bindActionCreators({ getList, dispatch }, dispatch);

export default connect(
  mapStateTable,
  actionsTable
)(MyTable);
