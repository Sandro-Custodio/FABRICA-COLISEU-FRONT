import React from "react";

import { connect } from "react-redux";
import { IconButton, Modal } from "common";
import Form from "../form";

const Visualizar = ({ rows }) => {
  const [open, setOpen] = React.useState(false);
  if (rows.length !== 1) return null;

  return (
    <>
      <IconButton
        icon="eye"
        color="black"
        title="Visualizar"
        onClick={() => {
          setOpen(true);
        }}
      />
      <Modal
        open={open}
        title="Detalhes do MW Link"
        dimension="lg"
        height="70vh"
        width="80vw"
        onClose={() => setOpen(false)}
      >
        <Form initialValues={rows[0]} isVisualizar />
      </Modal>
    </>
  );
};

const mapStateTable = state => ({
  rows: state.listarMW.selected_rows
});

export default connect(mapStateTable)(Visualizar);
