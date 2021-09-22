import React from "react";
import { Table, IconButton, Modal } from "common";
import columns from "./transporteTable.json";
import columnsSize from "./transporteTableSize.json";
import { requestListModalTransporte } from "../actions";

export default ({ form, row }) => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    if (open) {
      setLoading(true);
      const promise = requestListModalTransporte({ row, form });
      promise.then(({ rows }) => {
        setRows(rows);
        setLoading(false);
      });
    }
  }, [open]);

  return (
    <>
      <IconButton
        icon="eye"
        color="black"
        onClick={evt => {
          setOpen(true);
          evt.stopPropagation();
        }}
      />
      {open && (
        <Modal
          open={open}
          title="Plano Operativo Transporte"
          dimension="lg"
          width="75vw"
          onClose={() => setOpen(false)}
        >
          <Table
            disableReorder
            columns={columns}
            columnWidths={columnsSize}
            rows={rows}
            loading={loading}
            disablePagination
          />
        </Modal>
      )}
    </>
  );
};
