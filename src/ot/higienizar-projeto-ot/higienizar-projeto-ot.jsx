/* eslint-disable import/no-unresolved */
/* eslint-disable no-shadow */
import React from "react";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  SelectionState,
  SortingState,
  PagingState,
  FilteringState,
  IntegratedPaging,
  IntegratedSorting,
  IntegratedFiltering,
  IntegratedSelection
} from "@devexpress/dx-react-grid";
import {
  Grid as DxGrid,
  TableSelection,
  VirtualTable,
  TableHeaderRow,
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
import ToolbarColumn from "./listComponents/toolBarColumn";
import Grid from "../../common/layout/grid";
import Filter from "./projeto-ot-filters";
import Paginator from "common/paginator";

import {
  loadFieldsOtForm,
  get_ots,
  set_ot_project_multi,
  load_filters,
  clear_filters
} from "./actions";
import EditarProjeto from "./editar-projeto-form";

class LeasedlinesList extends React.Component {
  constructor(props) {
    super(props);
    const {
      listarOtHigienizar: { columns }
    } = props;

    this.state = {
      selection: [],
      columnOrder: columns.map(n => n.name),
      expandedGroups: [],
      icons: []
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
    const {
      listarOtHigienizar: { higienizar_ot_list, operators },
      load_filters
    } = this.props;
    if (operators.length === 0) load_filters();
    if (higienizar_ot_list.length === 0) this.handleGetOtList();
  }

  handleGetOtList = (multi = false) => {
    const { auth, listarOtHigienizar, get_ots } = this.props;
    get_ots(auth, listarOtHigienizar, multi);
  };

  handleFilter = () => {
    this.handleGetOtList(true);
  };

  render() {
    const {
      listarOtHigienizar: {
        higienizar_ot_list,
        columns,
        columnsWidth,
        grouping_column_name,
        filters
      }
    } = this.props;
    const { auth, listarOtHigienizar, set_ot_project_multi } = this.props;
    const { clear_filters } = this.props;
    const { selection, columnOrder } = this.state;

    return (
      <div className="fade-in fade-out">
        <Content>
          <Grid cols="12">
            <div className="overlay-wrapper">
              <div className="header">
                <div className="header__left-items">
                  <ContentHeader title="Listar" small="OTs" />
                </div>
                <div className="btn-toolbar">
                  <div className="btn-group mr-2">
                    {/*Object.keys(filters).length > 0 && (
                <button
                  type="button"
                  className="btn-lg btn-awesome btn-link fade-in filtro-btn pull-left"
                  onClick={() => {
                    clear_filters(auth, listarOtHigienizar);
                  }}
                >
                  <i className="fa fa-close" /> LIMPAR
                </button>
                )*/}
                    <button
                      type="button"
                      data-toggle="modal"
                      data-target="#projeto_ot_filtro"
                      className="btn-lg btn-awesome btn-link fade-in filtro-btn pull-left"
                      onClick={() => {}}
                    >
                      <i className="fa fa-search" />
                    </button>
                  </div>
                </div>
                {/* END FILTRO */}
              </div>
              <DxGrid rows={higienizar_ot_list} columns={columns} showBorders>
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
                <PagingState pageSize={100} />
                <IntegratedSorting />
                <IntegratedSelection />
                <FilteringState defaultFilters={[]} />
                <IntegratedFiltering />
                <IntegratedPaging />
                <VirtualTable />
                <DragDropProvider />
                <Table />
                <TableColumnResizing
                  defaultColumnWidths={columnsWidth}
                />
                <TableColumnVisibility />
                <TableColumnReordering
                  order={columnOrder}
                  onOrderChange={this.changeColumnOrder}
                />
                <TableHeaderRow showSortingControls />
                <TableFilterRow />
                <TableSelection selectByRowClick highlightRow showSelectAll />
               {/*  <PagingPanel /> */}
                <Toolbar />
                <ToolbarColumn
                  selection={selection}
                  higienizar_ot_list={higienizar_ot_list}
                  set_ot_project_multi={set_ot_project_multi}
                  // loadFieldsOtForm={loadFieldsOtForm}
                  // higienizar_ot_list={higienizar_ot_list}
                />
                <ColumnChooser />
              </DxGrid>
              <Overlay />
              <Paginator useCase="HIGIE_PROJETOS" />
            </div>
          </Grid>
          <ModalFormOT
            LabelButtonSubmit="FILTRAR"
            handleClickBtnSubmit={() => this.handleFilter()}
            tools={
              Object.keys(filters).length > 0 && (
                <button
                  type="button"
                  className="btn-lg btn-awesome btn-link fade-in filtro-btn pull-left"
                  onClick={() => {
                    clear_filters(auth, listarOtHigienizar);
                  }}
                >
                  <i className="fa fa-eraser" /> LIMPAR
                </button>
              )
            }
            id="projeto_ot_filtro"
            title="Filtros"
            dimension="modal-sm"
          >
            <Filter />
          </ModalFormOT>
          <ModalFormOT
            LabelButtonSubmit="Editar Projeto"
            // handleClickBtnSubmit={ () => set_ot_project_multi(higienizar_ot_list,selection)}
            id="editar_projeto_ot"
            title="Editar Projeto da OT"
            dimension="modal-sm"
            height="16vw"
          >
            <EditarProjeto selection={selection} />
          </ModalFormOT>
        </Content>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      get_ots,
      loadFieldsOtForm,
      set_ot_project_multi,
      load_filters,
      clear_filters
    },
    dispatch
  );
const mapStateToProps = state => ({
  auth: state.auth,
  listarOtHigienizar: state.listarOtHigienizar,
  overlay: state.overlay
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LeasedlinesList)
);
