import React from "react";
import { Label } from "common/form/components";
import { Field } from "redux-form";
import moment from "moment";
import { LabelInput } from "common/form/components";
import get from "lodash/get";

export const Row = ({ children }) => (
  <div
    className="row"
    style={{ display: "flex", justifyContent: "space-between" }}
  >
    {children}
  </div>
);

const formatDate = value => {
  return value && moment(value).format("DD/MM/YYYY");
};

export const LabelInputComp = ({ isData, cols, data, item, ...others }) => {
  return (
    <LabelInput
      placeholder={isData ? formatDate(data) : get(data, item, "[n/a]")}
      value={data}
      readOnly
      {...others}
      cols={cols}
    />
  );
};

LabelInputComp.defaultProps = {
  cols: "3",
  isData: false
};

export const FieldComp = ({ col, text, ...others }) => {
  return (
    <div className={`col-sm-${col}`}>
      {text && <label htmlFor={text}>{text}</label>}
      <Field
        className="form-control input-sm"
        type="text"
        component="input"
        {...others}
      />
    </div>
  );
};

FieldComp.defaultProps = {
  col: 2
};

export const LabelComp = ({ text, col }) => (
  <div className={`col-sm-${col}`}>
    <Label text={text} />
  </div>
);
LabelComp.defaultProps = { col: 6 };
