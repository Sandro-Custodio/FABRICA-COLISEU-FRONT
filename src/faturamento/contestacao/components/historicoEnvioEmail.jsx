import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  Grid as DxGrid,
  Table,
  TableHeaderRow,
  TableColumnResizing
} from "@devexpress/dx-react-grid-bootstrap3";
import ModalForm from "../../../common/layout/modal";

const HistoricoEnvioEmail = props => {
  const {
    reducer: { envio_email },
    auth
  } = props;

  const columns = [
    { name: "lote", title: "Lote" },
    { name: "user_name", title: "Usuário" },
    { name: "created_at", title: "Data Envio" },
    { name: "file_name", title: "Arquivo" }
  ];

  const columnWidths = columns.map(i => ({
    columnName: i.name,
    width: i.name == "file_name" ? 400 : 125
  }));

  const rows = envio_email.map(i => ({
    ...i,
    created_at:
      i.created_at &&
      new Date(i.created_at).toLocaleDateString("pt-BR", { timeZone: "UTC" })
  }));

  const ModalFooter = (
    <div>
      <button
        style={{ marginRight: "0px" }}
        className="btn btn-sm btn-primary"
        data-dismiss="modal"
      >
        Fechar
      </button>
    </div>
  );

  function download(path, filename, token) {
    fetch(`${process.env.REACT_APP_API_URL}/download`, {
      method: "POST",
      headers: { Authorization: token, "Content-Type": "application/json" },
      body: JSON.stringify({
        path: `${path}${filename}`
      })
    })
      .then(resp => resp.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch(() => alert("Erro ao buscar arquivo para Download"));
  }

  const customCell = props => {
    const { row, column } = props;
    if (column.name == "file_name") {
      return (
        <td>
          <button
            className="btn btn-sm btn-link"
            onClick={() =>
              download("contestacao/", row[column.name], auth.user.access_token)
            }
          >
            {row[column.name]}
          </button>
        </td>
      );
    } else {
      return <td>{row[column.name]}</td>;
    }
  };

  return (
    <div>
      <ModalForm
        LabelButtonSubmit="Histórico de E-mail"
        id="historico-email"
        title="Histórico de E-mail"
        dimension="modal-md modal-hist-email"
        // height="24vw"
        footer={ModalFooter}
      >
        <DxGrid rows={rows} columns={columns}>
          <Table cellComponent={customCell} />
          <TableColumnResizing defaultColumnWidths={columnWidths} />
          <TableHeaderRow />
        </DxGrid>
      </ModalForm>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  reducer: state.contestacaoReducer
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HistoricoEnvioEmail);
