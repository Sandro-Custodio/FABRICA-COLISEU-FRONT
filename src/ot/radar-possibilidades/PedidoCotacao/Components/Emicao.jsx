import React from "react";
import { Field, reduxForm } from "redux-form";
import { Card } from "common";
import { Input } from "common/input";
import { useSelector } from "react-redux";
import get from "lodash/get";

const Emicao = () => {
  const auth = useSelector(({ auth }) => auth);
  return (
    <Card color="default" title="EMITIDO POR TIM CELULAR S/A">
      <div className="col-md-6">
        <Field
          component={Input}
          readOnly
          name="representante"
          placeholder={get(auth, "user.name") || "[N/A]"}
          text="Nome Representante"
        />
        <Field
          component={Input}
          readOnly
          name="phone"
          placeholder={get(auth, "user.contact_number") || "[N/A]"}
          text="Telefone / Celular"
        />
        <Field
          component={Input}
          readOnly
          name="address"
          placeholder={get(auth, "user.address") || "[N/A]"}
          text="Endereço"
        />
      </div>
      <div className="col-md-6">
        <Field
          component={Input}
          readOnly
          name="mail"
          placeholder={get(auth, "user.email") || "[N/A]"}
          text="Email"
        />
        <Field
          component={Input}
          readOnly
          name="fax"
          placeholder={get(auth, "user.fax_number") || "[N/A]"}
          text="Fax"
        />
        <Field
          component={Input}
          readOnly
          name="city"
          placeholder={get(auth, "user.city") || "[N/A]"}
          text="Cidade"
        />
      </div>
    </Card>
  );
};

const formWrapper = reduxForm({
  form: "PedidoCotacaoEmicao"
})(Emicao);

export default formWrapper;
