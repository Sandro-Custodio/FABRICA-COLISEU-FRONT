import React from "react";
import { bindActionCreators } from "redux";
import { Field, reduxForm, reset } from "redux-form";
import { toastr } from "react-redux-toastr";
import { connect } from "react-redux";
import get from "lodash/get";

import { IconButton, Modal } from "common";
import { getCircuits } from "./actions";

const Filtro = ({ formValues, setLoading, setRows, dispatch }) => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(false);
    setLoading(true);
    const promise = getCircuits(formValues);
    promise
      .then(({ rows }) => {
        if (rows) {
          setRows(rows);
          clearFilter();
        }
      })
      .catch(() => {
        toastr.warning("Preencha ao menos uma opção de filtro!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const clearFilter = () => {
    dispatch(reset("filtroForm"));
  };

  return (
    <>
      <IconButton icon="search" title="Filtrar" onClick={() => setOpen(true)} />
      <Modal
        title="Filtro de Circuitos"
        open={open}
        onClose={() => setOpen(false)}
        disableBtnClose
        dimension="lg"
        footer={
          <>
            <IconButton
              icon="search"
              iconProps={{ style: { fontSize: "16px" } }}
              className="btn btn-primary"
              onClick={() => handleClick()}
            >
              Filtrar
            </IconButton>
            <IconButton
              icon="trash"
              iconProps={{ style: { fontSize: "16px" } }}
              className="btn btn-danger"
              onClick={() => clearFilter()}
            >
              Limpar
            </IconButton>
          </>
        }
      >
        <main className="fade-in fade-out">
          <form className="form">
            <div className="col-md-4">
              <label htmlFor="circuito">Circuito ID</label>
              <Field
                component="textarea"
                id="circuito"
                name="circuito"
                rows="5"
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="ot_code">Código OT</label>
              <Field
                component="textarea"
                id="ot_code"
                name="ot_code"
                rows="5"
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="evt_code">Código Evt</label>
              <Field
                component="textarea"
                id="evt_code"
                name="evt_code"
                rows="5"
              />
            </div>
          </form>
        </main>
      </Modal>
    </>
  );
};

export default reduxForm({ form: "filtroForm" })(
  connect(
    state => ({ formValues: get(state, "form.filtroForm.values", {}) }),
    dispatch => bindActionCreators({ dispatch }, dispatch)
  )(Filtro)
);
