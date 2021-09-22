import React from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { reset } from "redux-form";
import { IconButton, Modal } from "common";
import FormBaseGeren from "../Forms/FormBaseGerencial";
import { saveEditBaseGerencial, listBaseGerencialFilter } from "../actions";

const Editar = ({
  selected_rows,
  saveEditBaseGerencial,
  loading_edit_base,
  listBaseGerencialFilter,
  dispatch
}) => {
  const [open, setOpen] = React.useState(false);
  if (selected_rows.length !== 1) return null;

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
        loading={loading_edit_base}
        open={open}
        title="Editar Base Gerencial"
        dimension="lg"
        height="70vh"
        width="80vw"
        onClose={() => setOpen(false)}
        footer={
          <>
            <button
              type="button"
              className="btn btn-primary btn-footer"
              onClick={async () => {
                const flagPopup = await saveEditBaseGerencial();
                console.log(flagPopup);
                if (flagPopup) {
                  dispatch(reset("formBaseGerencial"));
                  setOpen(false);
                  listBaseGerencialFilter();
                }
              }}
            >
              Editar
            </button>
            <button
              type="button"
              className="btn btn-default"
              onClick={() => {
                dispatch(reset("formBaseGerencial"));
                setOpen(false);
              }}
            >
              Fechar
            </button>
          </>
        }
        disableBtnClose
      >
        <FormBaseGeren
          enableReinitialize
          initialValues={selected_rows[0]}
          disableInputChave
        />
      </Modal>
    </>
  );
};

const mapStateTable = state => ({
  selected_rows: state.licceuBaseGerencial.selected_rows,
  loading_edit_base: state.licceuBaseGerencial.loading_edit_base
});

const mapActionsEditar = dispatch =>
  bindActionCreators(
    { dispatch, saveEditBaseGerencial, listBaseGerencialFilter },
    dispatch
  );

export default connect(
  mapStateTable,
  mapActionsEditar
)(Editar);
