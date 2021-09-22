import React from "react";
import { Field, reduxForm } from "redux-form";
import { Card } from "common";
import { Input } from "common/input";
import get from "lodash/get";
import { connect } from "react-redux";

const Solicitacao = ({ selection, list, evtList, vendor }) => {
  const otCode = get(selection.map(item => list[item]), "[0].code") || "[N/A]";
  const evtCode = otCode.replace("OT", "EVT");

  return (
    <Card
      title="SOLICITAÇÃO DE ESTUDO DE VIABILIDADE TÉCNICA"
      tools={`Data:${new Date().toLocaleDateString("pt-br")}`}
    >
      <Field
        component={Input}
        contentProps="col-md-4"
        readOnly
        name="referencia"
        placeholder={`${evtCode}-${evtList.length + 1}`}
        text="Referência"
      />
      <Field
        component={Input}
        contentProps="col-md-4"
        readOnly
        name="ot"
        placeholder={otCode}
        text="Ot"
      />
      <Field
        component={Input}
        contentProps="col-md-4"
        readOnly
        name="provedor"
        placeholder={vendor}
        text="Provedor"
      />
    </Card>
  );
};

const mapStateToProps = state => ({
  list: get(state, "ot.list", []),
  evtList: get(state, "radarPossibilidades.evt_list", []),
  vendor: get(state, "radarPossibilidades.vendor", "[N/A]")
});

const formWrapper = reduxForm({
  form: "PedidoCotacaoSolicitacao"
})(Solicitacao);

export default connect(mapStateToProps)(formWrapper);
