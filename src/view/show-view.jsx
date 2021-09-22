import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  SortingState,
  FilteringState,
  IntegratedSorting,
  IntegratedFiltering,
  DataTypeProvider
} from "@devexpress/dx-react-grid";
import {
  Grid as DxGrid,
  VirtualTable,
  TableHeaderRow,
  Table,
  DragDropProvider,
  TableColumnReordering,
  TableFilterRow
} from "@devexpress/dx-react-grid-bootstrap3";
import ReactTooltip from "react-tooltip";
import ContentHeader from "../common/adminLTE/contentHeader";
import Content from "../common/adminLTE/content";
import Overlay from "../common/msg/overlay/overlay";

import { getViewsList, download } from "./actions";

const ButtonFormatter = ({ value }) => (
  <React.Fragment>
    <button
      type="button"
      data-for="download-view-button"
      data-tip={value}
      className="btn btn-secondary"
      onClick={() => download(value)}
    >
      <i className="fa fa-cloud-download" />
    </button>
    <ReactTooltip
      id="download-view-button"
      place="right"
      type="dark"
      effect="solid"
    />
  </React.Fragment>
);

const ButtonProvider = props => (
  <DataTypeProvider formatterComponent={ButtonFormatter} {...props} />
);

class ShowView extends Component {
  constructor(props) {
    super(props);

    const { view } = props;

    this.state = {
      columnOrder: view.columns.map(n => n.name)
    };

    this.changeColumnOrder = columnOrder => {
      this.setState({ columnOrder });
    };
  }

  componentDidMount() {
    this.handleGetViewsList();
  }

  handleGetViewsList = () => {
    const { auth, getViewsList } = this.props;
    getViewsList(auth.user.id);
  };

  render() {
    const {
      view: { list, columns, grouping_column_name, buttonColumns }
    } = this.props;
    const { columnOrder } = this.state;
    return (
      <div className="fade-in fade-out" width="device-width">
        <ContentHeader title="Views" small="Lista de Views" />
        <Content>
          <div className="overlay-wrapper">
            <DxGrid rows={list} columns={columns} showBorders>
              <ButtonProvider for={buttonColumns} />
              <SortingState
                defaultSorting={[
                  { columnName: grouping_column_name, direction: "asc" }
                ]}
              />
              <FilteringState defaultFilters={[]} />
              <IntegratedFiltering />
              <IntegratedSorting />
              <VirtualTable height={list.legth * 7} />
              <DragDropProvider />
              <Table />
              <TableColumnReordering
                order={columnOrder}
                onOrderChange={this.changeColumnOrder}
              />
              <TableHeaderRow />
              <TableFilterRow />
            </DxGrid>
            <Overlay />
          </div>
        </Content>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getViewsList, download }, dispatch);
const mapStateToProps = state => ({
  auth: state.auth,
  view: state.view,
  overlay: state.overlay
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowView);
