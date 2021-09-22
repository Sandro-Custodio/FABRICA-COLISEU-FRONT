import React from "react";
import {
  SelectionState,
  FilteringState,
  IntegratedFiltering,
  GroupingState,
  SummaryState,
  IntegratedGrouping,
  IntegratedSummary,
  SortingState,
  IntegratedSorting,
  IntegratedSelection,
  DataTypeProvider
} from "@devexpress/dx-react-grid";
import {
  Grid,
  VirtualTable,
  Table,
  TableHeaderRow,
  TableColumnResizing,
  TableSelection,
  TableFilterRow,
  DragDropProvider,
  TableColumnReordering,
  TableGroupRow,
  Toolbar,
  TableBandHeader,
  TableSummaryRow
} from "@devexpress/dx-react-grid-bootstrap3";
import { Plugin, Template } from "@devexpress/dx-react-core";

import { IconButton, Loading } from "common";
import Pagination from "./pagination";
import CellComp from "./cell";
import { toastr } from "react-redux-toastr";


const TableComp = ({
  columns,
  columnWidths,
  selectionProps,
  tableSelectionProps,
  filterProps,
  changePage,
  currentPage,
  pageSize,
  total,
  loading,
  children,
  actions,
  SortingProps,
  disableReorder,
  Cell,
  toolBarComp,
  disablePagination,
  groupingStateProps,
  summaryStateProps,
  currencyTypeProviderProps,
  enableDefaultFilter,
  HeaderCell,
  columnBands,
  LoadingComp,
  selectByRowClick,
  virtualTable,
  columnCurrencyName,
  canChangeLineColor,
  ...others
}) => {
  const [widths, setWidths] = React.useState(columnWidths);
  const [sorting, setSorting] = React.useState([]);
  const [filterEnable, setFilterEnable] = React.useState(false);
  const [filter, setFilterProps] = React.useState([]);
  const [currencyColumns] = React.useState(columnCurrencyName);
  const [changeLineColor] = React.useState(canChangeLineColor);

  const TableCell = props => (
    <CellComp {...props} Cell={Cell} actions={actions} />
  );

  const CurrencyFormatter = ({ value }) => (
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  );

  const CurrencyTypeProvider = props => (
    <DataTypeProvider
      formatterComponent={CurrencyFormatter}
      {...props}
    />
  );


  const TableRowEdit = ({ ...restProps }) => (
     <TableSelection.Row 
      {...restProps}
        style={{
          color: ChangeRowTxColorComparingDate(restProps?.tableRow?.row?.date_last_att_value)
        }}
    />
  );

  const TableRow = ({ ...restProps }) => {
    //restProps.selectByRowClick = CanSelect(restProps.tableRow.row);
    return (
      <TableSelection.Row
        {...restProps}
        style={{
          color: ChangeRowTxColor(restProps.tableRow.row.process_begin,
            restProps.tableRow.row.procedure_name,
            restProps.tableRow.row.process_end)
        }}
      />
    );
  };

  const TableRowDefault = ({ ...restProps }) => {
    //restProps.selectByRowClick = CanSelect(restProps.tableRow.row);
    return (
      <TableSelection.Row
        {...restProps}
        style={{
          color: "black"
        }}
      />
    );
  };

  const ChangeRowTxColor = (process_begin, procedure_name, process_end) => {
    if (
      process_begin && procedure_name &&
      process_end === null || process_end === undefined
    ) {
      return "red";
    }
    return undefined;
  };

  const ChangeRowTxColorComparingDate = (date_last_att_value) => {
    if (!date_last_att_value) {
      return "black";
    }
    var now = new Date();
    let str = date_last_att_value;
    const myArr = str.split("/");
    var then = new Date(myArr[2], myArr[1], myArr[0]);
    var diffInDays = Math.round((now - then) / (1000 * 60 * 60 * 24));

    if (diffInDays <= 365) {
      return "green";
    }

    return "black";

  }


  let styleWithSelection = {};
  if (
    selectionProps &&
    !(
      tableSelectionProps &&
      (tableSelectionProps.showSelectAll ||
        !tableSelectionProps.showSelectionColumn)
    )
  )
    styleWithSelection = { position: "absolute", left: -20 };
  const HeaderCellComp = ({ children, ...others }) => {
    const { column } = others;

    return (
      <HeaderCell {...others}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 26,
            maxWidth: "100%"
          }}
        >
          {columns[0].name === column.name && (
            <IconButton
              id="test"
              style={{
                padding: 0,
                margin: 0,
                ...styleWithSelection
              }}
              icon="filter"
              onClick={evt => {
                evt.stopPropagation();
                setFilterEnable(!filterEnable);
              }}
              color={filterEnable ? "#337ab7" : "#555"}
            />
          )}
          {children}
        </div>
      </HeaderCell>
    );
  };

  return (
    <div className="overlay-wrapper">
      <Grid columns={columns} {...others}>
        <SortingState
          sorting={sorting}
          onSortingChange={setSorting}
          {...SortingProps}
        />
        <IntegratedSorting />
        <CurrencyTypeProvider
          for={currencyColumns}
        />

        {(enableDefaultFilter || filterProps) && filterEnable && (
          <FilteringState
            filters={filter}
            onFiltersChange={setFilterProps}
            {...filterProps}
          />
        )}
        {(enableDefaultFilter || filterProps) && filterEnable && (
          <IntegratedFiltering />
        )}

        {!disableReorder && <DragDropProvider />}

        {groupingStateProps && <GroupingState {...groupingStateProps} />}
        {groupingStateProps && <IntegratedGrouping />}

        {summaryStateProps && <SummaryState {...summaryStateProps} />}
        {summaryStateProps && <IntegratedSummary />}

        {selectionProps && <SelectionState {...selectionProps} />}
        {selectionProps && <IntegratedSelection {...tableSelectionProps} />}

        {virtualTable && <VirtualTable height="auto" />}
        <Table rowComponent={TableRowEdit} cellComponent={actions.length ? TableCell : Cell} />

        {!disableReorder && (
          <TableColumnReordering
            defaultOrder={columns.map(({ name }) => name)}
          />
        )}

        {!!columnWidths.length && (
          <TableColumnResizing
            columnWidths={widths}
            onColumnWidthsChange={setWidths}
          />
        )}

        {selectionProps && <SelectionState {...selectionProps} />}
        {selectionProps && (
          <TableSelection
            rowComponent={changeLineColor ? TableRow : TableRowDefault}
            //rowComponent={TableRow}
            selectByRowClick={selectByRowClick}
            highlightRow
            {...tableSelectionProps}
          />
        )}

        <TableHeaderRow
          cellComponent={
            (filterProps || enableDefaultFilter) && columns.length
              ? HeaderCellComp
              : HeaderCell
          }
          showSortingControls
        />

        {columnBands && <TableBandHeader columnBands={columnBands} />}

        {groupingStateProps && <TableGroupRow />}

        {(enableDefaultFilter || filterProps) && filterEnable && (
          <TableFilterRow />
        )}
        {toolBarComp && <Toolbar />}
        {toolBarComp && <ToolBarColunm>{toolBarComp}</ToolBarColunm>}

        {children}
      </Grid>
      {loading && <Loading />}
      {!disablePagination && (
        <Pagination
          columns={columns}
          changePage={changePage}
          currentPage={currentPage}
          pageSize={pageSize}
          total={total}
        />
      )}
    </div>
  );
};

// const LoadingComp = () => (
//   <div className="overlay fade-in fade-out-in">
//     <i className="fa fa-refresh fa-spin" />
//   </div>
// );

const ToolBarColunm = props => (
  <Plugin name="ToolbarColumn">
    <Template name="toolbarContent" {...props} />
  </Plugin>
);

TableComp.defaultProps = {
  columns: [],
  rows: [],
  columnWidths: [],
  changePage: page => console.log("changePage", page),
  currentPage: 1,
  pageSize: 100,
  total: 0,
  loading: false,
  actions: [],
  SortingProps: {},
  disableReorder: false,
  Cell: Table.Cell,
  HeaderCell: TableHeaderRow.Cell,
  tableSelectionProps: {},
  LoadingComp: Loading,
  selectByRowClick: true,
  columnCurrencyName: [],
  canChangeLineColor: false
};

export default TableComp;
