import React from "react";

import Upload from "./Upload";
import Template from "./Template";
import DownloadCritica from "./DownloadCritica";
import Carga from "./Carga";

const Header = () => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ display: "flex" }}>
        <Upload />
        <DownloadCritica />
      </div>
      <Template />
      <Carga />
    </div>
  );
};

export default Header;
