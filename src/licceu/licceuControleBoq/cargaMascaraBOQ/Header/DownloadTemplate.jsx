import React from "react";

import { IconButton } from "common";

export default () => (
  <IconButton
    icon="download"
    onClick={() =>
      window.open(
        `${process.env.REACT_APP_API_URL_JAVA}/mascara-boq/download-modelo`
      )
    }
    title="Modelo de Importação"
  />
);
