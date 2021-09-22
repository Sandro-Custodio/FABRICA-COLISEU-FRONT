/* eslint-disable react/no-array-index-key */
import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { LicceuLabel } from "../../../licceuComponents/ui";
import "./styles.css";
import { status } from "./const";

let LicceuEditarHub = ({
  activeForm,
  handleSubmit,
  licceuEditarHub: { interfaces },
  hub
}) => {
  return (
    <main className="fade-in fade-out">
      <form className="form" onSubmit={handleSubmit}>
        <section className="col-md-3 ">
          <div className="box box-primary licceu-hub-editar">
            <div className="box-body">
              <LicceuLabel htmlFor="status" text="Status:" />
              <Field
                className="form-control input-sm"
                name="status"
                component="select"
              >
                {!hub.status && <option></option>}
                {status.map((data, i) => (
                  <option key={i}>{data}</option>
                ))}
              </Field>

              <LicceuLabel htmlFor="pontaARegional" text="Regional A:" />
              <Field
                className="form-control input-sm"
                name="pontaARegional"
                component="input"
                type="text"
                disabled
              />

              <LicceuLabel htmlFor="pontaAMunicipio" text="Município A:" />
              <Field
                className="form-control input-sm"
                name="pontaAMunicipio"
                component="input"
                type="text"
                disabled
              />

              <LicceuLabel htmlFor="modelo" text="Modelo:" />
              <Field
                className="form-control input-sm"
                name="modelo"
                component="input"
                type="text"
                disabled
              />

              <LicceuLabel
                htmlFor="vendorFornecedorOrigemFoLl"
                text="Vendor/Fornecedor Origem FO/LL:"
              />
              <Field
                className="form-control input-sm"
                name="vendorFornecedorOrigemFoLl"
                component="input"
                type="text"
                disabled
              />

              <LicceuLabel
                htmlFor="desCircuito"
                text="Designação do Circuito:"
              />
              <Field
                className="form-control input-sm"
                name="desCircuito"
                component="input"
                type="text"
              />

              <LicceuLabel htmlFor="ot" text="OT:" />
              <Field
                className="form-control input-sm"
                type="text"
                name="ot"
                id="ot"
                component="input"
              />

              <LicceuLabel
                htmlFor="dependenciaRotaLd"
                text="Dependência Rota LD:"
              />
              <Field
                className="form-control input-sm"
                name="dependenciaRotaLd"
                component="input"
                type="text"
                disabled
              />
            </div>
          </div>
        </section>
        <section className="col-md-3">
          <div className="box box-primary licceu-hub-editar">
            <div className="box-body">
              <LicceuLabel htmlFor="tipoLink" text="Tipo do Link:" />
              <Field
                className="form-control input-sm"
                name="tipoLink"
                component="input"
                type="text"
                disabled
              />

              <LicceuLabel htmlFor="pontaBRegional" text="Regional B:" />
              <Field
                className="form-control input-sm"
                name="pontaBRegional"
                component="input"
                type="text"
                disabled
              />

              <LicceuLabel htmlFor="pontaBMunicipio" text="Município B:" />
              <Field
                className="form-control input-sm"
                name="pontaBMunicipio"
                component="input"
                type="text"
                disabled
              />

              <LicceuLabel htmlFor="conceitoHub" text="Conceito HUB:" />
              <Field
                className="form-control input-sm"
                type="text"
                name="conceitoHub"
                id="conceitoHub"
                component="input"
              />

              <LicceuLabel
                htmlFor="vendorFornecedorDestFoLl"
                text="Vendor/Fornecedor Destino FO/LL:"
              />
              <Field
                className="form-control input-sm"
                name="vendorFornecedorDestFoLl"
                component="input"
                type="text"
                disabled
              />

              <LicceuLabel htmlFor="accId" text="ACC ID:" />
              <Field
                className="form-control input-sm"
                name="accId"
                component="input"
                type="text"
                disabled
              />

              <LicceuLabel htmlFor="engTx" text="ENG-TX:" />
              <Field
                className="form-control input-sm"
                name="engTx"
                component="input"
                type="text"
                disabled
              />
            </div>
          </div>
        </section>
        <section className="col-md-3">
          <div className="box box-primary licceu-hub-editar">
            <div className="box-body">
              <LicceuLabel htmlFor="pontaAElementoId" text="Site A:" />
              <Field
                className="form-control input-sm"
                type="text"
                name="pontaAElementoId"
                id="pontaAElementoId"
                component="input"
                disabled
              />

              <LicceuLabel htmlFor="pontaAUf" text="UF A:" />
              <Field
                className="form-control input-sm"
                type="text"
                name="pontaAUf"
                component="input"
                disabled
              />

              <LicceuLabel
                htmlFor="capacidadeSolicitada"
                text="Capacidade Solicitada(MBPS):"
              />
              <Field
                className="form-control input-sm"
                type="text"
                name="capacidadeSolicitada"
                id="capacidadeSolicitada"
                component="input"
              />

              <LicceuLabel htmlFor="interfaceHub" text="Interface:" />
              <Field
                className="form-control input-sm"
                name="interfaceHub"
                component="select"
              >
                {!hub.interfaceHub && <option></option>}
                {interfaces.map((data, i) => (
                  <option key={i}>{data}</option>
                ))}
              </Field>

              <LicceuLabel
                htmlFor="vendorFornecedorDestMw"
                text="Vendor/Fornecedor Destino MW:"
              />
              <Field
                className="form-control input-sm"
                name="vendorFornecedorDestMw"
                component="input"
                type="text"
                disabled
              />

              <LicceuLabel htmlFor="trailId" text="TRAIL ID:" />
              <Field
                className="form-control input-sm"
                name="trailId"
                component="input"
                type="text"
                disabled
              />

              <LicceuLabel
                htmlFor="engenheiroResp"
                text="Engenheiro Responsável:"
              />
              <Field
                className="form-control input-sm"
                type="text"
                name="engenheiroResp"
                id="engenheiroResp"
                component="input"
                disabled
              />
            </div>
          </div>
        </section>
        <section className="col-md-3">
          <div className="box box-primary licceu-hub-editar">
            <div className="box-body">
              <LicceuLabel htmlFor="pontaBElementoId" text="Site B:" />
              <Field
                className="form-control input-sm"
                type="text"
                name="pontaBElementoId"
                id="pontaBElementoId"
                component="input"
                disabled
              />

              <LicceuLabel htmlFor="pontaBUf" text="UF B:" />
              <Field
                className="form-control input-sm"
                type="text"
                name="pontaBUf"
                component="input"
                disabled
              />

              <LicceuLabel
                htmlFor="capacidadeContratada"
                text="Capacidade(MBPS):"
              />
              <Field
                className="form-control input-sm"
                type="text"
                name="capacidadeContratada"
                id="capacidadeContratada"
                component="input"
              />

              <LicceuLabel htmlFor="tecnologia" text="Tecnologia:" />
              <Field
                className="form-control input-sm"
                type="text"
                name="tecnologia"
                id="tecnologia"
                component="input"
              />

              <LicceuLabel
                htmlFor="vendorFornecedorOrigemMw"
                text="Vendor/Fornecedor Origem MW:"
              />
              <Field
                className="form-control input-sm"
                name="vendorFornecedorOrigemMw"
                component="input"
                type="text"
                disabled
              />

              <LicceuLabel htmlFor="slotPorta" text="SLOT/PORTA:" />
              <Field
                className="form-control input-sm"
                type="text"
                name="slotPorta"
                id="slotPorta"
                component="input"
              />

              <LicceuLabel htmlFor="observacao" text="Observacao:" />
              <Field
                className="form-control input-sm"
                type="text"
                name="observacao"
                id="observacao"
                component="input"
                disabled
              />
            </div>
          </div>
        </section>
        <button
          type="submit"
          className="btn btn-primary filtrar"
          disabled={!!activeForm && Object.keys(activeForm).length < 4 && true}
        >
          <i className="fa fa-floppy-o" style={{ margin: "0 10px 0 0" }} />
          Salvar
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => window.$("#licceuEditarHub").modal("hide")}
        >
          <i className="fa fa-ban" style={{ margin: "0 10px 0 0" }} />
          Cancelar
        </button>
      </form>
    </main>
  );
};

const mapStateToProps = state => ({
  licceuEditarHub: state.licceuHubOpenFilter,
  activeForm: state.form.licceuEditarHub
});

LicceuEditarHub = reduxForm({
  form: "licceuEditarHub"
})(LicceuEditarHub);

export default connect(mapStateToProps)(LicceuEditarHub);
