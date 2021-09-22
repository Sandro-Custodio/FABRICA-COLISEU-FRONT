import React, { useState } from "react";
import ReactDropzone from "react-dropzone";
import axios from "axios";
import { toastr } from "react-redux-toastr";
import ReactTooltip from "react-tooltip";

const Dropzone = props => {
  const [response, setResponse] = useState("");

  const onDrop = files => {
    if(files[0]){
      let max = Math.floor(999999);
      let min = Math.ceil(100000);
      let random = Math.floor(Math.random() * (max - min + 1)) + min
      let newname = ""+random+"_"+files[0].name;

      const formData = new FormData();
      formData.append("Filedata", files[0]);
      formData.append("Newname", newname);
      props.setLoading(true);
      axios({
        method: "post",
        baseURL: process.env.REACT_APP_API_URL,
        url: "/ot_ll/upload_ll_element_and_address",
        data: formData,
        headers: { "content-type": "application/octet-stream" },
        json: true
      })
        .then(res => {
          setResponse(files[0].name);
          props.setLoading(false);
          props.handleUpload(res.data, newname);
        })
        .catch(error => {
          props.setLoading(false);
          toastr.error("Falha no upload.","")
          console.log(error);
        });
    }
  };

  return (
    <ReactDropzone
      accept={props.accept}
      onDrop={onDrop}
      onDropRejected={() => toastr.warning("Formato de arquivo rejeitado")}
    >
      {({ getRootProps, getInputProps }) => (
        <>
          <div
            className="dropzone"
            data-for="top_dark_float"
            data-tip="SOLTE O ARQUIVO AQUI."
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            {response}
            {!response && (props.accept)}
            <i className="fa fa-upload"/>
            <ReactTooltip
              id="top_dark_float"
              place="top"
              type="dark"
              effect="float"
            />
          </div>
        </>
      )}
    </ReactDropzone>
  );
};

Dropzone.defaultProps = {
  accept: "*",
  handleUpload: params => console.log(params),
  setLoading: params => console.log(params)
};

export default Dropzone;
