import React from "react";
import { toastr } from "react-redux-toastr";

import { Table } from "common";
import { Container, BackLink, Panel } from "../comps";
import { requestListTransporte } from "../actions";
import Header from "./header";
import columns from "./columns";
import columnSize from "./columnSize";

export default () => {
  const [pageSize, setPageSize] = React.useState(0);
  const [form, setForm] = React.useState([]);
  const [selection, onSelectionChange] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [filters, onFiltersChange] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);

  const search = (page, form) => {
    if (form.po && form.year) {
      setLoading(true);
      const promise = requestListTransporte({ form, page });
      promise.then(({ rows, total, limit }) => {
        setPageSize(limit);
        setRows(rows);
        setTotal(total);
        setLoading(false);
      });
    } else {
      toastr.warning("Preencha todos os campos para realizar a busca");
    }
  };

  return (
    <Container
      title="Listar Plano Operativo Transporte"
      subtitle={<BackLink />}
    >
      <Panel
        header={
          <Header
            selection={selection}
            columns={columns}
            rows={rows}
            onFilter={form => {
              setForm(form);
              search(page, form);
            }}
          />
        }
      >
        <Table
          columns={columns}
          rows={rows}
          columnWidths={columnSize}
          selectionProps={{ selection, onSelectionChange }}
          filterProps={{ filters, onFiltersChange }}
          changePage={page => {
            setPage(page);
            search(page, form);
          }}
          currentPage={page}
          total={total}
          pageSize={pageSize}
          loading={loading}
        />
      </Panel>
    </Container>
  );
};
