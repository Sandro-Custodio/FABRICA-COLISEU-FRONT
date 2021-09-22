import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Table } from "common";
import { listFiles } from "./actions";

const columns = [
  { name: "nomeArquivo", title: "Nome do Arquivo" },
  { name: "tipoDocumentoName", title: "Tipo do Documento" },
  { name: "dataUltimaGeracao", title: "Data" },
  { name: "processado", title: "Status da Última Geração" }
];

const MyTable = ({ listFiles, rows, loading, dispatch, selection }) => {
  React.useEffect(() => {
    listFiles();
  }, [listFiles]);

  return (
    <Table
      disablePagination
      enableDefaultFilter
      selectionProps={{
        selection,
        onSelectionChange: payload =>
          dispatch({ type: "SET_GERACAO_PLO_SELECTION", payload })
      }}
      columns={columns}
      rows={rows}
      loading={loading}
      tableSelectionProps={{ showSelectAll: true }}
    />
  );
};

const mapStateTable = state => ({
  rows: state.licceuGeracaoPLO.rows,
  loading: state.licceuGeracaoPLO.loading,
  selection: state.licceuGeracaoPLO.table_selections
});
const mapActionsTable = dispatch =>
  bindActionCreators({ listFiles, dispatch }, dispatch);

export default connect(
  mapStateTable,
  mapActionsTable
)(MyTable);
