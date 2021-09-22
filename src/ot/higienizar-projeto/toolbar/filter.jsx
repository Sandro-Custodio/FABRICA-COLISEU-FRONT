import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import get from "lodash/get";
import { bindActionCreators } from "redux";
import { IconButton, Modal } from "common";

import { listFilters, listProjects } from "../actions";

const FormFilter = reduxForm({ form: "higienizarFilter" })(
  ({ years, status }) => (
    <form>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ flex: 1, marginRight: 15 }}>
          <label htmlFor="year">Ano: </label>
          <Field
            component="select"
            type="text"
            name="year"
            id="year"
            className="form-control input-sm"
          >
            <option value="">Selecione</option>
            {years.map(({ year }) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </Field>
        </div>
        <div style={{ flex: 1 }}>
          <label htmlFor="status">Situação: </label>
          <Field
            component="select"
            type="text"
            name="status"
            id="status"
            className="form-control input-sm"
          >
            <option value="">Selecione</option>
            {status.map(({ id, description }) => (
              <option key={id} value={id}>
                {description}
              </option>
            ))}
          </Field>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ flex: 1, marginRight: 15 }}>
          <label htmlFor="name">Nome: </label>
          <Field
            component="input"
            type="text"
            name="name"
            id="name"
            className="form-control input-sm"
          />
        </div>
        <div style={{ flex: 1 }}>
          <label htmlFor="classificacao_nfe">Classificação TSD: </label>
          <Field
            component="input"
            type="number"
            name="classificacao_nfe"
            id="classificacao_nfe"
            className="form-control input-sm"
          />
        </div>
      </div>
    </form>
  )
);

const Filtro = ({
  listFilters,
  loading,
  years,
  status,
  form,
  listProjects
}) => {
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    listFilters();
  }, []);

  return (
    <>
      <IconButton
        onClick={() => setOpen(true)}
        title="Abrir Filtro"
        icon="search"
      />
      <Modal
        onClose={() => setOpen(false)}
        open={open}
        title="Filtrar Projetos"
        height="70vh"
        maxHeight={150}
        loading={loading}
        footer={
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              setOpen(false);
              listProjects({ filter: form });
            }}
          >
            Filtrar
          </button>
        }
      >
        <FormFilter years={years} status={status} />
      </Modal>
    </>
  );
};

const mapStateFilter = state => ({
  form: get(state, "form.higienizarFilter.values"),
  loading: get(state, "higienizarProjetos.loading_filter"),
  years: get(state, "higienizarProjetos.years_filter", []),
  status: get(state, "higienizarProjetos.status_filter", [])
});

const mapActionsFilter = dispatch =>
  bindActionCreators({ listFilters, listProjects }, dispatch);

export default connect(
  mapStateFilter,
  mapActionsFilter
)(Filtro);
