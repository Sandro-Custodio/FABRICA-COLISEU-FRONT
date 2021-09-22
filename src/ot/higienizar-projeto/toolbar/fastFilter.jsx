import React from "react";
import { connect } from "react-redux";

const FastFilter = ({ dispatch }) => {
  const [textValue, setTextValue] = React.useState("");
  return (
    <form
      onSubmit={evt => {
        evt.preventDefault();
        dispatch({ type: "FILTER_ROWS", payload: textValue });
      }}
      className="input-group input-group-sm"
    >
      <input
        className="form-control input-sm"
        type="text"
        placeholder="Filtrar por nome"
        value={textValue}
        onChange={evt => setTextValue(evt.target.value)}
      />
      <span className="input-group-btn">
        <button
          type="submit"
          className="btn btn-primary btn-flat"
          data-toggle="tooltip"
          title="Busca Rápida"
        >
          <i className="fa fa-fast-forward" aria-hidden="true" />
        </button>
      </span>
    </form>
  );
};

export default connect()(FastFilter);
