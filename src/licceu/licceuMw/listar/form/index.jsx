import React from "react";
import { reduxForm } from "redux-form";

import { Tab } from "common";
import DadosLink from "./DadosLink";
import DadosEquipamento from "./DadosEquipamento";
import DadosEnlace from "./DadosEnlace";
import PlanoFrequencia from "./PlanoFrequencia";
import DadosAntenas from "./DadosAntenas";
import DadosAntenasDiversidade from "./DadosAntenasDiversidade";

const Form = ({ isVisualizar }) => {
  const list = [
    {
      title: "Dados Link",
      Comp: <DadosLink isVisualizar={isVisualizar} />
    },
    {
      title: "Dados Equipamento",
      Comp: <DadosEquipamento isVisualizar={isVisualizar} />
    },
    {
      title: "Dados de Enlace",
      Comp: <DadosEnlace isVisualizar={isVisualizar} />
    },
    {
      title: "Plano de Frequência",
      Comp: <PlanoFrequencia isVisualizar={isVisualizar} />
    },
    {
      title: "Dados das Antenas",
      Comp: <DadosAntenas isVisualizar={isVisualizar} />
    },
    {
      title: "Dados das Antenas (Diversidade)",
      Comp: <DadosAntenasDiversidade isVisualizar={isVisualizar} />
    }
  ];

  return <Tab tabList={list} />;
};

export default reduxForm({
  form: "mwEditarVisualizarForm"
})(Form);
