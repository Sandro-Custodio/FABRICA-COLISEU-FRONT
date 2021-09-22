import React from "react";
import Filter from "./Filter";
import Download from "./Download";

export default ({ code }) => {
  return (
    <div
      style={{ display: "flex", justifyContent: "space-between", height: 45 }}
    >
      <Filter code={code} />
      <Download />
    </div>
  );
};
