import React from "react";
import { connect } from "react-redux";

import { Dropzone } from "common";
import { uploadFile } from "../actions";

const Upload = ({ uploadFile }) => {
  return (
    <Dropzone
      onDrop={files => uploadFile(files[0])}
      accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
    />
  );
};

export default connect(
  null,
  { uploadFile }
)(Upload);
