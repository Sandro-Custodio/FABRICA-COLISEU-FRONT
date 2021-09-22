import React from "react";
import { Field, reduxForm } from "redux-form";

const FastForm = ({ handleSubmit }) => (
  <form>
    <div className="input-group input-group-sm">
      <Field
        component="input"
        className="form-control input-sm"
        type="text"
        name="flag"
      />

      <span className="input-group-btn">
        <button
          type="submit"
          className="btn btn-primary btn-flat"
          data-toggle="tooltip"
          title="Busca Rápida"
          onClick={handleSubmit}
        >
          <i className="fa fa-fast-forward" aria-hidden="true" />
        </button>
      </span>
    </div>
  </form>
);

export default reduxForm({
  form: "flagODS"
})(FastForm);
