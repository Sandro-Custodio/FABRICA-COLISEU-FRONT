import React from "react";
import { Table as DxTable } from "@devexpress/dx-react-grid-bootstrap3";

const ActionCell = data => {
  const { actions } = data
  return (
    <DxTable.Cell>
      {actions.map(el => (
        <el.component key={el.columnName} {...data} />
      ))}
    </DxTable.Cell>
  )
};
export default ({ actions, Cell, ...others }) => {
  const columnName = others.column.name;
  const actionsFilter = actions.filter(a => a.columnName === columnName);
  if (actionsFilter.length)
    return <ActionCell actions={actionsFilter} {...others} />;
  return <Cell {...others} />;
};
