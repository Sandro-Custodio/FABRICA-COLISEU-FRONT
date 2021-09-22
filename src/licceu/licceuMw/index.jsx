import React from "react";

import { View } from "common";
import Listar from "./listar";
import Carga from "./carga";

const list = [
  { Comp: Listar, code: "DR_CON1A1B1" },
  { Comp: Carga, code: "DR_CON1A1A1" }
];

const MW = () => {
  return <View basePath="/mw" title="Microwaves" list={list} />;
};

export default MW;
