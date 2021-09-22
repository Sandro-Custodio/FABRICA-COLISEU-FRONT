import React, { useEffect } from "react";
import { bindActionCreators } from "redux";
import { Field, reduxForm } from "redux-form";
import DateTimePicker from "react-widgets/lib/DateTimePicker";
import { connect } from "react-redux";
import get from "lodash/get";
import { getSelects } from "../action";

const RenderDateTimePicker = ({ input: { onChange, value } }) => (
  <DateTimePicker
    onChange={onChange}
    format="DD/MM/YYYY"
    time={false}
    value={!value ? null : new Date(value)}
  />
);

const Input = ({ name, text, className, ...others }) => (
  <>
    {text && <label htmlFor={name}>{text}</label>}
    <Field
      id={name}
      className={`form-control input-sm ${className || ""}`}
      type="text"
      component="input"
      name={name}
      {...others}
    />
  </>
);

const Card = ({ children, col }) => (
  <section className={`col-md-${col}`}>
    <div className="box box-primary licceu-circuito">
      <div className="box-body">{children}</div>
    </div>
  </section>
);

Card.defaultProps = {
  col: 4
};

const SimpleForm = ({ projects, status, getSelects, handleSubmit }) => {
  useEffect(() => {
    if (!projects.length || !status.length) {
      getSelects();
    }
  }, []);

  return (
    <main className="fade-in fade-out circuito">
      <form className="form" onSubmit={handleSubmit}>
        <Card>
          <Input name="od_code_simple" text="Código OD" />
          <Input
            name="od_code"
            text="Multiplos Códigos de OD:"
            component="textarea"
            style={{ marginBottom: 15 }}
            rows={4}
            placeholder="Para filtrar múltiplos códigos, separe-os por ponto e vírgula(;)"
          />
          <Input name="ot_code" text="Código OT:" />
        </Card>
        <Card>
          <Input name="odStatus_id" text="OD Status" component="select">
            <option value="">Selecione</option>
            {status.map(n => (
              <option key={n.id} value={n.id}>
                {n.description}
              </option>
            ))}
          </Input>
          <Input
            name="circuit_id_multiple"
            text="Múltiplos Circuitos ID:"
            component="textarea"
            style={{ marginBottom: 15 }}
            rows={4}
            placeholder="Para filtrar múltiplos circuitos, separe-os por ponto e vírgula(;)"
          />
          <Input name="circuito_id" text="Circuito ID:" />
        </Card>
        <Card>
          <Input name="project_id" text="Projeto:" component="select">
            <option value="">Selecione</option>
            {projects.map(n => (
              <option key={n.id} value={n.id}>
                {n.name}
              </option>
            ))}
          </Input>

          <label htmlFor="ponta_a_b">OD criada em:</label>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Input name="created_at_ini" component={RenderDateTimePicker} />
            <strong style={{ margin: "0 5px" }}>até</strong>
            <Input name="created_at_end" component={RenderDateTimePicker} />
          </div>

          <label htmlFor="ponta_a_b">Ponta A/B</label>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Field
              id="ponta_a_b"
              className="form-control input-sm"
              type="text"
              component="input"
              name="elemento_id_a"
            />
            <strong style={{ fontSize: "2rem", margin: "0 5px" }}>/</strong>
            <Field
              id="ponta_a_b"
              className="form-control input-sm"
              type="text"
              component="input"
              name="elemento_id_b"
            />
          </div>
        </Card>
      </form>
    </main>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getSelects
    },
    dispatch
  );

const mapStateToProps = state => ({
  projects: get(state, "listarODS.projects", []),
  status: get(state, "listarODS.status", [])
});

export default reduxForm({
  form: "filterODS"
})(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SimpleForm)
);
