import React from "react";
import axios from "axios";
import { toastr } from "react-redux-toastr";

import { IconButton, Modal, Table } from "common";
import columns from "./columns.json";

const LiccceuHistoryCircuit = ({ row: { nome, id } }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <IconButton
        onClick={() => setOpen(true)}
        title="Histórico do Circuito"
        icon="list"
        color="#000"
        className="filtro-btn"
        style={{ padding: 10 }}
      />
      {open && (
        <Modal
          open={open}
          dimension="lg"
          title={`Histórico do Circuito ${nome}`}
          onClose={() => setOpen(false)}
          height="70vh"
        >
          <HistoricoCircuito circuit_id={id} />
        </Modal>
      )}
    </>
  );
};

const HistoricoCircuito = ({ circuit_id }) => {
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    setLoading(true);
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/mw/get_circuit_history_by_id/${circuit_id}`
      )
      .then(res => setRows(res.data))
      .catch(() => toastr.error("Erro", "Erro ao buscar o Histórico"))
      .finally(() => setLoading(false));
  }, []);
  return (
    <Table columns={columns} rows={rows} loading={loading} disablePagination />
  );
};

LiccceuHistoryCircuit.defaultProps = {
  row: {}
};
export default LiccceuHistoryCircuit;
