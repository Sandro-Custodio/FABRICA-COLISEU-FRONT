import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import get from "lodash/get";

import { Table } from "common";
import { listProjects } from "./actions";
import columns from "./columns.json";

const MyTable = ({
  filter,
  loading,
  rows,
  listProjects,
  selection,
  dispatch
}) => {
  React.useEffect(() => {
    listProjects(filter);
  }, []);

  return (
    <Table
      showBorders
      rows={rows}
      columns={columns}
      loading={loading}
      tableSelectionProps={{
        selectByRowClick: true,
        highlightRow: true,
        showSelectionColumn: false,
        showSelectAll: true
      }}
      groupingStateProps={{
        grouping: [{ columnName: "project_name" }, { columnName: "ano" }]
      }}
      disablePagination
      selectionProps={{
        selection,
        onSelectionChange: payload =>
          dispatch({ type: "CHANGE_ROW_SELECTED", payload })
      }}
    />
  );
};

const mapProjetoActions = dispatch =>
  bindActionCreators({ listProjects, dispatch }, dispatch);

const mapProjetoState = state => ({
  filter: get(state, "form.higienizarFilter.values"),
  rows: get(state, "higienizarProjetos.rows", []),
  loading: get(state, "higienizarProjetos.loading", false),
  selection: get(state, "higienizarProjetos.table_selections", [])
});

export default connect(
  mapProjetoState,
  mapProjetoActions
)(MyTable);
