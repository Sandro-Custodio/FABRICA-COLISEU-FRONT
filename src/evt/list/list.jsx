import { Container, Panel } from "../comps";
import { columnWidths, columns } from "./columns.json";
import { getEvtList, getFilterList } from "./actions";

import Header from "./header";
import Overlay from "../../common/msg/overlay/overlay";
import Paginator from "common/paginator";
import React from "react";
import { Table } from "common";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const ListEvt = ({ getEvtList, evtsReducer }) => {
  const [selection, onSelectionChange] = React.useState([]);
  const [evtStatusList, setEvtStatusList] = React.useState([]);
  const [provedorList, setProvedorList] = React.useState([]);
  const [projetoList, setProjetoList] = React.useState([]);
  const [otList, setOtList] = React.useState([]);
  const [filters, onFiltersChange] = React.useState([]);

  const makeRequest = filter => {
    const pageSize = evtsReducer.paginator.pageSize;
    const currentPage = evtsReducer.paginator.currentPage;
    getEvtList(filter, pageSize, currentPage);
  };

  React.useEffect(() => {
    getFilterList().then(res => {
      setEvtStatusList(
        res.data[0].map(r => ({
          evtStatus: r.description,
          evtStatusId: r.id
        }))
      );
      setProvedorList(
        res.data[1].map(r => ({
          provedor: r.name,
          provedorId: r.id
        }))
      );
      setProjetoList(
        res.data[2].map(r => ({
          projeto: r.name,
          projetoId: r.id
        }))
      );
      setOtList(
        res.data[3].map(r => ({
          otStatus: r.description,
          otStatusId: r.id
        }))
      );
    });
  }, []);

  return (
    <Container title="Listar EVT">
      <div className="overlay-wrapper">
        <Overlay />
        <Panel
          header={
            <Header
              selection={selection}
              columns={columns}
              rows={evtsReducer.rows}
              rowsView={evtsReducer.rows_view}
              evtStatusList={evtStatusList}
              provedorList={provedorList}
              projetoList={projetoList}
              otList={otList}
              makeRequest={makeRequest}
            />
          }
        >
          <Table
            disablePagination
            total={evtsReducer.quantidade_total_registros}
            columns={columns}
            columnWidths={columnWidths}
            rows={evtsReducer.rows}
            filterProps={{ filters, onFiltersChange }}
            selectionProps={{ selection, onSelectionChange }}
          />

          <Paginator useCase="LISTAR_EVT" />
        </Panel>
      </div>
    </Container>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getEvtList,
      getFilterList
    },
    dispatch
  );
const mapStateToProps = state => ({
  evtsReducer: state.evt
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ListEvt)
);
