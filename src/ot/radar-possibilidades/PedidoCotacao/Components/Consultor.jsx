import React from "react";
import { connect } from "react-redux";
import get from "lodash/get";

import { Card } from "common";

const Consultor = ({ contract_time }) => {
  return (
    <Card color title="Prezado Consultor">
      <p>
        Solicitamos Estudo de Viabilidade Técnica para provimento de EILD para
        rota abaixo. Pedimos retorno em no máximo{" "}
        <strong>{contract_time}</strong> dias da emissão deste e-mail,
        juntamente com a confirmação de disponibilidade / prazo de atendimento e
        condições comerciais.
      </p>
    </Card>
  );
};

const mapStateToProps = ({ radarPossibilidades }) => ({
  contract_time: get(
    radarPossibilidades,
    "formEvtAfterAction.contract_time",
    "[N/A]"
  )
});

export default connect(mapStateToProps)(Consultor);
