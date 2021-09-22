import React from "react";

import { Container, Panel } from "common";
import Header from "./Header";
import Table from "./Table";

const BaseCadeia = ({ BackLink }) => (
  <Container title="Base de Cadeias" subtitle={BackLink}>
    <Panel header={<Header />}>
      <Table />
    </Panel>
  </Container>
);

export default BaseCadeia;
