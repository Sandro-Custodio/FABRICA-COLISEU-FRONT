import React from "react";
import Grid from "common/layout/grid";
import Row from "common/layout/row";

const VisualizarExemplo = ({...others}) => {

  return (
    <div className="overlay-wrapper" width="device-width">
      <Grid style={{padding: '1vw'}}>
          <Row><span>{"1  - DESCRICAO CONTÉM CIRC."}</span></Row>
          <Row><span>{"    - Classificará as linhas de DD que possuam no campo descrição a palavra CIRC. em qualquer trecho"}</span></Row>
          <Row><span>{"2  - DESCRICAO NÃO CONTÉM CIRC."}</span></Row>
          <Row><span>{"    - Classificará as linhas de DD que não possuam no campo descrição a palavra CIRC."}</span></Row>
          <Row><span>{"3  - DESCRICAO IGUAL CIRC."}</span></Row>
          <Row><span>{"    - Classificará as linhas de DD que o campo descrição seja igual à palavra CIRC."}</span></Row>
          <Row><span>{"4  - DESCRICAO DIFERENTE CIRC."}</span></Row>
          <Row><span>{"    - Classificará as linhas de DD que o campo descrição seja diferente da palavra CIRC."}</span></Row>
          <Row><span>{"5  - CIRCUITO ESTÁ NA LISTA BSA,002"}</span></Row>
          <Row><span>{"    - Classificará as linhas de DD que o campo circuito seja igual à BSA ou 002."}</span></Row>
          <Row><span>{"6  - CIRCUITO NÃO ESTÁ NA LISTA BSA,002"}</span></Row>
          <Row><span>{"    - Classificará as linhas de DD que o campo circuito seja diferente de BSA e 002."}</span></Row>
          <Row><span>{"7  - CIRCUITO COMEÇA COM BSA"}</span></Row>
          <Row><span>{"    - Classificará as linhas de DD que no campo circuito iniciem com BSA."}</span></Row>
          <Row><span>{"8  - CIRCUITO TERMINA COM BSA"}</span></Row>
          <Row><span>{"    - Classificará as linhas de DD que no campo circuito terminem com BSA."}</span></Row>
          <Row><span>{"9  - DESCRIÇÂO CONTÉM CIRCUITO%NACIONAL. "}</span></Row>
          <Row><span>{"    - (%) Despreza quaisquer caracteres entre as palavras."}</span></Row>
      </Grid>
    </div>
  );
};

export default VisualizarExemplo;
