import React from "react";
import get from "lodash/get";
import { LabelInput } from "common/form/components";
import moment from "moment";

export default ({ isData, cols, data, item, ...others }) => {
  // console.log("formatDate", data);
  const formatDate = value => {
    if (value === "[n/a]") {
      return "[n/a]";
    }
    return value && moment(value).format("DD/MM/YYYY");
  };
  // console.log("LabelInputCompRead", { isData, cols, data, item, ...others });
  return (
    <LabelInput
      value={
        isData ? formatDate(get(data, item, "[n/a]")) : get(data, item, "[n/a]")
      }
      readOnly
      {...others}
      cols={cols}
    />
  );
};
