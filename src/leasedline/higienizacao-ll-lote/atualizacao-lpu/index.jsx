import React from "react";
import { Table } from "common";
import { Container, Panel } from "../../comps";
import {
  columns,
  columnsAssociacao,
  columnsReceita,
  columnsReajuste
} from "./columns.json";
import Header from "./header";

export default () => {
  const [rows, setRows] = React.useState([]);
  const [operacao, setOperacao] = React.useState("0");
  const [alterColumns, setColumns] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => handleColumns(), []);

  const handleColumns = params => {
    switch (params && params.toString()) {
      case "1":
        return setColumns(columnsAssociacao);
      case "2":
        return setColumns(columnsReceita);
      case "3":
        return setColumns(columnsReajuste);
      default:
        return setColumns(columns);
    }
  };

  return (
    <Container title="Atualização de LPU">
      <Panel
        header={
          <Header
            setRows={setRows}
            handleColumns={handleColumns}
            rows={rows}
            setLoading={setLoading}
            setOperacao={setOperacao}
            operacao={operacao}
          />
        }
      >
        <Table columns={alterColumns} rows={rows} loading={loading} />
      </Panel>
    </Container>
  );
};
