import React from "react";
import { Plugin, Template } from "@devexpress/dx-react-core";
import ReactTooltip from "react-tooltip";
import { connect } from "react-redux";
import Grid from "../../common/layout/grid";

const ToolbarColumn = ({
  selection,
  list,
  get_finalities_and_element_types
}) => (
  <Plugin name="ToolbarColumn">
    <Template name="toolbarContent">
      <Grid cols="12">
        <React.Fragment>
          <button
            data-for="top_dark_float"
            data-tip="Cadastrar Finalidade"
            type="button"
            className="btn-lg btn-link pull-left"
            data-toggle="modal"
            data-target="#cadastrar_finalidade"
            onClick={() => {
              Promise.all([get_finalities_and_element_types()])
            }}
          >
            <i
              className="fa fa-plus"
              data-toggle="tooltip"
              title="Cadastrar Finalidade"
            />
          </button>

          {selection.length === 1 && (
            <button
              data-for="top_dark_float"
              data-tip="Editar Finalidade"
              type="button"
              className="btn-lg btn-link pull-left"
              data-toggle="modal"
              data-target="#editar_finalidade"
              onClick={() => {
                Promise.all([get_finalities_and_element_types()])
              }}
            >
              <i
                className="fa fa-edit"
                data-toggle="tooltip"
                title="Editar Finalidade"
              />
              <ReactTooltip
                id="top_dark_float"
                place="top"
                type="dark"
                effect="float"
              />
            </button>
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
  auth: state.auth
});

export default connect(mapStateToProps)(ToolbarColumn);
