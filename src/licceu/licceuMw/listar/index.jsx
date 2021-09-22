import React from "react";

import { Container, Panel } from "common";
import Header from "./Header";
import Table from "./Table";

const ListarMW = ({ BackLink }) => (
  <Container title="Listar MW" subtitle={BackLink}>
    <Panel header={<Header />}>
      <Table />
    </Panel>
  </Container>
);

export default ListarMW;
