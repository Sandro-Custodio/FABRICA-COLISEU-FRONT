import React from "react";
import DateTimePicker from "react-widgets/lib/DateTimePicker";

const RenderDateTimePicker = ({ input, label, contentProps, ...others }) => (
  <div className={`form-group ${contentProps}`}>
    {label && <label htmlFor={label}>{label}</label>}
    <DateTimePicker
      {...input}
      format="DD/MM/YYYY"
      time={false}
      value={new Date()}
      className="form-control pull-right"
      containerClassName="form-control input-sm"
      {...others}
    />
  </div>
);

export default RenderDateTimePicker;
