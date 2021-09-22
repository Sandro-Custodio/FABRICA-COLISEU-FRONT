import React from "react";

import { IconButton } from "common";

export default () => (
  <IconButton
    iconProps={{ style: { fontSize: "16px", marginRight: "5px" } }}
    icon="download"
    className="btn btn-success"
    onClick={() =>
      window.open(`${process.env.REACT_APP_API_URL}/modelo/modelo_ot_mult.xls`)
    }
  >
    Modelo de Importação
  </IconButton>
);
