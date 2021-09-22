import React from "react";
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
const LabelComp = ({ text, col }) => (
  <div className={`col-sm-${col}`}>
    <Label text={text} />
  </div>
);
LabelComp.defaultProps = { col: 6 };

const Row = ({ children }) => <div className="row">{children}</div>;

const redeType = [{ text: "FIXA" }, { text: "MÓVEL" }, { text: "FIBER" }];
const trimSpaces = value => value && value.replace(/\s/g, "");

const FormFilter = ({
  regionalList,
  provedorList,
  faturaStatusList,
  agrupadorList
}) => {
  return (
    <form className="form">
      <Row>
        <LabelComp text="Número da Fatura" />
        <FieldComp name="invoice_number" normalize={trimSpaces} />
      </Row>
      <Row>
        <LabelComp col={3} text="Mês referência" />
        <LabelComp col={3} text="MM/YYYY" />
        <FieldComp name="bill_month" normalize={trimSpaces} />
      </Row>
      <Row>
        <LabelComp text="Status da Fatura" />
        <FieldComp
          name="status_id"
          component="select"
          parse={value => parseInt(value, 10)}
        >
          <option value="">Selecione</option>
          {faturaStatusList.map((data, i) => (
            <option key={i} value={data.value}>
              {data.text}
            </option>
          ))}
        </FieldComp>
      </Row>

      <Row>
        <LabelComp text="Regional" />
        <FieldComp
          type="number"
          name="operator_id"
          component="select"
          parse={value => parseInt(value, 10)}
        >
          <option value="">Selecione</option>
          {regionalList.map((data, i) => (
            <option key={i} value={data.value}>
              {data.text}
            </option>
          ))}
        </FieldComp>
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
            <option key={i} value={data.value}>
              {data.text}
            </option>
          ))}
        </FieldComp>
      </Row>

      <Row>
        <LabelComp text="Agrupador" />
        <FieldComp
          type="number"
          name="group_id"
          component="select"
          parse={value => parseInt(value, 10)}
        >
          <option value="">Selecione</option>
          {agrupadorList.map((data, i) => (
            <option key={i} value={data.value}>
              {data.text}
            </option>
          ))}
        </FieldComp>
      </Row>

      <Row>
        <LabelComp text="Rede" />
        <FieldComp name="network" component="select">
          <option value="">Selecione</option>
          {redeType.map((data, i) => (
            <option key={i} value={data.text}>
              {data.text}
            </option>
          ))}
        </FieldComp>
      </Row>
    </form>
  );
};

export default FormFilter;
