import React from "react";

import { View } from "common";
import Listar from "./listar";
// import Carga from "./carga";

const list = [
  { Comp: Listar, code: "DR_CON1N1B1" }
  // { Comp: Carga, code: "DR_CON1N1A1" }
];

const BaseGerencial = () => {
  return <View basePath="/basegerencial" title="Base Gerencial" list={list} />;
};

export default BaseGerencial;
