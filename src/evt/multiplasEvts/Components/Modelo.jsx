import React from "react";

export default () => {
  return (
    <>
      <strong>
        O preenchimento dos campos deve seguir o modelo descrito abaixo:
      </strong>
      <ol>
        <li>Ot</li>
        <li>ID Segmento</li>
        <li>Código Evt</li>
        <li>Data Pedido</li>
        <li>Data Limite</li>
        <li>Provedor</li>
        <li>Data Proposta: DD/MM/YYYY</li>
        <li>Validade - 60(Dias)</li>
        <li>Prazo Contratação: 12(Meses)</li>
        <li>Prazo Ativação: (Dias)</li>
        <li>Custo Mensal: 1.000,00/1000,55</li>
        <li>Custo Instalação: 1.000,00/1000,55</li>
        <li>Quantidade: 2/3/10</li>
        <li>Mensalidade com impostos: 1.000,00/1000,55</li>
        <li>Instalagio com impostos: 1.000,00/1000,55</li>
        <li>PE-Mensal: Sim/Não</li>
        <li>PE-Instalação: Sim/Não</li>
        <li>Data Aprovação: DD/MM/YYYY</li>
        <li>Previsio Ativação: DD/MM/YYYY</li>
        <li>Protocolo: 1234, ABC123</li>
        <li>Degrau: LC/D1/D2 etc.</li>
        <li>Número do Protocolo</li>
        <li>Agrupador A: 12345</li>
        <li>Agrupador B: 12345</li>
        <li>Obs. Contratação</li>
      </ol>
      <strong>
        OBS: Do item 1 ao 17 são dados obrigatórios para Resposta.
      </strong>
      <strong>
        OBS: Do item 18 ao 23 são dados obrigatórios para Contratação.
      </strong>
    </>
  );
};
