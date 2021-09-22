import React from "react";
import moment from "moment";

import { Container, Panel, BackLink, Table } from "common";
import Header from "./Header";
import columns from "./columns";
import { getFiles } from "./actions";

const convertDate = params => {
  return params === null ? "" : moment(params).format("DD/MM/YYYY");
};

export default () => {
  const [loading, setLoading] = React.useState(true);
  const [rows, setRows] = React.useState([]);
  const [selection, changeSelection] = React.useState([]);

  React.useEffect(() => {
    setLoading(true);
    const promise = getFiles();
    promise
      .then(({ rows }) => {
        const newRows = rows.map(n => ({
          ...n,
          dataUltimaGeracao: convertDate(n.dataUltimaGeracao)
        }));
        setRows(newRows);
      })
      .finally(() => setLoading(false));
  }, []);

  const onSelectionChange = selectionValue => {
    const newSelection = selectionValue[selectionValue.length - 1];
    changeSelection(newSelection >= 0 ? [newSelection] : []);
  };

  return (
    <Container
      title="Máscara Boq"
      subtitle={<BackLink title="Controle de Boq" url="/controle-boq" />}
    >
      <Panel
        header={<Header load={setLoading} selection={selection} rows={rows} />}
      >
        <Table
          disablePagination
          columns={columns}
          loading={loading}
          rows={rows}
          selectionProps={{
            selection,
            onSelectionChange
          }}
        />
      </Panel>
    </Container>
  );
};
