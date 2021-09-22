import React from "react";
import { Route, Switch } from "react-router-dom";

import BaseList from "./BaseList";
import ViewsBaseLicceu from "./licceuViewsBaseLicceu";

const submenus = {
  DR_CON1I1A1: { title: "Base de Enlaces", path: "/views-base/enlace" },
  DR_CON1I1B1: { title: "Base Anéis", path: "/views-base/aneis" },
  DR_CON1I1C1: { title: "Base de Circuitos", path: "/views-base/circuitos" },
  DR_CON1I1D1: {
    title: "Licenciamento Anatel",
    path: "/views-base/licenciamento-anatel"
  },
  DR_CON1I1E1: {
    title: "Carga Projeto Executivo",
    path: "/views-base/projeto-executivo"
  },
  DR_CON1I1F1: {
    title: "Chaves OT Tipo Plano Operativo",
    path: "/views-base/plano-operativo-ot"
  },
  DR_CON1I1G1: { title: "Projetos E2E", path: "/views-base/e2e" },
  DR_CON1I1H1: {
    title: "Banda Média por Enlace",
    path: "/views-base/banda-enlace"
  },
  DR_CON1I1I1: {
    title: "Plano Operativo Consolidado",
    path: "/views-base/plo-consolidado"
  },
  DR_CON1I1J1: {
    title: "Base Licenciamento Anatel",
    path: "/views-base/base-licenciamento-anatel"
  }
};

export default ({ list, ...others }) => (
  <Switch>
    <Route
      path="/views-base"
      render={props => <ViewsBaseLicceu list={list} {...props} />}
      exact
      {...others}
    />
    {list
      .filter(el => submenus[el.code])
      .map(({ code }) => {
        const { path, ...others } = submenus[code];
        return (
          <Route
            key={code}
            path={path}
            render={props => <BaseList code={code} {...props} {...others} />}
          />
        );
      })}
  </Switch>
);
