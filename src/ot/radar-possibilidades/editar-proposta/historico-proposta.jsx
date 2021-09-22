/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { Table } from "common";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import get from "lodash/get";
import { columns } from "./columns.json";

const mapStateToPropsCommand = state => ({
  token: state.auth.user.access_token
});
const mapDispatchToPropsComand = dispatch => bindActionCreators({}, dispatch);
const CommandButton = connect(
  mapStateToPropsCommand,
  mapDispatchToPropsComand
)(({ row, token }) => {
  return (
    <button
      type="button"
      className="btn btn-link"
      onClick={() => {
        fetch(`${process.env.REACT_APP_API_URL}/download`, {
          method: "POST",
          headers: { Authorization: token, "Content-Type": "application/json" },
          body: JSON.stringify({
            path: `pms/evidencias/${row.propostas}`
          })
        })
          .then(resp => {
            return resp.blob();
          })
          .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.style.display = "none";
            a.href = url;
            a.download = row.propostas;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
          })
          .catch(() => alert("Erro ao buscar arquivo para Download"));
      }}
    >
      <span className="primary">
        <i className="glyphicon glyphicon-download" />
      </span>
    </button>
  );
});

const historico = ({ attaches, linhaSelecionada }) => {
  let rows;

  if (attaches.length === 0) {
    if (linhaSelecionada.evt_attaches) {
      rows = linhaSelecionada.evt_attaches.map(r => ({
        propostas: r.original_name,
        data: r.created_at
      }));
    }
  } else {
    rows = attaches.map(r => ({
      propostas: r.original_name,
      data: r.created_at
    }));
  }

  return (
    <Table
      columns={columns}
      rows={rows}
      actions={[{ columnName: "add", component: CommandButton }]}
      disablePagination
    />
  );
};

const mapStateToProps = state => ({
  attaches: get(state, "radarPossibilidades.attaches", []),
  initialValues: {
    ataches: []
  },
  enableReinitialize: true
});

export default connect(mapStateToProps)(historico);
