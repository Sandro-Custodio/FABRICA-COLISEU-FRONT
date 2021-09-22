/* eslint-disable import/no-unresolved */
/* eslint-disable no-shadow */
import React from "react";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  SelectionState,
  SortingState,
  FilteringState,
  IntegratedSorting,
  IntegratedFiltering,
  IntegratedSelection
} from "@devexpress/dx-react-grid";
import {
  Grid as DxGrid,
  TableSelection,
  VirtualTable,
  TableHeaderRow,
  Table,
  DragDropProvider,
  TableColumnReordering,
  Toolbar,
  TableFilterRow,
  TableColumnVisibility,
  ColumnChooser,
  TableColumnResizing
} from "@devexpress/dx-react-grid-bootstrap3";
import Paginator from "common/paginator";
import { ExportExcel, IconButton } from "common";
import AlterarCaracteristicasCircuito from "leasedline/alterar-caracteristicas-circuito/alterar-caracteristicas-circuito";
import ContentHeader from "../../common/adminLTE/contentHeader";
import Content from "../../common/adminLTE/content";
import ModalForm from "../../common/layout/modal";
import Overlay from "../../common/msg/overlay/overlay";
import ToolbarColumn from "./listComponents/toolBarColumn";
import Grid from "../../common/layout/grid";
import FastForm from "common/FastForm/";
import Filter from "./filter";
import VisualizarLl from "../visualizar-ll/form-visualizar-ll";
import VisualizarHistoricoLl from "../visualizar-historico-ll/form-visualizar-historico-ll";
import ListarStopTimes from "../stop-times/list-stop-times";
import AtivarCircuito from "../ativar-circuito/ativar-circuito";

import {
  load_ll_filters,
  clear_filters,
  clear_list_and_filters,
  get_ll_list,
  get_leasedlines_data,
  change_ll_paginator,
  get_all_demand_classifications
} from "./actions";
import get_leasedlines_data_view from "../visualizar-ll/actions";
import { get_history_lls } from "../visualizar-historico-ll/actions";
import { get_stop_times_by_ll } from "../stop-times/actions";

class LeasedlinesList extends React.Component {
  constructor(props) {
    super(props);
    const {
      listarLL: { columns }
    } = props;

    this.state = {
      selection: [],
      columnOrder: columns.map(n => n.name),
      expandedGroups: [],
      icons: [],
      enableFilter: false
    };

    this.changeSelection = selection =>
      this.setState({
        selection
      });

    this.changeSelectionReset = () =>
      this.setState({
        selection: []
      });

    this.changeColumnOrder = columnOrder => {
      this.setState({ columnOrder });
    };

    this.onExpandedGroupsChange = expandedGroups => {
      this.setState({ expandedGroups });
    };
  }

  componentDidMount() {
    const {
      listarLL: { ll_list, operators },
      load_ll_filters
    } = this.props;
    load_ll_filters();
    //if (operators.length === 0) load_ll_filters();
    //if (ll_list.length === 0) this.handleGetLLList();
  }

  componentWillUnmount() {
    const { clear_list_and_filters, change_ll_paginator } = this.props;
    clear_list_and_filters();
    change_ll_paginator({ currentPage: 1, pageSize: 100 });
  }

  handleGetLLList = () => {
    const { auth, listarLL, get_ll_list } = this.props;
    this.changeSelection([]);
    get_ll_list(auth, listarLL);
  };

  handleFilterLL = () => {
    this.handleGetLLList();
  };

  CellComp = ({ children, ...others }) => {
    const { columns } = this.props.listarLL;
    const { column } = others;
    const { enableFilter } = this.state;

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
          {columns[0].name === column.name && (
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
      listarLL: {
        ll_list,
        columns,
        defaultColumnWidths,
        grouping_column_name,
        ll_filters
      }
    } = this.props;
    const { auth, listarLL } = this.props;
    const {
      clear_filters,
      get_ll_list,
      get_leasedlines_data_view,
      get_history_lls,
      get_stop_times_by_ll,
      get_leasedlines_data,
      get_all_demand_classifications
    } = this.props;
    const { selection, columnOrder, enableFilter } = this.state;

    return (
      <div className="fade-in fade-out">
        <Content>
          <Grid cols="12">
            <div className="overlay-wrapper">
              <div className="header">
                <div className="header__left-items">
                  <ContentHeader title="Listar" small="Leasedlines" />
                </div>
                <div className="btn-toolbar">
                  <div
                    className="btn-group mr-2"
                    style={{ display: "flex", maxHeight: "30px" }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <ExportExcel
                        rows={ll_list}
                        columns={columns}
                        name="Export"
                      >
                        <IconButton
                          icon="file-excel-o"
                          title="Export Excel"
                          className="btn-lg btn-awesome btn-link text-success fade-in"
                          iconProps={{
                            style: { color: "green" }
                          }}
                          disabled={!ll_list.length}
                        />
                      </ExportExcel>
                    </div>
                    {/* {Object.keys(ll_filters).length > 0 && (
                <button
                  type="button"
                  className="btn-lg btn-awesome btn-link fade-in filtro-btn pull-left"
                  onClick={() => {
                    clear_filters(auth, listarLL);
                  }}
                >
                  <i className="fa fa-close" /> LIMPAR
                </button>
              )} */}
                    <FastForm
                      auth={auth}
                      handleSubmit={get_ll_list}
                      filter="ot_code"
                      filterName="ll_filters"
                      inputProps={{ placeholder: "Cód. OT" }}
                    />
                    <button
                      type="button"
                      data-toggle="modal"
                      data-target="#ll_filtro"
                      className="btn-lg btn-awesome btn-link fade-in filtro-btn pull-left"
                      onClick={() => { }}
                    >
                      <i className="fa fa-search" />
                    </button>
                  </div>
                </div>
                {/* END FILTRO */}
              </div>
              <DxGrid rows={ll_list} columns={columns} showBorders>
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
                <IntegratedSorting />
                <IntegratedSelection />
                {enableFilter && <FilteringState defaultFilters={[]} />}
                {enableFilter && <IntegratedFiltering />}
                <VirtualTable height={ll_list.length * 7} />
                <DragDropProvider />
                <Table />
                <TableColumnResizing
                  defaultColumnWidths={defaultColumnWidths}
                />
                <TableColumnVisibility />
                <TableColumnReordering
                  order={columnOrder}
                  onOrderChange={this.changeColumnOrder}
                />
                <TableHeaderRow
                  showSortingControls
                  cellComponent={this.CellComp}
                />
                {enableFilter && <TableFilterRow />}
                <TableSelection selectByRowClick highlightRow />
                <Toolbar />
                <ToolbarColumn
                  selection={selection}
                  ll_list={ll_list}
                  get_leasedlines_data_view={get_leasedlines_data_view}
                  get_history_lls={get_history_lls}
                  get_stop_times_by_ll={get_stop_times_by_ll}
                  get_leasedlines_data={get_leasedlines_data}
                  get_all_demand_classifications={get_all_demand_classifications}
                />
                <ColumnChooser />
              </DxGrid>
              <Overlay />
              <Paginator useCase="LISTAR_LL" />
            </div>
          </Grid>
          <ModalForm
            LabelButtonSubmit="FILTRAR"
            handleClickBtnSubmit={() => this.handleGetLLList()}
            id="ll_filtro"
            tools={
              Object.keys(ll_filters).length > 0 && (
                <button
                  type="button"
                  className="btn-lg btn-awesome btn-link fade-in filtro-btn pull-left"
                  onClick={() => {
                    clear_filters(auth, listarLL);
                  }}
                >
                  <i className="fa fa-eraser" />
                  LIMPAR
                </button>
              )
            }
            title="Filtros"
            dimension="modal-lg"
          >
            <Filter />
          </ModalForm>
          <ModalForm
            LabelButtonSubmit="Visualizar LL"
            id="visualizar_ll"
            title="Visualizar LL"
            dimension="modal-lg"
          >
            <VisualizarLl />
          </ModalForm>
          <ModalForm
            LabelButtonSubmit="Visualizar Histórico LL"
            id="visualizar_hist_ll"
            title="Visualizar Histórico LL"
            dimension="modal-lg"
          >
            <VisualizarHistoricoLl />
          </ModalForm>
          <ModalForm
            LabelButtonSubmit="Ativar Circuito"
            id="ativar_circuito"
            title="Ativar Circuito"
            dimension="modal-lg"
            height="60vw"
          >
            {ll_list && selection && (
              <AtivarCircuito ll={ll_list[selection[0]]} />
            )}
          </ModalForm>
          <ModalForm
            LabelButtonSubmit="Listar Stop Times"
            id="stop-times"
            title="Listar Stop Times"
            dimension="modal-lg"
            height="38vw"
          >
            {ll_list && selection && (
              <ListarStopTimes ll_id={ll_list[selection[0]]} parent_id={""} />
            )}
          </ModalForm>
          <ModalForm
            LabelButtonSubmit=" "
            id="alterar-caracteristicas-circuito"
            title="Alterar Características do Circuito com Valores"
            dimension="modal-lg"
            height="65vw"
          >
            {ll_list && selection && (
              <AlterarCaracteristicasCircuito
                ll={ll_list[selection[0]]}
                reloadParent={() => this.handleGetLLList()}
              />
            )}
          </ModalForm>
        </Content>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      change_ll_paginator,
      get_ll_list,
      load_ll_filters,
      clear_filters,
      clear_list_and_filters,
      get_leasedlines_data_view,
      get_history_lls,
      get_stop_times_by_ll,
      get_leasedlines_data,
      get_all_demand_classifications
    },
    dispatch
  );
const mapStateToProps = state => ({
  auth: state.auth,
  listarLL: state.listarLL,
  overlay: state.overlay
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LeasedlinesList)
);
