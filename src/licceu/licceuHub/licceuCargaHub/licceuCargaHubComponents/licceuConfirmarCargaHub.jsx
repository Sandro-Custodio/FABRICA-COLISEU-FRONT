import React from "react";
import { reduxForm } from "redux-form";
import { LicceuLabel } from "../../../licceuComponents/ui";

// eslint-disable-next-line import/no-mutable-exports
let licceuConfirmarCargaHub = ({ handleSubmit }) => {
  return (
    <main className="fade-in fade-out">
      <form className="form" onSubmit={handleSubmit}>
        <LicceuLabel text="Deseja salvar as linhas carregadas?" />
        <div>
          <button
            type="submit"
            className="btn btn-primary btn-flat"
            data-toggle="tooltip"
            title="Confirmar Carga"
          >
            OK
          </button>
          <button
            type="button"
            className="btn btn-secondary btn-flat"
            data-toggle="tooltip"
            data-dismiss="modal"
            aria-label="Close"
            title="Cancelar Carga"
          >
            Cancelar
          </button>
        </div>
      </form>
    </main>
  );
};

licceuConfirmarCargaHub = reduxForm({
  form: "licceuConfirmarCargaHub"
})(licceuConfirmarCargaHub);

export default licceuConfirmarCargaHub;
