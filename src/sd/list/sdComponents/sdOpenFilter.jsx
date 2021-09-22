import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { clearFilter } from "../actions";

let SDOpenFilter = ({
  activeForm,
  handleSubmit,
  clearFilter,
  listarSD: { odStatus, sdStatus, vendors }
}) => {
  return (
    <main className="fade-in fade-out">
      <form className="form" onSubmit={handleSubmit}>
        <div className="box box-primary">
          <div className="box-body">
            <label htmlFor="od_code">Código OD</label>
            <Field
              className="form-control input-sm"
              type="text"
              name="od_code"
              id="od_code"
              component="input"
            />

            <label htmlFor="sd_code">Código SD</label>
            <Field
              className="form-control input-sm"
              type="text"
              name="sd_code"
              id="sd_code"
              component="input"
            />

            <label htmlFor="vendor">Provedor</label>
            <Field
              component="select"
              className="form-control input-sm"
              name="vendor"
            >
              <option value="" hidden>
                Selecione
              </option>
              {vendors.map(data => (
                <option value={data.id} key={data.id}>
                  {data.short_name}
                </option>
              ))}
            </Field>

            <label htmlFor="odStatus">OD Status</label>
            <Field
              component="select"
              className="form-control input-sm"
              name="odStatus"
            >
              <option value="" hidden>
                Selecione
              </option>
              {odStatus.map(data => (
                <option value={data.id} key={data.id}>
                  {data.description}
                </option>
              ))}
            </Field>

            <label htmlFor="sdStatus">SD Status</label>
            <Field
              component="select"
              className="form-control input-sm"
              name="sdStatus"
            >
              <option value="" hidden>
                Selecione
              </option>
              {sdStatus.map(data => (
                <option value={data.id} key={data.id}>
                  {data.description}
                </option>
              ))}
            </Field>
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!!activeForm && !activeForm.values}
        >
          <i className="fa fa-search" style={{ margin: "0 10px 0 0" }} />
          Filtrar
        </button>
        <button type="button" className="btn btn-primary" onClick={clearFilter}>
          <i className="fa fa-bitbucket" style={{ margin: "0 10px 0 0" }} />
          Limpar
        </button>
      </form>
    </main>
  );
};

const mapStateToProps = state => ({
  listarSD: state.listarSD,
  activeForm: state.form.sdOpenFilter
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ clearFilter }, dispatch);

SDOpenFilter = reduxForm({ form: "sdOpenFilter" })(SDOpenFilter);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SDOpenFilter);
