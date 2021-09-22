import React from "react";

import { Container, BackLink, Panel, Table } from "common";
import { columns, columnWidths } from "./columns";
import Header from "./header";

export default () => {
  const [selection, onSelectionChange] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  return (
    <Container
      title="Circuito Fatura"
      subtitle={<BackLink title="Leasedlines" url="/leasedlines" />}
    >
      <Panel
        header={
          <Header
            setLoading={setLoading}
            setRows={setRows}
            rows={rows}
            columns={columns}
            selection={selection}
            onSelectionChange={onSelectionChange}
          />
        }
      >
        <Table
          columns={columns}
          rows={rows}
          columnWidths={columnWidths}
          selectionProps={{ selection, onSelectionChange }}
          enableDefaultFilter
          disablePagination
          loading={loading}
        />
      </Panel>
    </Container>
  );
};
