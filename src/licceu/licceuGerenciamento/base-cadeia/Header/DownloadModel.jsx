import React from "react";

import { IconButton } from "common";

const baseUrl = process.env.REACT_APP_API_URL_JAVA;

const DownloadModel = () => {
  return (
    <IconButton
      icon="download"
      className="btn btn-primary"
      onClick={() =>
        window.open(
          `${baseUrl}/base-cadeia/download-modelo-importacao`,
          "_blank"
        )
      }
    >
      Download Modelo
    </IconButton>
  );
};

export default DownloadModel;
