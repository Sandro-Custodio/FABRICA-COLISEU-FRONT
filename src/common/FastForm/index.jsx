import React from "react";

const FastForm = ({
  auth = undefined,
  handleSubmit,
  inputProps,
  filter,
  filterName
}) => {
  const [text, setText] = React.useState("");
  const filters = { [filter]: text };
  const paginator = { currentPage: 1, pageSize: 100 };
  const filtersObj = { [filterName]: filters, paginator };
  return (
    <div className="input-group input-group-sm">
      <input
        className="form-control input-sm"
        type="text"
        value={text}
        onChange={evt => setText(evt.target.value)}
        {...inputProps}
      />
      <span className="input-group-btn">
        <button
          type="submit"
          className="btn btn-primary btn-flat"
          data-toggle="tooltip"
          title="Busca Rápida"
          onClick={() => handleSubmit(auth, filtersObj)}
        >
          <i className="fa fa-fast-forward" aria-hidden="true" />
        </button>
      </span>
    </div>
  );
};
export default FastForm;
