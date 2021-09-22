import React from "react";

import { Table } from "common";
import { Container, BackLink, Panel } from "../comps";
import Header from "./Header";
import columns from "./columns.json";
import { list } from "./actions";

export default () => {
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [selection, setSelection] = React.useState([]);

  const getRows = async () => {
    setLoading(true);
    const rows = await list();
    setSelection([]);
    setRows(rows);
    setLoading(false);
  };

  React.useEffect(() => {
    getRows();
  }, []);

  return (
    <Container title="Circuitos Pendentes" subtitle={<BackLink />}>
      <Panel
        header={
          <Header
            rows={rows}
            selection={selection}
            setLoading={setLoading}
            refreshTable={getRows}
          />
        }
      >
        <Table
          enableDefaultFilter
          disablePagination
          loading={loading}
          columns={columns}
          rows={rows}
          tableSelectionProps={{ showSelectAll: true }}
          selectionProps={{
            selection,
            onSelectionChange: setSelection
          }}
        />
      </Panel>
    </Container>
  );
};
