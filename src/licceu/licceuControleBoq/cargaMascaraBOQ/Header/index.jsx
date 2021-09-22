import React from "react";

import UploadFile from "./UploadFile";
import DownloadTemplate from "./DownloadTemplate";
import DownloadFile from "./DownloadFile";

export default ({ load, selection, rows }) => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ display: "flex" }}>
        <UploadFile loadTabela={load} />
      </div>
      <div style={{ display: "flex" }}>
        <DownloadTemplate />
        <DownloadFile
          disabled={selection.length !== 1}
          nomeArquivo={selection.length ? rows[selection].nomeArquivo : ""}
        />
      </div>
    </div>
  );
};
