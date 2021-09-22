import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Acesso from "./acesso";
import Transporte from "./transporte";
import PlanoOperativo from "./liceuPlanoOperativo";
import Geracao from "./geracao";
import Carga from "./carga";
import Circuito from "./circuito";
import ProjetoExecutivo from "./projetoExecutivo";

const submenus = {
  DR_COX1G1: {
    Comp: Acesso,
    path: "/plano-operativo/acesso",
    code: "DR_COX1G1",
    title: "Listar Plano Operativo Acesso"
  },
  DR_COX1H1: { Comp: Transporte, path: "/plano-operativo/transporte" },
  DR_COX1M1: { Comp: Geracao, path: "/plano-operativo/geracao" },
  DR_COX1A1: {
    Comp: Carga,
    path: "/plano-operativo/carga-acesso",
    code: "DR_COX1A1",
    title: "Carga de Plano Operativo Acesso"
  },
  DR_COX1B1: {
    Comp: Carga,
    path: "/plano-operativo/carga-transporte",
    code: "DR_COX1B1",
    title: "Carga de Plano Operativo Transporte"
  },
  DR_CON1O1: { Comp: Circuito, path: "/plano-operativo/circuito-pendente" },
  DR_COX1F1: {
    Comp: Acesso,
    path: "/plano-operativo/listar",
    code: "DR_COX1F1",
    title: "Listar Plano Operativo"
  },
  DR_COX1E1: {
    Comp: ProjetoExecutivo,
    path: "/plano-operativo/projeto-executivo"
  }
};

export default ({ list, ...others }) => (
  <Switch>
    <Route
      path="/plano-operativo"
      render={props => <PlanoOperativo list={list} {...props} />}
      exact
      {...others}
    />
    <Route
      exact
      path="/projeto-executivo/listar"
      render={() => <p>Funfoooou</p>}
    />
    {list.map(({ code }) => {
      const { path, Comp, ...others } = submenus[code];
      return (
        <Route
          key={code}
          path={path}
          render={props => <Comp {...others} {...props} />}
        />
      );
    })}
    <Redirect from="*" to="/plano-operativo" />
  </Switch>
);
