import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Table } from "common";
import columns from "./columns.json";
import { listBaseGerencialFilter } from "./actions";

const TableBaseGerencial = ({
  rows,
  loading,
  selection,
  total,
  page,
  dispatch,
  listBaseGerencialFilter
}) => {
  React.useEffect(() => {
    return () => {
      dispatch({ type: "RESETA_TABELA_BASEGERENCIAL" });
    };
  }, [dispatch]);

  return (
    <Table
      enableDefaultFilter
      columns={columns}
      rows={rows}
      loading={loading}
      columnWidths={columns.map(el => ({
        columnName: el.name,
        width: 150
      }))}
      changePage={page => listBaseGerencialFilter(page)}
      currentPage={page}
      total={total}
      selectionProps={{
        selection,
        onSelectionChange: payload => {
          if (payload.length > 1) {
            payload.shift();
          }
          dispatch({ type: "LISTAR_BASEGERENCIAL_SET_SELECTION", payload });
        }
      }}
      tableSelectionProps={{ showSelectAll: false }}
    />
  );
};

const mapStateTable = state => ({
  loading: state.licceuBaseGerencial.loading,
  rows: state.licceuBaseGerencial.rows,
  total: state.licceuBaseGerencial.total,
  page: state.licceuBaseGerencial.page,
  selection: state.licceuBaseGerencial.selection
});

const mapActionsBaseGerencial = dispatch =>
  bindActionCreators({ dispatch, listBaseGerencialFilter }, dispatch);

export default connect(
  mapStateTable,
  mapActionsBaseGerencial
)(TableBaseGerencial);
