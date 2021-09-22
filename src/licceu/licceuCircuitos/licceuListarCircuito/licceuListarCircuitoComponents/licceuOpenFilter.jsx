import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Field, reduxForm } from "redux-form";
// import Overlay from "../../../../common/msg/overlay/overlay";
import { LicceuLabel } from "../../../licceuComponents/ui";
import { filter } from "../api.json";
import { clearFilter } from "../licceuActions";
import "./styles.css";

let LicceuOpenFilter = ({
  activeForm,
  handleSubmit,
  clearFilter,
  licceuCircuitoOpenFilter: { vendor_by_area, regional, uf, sn }
}) => {
  const [snoa, anel_cluster, municipio] = [sn[0], sn[1], sn[3]];
  return (
    <main className="fade-in fade-out circuito">
      <form className="form" onSubmit={handleSubmit}>
        <section className="col-md-4 ">
          <div className="box box-primary licceu-circuito">
            <div className="box-body">
              <LicceuLabel htmlFor="nome" text="Nome" />
              <Field
                className="form-control input-sm"
                type="text"
                name="nome"
                component="input"
              />

              <LicceuLabel htmlFor="endereco_id_a" text="Endereço ID A" />
              <Field
                className="form-control input-sm"
                type="text"
                name="endereco_id_a"
                component="input"
              />

              <LicceuLabel htmlFor="vendor" text="Fabricante" />
              <Field
                component="select"
                className="form-control input-sm"
                name="vendor"
              >
                <option value="" hidden>
                  Selecione
                </option>
                {vendor_by_area.map(todo => (
                  <option value={todo.name} key={todo.id}>
                    {todo.name}
                  </option>
                ))}
              </Field>

              <LicceuLabel htmlFor="status" text="Status" />
              <Field
                component="select"
                className="form-control input-sm"
                name="status"
              >
                <option value="" hidden>
                  Selecione
                </option>
                {filter.status.map(todo => (
                  <option value={todo.short_name} key={todo.id}>
                    {todo.value}
                  </option>
                ))}
              </Field>

              <LicceuLabel htmlFor="meio_tx" text="Meio TX" />
              <Field
                className="form-control input-sm"
                type="text"
                name="meio_tx"
                component="input"
              />

              <LicceuLabel htmlFor="anel_cluster" text="Anel/Cluster" />
              <Field
                component="select"
                className="form-control input-sm"
                name="rota"
                id="rota"
              >
                <option value="" hidden>
                  Selecione
                </option>
                {anel_cluster.map(todo => (
                  <option value={todo.anel_cluster} key={todo.anel_cluster}>
                    {todo.anel_cluster}
                  </option>
                ))}
              </Field>

              <LicceuLabel htmlFor="multiplos_sites" text="Múltiplos Sites" />
              <Field
                className="form-control input-sm"
                type="text"
                name="multiplos_sites"
                component="input"
              />

              <LicceuLabel htmlFor="codigo_ot" text="Código OT" />
              <Field
                className="form-control input-sm"
                type="text"
                name="codigo_ot"
                component="input"
              />

              <LicceuLabel htmlFor="frequencia" text="Frequência" />
              <Field
                className="form-control input-sm"
                type="text"
                name="frequencia"
                component="input"
              />
            </div>
          </div>
        </section>
        <section className="col-md-4">
          <div className="box box-primary licceu-circuito">
            <div className="box-body">
              <LicceuLabel htmlFor="site_a" text="Site A" />
              <Field
                className="form-control input-sm"
                type="text"
                name="site_a"
                component="input"
              />

              <LicceuLabel htmlFor="endereco_id_z" text="Endereço ID Z" />
              <Field
                className="form-control input-sm"
                type="text"
                name="endereco_id_z"
                component="input"
              />

              <LicceuLabel htmlFor="rota" text="Rota" />
              <Field
                className="form-control input-sm"
                name="rota"
                component="select"
              >
                <option value="" hidden>
                  Selecione
                </option>
                {filter.rota.map(todo => (
                  <option {...todo} key={todo.id}>
                    {todo.value}
                  </option>
                ))}
              </Field>

              <LicceuLabel htmlFor="tipo_demanda" text="Tipo Demanda" />
              <Field
                component="select"
                className="form-control input-sm"
                name="tipo_demanda"
              >
                <option value="" hidden>
                  Selecione
                </option>
                {filter.tipo_demanda.map(todo => (
                  <option {...todo} key={todo.id}>
                    {todo.value}
                  </option>
                ))}
              </Field>

              <LicceuLabel
                htmlFor="capcidade_de_ate"
                text="Capacidade (De/Até)"
              />
              <div className="to-from">
                <Field
                  className="form-control input-sm"
                  type="number"
                  name="capacidade_min"
                  component="input"
                />
                <span className="slash">/</span>
                <Field
                  className="form-control input-sm"
                  type="number"
                  name="capacidade_max"
                  component="input"
                />
              </div>

              <LicceuLabel htmlFor="sn" text="SN" />
              <Field
                component="select"
                className="form-control input-sm"
                name="sn"
              >
                <option value="" hidden>
                  Selecione
                </option>
                {snoa.map(todo => (
                  <option value={todo.sn} key={todo.sn}>
                    {todo.sn}
                  </option>
                ))}
              </Field>

              <LicceuLabel
                htmlFor="multiplos_codigos_ot"
                text="Multiplos Códigos OT"
              />
              <Field
                className="form-control input-sm"
                type="text"
                name="multiplos_codigos_ot"
                component="input"
              />

              <LicceuLabel htmlFor="uf" text="UF" />
              <Field
                component="select"
                className="form-control input-sm"
                name="uf"
              >
                <option value="" hidden>
                  Selecione
                </option>
                {uf.map(todo => (
                  <option value={todo.uf_estacao} key={todo.uf_estacao}>
                    {todo.uf_estacao}
                  </option>
                ))}
              </Field>
            </div>
          </div>
        </section>
        <section className="col-md-4">
          <div className="box box-primary licceu-circuito">
            <div className="box-body">
              <LicceuLabel htmlFor="site_z" text="Site Z" />
              <Field
                className="form-control input-sm"
                type="text"
                name="site_z"
                component="input"
              />

              <LicceuLabel htmlFor="interface" text="Interface" />
              <Field
                component="select"
                className="form-control input-sm"
                name="interface"
              >
                <option value="" hidden>
                  Selecione
                </option>
                {filter.interface.map(todo => (
                  <option {...todo} key={todo.id}>
                    {todo.value}
                  </option>
                ))}
              </Field>

              <LicceuLabel htmlFor="tecnologia" text="Tecnologia" />
              <Field
                component="select"
                className="form-control input-sm"
                name="tecnologia"
              >
                <option value="" hidden>
                  Selecione
                </option>
                {filter.tecnologia.map(todo => (
                  <option {...todo} key={todo.id}>
                    {todo.value}
                  </option>
                ))}
              </Field>

              <LicceuLabel htmlFor="sigla_2g_3g" text="Sigla 2G/3G" />
              <Field
                className="form-control input-sm"
                type="text"
                name="sigla_2g_3g"
                component="input"
              />

              <LicceuLabel htmlFor="regional" text="Regional" />
              <Field
                component="select"
                className="form-control input-sm"
                name="regional"
              >
                <option value="" hidden>
                  Selecione
                </option>
                {regional.map((todo, idx) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <option value={todo.regional} key={idx}>
                    {todo.regional}
                  </option>
                ))}
              </Field>

              <LicceuLabel htmlFor="multiplos_nomes" text="Multiplos Nomes" />
              <Field
                className="form-control input-sm"
                type="text"
                name="Multiplos Nomes"
                id="multiplos_nomes"
                component="input"
              />

              <LicceuLabel htmlFor="cidade" text="Cidades" />
              <Field
                component="select"
                className="form-control input-sm"
                name="rota"
                id="rota"
              >
                <option value="" hidden>
                  Selecione
                </option>
                {municipio.map((todo, key) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <option value={todo.municipio_estacao} key={key}>
                    {todo.municipio_estacao}
                  </option>
                ))}
              </Field>
            </div>
          </div>
        </section>
        <button
          type="submit"
          className="btn btn-primary filtar"
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
  licceuCircuitoOpenFilter: state.licceuCircuitoOpenFilter,
  activeForm: state.form.licceuCircuitoFilter
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ clearFilter }, dispatch);

LicceuOpenFilter = reduxForm({ form: "licceuCircuitoFilter" })(
  LicceuOpenFilter
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LicceuOpenFilter);
