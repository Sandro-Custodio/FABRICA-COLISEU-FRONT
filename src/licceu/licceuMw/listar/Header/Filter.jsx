import React from "react";
import { reduxForm, Field, reset } from "redux-form";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { IconButton, Modal, DropdownList } from "common";
import { listFilter, listMW } from "../actions";
import status from "../status.json";

const Filter = ({
  dispatch,
  listFilter,
  listMW,
  loading,
  comboMw,
  vendorArea,
  stationCity,
  uf,
  chave
}) => {
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    listFilter();
  }, []);
  return (
    <>
      <IconButton icon="search" title="Filtrar" onClick={() => setOpen(true)} />
      <Modal
        title="Filtrar MW Circuitos"
        open={open}
        onClose={() => setOpen(false)}
        disableBtnClose
        dimension="lg"
        loading={loading}
        footer={
          <>
            <button
              type="submit"
              onClick={() => {
                listMW();
                setOpen(false);
              }}
              className="btn btn-primary"
            >
              Filtrar
            </button>
            <button
              type="submit"
              onClick={() => dispatch(reset("listarMwFilter"))}
              className="btn btn-danger"
            >
              Limpar
            </button>
          </>
        }
      >
        <main className="fade-in fade-out">
          <form className="form">
            <section className="col-md-4 ">
              <div className="box box-primary licceu-mw-filter">
                <div className="box-body">
                  <div className="col-md-12">
                    <label htmlFor="multi_licceu">Múltiplos Licceu ID:</label>
                    <Field
                      id="multi_licceu"
                      placeholder="Para filtrar múltiplos Licceu ID, separe-os por ponto e vírgula(;)"
                      name="multi_licceu"
                      component="textarea"
                      rows="5"
                      className="form-control input-sm"
                      parse={txt => txt.toUpperCase()}
                    />
                  </div>

                  <div className="col-md-12">
                    <label htmlFor="multi_sites">Múltiplos Sites:</label>
                    <Field
                      id="multi_sites"
                      placeholder="Para filtrar múltiplos sites, separe-os por ponto e vírgula(;)"
                      name="multi_sites"
                      component="textarea"
                      rows="5"
                      className="form-control input-sm"
                      parse={txt => txt.toUpperCase()}
                    />
                  </div>

                  <div className="col-md-12">
                    <label htmlFor="mult_address">Múltiplos Endereços:</label>
                    <Field
                      id="mult_address"
                      placeholder="Para filtrar múltiplos endereços, separe-os por ponto e vírgula(;)"
                      name="mult_address"
                      component="textarea"
                      rows="5"
                      className="form-control input-sm"
                      parse={txt => txt.toUpperCase()}
                    />
                  </div>

                  <div className="col-md-12">
                    <label htmlFor="multi_key">Múltiplas Chaves:</label>
                    <Field
                      id="multi_key"
                      placeholder="Para filtrar múltiplas chaves, separe-os por ponto e vírgula(;)"
                      name="multi_key"
                      component="textarea"
                      rows="5"
                      className="form-control input-sm"
                      parse={txt => txt.toUpperCase()}
                    />
                  </div>
                </div>
              </div>
            </section>
            <section className="col-md-4">
              <div className="box box-primary licceu-mw-filter">
                <div className="box-body">
                  <div className="col-md-12">
                    <div>
                      <label htmlFor="id_licceu">Licceu ID:</label>
                      <Field
                        id="id_licceu"
                        className="form-control input-sm"
                        type="text"
                        name="id_licceu"
                        component="input"
                        parse={txt => txt.toUpperCase()}
                      />
                    </div>
                    <div>
                      <label htmlFor="vendor">vendor:</label>
                      <Field
                        id="vendor"
                        component="select"
                        className="form-control input-sm"
                        name="vendor"
                      >
                        <option value="">Selecione</option>
                        {vendorArea.map((v, idx) => (
                          <option key={idx} value={v.name}>
                            {v.name}
                          </option>
                        ))}
                      </Field>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <br />
                    <label htmlFor="capacidade_prefixo">Capacidade (%):</label>
                    <div>
                      <div className="col-md-6" style={{ paddingLeft: 0 }}>
                        <Field
                          id="capacidade_prefixo"
                          component="select"
                          className="form-control input-sm"
                          name="capacidade_prefixo"
                        >
                          <option value="">Selecione</option>
                          <option value={0}>Até</option>
                          <option value={1}>Além</option>
                        </Field>
                      </div>

                      <div className="col-md-6" style={{ paddingRight: 0 }}>
                        <Field
                          component="select"
                          className="form-control input-sm"
                          name="capacidade_valor"
                        >
                          <option value="">Selecione</option>
                          {Array(100)
                            .fill()
                            .map((_, id) => (
                              <option value={id + 1} key={id}>
                                {id + 1}%
                              </option>
                            ))}
                        </Field>
                      </div>
                    </div>

                    <label htmlFor="sigla2g_a">Site 2G A/B:</label>
                    <div>
                      <div className="col-md-6" style={{ paddingLeft: 0 }}>
                        <Field
                          id="sigla2g_a"
                          className="form-control input-sm"
                          type="text"
                          name="sigla2g_a"
                          component="input"
                          parse={txt => txt.toUpperCase()}
                        />
                      </div>
                      <div className="col-md-6" style={{ paddingRight: 0 }}>
                        <Field
                          className="form-control input-sm"
                          type="text"
                          name="sigla2g_b"
                          component="input"
                          parse={txt => txt.toUpperCase()}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <br />
                    <label htmlFor="uf_a">UF A/B:</label>
                    <div>
                      <div className="col-md-6" style={{ paddingLeft: 0 }}>
                        <Field
                          id="uf_a"
                          component="select"
                          className="form-control input-sm"
                          name="uf_a"
                        >
                          <option value="">Selecione</option>
                          {uf.map(({ uf_estacao }, idx) => (
                            <option key={idx} value={uf_estacao}>
                              {uf_estacao}
                            </option>
                          ))}
                        </Field>
                      </div>

                      <div className="col-md-6" style={{ paddingRight: 0 }}>
                        <Field
                          component="select"
                          className="form-control input-sm"
                          name="uf_b"
                        >
                          <option value="">Selecione</option>
                          {uf.map(({ uf_estacao }, idx) => (
                            <option key={idx} value={uf_estacao}>
                              {uf_estacao}
                            </option>
                          ))}
                        </Field>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="station_number">Station Number:</label>
                      <Field
                        id="station_number"
                        className="form-control input-sm"
                        type="text"
                        name="station_number"
                        component="input"
                      />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <br />
                    <div>
                      <label htmlFor="chave">Chave:</label>
                      <Field
                        name="chave"
                        textField="chave"
                        valueKey="chave"
                        data={chave}
                        component={DropdownList}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="col-md-4">
              <div className="box box-primary licceu-mw-filter">
                <div className="box-body">
                  <div className="col-md-12">
                    <div>
                      <label htmlFor="mwe_id">MWE ID:</label>
                      <Field
                        id="mwe_id"
                        className="form-control input-sm"
                        type="text"
                        name="mwe_id"
                        component="input"
                        parse={txt => txt.toUpperCase()}
                      />
                    </div>
                    <div>
                      <label htmlFor="status">Status:</label>
                      <Field
                        id="status"
                        component="select"
                        className="form-control input-sm"
                        name="status"
                      >
                        <option value="">Selecione</option>
                        {status.map((s, idx) => (
                          <option key={idx} value={s.value}>
                            {s.text}
                          </option>
                        ))}
                      </Field>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <br />
                    <label htmlFor="reg_a">Regional A/B:</label>
                    <div>
                      <div className="col-md-6" style={{ paddingLeft: 0 }}>
                        <Field
                          id="reg_a"
                          component="select"
                          className="form-control input-sm"
                          name="reg_a"
                        >
                          <option value="">Selecione</option>
                          {comboMw.map((c, idx) => (
                            <option key={idx} value={c.regional}>
                              {c.regional}
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
                          <option value="">Selecione</option>
                          {comboMw.map((c, idx) => (
                            <option key={idx} value={c.regional}>
                              {c.regional}
                            </option>
                          ))}
                        </Field>
                      </div>
                    </div>

                    <label htmlFor="address_a">Endereço ID A/B:</label>
                    <div>
                      <div className="col-md-6" style={{ paddingLeft: 0 }}>
                        <Field
                          id="address_a"
                          className="form-control input-sm"
                          type="text"
                          name="address_a"
                          component="input"
                          parse={txt => txt.toUpperCase()}
                        />
                      </div>

                      <div className="col-md-6" style={{ paddingRight: 0 }}>
                        <Field
                          className="form-control input-sm"
                          type="text"
                          name="address_b"
                          component="input"
                          parse={txt => txt.toUpperCase()}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <br />
                    <label htmlFor="municipio_a">Cidade A/B</label>
                    <div>
                      <div className="col-md-6" style={{ paddingLeft: 0 }}>
                        <Field
                          id="municipio_a"
                          name="municipio_a"
                          textField="municipio_estacao"
                          valueKey="municipio_estacao"
                          data={stationCity}
                          component={DropdownList}
                        />
                      </div>
                      <div className="col-md-6" style={{ paddingRight: 0 }}>
                        <Field
                          name="municipio_b"
                          textField="municipio_estacao"
                          valueKey="municipio_estacao"
                          data={stationCity}
                          component={DropdownList}
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        style={{ marginTop: "5px" }}
                        htmlFor="network_number"
                      >
                        Network Number:
                      </label>
                      <Field
                        id="network_number"
                        className="form-control input-sm"
                        type="number"
                        name="network_number"
                        component="input"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </form>
        </main>
      </Modal>
    </>
  );
};

const mapStateFilter = state => ({
  loading: state.listarMW.loading_filter,
  comboMw: state.listarMW.comboMw,
  vendorArea: state.listarMW.vendorArea,
  stationCity: state.listarMW.stationCity,
  uf: state.listarMW.uf,
  chave: state.listarMW.chave
});

const mapActionsFilter = dispatch =>
  bindActionCreators({ listFilter, listMW, dispatch }, dispatch);

export default reduxForm({
  form: "listarMwFilter"
})(
  connect(
    mapStateFilter,
    mapActionsFilter
  )(Filter)
);
