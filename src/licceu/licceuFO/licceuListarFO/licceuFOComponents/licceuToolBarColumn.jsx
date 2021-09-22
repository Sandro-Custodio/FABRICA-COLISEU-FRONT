import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Plugin, Template } from "@devexpress/dx-react-core";
import { Table as DxTable } from "@devexpress/dx-react-grid-bootstrap3";
import { IconButton, Modal, Table, ExportExcel } from "common";
import { toastr } from "react-redux-toastr";
import { colunasBandaMedia, colunasBandaMediaExcel } from "./api.json";
import { cancelRingFo, getBandaMedia, redirectListCircuits } from "../actions";

const CellComp = ({
  row,
  column,
  rowSelected,
  redirectListCircuits,
  historyNavigation
}) => {
  function redirecionaParaCircuitos(navegacao) {
    redirectListCircuits(rowSelected);
    navegacao.push("/circuito/listarCircuitos");
  }

  const columnValue = row[column.name];

  if (column.name === "num_circuitos") {
    // && columnValue > 0
    return (
      <DxTable.Cell>
        <button
          type="submit"
          className="btn btn-link"
          onClick={() => redirecionaParaCircuitos(historyNavigation)}
        >
          {columnValue}
        </button>
      </DxTable.Cell>
    );
  }
  return <td>{columnValue}</td>;
};

const BandaMedia = ({
  linhaSelecionada,
  getBandaMedia,
  listBandaMedia,
  historyNavigation
}) => {
  const [open, setOpen] = React.useState(false);

  let CellConect = props => (
    <CellComp
      historyNavigation={historyNavigation}
      rowSelected={linhaSelecionada}
      {...props}
    />
  );

  CellConect = connect(
    null,
    dispatch => bindActionCreators({ redirectListCircuits }, dispatch)
  )(CellConect);

  return (
    <>
      <IconButton
        icon="table"
        title="Banda Média"
        color="black"
        onClick={() => {
          setOpen(true);
          getBandaMedia(linhaSelecionada);
        }}
      />
      {open && (
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          dimension="lg"
          title="Banda Média"
          footer={
            <>
              <ExportExcel
                rows={listBandaMedia}
                columns={colunasBandaMediaExcel}
                name="Export Banda Media"
              >
                <IconButton
                  icon="file-excel-o"
                  title="Export Excel"
                  className="btn btn-success"
                  iconProps={{
                    style: { fontSize: "16px", marginRight: "5px" }
                  }}
                  disabled={!listBandaMedia.length}
                >
                  Exportar
                </IconButton>
              </ExportExcel>
            </>
          }
          disableBtnClose={false}
        >
          <Table
            columns={colunasBandaMedia}
            rows={listBandaMedia}
            disablePagination
            Cell={CellConect}
          />
        </Modal>
      )}
    </>
  );
};

const LicceuToolbarColumn = ({
  children,
  selection,
  linhaSelecionada,
  userId,
  clearSelectionRow,
  cancelRingFo,
  getBandaMedia,
  listarFO: { listBandaMedia },
  historyNavigation
}) => {
  return (
    <Plugin name="ToolbarColumn">
      <Template name="toolbarContent">
        <IconButton
          icon="search"
          title="Abrir Filtro"
          data-toggle="modal"
          data-target="#licceuOpenFilter"
          color="black"
        />

        {children}
        {selection.length === 1 && (
          <div className="btn-group">
            <IconButton
              icon="times"
              title="Cancelar Anel FO"
              color="red"
              onClick={() =>
                toastr.confirm(
                  `Confirma a cancelamento do Anel ${linhaSelecionada.id_licceu_anel}?`,
                  {
                    onOk: () => {
                      clearSelectionRow();
                      cancelRingFo(
                        linhaSelecionada.id,
                        userId.id,
                        linhaSelecionada.id_licceu_anel
                      );
                    }
                  }
                )
              }
            />
            <BandaMedia
              linhaSelecionada={linhaSelecionada.id}
              getBandaMedia={getBandaMedia}
              listBandaMedia={listBandaMedia}
              historyNavigation={historyNavigation}
            />
          </div>
        )}
      </Template>
    </Plugin>
  );
};

const mapStateToProps = state => ({
  listarFO: state.listarFO
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ cancelRingFo, getBandaMedia }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LicceuToolbarColumn);
