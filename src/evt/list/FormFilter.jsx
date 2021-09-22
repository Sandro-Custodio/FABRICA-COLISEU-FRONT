import React from "react";
import DateTimePicker from "react-widgets/lib/DateTimePicker";
import { Field } from "redux-form";
import { Label } from "common/form/components";

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

const pmType = [{ tipo: "Sim" }, { tipo: "Não" }];
const trimSpaces = value => value && value.replace(/\s/g, "");

const RenderDateTimePicker = ({ input: { onChange, value }, showTime }) => (
  <DateTimePicker
    onChange={onChange}
    format="DD/MM/Y"
    time={false}
    value={!value ? null : new Date(value)}
  />
);

const FormFilter = ({ projetoList, otList, evtStatusList, provedorList }) => {
  return (
    <form className="form">
      <Row>
        <LabelComp text="Código OT" />
        <FieldComp name="ot_code_simple" normalize={trimSpaces} />
      </Row>

      <Row>
        <LabelComp text="Múltiplos códigos de OT (Separe-as por ponto e vírgula)" />
        <FieldComp name="ot_code" normalize={trimSpaces} />
      </Row>

      <Row>
        <LabelComp text="OT Solicitada em" />
        <FieldComp
          col="3"
          name="created_at_ini"
          component={RenderDateTimePicker}
        />
        <FieldComp
          col="3"
          name="created_at_end"
          component={RenderDateTimePicker}
        />
      </Row>

      <Row>
        <LabelComp text="Ativação desejada da OT" />
        <FieldComp
          col="3"
          name="ot_active_at_ini"
          component={RenderDateTimePicker}
        />
        <FieldComp
          name="ot_active_at_end"
          col="3"
          component={RenderDateTimePicker}
        />
      </Row>

      <Row>
        <LabelComp text="Projeto" />
        <FieldComp
          // type="number"
          name="project_id"
          component="select"
          parse={value => parseInt(value, 10)}
        >
          <option value="">Selecione</option>
          {projetoList.map((data, i) => (
            <option key={i} value={data.projetoId}>
              {data.projeto}
            </option>
          ))}
        </FieldComp>
      </Row>

      <Row>
        <LabelComp text="OT Status" />
        <FieldComp
          type="number"
          name="ot_status_id"
          component="select"
          parse={value => parseInt(value, 10)}
        >
          <option value="">Selecione</option>
          {otList.map((data, i) => (
            <option key={i} value={data.otStatusId}>
              {data.otStatus}
            </option>
          ))}
        </FieldComp>
      </Row>

      <Row>
        <LabelComp text="Código EVT" />
        <FieldComp
          name="request_protocol"
          component="input"
          normalize={trimSpaces}
        />
      </Row>

      <Row>
        <LabelComp text="Provedor" />
        <FieldComp
          type="number"
          name="vendor_id"
          component="select"
          parse={value => parseInt(value, 10)}
        >
          <option value="">Selecione</option>
          {provedorList.map((data, i) => (
            <option key={i} value={data.provedorId}>
              {data.provedor}
            </option>
          ))}
        </FieldComp>
      </Row>

      <Row>
        <LabelComp text="Quantidade" />
        <FieldComp name="quantity" component="input" normalize={trimSpaces} />
      </Row>

      <Row>
        <LabelComp text="EVT Status" />
        <FieldComp
          type="number"
          name="evt_status_id"
          component="select"
          parse={value => parseInt(value, 10)}
        >
          <option value="">Selecione</option>
          {evtStatusList.map((data, i) => (
            <option key={i} value={data.evtStatusId}>
              {data.evtStatus}
            </option>
          ))}
        </FieldComp>
      </Row>

      <Row>
        <LabelComp text="PMS" />
        <FieldComp name="pms_verification" component="select">
          <option value="">Selecione</option>
          {pmType.map((data, i) => (
            <option key={i} value={data.tipo}>
              {data.tipo}
            </option>
          ))}
        </FieldComp>
      </Row>
    </form>
  );
};

export default FormFilter;
