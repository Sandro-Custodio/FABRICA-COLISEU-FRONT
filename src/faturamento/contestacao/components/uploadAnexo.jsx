import React, { useState } from "react";
import ReactDropzone from "react-dropzone";
import axios from "axios";
import { toastr } from "react-redux-toastr";
import ReactTooltip from "react-tooltip";

const Dropzone = props => {

  const onDrop = files => {
    if(files[0]){
      // setLoading(true);
      let max = Math.floor(999999);
      let min = Math.ceil(100000);
      let random = Math.floor(Math.random() * (max - min + 1)) + min
      let newname = ""+random+"_"+files[0].name;

      const formData = new FormData();
      formData.append("Filedata", files[0]);
      formData.append("new_file_name", newname);
      formData.append("folder_name", "contestacao_resposta");

      axios({
        method: "post",
        baseURL: process.env.REACT_APP_API_URL,
        url: "/flex_upload/attachment",
        data: formData,
        headers: { "content-type": "application/octet-stream" },
        json: true
      })
        .then(res => {
          props.setUploadedFileName(newname)
          props.handleUpload(props.selectedRow,newname,props.user_id);
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  return (
    <ReactDropzone
      accept={props.accept}
      onDrop={onDrop}
      onDropRejected={() => toastr.warning("Arquivo Rejeitado")}
      // onDropAccepted={() => toastr.success("Sucesso","Upload de arquivo")}
    >
      {({ getRootProps, getInputProps }) => (
        <button
          // className="dropzone"
          className="btn btn-link btn-filtro btn-ml-0"
          data-for="top_dark_float"
          data-tip="Upload Resposta do Lote"
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          {/* {response} */}
          {/* {!response && (props.accept)} */}
          <i className="fa fa-cloud-upload text-info" />
          <ReactTooltip
            id="top_dark_float"
            place="top"
            type="dark"
            effect="float"
          />
        </button>
      )}
    </ReactDropzone>
  );
};

Dropzone.defaultProps = {
  accept: "*"
};

export default Dropzone;
