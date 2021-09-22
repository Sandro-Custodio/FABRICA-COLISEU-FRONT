import React from "react";
import Upload from "./Upload";
import Remove from "./Remove";
import AddFile from "./AddFile";

export default ({ code }) => {
  return (
    <div
      style={{ display: "flex", justifyContent: "space-between", height: 45 }}
    >
      <div style={{ display: "flex" }}>
        <AddFile code={code} />
        <Remove />
      </div>
      <Upload />
    </div>
  );
};
