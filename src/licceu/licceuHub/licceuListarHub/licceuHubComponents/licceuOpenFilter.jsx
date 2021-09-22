import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { DropdownList } from "react-widgets";
import { LicceuLabel } from "../../../licceuComponents/ui";
import { clearFilter } from "../actions";
import "./styles.css";
import { ufs, status, tipoLink } from "./const";

const renderDropdownList = ({ input, data }) => (
  <DropdownList {...input} filter data={data} placeholder="Selecione" />
);

let LicceuOpenFilter = ({
  activeForm,
  handleSubmit,
  clearFilter,
  licceuHubOpenFilter: { regional, municipios, interfaces }
}) => {
  return (
    <main className="fade-in fade-out">
      <form className="form" onSubmit={handleSubmit}>
        <section className="col-md-4 ">
          <div className="box box-primary licceu-hub-filter">
            <div className="box-body">
              <LicceuLabel htmlFor="multiplosSites" text="Múltiplos Sites" />
              <Field
                className="form-control input-sm"
                type="text"
                name="multiplosSites"
                id="multiplosSites"
                component="input"
              />

              <div className="col-md-6">
                <LicceuLabel htmlFor="regionalA" text="Regional A" />
                <Field
                  name="regionalA"
                  component={renderDropdownList}
                  data={regional.map(data => data)}
                />
              </div>

              <div className="col-md-6">
                <LicceuLabel htmlFor="regionalB" text="Regional B" />
                <Field
                  name="regionalB"
                  component={renderDropdownList}
                  data={regional.map(data => data)}
                />
              </div>

              <div className="col-md-6">
                <LicceuLabel htmlFor="ufA" text="UF A" />
                <Field
                  name="ufA"
                  component={renderDropdownList}
                  data={ufs.map(data => data)}
                />
              </div>

              <div className="col-md-6">
                <LicceuLabel htmlFor="ufB" text="UF B" />
                <Field
                  name="ufB"
                  component={renderDropdownList}
                  data={ufs.map(data => data)}
                />
              </div>

              <div className="col-md-6">
                <LicceuLabel htmlFor="cidadeA" text="Cidade A" />
                <Field
                  name="cidadeA"
                  component={renderDropdownList}
                  data={municipios.map(data => data)}
                />
              </div>

              <div className="col-md-6">
                <LicceuLabel htmlFor="cidadeB" text="Cidade B" />
                <Field
                  name="cidadeB"
                  component={renderDropdownList}
                  data={municipios.map(data => data)}
                />
              </div>

              <LicceuLabel htmlFor="status" text="Status" />
              <Field
                name="status"
                component={renderDropdownList}
                data={status.map(data => data)}
              />

              <LicceuLabel htmlFor="tipoLink" text="Tipo de Link" />
              <Field
                name="tipoLink"
                component={renderDropdownList}
                data={tipoLink.map(data => data)}
              />
            </div>
          </div>
        </section>
        <section className="col-md-4">
          <div className="box box-primary licceu-hub-filter">
            <div className="box-body">
              <LicceuLabel
                htmlFor="multiplosLicceuIds"
                text="Múltiplos Licceu ID"
              />
              <Field
                className="form-control input-sm"
                type="text"
                name="multiplosLicceuIds"
                id="multiplosLicceuIds"
                component="input"
              />

              <LicceuLabel
                htmlFor="multiplosEnderecos"
                text="Múltiplos Endereços"
              />
              <Field
                className="form-control input-sm"
                type="text"
                name="multiplosEnderecos"
                id="multiplosEnderecos"
                component="input"
              />

              <LicceuLabel htmlFor="tecnologia" text="Tecnologia" />
              <Field
                className="form-control input-sm"
                type="text"
                name="tecnologia"
                id="tecnologia"
                component="input"
              />

              <LicceuLabel htmlFor="interfaceHub" text="Interface" />
              <Field
                name="interfaceHub"
                component={renderDropdownList}
                data={interfaces.map(data => data)}
              />

              <div className="col-md-6">
                <LicceuLabel htmlFor="sigla2gA" text="Sigla 2G A" />
                <Field
                  className="form-control input-sm"
                  type="text"
                  name="sigla2gA"
                  id="sigla2gA"
                  component="input"
                />
              </div>

              <div className="col-md-6">
                <LicceuLabel htmlFor="sigla2gB" text="Sigla 2G B" />
                <Field
                  className="form-control input-sm"
                  type="text"
                  name="sigla2gB"
                  id="sigla2gB"
                  component="input"
                />
              </div>

              <div className="col-md-6">
                <LicceuLabel htmlFor="enderecoIdA" text="END_ID A" />
                <Field
                  className="form-control input-sm"
                  type="text"
                  name="enderecoIdA"
                  id="enderecoIdA"
                  component="input"
                />
              </div>

              <div className="col-md-6">
                <LicceuLabel htmlFor="enderecoIdB" text="END_ID B" />
                <Field
                  className="form-control input-sm"
                  type="text"
                  name="enderecoIdB"
                  id="enderecoIdB"
                  component="input"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="col-md-4">
          <div className="box box-primary licceu-hub-filter">
            <div className="box-body">
              <LicceuLabel htmlFor="multiplosOt" text="Múltiplas OTs" />
              <Field
                className="form-control input-sm"
                type="text"
                name="multiplosOt"
                id="multiplosOt"
                component="input"
              />

              <LicceuLabel htmlFor="engTx" text="ENG-TX" />
              <Field
                className="form-control input-sm"
                type="text"
                name="engTx"
                id="engTx"
                component="input"
              />

              <LicceuLabel
                htmlFor="engenheiroResp"
                text="Engenheiro Responsável"
              />
              <Field
                className="form-control input-sm"
                type="text"
                name="engenheiroResp"
                id="engenheiroResp"
                component="input"
              />
            </div>
          </div>
        </section>
        <button
          type="submit"
          className="btn btn-primary filtrar"
          disabled={!!activeForm && Object.keys(activeForm).length < 4 && true}
        >
          <i className="fa fa-search" style={{ margin: "0 10px 0 0" }} />
          Filtrar
        </button>
        <button type="button" className="btn btn-danger" onClick={clearFilter}>
          <i className="fa fa-bitbucket" style={{ margin: "0 10px 0 0" }} />
          Limpar
        </button>
      </form>
    </main>
  );
};

const mapStateToProps = state => ({
  licceuHubOpenFilter: state.licceuHubOpenFilter,
  activeForm: state.form.licceuHubFilter
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ clearFilter }, dispatch);

LicceuOpenFilter = reduxForm({ form: "licceuHubFilter" })(LicceuOpenFilter);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LicceuOpenFilter);
