import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { bindActionCreators } from "redux";
import { toastr } from "react-redux-toastr";

import {
  SortingState,
  IntegratedSorting,
  FilteringState,
  IntegratedFiltering,
  SelectionState
} from "@devexpress/dx-react-grid";

import {
  Grid as DxGrid,
  VirtualTable,
  Table,
  TableHeaderRow,
  Toolbar,
  TableColumnResizing,
  TableFilterRow,
  TableColumnVisibility,
  TableSelection
} from "@devexpress/dx-react-grid-bootstrap3";

import Content from "../../common/adminLTE/content";
import ContentHeader from "../../common/adminLTE/contentHeader";
import Grid from "../../common/layout/grid";
import Row from "../../common/layout/row";
import Overlay from "../../common/msg/overlay/overlay";
import { LabelField } from "../../common/form/components";
import select from "./select";
import ExportCsv from "./export_csv";
import ModalForm from "../../common/layout/modal";
import ExportConfig from "./export_config";
import {
  DateTimePickerField
} from "../../common/form/components";


import { get_months, get_operators_and_vendors } from "../actions";

import {
  get_all_inconsistency,
  get_all_grid_exports,
  get_report_inconsistence,
  clear_filter,
  change_field,
  show_overlay,
  hide_overlay,
  save_grid_export,
  delete_grid_by_user,
  get_all_justifications,
  upload_file,
  send_import,
  open_import_modal
} from "./actions";

import "./styles.css";

const _ = require("lodash");

Date.prototype.subtractDaysToday = function (d) {
  this.setTime(this.getTime() + d * 24 * 60 * 60 * 1000);
  return this;
};

const gfg_Run = () => {
  var a = new Date();
  return a.subtractDaysToday(31);
};

const maxDate = gfg_Run();

const Inconsistencias = props => {
  const {
    reducer: {
      rows,
      columns,
      months,
      vendors,
      operators,
      inconsistency,
      pages,
      items,
      data_export,
      gridexports: { export_model, grid_model },
      justifications,
      upload_file: { inconsistencias, erros, ok, file }
    },
    auth: { user },
    show_loading,
    pg_form,
    get_months,
    get_operators_and_vendors,
    get_all_inconsistency,
    get_all_grid_exports,
    get_report_inconsistence,
    clear_filter,
    change_field,
    show_overlay,
    hide_overlay,
    save_grid_export,
    delete_grid_by_user,
    get_all_justifications,
    upload_file,
    send_import,
    open_import_modal
  } = props;

  const [cached_params, set_cached_params] = React.useState(false);
  const [page, set_page] = React.useState(1);
  const [limit, set_limit] = React.useState(100);
  const [go_page, set_go_page] = React.useState("first");
  const [fired, set_fired] = React.useState(false);
  const [selected_inconsistences, set_selected_inconsistences] = React.useState(
    []
  );
  const [expanded, set_expanded] = React.useState(false);
  const [grid_model_items, set_grid_model_items] = React.useState([]);
  const [use_tab_filter, set_use_tab_filter] = React.useState(false);
  const [showDateComp, setShowDateComp] = React.useState(true);

  const tbl_filter = grid_model.map(i => ({
    name: i.export_colum,
    title: i.export_label
  }));

  React.useEffect(_ => {
    change_field("rede", "MÓVEL");
    get_months().then(_ =>
      get_operators_and_vendors().then(_ =>
        get_all_inconsistency().then(_ =>
          get_all_grid_exports({
            model_name: "inconsistency_report",
            user_id: user.id
          }).then(_ => set_grid_model_items(grid_model))
        )
      )
    );
    return undefined;
  }, []);

  const meses = months.map(i => ({
    value: i.mes,
    text: i.mes
  }));

  const provedores = vendors.map(i => ({
    value: i.id,
    text: i.name
  }));

  const regional = operators.map(i => ({
    value: i.id,
    text: i.regional
  }));

  const redes = [
    { value: "MÓVEL", text: "MÓVEL" },
    { value: "FIXA", text: "FIXA" },
    { value: "FIBER", text: "FIBER" }
  ];

  /* const columnWidths = (use_tab_filter ? columns : tbl_filter).map(c => ({
     columnName: c.name,
     width: 140
   })); */

  const columnWidths = columns.map(c => ({
    columnName: c.name,
    width: 140
  }));

  const fix = n => Number(n).toFixed(2);
  const fixDate = d => new Date(d).toLocaleDateString("pt-BR");

  const mapAndFix = rows =>
    rows.map(i => ({
      ...i,
      dt_ativacao_coliseu:
        i.dt_ativacao_coliseu && fixDate(i.dt_ativacao_coliseu),
      dt_desativacao_coliseu:
        i.dt_desativacao_coliseu && fixDate(i.dt_desativacao_coliseu),
      dt_ativacao_delin: i.dt_ativacao_delin && fixDate(i.dt_ativacao_delin),
      dt_desativacao_delin:
        i.dt_desativacao_delin && fixDate(i.dt_desativacao_delin),
      data_envio_email_sd:
        i.data_envio_email_sd && fixDate(i.data_envio_email_sd),
      data_fim_faturamento:
        i.data_fim_faturamento && fixDate(i.data_fim_faturamento),
      data_pendencia_aceitacao:
        i.data_pendencia_aceitacao && fixDate(i.data_pendencia_aceitacao),
      data_servico: i.data_servico && fixDate(i.data_servico)
    }));

  const list = mapAndFix(rows);
  const export_data = mapAndFix(data_export);

  const handle_clear_filter = () => {
    clear_filter();
    window.$('input[type="checkbox"]').prop("checked", false);
    set_selected_inconsistences([]);
    window.$("#checkboxes").css("display", "none");
    //window.location.reload();
    setShowDateComp(false);
    setTimeout(() => {
      setShowDateComp(true);
    }, 1);
  };

  const show_inconsistences_checkboxes = () => {
    const checkboxes = window.$("#checkboxes");
    if (!expanded) {
      checkboxes.css("display", "block");
      set_expanded(true);
    } else {
      checkboxes.css("display", "none");
      set_expanded(false);
    }
  };

  const handle_select_inconsistency = e => {
    const c = window.$(`#${e.target.id}`);
    const inconsistency = { id: c.data("inconsistency"), name: c.data("name") };
    const checked = c.prop("checked");
    const inconsistences = [...selected_inconsistences];
    if (checked) {
      inconsistences.push(inconsistency);
    } else {
      for (let i = 0; i <= inconsistences.length; i++) {
        if (inconsistences[i] && inconsistences[i].id === inconsistency.id)
          inconsistences.splice(i, 1);
      }
    }
    set_selected_inconsistences(inconsistences);
  };

  const check = arr =>
    !arr.map(i => typeof i !== "undefined" && i !== "false").includes(false);

  const handle_filter = (page = 1, use_state = false) => {
    window.$("#checkboxes").css("display", "none");
    set_expanded(false);
    const values = pg_form.values;
    const ok = check([values, values.month_begin, values.month_end]);
    if (ok || use_state) {
      const mapped_inconsistences = selected_inconsistences.map(i => i.id);
      const all_inconsistences = inconsistency.map(i => i.id);

      const inconsistencias =
        selected_inconsistences.length > 0
          ? mapped_inconsistences
          : all_inconsistences;

      const params = use_state ? cached_params : { ...values, inconsistencias };
      const request = {
        params,
        page,
        limit
      };

      get_report_inconsistence(request).then(_ => !use_state && set_page(1));

      if (!use_state) {
        set_cached_params(params);
      }
    } else {
      toastr.error("Mês Início e Mês Fim devem estar em formato válido.");
    }
    handle_clear_filter();
    //clear_filter();
  };

  const change_page = e => {
    if (!cached_params)
      return toastr.warning("Utilize o formulário de filtragem primeiro!");

    const p = e.target.value;

    if (parseInt(p) > pages) {
      set_page(pages);
      set_go_page("last");
    } else if (parseInt(p) < 1 || p == "") {
      set_page(1);
      set_go_page("first");
    } else {
      set_page(parseInt(e.target.value));
      set_go_page("target");
    }
  };

  const handle_change_page = e => {
    if (!fired) {
      set_fired(true);
      const p = e.target.value;
      if (e.key === "Enter") {
        if (!cached_params) return;
        document.activeElement.blur();
        switch (go_page) {
          case "first":
            return handle_filter(1, true);
          case "target":
            return handle_filter(p, true);
          case "last":
            return handle_filter(pages, true);
        }
      }
    }
  };

  const backward_or_forward = new_page => {
    if (!cached_params)
      return toastr.warning("Utilize o formulário de filtragem primeiro!");
    if (new_page > 0 && new_page <= pages) {
      set_page(new_page);
      handle_filter(new_page, true);
    }
  };

  const change_limit = e => {
    const l = e.target.value;
    if (parseInt(l) > 500) {
      set_page(500);
    } else if (parseInt(l) < 1 || l == "") {
      set_limit(1);
    } else {
      set_limit(parseInt(e.target.value));
    }
  };

  const handle_change_limit = e => {
    if (!fired) {
      set_fired(true);
      if (e.key === "Enter") {
        if (cached_params) {
          set_page(1);
          handle_filter(1, true);
          document.activeElement.blur();
        }
      }
    }
  };

  const open_config_export = () => {
    show_overlay();
    get_all_grid_exports({
      model_name: "inconsistency_report",
      user_id: user.id
    }).then(_ => {
      set_grid_model_items(grid_model);
      window.$("#config-export").modal("show");
    });
  };

  const save_export = async () => {
    show_overlay();
    delete_grid_by_user({
      model_name: "inconsistency_report",
      user_id: user.id
    }).then(async r => {
      for (let i = 0; i < grid_model_items.length; i++) {
        const req = {
          user_id: user.id,
          grid_export_id: grid_model_items[i].id
        };
        let last = i == grid_model_items.length - 1;
        await save_grid_export(req, last).then(s => {
          if (last) {
            hide_overlay();
            window.$("tr.selected").removeClass("selected");
            window.$("#config-export").modal("hide");
            set_grid_model_items(grid_model);
            toastr.success("Configuração exportada com sucesso!");
            set_use_tab_filter(true);
          }
        });
      }
    });
  };

  const modal_justifications = () => {
    get_all_justifications().then($ =>
      window.$("#acoes-justificativas").modal("show")
    );
  };

  const handle_upload_file = e => {
    const file = e.target.files[0];
    upload_file(file);
    e.target.value = null;
  };

  const handle_import = () => {
    const rows_ok = inconsistencias.filter(e => e.status != "nok");
    const params = rows_ok.map(i => ({
      ...i,
      file_name: file
    }));
    if (ok > 0) send_import({ params }, ok);
  };

  return (
    <div>
      {show_loading && (
        <div className="cts-overlay overlay-wrapper">
          <Overlay />
        </div>
      )}
      <div className="fade-in fade-out">
        <div className="header">
          <div className="header__left-items">
            <ContentHeader title="Inconsistências" />
          </div>
        </div>
        <Content>
          <Grid cols="12">
            <div className="box box-primary">
              <form>
                <div className="box-body">
                  <div style={{ paddingBottom: "10px" }} />
                  <Grid cols="12">
                    <Row>
                      {showDateComp && ([
                        <Field
                        cols="12 3"
                        label="Mês Início"
                        name="month_begin"
                        max={maxDate}
                        component={DateTimePickerField}
                        time={false}
                        formatacao='MM/YYYY'
                        visualizacao={['year']}
                        onInput={e => {
                          e.target.value = ""
                        }}
                      />,
                      <Field
                        cols="12 3"
                        label="Mês Fim"
                        name="month_end"
                        max={maxDate}
                        component={DateTimePickerField}
                        time={false}
                        formatacao='MM/YYYY'
                        visualizacao={['year']}
                        onInput={e => {
                          e.target.value = ""
                        }}
                      />,
                      <Field
                        cols="12 3"
                        label="Mês de Competência"
                        name="competence_month"
                        component={DateTimePickerField}
                        time={false}
                        formatacao='MM/YYYY'
                        visualizacao={['year']}
                        onInput={e => {
                          e.target.value = ""
                        }}
                      />
                      ])}
                      <Field
                        cols="12 3"
                        label="Provedor"
                        name="vendor"
                        component={select}
                        data={provedores}
                        type="select"
                      />
                    </Row>
                    <Row>
                      <Field
                        cols="12 3"
                        label="Regional"
                        name="operator"
                        component={select}
                        data={regional}
                        type="select"
                      />
                      <Field
                        cols="12 3"
                        label="Agrupador"
                        name="agrupador"
                        component={LabelField}
                        type="text"
                      />
                      <div className="col-xs-12 col-sm-3">
                        <div className="multiselect">
                          <div
                            className="selectBox"
                            onClick={() => show_inconsistences_checkboxes()}
                          >
                            <label>Inconsistências</label>
                            <select className="form-control">
                              <option>...</option>
                            </select>
                            <div className="overSelect"></div>
                          </div>
                          <div id="checkboxes">
                            {inconsistency.map(i => (
                              <label
                                htmlFor={`inconsistency-${i.id}`}
                                key={`inconsistency-${i.id}`}
                              >
                                <input
                                  data-inconsistency={i.id}
                                  data-name={i.name}
                                  type="checkbox"
                                  id={`inconsistency-${i.id}`}
                                  onChange={e => handle_select_inconsistency(e)}
                                />
                                <p>{i.name}</p>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                      <Field
                        cols="12 3"
                        label="Rede"
                        name="rede"
                        component={select}
                        data={redes}
                        hidedefaultoption="true"
                        type="select"
                      />
                    </Row>
                    <Row>
                      <div className="actions">
                        <a
                          className="btn btn-warning ml-0 btn-export-config"
                          onClick={_ => open_config_export()}
                        >
                          <i className="fa fa-pie-chart"></i>
                        </a>
                        <a
                          className="btn btn-success mr-0"
                          onClick={_ => handle_filter()}
                        >
                          <i className="fa fa-search"></i> Filtrar
                        </a>
                        <a
                          style={{ margin: "0 !important" }}
                          className="btn btn-warning"
                          onClick={_ => handle_clear_filter()}
                        >
                          <i className="fa fa-times"></i> Limpar
                        </a>
                        <a
                          className="btn btn-primary"
                          onClick={() => open_import_modal()}
                        >
                          <i className="fa fa-cloud-upload"></i> Importar Dados
                        </a>
                      </div>
                    </Row>
                  </Grid>
                </div>
              </form>
            </div>
          </Grid>
          <Grid cols="12">
            <DxGrid rows={list} columns={use_tab_filter ? tbl_filter : columns}>
              <SortingState />
              <IntegratedSorting />
              <FilteringState defaultFilters={[]} />
              <IntegratedFiltering />
              <VirtualTable />
              <Table />
              <TableColumnResizing defaultColumnWidths={columnWidths} />
              <TableHeaderRow showSortingControls />
              <TableFilterRow />
              <Toolbar />
              <ExportCsv
                rows={list}
                columns={use_tab_filter ? tbl_filter : columns}
                data_export={export_data}
                cached_params={cached_params}
                name="Inconsistências"
              />
            </DxGrid>
          </Grid>
          <Grid cols="12">
            <div className="footer-info">
              <div
                className="info"
                style={{ paddingLeft: "15px", paddingBottom: "10px" }}
              >
                <p>
                  Pressione <b>ENTER</b> para alterar a <b>página</b> ou a
                  quantidade de <b>elementos</b> exibidos.
                </p>
              </div>
              <div className="info-right">
                <p>
                  Foram encontrados <b>{items}</b> elementos.
                </p>
              </div>
            </div>
            <div className="grid-footer">
              <div className="paginator">
                <a
                  className="btn btn-link"
                  onClick={_ => backward_or_forward(1)}
                >
                  <i className="fa fa-fast-backward"></i>
                </a>
                <a
                  className="btn btn-link"
                  onClick={_ => backward_or_forward(page - 1)}
                >
                  <i className="fa fa-step-backward"></i>
                </a>
                <span>Página </span>
                <input
                  className="form-control paginator-field"
                  type="number"
                  value={page}
                  onKeyDown={handle_change_page.bind(this)}
                  onKeyUp={() => set_fired(false)}
                  onChange={change_page.bind(this)}
                  name="page"
                  min={1}
                  max={pages}
                  autoComplete="off"
                />
                <span>
                  {" "}
                  De &nbsp; <b>{pages}</b>&nbsp;
                </span>
                <a
                  className="btn btn-link"
                  onClick={_ => backward_or_forward(page + 1)}
                >
                  <i className="fa fa-step-forward"></i>
                </a>
                <a
                  className="btn btn-link"
                  onClick={_ => backward_or_forward(pages)}
                >
                  <i className="fa fa-fast-forward"></i>
                </a>
              </div>
              <div className="grid-count">
                <span>Mostrar &nbsp;</span>
                <input
                  className="form-control paginator-field"
                  type="number"
                  value={limit}
                  onKeyDown={handle_change_limit.bind(this)}
                  onKeyUp={() => set_fired(false)}
                  onChange={change_limit.bind(this)}
                  name="page"
                  min={10}
                  max={500}
                  autoComplete="off"
                />
                <span> &nbsp; por página.</span>
              </div>
            </div>
          </Grid>
          <ModalForm
            id="config-export"
            title={`Configuração export do Usuário - ${user.name}`}
            dimension="modal-m"
            LabelButtonSubmit=""
            footer={
              <div className="save">
                <a className="btn btn-primary" onClick={() => save_export()}>
                  <i className="fa fa-save"></i> Salvar
                </a>
              </div>
            }
          >
            <ExportConfig
              gridModelItems={grid_model_items}
              setGridModelItems={set_grid_model_items}
              exportModel={export_model}
              userId={user.id}
            />
          </ModalForm>
          <ModalForm
            id="import"
            title="Importação de Arquivos"
            dimension="modal-g2"
            LabelButtonSubmit=""
            footer={
              <div className="modal-actions">
                <div className="data-type">
                  <div className="data-types">
                    <div className="type">
                      <div className="valid"></div>
                      <span>
                        Válido (a linha será importada) - {ok} Registro(s)
                      </span>
                    </div>
                    <div className="type">
                      <div className="invalid"></div>
                      <span>
                        Inválido (a linha não será importada) - {erros}{" "}
                        Registro(s)
                      </span>
                    </div>
                  </div>
                </div>
                <div className="save-content">
                  <a
                    className="btn btn-primary"
                    onClick={() => window.$("#import-file").click()}
                  >
                    <i className="fa fa-cloud-upload"></i> Carregar Arquivo
                  </a>
                  <a
                    className="btn btn-success"
                    disabled={ok < 1}
                    onClick={() => handle_import()}
                  >
                    <i className="fa fa-check"></i> Importar
                  </a>
                  <a
                    className="btn btn-default"
                    onClick={() => modal_justifications()}
                  >
                    <i className="fa fa-info-circle"></i> Ações e Justificativas
                  </a>
                  <div className="utils">
                    <input
                      type="file"
                      name="import-file"
                      id="import-file"
                      className="import-file"
                      onChange={e => {
                        handle_upload_file(e);
                      }}
                    />
                  </div>
                </div>
              </div>
            }
          >
            <div className="import-ctx">
              <div className="info">
                <a
                  className="btn btn-link"
                  data-toggle="modal"
                  data-target="#instrucoes"
                >
                  <i className="fa fa-info-circle"></i>
                </a>
                <span className="red">
                  Clique no ícone para visualizar as instruções da planilha.
                </span>
              </div>
              <div className="table-responsive">
                <table className="table table-hover table-stripped">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Provedor</th>
                      <th>Ação</th>
                      <th>Justificativa</th>
                      <th>Observação</th>
                      <th>Valor Contestado</th>
                      <th>Crítica</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inconsistencias.map(i => (
                      <tr
                        className={`${i.status == "nok" ? "not-ok" : "ok"}`}
                        key={`row-import-${i.key}`}
                      >
                        <td>{i.id ? i.id : ""}</td>
                        <td>{i.provedor ? i.provedor : ""}</td>
                        <td>{i.acao ? i.acao : ""}</td>
                        <td>{i.justificativa ? i.justificativa : ""}</td>
                        <td>{i.observacao ? i.observacao : ""}</td>
                        <td>{i.contestado ? i.contestado : ""}</td>
                        <td>{i.message ? i.message : ""}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <ModalForm
              id="acoes-justificativas"
              title="Ações e Justificativas"
              dimension="modal-m"
              LabelButtonSubmit=""
            >
              <div className="aj">
                <div className="div-c">
                  <p>
                    <b>Lista de Ações</b>
                  </p>
                  <div className="div-table">
                    <table className="table table-hover table-stripped">
                      <tbody>
                        <tr>
                          <td>Devido</td>
                        </tr>
                        <tr>
                          <td>Contestar Integral</td>
                        </tr>
                        <tr>
                          <td>Contestar Parcial</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="div-c">
                  <p>
                    <b>Lista de Justificativas</b>
                  </p>
                  <div className="div-table">
                    <table className="table table-hover table-stripped">
                      <tbody>
                        {justifications.map(i => (
                          <tr key={i.id}>
                            <td>{i.name}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </ModalForm>
            <ModalForm
              id="instrucoes"
              title="Modelo"
              dimension="modal-m"
              LabelButtonSubmit=""
            >
              <div>
                O preenchimento dos campos deve seguir o modelo descrito abaixo:
                <br />
                <br />1 - ID <br />2 - Provedor <br />3 - Ação <br />4 -
                Justificativa <br />5 - Observação <br />6 - Valor Contestado{" "}
                <br />
                <br />
                OBS: O campo 6 Valor Contestado só poderá ser preenchido quando
                a ação for Contestar Parcial.
                <br />
                OBS: Os demais campos são obrigatórios.
                <br />
                OBS: O tamanho limite do campo de observação é de 1600
                caractéres.
                <br />
              </div>
            </ModalForm>
          </ModalForm>
        </Content>
      </div>
    </div>
  );
};

const form = reduxForm({ form: "inconsistencias" })(Inconsistencias);

const mapStateToProps = state => ({
  auth: state.auth,
  reducer: state.inconsistenciasReducer,
  pg_form: state.form.inconsistencias,
  show_loading: state.overlay.show
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      get_months,
      get_operators_and_vendors,
      get_all_inconsistency,
      get_all_grid_exports,
      get_report_inconsistence,
      clear_filter,
      change_field,
      show_overlay,
      hide_overlay,
      save_grid_export,
      delete_grid_by_user,
      get_all_justifications,
      upload_file,
      send_import,
      open_import_modal
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(form);
