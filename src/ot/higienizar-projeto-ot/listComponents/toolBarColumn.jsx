import React from "react";
import { Plugin, Template } from "@devexpress/dx-react-core";
import ReactTooltip from "react-tooltip";
import { connect } from "react-redux";
import Grid from "../../../common/layout/grid";

const ToolbarColumn = ({
  selection
  // loadFieldsOtForm
}) => (
  <Plugin name="ToolbarColumn">
    <Template name="toolbarContent">
      <Grid cols="12">
        {selection.length > 0 && (
          <React.Fragment>
            <button
              data-for="top_dark_float"
              data-tip="Editar Projeto"
              type="button"
              className="btn-lg btn-link pull-left"
              data-toggle="modal"
              data-target="#editar_projeto_ot"
            >
              <i
                className="fa fa-edit"
                data-toggle="tooltip"
                title="Editar Projeto"
              />
            </button>
            <ReactTooltip
              id="top_dark_float"
              place="top"
              type="dark"
              effect="float"
            />
          </React.Fragment>
        )}

        {/* {icons.length > 0 &&
          selection.length === 0 &&
          icons.map((todo, index) => <IconButton {...todo} key={index} />)} */}
        <ReactTooltip id="upload" place="top" type="info" effect="float" />
        {/* {ll_list.length > 0 && <Download />} */}
      </Grid>
    </Template>
  </Plugin>
);

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(ToolbarColumn);
