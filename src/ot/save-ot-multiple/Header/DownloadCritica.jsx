import React from "react";
import { connect } from "react-redux";

import { IconButton } from "common";

const DownloadCritica = ({ filePath }) => {
  if (!filePath) return null;
  return (
    <IconButton
      iconProps={{ style: { fontSize: 16, marginRight: 5 } }}
      icon="download"
      className="btn btn-danger"
      onClick={() =>
        window.open(`${process.env.REACT_APP_API_URL}/${filePath}`)
      }
    >
      Download OTs Criticadas
    </IconButton>
  );
};

export default connect(state => ({ filePath: state.OtMultiple.file_critica }))(
  DownloadCritica
);
