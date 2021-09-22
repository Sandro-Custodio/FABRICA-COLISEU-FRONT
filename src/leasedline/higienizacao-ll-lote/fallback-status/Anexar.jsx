import React from "react";
import { Table } from "common";
import ToolBarAnexar from "./TooBarAnexar";

export default ({
  uploadAnexar,
  loading,
  column_upload,
  setUploadAnexar,
  setLoading,
  checked,
  rowOperacao,
  selected,
  setRowOperacao,
  setChecked,
  label,
  setSelected
}) => {
  return (
    <Table
      rows={uploadAnexar}
      loading={loading}
      columns={column_upload}
      disablePagination
      toolBarComp={
        <ToolBarAnexar
          setUploadAnexar={setUploadAnexar}
          setLoading={setLoading}
          checked={checked}
          uploadAnexar={uploadAnexar}
          rowOperacao={rowOperacao}
          selected={selected}
          setRowOperacao={setRowOperacao}
          setChecked={setChecked}
          label={label}
          setSelected={setSelected}
        />
      }
    />
  );
};
