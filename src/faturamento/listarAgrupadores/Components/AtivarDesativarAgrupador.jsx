import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Row } from "../../comps/componentesUsaveis";
import Grid from "common/layout/grid";
import { Label, TextareaField } from "common/form/components";
import get from "lodash/get";

// import "./styles.css";

const AtivarDesativarAgrupador = ({
  linhaSelecionada,
  ativDesativAgrupador,
  user,
  setParamsAtivDesaAgrupador
}) => {
  const Section = ({ children }) => (
    <Grid>
      <div className="box box-primary">
        <div className="box-body">{children}</div>
      </div>
    </Grid>
  );

  const data = {
    ...ativDesativAgrupador,
    id: linhaSelecionada.id,
    status_id: linhaSelecionada.statusId === 63 ? 62 : 63
  };
  setParamsAtivDesaAgrupador(data);
  return (
    <>
      <div className="box-body">
        <Section>
          <Row>
            <Label text="Regional" cols="2" />
            <Field
              name="regional"
              cols="2"
              component={TextareaField}
              type="text"
              readOnly
            />

            <Label text="Provedor" cols="2" />
            <Field
              name="provedor"
              cols="2"
              component={TextareaField}
              type="text"
              readOnly
            />

            <Label text="Agrupador" cols="2" />
            <Field
              name="agrupador"
              cols="2"
              component={TextareaField}
              type="text"
              readOnly
            />
          </Row>
          <Row>
            <Label text="A partir de:" cols="2" />
            <Field
              name="reference_month"
              cols="2"
              component={TextareaField}
              type="text"
              placeholder="MM/YYYY"
            />

            <Label text="Observação" cols="2" />
            <Field
              name="remarks"
              cols="6"
              component={TextareaField}
              type="text"
            />
          </Row>
        </Section>
      </div>
    </>
  );
};

const formWrapper = reduxForm({
  form: "FiltroAtivDesativAgrupador"
})(AtivarDesativarAgrupador);

const mapStateToProps = (
  { form: { FiltroAtivDesativAgrupador } },
  props,
  state
) => {
  // console.log("props:", props);
  const regional = get(props, "linhaSelecionada.regional");
  const agrupador = get(props, "linhaSelecionada.agrupador");
  const provedor = get(props, "linhaSelecionada.provedor");
  // console.log("state:", state);
  return {
    ativDesativAgrupador: get(FiltroAtivDesativAgrupador, "values", {}),
    initialValues: {
      regional,
      agrupador,
      provedor
    }
  };
};

export default connect(mapStateToProps)(formWrapper);
