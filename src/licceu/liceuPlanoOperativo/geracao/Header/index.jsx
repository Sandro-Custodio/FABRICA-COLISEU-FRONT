import React from "react";

import DownloadTemplate from "./DownloadTemplate";
import DownloadFile from "./DownloadFile";
import Filtro from "./Filtro";
import UploadFile from "./UploadFile";

const Header = () => (
  <div style={{ display: "flex", justifyContent: "space-between" }}>
    <div style={{ display: "flex" }}>
      <Filtro />
      <UploadFile />
      <DownloadFile />
    </div>
    <div>
      <DownloadTemplate />
    </div>
  </div>
);

export default Header;
