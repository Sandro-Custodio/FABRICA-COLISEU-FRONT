import React from "react";
import { Plugin, Template } from "@devexpress/dx-react-core";
import ReactTooltip from "react-tooltip";
import { connect } from "react-redux";
import Grid from "../../common/layout/grid";
import "./components.css";

const ToolbarColumn = ({
  selection,
  ll_hist_list,
  handle_get_ll_data
}) => (
  <Plugin name="ToolbarColumn">
    <Template name="toolbarContent">
      <Grid cols="12">
        {selection.length === 1 && (
          <React.Fragment>
            <button
              data-for="top_dark_float"
              data-tip="Visualizar LL"
              type="button"
              className="btn-lg btn-link pull-left"
              data-toggle="modal"
              data-target="#visualizar_ll_secundario"
              onClick={() => handle_get_ll_data(ll_hist_list[selection[0]])}
            >
              <i
                className="fa fa-eye"
                data-toggle="tooltip"
                title="Visualizar LL"
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
      </Grid>
    </Template>
  </Plugin>
);

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(ToolbarColumn);
