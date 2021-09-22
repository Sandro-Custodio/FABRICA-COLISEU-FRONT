import React from "react";
import { Field, reduxForm, reset } from "redux-form";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { IconButton, Modal } from "common";
import { listFiles } from "../actions";
import TipoDocumento from "../TipoDocumentoInput";

const mapActionsFiltro = dispatch =>
  bindActionCreators({ listFiles, dispatch }, dispatch);

const mapStateFiltro = state => ({
  loading: state.licceuGeracaoPLO.loading_tipodoc
});

const Filtro = connect(
  mapStateFiltro,
  mapActionsFiltro
)(({ dispatch, listFiles, loading }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <IconButton icon="search" title="Filtrar" onClick={() => setOpen(true)} />
      <Modal
        title="Filtrar Arquivos"
        open={open}
        onClose={() => setOpen(false)}
        disableBtnClose
        loading={loading}
        footer={
          <>
            <button
              type="submit"
              onClick={() => {
                listFiles();
                setOpen(false);
              }}
              className="btn btn-primary"
            >
              Filtrar
            </button>
            <button
              type="submit"
              onClick={() => dispatch(reset("filterFormGeracao"))}
              className="btn btn-danger"
            >
              Limpar
            </button>
          </>
        }
      >
        <Field component={TipoDocumento} name="tipo_documento" />
      </Modal>
    </>
  );
});

export default reduxForm({
  form: "filterFormGeracao",
  initialValues: { tipo_documento: "TODOS" }
})(Filtro);
