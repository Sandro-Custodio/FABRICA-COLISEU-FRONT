import React from "react";

import Filtro from "./Filtro";
import Download from "./Download";

const Header = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      <Filtro />
      <Download />
    </div>
  );
};

export default Header;
