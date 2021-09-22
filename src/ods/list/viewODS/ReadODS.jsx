import React from "react";
import get from "lodash/get";
import Row from "common/layout/row";
import { LabelInput, TextareaField } from "common/form/components";
import Section from "./Section";

export default ({ describe }) => {
  
  const formatDate = (date) => new Date(date).toLocaleDateString("pt-BR", { timeZone: "UTC" })

  const LabelInputOds = ({ name, label, cols, area }) => {
    if (area) {
      return (
        <TextareaField
          style={{ height: 103 }}
          value={get(describe, name) || "[n/a]"}
          label={label}
          className="form-control"
          readOnly
        />
      );
    }
    return (
      <LabelInput
        cols={cols && "6"}
        value={name == "created_at" ? formatDate(get(describe, name)) : get(describe, name) || "[n/a]"}
        label={label}
        readOnly
      />
    );
  };

  return (
    <Row>
      <Section col="3 3" row>
        <LabelInputOds name="od_user_name" label="Solicitante" />
        <LabelInputOds name="od_area_name" label="Área" />
        <LabelInputOds name="created_at" label="Data Abertura" />
      </Section>
      <Section col="3 3" row>
        <LabelInputOds name="rede" label="Rede" />
        <LabelInputOds name="od_status" label="Status" />
        <LabelInputOds name="projeto" label="Projeto" />
      </Section>
      <Section col="6 6" row>
        <LabelInputOds cols name="segmento_mercado" label="Tipo de Mercado" />
        <LabelInputOds cols name="study_origin" label="Fonte de Estudo" />
        <LabelInputOds area name="remarks" label="Observação" />
      </Section>
    </Row>
  );
};
