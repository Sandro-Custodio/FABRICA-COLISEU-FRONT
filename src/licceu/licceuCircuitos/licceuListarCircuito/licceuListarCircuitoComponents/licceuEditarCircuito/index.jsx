import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { IconButton, Modal } from "common";
import SaveCircuit from "./saveCircuit";
import Table from "./table";
import Form from "./form";
import { getCircuit } from "../../licceuActions";

const EditarCircuito = ({ row, getCircuit }) => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    if (open) getCircuit(row.id, row.ot);
  }, [open]);

  return (
    <>
      <IconButton
        onClick={() => setOpen(true)}
        title="Editar Circuito"
        icon="edit"
        color="orange"
        className="filtro-btn"
        style={{ padding: 10 }}
      />
      {open && (
        <Modal
          open
          disableBtnClose
          dimension="lg"
          title={`Edição do Circuito "${row.nome}"`}
          onClose={() => setOpen(false)}
          height="70vh"
          loading={loading}
          footer={
            <SaveCircuit
              row={row}
              handleClose={() => setOpen(false)}
              name={row.nome}
              setLoading={setLoading}
            />
          }
        >
          <Form circuit_id={row.id} initialValues={row} />
          <Table />
        </Modal>
      )}
    </>
  );
};

export default connect(
  null,
  dispatch => bindActionCreators({ getCircuit }, dispatch)
)(EditarCircuito);
