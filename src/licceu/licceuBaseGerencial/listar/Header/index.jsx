import React from "react";

import Filter from "./Filter";
import Editar from "./Editar";
import Criar from "./Criar";

export default () => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}
  >
    <div style={{ display: "flex", alignItems: "center" }}>
      <Filter />
      <Editar />
      <Criar />
    </div>
  </div>
);
