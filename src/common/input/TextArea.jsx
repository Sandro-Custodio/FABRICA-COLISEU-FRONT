import React from "react";

const Input = ({ input, type, text, containerProps, ...others }) => {
  return (
    <div
      {...containerProps}
      className={`form-group ${containerProps.className || ""}`}
    >
      {text && <label htmlFor={text}>{text}</label>}
      <textarea
        className="form-control"
        type={type}
        {...input}
        id={text}
        {...others}
      />
    </div>
  );
};

Input.defaultProps = {
  containerProps: {}
};

export default Input;
