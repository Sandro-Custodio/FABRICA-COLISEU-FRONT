import React from "react";
import { Table as DxTable } from "@devexpress/dx-react-grid-bootstrap3";

import { Table, Modal, IconButton } from "common";
import { downloadCarga, requestListCargaVendor } from "../actions";

// Migrado do src\main\resources\static\views\vendor-acesso\projeto-acesso-up-execultivo.factory.js
const columns = [
  { name: "TSSR", title: "TSSR" },
  { name: "RF SHEET", title: "RF SHEET" },
  { name: "CDD", title: "CDD" },
  { name: "INITIAL TUNNING", title: "INITIAL TUNNING" },
  { name: "TND", title: "TND" },
  { name: "BOQ", title: "BOQ" },
  { name: "BOQ ANTENAS", title: "BOQ ANTENAS" },
  { name: "SPP PROPOSTA TECNICA", title: "SPP PROPOSTA TECNICA" },
  { name: "SPP PROJETO EXECUTIVO", title: "SPP PROJETO EXECUTIVO" }
];

const CellComp = ({ row, column }) => {
  const columnValue = row[column.name];
  if (columnValue instanceof Object) {
    return (
      <DxTable.Cell>
        <button
          type="submit"
          className="btn btn-link"
          onClick={() => downloadCarga([columnValue])}
        >
          {columnValue.data}
        </button>
      </DxTable.Cell>
    );
  }
  return <td>{columnValue}</td>;
};

const CargaVendor = ({ form, row }) => {
  const [open, setOpen] = React.useState(false);
  const [selection, setSelection] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    if (open) {
      setLoading(true);
      const promise = requestListCargaVendor({ form, row });
      promise.then(({ rows }) => {
        setRows(rows);
        setLoading(false);
      });
    }
  }, [open]);

  return (
    <>
      <IconButton
        icon="plus"
        onClick={evt => {
          setOpen(true);
          evt.stopPropagation();
        }}
      />
      {open && (
        <Modal
          open={open}
          title="Carga Vendor Acesso"
          dimension="lg"
          width="50vw"
          onClose={() => setOpen(false)}
          footer={
            <IconButton
              className="btn-primary"
              onClick={() => {
                const files = [];
                const rowsSelected = selection.map(s => rows[s]);
                rowsSelected.forEach(row =>
                  Object.keys(row).forEach(key => files.push(row[key]))
                );
                downloadCarga(files);
                setSelection([]);
              }}
              disabled={!selection.length}
            >
              Download
            </IconButton>
          }
        >
          <Table
            disableReorder
            columns={columns}
            columnWidths={columns.map(c => ({
              columnName: c.name,
              width: 180
            }))}
            rows={rows}
            selectionProps={{ selection, onSelectionChange: setSelection }}
            loading={loading}
            total={rows.length}
            pageSize={rows.length}
            Cell={CellComp}
          />
        </Modal>
      )}
    </>
  );
};

CargaVendor.defaultProps = {
  form: {}
};

export default CargaVendor;
