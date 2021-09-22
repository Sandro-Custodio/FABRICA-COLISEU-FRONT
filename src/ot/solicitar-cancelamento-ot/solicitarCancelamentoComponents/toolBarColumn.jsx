/* eslint-disable no-var */
import React from "react";
import { Plugin, Template } from "@devexpress/dx-react-core";
import ReactTooltip from "react-tooltip";
import { connect } from "react-redux";
import Grid from "../../../common/layout/grid";
import IconButton from "./iconButton";
import Download from "./Download";
import "./components.css";
import { isPermited, logUserMenuAccess } from "../../../auth/actions";
import SolicitCancelOt from "../SolicitCancel";

const checkSelectedLinesArePermitted = (list, selection, area_id) => {
  const SolicitCancelOtClass = new SolicitCancelOt();
  let result = [];
  if (selection.length !== 0) {
    result = selection.filter(item => {
      return (
        (list[item]?.seg_area_owner_id === area_id || area_id === 5) &&
        SolicitCancelOtClass.checkSolicitCancelOt(list[item])
      );
    });
  }
  return result.length === selection.length;
};

const ToolbarColumn = ({ icons, selection, list, user }) => (
  <Plugin name="ToolbarColumn">
    <Template name="toolbarContent">
      {/* <button
        data-for="upload"
        data-tip="Anexar Arquivo"
        type="button"
        className="btn-lg btn-link fade-in filtro-btn pull-right"
        data-toggle="modal"
        data-target="#listUpload"
      >
        <i className="fa fa-paperclip" data-toggle="tooltip" title="Upload" />
      </button> */}
      <Grid cols="12">
        {selection.length > 0 && (
          <React.Fragment>
            {isPermited(user.permissions, "DR_COA1I1") &&
              checkSelectedLinesArePermitted(
                list,
                selection,
                user.area?.id
              ) && (
                <>
                  <button
                    data-for="top_dark_float"
                    data-tip="Solicitar Cancelamento OT"
                    type="button"
                    className="btn-lg btn-link pull-left"
                    data-toggle="modal"
                    data-target="#solicitar_cancelamento"
                    onClick={() => logUserMenuAccess("DR_COA1B1B1")}
                    // onClick={() => get_ot_data(list[selection[0]].code)}
                  >
                    <i
                      className="fa fa-trash"
                      data-toggle="tooltip"
                      title="Solicitar Cancelamento de OT"
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
          </React.Fragment>
        )}

        {icons.length > 0 &&
          selection.length === 0 &&
          // eslint-disable-next-line react/no-array-index-key
          icons.map((todo, index) => <IconButton {...todo} key={index} />)}
        <ReactTooltip
          id="top_dark_float"
          place="top"
          type="dark"
          effect="float"
        />
        <ReactTooltip id="upload" place="top" type="info" effect="float" />
        {list.length > 0 && <Download />}
      </Grid>
    </Template>
  </Plugin>
);

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.auth.user
});

export default connect(mapStateToProps)(ToolbarColumn);
