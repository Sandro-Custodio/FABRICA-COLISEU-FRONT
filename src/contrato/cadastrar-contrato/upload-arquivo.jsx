import React, { useState } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
import { toastr } from "react-redux-toastr";

export default ({handleResponse}) => {
  const [response, setResponse] = useState("");
  const onDrop = files => {

    let max = Math.floor(999999);
    let min = Math.ceil(100000);
    let random = Math.floor(Math.random() * (max - min + 1)) + min
    let newname = ""+random+"_"+files[0].name;

    const formData = new FormData();
    formData.append("Filedata", files[0]);
    formData.append("new_file_name", newname);
    formData.append("folder_name", "anexos_contratos");

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
          handleResponse(newname);
        }
        setResponse(newname);
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
          {/* {response} */}
          {"Upload "}
          <i className="fa fa-upload" />
        </div>
      )}
    </Dropzone>
  );
};
