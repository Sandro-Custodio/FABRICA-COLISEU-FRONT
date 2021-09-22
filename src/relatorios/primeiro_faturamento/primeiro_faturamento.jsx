import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { bindActionCreators } from "redux";

import {
  SortingState,
  IntegratedSorting,
  FilteringState,
  IntegratedFiltering
} from "@devexpress/dx-react-grid";

import {
  Grid as DxGrid,
  VirtualTable,
  TableHeaderRow,
  TableColumnResizing,
  TableFilterRow
} from "@devexpress/dx-react-grid-bootstrap3";

import Content from "../../common/adminLTE/content";
import ContentHeader from "../../common/adminLTE/contentHeader";
import Grid from "../../common/layout/grid";
import Overlay from "../../common/msg/overlay/overlay";
import select from "./select";
import {
  DateTimePickerField
} from "../../common/form/components";

import { get_combos } from "../actions";

import { clear_filter, change_field, get_1_fat } from "./actions";

import "./styles.css";
import { TextareaField } from "common/form/components";

Date.prototype.subtractDaysToday = function (d) {
  this.setTime(this.getTime() + d * 24 * 60 * 60 * 1000);
  return this;
};

const gfg_Run = () => {
  var a = new Date();
  return a.subtractDaysToday(31);
};

const maxDate = gfg_Run(); // limita até o mês seguinte

const PrimeiroFaturamento = props => {
  const {
    reducer: {
      rows,
      columns,
      vendors,
      mes_ref,
      grupo_classe,
      operators,
      pages,
      items
    },
    auth: { user },
    pg_form,
    clear_filter,
    change_field,
    get_1_fat,
    get_combos,
    show_loading
  } = props;

  const [showDateComp, setShowDateComp] = React.useState(true)

  React.useEffect(_ => {
    get_combos();
    change_field("rede", "MÓVEL");
    return undefined;
  }, []);

  const meses = mes_ref.map(i => ({
    value: i.mes,
    text: i.mes
  }));

  const provedores = vendors.map(i => ({
    value: i.id,
    text: i.name
  }));

  const grupos = grupo_classe.map(i => ({
    value: i.name,
    text: i.name
  }));

  const redes = [
    { value: "MÓVEL", text: "MÓVEL" },
    { value: "FIXA", text: "FIXA" },
    { value: "FIBER", text: "FIBER" }
  ];

  const columnWidths = columns.map(c => ({
    columnName: c.name,
    width: 140
  }));

  const fix = n => Number(n).toFixed(2);
  const fixDate = d => new Date(d).toLocaleDateString("pt-BR");

  const mapAndFix = rows =>
    rows.map(i => ({
      ...i,
      valor_faturado_1_fat:
        i.valor_faturado_1_fat && fix(i.valor_faturado_1_fat),
      data_ativacao: i.data_ativacao && fixDate(i.data_ativacao),
      valor_mensal_s_imp: i.valor_mensal_s_imp && fix(i.valor_mensal_s_imp),
      valor_mensal_c_imp_a:
        i.valor_mensal_c_imp_a && fix(i.valor_mensal_c_imp_a),
      valor_mensal_c_imp_b:
        i.valor_mensal_c_imp_b && fix(i.valor_mensal_c_imp_b),
      valor_taxa_s_imp: i.valor_taxa_s_imp && fix(i.valor_taxa_s_imp),
      valor_taxa_c_imp_a: i.valor_taxa_c_imp_a && fix(i.valor_taxa_c_imp_a),
      valor_taxa_c_imp_b: i.valor_taxa_c_imp_b && fix(i.valor_taxa_c_imp_b)
    }));

  const list = mapAndFix(rows);

  const handle_clear_filter = () => {
    clear_filter();
    //window.location.reload();
    setShowDateComp(false);
    setTimeout(() => {
      setShowDateComp(true);
    }, 1);
  };


  const handle_filter = () => {
    const values = pg_form.values;
    get_1_fat({ params: { ...values } });
    handle_clear_filter();
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
            <ContentHeader title="Relatório - Primeiro Faturamento" />
          </div>
        </div>
        <Content>
          <Grid cols="12">
            <form>
              <div className="row">
                <div className="col-md-3 pl-0">
                  <div className="card-input">
                    <p className="title">Mês Competência</p>
                    <hr className="divider" />
                    <div className="card-content">
                    {showDateComp && ([
                        <Field
                        cols="12 12"
                        label="Mês Início"
                        name="MesIniCom"
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
                        cols="12 12"
                        label="Mês Fim"
                        name="MesFimCom"
                        max={maxDate}
                        component={DateTimePickerField}
                        time={false}
                        formatacao='MM/YYYY'
                        visualizacao={['year']}
                        onInput={e => {
                          e.target.value = ""
                        }}
                      />])}
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card-input">
                    <p className="title">Mês Referência</p>
                    <hr className="divider" />
                    <div className="card-content">
                    {showDateComp && ([
                        <Field
                        cols="12 12"
                        label="Mês Início"
                        name="MesIniRef"
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
                        cols="12 12"
                        label="Mês Fim"
                        name="MesFimRef"
                        max={maxDate}
                        component={DateTimePickerField}
                        time={false}
                        formatacao='MM/YYYY'
                        visualizacao={['year']}
                        onInput={e => {
                          e.target.value = ""
                        }}
                      />])}
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card-input">
                    <p className="title">Mês Ativação</p>
                    <hr className="divider" />
                    <div className="card-content">
                    {showDateComp && ([
                        <Field
                        cols="12 12"
                        label="Mês Início"
                        name="MesIniAti"
                        //max={maxDate}
                        component={DateTimePickerField}
                        time={false}
                        formatacao='MM/YYYY'
                        visualizacao={['year']}
                        onInput={e => {
                          e.target.value = ""
                        }}
                      />,
                      <Field
                        cols="12 12"
                        label="Mês Fim"
                        name="MesFimAti"
                        //max={maxDate}
                        component={DateTimePickerField}
                        time={false}
                        formatacao='MM/YYYY'
                        visualizacao={['year']}
                        onInput={e => {
                          e.target.value = ""
                        }}
                      />])}
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card-input">
                    <p className="title">Circuito(s)</p>
                    <hr className="divider" />
                    <div className="card-content">
                      <Field
                        cols="12 12"
                        name="Circuito"
                        component={TextareaField}
                        className="form-control filter-textarea"
                        type="textarea"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-12 pl-0">
                  <div className="card-input">
                    <div className="card-content border-radius card-row">
                      <div className="row">
                        <Field
                          cols="12 4"
                          label="Grupo"
                          name="grupo"
                          component={select}
                          data={grupos}
                          type="select"
                        />
                        <Field
                          cols="12 4"
                          label="Provedor"
                          name="provedor"
                          component={select}
                          data={provedores}
                          type="select"
                        />
                        <Field
                          cols="12 4"
                          label="Rede"
                          name="rede"
                          component={select}
                          data={redes}
                          type="select"
                          hidedefaultoption="true"
                        />
                        <div className="col-xs-12 col-sm-12">
                          <hr className="divider" />
                          <div className="filter-actions">
                            <a
                              className="btn btn-success"
                              onClick={() => handle_filter()}
                            >
                              <i className="fa fa-search"></i> Filtrar
                            </a>
                            <a
                              className="btn btn-warning mr-0 ml-0"
                              onClick={() => handle_clear_filter()}
                            >
                              <i className="fa fa-times"></i> Limpar
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
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
              <TableFilterRow />
            </DxGrid>
          </Grid>
        </Content>
      </div>
    </div>
  );
};

const form = reduxForm({ form: "primeiroFaturamento" })(PrimeiroFaturamento);

const mapStateToProps = state => ({
  auth: state.auth,
  reducer: state.primeiroFaturamentoReducer,
  pg_form: state.form.primeiroFaturamento,
  show_loading: state.overlay.show
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      get_1_fat,
      clear_filter,
      change_field,
      get_combos
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(form);
