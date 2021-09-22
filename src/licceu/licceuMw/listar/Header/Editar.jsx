import React from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { IconButton, Modal } from "common";
import Form from "../form";
import { editarMw } from "../actions";

const Editar = ({ rows, editarMw }) => {
  const [open, setOpen] = React.useState(false);
  if (rows.length !== 1) return null;

  return (
    <>
      <IconButton
        icon="edit"
        color="orange"
        title="Editar"
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
        footer={
          <>
            <button
              type="button"
              className="btn btn-primary btn-footer"
              onClick={() => {
                editarMw();
                setOpen(false);
              }}
            >
              Editar
            </button>
          </>
        }
      >
        <Form initialValues={rows[0]} />
      </Modal>
    </>
  );
};

const mapStateTable = state => ({
  rows: state.listarMW.selected_rows
});

const mapActionsEditar = dispatch =>
  bindActionCreators({ editarMw, dispatch }, dispatch);

export default connect(
  mapStateTable,
  mapActionsEditar
)(Editar);
