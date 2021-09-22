import React from "react";
import axios from "axios";
import { toastr } from "react-redux-toastr";
import { connect } from "react-redux";

import { IconButton, Modal, Table, ExportExcel } from "common";
import columns from "./columns_details.json";

const Details = ({ row, user_id }) => {
  const [open, setOpen] = React.useState(false);
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const getRows = async () => {
      try {
        setLoading(true);
        const URL = `${process.env.REACT_APP_API_URL}/mw_routes/divergent_links`;
        const { data } = await axios.post(URL, {
          critica: row.critica,
          user_id
        });
        setRows(data || []);
      } catch (error) {
        toastr.error("Erro", "Erro ao buscar dados");
      } finally {
        setLoading(false);
      }
    };
    getRows();
  }, [open, row]);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <IconButton
        onClick={() => setOpen(true)}
        icon="list"
        title="Visualizar Detalhes"
        color="#000"
      />
      {open && (
        <Modal
          dimension="lg"
          title="Detalhamento de Ação"
          maxHeight="70vh"
          open={open}
          onClose={() => setOpen(false)}
          footer={
            <ExportExcel rows={rows} columns={columns}>
              <IconButton
                icon="file-excel-o"
                typeTooltip="success"
                className="btn btn-success"
                iconProps={{ style: { fontSize: "16px" } }}
                disabled={!rows.length}
              >
                Exportar
              </IconButton>
            </ExportExcel>
          }
        >
          <Table
            enableDefaultFilter
            disablePagination
            rows={rows}
            columns={columns}
            loading={loading}
          />
        </Modal>
      )}
    </div>
  );
};

export default connect(state => ({ user_id: state.auth.user.id }))(Details);
