import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";

import { Plugin, Template } from "@devexpress/dx-react-core";
import ReactTooltip from "react-tooltip";

import FiltroLotes from "./filtroLotes";
import { ExportExcel } from "common";
import DetalhesLote from "./detalhesLote";
import HistoricoEnvioEmail from "./historicoEnvioEmail";
import EnviarEmail from "./enviarEmail";
import BoxConfirmarEmail from "./boxConfirmarEmail";
import UploadAnexo from "./uploadAnexo";
import CriticasUpload from "./criticasUpload";

import {
  get_items_lot_conciliate,
  get_hist_envio_email,
  gera_new_file_contestation,
  upload_resposta_lote,
  set_bill_conc_lote
} from "../actions";

import {
  get_all_data_providers,
} from "../../../sd/form/actions";
import auth from "auth/auth";

const ToolbarLotes = props => {

  const {
    selectedRow,
    exportRows,
    exportColumns,
    setSelection,
    setSelectedRow,
    auth,
    // actions
    get_items_lot_conciliate,
    get_hist_envio_email,
    get_all_data_providers,
    gera_new_file_contestation,
    upload_resposta_lote,
    set_bill_conc_lote
  } = props;

  const handleExportPage = () => {
    if (exportRows.length === 0) {
      toastr.warning("Nenhum registro encontrado.");
    } else {
      document.getElementById("export-page-lotes").click();
    }
  };

  const handleOpenInfoModal = () => {
    get_items_lot_conciliate(selectedRow.id);
  };

  const handleOpenFilter = () => {
    setSelectedRow(null);
    setSelection([]);
  };

  const handleOpenMailHistory = () => {
    get_hist_envio_email(selectedRow.id);
  };

  const handleOpenMailModal = () => {
    get_all_data_providers(selectedRow.vendor_id, true)
      .then(() => window.$("#envio-email").modal("show"));
  };

  const handleClickDownloadItem = () => {
    gera_new_file_contestation(selectedRow)
  }

  const [handleReload, setHandleReload] = React.useState(() => console.log("handleReload"))
  const [reloadData, setReloadData] = React.useState('')
  const [uploadedFileName, setUploadedFileName] = React.useState('')

  return (
    <Plugin name="ToolbarColumn">
      <Template name="toolbarContent">
        <div className="toolbar-contestacao">
          <div className="left">

            <button
              className="btn btn-link btn-filtro btn-ml-0"
              data-for="top_dark_float"
              data-tip="Abrir Filtro"
              data-toggle="modal"
              data-target="#filtro-lotes"
              onClick={() => handleOpenFilter()}
            >
              <i className="fa fa-search" />
              <ReactTooltip
                id="top_dark_float"
                place="top"
                type="dark"
                effect="float"
              />
            </button>

            {selectedRow && selectedRow.status_id == 155 && <button
              className="btn btn-link btn-filtro btn-ml-0"
              data-for="send-mail"
              data-tip="Enviar E-mail"
              onClick={() => {
                Promise.all([set_bill_conc_lote(selectedRow)]).finally($ => handleOpenMailModal())
              }}
            >
              <i className="fa fa-envelope" style={{ color: "#333" }} />
              <ReactTooltip
                id="send-mail"
                place="top"
                type="dark"
                effect="float"
              />
            </button>}

            {selectedRow && <button
              className="btn btn-link btn-filtro btn-ml-0"
              data-for="down"
              data-tip="Download itens lote aguardando resposta"
              onClick={ () => handleClickDownloadItem()}
            >
              <i className="fa fa-cloud-download text-success" />
              <ReactTooltip
                id="down"
                place="top"
                type="dark"
                effect="float"
              />
            </button>}

            {selectedRow && selectedRow.status_id != 188 && <UploadAnexo
              accept={".xls"}
              handleUpload={upload_resposta_lote}
              selectedRow={selectedRow}
              user_id={auth.user.id}
              setUploadedFileName={setUploadedFileName}
            />}

            {selectedRow && <button
              className="btn btn-link btn-filtro btn-ml-0"
              data-for="history"
              data-tip="Histórico Envio de E-mail"
              onClick={() => handleOpenMailHistory()}
            >
              <i className="fa fa-history text-dark" style={{ color: "#333" }} />
              <ReactTooltip
                id="history"
                place="top"
                type="dark"
                effect="float"
              />
            </button>}

            {selectedRow && selectedRow.status_id == 155 && <button
              className="btn btn-link btn-filtro btn-ml-0"
              data-for="trash"
              data-tip="Excluir Lote"
              data-toggle="modal"
            // data-target="#"
            >
              <i className="fa fa-trash text-danger" />
              <ReactTooltip
                id="trash"
                place="top"
                type="dark"
                effect="float"
              />
            </button>}

            {selectedRow && <button
              className="btn btn-link btn-filtro btn-ml-0"
              data-for="info"
              data-tip="Detalhes do Lote"
              onClick={() => handleOpenInfoModal()}
            >
              <i className="fa fa-info-circle" />
              <ReactTooltip
                id="info"
                place="top"
                type="dark"
                effect="float"
              />
            </button>}
          </div>
          <div className="right">
            <button
              className="btn btn-link btn-filtro btn-mr-0"
              data-for="export-csv"
              data-tip="Exportar página para CSV"
              onClick={() => handleExportPage()}
            >
              <i className="fa fa-file-o text-success" />
              <ReactTooltip
                id="export-csv"
                place="left"
                type="dark"
                effect="float"
              />
            </button>
            <ExportExcel
              rows={exportRows}
              columns={exportColumns}
              name="Contestação"
            >
              <button
                style={{ display: "none" }}
                id="export-page-lotes"
              />
            </ExportExcel>
          </div>
        </div>

        <FiltroLotes
          setHandleReload={setHandleReload}
          setReloadData={setReloadData}
        />
        <DetalhesLote
          selectedRow={selectedRow}
          handleReload={handleReload}
          reloadData={reloadData}
        />
        <HistoricoEnvioEmail/>
        <EnviarEmail />
        <CriticasUpload
          handleReload={handleReload}
          reloadData={reloadData}
          uploadedFileName={uploadedFileName}
        />
        <BoxConfirmarEmail/>
      </Template>
    </Plugin>
  );

};

const mapStateToProps = state => ({
  auth: state.auth,
  reducer: state.contestacaoReducer,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  get_items_lot_conciliate,
  get_hist_envio_email,
  get_all_data_providers,
  gera_new_file_contestation,
  upload_resposta_lote,
  set_bill_conc_lote
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolbarLotes);
