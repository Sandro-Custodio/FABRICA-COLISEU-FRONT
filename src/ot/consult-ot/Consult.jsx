/* eslint-disable import/no-unresolved */
/* eslint-disable no-shadow */
import React from "react";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  SelectionState,
  SortingState,
  GroupingState,
  FilteringState,
  IntegratedGrouping,
  IntegratedSorting,
  IntegratedFiltering,
  IntegratedSelection,
  RowDetailState
} from "@devexpress/dx-react-grid";
import {
  Grid as DxGrid,
  TableSelection,
  VirtualTable,
  TableHeaderRow,
  TableGroupRow,
  Table,
  DragDropProvider,
  TableColumnReordering,
  Toolbar,
  TableFilterRow,
  TableColumnResizing
} from "@devexpress/dx-react-grid-bootstrap3";
import ReactTooltip from "react-tooltip";
import { IconButton } from "common";
import Paginator from "common/paginator";
import Button from "./Button";
import ContentHeader from "../../common/adminLTE/contentHeader";
import Content from "../../common/adminLTE/content";
import ModalFormOT from "../../common/layout/modal";
import Overlay from "../../common/msg/overlay/overlay";
import Filter from "../filters";
import InserirAnexoOt from "../inserir-anexo-arquivo/formInserirArquivoOt";
import VisualizarOt from "../visualizar-ot/form-visualizar-ot";
import VisualizarOtSeg from "../visualizar-ot-seg/form-visualizar-ot-seg";
import Radar from "./consultar-radarPossibilidade";
import "../styles.css";
import Grid from "../../common/layout/grid";
import FastForm from "common/FastForm/";
import {
  getOtConsultList,
  load_filters,
  clear_filters,
  clear_list_and_filters,
  change_ot_paginator
} from "../list/actions";
import {
  get_ot_data_radar,
  get_all_by_ot_segmentation_id
} from "../radar-possibilidades/actions";

import get_ot_data from "../visualizar-ot/actions";
import update_object_ot_seg from "../visualizar-ot-seg/actions";
import { get_ot_data_inserir_anexo } from "../inserir-anexo-arquivo/actions";
import { isPermited, logUserMenuAccess } from "../../auth/actions";

const GroupCellContent = ({ row }) => {
  return <span>{row.key}</span>;
};

class Consultant extends React.Component {
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
      enableFilter: false
    };

    this.changeSelection = selection =>
      this.setState({
        selection
      });

    this.changeSelectionReset = selection => {
      this.setState({
        selection: selection.splice(1)
      });
    };

    this.changeColumnOrder = columnOrder => {
      this.setState({ columnOrder });
    };
  }

  componentDidMount() {
    const {
     // ot: { /* list, */ operators },
      load_filters
    } = this.props;

    //if (operators.length === 0) load_filters();
    // if (list.length === 0) this.handlegetOtConsultList();
    load_filters();
  }

  componentWillUnmount() {
    const { clear_list_and_filters, change_ot_paginator } = this.props;
    clear_list_and_filters();
    change_ot_paginator({ currentPage: 1, pageSize: 100 });
  }

  handlegetOtConsultList = () => {
    const { auth, ot, getOtConsultList } = this.props;
    getOtConsultList(auth, ot);
  };

  handleFilterOT = () => {
    this.handlegetOtConsultList();
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
      ot: { list, columns, grouping_column_name, filters },
      user,
      auth,
      ot,
      getOtConsultList,
      clear_filters,
      update_object_ot_seg,
      get_ot_data_inserir_anexo,
      get_ot_data_radar,
      get_all_by_ot_segmentation_id
    } = this.props;
    const { selection, columnOrder, enableFilter, columnWidths } = this.state;

    const rows = list.map(n => ({ ...n, ot_status: n.ot_status?.name }));

    return (
      <div className="fade-in fade-out">
        <Content>
          <Grid cols="12">
            <div className="overlay-wrapper">
              <div className="header">
                <div className="header__left-items">
                  <ContentHeader
                    title="Consultar"
                    small="Ordens de Transmissão"
                  />
                </div>
                <div className="btn-toolbar">
                  <div
                    className="btn-group mr-2"
                    style={{ display: "flex", maxHeight: "30px" }}
                  >
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
                    <FastForm
                      auth={auth}
                      handleSubmit={getOtConsultList}
                      filter="codOt"
                      filterName="filters"
                      inputProps={{ placeholder: "Cód. OT" }}
                    />
                    <button
                      type="button"
                      data-toggle="modal"
                      data-target="#ot"
                      className="btn-lg btn-awesome btn-link fade-in filtro-btn pull-left"
                      onClick={() => {}}
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
                    { columnName: grouping_column_name, direction: "asc" }
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
                <GroupingState
                  grouping={[
                    { columnName: grouping_column_name },
                    { columnName: "seg_project" }
                  ]}
                />
                {enableFilter && <FilteringState defaultFilters={[]} />}
                {enableFilter && <IntegratedFiltering />}
                <IntegratedSorting />
                <IntegratedSelection />
                <IntegratedGrouping />
                <VirtualTable height={list.length * 7} />
                <DragDropProvider />
                <Table />
                <TableColumnResizing defaultColumnWidths={columnWidths} />
                <RowDetailState defaultExpandedRowIds={[1, 2]} expandRowIds />
                <TableColumnReordering
                  order={columnOrder}
                  onOrderChange={this.changeColumnOrder}
                />
                {/* <TableHeaderRow /> */}
                <TableHeaderRow showSortingControls cellComponent={this.CellComp} />
                {enableFilter && <TableFilterRow />}
                <TableSelection selectByRowClick highlightRow />
                <TableGroupRow contentComponent={GroupCellContent} />
                <Toolbar
                  rootComponent={() => {
                    const {
                      ot: { list },
                      get_ot_data
                    } = this.props;
                    const { selection } = this.state;
                    return (
                      <Toolbar.Root>
                        <Grid cols="12">
                          {selection.length === 1 && (
                            <React.Fragment>
                              <button
                                data-for="top_dark_float"
                                data-tip="Visualizar OT"
                                type="button"
                                className="btn-lg btn-link pull-left"
                                data-toggle="modal"
                                data-target="#visualizar"
                                onClick={() =>
                                  get_ot_data(list[selection[0]].code)
                                }
                              >
                                <i
                                  className="fa fa-eye"
                                  data-toggle="tooltip"
                                  title="Visualizar"
                                />
                              </button>
                              {list[selection].solution === "LL" && (
                                <button
                                  data-for="top_dark_float"
                                  data-tip="Radar Possibilidades"
                                  type="button"
                                  className="btn-lg btn-link pull-left"
                                  data-toggle="modal"
                                  data-target="#radar"
                                  onClick={async () => {
                                    await get_ot_data_radar(
                                      list[selection[0]].seg_id
                                    );
                                    get_all_by_ot_segmentation_id(
                                      list[selection[0]].seg_id
                                    );
                                  }}
                                >
                                  <i
                                    className="fa fa-rss"
                                    data-toggle="tooltip"
                                    title="Radar de Possibilidades"
                                  />
                                </button>
                              )}
                              {isPermited(user.permissions, "DR_COA1B1R1") && (
                                <Button
                                  title="Anexar Arquivo"
                                  description="anexar"
                                  onClick={() => {
                                    logUserMenuAccess("DR_COA1B1R1");
                                    get_ot_data_inserir_anexo(
                                      list[selection[0]]
                                    );
                                  }}
                                  icon="paperclip"
                                />
                              )}
                              <button
                                data-for="top_dark_float"
                                data-tip="Visualizar Segmento"
                                type="button"
                                className="btn-lg btn-link pull-left"
                                data-toggle="modal"
                                data-target="#view_seg"
                                onClick={() =>
                                  update_object_ot_seg(
                                    list[selection[0]].seg_id
                                  )
                                }
                              >
                                <i
                                  className="fa fa-window-maximize"
                                  data-toggle="tooltip"
                                  title="Visualizar"
                                />
                              </button>
                            </React.Fragment>
                          )}
                          {/* {selection.length === 1 &&
                            toolBarIcons.map(todo => <IconButton {...todo} />)} */}
                          <ReactTooltip
                            id="top_dark_float"
                            place="top"
                            type="dark"
                            effect="float"
                          />
                        </Grid>
                      </Toolbar.Root>
                    );
                  }}
                />
              </DxGrid>
              <Overlay />
              <Paginator useCase="CONSULTAR_OT" />
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
            LabelButtonSubmit="Visualizar OT"
            id="visualizar"
            title="Visualizar OT"
            dimension="modal-lg"
          >
            <VisualizarOt />
          </ModalFormOT>
          <ModalFormOT
            LabelButtonSubmit="Radar de Possibilidades"
            id="radar"
            title="Radar de Possibilidades"
            dimension="modal-lg"
          >
            <Radar selection={selection} list={list} />
          </ModalFormOT>
          <ModalFormOT
            LabelButtonSubmit="Anexar OT"
            id="anexar"
            title="Múltiplos Anexos do Segmento"
            dimension="modal-lg"
          >
            <InserirAnexoOt />
          </ModalFormOT>
          <ModalFormOT
            LabelButtonSubmit="Visualizar Segmento"
            id="view_seg"
            title="Visualizar Segmento"
            dimension="modal-lg"
          >
            <VisualizarOtSeg />
          </ModalFormOT>
        </Content>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getOtConsultList,
      load_filters,
      clear_list_and_filters,
      get_ot_data,
      clear_filters,
      change_ot_paginator,
      update_object_ot_seg,
      get_ot_data_inserir_anexo,
      get_ot_data_radar,
      get_all_by_ot_segmentation_id
    },
    dispatch
  );
const mapStateToProps = state => ({
  auth: state.auth,
  user: state.auth.user,
  ot: state.ot,
  overlay: state.overlay
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Consultant)
);