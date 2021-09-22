import React from "react";
import { Table } from "common";
import { LabelInput } from "common/form/components";
import Row from "common/layout/row";
import Grid from "common/layout/grid";
import get from "lodash/get";
import moment from "moment";
import { columns2, columns3 } from "./columns.json";
import { Field } from "redux-form";
import { LabelInputCompRead } from "./comps";
import { Tab } from "common";
import Content from "common/adminLTE/content";

const Section = ({ children }) => (
  <Grid>
    <div className="box box-primary">
      <div className="box-body">{children}</div>
    </div>
  </Grid>
);

const formatDate = value => {
  if (value === "[n/a]") {
    return "[n/a]";
  }
  return value && moment(value).format("DD/MM/YYYY");
};

const LabelInputComp = ({ isData, cols, data, item, ...others }) => (
  <LabelInput
    value={
      isData ? formatDate(get(data, item, "[n/a]")) : get(data, item, "[n/a]")
    }
    readOnly
    {...others}
    cols={cols}
  />
);

LabelInputComp.defaultProps = {
  cols: "3",
  isData: false
};

const FieldComp = ({ col, ...others }) => (
  <div className={`col-sm-${col}`}>
    <Field
      className="form-control input-sm"
      type="text"
      component="input"
      {...others}
    />
  </div>
);

FieldComp.defaultProps = {
  col: 6
};

const formataDataCerta = value =>
  value !== null ? moment(value, "YYYY-MM-DD").format("DD/MM/YYYY") : "[n/a]";

const FaturaDetalhada = props => {
  //////////////////filtra nas linhas os tipos distintos para criar as abas dinamicamente
  let uniqueTags = [];
  props.invoicingGridDD.map(name => {
    if (uniqueTags.indexOf(name.classificacao2) === -1) {
      uniqueTags.push(name.classificacao2);
    }
  });

  let rowsBillsDD = [];

  const list = [];
  ///////////////////// filtra as linhas pelos tipos e controi as tabelas

  for (const [index, value] of uniqueTags.entries()) {
    for (const [i, val] of props.invoicingGridDD.entries()) {
      if (String(props.invoicingGridDD[i].classificacao2) === String(value)) {
        rowsBillsDD.push(val);
      }
    }
    list.push({
      title: String(value),
      Comp: <Table columns={columns3} rows={rowsBillsDD} disablePagination />
    });
    rowsBillsDD = [];
  }

  // console.log("@@@@@@@@@@props@@@@@@@@@@", props);
  return (
    <form className="form">
      <div className="box-body">
        <Grid cols="12 6">
          <Section>
            <Row>
              <LabelInputCompRead
                cols="2"
                label="Cadastrada por"
                value={get(props, "login", "[n/a]")}
              />
              <LabelInputComp
                cols="2"
                label=" "
                // data={evts.pedidoAccord.evt}
                item="requested_at"
              />
              <LabelInputCompRead
                cols="2"
                label="Cadastrada por"
                value={get(props, "network", "[n/a]")}
              />
              <LabelInputCompRead
                cols="2"
                label="Status"
                value={get(props, "description", "[n/a]")}
              />
            </Row>
            <Row>
              <LabelInputCompRead
                cols="2"
                label="Regional"
                value={get(props, "regional", "[n/a]")}
              />
              <LabelInputCompRead
                cols="2"
                label="Provedor"
                value={get(props, "provedor", "[n/a]")}
              />

              <LabelInputComp
                value={get(props, "name", "[n/a]")}
                item="evt"
                label="Agrupador"
              />
              <LabelInputCompRead
                cols="2"
                label="Mês Referência"
                value={get(props, "bill_month", "[n/a]")}
              />
              <LabelInputCompRead
                cols="2"
                label="Mês Competência"
                value={get(props, "competence_month", "[n/a]")}
              />
            </Row>
          </Section>
          <Section>
            <Row>
              <LabelInputCompRead
                cols="2"
                value={formataDataCerta(get(props, "created_at", "[n/a]"))}
                label="Cadastrada em"
                isData
              />
              <LabelInputCompRead
                cols="2"
                value={formataDataCerta(get(props, "accepted_at", "[n/a]"))}
                label="Aceita em"
                isData
              />
              <LabelInputCompRead
                cols="2"
                value={formataDataCerta(get(props, "checked_at", "[n/a]"))}
                label="Conciliada em"
                isData
              />
              <LabelInputCompRead
                cols="2"
                value={formataDataCerta(get(props, "approved_at", "[n/a]"))}
                label="Aprovada em"
                isData
              />
            </Row>
            <Row>
              <LabelInputCompRead
                cols="3"
                label="Fatura"
                value={get(props, "bill_number", "[n/a]")}
              />
              <LabelInputCompRead
                cols="3"
                label="Emissão"
                value={formataDataCerta(get(props, "order_at", "[n/a]"))}
                isData
              />
              <LabelInputCompRead
                cols="3"
                label="Vencimento"
                value={formataDataCerta(get(props, "deadline_at", "[n/a]"))}
                isData
              />
            </Row>
            <Row>
              <LabelInputCompRead
                cols="3"
                label="Linha de DD"
                value={get(props, "bill_dd_items", "[n/a]")}
              />
              <LabelInputCompRead
                cols="3"
                label="Valor DD(R$)"
                value={`R$ ${get(props, "bill_cost_dd") || "0.0"}`}
              />
              <LabelInputCompRead
                cols="3"
                label="Valor Fatura(R$)"
                value={`R$ ${get(props, "bill_total") || "0.0"}`}
              />
              <LabelInputCompRead
                cols="3"
                label="Diferença"
                value={
                  get(props.bill_total) === null ||
                  get(props.bill_cost_dd) === null
                    ? "R$ 0.0"
                    : `R$ ${(
                        parseFloat(props.bill_total) -
                        parseFloat(props.bill_cost_dd)
                      ).toFixed(2)}`
                }
              />
            </Row>
          </Section>
        </Grid>
        <Grid cols="12 6">
          <Section>
            <Table
              columns={columns2}
              rows={props.billDdClassification}
              disablePagination
            />
          </Section>
        </Grid>

        <Grid cols="12 12">
          <Section>
            <Content>
              <Tab tabList={list} />
            </Content>
          </Section>
        </Grid>
      </div>
    </form>
  );
};

export default FaturaDetalhada;
