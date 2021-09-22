import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Field, reduxForm } from "redux-form";
import { DropdownList } from "react-widgets";
import AwesomeDebouncePromise from "awesome-debounce-promise";
import { LicceuLabel } from "../../../licceuComponents/ui";
import { clearFilter, getSiglas } from "../actions";
import "./components.css";

const renderDropdownList = ({ input, data, onSearch, onScroll, loading }) => (
  <DropdownList
    {...input}
    filter
    placeholder="Selecione"
    data={data}
    onSearch={onSearch}
    onScroll={onScroll}
    busy={loading}
  />
);

let LicceuOpenFilter = ({
  handleSubmit,
  clearFilter,
  getSiglas,
  licceuFoOpenFilter: {
    municipioEstacaoList,
    id_licceu_anel_list,
    anelList,
    clusterList,
    regionalList,
    agrupadorList,
    siglas2g3gList,
    ufAnelList,
    siglaLoading,
    anelDataLoading
  }
}) => {
  const [page, setPage] = React.useState(1);
  const [filtroSigla, setFiltroSigla] = React.useState("");
  const [loadingSigla, setLoadingSigla] = React.useState(true);
  const [siglas, setSiglas] = React.useState(
    siglas2g3gList.map(data => data.sigla)
  );

  React.useEffect(() => {
    setLoadingSigla(siglaLoading);
    setSiglas(siglas2g3gList.map(data => data.sigla));
  });

  const handleScroll = e => {
    const element = e.target;
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      const newPage = page + 1;
      setPage(newPage);
      getSiglas(newPage, 100, filtroSigla, true);
      setLoadingSigla(true);
    }
  };

  const searchSigla = searchTerm => {
    setPage(1);
    setFiltroSigla(searchTerm);
    getSiglas(1, 100, searchTerm);
    setLoadingSigla(true);
  };

  const handleOnSearch = AwesomeDebouncePromise(searchSigla, 500);

  return (
    <main className="fade-in fade-out">
      <form className="form" onSubmit={handleSubmit}>
        <div className="modal-body">
          <section className="col-md-4 ">
            <div className="box box-primary licceu-fo">
              <div className="box-body">
                <LicceuLabel htmlFor="tipo_anel" text="Tipo:" />
                <Field
                  component="select"
                  className="form-control input-sm"
                  name="tipo_anel"
                >
                  <option value="" hidden>
                    Selecione
                  </option>
                  <option value="ACESSO">ACESSO</option>
                  <option value="CORE">CORE</option>
                </Field>

                <LicceuLabel htmlFor="status" text="Status:" />
                <Field
                  component="select"
                  className="form-control input-sm"
                  name="status"
                >
                  <option value="" hidden>
                    Selecione
                  </option>
                  <option value="EM PROJETO">EM PROJETO</option>
                  <option value="EM SERVIÇO">EM SERVIÇO</option>
                  <option value="CANCELADO">CANCELADO</option>
                </Field>

                <LicceuLabel htmlFor="regional_a_b" text="Regional A/B:" />
                <div>
                  <div className="col-md-6" style={{ paddingLeft: 0 }}>
                    <Field
                      component="select"
                      className="form-control input-sm"
                      name="reg_a"
                    >
                      <option value="" hidden>
                        Selecione
                      </option>
                      {regionalList.map((todo, index) => (
                        <option value={todo.regional} key={index}>
                          {todo.regional}
                        </option>
                      ))}
                    </Field>
                  </div>

                  <div className="col-md-6" style={{ paddingRight: 0 }}>
                    <Field
                      component="select"
                      className="form-control input-sm"
                      name="reg_b"
                    >
                      <option value="" hidden>
                        Selecione
                      </option>
                      {regionalList.map((todo, index) => (
                        <option value={todo.regional} key={index}>
                          {todo.regional}
                        </option>
                      ))}
                    </Field>
                  </div>
                </div>

                <LicceuLabel
                  htmlFor="multi_address"
                  text="Múltiplos Endereços:"
                />
                <Field
                  className="form-control input-sm"
                  type="text"
                  name="multi_address"
                  component="input"
                  placeholder="Para filtrar múltiplos endereços, separe-os por ponto e virgula(;)"
                />

                <LicceuLabel htmlFor="cidade_a_b" text="Cidade A/B:" />
                <div>
                  <div className="col-md-6" style={{ paddingLeft: 0 }}>
                    <Field
                      name="municipio_a"
                      component={renderDropdownList}
                      data={municipioEstacaoList.map(
                        data => data.municipio_estacao
                      )}
                      loading={anelDataLoading}
                    />
                  </div>
                  <div className="col-md-6" style={{ paddingRight: 0 }}>
                    <Field
                      name="municipio_b"
                      component={renderDropdownList}
                      data={municipioEstacaoList.map(
                        data => data.municipio_estacao
                      )}
                      loading={anelDataLoading}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="col-md-4">
            <div className="box box-primary licceu-fo">
              <div className="box-body">
                <LicceuLabel htmlFor="id_licceu_anel" text="ID LICCEU ANEL:" />
                <Field
                  name="id_licceu"
                  component={renderDropdownList}
                  data={id_licceu_anel_list.map(data => data.id_licceu_anel)}
                  loading={anelDataLoading}
                />

                <LicceuLabel
                  htmlFor="sigla_2g_3g_lte"
                  text="Sigla 2G/3G/LTE:"
                />
                <Field
                  name="sigla"
                  component={renderDropdownList}
                  data={siglas}
                  onSearch={searchTerm => handleOnSearch(searchTerm)}
                  onScroll={e => handleScroll(e)}
                  loading={loadingSigla}
                />

                <LicceuLabel
                  htmlFor="pop_agregador_1_2"
                  text="Pop Agregador 1 e 2:"
                />
                <Field
                  name="agrupador"
                  component={renderDropdownList}
                  data={agrupadorList.map(data => data.pop_agregador)}
                  loading={anelDataLoading}
                />

                <LicceuLabel htmlFor="multi_sites" text="Múltiplos Sites:" />
                <Field
                  className="form-control input-sm"
                  type="text"
                  name="multi_sites"
                  component="input"
                  placeholder="Para filtrar múltiplos sites, separe-os por ponto e virgula(;)"
                />
              </div>
            </div>
          </section>
          <section className="col-md-4">
            <div className="box box-primary licceu-fo">
              <div className="box-body">
                <LicceuLabel htmlFor="anel" text="Anel:" />
                <Field
                  name="anel"
                  component={renderDropdownList}
                  data={anelList.map(data => data.anel)}
                  loading={anelDataLoading}
                />

                <LicceuLabel htmlFor="cluster" text="Cluster:" />
                <Field
                  name="cluster"
                  component={renderDropdownList}
                  data={clusterList.map(data => data.cluster)}
                  loading={anelDataLoading}
                />

                <LicceuLabel htmlFor="uf_anel" text="UF Anel:" />
                <Field
                  component="select"
                  className="form-control input-sm"
                  name="uf_anel"
                >
                  <option value="" hidden>
                    Selecione
                  </option>
                  {ufAnelList.map(todo => (
                    <option value={todo.ufAnel} key={todo.id}>
                      {todo.ufAnel}
                    </option>
                  ))}
                </Field>

                <LicceuLabel
                  htmlFor="endereco_id_a_b"
                  text="Endereço ID A/B:"
                />
                <div>
                  <div className="col-md-6" style={{ paddingLeft: 0 }}>
                    <Field
                      className="form-control input-sm"
                      type="text"
                      name="address_a"
                      component="input"
                    />
                  </div>

                  <div className="col-md-6" style={{ paddingRight: 0 }}>
                    <Field
                      className="form-control input-sm"
                      type="text"
                      name="address_b"
                      component="input"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className="modal-footer">
          <button type="submit" className="btn btn-primary filtar">
            <i className="fa fa-search" style={{ margin: "0 10px 0 0" }} />
            Filtar
          </button>
          &nbsp;
          <button
            type="button"
            className="btn btn-danger"
            onClick={clearFilter}
          >
            <i className="fa fa-bitbucket" style={{ margin: "0 10px 0 0" }} />
            Limpar
          </button>
        </div>
      </form>
    </main>
  );
};

const mapStateToProps = state => ({
  licceuFoOpenFilter: state.licceuFoOpenFilter
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ clearFilter, getSiglas }, dispatch);

LicceuOpenFilter = reduxForm({ form: "licceuFoFilter" })(LicceuOpenFilter);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LicceuOpenFilter);
