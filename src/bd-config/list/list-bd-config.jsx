import React, { useReducer } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

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
  TableColumnResizing,
  Toolbar,
  TableFilterRow
} from "@devexpress/dx-react-grid-bootstrap3";

import { IconButton } from "common";
import ModalForm from "../../common/layout/modal";
import Content from "../../common/adminLTE/content";
import ContentHeader from "../../common/adminLTE/contentHeader";
import Grid from "../../common/layout/grid";
import Overlay from "../../common/msg/overlay/overlay";
import ToolBarColumn from "../toolBarColumn";
import CadastrarBdConfigVendor from "bd-config/create-bd-config/create-bd-config";
import EditarBdConfigVendor from "bd-config/edit-bd-config/edit-bd-config";

import { get_all_bd_config_vendors, set_bd_config } from "../actions";
import { get_all_vendors_by_area } from "../../vendors/list/actions";

class ListBdConfig extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selection: [],
      enableFilter: false
    };

    this.changeSelection = selection =>
      this.setState({
        selection
      });
  }

  componentDidMount() {
    const {
      bdConfigReducer: { list, columns, vendors},
      get_all_bd_config_vendors,
      get_all_vendors_by_area
    } = this.props;
    if (list.length === 0) get_all_bd_config_vendors();
    if (vendors.length === 0) get_all_vendors_by_area();
  }

  CellComp = ({ children, ...others }) => {
    const {
      bdConfigReducer: { columns }
    } = this.props;
    const { column } = others;
    const { enableFilter } = this.state;

    const firstColumn = columns[0];
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
              onClick={() => this.setState({ enableFilter: !enableFilter })}
              color={enableFilter ? "#337ab7" : "#555"}
            />
          )}
          {children}
        </div>
      </TableHeaderRow.Cell>
    );
  };

  render(){
    const {
      bdConfigReducer: { list, columns, defaultColumnWidths},
      set_bd_config
    } = this.props;

    const {
      selection,
      enableFilter
    } = this.state;

    return (
      <div className="overlay-wrapper">
        <div className="fade-in fade-out">
          <div className="header">
            <div className="header__left-items">
              <ContentHeader title="Listar" small="BD CONFIG" />
            </div>
          </div>
          <div>
            <Content>
              <Grid cols="6">
                <DxGrid rows={list} columns={columns} showBorders>
                  <SortingState/>
                  <SelectionState
                    selection={selection}
                    onSelectionChange={ this.changeSelection }
                  />
                  <IntegratedSorting />
                  <IntegratedSelection />
                  <FilteringState defaultFilters={[]} />
                  {enableFilter && <IntegratedFiltering />}
                  <VirtualTable />
                  <DragDropProvider />
                  <Table />
                  <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
                  <TableHeaderRow
                    showSortingControls
                    cellComponent={this.CellComp}
                  />
                  {enableFilter && <TableFilterRow />}
                  <TableSelection selectByRowClick highlightRow showSelectionColumn={true}/>
                  <Toolbar/>
                  <ToolBarColumn
                    selection={selection}
                    list={list}
                    set_bd_config={set_bd_config}
                  />
                </DxGrid>
              </Grid>
            </Content>
          </div>
        </div>
        <Overlay/>
        <ModalForm
          LabelButtonSubmit="Cadastrar de-para BD Config"
          id="cadastrar_bd_config_vendor"
          title="Cadastrar de-para BD Config"
          dimension="modal-lg"
          height="24vw"
        >
          <CadastrarBdConfigVendor />
        </ModalForm>
        <ModalForm
          LabelButtonSubmit="Editar de-para BD Config"
          id="editar_bd_config_vendor"
          title="Editar de-para BD Config"
          dimension="modal-lg"
          height="24vw"
        >
          <EditarBdConfigVendor />
        </ModalForm>
      </div>
    );
  };
};

const mapDispatchToProps = dispatch =>
bindActionCreators(
  {
    get_all_bd_config_vendors,
    get_all_vendors_by_area,
    set_bd_config
  },
    dispatch
 );

const mapStateToProps = state => ({
  auth: state.auth,
  bdConfigReducer: state.bdConfigReducer
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ListBdConfig)
);
