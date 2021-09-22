import React from "react";
import { bindActionCreators } from "redux";
import { Field, reduxForm, reset } from "redux-form";
import { connect, useSelector } from "react-redux";
import get from "lodash/get";

import { IconButton, Modal } from "common";
import { isPermited, logUserMenuAccess } from "auth/actions";
import { editar, getCircuits } from "./actions";

const Editar = ({
  formValues,
  filtro,
  setLoading,
  setRows,
  rows,
  onSelectionChange,
  dispatch
}) => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(false);
    setLoading(true);

    const edit = editar(rows, formValues.circuit_bill);
    edit
      .then(async () => {
        const search = getCircuits(filtro);
        await search.then(({ rows }) => {
          setRows(rows);
        });
      })
      .finally(() => {
        onSelectionChange([]);
        setLoading(false);
        dispatch(reset("editarForm"));
      });
  };

  const user = useSelector(({ auth: { user } }) => user.permissions);

  return (
    <>
      {isPermited(user, "DR_COC1A1C1") && (
        <IconButton
          icon="edit"
          color="orange"
          title="Editar"
          onClick={() => {
            setOpen(true);
            logUserMenuAccess("DR_COC1A1C1");
          }}
        />
      )}
      <Modal
        title="Editar Circuito Fatura"
        open={open}
        onClose={() => setOpen(false)}
        disableBtnClose
        dimension="sm"
        footer={
          <>
            <IconButton
              icon="check"
              iconProps={{ style: { fontSize: "16px" } }}
              className="btn btn-primary"
              onClick={() => handleClick()}
            >
              Salvar
            </IconButton>
            <IconButton
              icon="ban"
              iconProps={{ style: { fontSize: "16px" } }}
              className="btn btn-danger"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </IconButton>
          </>
        }
      >
        <main className="fade-in fade-out">
          <form className="form" onSubmit={evt => evt.preventDefault()}>
            <label htmlFor="circuit_bill">ID Circuito Fatura</label>
            <Field
              component="input"
              id="circuit_bill"
              name="circuit_bill"
              className="form-control input-sm"
            />
          </form>
        </main>
      </Modal>
    </>
  );
};

export default reduxForm({ form: "editarForm" })(
  connect(
    state => ({
      formValues: get(state, "form.editarForm.values", {}),
      filtro: get(state, "form.filtroForm.values", {})
    }),
    dispatch => bindActionCreators({ dispatch }, dispatch)
  )(Editar)
);
