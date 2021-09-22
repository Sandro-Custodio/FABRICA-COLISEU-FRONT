/* eslint-disable no-restricted-globals */
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
  IntegratedSelection
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
  TableColumnVisibility,
  ColumnChooser,
  TableColumnResizing
} from "@devexpress/dx-react-grid-bootstrap3";
import { IconButton } from "common";
import { dispatchSegmentarData, setOverlay } from "ot/segmentar-ot/actions";
import SegmentarOt from "ot/segmentar-ot/segmentar-ot";
import Paginator from "common/paginator";
import ContentHeader from "../../common/adminLTE/contentHeader";
import Content from "../../common/adminLTE/content";
import ModalFormOT from "../../common/layout/modal";
import Overlay from "../../common/msg/overlay/overlay";
import Filter from "../filters";
import VisualizarOt from "../visualizar-ot/form-visualizar-ot";
import VisualizarOtSeg from "../visualizar-ot-seg/form-visualizar-ot-seg";
import EncaminharSegmento from "../encaminhar-ot-seg/form-encaminhar-ot-seg";
import EncaminharMultiplosSegs from "../encaminhar-ot-seg/encaminhar-multiplos-ot-seg";
import RadarPossibilidades from "../radar-possibilidades/radar-form";
import GerarFormulario from "ot/gerar-formulario/index";
import "../styles.css";
import Grid from "../../common/layout/grid";
import FastForm from "common/FastForm/";
import {
  getOtList,
  change_ot_paginator,
  load_filters,
  clear_filters,
  clear_filter,
  clear_list_and_filters
} from "./actions";
import get_ot_data from "../visualizar-ot/actions";
import update_object_ot_seg from "../visualizar-ot-seg/actions";
import update_object_ot_seg_forward, {
  get_ot_auxiliar_tables,
  edit_segmentation
} from "../encaminhar-ot-seg/actions";
import {
  get_ot_data_radar,
  get_all_by_ot_segmentation_id,
  sendRequestOff
} from "../radar-possibilidades/actions";
import ToolbarColumn from "./listComponents/toolBarColumn";
import InserirAnexoOt from "../inserir-anexo-arquivo/formInserirArquivoOt";
import {
  get_ot_data_inserir_anexo,
  deleteAnexo
} from "../inserir-anexo-arquivo/actions";
import { filter_segments } from "../gerar-formulario/actions";

const GroupCellContent = ({ row }) => {
  return <span>{row.key}</span>;
};

class List extends React.Component {
  constructor(props) {
    super(props);
    const {
      ot: { columns }
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
    const { load_filters } = this.props;

    load_filters();
    // if (list.length === 0) this.handleGetOtList();
  }

  componentWillUnmount() {
    const { clear_list_and_filters, change_ot_paginator } = this.props;
    clear_list_and_filters();
    change_ot_paginator({ currentPage: 1, pageSize: 100 });
  }

  handleReset = () => this.setState({ selection: [] });

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
      ot: { list, columns, defaultColumnWidths, grouping_column_name, filters },
      auth,
      ot,
      getOtList,
      clear_filters,
      clear_filter,
      update_object_ot_seg,
      update_object_ot_seg_forward,
      get_ot_data,
      get_ot_auxiliar_tables,
      edit_segmentation,
      get_ot_data_inserir_anexo,
      get_ot_data_radar,
      get_all_by_ot_segmentation_id,
      dispatchSegmentarData,
      setOverlay,
      filter_segments
    } = this.props;
    const {
      selection,
      columnOrder,
      expandedGroups,
      icons,
      enableFilter
    } = this.state;

    const rows = list.map(n => ({ ...n, ot_status: n.ot_status?.name }));
    return (
      <div className="fade-in fade-out">
        <Content>
          <Grid cols="12">
            <div className="overlay-wrapper" id="ot-list">
              <div className="header">
                <div className="header__left-items">
                  <ContentHeader title="Listar" small="Ordens de Transmissão" />
                </div>
                <div className="btn-toolbar">
                  <div
                    className="btn-group mr-2"
                    style={{ display: "flex", maxHeight: "30px" }}
                  >
                    {/* {Object.keys(filters).length > 0 && (
                <button
                  type="button"
                  className="btn-lg btn-awesome btn-link fade-in filtro-btn pull-left"
                  onClick={() => {
                    clear_filters(auth, ot);
                  }}
                >
                  <i className="fa fa-close" /> LIMPAR
                </button>
              )} */}

                    <FastForm
                      auth={auth}
                      handleSubmit={getOtList}
                      filter="codOt"
                      filterName="filters"
                      inputProps={{ placeholder: "Cód. OT" }}
                    />
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
                {/* <PagingState pageSize={paginator.pageSize} /> */}
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
                {enableFilter && <FilteringState defaultFilters={[]} />}
                {enableFilter && <IntegratedFiltering />}
                <IntegratedGrouping />

                <VirtualTable height={list?.length * 7} />
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
                {/* <PagingPanel /> */}
                <TableGroupRow contentComponent={GroupCellContent} />
                <Toolbar />
                <ToolbarColumn
                  icons={icons}
                  selection={selection}
                  list={list}
                  get_ot_data={get_ot_data}
                  get_ot_data_inserir_anexo={get_ot_data_inserir_anexo}
                  update_object_ot_seg={update_object_ot_seg}
                  update_object_ot_seg_forward={update_object_ot_seg_forward}
                  get_ot_auxiliar_tables={get_ot_auxiliar_tables}
                  edit_segmentation={edit_segmentation}
                  getOtList={this.handleGetOtList}
                  handleReset={this.handleReset}
                  get_ot_data_radar={get_ot_data_radar}
                  get_all_by_ot_segmentation_id={get_all_by_ot_segmentation_id}
                  dispatchSegmentarData={dispatchSegmentarData}
                  setOverlay={setOverlay}
                  changeSelection={this.changeSelection}
                  filter_segments={filter_segments}
                />
                <ColumnChooser />
              </DxGrid>
              <Overlay />
              <Paginator useCase="LISTAR_OT" />
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
                    clear_filter();
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
            LabelButtonSubmit="Visualizar Segmento"
            id="view_seg"
            title="Visualizar Segmento"
            dimension="modal-lg"
          >
            <VisualizarOtSeg />
          </ModalFormOT>
          <ModalFormOT
            LabelButtonSubmit="Encaminhar Segmento"
            id="encaminhar_seg"
            title="Encaminhar Segmento"
            dimension="modal-lg"
          >
            <EncaminharSegmento getOtList={getOtList} />
          </ModalFormOT>
          <ModalFormOT
            LabelButtonSubmit="Encaminhar Múltiplos Segmentos"
            id="encaminhar_multiplos_seg"
            title="Encaminhar Múltiplos Segmentos"
            dimension="modal"
          >
            <EncaminharMultiplosSegs
              handleReloadParentPage={() => this.handleGetOtList()}
            />
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
            LabelButtonSubmit=""
            id="segmentar_ot"
            title="Segmentar OT"
            dimension="modal-lg"
          >
            {/* {list && selection && selection.length > 0 &&( */}
            <SegmentarOt
              handleReloadParentPage={() => this.handleGetOtList()}
            />
            {/* )} */}
          </ModalFormOT>
          <ModalFormOT
            LabelButtonSubmit="Radar"
            id="radar_possibilidades"
            title="Radar de Possibilidades"
            dimension="modal-lg"
            tools={
              <>
                <IconButton
                  className="btn-primary"
                  icon="line-chart"
                  data-toggle="modal"
                  data-target="#ped_cotacao"
                  onClick={this.props.sendRequestOff}
                >
                  Novo Pedido
                </IconButton>
              </>
            }
          >
            <RadarPossibilidades selection={selection} list={list} />
          </ModalFormOT>
          <ModalFormOT
            LabelButtonSubmit=" "
            id="gerar_formulario"
            title="Formulário de Contratação"
            dimension="modal"
          >
            {list && selection?.length && (
              <GerarFormulario sel={selection} list={list} />
            )}
          </ModalFormOT>
        </Content>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      change_ot_paginator,
      getOtList,
      load_filters,
      get_ot_data,
      clear_filters,
      clear_filter,
      clear_list_and_filters,
      update_object_ot_seg,
      get_ot_data_inserir_anexo,
      update_object_ot_seg_forward,
      get_ot_auxiliar_tables,
      edit_segmentation,
      deleteAnexo,
      get_ot_data_radar,
      get_all_by_ot_segmentation_id,
      sendRequestOff,
      dispatchSegmentarData,
      setOverlay,
      filter_segments
    },
    dispatch
  );
const mapStateToProps = state => ({
  auth: state.auth,
  ot: state.ot,
  overlay: state.overlay
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(List));