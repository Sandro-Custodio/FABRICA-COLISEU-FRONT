import React from "react";
import { Plugin, Template } from "@devexpress/dx-react-core";
import ReactTooltip from "react-tooltip";
import { connect } from "react-redux";
import Grid from "../common/layout/grid";

const ToolbarColumn = ({
  selection,
  list,
  set_vendor,
  get_contracts_by_vendor
}) => (
  <Plugin name="ToolbarColumn">
    <Template name="toolbarContent">
      <Grid cols="12">
        <React.Fragment>
          <button
            data-for="top_dark_float"
            data-tip="Cadastrar Provedor"
            type="button"
            className="btn-lg btn-link pull-left"
            data-toggle="modal"
            data-target="#cadastrar_provedor"
          >
            <i
              className="fa fa-plus"
              data-toggle="tooltip"
              title="Cadastrar Provedor"
            />
          </button>

          {selection.length === 1 && (
            <button
              data-for="top_dark_float"
              data-tip="Editar Provedor"
              type="button"
              className="btn-lg btn-link pull-left"
              data-toggle="modal"
              data-target="#editar_provedor"
              onClick={() => {
                set_vendor(list[selection[0]])
                get_contracts_by_vendor(list[selection[0]].id)
              }}
              // onClick={() => get_contracts_by_vendor()}
            >
              <i
                className="fa fa-edit"
                data-toggle="tooltip"
                title="Editar Provedor"
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
