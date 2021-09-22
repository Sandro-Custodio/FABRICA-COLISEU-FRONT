import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import get from "lodash/get";

import { LicceuLabel } from "licceu/licceuComponents/ui";

const Filter = ({ list, onSubmit, formValues }) => (
  <form
    className="form-inline"
    onSubmit={evt => {
      evt.preventDefault();
      onSubmit(formValues);
    }}
  >
    {list.map(({ label, key, field }) => (
      <div className="form-group" key={key} style={{ margin: 5 }}>
        {label && <LicceuLabel htmlFor={key} text={label} />}
        {field && (
          <Field
            name={key}
            {...field}
            className={`${field.className || ""} form-control`}
          />
        )}
      </div>
    ))}
    <button type="submit" className="btn btn-primary">
      <i className="fa fa-search" aria-hidden="true" /> Buscar
    </button>
  </form>
);

Filter.defaultProps = {
  list: [],
  onSubmit: form => console.log("onSubmit", form)
};

export default reduxForm({ form: "filterForm" })(
  connect(state => ({ formValues: get(state, "form.filterForm.values", {}) }))(
    Filter
  )
);
