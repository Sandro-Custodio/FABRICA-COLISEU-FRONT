import React from "react";
// import { toastr } from "react-redux-toastr";

import { Container } from "common";
import { BackLink, Panel } from "../comps";
import Table from "./Table";
import Header from "./Header";

export default () => {
  return (
    <Container title="Carga AMBV" subtitle={<BackLink />}>
      <Panel header={<Header />}>
        <Table />
      </Panel>
    </Container>
  );
};
