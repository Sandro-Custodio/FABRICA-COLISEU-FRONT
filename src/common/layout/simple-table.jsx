import React from "react";

import {
  SortingState,
  IntegratedSorting,
  IntegratedGrouping,
  GroupingState,
  CustomGrouping,
} from "@devexpress/dx-react-grid";

import {
  Grid as DxGrid,
  VirtualTable,
  TableHeaderRow,
  Table,
  DragDropProvider,
  Toolbar,
  TableGroupRow,
  TableColumnResizing
} from "@devexpress/dx-react-grid-bootstrap3";

const Root = props => <DxGrid.Root {...props} style={{ height: '100%' }} />;

const SimpleTable = props => {

  const {
    row_content,
    column_content,
    grouping,
    defaultColumnWidths
  } = props;

  const getChildGroups = groups => groups.map(group => ({
    key: group.key, childRows: group.items }));

  return(
    <DxGrid rows={row_content} columns={column_content} showBorders rootComponent={Root}>
      <SortingState/>
      <IntegratedSorting />
      {grouping &&(
        <GroupingState
          defaultGrouping={grouping}
        />
      )}
      {grouping &&(
        <IntegratedGrouping />
      )}
      <VirtualTable height="auto"/>
      <DragDropProvider />
      <Table />
      {defaultColumnWidths &&(<TableColumnResizing defaultColumnWidths={defaultColumnWidths}/>)}
      <TableHeaderRow />
    </DxGrid>
  )
};

SimpleTable.defaultProps = {
  column_content: [],
  row_content: [],
  grouping: null
};

export default SimpleTable;
