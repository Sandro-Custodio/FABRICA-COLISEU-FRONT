import React, { useState } from "react";
import { Table, Modal } from "common";
import { Table as DxTable } from "@devexpress/dx-react-grid-bootstrap3";
import { circuito_table } from "./tableOdsColumns.json";
import DescribeODS from "./describeODS";
import "./tblCirc.css";

export default props => {
  const {
    handleContract,
    rows,
    useSelect,
    setSelected,
    selected,
    allSelected,
    setAllSelected,
    setRemarks
  } = props;

  const [unshifted, setUnshifted] = useState(false);
  const [modalOpen, setModalOpen] = useState(0);

  const Cell = ({ row }) => {
    return (
      <DxTable.Cell>
        <button
          style={styles}
          type="submit"
          className="btn btn-link"
          onClick={() => setModalOpen(row.id)}
        >
          {row.circuito_id}
        </button>
        {modalOpen == row.id && (
          <div id="ods">
            <Modal
              open={modalOpen == row.id}
              dimension="g2 det-circ"
              title={`Detalhes do Circuito - ${row.circuito_id}`}
              onClose={() => setModalOpen(0)}
            >
              <DescribeODS row_id={row.id} />
            </Modal>
          </div>
        )}
      </DxTable.Cell>
    );
  };

  const Contract = ({ row }) => {
    return (
      <DxTable.Cell key={row.id}>
        {row.contract && (
          <a
            style={styles}
            className="btn btn-link"
            onClick={() =>
              handleContract !== undefined ? handleContract(row) : null
            }
          >
            {row.contract.id}
          </a>
        )}
      </DxTable.Cell>
    );
  };

  const Select = ({row}) => {
    return (
      <input
          type="checkbox"
          id={`select-${row.id}`}
          row={row.id}
          className="select-ll"
          checked={selected.includes(row.id)}
          onChange={() => setSelectedLL(row.id)}
          key={row.id}
        />
    );
  };

  let columns = circuito_table;
  let actions = [
    { columnName: "circuito_id", component: Cell },
    { columnName: "contrato", component: Contract }
  ];

  const selectAllLLs = () => {
    const remarks = document.getElementById("obs").value;
    setRemarks(remarks);

    let newSelect = [];
    if (!allSelected) {
      const checks = document.getElementsByClassName("select-ll");
      for (let item of checks) {
        newSelect.push(parseInt(item.getAttribute("row")));
      }
      setSelected(newSelect);
      setAllSelected(true);
    } else {
      setSelected([]);
      setAllSelected(false);
    }

    document.getElementById("obs").value = remarks;
  };

  const setSelectedLL = id => {
    const remarks = document.getElementById("obs").value;
    setRemarks(remarks);

    let qtdChecked = 0;
    let qtdAll = 0;
    const all = document.getElementsByClassName("select-ll");

    for (let i of all) {
      qtdAll++;
      if (i.checked) qtdChecked++;
    }

    if (qtdChecked == qtdAll) setAllSelected(true);
    else setAllSelected(false);

    if (selected.includes(id)) {
      let newSelect = selected.filter(e => e != id);
      setSelected(newSelect);
    } else {
      let newSelect = [...selected];
      newSelect.push(id);
      setSelected(newSelect);
    }

    document.getElementById("obs").value = remarks;
  };

  const cell = (column, row) => {
    let widget = <span>{row[column.name]}</span>;
    actions.map(a => {
      if (column.name == a.columnName) {
        widget = a.component({ row });
      }
    });
    if (column.name == "cancel_end_at" && row[column.name] !== null)
      widget = <span>{new Date(row[column.name]).toLocaleDateString("pt-br", {timeZone:"UTC"})}</span>;
    return widget;
  };

  return (
    <div className="table-responsive table-circuitos" style={{overflowX:"auto"}}>
      {useSelect === "true" && (
        <label
          htmlFor="select-all"
          style={{
            padding: "10px",
            background: "#eee",
            marginBottom: "8px",
            border: "solid 1px #ccc",
            display: "flex",
            alignItems: "center"
          }}
        >
          <input
            type="checkbox"
            id="select-all"
            checked={allSelected}
            onChange={() => selectAllLLs()}
          />{" "}
          <span>&nbsp;Selecionar todos os circuitos.</span>
        </label>
      )}
      {/* <Table
        style={{ height: "auto !important" }}
        columns={columns}
        disablePagination
        actions={actions}
        {...props}
        columnWidths={columns.map(n => ({
          columnName: n.name,
          width: 180
        }))}
      /> */}
      <table className="table table-hover table-stripped">
        <thead>
          <tr>
            {useSelect && <th>Selecionar</th>}
            {columns.map(c => (
              <th style={{width:"auto"}} key={c.title}>{c.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(r => {
            return (
              <tr key={r.id}>
                {useSelect && <td><Select row={r}/></td>}
                {columns.map(c => (
                  <td>{cell(c, r)}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  padding: 0,
  margin: 0,
  border: "unset",
  textDecoration: "unset"
};
