import React from "react";
import ReactTooltip from "react-tooltip";

const IconButton = ({
  iconProps,
  icon,
  className,
  style,
  color,
  title,
  typeTooltip,
  children,
  ...others
}) => {
  const id = `iconButton-licceu-${Math.random()}-${Math.random()}`;
  return (
    <>
      <button
        type="button"
        id={id}
        className={`btn fade-in fade-out ${className || ""} ${
          children ? "" : "btn-link "
        }`}
        data-tip={title}
        data-for={id}
        {...others}
      >
        {icon && (
          <i
            {...iconProps}
            style={{ color, marginRight: 5, ...iconProps.style }}
            className={`fa fa-${icon} menu-table__icon ${iconProps.className ||
              ""}`}
          />
        )}
        {children}
      </button>
      <ReactTooltip id={id} place="bottom" type={typeTooltip} effect="float" />
    </>
  );
};

IconButton.defaultProps = {
  iconProps: {},
  typeTooltip: "dark",
  color: "inherit"
};

export default IconButton;
