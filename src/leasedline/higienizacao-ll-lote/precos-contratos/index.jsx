import React from "react";
import { Table } from "common";
import { Container, Panel } from "../../comps";
import { columns, columnWidths } from "./columns.json";
import Header from "./header";

export default () => {
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  return (
    <Container title="Atualização de Preços e Contratos">
      <Panel
        header={
          <Header setRows={setRows} rows={rows} setLoading={setLoading}  columns={columns} />
        }
      >
        <Table
          columns={columns}
          columnWidths={columnWidths}
          rows={rows}
          loading={loading}
          disablePagination={true}
        />
      </Panel>
    </Container>
  );
};
