import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { Field, reduxForm } from "redux-form";

import {
  Grid as DxGrid,
  TableRowDetail,
  TableHeaderRow,
  Table,
  Toolbar,
  TableFilterRow,
  TableColumnResizing,
  TableSelection
} from "@devexpress/dx-react-grid-bootstrap3";
import {
  SortingState,
  FilteringState,
  IntegratedSorting,
  IntegratedFiltering,
  RowDetailState,
  SelectionState
} from "@devexpress/dx-react-grid";

import Overlay from "../../../common/msg/overlay/overlay";
import LicceuToolbarColumn from "./licceuFOComponents/licceuToolBarColumn";
import { columnsDetails, defaultWidthColumnsDetails } from "./api.json";
import {
  postFilter,
  getAnelData,
  getAllStation_cities,
  getFoList,
  getRingFromCircuit,
  cleanIdCircuitRedirect,
  getSiglas
} from "./actions";

import ContentHeader from "../../../common/adminLTE/contentHeader";
import Content from "../../../common/adminLTE/content";
import Grid from "../../../common/layout/grid";
import Pagination from "./licceuFOComponents/Pagination";
// import ModalFormFO from "../../../common/layout/modal";
import ModalFo from "./licceuFOComponents/modalFo";
import LicceuOpenFilter from "./licceuFOComponents/licceuOpenFilter";

const GridDetailContainer = ({ row }) => {
  return (
    <div style={{ margin: 5 }}>
      <DxGrid rows={row.elementos} columns={columnsDetails}>
        <SortingState
          defaultSorting={[{ columnName: "fo_id", direction: "asc" }]}
        />
        <FilteringState defaultFilters={[]} />
        <IntegratedSorting />
        <IntegratedFiltering />
        <Table />
        <TableColumnResizing defaultColumnWidths={defaultWidthColumnsDetails} />
        <TableHeaderRow showSortingControls />
        <TableFilterRow />
      </DxGrid>
    </div>
  );
};

const ReduxGridDetailContainer = connect(state => state)(GridDetailContainer);

class LicceuListarFO extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selection: [],
      objLinha: {}
    };
  }

  componentDidMount() {
    const {
      getAnelData,
      getAllStation_cities,
      getFoList,
      getRingFromCircuit,
      getSiglas,
      listarFO: { idCircuitFromRedirect }
    } = this.props;

    if (idCircuitFromRedirect !== -1) {
      getRingFromCircuit(idCircuitFromRedirect);
      getAllStation_cities();
      getAnelData();
      getSiglas(1, 100);
    } else {
      getFoList();
      getAllStation_cities();
      getAnelData();
      getSiglas(1, 100);
    }
  }

  componentWillUnmount() {
    const { cleanIdCircuitRedirect } = this.props;
    cleanIdCircuitRedirect();
  }

  changeSelectionFunction(selectedRowId) {
    const {
      listarFO: { list }
    } = this.props;

    const numLinha =
      selectedRowId.length > 1 ? selectedRowId[1] : selectedRowId[0];
    const objLinhaSelecionada =
      numLinha !== undefined ? list[numLinha] : undefined;
    this.setState({ objLinha: objLinhaSelecionada });

    // const id = selectedRowId.length > 1 ? selectedRowId[1] : selectedRowId[0];
    // const objLinhaSelecionada = list[id];
    // this.setState({ objLinha: objLinhaSelecionada });
  }

  render() {
    const {
      // auth,
      listarFO: {
        page,
        limit,
        list,
        columns,
        grouping_column_name,
        defaultColumnWidths,
        idCircuitFromRedirect
      },
      auth: { user },
      postFilter,
      history
    } = this.props;

    const { selection, objLinha } = this.state;

    return (
      <div className="fade-in fade-out">
        <div className="header">
          <div className="header__left-items">
            <ContentHeader title="Listar" small="Licceu Anel" />
          </div>
        </div>
        <Content>
          <Grid cols="12">
            <div className="overlay-wrapper">
              <DxGrid rows={list} columns={columns} showBorders>
                <SortingState
                  defaultSorting={[{ columnName: grouping_column_name }]}
                />
                <FilteringState defaultFilters={[]} />

                <IntegratedSorting />
                <IntegratedFiltering />

                <RowDetailState />

                <SelectionState
                  selection={selection}
                  onSelectionChange={numRow => {
                    this.setState({
                      selection:
                        numRow.length > 1 ? [numRow[numRow.length - 1]] : numRow
                    });
                    this.changeSelectionFunction(numRow);
                  }}
                />

                <Table />

                <TableSelection
                  selectByRowClick
                  highlightRow
                  showSelectionColumn={false}
                />

                <TableColumnResizing
                  defaultColumnWidths={defaultColumnWidths}
                />
                <TableHeaderRow showSortingControls />
                <TableFilterRow />
                <TableRowDetail contentComponent={ReduxGridDetailContainer} />

                <Toolbar />
                <LicceuToolbarColumn
                  selection={selection}
                  linhaSelecionada={objLinha}
                  userId={user}
                  clearSelectionRow={() => this.setState({ selection: [] })}
                  historyNavigation={history}
                >
                  <FastForm
                    onSubmit={submit => {
                      postFilter("licceu_fo_rings/get_filtered_rings", {
                        filtros: submit,
                        pagina: page,
                        limite: limit
                      });
                    }}
                  />
                </LicceuToolbarColumn>
              </DxGrid>
              <Overlay />
            </div>
            {idCircuitFromRedirect === -1 && <Pagination />}
          </Grid>
        </Content>
        <ModalFo
          LabelButtonSubmit="Abrir Filtro"
          id="licceuOpenFilter"
          title="Filtro Listar FO"
          dimension="modal-lg"
        >
          <LicceuOpenFilter
            onSubmit={submit => {
              postFilter("licceu_fo_rings/get_filtered_rings", {
                filtros: submit,
                pagina: page,
                limite: limit
              });
              window.$("#licceuOpenFilter").modal("hide");
            }}
          />
        </ModalFo>
      </div>
    );
  }
}

let FastForm = ({ handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <div className="input-group input-group-sm">
      <Field
        className="form-control input-sm"
        type="text"
        name="id_licceu"
        value="id_licceu"
        component="input"
      />

      <span className="input-group-btn">
        <button
          type="submit"
          className="btn btn-primary btn-flat"
          data-toggle="tooltip"
          title="Busca Rápida"
        >
          <i className="fa fa-fast-forward" aria-hidden="true" />
        </button>
      </span>
    </div>
  </form>
);

FastForm = reduxForm({
  // a unique name for the form
  form: "fastForm"
})(FastForm);

const mapStateToProps = state => ({
  auth: state.auth,
  listarFO: state.listarFO,
  overlay: state.overlay
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      postFilter,
      getAnelData,
      getAllStation_cities,
      getFoList,
      getRingFromCircuit,
      cleanIdCircuitRedirect,
      getSiglas
    },
    dispatch
  );

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LicceuListarFO)
);
