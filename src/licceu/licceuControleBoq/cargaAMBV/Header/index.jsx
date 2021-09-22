import React from "react";

import DownloadTemplate from "./DownloadTemplate";
// import DownloadFile from "./DownloadFile";
import Filtro from "./Filtro";
import ExportBoqExcel from "../../comps/export";
import UploadFile from "./UploadFile";
import ValidarBoq from "./ValidarBoq";

const Header = () => (
  <div style={{ display: "flex", justifyContent: "space-between" }}>
    <div style={{ display: "flex" }}>
      <Filtro />
      <UploadFile />
      <ValidarBoq />
    </div>
    <div style={{ display: "flex" }}>
      <DownloadTemplate />
      <ExportBoqExcel />
    </div>
  </div>
);

export default Header;
