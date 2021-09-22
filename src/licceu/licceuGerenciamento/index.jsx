import React from "react";

import { View } from "common";
import BaseCadeia from "./base-cadeia";

const list = [{ Comp: BaseCadeia, code: "DR_CON1K1H1" }];

const Gerenciamento = () => {
  return <View basePath="/gerenciamento" title="Gerenciamento" list={list} />;
};

export default Gerenciamento;
