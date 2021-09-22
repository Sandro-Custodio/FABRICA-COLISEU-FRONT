import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Table } from "../../../common";
import { columns, columnWidths } from "./visualizarTable.json";

let VisualizarSD = ({ tableData }) => {
  return (
    <main className="fade-in fade-out">
      <form className="form">
        <div className="row-eq-height">
          <section className="col-md-4">
            <div className="box box-primary">
              <div className="box-body">
                <div className="box-header with-border">
                  <h3 className="box-title">ODs</h3>
                </div>
                <label htmlFor="od_code">Código OD</label>
                <Field
                  className="form-control input-sm"
                  type="text"
                  name="od_code"
                  id="od_code"
                  component="input"
                  readOnly
                />

                <label htmlFor="od_dt_abertura">Data Abertura</label>
                <Field
                  className="form-control input-sm"
                  type="text"
                  name="od_dt_abertura"
                  id="od_dt_abertura"
                  component="input"
                  readOnly
                />

                <label htmlFor="od_user">Solicitante</label>
                <Field
                  className="form-control input-sm"
                  type="text"
                  name="od_user"
                  id="od_user"
                  component="input"
                  readOnly
                />

                <label htmlFor="od_status">Status</label>
                <Field
                  className="form-control input-sm"
                  type="text"
                  name="od_status"
                  id="od_status"
                  component="input"
                  readOnly
                />
              </div>
            </div>
          </section>
          <section className="col-md-4 ">
            <div className="box box-info">
              <div className="box-body">
                <div className="box-header with-border">
                  <h3 className="box-title">SDs</h3>
                </div>
                <label htmlFor="sd_code">Código SD</label>
                <Field
                  className="form-control input-sm"
                  type="text"
                  name="sd_code"
                  id="sd_code"
                  component="input"
                  readOnly
                />

                <label htmlFor="sd_dt_criacao">Data Criação</label>
                <Field
                  className="form-control input-sm"
                  type="text"
                  name="sd_dt_criacao"
                  id="sd_dt_criacao"
                  component="input"
                  readOnly
                />

                <label htmlFor="sd_dt_envio_email">Data Envio E-mail</label>
                <Field
                  className="form-control input-sm"
                  type="text"
                  name="sd_dt_envio_email"
                  id="sd_dt_envio_email"
                  component="input"
                  readOnly
                />

                <label htmlFor="sd_user">Solicitante</label>
                <Field
                  className="form-control input-sm"
                  type="text"
                  name="sd_user"
                  id="sd_user"
                  component="input"
                  readOnly
                />

                <label htmlFor="sd_status">Status</label>
                <Field
                  className="form-control input-sm"
                  type="text"
                  name="sd_status"
                  id="sd_status"
                  component="input"
                  readOnly
                />
              </div>
            </div>
          </section>
          <section className="col-md-4 ">
            <div className="box box-warning">
              <div className="box-body">
                <div className="box-header with-border">
                  <h3 className="box-title">Contrato</h3>
                </div>
                <label htmlFor="regraDesativacao">Regra Desativação</label>
                <Field
                  className="form-control input-sm"
                  type="text"
                  name="regraDesativacao"
                  id="regraDesativacao"
                  component="input"
                  readOnly
                />

                <label htmlFor="multaRescisoria">Multa Rescisória</label>
                <Field
                  className="form-control input-sm"
                  type="text"
                  name="multaRescisoria"
                  id="multaRescisoria"
                  component="input"
                  readOnly
                />

                <label htmlFor="prazoFaturamento">
                  Prazo para fim de Faturamento
                </label>
                <Field
                  className="form-control input-sm"
                  type="text"
                  name="prazoFaturamento"
                  id="prazoFaturamento"
                  component="input"
                  readOnly
                />
              </div>
            </div>
          </section>
        </div>
        <section className="col-md-12">
          <div className="box box-success">
            <div className="box-body" style={{ paddingLeft: "0" }}>
              <div className="col-md-4" style={{ paddingLeft: "0" }}>
                <label htmlFor="provedor">Provedor</label>
                <Field
                  className="form-control input-sm"
                  type="text"
                  name="provedor"
                  id="provedor"
                  component="input"
                  readOnly
                />
              </div>

              <div className="col-md-4 download-upload">
                <i
                  className="fa fa-upload text-green"
                  title="Anexar/Visualizar Arquivos e Formulários"
                />
                <i
                  className="fa fa-download text-blue"
                  title="Exibir Formulários Intelig"
                />
              </div>

              <div className="col-md-4 checkbox">
                <Field
                  type="checkbox"
                  name="imprimirFormulario"
                  id="imprimirFormulario"
                  component="input"
                  readOnly
                />
                <label htmlFor="imprimirFormulario">
                  Imprimir e Assinar Formulário
                </label>
              </div>
            </div>

            <label htmlFor="observacoes">Observação</label>
            <Field
              className="form-control input-sm"
              name="observacoes"
              id="observacoes"
              component="textarea"
              rows="3"
              readOnly
            />
          </div>
        </section>
        <section className="visualizar-table">
          <Table
            columns={columns}
            columnWidths={columnWidths}
            rows={tableData}
            disablePagination
          />
        </section>
        <section className="col-md-12">
          <div className="col-md-3">
            <label htmlFor="mensalidade_sem_imposto">
              Mensalidade(s/ imp.) R$
            </label>
            <Field
              className="form-control input-sm"
              type="text"
              name="mensalidade_sem_imposto"
              id="mensalidade_sem_imposto"
              component="input"
              readOnly
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="taxa_desativacao">Taxa Desativação R$</label>
            <Field
              className="form-control input-sm"
              type="text"
              name="taxa_desativacao"
              id="taxa_desativacao"
              component="input"
              readOnly
            />
          </div>

          <div className="col-md-3">
            <label htmlFor="multa">Multa R$</label>
            <Field
              className="form-control input-sm"
              type="text"
              name="multa"
              id="multa"
              component="input"
              readOnly
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="saving">Saving R$</label>
            <Field
              className="form-control input-sm"
              type="text"
              name="saving"
              id="saving"
              component="input"
              readOnly
            />
          </div>
        </section>
      </form>
    </main>
  );
};

const mapStateToProps = state => ({
  listarSD: state.listarSD
});

VisualizarSD = reduxForm({ form: "visualizarSD" })(VisualizarSD);

export default connect(mapStateToProps)(VisualizarSD);
