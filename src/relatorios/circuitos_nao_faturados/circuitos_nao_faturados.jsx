import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { bindActionCreators } from "redux";
import { toastr } from "react-redux-toastr";

import {
  SortingState,
  IntegratedSorting,
  IntegratedFiltering,
  FilteringState
} from "@devexpress/dx-react-grid";

import {
  Grid as DxGrid,
  VirtualTable,
  TableHeaderRow,
  Toolbar,
  TableColumnResizing,
  TableFilterRow
} from "@devexpress/dx-react-grid-bootstrap3";

import Content from "../../common/adminLTE/content";
import ContentHeader from "../../common/adminLTE/contentHeader";
import Grid from "../../common/layout/grid";
import Row from "../../common/layout/row";
import Overlay from "../../common/msg/overlay/overlay";
import { LabelField } from "../../common/form/components";
import select from "./select";
import ExportCsv from "./export_csv";
import {
  DateTimePickerField
} from "../../common/form/components";

import { get_months, get_operators_and_vendors } from "../actions";

import { get_bill_not_circuit, clear_filter, change_field } from "./actions";

// import mock from "./mock"
import "./styles.css";

Date.prototype.subtractDaysToday = function (d) {
  this.setTime(this.getTime() + d * 24 * 60 * 60 * 1000);
  return this;
};

const gfg_Run = () => {
  var a = new Date();
  return a.subtractDaysToday(31);
};

const maxDate = gfg_Run();

const CircuitosNaoFaturados = props => {
  const {
    reducer: {
      rows,
      columns,
      months,
      vendors,
      operators,
      pages,
      items,
      data_export
    },
    auth: { user },
    pg_form,
    get_months,
    get_operators_and_vendors,
    get_bill_not_circuit,
    clear_filter,
    change_field,
    show_loading
  } = props;

  // const { rows, pages, items } = mock

  React.useEffect(_ => {
    change_field("rede", "MÓVEL");
    get_months().then(_ => get_operators_and_vendors());
    return undefined;
  }, []);

  const [cached_params, set_cached_params] = React.useState(false);
  const [page, set_page] = React.useState(1);
  const [limit, set_limit] = React.useState(100);
  const [go_page, set_go_page] = React.useState("first");
  const [fired, set_fired] = React.useState(false);
  const [showDateComp, setShowDateComp] = React.useState(true);

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

  const fix = n => Number(n).toFixed(2);
  const mapAndFix = rows =>
    rows.map(i => ({
      ...i,
      val_link_c_imp_a: i.val_link_c_imp_a && fix(i.val_link_c_imp_a),
      val_link_c_imp_b: i.val_link_c_imp_b && fix(i.val_link_c_imp_b)
    }));

  const list = mapAndFix(rows);
  const export_data = mapAndFix(data_export);

  const check = arr =>
    !arr.map(i => typeof i !== "undefined" && i !== "false").includes(false);

  const handle_filter = (page = 1, use_state = false) => {
    const values = pg_form.values;
    const ok = check([values, values.month_begin, values.month_end]);
    if (ok || use_state) {
      const params = use_state
        ? cached_params
        : { ...values, logged_user_id: user.id };
      const request = {
        params,
        page,
        limit
      };
      get_bill_not_circuit(request).then(_ => !use_state && set_page(1));
      if (!use_state) {
        set_cached_params(params);
      }
    } else {
      toastr.error("Mês Início e Mês Fim devem estar em formato válido.");
    }
    handle_clear_filter();
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

  const handle_clear_filter = () => {
    clear_filter();
    //window.location.reload();
    setShowDateComp(false);
    setTimeout(() => {
      setShowDateComp(true);
    }, 1);
  };


  const columnWidths = columns.map(c => ({
    columnName: c.name,
    width: 140
  }));

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
            <ContentHeader title="Circuitos Não Faturados" />
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
                        cols="12 4"
                        label="Regional"
                        name="operator"
                        component={select}
                        data={regional}
                        type="select"
                      />
                      <Field
                        cols="12 4"
                        label="Agrupador"
                        name="agrupador"
                        component={LabelField}
                        type="text"
                      />
                      <Field
                        cols="12 4"
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
                          className="btn btn-primary"
                          onClick={_ => handle_filter()}
                        >
                          <i className="fa fa-search"></i> Filtrar
                        </a>
                        <a
                          className="btn btn-primary"
                          onClick={_ => handle_clear_filter()}
                        >
                          <i className="fa fa-times"></i> Limpar
                        </a>
                      </div>
                    </Row>
                  </Grid>
                </div>
              </form>
            </div>
          </Grid>
          <Grid cols="12">
            <DxGrid rows={list} columns={columns}>
              <SortingState />
              <IntegratedSorting />
              <FilteringState defaultFilters={[]} />
              <IntegratedFiltering />
              <VirtualTable />
              <TableColumnResizing defaultColumnWidths={columnWidths} />
              <TableHeaderRow showSortingControls />
              <Toolbar />
              <ExportCsv
                rows={list}
                columns={columns}
                data_export={export_data}
                cached_params={cached_params}
                name="Circuitos Não Faturados"
              />
              <TableFilterRow />
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
        </Content>
      </div>
    </div>
  );
};

const form = reduxForm({ form: "circuitosNaoFaturados" })(
  CircuitosNaoFaturados
);

const mapStateToProps = state => ({
  auth: state.auth,
  pg_form: state.form.circuitosNaoFaturados,
  reducer: state.circuitosNaoFaturadosReducer,
  show_loading: state.overlay.show
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      get_bill_not_circuit,
      get_months,
      get_operators_and_vendors,
      clear_filter,
      change_field
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(form);
