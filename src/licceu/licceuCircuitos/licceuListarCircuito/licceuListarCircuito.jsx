import React from "react";
import { connect } from "react-redux";
import {
  FilteringState,
  IntegratedFiltering,
  SelectionState
} from "@devexpress/dx-react-grid";
import {
  Grid,
  DragDropProvider,
  TableFilterRow,
  Table,
  TableHeaderRow,
  // TableColumnReordering,
  TableColumnResizing,
  Toolbar,
  TableSelection
} from "@devexpress/dx-react-grid-bootstrap3";
import { bindActionCreators } from "redux";
import { Field, reduxForm } from "redux-form";

import {
  Pagination,
  LicceuToolBarColumn,
  LicceuOpenFilter
} from "./licceuListarCircuitoComponents";
import { columns, columnWidths } from "./api.json";
import ContentHeader from "../../../common/adminLTE/contentHeader";
import Content from "../../../common/adminLTE/content";
import ModalFormOT from "../../../common/layout/modal";

import {
  postFilter,
  postAlteracaoMassiva,
  getAllVendorByArea,
  getAllRegional,
  getAllUf,
  getSN,
  cleanIdAnelRedirect,
  redirectToAnelFO,
  redirectToHub,
  getCircuitsFromBandaMedia
} from "./licceuActions";
import Overlay from "../../../common/msg/overlay/overlay";

class LicceuListarCircuito extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columnWidths,
      selection: []
    };

    this.changeColumnWidths = columnWidths => this.setState({ columnWidths });
    this.changeSelection = this.changeSelection.bind(this);
  }

  componentDidMount() {
    const {
      getAllVendorByArea,
      getAllRegional,
      getAllUf,
      getSN,
      getCircuitsFromBandaMedia,
      listarCircuito: { idFoRingFromRedirec }
    } = this.props;

    if (idFoRingFromRedirec !== -1) {
      getCircuitsFromBandaMedia(idFoRingFromRedirec);
    }
    getAllVendorByArea();
    getAllRegional();
    getAllUf();
    getSN();
  }

  componentWillUnmount() {
    const { cleanIdAnelRedirect } = this.props;

    cleanIdAnelRedirect();
  }

  changeSelection = selection => this.setState({ selection });

  redirecionarParaAnelFO(navegacao, idCircuit) {
    const { redirectToAnelFO } = this.props;
    redirectToAnelFO(idCircuit);
    navegacao.push("/fos/listarFOs");
  }

  redirecionarParaHub(navegacao, idCircuit) {
    const { redirectToHub } = this.props;
    redirectToHub(idCircuit);
    navegacao.push("/hub/listarHub");
  }

  render() {
    const {
      listarCircuito: { page, limit, idFoRingFromRedirec },
      listarCircuito,
      postFilter,
      history
    } = this.props;
    const mwRows = listarCircuito.mwRows || [];
    const { columnWidths, selection } = this.state;
    const mwSelected = mwRows[selection[selection.length - 1]];

    const ComponentCell = ({ row, column }) => {
      const columnValue = row[column.name];

      if (column.name === "anel_cluster" && columnValue) {
        // && columnValue > 0
        return (
          <Table.Cell>
            <button
              type="submit"
              className="btn btn-link"
              onClick={() => this.redirecionarParaAnelFO(history, row.id)}
            >
              {columnValue}
            </button>
          </Table.Cell>
        );
      }
      if (column.name === "hub" && columnValue) {
        // && columnValue > 0
        return (
          <Table.Cell>
            <button
              type="submit"
              className="btn btn-link"
              onClick={() => this.redirecionarParaHub(history, row.id)}
            >
              {columnValue}
            </button>
          </Table.Cell>
        );
      }

      if (column.name === "mw_par" && columnValue) {
        return (
          <Table.Cell>
            <button
              type="submit"
              className="btn btn-link"
              onClick={() => history.push(`/mw/listar?id_rota=${row.id}`)}
            >
              {columnValue}
            </button>
          </Table.Cell>
        );
      }

      return <td>{columnValue}</td>;
    };

    return (
      <div className="fade-in fade-out">
        <div className="header">
          <div className="header__left-items">
            <ContentHeader title="Listar Circuito" small="Licceu MW" />
          </div>
        </div>
        <Content>
          <div className="overlay-wrapper">
            <Grid rows={mwRows} columns={columns}>
              <FilteringState defaultFilters={[]} />
              <IntegratedFiltering />
              <SelectionState
                selection={selection}
                onSelectionChange={this.changeSelection}
              />
              <DragDropProvider />
              {/* <Table cellComponent={Cell} /> */}
              <Table cellComponent={ComponentCell} />
              {/* <TableColumnReordering defaultOrder={defaultOrder} /> */}
              <TableColumnResizing
                columnWidths={columnWidths}
                onColumnWidthsChange={this.changeColumnWidths}
              />
              <TableHeaderRow />
              <TableSelection selectByRowClick />
              <TableFilterRow />
              <Toolbar />
              <LicceuToolBarColumn
                selection={selection}
                mwSelected={mwSelected}
                rowsSelecteds={mwRows.filter((_, idx) =>
                  selection.includes(idx)
                )}
              >
                <FastForm
                  onSubmit={submit => {
                    postFilter("mw/get_all_rotas_find_flex", {
                      filter: submit,
                      export: false,
                      page,
                      limit
                    });
                  }}
                />
              </LicceuToolBarColumn>
            </Grid>
            <Overlay />
          </div>
          {idFoRingFromRedirec === -1 && <Pagination />}
        </Content>
        <ModalFormOT
          footer
          LabelButtonSubmit="Abrir Filtro"
          id="licceuOpenFilter"
          title="Filtro Listar Circuito"
          dimension="modal-lg"
        >
          <LicceuOpenFilter
            onSubmit={submit => {
              postFilter("mw/get_all_rotas_find_flex", {
                filter: submit,
                export: false,
                page,
                limit
              });
              window.$("#licceuOpenFilter").modal("hide");
            }}
          />
        </ModalFormOT>
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
        name="nome"
        value="NOMES"
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
  listarCircuito: state.listarCircuito,
  clear: state.form.licceuListarCircuito
});

const mapDispacthToProps = dispatch =>
  bindActionCreators(
    {
      postFilter,
      getAllVendorByArea,
      getAllRegional,
      getAllUf,
      getSN,
      postAlteracaoMassiva,
      cleanIdAnelRedirect,
      redirectToAnelFO,
      redirectToHub,
      getCircuitsFromBandaMedia
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispacthToProps
)(LicceuListarCircuito);
