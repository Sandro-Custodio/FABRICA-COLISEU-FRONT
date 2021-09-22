import React from "react";

import DownloadModel from "./DownloadModel";
import Upload from "./Upload";
import RefreshTable from "./RefreshTable";
import DownloadFile from "./DownloadFile";

const Header = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <Upload />
        <RefreshTable />
        <DownloadFile />
      </div>
      <DownloadModel />
    </div>
  );
};

export default Header;
