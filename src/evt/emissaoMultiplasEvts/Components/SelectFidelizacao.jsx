import React from "react";
import { Select } from "common/input";

export default ({ row: { vendor_lpu } }) => {
  if (!vendor_lpu || !vendor_lpu.colecao_prazo) {
    return null;
  }

  return (
    <Select
      data={vendor_lpu.colecao_prazo}
      valueKey="num_meses"
      textKey="descricao"
    />
  );
};
