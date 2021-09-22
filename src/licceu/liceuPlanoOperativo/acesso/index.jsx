import React from "react";
import { toastr } from "react-redux-toastr";

import { Table } from "common";
import { Container, BackLink, Panel } from "../comps";
import { requestListAcessos } from "../actions";
import { tipos } from "./columns";
import { sizes } from "./columnSize";
import Header from "./header";
import CargaVendor from "./cargaVendor";

const actions = form => {
  const CargaVendorComp = props => <CargaVendor {...props} form={form} />;
  return [{ columnName: "action_pe", component: CargaVendorComp }];
};

const isAcesso = code => {
  return code === "DR_COX1G1";
};

export default ({ title, code }) => {
  const [pageSize, setPageSize] = React.useState(0);
  const [form, setForm] = React.useState({});
  const [selection, onSelectionChange] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);

  const columns = tipos[code];
  const columnSize = sizes[code];

  const search = (page, form) => {
    if (form.po && form.year) {
      setLoading(true);
      const promise = requestListAcessos({ form, page });
      promise.then(({ rows, total, limit }) => {
        setPageSize(limit);
        setRows(rows);
        setTotal(total);
        setLoading(false);
        onSelectionChange([]);
      });
    } else {
      toastr.warning("Preencha todos os campos para realizar a busca");
    }
  };

  return (
    <Container title={title} subtitle={<BackLink />}>
      <Panel
        header={
          <Header
            selection={selection}
            columns={columns}
            rows={rows}
            onSearch={form => {
              setForm(form);
              search(page, form);
            }}
            exportTitle={
              isAcesso(code) ? "Plano Operativo Acesso" : "Plano Operativo"
            }
            form={form}
            isAcesso={isAcesso(code)}
          />
        }
      >
        <Table
          columns={columns}
          rows={rows}
          columnWidths={columnSize}
          selectionProps={{ selection, onSelectionChange }}
          enableDefaultFilter
          changePage={page => {
            setPage(page);
            search(page, form);
          }}
          currentPage={page}
          total={total}
          pageSize={pageSize}
          actions={actions(form)}
          loading={loading}
        />
      </Panel>
    </Container>
  );
};
