import React, { useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { toastr } from "react-redux-toastr";
import "./styles.css";

import {
  SortingState,
  FilteringState,
  IntegratedSorting,
  IntegratedFiltering,
  GroupingState,
  IntegratedGrouping,
  DataTypeProvider,
  TableColumnResizing
} from "@devexpress/dx-react-grid";

import {
  Grid as DxGrid,
  VirtualTable,
  TableHeaderRow,
  TableGroupRow,
  Toolbar
} from "@devexpress/dx-react-grid-bootstrap3";

import Content from "../../common/adminLTE/content";
import ContentHeader from "../../common/adminLTE/contentHeader";
import Grid from "../../common/layout/grid";
import Overlay from "../../common/msg/overlay/overlay";
import { LabelField } from "../../common/form/components";
import ModalForm from "../../common/layout/modal";

import ListarCircuitos from "./listar_circuitos";
import ExportCsv from "./export_csv";
import {
  DateTimePickerField
} from "../../common/form/components";

import { get_combos, get_groups } from "../actions";
import {
  get_bill_prevision,
  clear_filter,
  clear_field,
  clear_circuits,
  get_circuit_sum,
  change_field
} from "./actions";

Date.prototype.subtractDaysToday = function (d) {
  this.setTime(this.getTime() + d * 24 * 60 * 60 * 1000);
  return this;
};

const gfg_Run = () => {
  var a = new Date();
  return a.subtractDaysToday(31);
};

const maxDate = gfg_Run();

const PrevisaoDeFaturamento = props => {
  const {
    get_combos,
    get_groups,
    get_bill_prevision,
    get_circuit_sum,
    clear_filter,
    clear_circuits,
    clear_field,
    change_field,
    reducer: { columns, rows },
    faturamentoReducer: { combos, groups },
    formRelatorio,
    show_loading
  } = props;

  const fix = n => Number(n).toLocaleString("pt-BR");
  const list = rows
    .map(i => ({
      ...i,
      pro_rata_ativacao: fix(i.pro_rata_ativacao),
      pro_rata_desativacao: fix(i.pro_rata_desativacao),
      valor_mensalidade: fix(i.valor_mensalidade),
      taxa_ativacao: fix(i.taxa_ativacao),
      total_previsto: fix(i.total_previsto)
    }))
    .sort((a, b) => {
      if (a.provedor < b.provedor) {
        return -1;
      }
      if (a.provedor > b.provedor) {
        return 1;
      }
      return 0;
    });

    const [mr, setMr] = useState(null);
    const [showDateComp, setShowDateComp] = useState(true);

    React.useEffect(() => {
      get_combos().then(_ => {
        get_groups();
        change_field("rede", "MÓVEL");
      });
      return undefined;
    }, []);
    
  const regional = combos.operators
    ? combos.operators.map(c => ({ value: c.id, text: c.regional }))
    : [];
  const agrupadores = groups.map(g => ({ value: g.id, text: g.name }));
  const provedores = combos.vendors
    ? combos.vendors.map(c => ({ value: c.id, text: c.name }))
    : [];
  const meses = combos.mes_ref
    ? combos.mes_ref.map(c => ({ value: c.mes, text: c.mes }))
    : [];
  const redes = [
    { value: "MÓVEL", text: "MÓVEL" },
    { value: "FIXA", text: "FIXA" },
    { value: "FIBER", text: "FIBER" }
  ];

  let { selected_operator, selected_vendor } = 1000000000;
  let selected_net = "";

  const select = props => {
    const {
      cols,
      input,
      label,
      msgvalidation,
      data,
      name,
      hidedefaultoption
    } = props;
    return (
      <Grid cols={cols}>
        <div className="form-group">
          {label ? <label>{label}</label> : null}
          <select className="form-control" {...props} {...input}>
            {hidedefaultoption !== "true" && (
              <option
                value={(name == "operator" || name == "vendor") && 1000000000}
              ></option>
            )}
            {data &&
              data.map(item => (
                <option key={item.value} value={item.value}>
                  {item.text}
                </option>
              ))}
          </select>
        </div>
        {msgvalidation !== "" && msgvalidation !== undefined ? (
          <div className="form-group">
            <span className="label label-danger">{msgvalidation}</span>
          </div>
        ) : null}
      </Grid>
    );
  };

  const handle_get_groups = () => {
    get_groups(selected_vendor, selected_operator, selected_net);
    clear_field("agrupador");
  };

  const handle_select_operator = e => {
    selected_operator = e.target.value;
    handle_get_groups();
  };

  const handle_select_vendor = e => {
    selected_vendor = e.target.value;
    handle_get_groups();
  };

  // const handle_select_net = (e) => {
  //     selected_net = e.target.value
  //     handle_get_groups()
  // }

  const handle_filter = () => {
    if (
      formRelatorio &&
      !formRelatorio.syncErrors &&
      typeof formRelatorio.values !== "undefined" &&
      typeof formRelatorio.values.mes_ref !== "undefined" &&
      formRelatorio.values.mes_ref !== "false"
    ) {
      const filter = formRelatorio.values;
      if (filter.mes_ref && filter.mes_ref.length === 10) {
        filter.mes_ref = filter.mes_ref.slice(3, 10)
      }
      Object.entries(filter).forEach(([key, val]) => {
        if (val === "false") delete filter[key];
      });
      get_bill_prevision(filter).then(_ => setMr(formRelatorio.values.mes_ref));
    } else {
      toastr.error("Especifique um mês de referência.");
    }
    handle_clear_filter();
  };

  const handle_get_circuit_sum = group => {
    if (mr) {
      clear_circuits();
      get_circuit_sum(group, mr);
      window.$("#circuitos").modal("show");
    } else {
      toastr.error("Selecione um mês de referência e clique em Filtrar.");
      window.$("#circuitos").modal("hide");
    }
  };

  const handle_clear_filter = () => {
    clear_filter().then(_ => get_groups());
    //window.location.reload();
    setShowDateComp(false);
    setTimeout(() => {
      setShowDateComp(true);
    }, 1);
  };

  const formatar_agrupador = ({ value }) => (
    <a
      style={{
        color: "darkblue",
        cursor: "pointer",
        textDecoration: "underline"
      }}
      onClick={() => handle_get_circuit_sum(value)}
    >
      <b>{value}</b>
    </a>
  );

  const AgrupadorProvider = props => (
    <DataTypeProvider formatterComponent={formatar_agrupador} {...props} />
  );

  const [agrupadorColumns] = useState(["agrupador"]);

  return (
    <div>
      {show_loading && (
        <div className="cts-overlay overlay-wrapper">
          <Overlay />
        </div>
      )}
      <ModalForm
        LabelButtonSubmit="Circuitos"
        id="circuitos"
        title="Circuitos"
        dimension="modal-g"
      >
        <ListarCircuitos />
      </ModalForm>
      <div className="fade-in fade-out">
        <div className="header">
          <div className="header__left-items">
            <ContentHeader title="Previsão de Faturamento" />
          </div>
        </div>
        <Content>
          <Grid cols="12">
            <div className="box box-primary">
              <div className="box-body">
                <div style={{ paddingBottom: "10px" }} />
                <form>
                  <div className="form-div col-xs-12 p-0">
                    <Field
                      cols="12 2"
                      label="Regional"
                      name="operator"
                      component={select}
                      data={regional}
                      onChange={e => handle_select_operator(e)}
                      type="select"
                    />
                    <Field
                      cols="12 2"
                      label="Provedor"
                      name="vendor"
                      component={select}
                      data={provedores}
                      onChange={e => handle_select_vendor(e)}
                      type="select"
                    />
                    <Field
                      cols="12 2"
                      name="rede"
                      label="Rede"
                      component={select}
                      data={redes}
                      hidedefaultoption="true"
                      // onChange={(e) => handle_select_net(e)}
                      type="select"
                    />
                    <Field
                      cols="12 2"
                      name="agrupador"
                      label="Agrupador"
                      component={select}
                      data={agrupadores}
                      type="select"
                    />
                    {showDateComp && (
                      <Field
                        cols="12 2"
                        label="Mês de Referência"
                        name="mes_ref"
                        //max={maxDate}
                        component={DateTimePickerField}
                        time={false}
                        formatacao='MM/YYYY'
                        visualizacao={['year']}
                        onInput={e => {
                          e.target.value = ""
                        }}
                      //required={"Campo obrigatório"}
                      />
                    )}
                    <Field
                      cols="12 2"
                      name="circuito"
                      label="Circuito"
                      component={LabelField}
                      type="text"
                    />
                    <div className="col-xs-12">
                      <div className="form-actions">
                        <button
                          data-for="top_dark_float"
                          data-tip="Filtrar"
                          type="button"
                          className="btn btn-primary"
                          onClick={() => handle_filter()}
                        >
                          <i className="fa fa-search" />
                          &nbsp;Filtrar
                        </button>
                        <button
                          data-for="top_dark_float"
                          data-tip="Limpar"
                          type="button"
                          className="btn btn-primary"
                          onClick={() => handle_clear_filter()}
                        >
                          <i className="fa fa-times" />
                          &nbsp;Limpar
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </Grid>
          <Grid cols="12">
            <DxGrid rows={list} columns={columns} showBorders>
              <SortingState />
              <IntegratedSorting />
              <GroupingState
                defaultGrouping={[
                  { columnName: "provedor" },
                  { columnName: "regional" }
                ]}
              />
              <IntegratedGrouping />
              <VirtualTable />
              <TableColumnResizing
                defaultColumnWidths={columns.map(c => ({
                  columnName: c.name,
                  width: 140
                }))}
              />
              <TableHeaderRow showSortingControls />
              <Toolbar />
              <ExportCsv
                rows={list}
                columns={columns}
                name="Previsão de Faturamento"
              />
              <AgrupadorProvider for={agrupadorColumns} />
              <TableGroupRow showColumnsWhenGrouped />
              <FilteringState defaultFilters={[]} />
              <IntegratedFiltering />
            </DxGrid>
          </Grid>
        </Content>
      </div>
    </div>
  );
};

const Form = reduxForm({ form: "previsaoDeFaturamento" })(
  PrevisaoDeFaturamento
);

const mapStateToProps = state => ({
  faturamentoReducer: state.faturamentoReducer,
  reducer: state.previsaoDeFaturamentoReducer,
  formRelatorio: state.form.previsaoDeFaturamento,
  deleteInWithCleanUp: true,
  show_loading: state.overlay.show
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      get_combos,
      get_groups,
      get_bill_prevision,
      clear_filter,
      get_circuit_sum,
      clear_circuits,
      clear_field,
      change_field
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Form);
