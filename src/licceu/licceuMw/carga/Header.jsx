import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { IconButton, Dropzone } from "common";
import { uploadFile } from "./actions";

const DownloadModelo = () => (
  <IconButton
    icon="download"
    className="btn-primary"
    onClick={() =>
      window.open(`${process.env.REACT_APP_API_URL}/modelo/modeloMw`)
    }
  >
    Download do Arquivo Modelo
  </IconButton>
);

const mapActionUpload = dispatch =>
  bindActionCreators({ uploadFile }, dispatch);

const mapStateUpload = state => ({ user_id: state.auth.user.id });

const UploadCarga = connect(
  mapStateUpload,
  mapActionUpload
)(({ uploadFile, user_id }) => (
  <Dropzone
    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
    onDrop={([file]) => uploadFile({ user_id, file })}
  />
));

export default () => (
  <div style={{ display: "flex", justifyContent: "space-between" }}>
    <UploadCarga />
    <DownloadModelo />
  </div>
);
