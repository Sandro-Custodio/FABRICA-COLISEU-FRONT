import React from "react";

import { Container, Panel } from "common";
import Header from "./Header";
import TableBaseGerencial from "./Table";

const listarBaseGerencial = ({ BackLink }) => (
  <Container title="Listar Base Gerencial" subtitle={BackLink}>
    <Panel header={<Header />}>
      <TableBaseGerencial />
    </Panel>
  </Container>
);

export default listarBaseGerencial;
