import React from "react";
import { Plugin, Template } from "@devexpress/dx-react-core";
import ReactTooltip from "react-tooltip";
import { connect } from "react-redux";
import Grid from "common/layout/grid";
import { isPermited, logUserMenuAccess } from "../../../auth/actions";

const ToolbarColumn = ({
  selection,
  list,
  listarRegrasForm,
  setModalEditContent,
  user,
  bill
}) => (
  <Plugin name="ToolbarColumn">
    <Template name="toolbarContent">
      <Grid cols="12">
        <React.Fragment>
          <button
            data-for="top_dark_float"
            data-tip="Visualizar Exemplo"
            type="button"
            className="btn-lg btn-link pull-left"
            data-toggle="modal"
            data-target="#visualizar_exemplo_regra"
          >
            <i className="fa fa-question" />
          </button>
          {((bill && bill.vendor && bill.network) ||
            (listarRegrasForm &&
              listarRegrasForm.values &&
              listarRegrasForm.values.vendor &&
              listarRegrasForm.values.network)) && (
            <>
              {isPermited(user.permissions, "DR_COF1C1A1") && (
                <button
                  data-for="top_dark_float"
                  data-tip="Criar Regra de Classificação"
                  type="button"
                  className="btn-lg btn-link pull-left"
                  data-toggle="modal"
                  data-target="#criar_regra_classificacao"
                  onClick = {() => {
                    logUserMenuAccess("DR_COF1C1A1")
                  }}
                >
                  <i className="fa fa-plus" />
                </button>
              )}
              <ReactTooltip
                id="top_dark_float"
                place="top"
                type="dark"
                effect="float"
              />
            </>
          )}
          {selection.length === 1 && (
            <>
              <button
                data-for="top_dark_float"
                data-tip="Editar Regra Classificação"
                type="button"
                className="btn-lg btn-link pull-left"
                data-toggle="modal"
                data-target="#editar_regra_classificacao"
                onClick={() => setModalEditContent(list[selection[0]])}
              >
                <i className="fa fa-edit" />
                <ReactTooltip
                  id="top_dark_float"
                  place="top"
                  type="dark"
                  effect="float"
                />
              </button>
              <button
                data-for="top_dark_float"
                data-tip="Cancelar Regra Classificação"
                type="button"
                className="btn-lg btn-link pull-left"
                data-toggle="modal"
                data-target="#cancelar_regra_classificacao"
                onClick={() =>
                  window
                    .$("#cancelar_regra_classificacao")
                    .modal("handleUpdate")
                }
              >
                <i className="fa fa-times" />
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
        </React.Fragment>
      </Grid>
    </Template>
  </Plugin>
);

const mapStateToProps = state => ({
  listarRegrasForm: state.form.ListarRegras,
  user: state.auth.user
});

export default connect(mapStateToProps)(ToolbarColumn);
