import React from "react";

export default () => {
  return (
    <div>
      <p>
        Os campos OBRIGATÓRIOS para qualquer operação e sua respectiva posição
        são listados abaixo:
        <br />
        Para Associação LL_GUID x LPU_GUID: <br />
        1 - LL_GUID (Identificador único do circuito na base) <br />
        2 - LPU_GUID (Identificador único do item de LPU a ser associado /
        atualizado ao circuito)
        <br />
        O cabeçalho deve conter obrigatoriamente o conteúdo abaixo: <br />
        LL GUID;LPU GUID <br />
        Para Garantia de Receita:
        <br />
        1 - LL_GUID (Identificador único do circuito na base)
        <br />
        2 - GARANTIA_RECEITA (SIM / NÃO)
        <br />
        O cabeçalho deve conter obrigatóriamente o conteúdo abaixo <br />
        LL GUID;GARANTIA RECEITA <br />
        Para Tipo Reajuste:
        <br />
        1 - LL_GUID (Identificador único do circuito na base)
        <br />
        2 - TIPO_REAJUSTE (ANIVERSÁRIO / PADRÃO) O cabeçalho deve conter
        obrigatóriamente o conteúdo abaixo <br />
        LL GUID;TIPO REAJUSTE <br />
      </p>
    </div>
  );
};
