import React from "react";
import { toastr } from "react-redux-toastr";

import { ExportExcel, IconButton } from "common";
import { remove } from "./actions";
import columns from "./columns.json";

const Export = ({ rows }) => {
  return (
    <ExportExcel name="Plano Operativo Acesso" rows={rows} columns={columns}>
      <IconButton
        icon="file-excel-o"
        className="btn btn-success"
        iconProps={{ style: { fontSize: "16px", marginRight: "5px" } }}
        disabled={!rows.length}
      >
        Exportar
      </IconButton>
    </ExportExcel>
  );
};
Export.defaultProps = {
  rows: []
};

const Delete = ({ rows, selection, refreshTable, setLoading }) => {
  if (!selection.length) return null;

  const handleDelete = async () => {
    setLoading(true);
    await remove(
      rows.filter((_, idx) => selection.includes(idx)).map(({ id }) => ({ id }))
    );
    refreshTable();
  };

  const confirmDelete = () =>
    toastr.confirm("Você deseja remover todos os arquivos selecionados?", {
      onOk: handleDelete
    });

  return (
    <IconButton
      onClick={confirmDelete}
      color="#dd4b39"
      icon="trash"
      title="Excluir"
    />
  );
};

export default ({ rows, ...others }) => (
  <div style={{ display: "flex", justifyContent: "space-between" }}>
    <div>
      <Delete rows={rows} {...others} />
    </div>
    <Export rows={rows} />
  </div>
);
