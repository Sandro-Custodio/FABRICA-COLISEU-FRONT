import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toastr } from "react-redux-toastr";

import { Table, IconButton } from "common";
import Content from "common/adminLTE/content";
import HeaderContent from "common/adminLTE/contentHeader";
import columns from "./columns.json";

const baseURL = process.env.REACT_APP_API_URL;

const ToBack = () => {
  const [hover, setHover] = React.useState(false);
  return (
    <Link
      style={{ color: "inherit", textDecoration: hover ? "underline" : "none" }}
      to="/views-base"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      Views Base
    </Link>
  );
};

const DownloadCsv = ({
  tableRow: {
    row: { file_name }
  }
}) => {
  console.log("file_name", file_name);
  return (
    <IconButton
      onClick={() =>
        file_name &&
        window.open(`${baseURL}/view_licceu/${file_name}`, "_blank")
      }
      style={{ width: "100%" }}
      icon="download"
      disabled={!file_name}
      title={`Download ${file_name || ""}`}
    />
  );
};

const BaseList = ({ title, code }) => {
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    axios
      .get(`${baseURL}/views/generate_licceu_report/${code}`)
      .then(res => setRows(res.data))
      .catch(() => toastr.error("Erro", "Erro ao buscar lista"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="fade-in fade-out">
      <HeaderContent title={title} small={<ToBack />} />
      <Content>
        <div className="panel panel-default">
          <div className="panel-heading">
            <h4>Lista de Downloads</h4>
          </div>
          <div className="panel-body">
            <Table
              rows={rows}
              loading={loading}
              columns={columns}
              actions={[{ columnName: "download", component: DownloadCsv }]}
              disablePagination
            />
          </div>
        </div>
      </Content>
    </div>
  );
};
export default BaseList;
