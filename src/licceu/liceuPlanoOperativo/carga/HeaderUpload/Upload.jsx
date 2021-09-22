import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { toastr } from "react-redux-toastr";

import { IconButton } from "common";
import { sendFile } from "../actions";

const UploadFile = ({ sendFile, rows }) => {
  if (!rows.length) return null;
  const handleUpload = () => {
    toastr.confirm("Você deseja enviar os arquivos?", {
      onOk: () => sendFile()
    });
  };

  return (
    <IconButton onClick={handleUpload} className="btn-primary" icon="upload">
      Upload
    </IconButton>
  );
};

const mapActionUpload = dispatch => bindActionCreators({ sendFile }, dispatch);
const mapStateUpload = state => ({ rows: state.licceuCargaPLO.rows_upload });

export default connect(
  mapStateUpload,
  mapActionUpload
)(UploadFile);
