import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { bindActionCreators } from "redux";
import {
  Grid,
  TableFilterRow,
  Table,
  TableHeaderRow,
  TableColumnResizing,
  Toolbar,
  TableSelection
} from "@devexpress/dx-react-grid-bootstrap3";
import {
  FilteringState,
  IntegratedFiltering,
  SelectionState
} from "@devexpress/dx-react-grid";
import { toastr } from "react-redux-toastr";
import ContentHeader from "../../../common/adminLTE/contentHeader";
import Content from "../../../common/adminLTE/content";
import { columns, columnWidths } from "./api.json";
import {
  Pagination,
  LicceuOpenFilter,
  LicceuToolBarColumn,
  LicceuAlteracaoMultiplaStatus,
  LicceuEditarHub
} from "./licceuHubComponents";
import ModalFormOT from "../../../common/layout/modal";
import {
  getHub,
  getAllRegional,
  getAllMunicipios,
  getAllInterface,
  postAlteracaoMassivaStatus,
  postEditarHub,
  getHubsByCircuitIdRedirect,
  cleanIdCircuitRedirect
} from "./actions";
import Overlay from "../../../common/msg/overlay/overlay";

class LicceuListarHub extends React.Component {
  filtros = {};

  constructor(props) {
    super(props);
    this.state = {
      defaultColumnWidths: columnWidths,
      selection: []
    };

    this.changeColumnWidths = columnWidths => {
      this.setState({ defaultColumnWidths: columnWidths });
    };
    this.changeSelection = this.changeSelection.bind(this);
  }

  componentDidMount() {
    const {
      getAllRegional,
      getAllMunicipios,
      getAllInterface,
      getHub,
      getHubsByCircuitIdRedirect,
      listarHub: { idCircuitFromRedirect }
    } = this.props;

    if (idCircuitFromRedirect !== -1) {
      getHubsByCircuitIdRedirect(idCircuitFromRedirect);
    } else {
      getHub({});
    }

    getAllRegional();
    getAllMunicipios();
    getAllInterface();
  }

  componentWillUnmount() {
    const { cleanIdCircuitRedirect } = this.props;
    cleanIdCircuitRedirect();
  }

  changeSelection = selection => {
    this.setState({
      selection
    });
  };

  handleSubmitData(submit) {
    this.filtros = submit;
    this.filtros.sites =
      this.filtros.multiplosSites &&
      typeof this.filtros.multiplosSites === "string"
        ? this.filtros.multiplosSites.split(";")
        : null;
    this.filtros.ot =
      this.filtros.multiplosOt && typeof this.filtros.multiplosOt === "string"
        ? this.filtros.multiplosOt.split(";")
        : null;
    this.filtros.enderecos =
      this.filtros.multiplosEnderecos &&
      typeof this.filtros.multiplosEnderecos === "string"
        ? this.filtros.multiplosEnderecos.split(";")
        : null;
    this.filtros.licceuIds =
      this.filtros.multiplosLicceuIds &&
      typeof this.filtros.multiplosLicceuIds === "string"
        ? this.filtros.multiplosLicceuIds.split(";")
        : null;
    return this.filtros;
  }

  render() {
    const {
      listarHub,
      listarHub: { idCircuitFromRedirect },
      getHub,
      postAlteracaoMassivaStatus,
      postEditarHub
    } = this.props;
    let { hubRows } = listarHub;
    hubRows = hubRows || [];
    const { defaultColumnWidths, selection } = this.state;
    const hubSelected = hubRows[selection[selection.length - 1]];

    const hubChangeStatusSelection = selection.map(
      index =>
        hubRows.map(todo => {
          return {
            id: todo.codigo,
            idLicceu: todo.idLicceu,
            ot: todo.ot,
            tipoLink: todo.tipoLink
          };
        })[index]
    );

    return (
      <div className="fade-in fade-out">
        <div className="header">
          <div className="header__left-items">
            <ContentHeader title="Listar Hub" small="Licceu Hub" />
          </div>
        </div>
        <Content>
          <div className="overlay-wrapper">
            <Grid rows={hubRows} columns={columns}>
              <FilteringState defaultFilters={[]} />
              <IntegratedFiltering />
              <SelectionState
                selection={selection}
                onSelectionChange={this.changeSelection}
              />
              <Table />
              <TableColumnResizing
                defaultColumnWidths={defaultColumnWidths}
                onColumnWidthsChange={this.changeColumnWidths}
              />
              <TableHeaderRow />
              <TableSelection selectByRowClick />
              <TableFilterRow />
              <Toolbar />
              <LicceuToolBarColumn
                selection={selection}
                hubSelected={hubSelected}
              >
                <FastForm
                  onSubmit={submit => {
                    this.filtros = submit.licceuIds
                      ? { licceuIds: submit.licceuIds.split() }
                      : {};
                    getHub(this.filtros);
                    this.changeSelection([]);
                  }}
                />
              </LicceuToolBarColumn>
            </Grid>
            <Overlay />
            {idCircuitFromRedirect === -1 && <Pagination />}
          </div>
        </Content>
        <ModalFormOT
          LabelButtonSubmit="Abrir Filtro"
          id="licceuOpenFilter"
          title="Filtro Listar Hub"
          dimension="modal-lg"
        >
          <LicceuOpenFilter
            initialValues={this.filtros}
            onSubmit={submit => {
              getHub(this.handleSubmitData(submit));
              window.$("#licceuOpenFilter").modal("hide");
              this.changeSelection([]);
            }}
          />
        </ModalFormOT>

        <ModalFormOT
          LabelButtonSubmit="Abrir Filtro"
          id="licceuAlteracaoMassiva"
          title="Alteração Múltipla de Status"
          dimension="modal-sm"
        >
          <LicceuAlteracaoMultiplaStatus
            onSubmit={submit => {
              this.changeSelection([]);
              if (submit.status) {
                const alteracao = postAlteracaoMassivaStatus(
                  submit.status,
                  hubChangeStatusSelection
                );
                Promise.all([alteracao]).then(() => {
                  getHub(this.filtros);
                  window.$("#licceuAlteracaoMassiva").modal("hide");
                });
              } else {
                toastr.error("Selecione o status desejado");
              }
            }}
          />
        </ModalFormOT>
        <ModalFormOT
          LabelButtonSubmit="Abrir Filtro"
          id="licceuEditarHub"
          title="Editar Hub"
          dimension="modal-lg"
        >
          <div>
            {hubSelected && (
              <LicceuEditarHub
                initialValues={hubSelected}
                hub={hubSelected}
                onSubmit={submit => {
                  const edicao = postEditarHub(submit.codigo, submit);
                  Promise.all([edicao]).then(() => {
                    this.changeSelection([]);
                    getHub(this.filtros);
                    window.$("#licceuEditarHub").modal("hide");
                  });
                }}
              />
            )}
          </div>
        </ModalFormOT>
        <ModalFormOT
          LabelButtonSubmit="Abrir Filtro"
          id="licceuHistoricoHub"
          title={`Histórico do Hub ${hubSelected && hubSelected.id_licceu}`}
          dimension="modal-lg"
        >
          <h1>Historico</h1>
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
        name="licceuIds"
        value="LICCEU ID"
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
  form: "fastForm"
})(FastForm);

const mapStateToProps = state => ({ listarHub: state.listarHub });

const mapDispacthToProps = dispatch =>
  bindActionCreators(
    {
      getHub,
      getAllRegional,
      getAllMunicipios,
      getAllInterface,
      postAlteracaoMassivaStatus,
      postEditarHub,
      getHubsByCircuitIdRedirect,
      cleanIdCircuitRedirect
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispacthToProps
)(LicceuListarHub);
