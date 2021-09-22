import React from "react";

const Select = ({
  input,
  data,
  label,
  textKey,
  valueKey,
  disabled,
  contentProps,
  size,
  defaultSelect,
  selected,
  loading,
  ...others
}) => {
  return (
    <div className={`form-group ${contentProps}`}>
      {label && <label htmlFor={label}>{label}</label>}
      <select
        {...input}
        id={label}
        className={`form-control input-${size}`}
        style={{
          opacity: loading ? "0.5" : 1,
          cursor: loading ? "wait" : "default"
        }}
        disabled={disabled || loading}
        {...others}
      >
        {defaultSelect && <option value="">Selecione</option>}
        {data.map((el, idx) => (
          <option key={idx} value={el[valueKey]}>
            {el[textKey]}
          </option>
        ))}
      </select>
      {loading && (
        <div className="overlay">
          <i
            className="fa fa-refresh fa-spin"
            style={{ top: "unset", bottom: "11%", fontSize: 20 }}
          ></i>
        </div>
      )}
    </div>
  );
};

Select.defaultProps = {
  disabled: false,
  contentProps: "",
  size: "sm",
  defaultSelect: true,
  loading: false
};

export default Select;
