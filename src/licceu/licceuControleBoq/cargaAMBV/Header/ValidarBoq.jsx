import React from "react";
import { toastr } from "react-redux-toastr";
import axios from "axios";

import { IconButton } from "common";

const ValidarBoq = () => {
  const validarBoq = async () => {
    try {
      toastr.info("Informação", "Validando Boq...", {
        timeOut: 0
      });
      const baseURL = `${process.env.REACT_APP_API_URL_JAVA}/mascara-boq`;
      await axios.post(`${baseURL}/validar-boq`);
      toastr.success("Sucesso", "Boqs validadas com sucesso");
    } catch (error) {
      toastr.error("Erro", "Não foi validar as Boqs");
    } finally {
      toastr.removeByType("info");
    }
  };

  return (
    <IconButton
      icon="upload"
      typeTooltip="success"
      className="btn btn-info"
      iconProps={{ style: { fontSize: "16px", marginRight: "5px" } }}
      onClick={() => validarBoq()}
    >
      Validar Boq
    </IconButton>
  );
};

export default ValidarBoq;
