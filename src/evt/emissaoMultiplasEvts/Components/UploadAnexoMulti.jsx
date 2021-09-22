import React from "react";
import axios from "axios";
import Dropzone from "react-dropzone";
import { toastr } from "react-redux-toastr";

const UploadAnexo = props => {
  const { vendor_id, checked, selected, handleChange } = props;
  const onDrop = files => {
    const formData = new FormData();

    formData.append("Filedata", files[0]);
    formData.append("new_file_name", files[0].name);
    formData.append("folder_name", "pms/evidencias");

    const date = new Date().getTime();

    const file = {
      type: files[0].name.split(".", 2)[1],
      repository_name: `UPLOAD${date}_${files[0].name}`,
      size: files[0].size,
      original_name: files[0].name,
      file_size: files[0].size,
      file_type: files[0].name.split(".", 2)[1],
      id: 0
    };

    axios({
      method: "post",
      baseURL: process.env.REACT_APP_API_URL,
      url: "/flex_upload/attachment",
      data: formData,
      headers: { "content-type": "application/octet-stream" },
      json: true
    })
      .then(res => {
        if (res.status === 200) {
          handleChange(vendor_id, "attach", file, checked);
          toastr.info("Importação realizada com sucesso!");
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <Dropzone onDrop={onDrop}>
      {({ getRootProps, getInputProps }) => (
        <div
          className="dropzone"
          data-for="top_dark_float"
          data-tip="SOLTE O ARQUIVO AQUI."
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          {selected[vendor_id]?.attach?.original_name || ""}
          <i className="fa fa-upload" />
        </div>
      )}
    </Dropzone>
  );
};

export default UploadAnexo;
