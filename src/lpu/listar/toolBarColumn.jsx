import React from "react";
import { Plugin, Template } from "@devexpress/dx-react-core";
import ReactTooltip from "react-tooltip";
import Grid from "../../common/layout/grid";

const ToolbarColumn = ({
  selection,
  setSelection,
}) => (
  <Plugin name="ToolbarColumn">
    <Template name="toolbarContent">
      <Grid cols="12">
        <React.Fragment>
            <>
              {selection?.length > 0 && (
                <>
                  <button
                    data-for="top_dark_float"
                    data-tip="Limpar Seleção"
                    type="button"
                    className="btn-lg btn-link pull-left"
                    onClick={() => setSelection([])}
                  >
                    <i
                      className="fa fa-square-o"
                      data-toggle="tooltip"
                    />
                  </button>
                  <button
                    data-for="top_dark_float"
                    data-tip="Excluir Item de LPU"
                    type="button"
                    className="btn-lg btn-link pull-left"
                    data-toggle="modal"
                    data-target={"#deletar_item_lpu"}
                  >
                    <i
                      className="fa fa-trash-o"
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
              {selection?.length === 1 && (
                <>
                  <button
                    data-for="top_dark_float"
                    data-tip="Cadastrar Item de LPU"
                    type="button"
                    className="btn-lg btn-link pull-left"
                    data-toggle="modal"
                    data-target={"#cadastrar_item_lpu"}
                  >
                    <i
                      className="fa fa-plus"
                      data-toggle="tooltip"
                    />
                  </button>
                  <button
                    data-for="top_dark_float"
                    data-tip="Editar Item de LPU"
                    type="button"
                    className="btn-lg btn-link pull-left"
                    data-toggle="modal"
                    data-target={"#editar_item_lpu"}
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
            </>
        </React.Fragment>
      </Grid>
    </Template>
  </Plugin>
);

export default ToolbarColumn;
