import React from "react";
import { Table } from "common";
import { Select } from "common/input";
import { Field, reduxForm } from "redux-form";
import "./components.css";

const data = [
  { text: "0", value: 0 },
  { text: "1 mes", value: 1 },
  { text: "3 meses", value: 3 },
  { text: "4 meses", value: 4 },
  { text: "5 meses", value: 5 },
  { text: "6 meses", value: 6 },
  { text: "7 meses", value: 7 },
  { text: "8 meses", value: 8 },
  { text: "9 meses", value: 9 },
  { text: "10 meses", value: 10 },
  { text: "11 meses", value: 11 },
  { text: "12 meses", value: 12 },
  { text: "24 meses", value: 24 },
  { text: "36 meses", value: 36 },
  { text: "48 meses", value: 48 },
  { text: "60 meses", value: 60 },
  { text: "84 meses", value: 84 }
];

const CompSelect = () => <Select data={data} textKey="text" valueKey="value" />;

let EscolheFidelizacao = () => {
  return <Field component={CompSelect} />;
};

EscolheFidelizacao = reduxForm({ form: "EscolheFidelizacao" })(
  EscolheFidelizacao
);

export default () => {
  return (
    <>
      <Table
        columns={[{ title: "Select", name: "fidelizacao" }]}
        rows={data}
        actions={[{ columnName: "fidelizacao", component: EscolheFidelizacao }]}
        disablePagination
        selectionProps
        selectByRowClick={false}
      />
    </>
  );
};
