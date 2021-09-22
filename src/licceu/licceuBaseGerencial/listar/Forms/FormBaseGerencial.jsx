/* eslint-disable react/no-array-index-key */
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Field, reduxForm } from "redux-form";
// import { alteraFoco } from "../actions";

const FormBaseGerencial = ({ disableInputChave }) => (
  <main className="fade-in fade-out">
    <form className="form">
      <section className="col-md-3">
        <div className="box box-primary licceu-mw-filter">
          <div className="box-body">
            <div>
              <div className="col-md-6">
                <label htmlFor="chaveVendor">Chave/Vendor</label>
                <Field
                  id="chaveVendor"
                  name="chaveVendor"
                  component="input"
                  className="form-control input-sm"
                  disabled
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="chave">Chave</label>
                <Field
                  id="chave"
                  name="chave"
                  component="input"
                  className="form-control input-sm"
                  disabled={disableInputChave}
                />
              </div>
            </div>

            <div>
              <div className="col-md-6">
                <label htmlFor="ano">Ano</label>
                <Field
                  id="ano"
                  name="ano"
                  component="input"
                  className="form-control input-sm"
                  disabled
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="indice">Indice</label>
                <Field
                  id="indice"
                  name="indice"
                  component="input"
                  className="form-control input-sm"
                  disabled
                />
              </div>
            </div>

            <div className="col-md-12">
              <label htmlFor="projPrincipal">Status Single Chave</label>
              <Field
                id="statusSingleChave"
                name="statusSingleChave"
                component="input"
                className="form-control input-sm"
              />
            </div>

            <div>
              <div className="col-md-6">
                <label htmlFor="epm">EPM</label>
                <Field
                  id="epm"
                  name="epm"
                  component="input"
                  className="form-control input-sm"
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="carimboProjetos">
                  Carimbo Projetos (PLO's de Acesso)
                </label>
                <Field
                  id="carimboProjetos"
                  name="carimboProjetos"
                  component="input"
                  className="form-control input-sm"
                />
              </div>
            </div>

            <div className="col-md-12">
              <label htmlFor="projPrincipal">Projeto Principal</label>
              <Field
                id="projPrincipal"
                name="projPrincipal"
                component="input"
                className="form-control input-sm"
              />
            </div>

            <div>
              <div className="col-md-6">
                <label htmlFor="projSecund">Projeto Secundário</label>
                <Field
                  id="projSecund"
                  name="projSecund"
                  component="input"
                  className="form-control input-sm"
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="detailProjAssociado">
                  Detalhamento: Projeto Associado
                </label>
                <Field
                  id="detailProjAssociado"
                  name="detailProjAssociado"
                  component="input"
                  className="form-control input-sm"
                />
              </div>
            </div>

            <div>
              <div className="col-md-6">
                <label htmlFor="amplDetail">Ampliação (Detalhamento)</label>
                <Field
                  id="amplDetail"
                  name="amplDetail"
                  component="input"
                  className="form-control input-sm"
                  // ref={alteraFoco}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="capacidadeNecessaria">
                  Capacidade Necessária NFE - Atual
                </label>
                <Field
                  id="capacidadeNecessaria"
                  name="capacidadeNecessaria"
                  component="input"
                  className="form-control input-sm"
                />
              </div>
            </div>

            <div>
              <div className="col-md-6">
                <label htmlFor="capacidadeTotalEnlace">
                  Capacidade Total Enlace (NFE:)
                </label>
                <Field
                  id="capacidadeTotalEnlace"
                  name="capacidadeTotalEnlace"
                  component="input"
                  className="form-control input-sm"
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="capacidadeProjetada">
                  Capacidade Projetada (Enlace)
                </label>
                <Field
                  id="capacidadeProjetada"
                  name="capacidadeProjetada"
                  component="input"
                  className="form-control input-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="col-md-3">
        <div className="box box-primary licceu-mw-filter">
          <div className="box-body">
            <div className="col-md-12">
              <label htmlFor="enlaceEndId">Enlace (End_ID)</label>
              <Field
                id="enlaceEndId"
                name="enlaceEndId"
                component="input"
                className="form-control input-sm"
              />
            </div>

            <div>
              <div className="col-md-6">
                <label htmlFor="endIdPontaA">End_ID Ponta A</label>
                <Field
                  id="endIdPontaA"
                  name="endIdPontaA"
                  component="input"
                  className="form-control input-sm"
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="endIdPontaB">End_ID Ponta B</label>
                <Field
                  id="endIdPontaB"
                  name="endIdPontaB"
                  component="input"
                  className="form-control input-sm"
                />
              </div>
            </div>

            <div>
              <div className="col-md-6">
                <label htmlFor="pontaA">Ponta A</label>
                <Field
                  id="pontaA"
                  name="pontaA"
                  component="input"
                  className="form-control input-sm"
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="pontaB">Ponta B</label>
                <Field
                  id="pontaB"
                  name="pontaB"
                  component="input"
                  className="form-control input-sm"
                />
              </div>
            </div>

            <div>
              <div className="col-md-6">
                <label htmlFor="regional">Regional</label>
                <Field
                  id="regional"
                  name="regional"
                  component="input"
                  className="form-control input-sm"
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="uf">UF</label>
                <Field
                  id="uf"
                  name="uf"
                  component="input"
                  className="form-control input-sm"
                />
              </div>
            </div>

            <div>
              <div className="col-md-6">
                <label htmlFor="municipio">Município</label>
                <Field
                  id="municipio"
                  name="municipio"
                  component="input"
                  className="form-control input-sm"
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="lastMile">Last Mile</label>
                <Field
                  id="lastMile"
                  name="lastMile"
                  component="input"
                  className="form-control input-sm"
                />
              </div>
            </div>

            <div className="col-md-12">
              <label htmlFor="pontaANovoExist">Ponta A (Novo/Existente)</label>
              <Field
                id="pontaANovoExist"
                name="pontaANovoExist"
                component="input"
                className="form-control input-sm"
              />
            </div>

            <div>
              <div className="col-md-7">
                <label htmlFor="distanciaEnlace">Distância Enlace (KM)</label>
                <Field
                  id="distanciaEnlace"
                  name="distanciaEnlace"
                  component="input"
                  className="form-control input-sm"
                />
              </div>
              <div className="col-md-5">
                <label htmlFor="lastMile">End_ID Filiação</label>
                <Field
                  id="lastMile"
                  name="lastMile"
                  component="input"
                  className="form-control input-sm"
                />
              </div>
            </div>

            <div>
              <div className="col-md-7">
                <label htmlFor="filiacao">Filiação</label>
                <Field
                  id="filiacao"
                  name="filiacao"
                  component="input"
                  className="form-control input-sm"
                />
              </div>
              <div className="col-md-5">
                <label htmlFor="meioTx">Meio TX</label>
                <Field
                  id="meioTx"
                  name="meioTx"
                  component="input"
                  className="form-control input-sm"
                />
              </div>
            </div>

            <div>
              <div className="col-md-7">
                <label htmlFor="observacaoControllerNew">
                  Observação Controller
                </label>
                <Field
                  id="observacaoControllerNew"
                  name="observacaoControllerNew"
                  component="input"
                  className="form-control input-sm"
                />
              </div>
              <div className="col-md-5">
                <label htmlFor="obsFocalNew">Observação Focal</label>
                <Field
                  id="obsFocalNew"
                  name="obsFocalNew"
                  component="input"
                  className="form-control input-sm"
                />
              </div>
            </div>

            <div>
              <div className="col-md-6">
                {/* <label htmlFor="multi_licceu_id">Observação Controller</label> */}
                <Field
                  id="observacaoController"
                  name="observacaoController"
                  component="textarea"
                  className="form-control input-sm"
                  rows="5"
                  disabled
                />
              </div>
              <div className="col-md-6">
                {/* <label htmlFor="multi_licceu_id">Observação Focal</label> */}
                <Field
                  id="obsFocal"
                  name="obsFocal"
                  component="textarea"
                  className="form-control input-sm"
                  rows="5"
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="col-md-3">
        <div className="box box-primary licceu-mw-filter">
          <div className="box-body">
            <div className="col-md-12">
              <div>
                <div className="col-md-6">
                  <label htmlFor="dataUltAlteracaoController">
                    Data Última Controller
                  </label>
                  <Field
                    id="dataUltAlteracaoController"
                    name="dataUltAlteracaoController"
                    component="input"
                    className="form-control input-sm"
                    disabled
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="dataUltAlteracaoFocal">
                    Data Última Alteração Focal
                  </label>
                  <Field
                    id="dataUltAlteracaoFocal"
                    name="dataUltAlteracaoFocal"
                    component="input"
                    className="form-control input-sm"
                    disabled
                  />
                </div>
              </div>

              <div>
                <div className="col-md-7">
                  <label htmlFor="novosMunicipios">Novos Municípios</label>
                  <Field
                    id="novosMunicipios"
                    name="novosMunicipios"
                    component="input"
                    className="form-control input-sm"
                  />
                </div>
                <div className="col-md-5">
                  <label htmlFor="historico">Histórico</label>
                  <Field
                    id="historico"
                    name="historico"
                    component="input"
                    className="form-control input-sm"
                  />
                </div>
              </div>

              <div>
                <div className="col-md-6">
                  <label htmlFor="vendorExecucao">Vendor Execução</label>
                  <Field
                    id="vendorExecucao"
                    name="vendorExecucao"
                    component="input"
                    className="form-control input-sm"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="radioMw">Radio MW</label>
                  <Field
                    id="radioMw"
                    name="radioMw"
                    component="input"
                    className="form-control input-sm"
                  />
                </div>
              </div>

              <div>
                <div className="col-md-6">
                  <label htmlFor="modeloRadio">Modelo Radio</label>
                  <Field
                    id="modeloRadio"
                    name="modeloRadio"
                    component="input"
                    className="form-control input-sm"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="regionalLicceu">Regional Licceu</label>
                  <Field
                    id="regionalLicceu"
                    name="regionalLicceu"
                    component="input"
                    className="form-control input-sm"
                  />
                </div>
              </div>

              <div>
                <div className="col-md-6">
                  <label htmlFor="statusLicceuId">Status Licceu</label>
                  <Field
                    id="statusLicceuId"
                    name="statusLicceuId"
                    component="input"
                    className="form-control input-sm"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="licceuId">Licceu ID</label>
                  <Field
                    id="licceuId"
                    name="licceuId"
                    component="input"
                    className="form-control input-sm"
                  />
                </div>
              </div>

              <div className="col-md-12">
                <label htmlFor="envioReqRegional">
                  Envio de Requisitos a Regional (ENG.) Real
                </label>
                <Field
                  id="envioReqRegional"
                  name="envioReqRegional"
                  component="input"
                  className="form-control input-sm"
                />
              </div>

              <div className="col-md-12">
                <label htmlFor="saldoLo">Saldo LO</label>
                <Field
                  id="saldoLo"
                  name="saldoLo"
                  component="input"
                  className="form-control input-sm"
                />
              </div>

              <div>
                <div className="col-md-6">
                  <label htmlFor="projeto">Projeto</label>
                  <Field
                    id="projeto"
                    name="projeto"
                    component="input"
                    className="form-control input-sm"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="subProjeto">Sub Projeto</label>
                  <Field
                    id="subProjeto"
                    name="subProjeto"
                    component="input"
                    className="form-control input-sm"
                  />
                </div>
              </div>

              <div className="col-md-12">
                <label htmlFor="elementDetail">Element Detail</label>
                <Field
                  id="elementDetail"
                  name="elementDetail"
                  component="input"
                  className="form-control input-sm"
                />
              </div>
              <div>
                <div className="col-md-6">
                  <label htmlFor="boqProjComplementar">Boq Complementar</label>
                  <Field
                    id="boqProjComplementar"
                    name="boqProjComplementar"
                    component="input"
                    className="form-control input-sm"
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="statusBoqProj">Status Boq Projeto</label>
                  <Field
                    id="statusBoqProj"
                    name="statusBoqProj"
                    component="input"
                    className="form-control input-sm"
                  />
                </div>
              </div>

              <div>
                <div className="col-md-6">
                  <label htmlFor="statusBoqHwPontaA">
                    Status Boq HW-Ponta A
                  </label>
                  <Field
                    id="statusBoqHwPontaA"
                    name="statusBoqHwPontaA"
                    component="input"
                    className="form-control input-sm"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="statusBoqHwPontaB">
                    Status Boq HW-Ponta B
                  </label>
                  <Field
                    id="statusBoqHwPontaB"
                    name="statusBoqHwPontaB"
                    component="input"
                    className="form-control input-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="col-md-3">
        <div className="box box-primary licceu-mw-filter">
          <div className="box-body">
            <div className="col-md-12">
              <div>
                <div className="col-md-6">
                  <label htmlFor="statusBoqSePontaA">
                    Status Boq SE-Ponta A
                  </label>
                  <Field
                    id="statusBoqSePontaA"
                    name="statusBoqSePontaA"
                    component="input"
                    className="form-control input-sm"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="statusBoqSePontaB">
                    Status Boq SE-Ponta B
                  </label>
                  <Field
                    id="statusBoqSePontaB"
                    name="statusBoqSePontaB"
                    component="input"
                    className="form-control input-sm"
                  />
                </div>
              </div>

              <div>
                <div className="col-md-6">
                  <label htmlFor="statusBoqInfraA">Status Boq Infra A</label>
                  <Field
                    id="statusBoqInfraA"
                    name="statusBoqInfraA"
                    component="input"
                    className="form-control input-sm"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="statusBoqInfraB">Status Boq Infra B</label>
                  <Field
                    id="statusBoqInfraB"
                    name="statusBoqInfraB"
                    component="input"
                    className="form-control input-sm"
                  />
                </div>
              </div>

              <div>
                <div className="col-md-6">
                  <label htmlFor="chaveSubstituta">Chave Substituta</label>
                  <Field
                    id="chaveSubstituta"
                    name="chaveSubstituta"
                    component="input"
                    className="form-control input-sm"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="obsController">OBS Controller</label>
                  <Field
                    id="obsController"
                    name="obsController"
                    component="input"
                    className="form-control input-sm"
                  />
                </div>
              </div>

              <div>
                <div className="col-md-6">
                  <label htmlFor="controleAlter">Controle de Alteração</label>
                  <Field
                    id="controleAlter"
                    name="controleAlter"
                    component="input"
                    className="form-control input-sm"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="dataDeclinioFo">Data Declínio FO</label>
                  <Field
                    id="dataDeclinioFo"
                    name="dataDeclinioFo"
                    component="input"
                    className="form-control input-sm"
                  />
                </div>
              </div>

              <div className="col-md-12">
                <label htmlFor="rltTemplateRolloutUni">Status Rollout NI</label>
                <Field
                  id="rltTemplateRolloutUni"
                  name="rltTemplateRolloutUni"
                  component="input"
                  className="form-control input-sm"
                />
              </div>

              <div className="col-md-12">
                <label htmlFor="acaoAlinhamento">Ação Alinhamento</label>
                <Field
                  id="acaoAlinhamento"
                  name="acaoAlinhamento"
                  component="input"
                  className="form-control input-sm"
                />
              </div>

              <div className="col-md-12">
                <label htmlFor="dataInclusao">
                  Data de Inclusão Criação de Chave
                </label>
                <Field
                  id="dataInclusao"
                  name="dataInclusao"
                  component="input"
                  className="form-control input-sm"
                  disabled
                />
              </div>

              <div className="col-md-12">
                <label htmlFor="rltInclusao">RLT Inclusão Planilha TSD</label>
                <Field
                  id="rltInclusao"
                  name="rltInclusao"
                  component="input"
                  className="form-control input-sm"
                />
              </div>

              <div className="col-md-12">
                <label htmlFor="projetoInclusao">Projeto Inclusão</label>
                <Field
                  id="projetoInclusao"
                  name="projetoInclusao"
                  component="input"
                  className="form-control input-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </form>
  </main>
);

const mapActionsFormsBaseGerencial = dispatch =>
  bindActionCreators({ dispatch }, dispatch);

export default reduxForm({
  form: "formBaseGerencial"
})(
  connect(
    null,
    mapActionsFormsBaseGerencial
  )(FormBaseGerencial)
);
