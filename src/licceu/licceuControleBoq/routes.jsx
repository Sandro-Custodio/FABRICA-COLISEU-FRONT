import React from "react";
import { Route, Switch } from "react-router-dom";

import ControleBoq from "./licceuControleBoq";
import CargaBoq from "./cargaAMBV";
import CargaMascaraBoq from "./cargaMascaraBOQ";

const submenus = {
  DR_CON1P1A1: { component: CargaBoq, path: "/controle-boq/carga-boq" },
  DR_CON1P1B1: {
    component: CargaMascaraBoq,
    path: "/controle-boq/carga-mascara-boq"
  }
};

export default ({ list, ...others }) => (
  <Switch>
    <Route
      path="/controle-boq"
      render={props => <ControleBoq list={list} {...props} />}
      exact
      {...others}
    />
    {list.map(({ code }) => (
      <Route key={code} {...submenus[code]} />
    ))}
  </Switch>
);
