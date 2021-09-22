import DropdownList from "react-widgets/lib/DropdownList";
import React from "react";

const FastFormDropdown = ({ handleSubmit, inputProps, filterName, data }) => {
  const [text, setText] = React.useState("");
  const paginator = { currentPage: 1, pageSize: 100 };
  const params = { [filterName]: text };
  return (
    <div style={{ display: "flex", width: "250px" }}>
      <DropdownList
        style={{ width: "100%", whiteSpace: "nowrap" }}
        data={data.map(contract => contract.contratoProvedor)}
        onChange={value => {
          setText(value);
        }}
        {...inputProps}
      />

      <button
        type="button"
        className="btn-primary btn-flat"
        data-toggle="tooltip"
        title="Busca Rápida"
        onClick={() => handleSubmit(params, paginator)}
      >
        <i className="fa fa-fast-forward" aria-hidden="true" />
      </button>
    </div>
  );
};

export default FastFormDropdown;
