import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Dropzone, IconButton } from "common";
import { validationFile } from "../actions";

const UploadFile = ({ validationFile }) => {
  const [arquivo, setArquivo] = React.useState({});

  const handleDrop = arquivo => {
    if (arquivo.length) {
      setArquivo(arquivo[0]);
    }
  };

  const handleSubmit = () => {
    const form = new FormData();
    form.append("arquivo", arquivo);
    validationFile(form);
  };

  return (
    <>
      <Dropzone
        onDrop={handleDrop}
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
      />

      <IconButton
        icon="upload"
        typeTooltip="success"
        className="btn btn-primary"
        iconProps={{ style: { fontSize: "16px", marginRight: "5px" } }}
        onClick={() => handleSubmit()}
      >
        Upload
      </IconButton>
    </>
  );
};

const mapStateUpload = state => ({
  rows: state.licceuControleBoq.rows
});

const mapActionUpload = dispatch =>
  bindActionCreators({ validationFile }, dispatch);

export default connect(
  mapStateUpload,
  mapActionUpload
)(UploadFile);
