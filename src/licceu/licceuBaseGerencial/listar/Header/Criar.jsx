import React from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { reset } from "redux-form";
import { IconButton, Modal } from "common";
import FormBaseGeren from "../Forms/FormBaseGerencial";
import {
  abrirPopupCriarBaseGerencial,
  saveCreateBaseGerencial,
  listBaseGerencialFilter
} from "../actions";

const Criar = ({
  selected_rows,
  dispatch,
  abrirPopupCriarBaseGerencial,
  saveCreateBaseGerencial,
  listBaseGerencialFilter,
  loading_criar_base
}) => {
  const [open, setOpen] = React.useState(false);
  if (selected_rows.length !== 1) return null;

  return (
    <>
      <IconButton
        icon="plus"
        color="blue"
        title="Criar Base Gerencial"
        onClick={() => {
          abrirPopupCriarBaseGerencial();
          setOpen(true);
        }}
      />
      <Modal
        loading={loading_criar_base}
        open={open}
        title="Criar Base Gerencial"
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
                const flagPopup = await saveCreateBaseGerencial();
                if (flagPopup) {
                  dispatch(reset("formBaseGerencial"));
                  setOpen(false);
                  listBaseGerencialFilter();
                }
              }}
            >
              Criar
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
          disableInputChave={false}
        />
      </Modal>
    </>
  );
};

const mapStateTable = state => ({
  selected_rows: state.licceuBaseGerencial.selected_rows,
  loading_criar_base: state.licceuBaseGerencial.loading_criar_base
});

const mapActionsCriar = dispatch =>
  bindActionCreators(
    {
      dispatch,
      abrirPopupCriarBaseGerencial,
      saveCreateBaseGerencial,
      listBaseGerencialFilter
    },
    dispatch
  );

export default connect(
  mapStateTable,
  mapActionsCriar
)(Criar);
