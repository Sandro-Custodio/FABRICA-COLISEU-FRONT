import React from "react";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import liceuPlanoOperativo from "licceu/liceuPlanoOperativo";
import ViewsBaseLicceu from "licceu/licceuViewsBaseLicceu";
import LicceuMw from "licceu/licceuMw";
import LicceuBaseGerencial from "licceu/licceuBaseGerencial";
import licceuControleBoq from "licceu/licceuControleBoq";
import TxtProfile from "licceu/licceuTxtProfile";
import Gerenciamento from 'licceu/licceuGerenciamento'
import LicceuDashboard from "../licceu/licceuDashboard";
import OTSubMenu from "../ot/sub-menu";
import LicceuOTReport from "../licceu/liccceuOTReport";
import OTList from "../ot/list/list";
import Views from "../view/show-view";
import Circuitos from "../licceu/licceuCircuitos/licceuCircuitos";
import Hub from "../licceu/licceuHub/licceuHub";
import Fo from "../licceu/licceuFO/licceuFO";
import LicceuListarHub from "../licceu/licceuHub/licceuListarHub/licceuListarHub";
import LicceuListarCircuito from "../licceu/licceuCircuitos/licceuListarCircuito/licceuListarCircuito";
import PowerBi from "../licceu/licceuComponents/PowerBi";
import LicceuListarFO from "../licceu/licceuFO/licceuListarFO/licceuListarFO";
import licceuCargaHub from "../licceu/licceuHub/licceuCargaHub/licceuCargaHub";

const LicceuRoutes = () => {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={LicceuDashboard} />
        <Route path="/ordens-transmissao" component={OTSubMenu} />
        <Route path="/ots/list" component={OTList} />
        <Route path="/ot-report" component={LicceuOTReport} />
        <Route path="/powerbi" component={PowerBi} />
        <Route path="/views" component={Views} />
        <Route path="/circuitos" component={Circuitos} />
        <Route
          path="/circuito/listarCircuitos"
          component={LicceuListarCircuito}
        />
        <Route path="/mw" component={LicceuMw} />
        <Route path="/basegerencial" component={LicceuBaseGerencial} />
        <Route path="/hubs" component={Hub} />
        <Route path="/hub/listarHub" component={LicceuListarHub} />
        <Route path="/hub/cargaHub" component={licceuCargaHub} />
        <Route path="/fo" component={Fo} />
        <Route path="/fos/listarFOs" component={LicceuListarFO} />
        <Route path="/plano-operativo" component={liceuPlanoOperativo} />
        <Route path="/views-base" component={ViewsBaseLicceu} />
        <Route path="/txtprofile" component={TxtProfile} />
        <Route path="/controle-boq" component={licceuControleBoq} />
        <Route path="/gerenciamento" component={Gerenciamento} />
        <Redirect from="*" to="/" />
      </Switch>
    </HashRouter>
  );
};

export default LicceuRoutes;
