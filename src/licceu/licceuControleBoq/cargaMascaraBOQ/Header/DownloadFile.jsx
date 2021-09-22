import React from "react";

import { IconButton } from "common";

export default ({ disabled, nomeArquivo }) => (
  <IconButton
    icon="download"
    typeTooltip="sucess"
    className="btn btn-primary"
    iconProps={{ style: { fontSize: "16px", marginRight: "5px" } }}
    disabled={disabled}
    onClick={() =>
      window.open(
        `${process.env.REACT_APP_API_URL_JAVA}/mascara-boq/download/${nomeArquivo}`
      )
    }
  >
    Baixar Arquivo
  </IconButton>
);
