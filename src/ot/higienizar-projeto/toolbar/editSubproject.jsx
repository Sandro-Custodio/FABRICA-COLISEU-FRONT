import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import get from "lodash/get";
import { bindActionCreators } from "redux";

import { IconButton, Modal } from "common";
import { renameSubproject } from "../actions";

const FormEditName = reduxForm({ form: "higienizarEditNome" })(() => (
  <form>
    <label htmlFor="sub_project_name">Nome: </label>
    <Field
      component="input"
      type="text"
      name="sub_project_name"
      id="sub_project_name"
      className="form-control input-sm"
    />
    <label htmlFor="classificacao_nfe">Classificação TSD: </label>
    <Field
      component="input"
      type="text"
      name="classificacao_nfe"
      id="classificacao_nfe"
      className="form-control input-sm"
    />
  </form>
));

const EditName = ({ row, form, filter, renameSubproject }) => {
  const [open, setOpen] = React.useState(false);
  if (!row) return null;
  const disabled = JSON.stringify(row) === JSON.stringify(form);
  return (
    <>
      <IconButton
        onClick={() => setOpen(true)}
        title="Editar Subprojeto"
        icon="pencil-square-o"
      />
      {open && (
        <Modal
          onClose={() => setOpen(false)}
          open={open}
          title="Editar Subprojeto"
          height="50vh"
          maxHeight={150}
          footer={
            <button
              onClick={() => {
                if (!disabled) {
                  renameSubproject({ form, filter });
                  setOpen(false);
                }
              }}
              type="button"
              className="btn btn-primary"
              disabled={disabled}
            >
              Editar
            </button>
          }
        >
          <FormEditName initialValues={row} />
        </Modal>
      )}
    </>
  );
};

const mapStateEditName = state => {
  const form = get(state, "form.higienizarEditNome.values", {});
  return {
    form: {
      ...form,
      sub_project_name: form.sub_project_name && form.sub_project_name.trim(),
      classificacao_nfe: form.classificacao_nfe && form.classificacao_nfe.trim()
    },
    row: get(state, "higienizarProjetos.row_selected"),
    filter: get(state, "form.higienizarFilter.values")
  };
};

const mapActionsEditName = dispatch =>
  bindActionCreators({ renameSubproject }, dispatch);

export default connect(
  mapStateEditName,
  mapActionsEditName
)(EditName);
