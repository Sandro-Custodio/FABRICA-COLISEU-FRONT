import React from "react";
import { connect } from "react-redux";

import Header from "./Header";
import Table from "./Table";

import { Container, BackLink, Panel } from "../comps";

export default connect()(({ dispatch }) => {
  React.useEffect(() => () => dispatch({ type: "RESET_GERACAO_PLO" }), []);

  return (
    <Container title="Geração de Plano Operativo" subtitle={<BackLink />}>
      <Panel header={<Header />}>
        <Table />
      </Panel>
    </Container>
  );
});
