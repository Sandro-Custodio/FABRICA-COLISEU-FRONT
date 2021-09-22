/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
/* eslint-disable no-nested-ternary */
import React from "react";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  SelectionState,
  SortingState,
  GroupingState,
  PagingState,
  FilteringState,
  IntegratedPaging,
  IntegratedGrouping,
  IntegratedSorting,
  IntegratedFiltering,
  IntegratedSelection
} from "@devexpress/dx-react-grid";
import {
  Grid as DxGrid,
  TableSelection,
  VirtualTable,
  TableHeaderRow,
  TableGroupRow,
  PagingPanel,
  Table,
  DragDropProvider,
  TableColumnReordering,
  Toolbar,
  TableFilterRow,
  TableColumnVisibility,
  ColumnChooser,
  TableColumnResizing
} from "@devexpress/dx-react-grid-bootstrap3";
import ContentHeader from "../../common/adminLTE/contentHeader";
import Content from "../../common/adminLTE/content";
import ModalFormOT from "../../common/layout/modal";
import Overlay from "../../common/msg/overlay/overlay";
import Filter from "../filters";
import SolicitarCancelamento from "./solicitarCancelamentoComponents/formSolicitarCancelamentoOt";
import { IconButton } from "common";
import Paginator from "common/paginator";
import FastForm from "common/FastForm/";
import "./styles.css";
import Grid from "../../common/layout/grid";
import {
  getOtList,
  load_filters,
  clear_filters,
  solicitarCancelamento,
  showOverlay,
  hideOverlay
} from "./actions";
import { clear_list_and_filters, change_ot_paginator } from "../list/actions"
import ToolbarColumn from "./solicitarCancelamentoComponents/toolBarColumn";

const GroupCellContent = ({ row }) => {
  return <span>{row.key}</span>;
};

const CanSelect = row => {
  switch (row.seg_status_id) {
    case 38:
    case 51:
    case 23:
    case 52:
    case 73:
    case 30:
      return false;
    default:
      return true;
  }
};

const MostrarSelecao = props => {
  const { row } = props;
  if (CanSelect(row)) {
    return <TableSelection.Cell {...props} />;
  }
  return <Table.Cell />;
};

const TableRow = ({ ...restProps }) => {
  restProps.selectByRowClick = CanSelect(restProps.tableRow.row);
  return (
    <TableSelection.Row
      {...restProps}
      style={{
        color: ChangeRowColor(restProps.tableRow.row.seg_status_id)
      }}
    />
  );
};

const ChangeRowColor = segStatusId => {
  if (
    segStatusId === 38 ||
    segStatusId === 51 ||
    segStatusId === 23 ||
    segStatusId === 30
  ) {
    return "#FF0000";
  }
  if (segStatusId === 52) {
    return "#0000FF";
  }
  if (segStatusId === 73) {
    return "#FD0024";
  }
  return undefined;
};

class SolicitarCancelamentoOtList extends React.Component {
  constructor(props) {
    super(props);
    const {
      ot: { columns }
    } = props;

    this.state = {
      selection: [],
      columnOrder: columns.map(n => n.name),
      columnWidths: columns.map(c => ({
        columnName: c.name,
        width: c.name === "own_ot_seg_code" ? 160 : 110
      })),
      expandedGroups: [],
      icons: [],
      enableFilter: false
      // pageSizes: [5, 10, 15, 0]
    };

    this.changeSelection = selection =>
      this.setState({
        selection
      });

    this.changeSelectionReset = selection =>
      this.setState({
        selection
      });

    this.changeColumnOrder = columnOrder => {
      this.setState({ columnOrder });
    };

    this.onExpandedGroupsChange = expandedGroups => {
      this.setState({ expandedGroups });
    };
  }

  componentDidMount() {
    this.handleGetOtList();
    const {
      ot: { operators },
      load_filters
    } = this.props;
    if (operators.length === 0) load_filters();
  }

  componentWillUnmount() {
    const { clear_list_and_filters, change_ot_paginator } = this.props;
    clear_list_and_filters();
    change_ot_paginator({ currentPage: 1, pageSize: 100 });
  }

  handleGetOtList = () => {
    const { auth, ot, getOtList } = this.props;
    getOtList(auth, ot);
    this.setState({ selection: [] });
  };

  handleFilterOT = () => {
    this.handleGetOtList();
  };

  CellComp = ({ children, ...others }) => {
    const {
      ot: { columns, grouping_column_name }
    } = this.props;
    const { column } = others;
    const { enableFilter } = this.state;

    const firstColumn = columns.find(
      col => ![grouping_column_name, "seg_project"].includes(col.name)
    );

    return (
      <TableHeaderRow.Cell {...others}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 26,
            maxWidth: "100%"
          }}
        >
          {firstColumn.name === column.name && (
            <IconButton
              style={{
                padding: 0,
                margin: 0,
                position: "absolute",
                left: "-20px"
              }}
              icon="filter"
              onClick={evt => {
                evt.stopPropagation();
                this.setState({ enableFilter: !enableFilter });
              }}
              color={enableFilter ? "#337ab7" : "#555"}
            />
          )}
          {children}
        </div>
      </TableHeaderRow.Cell>
    );
  };

  render() {
    const {
      ot: { list, columns, grouping_column_name, filters }
    } = this.props;
    const {
      auth,
      ot,
      user_id,
      area_id,
      solicitarCancelamento,
      showOverlay,
      hideOverlay,
      getOtList
    } = this.props;
    const { clear_filters } = this.props;
    const {
      selection,
      columnOrder,
      columnWidths,
      expandedGroups,
      icons,
      enableFilter
      // pageSizes
    } = this.state;
    const otSelected = [];
    for (let i = 0; i < selection.length; i += 1) {
      const otAtual = list[selection[i]];
      if (!otSelected.some(ot => ot.code === otAtual.code)) {
        otSelected.push(list[selection[i]]);
      }
    }

    const rows = list.map(n => ({ ...n, ot_status: n.ot_status?.name }));

    //console.log("list --->", list[selection])

    return (
      <div className="fade-in fade-out">
        <Content>
          <Grid cols="12">
            <div className="overlay-wrapper">
              <div className="header">
                <div className="header__left-items">
                  <ContentHeader title="Solicitar" small="Cancelamento de OT" />
                </div>
                <div className="btn-toolbar">
                  <div className="btn-group mr-2"
                    style={{ display: "flex", maxHeight: "30px" }}>
                    {/*Object.keys(filters).length > 0 && (
                <button
                  type="button"
                  className="btn-lg btn-awesome btn-link fade-in filtro-btn pull-left"
                  onClick={() => {
                    clear_filters(auth, ot);
                  }}
                >
                  <i className="fa fa-close" /> LIMPAR
                </button>
                )*/}

                    {!list[selection] && <FastForm
                      auth={auth}
                      handleSubmit={getOtList}
                      filter="codOt"
                      filterName="filters"
                      inputProps={{ placeholder: "Cód. OT" }}
                    />}
                    <button
                      type="button"
                      data-toggle="modal"
                      data-target="#ot"
                      className="btn-lg btn-awesome btn-link fade-in filtro-btn pull-left"
                      onClick={() => { }}
                    >
                      <i className="fa fa-search" />
                    </button>
                  </div>
                </div>
                {/* END FILTRO */}
              </div>
              <DxGrid rows={rows} columns={columns} showBorders>
                <SortingState
                  defaultSorting={[
                    { columnName: grouping_column_name, direction: "desc" }
                  ]}
                />
                <SelectionState
                  selection={selection}
                  onSelectionChange={
                    selection.length === 0
                      ? this.changeSelection
                      : this.changeSelectionReset
                  }
                />
                {/* <PagingState pageSize={10} /> */}
                <GroupingState
                  expandedGroups={expandedGroups}
                  grouping={[
                    { columnName: grouping_column_name },
                    { columnName: "seg_project" }
                  ]}
                  onExpandedGroupsChange={this.onExpandedGroupsChange}
                />
                <IntegratedSorting />
                {/* <IntegratedPaging /> */}
                <IntegratedSelection />
                {/* <FilteringState defaultFilters={[]} /> */}
                {enableFilter && <FilteringState defaultFilters={[]} />}
                {/* <IntegratedFiltering /> */}
                {enableFilter && <IntegratedFiltering />}
                <IntegratedGrouping />
                <VirtualTable height={list?.length * 7} />
                <DragDropProvider />
                <Table />
                <TableColumnResizing defaultColumnWidths={columnWidths} />
                <TableColumnVisibility />
                <TableColumnReordering
                  order={columnOrder}
                  onOrderChange={this.changeColumnOrder}
                />
                <TableHeaderRow showSortingControls cellComponent={this.CellComp} />
                {/* <TableFilterRow /> */}
                {enableFilter && <TableFilterRow />}
                <TableSelection
                  selectByRowClick
                  highlightRow
                  rowComponent={TableRow}
                  cellComponent={MostrarSelecao}
                />
                {/* <PagingPanel /> */}
                <TableGroupRow contentComponent={GroupCellContent} />
                <Toolbar />
                <ToolbarColumn
                  icons={icons}
                  selection={selection}
                  list={list}
                />
                <ColumnChooser />
              </DxGrid>
              <Overlay />
              <Paginator useCase="LISTAR_OT_CANCELAMENTO" />
            </div>
          </Grid>
          <ModalFormOT
            LabelButtonSubmit="FILTRAR"
            handleClickBtnSubmit={() => this.handleFilterOT()}
            tools={
              Object.keys(filters).length > 0 && (
                <button
                  type="button"
                  className="btn-lg btn-awesome btn-link fade-in filtro-btn pull-left"
                  onClick={() => {
                    clear_filters(auth, ot);
                  }}
                >
                  <i className="fa fa-eraser" /> LIMPAR
                </button>
              )
            }
            id="ot"
            title="Filtros"
            dimension="modal-lg"
          >
            <Filter />
          </ModalFormOT>
          <ModalFormOT
            LabelButtonSubmit="Solicitar Cancelamento"
            id="solicitar_cancelamento"
            title="Solicitar Cancelamento de OT"
            dimension="modal-lg"
          >
            <SolicitarCancelamento
              otSelecionadas={otSelected}
              onSubmit={submit => {
                showOverlay();
                const solicitacoes = otSelected.map(ot =>
                  solicitarCancelamento(
                    ot.id,
                    user_id,
                    area_id,
                    submit.remarks,
                    ot.code
                  )
                );
                Promise.all(solicitacoes).then(() => {
                  selection.length = 0;
                  submit.remarks = "";
                  hideOverlay();
                  setTimeout(() => {
                    this.handleGetOtList();
                    window.$("#solicitar_cancelamento").modal("hide");
                  }, 250);
                });
              }}
            />
          </ModalFormOT>
        </Content>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getOtList,
      load_filters,
      clear_list_and_filters,
      change_ot_paginator,
      clear_filters,
      solicitarCancelamento,
      showOverlay,
      hideOverlay
    },
    dispatch
  );
const mapStateToProps = state => ({
  auth: state.auth,
  ot: state.ot,
  overlay: state.overlay,
  user_id: state.auth.user.id,
  area_id: state.auth.user.area_id
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SolicitarCancelamentoOtList)
);
