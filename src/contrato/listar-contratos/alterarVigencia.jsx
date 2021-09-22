import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import DateTimePicker from "react-widgets/lib/DateTimePicker";
import { Label, TextareaField } from "common/form/components";

import get from "lodash/get";

const AlterarVigencia = ({
  linhaSelecionada,
  setParamsVigenciaContrato,
  vigenciaContrato
}) => {
  console.log("linha", linhaSelecionada);
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

  const LabelComp = ({ text }) => (
    <div className="col-sm-6">
      <Label text={text} />
    </div>
  );

  const Row = ({ children }) => <div className="row">{children}</div>;

  const RenderDateTimePicker = ({ input: { onChange, value } }) => (
    <DateTimePicker
      onChange={onChange}
      format="DD/MM/Y"
      time={false}
      value={!value ? null : new Date(value)}
    />
  );

  const data = {
    ...vigenciaContrato,
    id: linhaSelecionada.id,
    provedor_id: linhaSelecionada.provedor_id
  };

  setParamsVigenciaContrato(data);

  return (
    <form className="form">
      <Row>
        <LabelComp text="Provedor" />
        <FieldComp
          name="provedor"
          component={TextareaField}
          type="text"
          disabled={true}
        />

        <LabelComp text="Contrato" />
        <FieldComp
          name="contrato"
          component={TextareaField}
          type="text"
          disabled={true}
        />
      </Row>
      <Row>
        <LabelComp text="Nova Data Término de Vigência" />
        <FieldComp
          name="new_contract_end_at"
          component={RenderDateTimePicker}
          time={false}
          formatacao="DD/MM/YYYY"
        />
      </Row>
      <Row>
        <LabelComp text="Motivo da Alteração" />
        <FieldComp name="reason" component={TextareaField} type="text" />
      </Row>
    </form>
  );
};

const formWrapper = reduxForm({
  form: "FiltroAlterarVigencia"
})(AlterarVigencia);

const mapStateToProps = ({ form: { FiltroAlterarVigencia } }, props) => {
  const contract_start_at = get(props, "linhaSelecionada.contract_start_at");
  const contrato = get(props, "linhaSelecionada.contrato");
  const provedor = get(props, "linhaSelecionada.provedor");
  return {
    vigenciaContrato: get(FiltroAlterarVigencia, "values", {}),
    initialValues: {
      contract_start_at,
      contrato,
      provedor
    },
    enableReinitialize: true
  };
};

export default connect(mapStateToProps)(formWrapper);
