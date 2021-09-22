import React from "react";
import { Modal, Table } from "common";
import { columnsUpload } from "../mock.json";
import ExportarResultado from "./ExportarResultado";

export default ({
  openModalUpload,
  setOpenModalUpload,
  linhasOpenModalUpload
}) => {
  const [selection, onSelectionChange] = React.useState([]);

  return (
    <Modal
      open={openModalUpload}
      title="Multiplas EVTs"
      dimension="md"
      width="90vw"
      onClose={() => setOpenModalUpload(false)}
      footer={
        <ExportarResultado
          selection={selection}
          rows={linhasOpenModalUpload}
          columns={columnsUpload}
        />
      }
      disableBtnClose
    >
      <Table
        columns={columnsUpload}
        rows={linhasOpenModalUpload}
        actions={[]}
        selectionProps={{ selection, onSelectionChange }}
        disablePagination
      />
    </Modal>
  );
};
