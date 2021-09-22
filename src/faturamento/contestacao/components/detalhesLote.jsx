import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import ModalForm from "../../../common/layout/modal";

import {
  Grid as DxGrid,
  Table,
  TableHeaderRow,
  Toolbar,
} from "@devexpress/dx-react-grid-bootstrap3";

import { Plugin, Template } from "@devexpress/dx-react-core";
import { ExportExcel } from "common";
import ReactTooltip from "react-tooltip";
import { TableColumnResizing } from "@devexpress/dx-react-grid";
import UploadAnexo from "./uploadAnexo";

import {
  gera_items_lote,
  down_items_negados,
  gera_new_file_negados,
  upload_items_negados,
  get_items_lot_conciliate,
  download
} from "../actions";
import { toastr } from "react-redux-toastr";

const DetalhesLote = props => {

  const {
    reducer: {
      detalhes_lote: {
        det,
        inc,
        isNovoLoteGerado,
      }
    },
    auth,
    selectedRow,
    handleReload,
    reloadData,
    //actions
    gera_items_lote,
    down_items_negados,
    gera_new_file_negados,
    upload_items_negados,
    get_items_lot_conciliate,
  } = props;

  const [uploadedFileName, setUploadedFileName] = React.useState('')

  const handleUpload = (selectedRow,newname,user_id) => {
    upload_items_negados(selectedRow,newname,user_id).then($ => {
      get_items_lot_conciliate(selectedRow?.id)
      setTimeout(() => {
        toastr.success("Itens atualizados com sucesso.")
      }, 100);
    }).catch(e => toastr.error("ERRO", e, {timeOut: 0}))
  }

  const columns = [
    { name: "bill_dif_type_id", title: "Seq." },
    { name: "bill_dif_type_name", title: "Inconsistência" },
    { name: "qtd_circuitos", title: "Circuitos" },
    { name: "realizado", title: "Realizado" },
    { name: "contestar", title: "Contestado" },
    { name: "aceito_prov", title: "Aceito Provedor" },
    { name: "negado_prov", title: "Negado Provedor" },
    { name: "total_aceito_tim", title: "Aceito TIM" },
    { name: "total_negado_tim", title: "Negado TIM" },
    { name: "total_analise", title: "Em análise" },
  ];

  const columnWidths = columns.map(c => ({
    columnName: c.name,
    width: c.name == "bill_dif_type_name" ? 300 : 150
  }));

  const ToolbarModal = () => {
    return (
      <Plugin name="ToolbarColumn">
        <Template name="toolbarContent">
          <div style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}>
            <ExportExcel
              rows={inc}
              columns={columns}
              name="Contestação"
            >
              <button
                className="btn btn-link"
                data-for="top_success_float"
                data-tip="Exportar página para CSV"
              >
                <i className="fa fa-file-o text-success" />
                <ReactTooltip
                  id="top_success_float"
                  place="left"
                  type="dark"
                  effect="float"
                />
              </button>
            </ExportExcel>
          </div>
        </Template>
      </Plugin>
    );
  };

  return (
    <div>
      <ModalForm
        LabelButtonSubmit="Detalhes do Lote"
        id="detalhes-lote"
        title="Detalhes do Lote"
        dimension="modal-lg"
      >
        <ModalForm
          LabelButtonSubmit="Ajuda"
          id="ajuda-lote"
          title="Ajuda"
          dimension="modal-md"
        >
          <div>
            <p>O upload da resposta só estará disponível para itens negados pelo provedor. Favor preencher a coluna <b>ACAO_REPLICA_TIM</b> com os seguintes valores.</p>
            <b>
              <b>ACEITO</b>
              <br />
              <b>CONTESTAR</b>
              <br />
              <b>ANALISE PIM</b>
              <br />
              <b>ANALISE FACILITIES</b>
              <br />
              <b>ANALISE CONCILIACAO</b>
              <br />
              <b>ANALISE GOVERNANCA</b>
              <br />
              <b>CORRECAO PIM</b>
              <br />
              <b>CORRECAO FACILITIES</b>
              <br />
              <b>CORRECAO CONCILIACAO</b>
              <br />
              <b>CORRECAO GOVERNANCA</b>
            </b>
          </div>
        </ModalForm>
        <div className="row">
          <div className="col-md-7">
            <div className="row">
              <div className="col-md-4">
                <div className="form-group">
                  <label>Lote</label>
                  <input type="text" className="form-control" disabled value={det?.lote} />
                </div>
                <div className="form-group">
                  <label>Qtd. Aceito Provedor</label>
                  <input type="text" className="form-control" disabled value={det?.qtd_aceito} />
                </div>
                <div className="form-group">
                  <label>Qtd. Aceito Tim</label>
                  <input type="text" className="form-control" disabled value={det?.qtd_aceito_tim} />
                </div>
                <div className="form-group">
                  <label>Qtd. Em análise</label>
                  <input type="text" className="form-control" disabled value={det?.qtd_analise} />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label>Provedor</label>
                  <input type="text" className="form-control" disabled value={det?.provedor} />
                </div>
                <div className="form-group">
                  <label>(R$) Total Aceito Provedor</label>
                  <input type="text" className="form-control" disabled value={det?.total_aceito} />
                </div>
                <div className="form-group">
                  <label>(R$) Total Aceito Tim</label>
                  <input type="text" className="form-control" disabled value={det?.total_aceito_tim} />
                </div>
                <div className="form-group">
                  <label>(R$) Total Em análise</label>
                  <input type="text" className="form-control" disabled value={det?.total_analise} />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label>(R$) Total Realizado</label>
                  <input type="text" className="form-control" disabled value={det?.realizado} />
                </div>
                <div className="form-group">
                  <label>Qtd. Negado Provedor</label>
                  <input type="text" className="form-control" disabled value={det?.qtd_negado} />
                </div>
                <div className="form-group">
                  <label>Qtd. Negado Tim</label>
                  <input type="text" className="form-control" disabled value={det?.qtd_negado_tim} />
                </div>
                <div className="form-group">
                  <label>Qtd. Em disputa</label>
                  <input type="text" className="form-control" disabled value={det?.disputa} />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-5">
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>(R$) Total Contestado</label>
                  <input type="text" className="form-control" disabled value={det?.contestado} />
                </div>
                <div className="form-group">
                  <label>(R$) Total Negado Provedor</label>
                  <input type="text" className="form-control" disabled value={det?.total_negado} />
                </div>
                <div className="form-group">
                  <label>(R$) Total Negado Tim</label>
                  <input type="text" className="form-control" disabled value={det?.total_negado_tim} />
                </div>
                <div className="form-group">
                  <label>(R$) Total Em disputa</label>
                  <input type="text" className="form-control" disabled value={det?.total_disputa} />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Qtd. Contestado</label>
                  <div className="row">
                    <div className="col-xs-8">
                      <input type="text" className="form-control" disabled value={det?.qtd} />
                    </div>
                    <div className="col-xs-4">
                      <button
                        className="btn btn-link btn-filtro btn-ml-0"
                        data-for="dl1"
                        data-tip="Download itens lote"
                        onClick={() => gera_items_lote({lote: selectedRow})}
                      >
                        <i className="fa fa-cloud-download text-success" />
                        <ReactTooltip
                          id="dl1"
                          place="left"
                          type="dark"
                          effect="float"
                        />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label style={{ color: "#fff" }}>.</label>
                  <div>
                    <button
                      className="btn btn-link btn-filtro btn-ml-0"
                      data-for="dl2"
                      data-tip="Download itens negados"
                      disabled={!(det?.qtd_negado > 0 && selectedRow?.status_id != 188)}
                      onClick={() => down_items_negados({lote: selectedRow})}
                    >
                      <i className="fa fa-cloud-download text-success" />
                      <ReactTooltip
                        id="dl2"
                        place="top"
                        type="dark"
                        effect="float"
                      />
                    </button>
                  </div>
                </div>
                <div className="form-group">
                  <label style={{ color: "#fff" }}>.</label>
                  <div>
                  {det?.qtd_negado > 0 && selectedRow?.status_id != 188 && <UploadAnexo
                    accept={".xls"}
                    handleUpload={handleUpload}
                    selectedRow={selectedRow}
                    user_id={auth.user.id}
                    setUploadedFileName={setUploadedFileName}
                  />}
                    {/* <button
                      className="btn btn-link btn-filtro btn-ml-0"
                      data-for="up1"
                      data-tip="Upload resposta Tim"
                      disabled={!(det?.qtd_negado > 0 && selectedRow?.status_id != 188)}
                    >
                      <i className="fa fa-cloud-upload" />
                      <ReactTooltip
                        id="up1"
                        place="top"
                        type="dark"
                        effect="float"
                      />
                    </button> */}
                    <button
                      className="btn btn-link btn-filtro btn-ml-0"
                      data-for="qs"
                      data-tip="Ajuda para preenchimento da resposta"
                      data-toggle="modal"
                      data-target="#ajuda-lote"
                    >
                      <i className="fa fa-question-circle text-info" />
                      <ReactTooltip
                        id="qs"
                        place="top"
                        type="dark"
                        effect="float"
                      />
                    </button>
                    {Object.entries(det).length > 0 && det.qtd_negado_tim > 0 && det.qtd_analise == 0 && isNovoLoteGerado == false && <button
                      className="btn btn-primary btn-sm"
                      onClick={() => gera_new_file_negados(selectedRow).then($ => {
                        setTimeout(() => {
                          handleReload(reloadData)
                        }, 100);
                      })}
                    >
                      Gerar novo lote
                    </button>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <DxGrid rows={inc} columns={columns}>
          <Table />
          <TableColumnResizing defaultColumnWidths={columnWidths} />
          <TableHeaderRow />
          <Toolbar />
          <ToolbarModal />
        </DxGrid>
      </ModalForm>
    </div>
  );

};

const mapStateToProps = state => ({
  reducer: state.contestacaoReducer,
  auth: state.auth,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  gera_items_lote,
  down_items_negados,
  gera_new_file_negados,
  upload_items_negados,
  get_items_lot_conciliate
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetalhesLote);
