import React, { useState, useEffect } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import "./styles.css"

import ModalForm from "common/layout/modal"
import TableCircuito from "ods/list/viewODS/TableCircuito"
import AnexarArquivos from "./anexarArquivos"
import Provedor from "./provedor"
import Intelig from "./intelig"
import Email from "./email"
import VendorForm from "./vendorForm"

import { toastr } from "react-redux-toastr"
import { saveSd, get_files_by_sd, get_all_data_providers, get_intelig_contract_forms, get_ot_segmentations, get_form_data, } from "./actions"

const SdForm = props => {

  const {
    reducer: {
      formData: {
        action,
        data,
        circ,
        data: {
          sd,
          vendor,
        }
      },
      sd_user,
      od_user,
    },
    describe,
    auth,
    contractTitle,
    setContractTitle,
    selectedLLs,
    setSelectedLLs,
    regra,
    setRegra,
    multa,
    setMulta,
    prazo,
    setPrazo,
    allSelected,
    setAllSelected,
    printAttach,
    setPrintAttach,
    getRemarks,
    setRemarks,
    init,
    saveSd,
    get_files_by_sd,
    get_all_data_providers,
    get_intelig_contract_forms,
    get_ot_segmentations,
    get_form_data,
  } = props

  useEffect(() => { document.getElementById("obs").value = getRemarks })

  /**
   * Validações
   */
  let showDownloadForm = false
  let allowUpload = false
  let allowSendMail = false
  let linkVendor = true
  let btnMulta = true
  let showDownloadIntelig = false

  const handleContract = circuit => {
    setRegra(circuit.contract.regra_desativacao)
    setMulta(circuit.contract.multa_texto)
    setPrazo(circuit.contract.prazo_desativacao)
    setContractTitle("Contrato - " + circuit.contract.id)
  }

  const fixDate = date => (date ? new Date(date).toLocaleDateString("pt-br") : new Date().toLocaleDateString("pt-br"))

  let sdCode = ""

  if (action.name === "new") {
    sdCode = describe.code.replace("OD", "SD") + "-" + data.vendor.short_name
  } else {
    sdCode = data.sd_code
  }

  let sdUser = ""

  if (Object.entries(sd_user) > 0) {
    sdUser = sd_user.name
  } else {
    sdUser = auth.user.name
  }

  let dataEnvioEmail = ""
  if (data.sd === undefined || data.sd.delivered_at === null) {
    dataEnvioEmail = ""
  } else {
    dataEnvioEmail = data.sd.delivered_at
  }

  let sdStatus = ""
  if (!data.sd_status || data.sd_status === "") {
    sdStatus = "Nova"
  } else {
    sdStatus = data.sd_status
  }

  let sdData = ""
  if (data.sd_data) {
    sdData = data.sd_data
  } else {
    sdData = new Date().toLocaleDateString("pt-br")
  }

  /**
   * Validações
   */

  if (sdStatus === "Em Andamento") {
    allowSendMail = true
  }

  if (action.name === "view") {
    linkVendor = false
  }

  if ((data.sd && data.sd.status_id == 111) || action.name === "view") {
    showDownloadForm = false
    linkVendor = false
    allowSendMail = false
    btnMulta = false
  }

  if (action.name == "edit") {
    if (data.provedor_id == 19 || data.provedor_id == 2 || data.provedor_id == 5 || data.provedor_id == 6 || data.provedor_id == 7 || data.provedor_id == 28 || data.provedor_id == 4) {
      showDownloadForm = true
    }
  }

  if (action.name != "new") {
    allowUpload = true
  }

  if (describe.rede == "FIXA" && describe.segmento_mercado == "LM") {
    showDownloadIntelig = true
  }

  let tblCircProps = {}
  if (action.name != "view") {
    tblCircProps = {
      useSelect: "true",
    }
  }

  const handleProvedor = () => {
    if (linkVendor) {
      get_all_data_providers(data.vendor.id, true, data.vendor.print_attach)
    }
  }

  const handleSaveSd = () => {

    /**
    * observação, od_id, print_attach, attach_file, user_id,
    * attach_name, provedor_id, sd_leasedlines, status_id, code,
    */

     const selected_lls = selectedLLs.map(s => circ.filter(c => c.id === s)[0])

    const remarks = document.getElementById("obs").value
    const od_id = describe.id
    const print_attach = printAttach
    const attach_file = null
    const user_id = auth.user.id
    const sd_leasedlines = selected_lls
    const status_id = 110
    const code = sdCode
    const provedor_id = vendor.id

    const sdObject = {
      remarks,
      od_id,
      print_attach,
      attach_file,
      user_id,
      sd_leasedlines,
      status_id,
      code,
      provedor_id,
    }

    if (sd_leasedlines.length < 1) {
      return toastr.warning("Selecione no mínimo 1 circuito.")
    } else {
      return saveSd(sdObject, init)
      // return console.log(sdObject)
    }

  }

  const handleEditSd = () => {

    const selected_lls = selectedLLs.map(s => circ.filter(c => c.id === s)[0])

    const id = data.sd.id
    const remarks = document.getElementById("obs").value
    const od_id = describe.id
    const print_attach = printAttach
    const attach_file = null
    const user_id = data.sd.user_id
    const sd_leasedlines = selected_lls
    const status_id = data.sd.status_id
    const code = sdCode

    const sdObject = {
      id,
      remarks,
      od_id,
      print_attach,
      attach_file,
      user_id,
      sd_leasedlines,
      status_id,
      code,
    }

    if (sd_leasedlines.length < 1) {
      toastr.warning("Selecione no mínimo 1 circuito.")
    } else {
      saveSd(sdObject, init)
      // console.log(sdObject)
    }

  }

  const handleAttachFiles = () => {
    get_files_by_sd(data.sd.id)
  }

  const handleDownloadIntelig = () => {
    get_intelig_contract_forms(data.od.code)
  }

  const handleSendMail = () => {
    window.$("#sd-mail").modal("show")
    get_ot_segmentations(selectedLLs.filter(e => (e !== null || e !== undefined)).map(s => circ.filter(c => c.id == s)[0]))
    get_all_data_providers(vendor.id, false, sd.print_attach)
    get_files_by_sd(sd.id, false)
  }

  const handleVendorForm = () => {
    if (showDownloadForm) {
      let canSave = true
      circ.map(c => {
        if (c.cancel_end_at == null)
          canSave = false
      })
      if (canSave) {
        const data = {
          vendor_id: vendor.id,
          od_id: describe.id,
          code: describe.code
        }
        get_form_data(data)
      } else {
        toastr.warning("Atenção!", "Previsão de Fim de faturamento deve ser preenchida para todos os circuitos.")
      }
    }
  }

  return (
    <React.Fragment>
      <div className="sd-form">
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-8">
                <div className="form-group">
                  <div className="row">
                    <div className="col-md-3">
                      <label htmlFor="codigo_od">Código OD</label>
                      <input
                        type="text"
                        name="codigo_od"
                        id="codigo_od"
                        className="form-control disabled"
                        disabled
                        value={data?.od?.code}
                      />
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="data_abertura_od">Data Abertura</label>
                      <input
                        type="text"
                        name="data_abertura"
                        id="data_abertura"
                        className="form-control disabled"
                        disabled
                        value={fixDate(describe.created_at)}
                      />
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="solicitante_od">Solicitante</label>
                      <input
                        type="text"
                        name="solicitante"
                        id="solicitante"
                        className="form-control disabled"
                        disabled
                        value={od_user.name}
                      />
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="status_od">Status</label>
                      <input
                        type="text"
                        name="status_od"
                        id="status_od"
                        className="form-control disabled"
                        disabled
                        value={describe.od_status}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3">
                    <label htmlFor="codigo_sd">Código SD</label>
                    <input
                      type="text"
                      name="codigo_sd"
                      id="codigo_sd"
                      className="form-control"
                      disabled
                      value={sdCode}
                    />
                  </div>
                  <div className="col-md-2">
                    <label htmlFor="data_abertura_sd">Dt. Criação</label>
                    <input
                      type="text"
                      name="criacao"
                      id="criacao"
                      className="form-control"
                      disabled
                      value={sdData}
                    />
                  </div>
                  <div className="col-md-2">
                    <label htmlFor="data_envio_email_sd">Dt. Envio E-mail</label>
                    <input
                      type="text"
                      name="envio"
                      id="envio"
                      disabled
                      className="form-control disabled"
                      value={dataEnvioEmail.trim() !== "" ? fixDate(dataEnvioEmail) : dataEnvioEmail}
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="solicitante_sd">Solicitante</label>
                    <input
                      type="text"
                      name="solicitante_sd"
                      id="solicitante_sd"
                      className="form-control disabled" disabled
                      value={sdUser}
                    />
                  </div>
                  <div className="col-md-2">
                    <label htmlFor="status_sd">Status</label>
                    <input
                      type="text"
                      name="status_sd"
                      id="status_sd"
                      disabled
                      className="form-control disabled"
                      value={sdStatus}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="row div-contract">
                  <div className="col-md-12">
                    <p>{contractTitle}</p>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="regra_desativacao">Regra Desativação</label>
                    <textarea name="regra_desativacao" id="regra_desativacao" className="form-control disabled" disabled value={regra} />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="multa">Multa Recisória</label>
                    <textarea name="multa" id="multa" className="form-control disabled" disabled value={multa} />
                  </div>
                  <div className="col-md-12">
                    <label htmlFor="prazo">Prazo para fim de Faturamento</label>
                    <textarea name="prazo" id="prazo" className="form-control disabled" value={prazo} disabled />
                  </div>
                </div>
              </div>
            </div>
            <div className="row div-provedor">
              <div className="col-md-6">
                <label>Provedor</label>
                <p data-toggle="tooltip" title="Editar Provedor/Contatos">
                  <a onClick={() => handleProvedor()} className={`provedor ${!linkVendor && "provedor-disabled"}`}>{data.vendor.name}</a>
                </p>
              </div>
              <div className="col-md-6">
                <label htmlFor="print_attach" className="print_attach">
                  <input
                    type="checkbox"
                    name="print_attach" id="print_attach"
                    className="check"
                    {...{ disabled: action.name == "view" && "disabled" }}
                    checked={printAttach}
                    key={1}
                    onChange={() => { setPrintAttach(!printAttach); }}
                  />
                  <span>&nbsp;&nbsp;Imprimir e Assinar Formulário</span>
                </label>
                <div className="btns">
                  {showDownloadForm && <a className="btn btn-link" onClick={() => handleVendorForm()}>
                    <i className="fa fa-cloud-download text-success" data-toggle="tooltip" title="Gerar Formulário do Provedor" />
                  </a>}
                  {allowUpload && <a onClick={() => handleAttachFiles()} className="btn btn-link">
                    <i className="fa fa-cloud-upload text-primary" data-toggle="tooltip" title="Anexar/Visualizar Arquivos e Formulários" />
                  </a>}
                  {allowSendMail && <button
                    type="button"
                    className="btn btn-link"
                    onClick={() => handleSendMail()}
                    disabled={selectedLLs && selectedLLs?.length === 0}
                    >
                    <i className="fa fa-envelope text-dark" data-toggle="tooltip" title="Enviar Email" />
                  </button>}
                  {showDownloadIntelig && <a onClick={() => handleDownloadIntelig()} className="btn btn-link">
                    <i className="fa fa-download text-danger" data-toggle="tooltip" title="Exibir Formulários Intelig" />
                  </a>}
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="obs">Observação</label>
              <textarea name="obs" id="obs" className="form-control"  {...{ disabled: action.name == "view" && "disabled" }} />
            </div>
          </div>
        </div>
        <div className="sd-form-circ">
          <TableCircuito
            rows={circ}
            handleContract={handleContract}
            setSelected={setSelectedLLs}
            selected={selectedLLs}
            allSelected={allSelected}
            setAllSelected={setAllSelected}
            setRemarks={setRemarks}
            {...tblCircProps}
          />
        </div>
        <div className="calc-multas">
          <div className="row">
            <div className="col-md-1" />
            <div className="col-md-2">
              <div>
                <label htmlFor="calcMulta">Calcular Multas</label>
              </div>
              <button className="btn btn-success btn-sm">
                <i className="fa fa-calculator"></i> &nbsp;Calcular
              </button>
            </div>
            <div className="col-md-2">
              <label>Mensalidade (s/imp) R$</label>
              <input
                type="text"
                id="mensalidade-s-imp"
                className="form-control"
              />
            </div>
            <div className="col-md-2">
              <label>Taxa Desativação R$</label>
              <input
                type="text"
                id="taxa-desativacao"
                className="form-control"
              />
            </div>
            <div className="col-md-2">
              <label>Multa R$</label>
              <input
                type="text"
                id="multa"
                className="form-control"
              />
            </div>
            <div className="col-md-2">
              <label>Saving no Ano R$</label>
              <input
                type="text"
                id="saving-ano"
                className="form-control"
              />
            </div>
          </div>
        </div>
        <div className="footer">
          {action.name === "new" && <a onClick={() => handleSaveSd()} className="btn btn-primary">Salvar</a>}
          {action.name === "edit" && <a onClick={() => handleEditSd()} className="btn btn-primary">Salvar</a>}
        </div>
      </div>

      {allowUpload && <ModalForm
        LabelButtonSubmit="SD"
        id="sd-files"
        title="Anexar arquivos"
        dimension="modal-g2 d-modal-attach"
      >
        <AnexarArquivos upload={action.name == "edit"} />
      </ModalForm>}

      <ModalForm
        LabelButtonSubmit="SD"
        id="sd-vendor"
        title={`Detalhes Provedor ${data.vendor.name}`}
        dimension="modal-g1 d-modal-attach no-scroll"
      >
        <Provedor
          nomeProvedor={data.vendor.name}
          siglaProvedor={data.vendor.short_name}
        />
      </ModalForm>

      {showDownloadIntelig && <ModalForm
        LabelButtonSubmit="SD"
        id="sd-intelig"
        title="Formulário Intelig"
        dimension="modal-m modal-intelig no-scroll"
      >
        <Intelig />
      </ModalForm>}

      {allowSendMail && <ModalForm
        LabelButtonSubmit="SD"
        id="sd-mail"
        title="Envio de Email"
        dimension="modal-mail no-scroll"
      >
        <Email initFunction={init} />
      </ModalForm>}

      {showDownloadForm && <ModalForm
        LabelButtonSubmit="SD"
        id="sd-vendor-form"
        title="Gerar Formulário do Provedor"
        dimension="modal-md1 no-scroll"
      >
        <VendorForm/>
      </ModalForm>}

    </React.Fragment>
  )

}

// const Form = reduxForm({ form: "sdForm" })(SdForm)

const mapStateToProps = state => {
  return {
    auth: state.auth,
    reducer: state.sdFormReducer,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  saveSd,
  get_files_by_sd,
  get_all_data_providers,
  get_intelig_contract_forms,
  get_ot_segmentations,
  get_form_data,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SdForm)
