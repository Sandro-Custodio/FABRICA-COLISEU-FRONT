import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Table, QueryString } from "common";
import { listMW, listByRota } from "./actions";
import columns from "./columns.json";
import columnBands from "./columnBands.json";

const TableMW = ({
  rows,
  loading,
  listMW,
  total,
  page,
  selection,
  dispatch,
  listByRota
}) => {
  React.useEffect(() => {
    const id_rota = QueryString.get("id_rota");
    if (id_rota) listByRota(id_rota);
    else listMW();
    return () => dispatch({ type: "LISTARMW_CLEAR" });
  }, [listByRota]);

  return (
    <Table
      enableDefaultFilter
      columnBands={columnBands}
      columns={columns}
      rows={rows}
      loading={loading}
      columnWidths={columns.map(el => ({
        columnName: el.name,
        width: 150
      }))}
      changePage={page => listMW(page)}
      currentPage={page}
      total={total}
      selectionProps={{
        selection,
        onSelectionChange: payload =>
          dispatch({ type: "LISTARMW_SET_SELECTION", payload })
      }}
      tableSelectionProps={{ showSelectAll: true }}
    />
  );
};

const mapStateTable = state => ({
  loading: state.listarMW.loading,
  rows: state.listarMW.rows,
  total: state.listarMW.total,
  page: state.listarMW.page,
  selection: state.listarMW.selection
});

const mapActionsMW = dispatch =>
  bindActionCreators({ listMW, dispatch, listByRota }, dispatch);

export default connect(
  mapStateTable,
  mapActionsMW
)(TableMW);
