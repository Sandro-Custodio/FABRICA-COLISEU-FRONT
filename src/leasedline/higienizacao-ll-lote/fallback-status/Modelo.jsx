import React from "react";

export default () => (
  <div>
    <p>
      1 - <strong>LL_GUID</strong> (Identificador Único do Circuito na Base)
      <br />2 - <strong>CIRCUITO_ID</strong> (Designação do Provedor)
      <br />3 - <strong>PROVEDOR</strong> (Nome do provedor conforme cadastrado
      no coliseu)
      <br />4 - <strong>DATA DESATIVACÃO</strong> (Data de encerramento de
      cobrança do Circuito)
      <br />5 - <strong>DATA ATIVAÇÃO</strong> (Data ativação do circuito)
      <br />6 - <strong>OBSERVAÇÃO</strong> (Observação da modificação)
      <br />
    </p>
    <p>
      O cabeçalho deve conter obrigatóriamente o conteúdo abaixo:
      <br />
      <strong>
        LL_GUID; CIRCUITO_ID_CLEAN; NAME; DATA_DESATIVACAO; DATA_ATIVACAO;
        OBSERVAÇÃO.
      </strong>
    </p>

    <p>
      <strong>DATA ATIVACÃO</strong> será obrigatório se o status
      <strong> PARA</strong> for Ativado.
    </p>
  </div>
);
