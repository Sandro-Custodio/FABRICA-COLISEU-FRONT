import React from "react";

import { View } from "common";
import Listar from "./listar";

const list = [{ Comp: Listar, code: "DR_CON1E1B1" }];

const MW = () => {
  return <View basePath="/txtprofile" title="Txt Profile" list={list} />;
};

export default MW;
