import React from "react";
import ReactTooltip from "react-tooltip";
import Grid from "common/layout/grid";
import { isPermited, logCodeAndCallback, logUserMenuAccess } from "auth/actions";

const ToolbarColumn = ({
  selection,
  list,
  user,
  //actions
  resetForm,
  get_group_history,
}) => (
  <div>
    <>
      <button
        data-for="top_dark_float"
        data-tip="Novo Agrupador"
        type="button"
        className="btn-lg btn-link pull-left"
        data-toggle="modal"
        data-target={"#cadastrar_agrupador"}
        onClick={() => resetForm("CadastrarAgrupadores")}
      >
        <i
          className="fa fa-plus"
          data-toggle="tooltip"
        />
      </button>
      {selection?.length === 1 && isPermited(user, "DR_COF1D1B1") && (
        <>
          <button
            data-for="top_dark_float"
            data-tip="Editar Agrupador"
            type="button"
            className="btn-lg btn-link pull-left"
            data-toggle="modal"
            data-target={"#editar_agrupador"}
          >
            <i
              className="fa fa-edit"
              data-toggle="tooltip"
            />
          </button>
          <ReactTooltip
            id="top_dark_float"
            place="top"
            type="dark"
            effect="float"
          />
        </>
      )}
      {list && selection?.length === 1 && isPermited(user, "DR_COF1D1C1") && (
        <>
          <button
            data-for="top_dark_float"
            data-tip={`${list[selection]?.status?.description === "Ativo" ? "Desativar" : "Ativar"} Agrupador`}
            type="button"
            className="btn-lg btn-link pull-left"
            data-toggle="modal"
            data-target={"#desativar_agrupador"}
            // onClick={() => {
            //   logCodeAndCallback("DR_COF1D1C1", ativarDesativarAgrupador)
            // }}
          >
            <i
              className={`fa fa-${list[selection]?.status?.description === "Ativo" ? "remove" : "check"}`}
              data-toggle="tooltip"
            />
          </button>
          <ReactTooltip
            id="top_dark_float"
            place="top"
            type="dark"
            effect="float"
          />
        </>
      )}
      {list && selection?.length === 1 && (
        <>
          <button
            data-for="top_dark_float"
            data-tip="Visualizar Histórico"
            type="button"
            className="btn-lg btn-link pull-left"
            data-toggle="modal"
            data-target={"#visualizar_historico_agrupador"}
            onClick={() => Promise.all([get_group_history(list[selection]?.id)])}
          >
            <i
              className="fa fa-history"
              data-toggle="tooltip"
            />
          </button>
          <ReactTooltip
            id="top_dark_float"
            place="top"
            type="dark"
            effect="float"
          />
        </>
      )}
      <ReactTooltip
        id="top_dark_float"
        place="top"
        type="dark"
        effect="float"
      />
    </>
  </div>
);

export default ToolbarColumn;
