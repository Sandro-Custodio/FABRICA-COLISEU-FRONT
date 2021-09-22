import React from "react";
import { Plugin, Template } from "@devexpress/dx-react-core";

import AlterarStatus from "./licceuAlteracaoMassivaStatus";
import EditarCircuito from "./licceuEditarCircuito";
import LicceuFilterCircuit from "./licceuFilterCircuit";
import LiccceuHistoryCircuit from "./liccceuHistoryCircuit";

export default ({ children, mwSelected, selection, rowsSelecteds }) => (
  <Plugin name="ToolbarColumn">
    <Template name="toolbarContent">
      <LicceuFilterCircuit />
      {children}
      {/* {console.log("rowsSelecteds", rowsSelecteds.length)}
      {console.log("selection", selection)}
      {console.log("mwSelected", mwSelected)} */}

      <div className="btn-group">
        {rowsSelecteds.length === 1 && (
          <LiccceuHistoryCircuit row={mwSelected} />
        )}
        {rowsSelecteds.length === 1 && <EditarCircuito row={mwSelected} />}
        {rowsSelecteds.length >= 1 && <AlterarStatus rows={rowsSelecteds} />}
      </div>

      <span style={{ marginLeft: "14%" }}>
        {!mwSelected || mwSelected.nome}
      </span>
    </Template>
  </Plugin>
);
