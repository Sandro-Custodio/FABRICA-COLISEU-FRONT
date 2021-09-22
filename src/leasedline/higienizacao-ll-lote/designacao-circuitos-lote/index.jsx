import React from "react";
import { Table } from "common";
import { Container, Panel } from "../../comps";
import { columns } from "./columns.json";
import Header from "./header";

export default () => {
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  return (
    <Container title="Designação de Circuitos em Lote">
      <Panel
        header={
          <Header
            setRows={setRows}
            rows={rows}
            setLoading={setLoading}
            columns={columns}
          />
        }
      >
        <Table columns={columns} rows={rows} loading={loading} />
      </Panel>
    </Container>
  );
};
