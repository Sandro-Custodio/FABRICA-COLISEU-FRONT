import React from "react";

import Filter from "./Filter";
import Export from "./Export";
import Visualizar from "./Visualizar";
import Editar from "./Editar";
import FastForm from "./FastForm";
import AlterarStatus from "./AlterarStatus";
import BandaMedia from "./BandaMedia";

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
      <FastForm />
      <Editar />
      <Visualizar />
      <AlterarStatus />
      <BandaMedia />
    </div>
    <Export />
  </div>
);
