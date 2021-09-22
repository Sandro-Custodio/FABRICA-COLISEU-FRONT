/* eslint-disable import/no-unresolved */
/* eslint-disable no-shadow */
import * as React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  SelectionState,
  SortingState,
  GroupingState,
  PagingState,
  IntegratedPaging,
  IntegratedGrouping,
  IntegratedSorting,
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
  TableColumnReordering
} from "@devexpress/dx-react-grid-bootstrap3";

import "../../ot/styles.css";

import { getOtList, load_filters, clear_filters } from "../../ot/list/actions";
import get_ot_data from "../../ot/visualizar-ot/actions";
import update_object_ot_seg from "../../ot/visualizar-ot-seg/actions";
import Content from "../../common/adminLTE/content";
import Overlay from "../../common/msg/overlay/overlay";
import Grid from "../../common/layout/grid";
import LicceuOTReportBar from "../licceuComponents/chart/licceuOTReportBar";
import LicceuOTReportPie from "../licceuComponents/chart/licceuOTReportPie";
import { Box, Row, Col } from "../licceuComponents/ui";
import {
  LicceuOTReportDonutOt,
  LicceuOTReportDonutEVT,
  LicceuOTReportDonutOD,
  LicceuOTReportDonutSD
} from "../licceuComponents/chart/licceuOTReportDonut";
import "../licceu.css";

const GroupCellContent = ({ row }) => {
  return <span>{row.key}</span>;
};

class LicceuOTReport extends React.Component {
  constructor(props) {
    super(props);

    const {
      ot: { columns }
    } = props;

    this.state = {
      selection: [],
      columnOrder: columns.map(n => n.name)
    };

    this.changeSelection = selection =>
      this.setState({
        selection
      });
    this.changeColumnOrder = columnOrder => {
      this.setState({ columnOrder });
    };
  }

  componentDidMount() {
    const { load_filters } = this.props;
    load_filters();
    this.handleGetOtList();
  }

  handleGetOtList = () => {
    const { auth, ot, getOtList } = this.props;
    getOtList(auth, ot);
  };

  handleFilterOT = () => {
    this.handleGetOtList();
  };

  render() {
    const {
      ot: { list, columns, grouping_column_name }
    } = this.props;
    const { selection, columnOrder } = this.state;

    return (
      <div className="fade-in fade-out">
        <Content>
          <Row>
            <Col sm="12" md="8" xs="8">
              <Box color="danger">
                <LicceuOTReportBar />
              </Box>
            </Col>
            <Col sm="12" md="4" xs="4">
              <Box color="danger">
                <LicceuOTReportPie />
              </Box>
            </Col>
          </Row>
        </Content>

        <Content>
          <Row>
            <Col sm="12" md="3" xs="3">
              <Box color="danger">
                <LicceuOTReportDonutOt />
              </Box>
            </Col>
            <Col sm="12" md="3" xs="3">
              <Box color="danger">
                <LicceuOTReportDonutEVT />
              </Box>
            </Col>

            <Col sm="12" md="3" xs="3">
              <Box color="danger">
                <LicceuOTReportDonutOD />
              </Box>
            </Col>
            <Col sm="12" md="3" xs="3">
              <Box color="danger">
                <LicceuOTReportDonutSD />
              </Box>
            </Col>
          </Row>
        </Content>

        <Content>
          <Grid cols="0">
            <div className="overlay-wrapper">
              <DxGrid rows={list} columns={columns} showBorders>
                <SortingState
                  defaultSorting={[
                    { columnName: grouping_column_name, direction: "asc" }
                  ]}
                />
                <SelectionState
                  selection={selection}
                  onSelectionChange={this.changeSelection}
                />
                <PagingState pageSize={30} />
                <GroupingState
                  grouping={[
                    { columnName: grouping_column_name },
                    { columnName: "seg_project" }
                  ]}
                />
                <IntegratedSorting />
                <IntegratedPaging />
                <IntegratedSelection />
                <IntegratedGrouping />
                <VirtualTable height={list.legth * 7} />
                <DragDropProvider />
                <Table />
                <TableColumnReordering
                  order={columnOrder}
                  onOrderChange={this.changeColumnOrder}
                />
                <TableHeaderRow />
                <TableSelection selectByRowClick highlightRow showSelectAll />
                <PagingPanel />
                <TableGroupRow contentComponent={GroupCellContent} />
              </DxGrid>
              <Overlay />
            </div>
          </Grid>
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
      get_ot_data,
      clear_filters,
      update_object_ot_seg
    },
    dispatch
  );
const mapStateToProps = state => ({
  auth: state.auth,
  ot: state.ot,
  overlay: state.overlay
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LicceuOTReport);
