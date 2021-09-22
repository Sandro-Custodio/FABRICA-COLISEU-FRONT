import "./style.css";

import { Field, reduxForm } from "redux-form";
import React, { useEffect, useState } from "react";
import { RenderDateTimePicker, Select, TextArea } from "common/input";
import { clearFilter, getSelects } from "../list/action";

import FiltroLL from "./FiltroLL";
import { connect } from "react-redux";
import get from "lodash/get";
import { select_values } from "./mock.json";

const OdsCreateForm = ({
  handleSubmit,
  getSelects,
  projects,
  status,
  setRows,
  setLoading,
  network,
  market_segment
}) => {
  const [segmentoEnabled, toggleSegmento] = useState(true);

  useEffect(() => getSelects(), []);

  useEffect(() => {
    network === "FIXA" ? toggleSegmento(false) : toggleSegmento(true);
  });

  const onSubmit = e => {
    e.preventDefault();
  };

  const isFixaOrMovel = (rede, segmento_mercado) => {
    switch (rede) {
      case "FIXA":
        if (segmento_mercado) return true;
        else return false;
      case "MÓVEL":
        return true;
      case "MOVEL":
        return true;
      default:
        return false;
    }
  };

  return (
    <main className="fade-in fade-out circuito" id="ods-create">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div style={{ display: "flex" }}>
          <div className="col-md-2">
            <Field
              label="Data da Abertura"
              component={RenderDateTimePicker}
              name="data_abertura"
            />
            <Field
              component={Select}
              data={select_values.rede}
              label="Rede"
              textKey="description"
              name="rede"
              valueKey="id"
            />
          </div>
          <div className="col-md-3">
            <Field
              component={Select}
              data={status}
              label="Status"
              textKey="description"
              valueKey="id"
              name="status_id"
              disabled={true}
            />
            <Field
              component={Select}
              data={projects}
              label="Projetos"
              textKey="concat_name"
              valueKey="id"
              name="project_id"
            />
          </div>
          <div className="col-md-3">
            <Field
              component={Select}
              data={select_values.segmento_mercado}
              name="segmento_mercado"
              label="Tipo de mercado"
              textKey="description"
              valueKey="value"
              disabled={segmentoEnabled}
            />
            <Field
              name="study_origin"
              label="Fonte de Estudo"
              textKey="description"
              valueKey="value"
              component={Select}
              data={select_values.study_origin}
            />
          </div>
          <div className="col-md-4">
            <Field
              name="remarks"
              text="Observações"
              component={TextArea}
              style={{ height: 100 }}
              value="value"
            />
          </div>
        </div>
      </form>
      <FiltroLL
        setRows={setRows}
        setLoading={setLoading}
        enableFilterButton={isFixaOrMovel(network, market_segment)}
      />
    </main>
  );
};

const mapStateToProps = state => {
  return {
    projects: get(state, "listarODS.projects", []),
    status: get(state, "listarODS.status", []),
    network: get(state, "form.createODS.values.rede"),
    market_segment: get(state, "form.createODS.values.segmento_mercado")
  };
};

const formWrapper = reduxForm({
  form: "createODS"
})(OdsCreateForm);

export default connect(mapStateToProps, { getSelects, clearFilter })(
  formWrapper
);
