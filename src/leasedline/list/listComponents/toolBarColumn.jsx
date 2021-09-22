import React from "react";
import { Plugin, Template } from "@devexpress/dx-react-core";
import ReactTooltip from "react-tooltip";
import { connect } from "react-redux";
import Grid from "../../../common/layout/grid";
import { isPermited, logCodeAndCallback } from "../../../auth/actions";

const ToolbarColumn = ({
  selection,
  ll_list,
  get_leasedlines_data_view,
  get_history_lls,
  get_stop_times_by_ll,
  user,
  get_leasedlines_data,
  get_all_demand_classifications
}) => (
  <Plugin name="ToolbarColumn">
    <Template name="toolbarContent">
      <Grid cols="12">
        {selection.length === 1 && (
          <React.Fragment>
            {isPermited(user.permissions, "DR_COC1A1L1") && (
              <button
                data-for="top_dark_float"
                data-tip="Visualizar LL"
                type="button"
                className="btn-lg btn-link pull-left"
                data-toggle="modal"
                data-target="#visualizar_ll"
                onClick={() =>
                  logCodeAndCallback("DR_COC1A1L1", () => {
                    get_leasedlines_data_view(ll_list[selection[0]].id)
                  })

                }
              >
                <i
                  className="fa fa-eye"
                  data-toggle="tooltip"
                  title="Visualizar LL"
                />
              </button>
            )}
            {/* {isPermited(user.permissions, "DR_COC1A1F1") && ( */}
            { (user?.area?.id === 120 || user?.area?.id === 87 || user?.area?.id === 234) && (
              <button
                data-for="top_dark_float"
                data-tip="Visualizar Histórico LL"
                type="button"
                className="btn-lg btn-link pull-left"
                data-toggle="modal"
                data-target="#visualizar_hist_ll"
                onClick={() =>
                  // logCodeAndCallback("DR_COC1A1F1", () => {
                    get_history_lls(ll_list[selection[0]].ll_guid)
                  // })
                }
              >
                <i
                  className="fa fa-history"
                  data-toggle="tooltip"
                  title="Visualizar Histórico LL"
                />
              </button>
            )}
            {(isPermited(user.permissions, "DR_COC1A1N1") &&
              (ll_list[selection].status_id === 41 ||  //Link Solicitado ao provedor
                ll_list[selection].status_id === 42 || //Ativada
                ll_list[selection].status_id === 44 || //Solicitada Desativação
                ll_list[selection].status_id === 45 || //Em desativação
                ll_list[selection].status_id === 46    //Desativada
              )) && (
              <>
                <button
                  data-for="top_dark_float"
                  data-tip="Alterar Características do Circuito com Valores"
                  type="button"
                  className="btn-lg btn-link pull-left"
                  data-toggle="modal"
                  data-target="#alterar-caracteristicas-circuito"
                  onClick={() => {
                    Promise.all([
                      get_leasedlines_data(ll_list[selection[0]].id),
                      get_all_demand_classifications()
                    ])
                  }}
                >
                  <i className="fa fa-edit"/>
                </button>
                <ReactTooltip
                  id="top_dark_float"
                  place="top"
                  type="dark"
                  effect="float"
                />
              </>
            )}
            {ll_list[selection].status_id === 41 && (
              <>
                <button
                  data-for="top_dark_float"
                  data-tip="Ativar Circuito"
                  type="button"
                  className="btn-lg btn-link pull-left"
                  data-toggle="modal"
                  data-target="#ativar_circuito"
                  onClick={() => get_stop_times_by_ll(ll_list[selection[0]].id)}
                >
                  <i
                    className="fa fa-check"
                    data-toggle="tooltip"
                    title="Ativar Circuito"
                  />
                </button>
              </>
            )}
            <button
              data-for="top_dark_float"
              data-tip="Stop Times"
              type="button"
              className="btn-lg btn-link pull-left"
              data-toggle="modal"
              data-target="#stop-times"
              onClick={() => get_stop_times_by_ll(ll_list[selection[0]].id)}
            >
              <i
                className="fa fa-pause"
                data-toggle="tooltip"
                title="Stop Times"
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
  auth: state.auth,
  user: state.auth.user
});

export default connect(mapStateToProps)(ToolbarColumn);
