import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { EditingState } from "@devexpress/dx-react-grid";
import "../styles.css";
import {
  Grid as DxGrid,
  TableHeaderRow,
  Table,
  TableEditRow
} from "@devexpress/dx-react-grid-bootstrap3";
import { toastr } from "react-redux-toastr";
import { deleteAnexo, download } from "./actions";

const CommandButton = ({ row, row: { id }, deleteAnexo, auth }) => (
  
  <td>
    <button
      type="button"
      className="btn btn-link"
      onClick={() =>
        download("anexos_projetos/", row.name, auth.user.access_token)
      }
    >
      <span className="primary">
        <i className="glyphicon glyphicon-save-file" />
      </span>
    </button>
  </td>
);

const Cell = props => {
  if (props.column.name === "add") {
    const Comand = connect(mapStateToProps, mapDispatchToProps)(CommandButton);
    return <Comand {...props} />;
  }
  return <Table.Cell {...props} />;
};

const columns = [
  { name: "name", title: "Nome" },
  { name: "lastModifiedDate", title: "Data" },
  { name: "size", title: "Tamanho Bytes" },
  { name: "path", title: "Tipo Arquivo" },
  { name: "attach_type", title: "Tipo Anexo" },
  { name: "add", title: "Ações" }
];

const VisualizarAnexo = ({ rows }) => {
  const CellComp = props => <Cell {...props} />;

  return (
    <>
      <div className="overlay-wrapper montar-tabelas">
        <DxGrid rows={rows.map(el => el)} columns={columns} showBorders>
          <EditingState />
          <Table cellComponent={CellComp} />
          <TableHeaderRow />
          <TableEditRow />
        </DxGrid>
      </div>
    </>
  );
};
const mapStateToProps = state => ({
  auth: state.auth,
  inserirAnexoOt: state.inserirAnexoOt,
  rows: state.inserirAnexoOt.rows
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ deleteAnexo }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(VisualizarAnexo);
