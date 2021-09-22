import React from "react";
import { useSelector } from "react-redux";
import { Input } from "common/input";
import { Card } from "common";
import sumBy from "lodash/sumBy";
import { toFloat, isValidation } from "common/utils";
import { Field } from "redux-form";
import Row from "common/layout/row";
import get from "lodash/get";
import Grid from "common/layout/grid";
import moment from "moment";
import { LabelInput, Label, TextareaField } from "common/form/components";
import { columnsPainelIncosistencias } from "../mock.json";
import { Table } from "common";

const ValidacaoIncosistencias = ({ rowValues }) => {
  console.log("Row", rowValues);
  const { rowValidated } = useSelector(state => ({
    rowValidated: state.faturamentoConciliacaoReducer.rowValidated
  }))

  const LabelInputCompRead = ({ isData, cols, data, item, ...others }) => {
    const formatDate = value => {
      if (value === "[n/a]") {
        return "[n/a]";
      }
      return value && moment(value).format("DD/MM/YYYY");
    };
    return (
      <LabelInput
        value={
          isData
            ? formatDate(get(data, item, "[n/a]"))
            : get(data, item, "[n/a]")
        }
        readOnly
        {...others}
        cols={cols}
      />
    );
  };

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

  return (
    <form className="form">
      <div className="box-body">
      {rowValidated.bill_dif_type_id + " - " + rowValidated.inconsistencia}
        <Grid cols="12 12">
          <Section>
            <Row>
              <LabelInputCompRead
                cols="2"
                value={get(rowValues, "bill_number", "[n/a]")}
                label="Fatura"
                isData
              />
              <LabelInputCompRead
                cols="2"
                value={get(rowValues, "provedor", "[n/a]")}
                label="Provedor"
                isData
              />
              <LabelInputCompRead
                cols="2"
                value={rowValidated.apontado}
                label="Valor Apontado"
                isData
              />
              <LabelInputCompRead
                cols="2"
                // value={get(props, "bill_number", "[n/a]")}
                label="% Apontado"
                isData
              />
            </Row>
            <Row>
              <LabelInputCompRead
                cols="3"
                label="Agrupador"
                value={get(rowValues, "agrupador", "[n/a]")}
              />
              <LabelInputCompRead
                cols="3"
                label="Data de Emissão"
                value={get(rowValues, "competence_month", "[n/a]")}
                isData
              />
              <LabelInputCompRead
                cols="3"
                label="Data de Vencimento"
                value={get(rowValues, "deadline_at", "[n/a]")}
                isData
              />
              <LabelInputCompRead
                cols="2"
                // value={get(props, "bill_number", "[n/a]")}
                label="% Fatura"
                isData
              />
            </Row>
          </Section>
        </Grid>
        <Grid cols="12 12">
          <Section>
            <Table
              columns={columnsPainelIncosistencias}
              // rows={props.billDdClassification}
              disablePagination
            />
          </Section>
        </Grid>
      </div>
    </form>
  );
};

export default ValidacaoIncosistencias;
