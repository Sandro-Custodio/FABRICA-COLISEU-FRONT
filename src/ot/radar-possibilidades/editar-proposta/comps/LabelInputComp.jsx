import React from "react";
import moment from "moment";
import get from "lodash/get";
import { LabelInput } from "common/form/components";
const formatDate = value => {
  // console.log("formatDate", value);
  if (value === "[n/a]") {
    return "[n/a]";
  }
  return value && moment(value).format("DD/MM/YYYY");
};

const LabelInputComp = ({ input, isData, cols, data, item, ...others }) => (
  <LabelInput
    value={isData ? formatDate(get(data, item)) : get(data, item)}
    {...others}
    {...input}
    cols={cols}
  />
);

LabelInputComp.defaultProps = {
  cols: "3",
  isData: false
};

export default LabelInputComp;
