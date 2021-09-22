import React, { useState } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
import { toastr } from "react-redux-toastr";

export default ({}) => {
  const [response, setResponse] = useState("");
  const onDrop = files => {
    // setLoading(true);

    console.log("ENTROU");
    const formData = new FormData();

    formData.append("Filedata", files[0]);
    formData.append("new_file_name", files[0].name);
    formData.append("folder_name", "pms/evidencias");

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
          toastr.info("Importação realizada com sucesso!");
        }
        setResponse(files[0].name);
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
          {response}
          <i className="fa fa-upload" />
        </div>
      )}
    </Dropzone>
  );
};
