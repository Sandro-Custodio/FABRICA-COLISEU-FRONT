import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { reduxForm, Field, reset } from "redux-form";
import { IconButton, Modal } from "common";
// import { DropdownList } from "react-widgets";
import { LicceuLabel } from "../../../licceuComponents/ui";
import { listBaseGerencialFilter } from "../actions";

// const renderDropdownList = ({ input, data, onSearch, onScroll, loading }) => (
//   <DropdownList
//     {...input}
//     filter
//     placeholder="Selecione"
//     data={data}
//     onSearch={onSearch}
//     onScroll={onScroll}
//     busy={loading}
//   />
// );

const Filter = ({
  dispatch,
  listBaseGerencialFilter
  // chave,
  // status_single_chave,
  // epm,
  // carimbo_projetos,
  // end_id_ponta_a,
  // end_id_ponta_b,
  // ponta_a,
  // ponta_b,
  // regional,
  // dt_inicio_atualizacao,
  // dt_fim_atualizacao,
  // vendor_execucao,
  // saldo_lo
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <IconButton icon="search" title="Filtrar" onClick={() => setOpen(true)} />
      <Modal
        title="Filtrar Base Gerencial"
        open={open}
        onClose={() => setOpen(false)}
        disableBtnClose
        dimension="lg"
        // loading={loading_filter}
        footer={
          <>
            <button
              type="submit"
              onClick={() => {
                setOpen(false);
                listBaseGerencialFilter();
              }}
              className="btn btn-primary"
            >
              Filtrar
            </button>
            <button
              type="submit"
              onClick={() => dispatch(reset("listarBaseGerencialFilter"))}
              className="btn btn-danger"
            >
              Limpar
            </button>
          </>
        }
      >
        <main className="fade-in fade-out">
          <form className="form">
            <section className="col-md-6 ">
              <div className="box box-primary licceu-mw-filter">
                <div className="box-body">
                  <div className="col-md-12">
                    <label htmlFor="multi_licceu_id">Chave:</label>
                    <Field
                      id="chave"
                      // placeholder="Para filtrar múltiplos Licceu ID, separe-os por ponto e vírgula(;)"
                      name="chave"
                      component="input"
                      // rows="5"
                      className="form-control input-sm"
                      // data={chave}
                    />
                  </div>
                  <div className="col-md-12">
                    <label htmlFor="multi_licceu_id">EPM:</label>
                    <Field
                      id="epm"
                      // placeholder="Para filtrar múltiplos Licceu ID, separe-os por ponto e vírgula(;)"
                      name="epm"
                      component="input"
                      // rows="5"
                      className="form-control input-sm"
                    />
                  </div>
                  <div className="col-md-12">
                    <label htmlFor="multi_licceu_id">End_ID Ponta_A:</label>
                    <Field
                      id="end_id_ponta_a"
                      // placeholder="Para filtrar múltiplos Licceu ID, separe-os por ponto e vírgula(;)"
                      name="end_id_ponta_a"
                      component="input"
                      // rows="5"
                      className="form-control input-sm"
                    />
                  </div>
                  <div className="col-md-12">
                    <label htmlFor="multi_licceu_id">Ponta A:</label>
                    <Field
                      id="ponta_a"
                      // placeholder="Para filtrar múltiplos Licceu ID, separe-os por ponto e vírgula(;)"
                      name="ponta_a"
                      component="input"
                      // rows="5"
                      className="form-control input-sm"
                    />
                  </div>
                  <div className="col-md-12">
                    <label htmlFor="multi_licceu_id">Regional:</label>
                    <Field
                      id="regional"
                      // placeholder="Para filtrar múltiplos Licceu ID, separe-os por ponto e vírgula(;)"
                      name="regional"
                      component="input"
                      // rows="5"
                      className="form-control input-sm"
                    />
                  </div>
                  <LicceuLabel
                    htmlFor="atualizacoes_periodo"
                    text="Atualizações no Período de:"
                  />
                  <div>
                    <div className="col-md-6">
                      <Field
                        className="form-control input-sm"
                        type="text"
                        name="data_ult_alteracao_controller"
                        component="input"
                      />
                    </div>
                    <div className="col-md-6">
                      <Field
                        className="form-control input-sm"
                        type="text"
                        name="data_ult_alteracao_focal"
                        component="input"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="col-md-6 ">
              <div className="box box-primary licceu-mw-filter">
                <div className="box-body">
                  <div className="col-md-12">
                    <div className="col-md-12">
                      <label htmlFor="multi_licceu_id">
                        Status Single Chave:
                      </label>
                      <Field
                        id="status_single_chave"
                        // placeholder="Para filtrar múltiplos Licceu ID, separe-os por ponto e vírgula(;)"
                        name="status_single_chave"
                        component="input"
                        // rows="5"
                        className="form-control input-sm"
                      />
                    </div>
                    <div className="col-md-12">
                      <label htmlFor="multi_licceu_id">
                        Carimbo Projetos (PLO's de Acesso):
                      </label>
                      <Field
                        id="CARIMBO_PROJ_PLO_ACESSO_2018"
                        // placeholder="Para filtrar múltiplos Licceu ID, separe-os por ponto e vírgula(;)"
                        name="CARIMBO_PROJ_PLO_ACESSO_2018"
                        component="input"
                        // rows="5"
                        className="form-control input-sm"
                      />
                    </div>
                    <div className="col-md-12">
                      <label htmlFor="multi_licceu_id">End_ID Ponta_B:</label>
                      <Field
                        id="end_id_ponta_b"
                        // placeholder="Para filtrar múltiplos Licceu ID, separe-os por ponto e vírgula(;)"
                        name="end_id_ponta_b"
                        component="input"
                        // rows="5"
                        className="form-control input-sm"
                      />
                    </div>
                    <div className="col-md-12">
                      <label htmlFor="multi_licceu_id">Ponta B:</label>
                      <Field
                        id="ponta_b"
                        // placeholder="Para filtrar múltiplos Licceu ID, separe-os por ponto e vírgula(;)"
                        name="ponta_b"
                        component="input"
                        // rows="5"
                        className="form-control input-sm"
                      />
                    </div>
                    <div className="col-md-12">
                      <label htmlFor="multi_licceu_id">Vendor Execução:</label>
                      <Field
                        id="vendor_execucao"
                        // placeholder="Para filtrar múltiplos Licceu ID, separe-os por ponto e vírgula(;)"
                        name="vendor_execucao"
                        component="input"
                        // rows="5"
                        className="form-control input-sm"
                      />
                    </div>
                    <div className="col-md-12">
                      <label htmlFor="multi_licceu_id">Saldo_LO:</label>
                      <Field
                        id="saldo_lo"
                        // placeholder="Para filtrar múltiplos Licceu ID, separe-os por ponto e vírgula(;)"
                        name="saldo_lo"
                        component="input"
                        // rows="5"
                        className="form-control input-sm"
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
  // chave: state.licceuBaseGerencial.filtro.chave,
  // status_single_chave: state.licceuBaseGerencial.filtro.status_single_chave,
  // epm: state.licceuBaseGerencial.filtro.epm,
  // carimbo_projetos: state.licceuBaseGerencial.filtro.carimbo_projetos,
  // end_id_ponta_a: state.licceuBaseGerencial.filtro.end_id_ponta_a,
  // end_id_ponta_b: state.licceuBaseGerencial.filtro.end_id_ponta_b,
  // ponta_a: state.licceuBaseGerencial.filtro.ponta_a,
  // ponta_b: state.licceuBaseGerencial.filtro.ponta_b,
  // regional: state.licceuBaseGerencial.filtro.regional,
  // dt_inicio_atualizacao: state.licceuBaseGerencial.filtro.dt_inicio_atualizacao,
  // dt_fim_atualizacao: state.licceuBaseGerencial.filtro.dt_fim_atualizacao,
  // vendor_execucao: state.licceuBaseGerencial.filtro.vendor_execucao,
  // saldo_lo: state.licceuBaseGerencial.filtro.saldo_lo,
  loading: state.licceuBaseGerencial.loading_filter
});

const mapActionsFilter = dispatch =>
  bindActionCreators({ listBaseGerencialFilter, dispatch }, dispatch);

export default reduxForm({
  form: "listarBaseGerencialFilter"
})(
  connect(
    mapStateFilter,
    mapActionsFilter
  )(Filter)
);
