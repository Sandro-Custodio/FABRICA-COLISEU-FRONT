import React from "react";

import { Container, BackLink, Panel } from "../comps";
import Header from "./Header";
import Table from "./Table";

const ProjetoExecutivo = () => {
  return (
    <Container title="Listar Projeto Executivo" subtitle={<BackLink />}>
      <Panel header={<Header />}>
        <Table />
      </Panel>
    </Container>
  );
};

export default ProjetoExecutivo;
