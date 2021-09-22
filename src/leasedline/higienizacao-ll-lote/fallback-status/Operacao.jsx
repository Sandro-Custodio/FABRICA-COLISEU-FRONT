import React from "react";
import { Table } from "common";
import ToolBarColumn from "./ToolBarColumn";

export default ({
  rowOperacao,
  loading,
  columns,
  setRowOperacao,
  setLoading,
  setChecked,
  setUploadAnexar,
  selected,
  setSelected
}) => (
  <Table
    rows={rowOperacao}
    loading={loading}
    columns={columns}
    disablePagination
    toolBarComp={
      <ToolBarColumn
        setRowOperacao={setRowOperacao}
        setLoading={setLoading}
        setChecked={setChecked}
        setUploadAnexar={setUploadAnexar}
        selected={selected}
        setSelected={setSelected}
      />
    }
  />
);
