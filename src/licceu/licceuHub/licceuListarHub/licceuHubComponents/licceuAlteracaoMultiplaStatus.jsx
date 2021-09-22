import React from "react";
import { Field, reduxForm } from "redux-form";
import { LicceuLabel } from "../../../licceuComponents/ui";
import { status } from "./const";

// eslint-disable-next-line import/no-mutable-exports
let licceuAlteracaoMultiplaStatus = ({ handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <LicceuLabel htmlFor="status" text="Status" />
    <div className="input-group input-group-sm">
      <Field component="select" className="form-control input-sm" name="status">
        <option value="" hidden>
          Selecione
        </option>
        {status.map(data => (
          <option value={data} key={data}>
            {data}
          </option>
        ))}
      </Field>

      <span className="input-group-btn">
        <button
          type="submit"
          className="btn btn-success btn-flat"
          data-toggle="tooltip"
          title="Alterar Status"
        >
          <i className="fa fa-refresh" aria-hidden="true" />
        </button>
      </span>
    </div>
  </form>
);

licceuAlteracaoMultiplaStatus = reduxForm({
  form: "licceuHubAlteracaoMultiplaStatus"
})(licceuAlteracaoMultiplaStatus);

export default licceuAlteracaoMultiplaStatus;
