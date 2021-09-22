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
  TableColumnReordering,
  Toolbar,
  TableFilterRow
} from "@devexpress/dx-react-grid-bootstrap3";

import ModalForm from "../../common/layout/modal";
import Content from "../../common/adminLTE/content";
import ContentHeader from "../../common/adminLTE/contentHeader";
import Grid from "../../common/layout/grid";
import Overlay from "../../common/msg/overlay/overlay";
import ToolBarColumn from "../toolBarColumn";
import CadastrarProvedor from "../create-vendor/create-vendor";
import EditarProvedor from "../edit-vendor/edit-vendor";

import {
  get_all_vendors_by_area,
  get_contracts_by_vendor,
  set_vendor
} from "./actions";

class VendorList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selection: []
    };

    this.changeSelection = selection =>
      this.setState({
        selection
      });
  }

  componentDidMount() {
    const {
      vendorsReducer: { list, columns },
      get_all_vendors_by_area
    } = this.props;
    if (list.length === 0) get_all_vendors_by_area();
  }

  render(){
    const {
      vendorsReducer: { list, columns },
      get_contracts_by_vendor,
      set_vendor
    } = this.props;

    const {
      selection
    } = this.state;

    return (
      <div className="overlay-wrapper">
        <div className="fade-in fade-out">
          <div className="header">
            <div className="header__left-items">
              <ContentHeader title="Listar" small="Provedores" />
            </div>
          </div>
          <div>
            <Content>
              <Grid cols="12">
                <DxGrid rows={list} columns={columns} showBorders>
                  <SortingState/>
                  <SelectionState
                    selection={selection}
                    onSelectionChange={ this.changeSelection }
                  />
                  <FilteringState defaultFilters={[]} />
                  <IntegratedFiltering />
                  <IntegratedSorting />
                  <IntegratedSelection />
                  <VirtualTable />
                  <DragDropProvider />
                  <Table />
                  <TableHeaderRow />
                  <TableSelection selectByRowClick highlightRow showSelectionColumn={false}/>
                  <Toolbar/>
                  <ToolBarColumn
                    selection={selection}
                    list={list}
                    get_contracts_by_vendor={get_contracts_by_vendor}
                    set_vendor={set_vendor}
                  />
                  <TableFilterRow />
                </DxGrid>
              </Grid>
            </Content>
          </div>
        </div>
        <Overlay/>
        <ModalForm
          LabelButtonSubmit="Cadastrar Provedor"
          id="cadastrar_provedor"
          title="Cadastrar Provedor"
          dimension="modal-lg"
          height="38vw"
        >
          <CadastrarProvedor />
        </ModalForm>
        {selection && (
          <ModalForm
            LabelButtonSubmit="Editar Provedor"
            id="editar_provedor"
            title="Editar Provedor"
            dimension="modal-lg"
          >
            <EditarProvedor />
          </ModalForm>
        )}

      </div>
    );
  };
};

const mapDispatchToProps = dispatch =>
bindActionCreators(
  {
    get_all_vendors_by_area,
    get_contracts_by_vendor,
    set_vendor
  },
    dispatch
 );

const mapStateToProps = state => ({
  auth: state.auth,
  vendorsReducer: state.vendorsReducer
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(VendorList)
);
