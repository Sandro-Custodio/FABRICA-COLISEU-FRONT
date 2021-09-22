/* eslint-disable jsx-a11y/no-autofocus */
import React from "react";
import { Table } from "common";
import { Table as DxTable } from "@devexpress/dx-react-grid-bootstrap3";
import { connect } from "react-redux";
import get from "lodash/get";
import { columns } from "./storage.json";

let focus = -1;

const CapacityCell = ({
  setValue,
  value,
  column: { name },
  tableRow: { rowId }
}) => {
  React.useEffect(() => {
    return () => {
      if (focus === rowId) focus = -1;
    };
  }, []);
  return (
    <DxTable.Cell>
      <input
        autoFocus={focus === rowId}
        type="number"
        defaultValue={value}
        onChange={evt => {
          focus = rowId;
          setValue(rowId, name, evt.target.value);
        }}
        className="form-control input-sm"
      />
    </DxTable.Cell>
  );
};

const mapStateSegment = state => ({
  options: state.licceuEditarCircuito.segments
});

const SegmentCell = connect(mapStateSegment)(
  ({ value, options, setValue, column: { name }, tableRow: { rowId } }) => (
    <DxTable.Cell>
      <select
        value={value || ""}
        onChange={evt => setValue(rowId, name, evt.target.value)}
        className="form-control input-sm"
      >
        {value ? (
          <option hidden value={value}>
            {value}
          </option>
        ) : (
          <option hidden value="">
            Selecione
          </option>
        )}
        {options.map(opt => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </DxTable.Cell>
  )
);

const CelComp = ({ column, row, ...others }) => {
  const value = row[column.name] || "";

  switch (column.name) {
    case "capacidade":
      return (
        <CapacityCell value={value} column={column} row={row} {...others} />
      );
    case "seg":
      console.log("value", value);
      return (
        <SegmentCell value={value} column={column} row={row} {...others} />
      );
    default:
      return (
        <DxTable.Cell>
          <span style={{ lineHeight: 3 }}>{value}</span>
        </DxTable.Cell>
      );
  }
};

const TableLinks = ({ rows, loading, dispatch }) => {
  const setValue = (idx, path, value) =>
    dispatch({ type: "CHANGE_TABLE", payload: { idx, path, value } });
  const getValue = (path, defaultValue) => get(rows, path, defaultValue);

  const CellConnect = props => (
    <CelComp {...props} setValue={setValue} getValue={getValue} />
  );
  return (
    <Table
      columns={columns}
      rows={rows}
      Cell={CellConnect}
      loading={loading}
      disablePagination
    />
  );
};

const mapStatesTable = state => ({
  rows: state.licceuEditarCircuito.tableRows,
  loading: state.licceuEditarCircuito.tableLoading
});

export default connect(mapStatesTable)(TableLinks);
