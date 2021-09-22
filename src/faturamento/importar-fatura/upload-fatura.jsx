import React, { useState } from "react";
import ReactDropzone from "react-dropzone";
import axios from "axios";
import { toastr } from "react-redux-toastr";
import ReactTooltip from "react-tooltip";

const Dropzone = props => {
  const [response, setResponse] = useState("");

  const onDrop = files => {
    if(files[0]){
      // setLoading(true);
      let max = Math.floor(999999);
      let min = Math.ceil(100000);
      let random = Math.floor(Math.random() * (max - min + 1)) + min
      let newname = ""+random+"_"+files[0].name;

      const formData = new FormData();
      formData.append("Filedata", files[0]);
      formData.append("Newname", newname);
      // formData.append("folder_name", "pms/evidencias");

      axios({
        method: "post",
        baseURL: process.env.REACT_APP_API_URL,
        url: "/upload/attachment",
        data: formData,
        headers: { "content-type": "application/octet-stream" },
        json: true
      })
        .then(res => {
          // if (res.status === 200) {
          //   toastr.info("Importação realizada com sucesso!");
          // }
          setResponse(files[0].name);
          props.handleUpload(newname);
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
      onDropAccepted={() => toastr.success("Sucesso","Upload de arquivo")}
    >
      {({ getRootProps, getInputProps }) => (
        <div
          className="dropzone"
          data-for="top_dark_float"
          data-tip="SOLTE O ARQUIVO AQUI."
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          {response}
          {!response && (props.accept)}
          <i className="fa fa-upload" />
          <ReactTooltip
            id="top_dark_float"
            place="top"
            type="dark"
            effect="float"
          />
        </div>
      )}
    </ReactDropzone>
  );
};

Dropzone.defaultProps = {
  accept: "*"
};

export default Dropzone;
