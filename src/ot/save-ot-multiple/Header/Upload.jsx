import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Dropzone } from "common";
import { uploadFileOtMult } from "../actions";

const Upload = ({ uploadFileOtMult, user_id }) => {
  const handleDrop = async files => {
    const form = new FormData();
    const file = files[0];
    form.append("folder_name", "flex_upload");
    form.append("new_file_name", file.name);
    form.append("file_name", file.name);
    form.append("Filedata", file);
    form.append("user_id", user_id);
    uploadFileOtMult(form);
  };

  return (
    <Dropzone
      accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      onDrop={handleDrop}
    />
  );
};

const mapStateUpload = state => ({
  user_id: state.auth.user.id
});
const mapActionsUpload = dispatch =>
  bindActionCreators({ uploadFileOtMult, dispatch }, dispatch);

export default connect(
  mapStateUpload,
  mapActionsUpload
)(Upload);
