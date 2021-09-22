import React from "react";
import { reduxForm } from "redux-form";
import { Table } from "../../../../common";
import { detalheColumns, detalheColumnWidths } from "../api.json";

// eslint-disable-next-line import/no-mutable-exports
let licceuExibirDetalhes = ({ data }) => {
  return (
    <main className="fade-in fade-out">
      <Table
        columns={detalheColumns}
        columnWidths={detalheColumnWidths}
        rows={data}
        disablePagination
      />
    </main>
  );
};

licceuExibirDetalhes = reduxForm({
  form: "licceuExibirDetalhes"
})(licceuExibirDetalhes);

export default licceuExibirDetalhes;
