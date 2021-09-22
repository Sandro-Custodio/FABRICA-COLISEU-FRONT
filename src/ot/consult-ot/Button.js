import React from "react";

const Button = ({ title, description, icon, ...others }) => {
  return (
    <button
      data-for="top_dark_float"
      data-tip={title}
      type="button"
      className="btn-lg btn-link pull-left"
      data-toggle="modal"
      data-target={`#${description}`}
      {...others}
    >
      <i className={`fa fa-${icon}`} data-toggle="tooltip" />
    </button>
  );
};

export default Button;
