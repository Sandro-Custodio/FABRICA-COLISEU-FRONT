import React from "react";
import { connect } from "react-redux";

import { Table } from "common";

const columns = [{ name: "critica", title: "Crítica" }];

const TableGrid = ({ loading, rows }) => {
  return (
    <Table columns={columns} rows={rows} loading={loading} disablePagination />
  );
};

export default connect(state => ({
  loading: state.OtMultiple.loading,
  rows: state.OtMultiple.criticas
}))(TableGrid);
