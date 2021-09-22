import React from "react";
import axios from "axios";
import { toastr } from "react-redux-toastr";
import moment from "moment";

import { Table, Container, Panel, IconButton } from "common";

const baseURL = process.env.REACT_APP_API_URL;

const columns = [
  { name: "description", title: "Descrição" },
  { name: "updated_at", title: "Atualizado em" },
  { name: "file_name", title: "Nome do Arquivo" },
  { name: "download", title: " " }
];

const DownloadCsv = ({
  tableRow: {
    row: { file_name }
  }
}) => (
  <IconButton
    onClick={() =>
      file_name && window.open(`${baseURL}/txprofile/${file_name}`, "_blank")
    }
    style={{ width: "100%" }}
    icon="download"
    disabled={!file_name}
    title={`Download ${file_name || ""}`}
  />
);

const Listar = ({ BackLink, code }) => {
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    axios
      .get(`${baseURL}/views/generate_licceu_report/${code}`)
      .then(res =>
        setRows(
          res.data.map(({ updated_at, ...others }) => ({
            updated_at: moment(updated_at).format("LL"),
            ...others
          }))
        )
      )
      .catch(() => toastr.error("Erro", "Erro ao buscar lista"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Container title="Listar Sites" subtitle={BackLink}>
      <Panel>
        <Table
          rows={rows}
          loading={loading}
          columns={columns}
          actions={[{ columnName: "download", component: DownloadCsv }]}
          disablePagination
        />
      </Panel>
    </Container>
  );
};

export default Listar;
