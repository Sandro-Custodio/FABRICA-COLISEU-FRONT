/* eslint-disable no-undef */
import React from "react";
import { connect } from "react-redux";
import ReactDropzone from "react-dropzone";
import { bindActionCreators } from "redux";
import {
  Grid,
  Table,
  TableHeaderRow,
  TableColumnResizing
} from "@devexpress/dx-react-grid-bootstrap3";
import { columns, columnWidths } from "./api.json";
import ContentHeader from "../../../common/adminLTE/contentHeader";
import Content from "../../../common/adminLTE/content";
import Overlay from "../../../common/msg/overlay/overlay";
import { uploadHubFile, confirmUpload, showDetalhes } from "./actions";
import "./styles.css";
import ModalForm from "../../../common/layout/modal";
import {
  Download,
  LicceuConfirmarCargaHub,
  LicceuExibirDetalhes
} from "./licceuCargaHubComponents";

const showAction = props => {
  const { row, column } = props;
  return (
    <Table.Cell
      {...props}
      style={{
        fontSize: "15px",
        verticalAlign: "middle"
      }}
    >
      {row.critica && column.name === "action" && (
        <div>
          {row.salvar && (
            <button
              type="button"
              className="btn-lg btn-link fade-in filtro-btn"
              data-toggle="modal"
              data-target="#licceuConfirmarCargaHub"
            >
              <i
                className="fa fa-floppy-o"
                data-toggle="tooltip"
                title="Confirmar"
              />
            </button>
          )}
          <button
            type="button"
            className="btn-lg btn-link fade-in filtro-btn"
            data-toggle="modal"
            data-target="#licceuExibirDetalhes"
          >
            <i className="fa fa-info" data-toggle="tooltip" title="Detalhes" />
          </button>
        </div>
      )}
    </Table.Cell>
  );
};

class LicceuCargaHub extends React.Component {
  uploadFile;

  onDrop = file => {
    const { uploadHubFile } = this.props;
    const formData = new FormData();
    formData.append("arquivo", file[0]);
    uploadHubFile(formData);
  };

  loadData = (rows, uploadData) => {
    const { showDetalhes } = this.props;
    if (!uploadData[0].codigo) {
      showDetalhes(rows);
    }
  };

  render() {
    const {
      cargaHub: { critica, jobExecutionId, count, salvar, uploadData },
      confirmUpload
    } = this.props;
    const rows = [
      {
        critica,
        jobExecutionId,
        count,
        salvar
      }
    ];
    return (
      <div className="fade-in fade-out">
        <div className="header">
          <div className="header__left-items">
            <ContentHeader title="Carga Hub Link" small="Licceu Hub" />
          </div>
        </div>
        <Content>
          <div className="overlay-wrapper">
            <div className="carga-hub-btn">
              <ReactDropzone
                accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                onDrop={this.onDrop}
              >
                {({
                  getRootProps,
                  getInputProps,
                  isDragActive,
                  isDragReject
                }) => (
                  <div
                    className="dropzone"
                    data-for="top_dark_float"
                    data-tip="SOLTE O ARQUIVO AQUI."
                    {...getRootProps()}
                    style={{ padding: "0 10px" }}
                  >
                    <input {...getInputProps()} />
                    <i className="fa fa-upload" />
                    {!isDragActive && " Clique aqui ou solte um arquivo!"}
                    {isDragActive && !isDragReject && " Solte o arquivo aqui."}
                    {isDragReject && "Arquivo inválido!"}
                  </div>
                )}
              </ReactDropzone>
              <Download />
            </div>

            <Grid rows={rows} columns={columns}>
              <Table cellComponent={showAction} />
              <TableColumnResizing defaultColumnWidths={columnWidths} />
              <TableHeaderRow />
            </Grid>

            <Overlay />
          </div>
        </Content>

        <div className="carga-hub-modal">
          <ModalForm
            LabelButtonSubmit="Confirmar"
            id="licceuConfirmarCargaHub"
            title="Confirmar"
            dimension="modal-sm"
          >
            <LicceuConfirmarCargaHub
              onSubmit={() => {
                if (
                  rows[0].critica ===
                  "Status inválido para novo Hub, status deverá ser Em Estudo"
                ) {
                  confirmUpload(rows[0], true);
                } else {
                  confirmUpload(rows[0], false);
                }
                rows[0].salvar = false;
                window.$("#licceuConfirmarCargaHub").modal("hide");
              }}
            />
          </ModalForm>
        </div>

        {rows[0].critica && (
          <div onLoad={this.loadData(rows[0], uploadData)}>
            <ModalForm
              LabelButtonSubmit="Detalhes"
              id="licceuExibirDetalhes"
              title="Detalhes"
              dimension="modal-lg"
            >
              <LicceuExibirDetalhes data={uploadData} />
            </ModalForm>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({ cargaHub: state.cargaHub });

const mapDispacthToProps = dispatch =>
  bindActionCreators(
    {
      uploadHubFile,
      confirmUpload,
      showDetalhes
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispacthToProps
)(LicceuCargaHub);
