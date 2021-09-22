import React from "react";

import { Container, BackLink, Panel } from "common";
import TableGrid from "./Table";
import Header from "./Header";

const MultipleOT = () => {
  return (
    <Container
      title="Múltiplas OTs"
      subtitle={
        <BackLink title="Ordens de Transmissão" url="/ordens-transmissao" />
      }
    >
      <Panel header={<Header />}>
        <TableGrid />
      </Panel>
    </Container>
  );
};

export default MultipleOT;
