import React from "react";
import { connect } from "react-redux";

import { Container, Panel, Table } from "common";
import Header from "./Header";
import Details from "./Details";

const columns = [
  { name: "critica", title: "Crítica" },
  { name: "qtd", title: "Quantidade" },
  { name: "details", title: " " }
];

const CargaMW = ({ BackLink, rows, loading }) => {
  return (
    <Container title="Carga MW" subtitle={BackLink}>
      <Panel header={<Header />}>
        <Table
          enableDefaultFilter
          disablePagination
          columns={columns}
          rows={rows}
          loading={loading}
          actions={[{ columnName: "details", component: Details }]}
        />
      </Panel>
    </Container>
  );
};

export default connect(state => ({
  rows: state.cargaMW.rows,
  loading: state.cargaMW.loading
}))(CargaMW);
