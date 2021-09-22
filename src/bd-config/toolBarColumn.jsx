import React from "react";
import { Plugin, Template } from "@devexpress/dx-react-core";
import ReactTooltip from "react-tooltip";
import { connect } from "react-redux";
import Grid from "../common/layout/grid";

const ToolbarColumn = ({
  selection,
  list,
  get_contracts_by_vendor,
  set_bd_config
}) => (
  <Plugin name="ToolbarColumn">
    <Template name="toolbarContent">
      <Grid cols="12">
        <React.Fragment>
          <button
            data-for="top_dark_float"
            data-tip="Cadastrar de-para BD Config"
            type="button"
            className="btn-lg btn-link pull-left"
            data-toggle="modal"
            data-target="#cadastrar_bd_config_vendor"
          >
            <i
              className="fa fa-plus"
              data-toggle="tooltip"
              title="Cadastrar de-para BD Config"
            />
          </button>

          {selection.length === 1 && (
            <button
              data-for="top_dark_float"
              data-tip="Editar de-para BD Config"
              type="button"
              className="btn-lg btn-link pull-left"
              data-toggle="modal"
              data-target="#editar_bd_config_vendor"
              onClick={() => {
                set_bd_config(list[selection[0]])
              }}
            >
              <i
                className="fa fa-edit"
                data-toggle="tooltip"
                title="Editar de-para BD Config"
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
        <ReactTooltip id="upload" place="top" type="info" effect="float" />
      </Grid>
    </Template>
  </Plugin>
);

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(ToolbarColumn);
