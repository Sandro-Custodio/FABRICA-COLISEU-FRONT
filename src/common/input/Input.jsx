import React from "react";

const Input = ({
  input,
  type,
  text,
  label,
  className,
  size,
  contentProps,
  ...others
}) => {
  return (
    <div className={`form-group ${contentProps}`}>
      {(text || label) && (
        <label htmlFor={text || label}>{text || label}</label>
      )}
      <input
        type={type}
        {...input}
        id={text || label}
        className={`form-control input-${size}`}
        {...others}
      />
    </div>
  );
};

Input.defaultProps = {
  size: "sm",
  contentProps: ""
};

export default Input;
