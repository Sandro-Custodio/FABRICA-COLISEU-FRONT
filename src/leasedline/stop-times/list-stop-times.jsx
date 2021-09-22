import React from "react";
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
import ToolbarColumn from "../stop-times/toolBarColumn";

import CadastrarStopTimes from "../stop-times/create-stop-times";
import EditarStopTimes from "../stop-times/edit-stop-times";

class StopTimesList extends React.Component {
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

  componentDidUpdate(prevProps, prevState){
    if(prevProps.stopTimesReducer.list != this.props.stopTimesReducer.list){
      if(prevState.selection && prevState.selection.length > 0){
        this.setState({selection: []});
      }
    }
  }

  CellComp = ({ children, ...others }) => {
    const {
      stopTimesReducer: { columns }
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
      stopTimesReducer: { list, columns, defaultColumnWidths},
      ll_id,
      parent_id
    } = this.props;

    const {
      selection,
      enableFilter
    } = this.state;

    return (
      <div className="overlay-wrapper">
        <div className="fade-in fade-out">
          <div className="body">
            <DxGrid rows={list} columns={columns} showBorders rootComponent={Root}>
              <SortingState/>
              <SelectionState
                selection={selection}
                onSelectionChange={ this.changeSelection }
              />
              <IntegratedSorting />
              <IntegratedSelection />
              <FilteringState defaultFilters={[]} />
              {enableFilter && <IntegratedFiltering />}
              <VirtualTable height="auto"/>
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
              <ToolbarColumn
                list={list}
                selection={selection}
                ll={ll_id}
                parent_id={parent_id}
              />
            </DxGrid>
          </div>
        </div>
        <Overlay/>
        <ModalForm
          LabelButtonSubmit="Cadastrar Stop-Times"
          id={"cadastrar_stop_times"+parent_id}
          title="Cadastrar Stop-Times"
          dimension="modal-lg"
          height="26vw"
        >
          <CadastrarStopTimes
            ll_id={ll_id}
            parent_id={parent_id}
          />
        </ModalForm>
        <ModalForm
          LabelButtonSubmit="Editar Stop-Times"
          id={"editar_stop_times"+parent_id}
          title="Editar Stop-Times"
          dimension="modal-lg"
          height="26vw"
        >
          <EditarStopTimes
            stop_time={list[selection[0]]}
            parent_id={parent_id}
          />
        </ModalForm>
      </div>
    );
  };
};

const Root = props => <DxGrid.Root {...props} style={{ height: '32vw' }} />;

const mapDispatchToProps = dispatch =>
bindActionCreators(
  {},
    dispatch
 );

const mapStateToProps = state => ({
  auth: state.auth,
  stopTimesReducer: state.stopTimesReducer
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(StopTimesList)
);
