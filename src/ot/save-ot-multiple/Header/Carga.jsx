import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { toastr } from "react-redux-toastr";

import { Modal, Table } from "common";
import { createOts } from "../actions";

const columns = [
  { name: "ot_code", title: "Código OT" },
  { name: "message", title: "" }
];

const Carga = ({ ots, createOts, download_created }) => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [rows, setRows] = React.useState([]);

  const handleFetch = async () => {
    setOpen(true);
    setLoading(true);
    const codes = await createOts();
    setRows(codes.map(ot_code => ({ ot_code, message: "OK" })));
    setLoading(false);
  };

  React.useEffect(() => {
    if (ots.length)
      toastr.confirm(
        `${ots.length} ot(s) habilitada(s) para criação. Deseja continuar?`,
        { onOk: handleFetch }
      );
  }, [ots]);

  return (
    <Modal
      open={open}
      title="Criar OTs"
      height="70vh"
      maxHeight={400}
      onClose={() => setOpen(false)}
      footer={
        <button
          type="button"
          disabled={!rows.length}
          className="btn btn-primary"
          onClick={() => window.open(download_created)}
        >
          Download Ots Criadas
        </button>
      }
    >
      <Table
        columns={columns}
        rows={rows}
        loading={loading}
        disablePagination
      />
    </Modal>
  );
};

const mapStateUpload = state => ({
  ots: state.OtMultiple.ots,
  download_created: `${process.env.REACT_APP_API_URL}/${state.OtMultiple.file_created}`
});
const mapActionsUpload = dispatch =>
  bindActionCreators({ createOts }, dispatch);

export default connect(
  mapStateUpload,
  mapActionsUpload
)(Carga);
