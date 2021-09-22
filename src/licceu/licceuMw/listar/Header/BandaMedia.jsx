import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import { toastr } from "react-redux-toastr";

import { IconButton, Modal, ExportExcel, Table, QueryString } from "common";
import columns from "../columnsBandaMedia.json";

const BandaMedia = ({ selected_rows }) => {
  const [open, setOPen] = React.useState(false);
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  if (!selected_rows.length) return null;

  const handleOpen = async () => {
    setOPen(true);
    setLoading(true);
    const { id_links_group } = selected_rows[0];
    const id_rota = QueryString.get("id_rota");
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/mw_banda_media/get_banda_media_data`,
        { id_links_group, id_rota }
      );
      setRows(data);
      setLoading(false);
    } catch (errror) {
      toastr.error("Erro ao buscar lista de Banda Média");
    }
  };

  return (
    <>
      <IconButton
        icon="line-chart"
        title="Banda Média"
        color="#000"
        onClick={handleOpen}
      />
      {open && (
        <Modal
          title="Banda Média"
          open={open}
          onClose={() => setOPen(false)}
          dimension="lg"
          footer={
            <ExportExcel rows={rows} columns={columns}>
              <IconButton
                typeTooltip="success"
                className="btn btn-success"
                iconProps={{ style: { fontSize: "16px", marginRight: "5px" } }}
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
            columnWidths={columns.map(({ name }) => ({
              columnName: name,
              width: 180
            }))}
          />
        </Modal>
      )}
    </>
  );
};

export default connect(state => ({
  selected_rows: state.listarMW.selected_rows
}))(BandaMedia);
