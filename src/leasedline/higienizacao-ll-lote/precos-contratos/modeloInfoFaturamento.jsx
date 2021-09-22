import React from "react";

export default () => {
  return (
    <div>
      <p>
        Os campos OBRIGATÓRIOS para qualquer operação e sua respectiva posição
        são listados abaixo:
        <br />
        1 - LL_GUID (Identificador Único do Circuito na Base)
        <br />
        2 - CIRCUITO_ID (Designação do Provedor)
        <br />
        3 - PROVEDOR (Nome do provedor conforme cadastrado no coliseu)
        <br />
        16 - OBSERVAÇÃO (Observação da modificação) <br />
        <br />
        Atualização do Contrato <br /> 4 - CONTRATO (Número de Contrato conforme
        cadastrado na Base de Contratos)
        <br />
        * Demais valores não obrigatórios, não serão atualizados <br />
        <br />
        Atualização do Fidelização <br /> 5 - NOVA FIDELIZAÇÃO (Número de meses
        correspondente a nova fidelização do circuito)
        <br /> 6 - INÍCIO DA NOVA FIDELIZAÇÃO (Data no formato DD/MM/YYYY de
        início da nova fidelização)
        <br />
        10 - VALOR SEM IMPOSTOS (Novo valor do link sem impostos)
        <br /> 11 - VALOR COM IMPOSTOS PONTA A (Novo valor do link com impostos
        Ponta A)
        <br /> 12 - VALOR COM IMPOSTOS PONTA B (Novo valor do link com impostos
        Ponta B)
        <br />
        * Demais valores não obrigatórios, não serão atualizados <br />
        <br />
        Atualização do Faturamento(Correção de Valores) <br /> 7 - TAXA
        INSTALAÇÃO SEM IMPOSTOS (Novo valor da taxa instalação sem impostos)
        <br /> 8 - TAXA INSTALAÇÃO COM IMPOSTOS PONTA A (Novo valor da taxa
        instalação com impostos Ponta A)
        <br /> 9 - TAXA INSTALAÇÃO COM IMPOSTOS PONTA B (Novo valor da taxa
        instalação com impostos Ponta B)
        <br />
        10 - VALOR SEM IMPOSTOS (Novo valor do link sem impostos)
        <br /> 11 - VALOR COM IMPOSTOS PONTA A (Novo valor do link com impostos
        Ponta A)
        <br /> 12 - VALOR COM IMPOSTOS PONTA B (Novo valor do link com impostos
        Ponta B)
        <br />
        17 - VALOR MODEM SEM IMPOSTO (Novo valor do modem sem impostos)
        <br />
        18 - VALOR MODEM COM IMPOSTO (Novo valor do modem com impostos)
        <br />
        23 - INDICE REAJUSTE  ( Preenchimento obrigatório caso o motivo selecionado for "Reajuste de mensalidades")<br />
        24 - PERCENTUAL REAJUSTE ( Preenchimento obrigatório caso o motivo selecionado for "Reajuste de mensalidades")<br />
        25 - MOTIVO <br />
        * Demais valores não obrigatórios, não serão atualizados <br />
        <br />
        Atualização Agrupadores <br /> 14 - AGRUPADOR A (Agrupador vinculado ao
        provedor e regional da Ponta A do circuito)
        <br /> 15 - AGRUPADOR B (Agrupador vinculado ao provedor e regional da
        Ponta B do circuito)
        <br />
        * Demais valores não obrigatórios, não serão atualizados <br />
        <br />
        Atualização Degrau <br />
        13 - DEGRAU (Degrau praticado pelo provedor para o circuito)
        <br />
        * Demais valores não obrigatórios, não serão atualizados <br />
        <br />
        Classificação da Demanda <br />
        19 - CLASSIFICAÇÃO DA DEMANDA <br />
        20 - CONTROLE LL_GUID <br />
        21 - DIVULGAÇÃO <br />
        22 - REDE NORMALIZADA <br />
        * Demais valores não obrigatórios, não serão atualizados <br />
        <br />
        O cabeçalho deve conter obrigatóriamente o conteúdo abaixo <br /> LL
        GUID;CIRCUITO_ID;PROVEDOR;CONTRATO;NOVA FIDELIZAÇÃO;INICIO
        FIDELIZACAO;TAXA INST SEM IMPOSTOS;TAXA DE INST COM IMPOSTOS A;TAXA DE
        INST COM IMPOSTOS B;VALOR SEM IMPOSTOS;VALOR COM IMPOSTOS A;VALOR COM
        IMPOSTOS B;DEGRAU;AGRUPADOR_A;AGRUPADOR_B;OBSERVAÇÃO;VALOR MODEM SEM
        IMPOSTO;VALOR MODEM COM IMPOSTO;CLASSIFICAÇÃO DEMANDA;CONTROLE LL GUID;
        DIVULGAÇÃO;REDE NORMALIZADA; INDICE REAJUSTE; PERCENTUAL REAJUSTE; MOTIVO <br />
      </p>
    </div>
  );
};
