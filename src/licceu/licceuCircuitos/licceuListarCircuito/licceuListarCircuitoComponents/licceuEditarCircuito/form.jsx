import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import get from "lodash/get";
import { bindActionCreators } from "redux";

import LicceuLabel from "licceu/licceuComponents/ui/licceuLabel";
import form from "./storage.json";
import { getCircuit, handleAllCapacity } from "../../licceuActions";

const Form = ({ circuit_id, data, handleAllCapacity, getCircuit, rows }) => (
  <form className="form">
    <section className="col-md-4 ">
      <div className="box box-primary">
        <LicceuLabel htmlFor="status" text="Status" />
        <Field
          className="form-control input-sm"
          type="text"
          name="status"
          component="select"
        >
          <option hidden value={data.status}>
            {data.status}
          </option>
          {form.status.map(el => (
            <option value={el.value} key={el.value}>
              {el.text}
            </option>
          ))}
        </Field>

        <LicceuLabel htmlFor="tipo_demanda" text="Tipo Demanda" />
        <Field
          className="form-control input-sm"
          type="text"
          name="tipo_demanda"
          component="select"
        >
          <option hidden value={data.tipo_demanda}>
            {data.tipo_demanda}
          </option>
          {form.demanda.map(el => (
            <option value={el.value} key={el.value}>
              {el.text}
            </option>
          ))}
        </Field>

        <LicceuLabel htmlFor="frequencia" text="Frequência" />
        <Field
          component="input"
          className="form-control input-sm"
          name="frequencia"
        />
      </div>
    </section>
    <section className="col-md-4">
      <div className="box box-primary">
        <LicceuLabel htmlFor="tecnologia" text="Tecnologia" />
        <Field
          className="form-control input-sm"
          type="text"
          name="tecnologia"
          component="select"
        >
          <option hidden value={data.tecnologia}>
            {data.tecnologia}
          </option>
          {form.tecnologia.map(el => (
            <option value={el.value} key={el.value}>
              {el.text}
            </option>
          ))}
        </Field>
        <LicceuLabel htmlFor="rota" text="Interface" />
        <Field
          className="form-control input-sm"
          name="interface"
          component="select"
        >
          <option hidden value={data.interface}>
            {data.interface}
          </option>
          {form.interface.map(el => (
            <option value={el.value} key={el.value}>
              {el.text}
            </option>
          ))}
        </Field>

        <LicceuLabel htmlFor="capcidade_de_ate" text="OT" />
        <div className="input-group input-group-sm">
          <Field
            className="form-control input-sm"
            type="text"
            name="ot"
            component="input"
          />
          <span className="input-group-btn">
            <button
              type="button"
              className="btn btn-primary btn-flat"
              data-toggle="tooltip"
              title="Busca Rápida"
              onClick={() => getCircuit(circuit_id, data.ot)}
            >
              <i className="fa fa-search" aria-hidden="true" />
            </button>
          </span>
        </div>
      </div>
    </section>
    <section className="col-md-4">
      <div className="box box-primary">
        <LicceuLabel
          htmlFor="capacidade_atual"
          text="Capacidade Atual (Mbps)"
        />
        <Field
          className="form-control input-sm"
          type="text"
          name="capacidade"
          component="input"
          disabled
        />

        <LicceuLabel htmlFor="" text="Capacidade Desejada (Mbps)" />
        <Field
          className="form-control input-sm"
          type="number"
          name="capacidade_desejada"
          component={InputCapacidade}
          handleAllCapacity={handleAllCapacity}
          rows={rows}
        />

        <LicceuLabel htmlFor="ordem_complexa" text="Ordem Complexa" />
        <Field
          component="input"
          className="form-control input-sm"
          name="ordem_complexa"
        />
      </div>
    </section>
  </form>
);

const InputCapacidade = ({
  input: { onChange, ...inputProps },
  handleAllCapacity,
  rows,
  ...others
}) => (
  <input
    onChange={evt => {
      onChange(evt.target.value);
      handleAllCapacity(evt.target.value, rows);
    }}
    input={inputProps}
    {...others}
  />
);

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getCircuit, handleAllCapacity }, dispatch);

export default connect(
  state => ({
    data: get(state, "form.licceuEditarCircuito.values", {}),
    rows: get(state, "licceuEditarCircuito.tableRows", {})
  }),
  mapDispatchToProps
)(reduxForm({ form: "licceuEditarCircuito" })(Form));
