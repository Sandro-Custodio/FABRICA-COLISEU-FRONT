import React from "react";
import { Plugin, Template } from "@devexpress/dx-react-core";
import ReactTooltip from "react-tooltip";
import { connect } from "react-redux";
import Grid from "common/layout/grid";
import { isPermited, logUserMenuAccess, logCodeAndCallback } from "../../auth/actions";

const ToolbarColumn = ({
  selection,
  list,
  user,
  get_all_bill_dd,
  get_all_classifications_by_vendor
}) => (
  <Plugin name="ToolbarColumn">
    <Template name="toolbarContent">
      <Grid cols="12">
        <React.Fragment>
          {selection && selection.length === 1 && (
            <>
              {isPermited(user.permissions, "DR_COF1B1B1") && (
                <button
                  data-for="top_dark_float"
                  data-tip="Invalidar Fatura"
                  type="button"
                  className="btn-lg btn-link pull-left"
                  data-toggle="modal"
                  data-target="#invalidar_fatura"
                  onClick={ () => {
                    logUserMenuAccess("DR_COF1B1B1")
                  }}
                >
                  <i className="fa fa-times" />
                </button>
              )}

              <button
                data-for="top_dark_float"
                data-tip="Fatura Detalhada"
                type="button"
                className="btn-lg btn-link pull-left"
                data-toggle="modal"
                data-target="#fatura_detalhada"
                onClick={() => {
                  get_all_bill_dd({
                    bill_id: list[selection[0]].id,
                    bill_classification_id:
                      list[selection[0]].bill_classification_id,
                    page_bill: 1,
                    qtd_page: 100
                  });
                }}
              >
                <i className="fa fa-file" />
              </button>
              {isPermited(user.permissions, "DR_COF1B1A1") && (
                <button
                  data-for="top_dark_float"
                  data-tip="Fatura Detalhada com Classificação"
                  type="button"
                  className="btn-lg btn-link pull-left"
                  data-toggle="modal"
                  data-target="#fatura_detalhada_classificacao"
                  onClick={() => {
                    const promise_response = get_all_classifications_by_vendor({
                      vendor_id: list[selection[0]].vendor.id,
                      network: list[selection[0]].network
                    });
                    Promise.all([promise_response]).then(() => {
                      get_all_bill_dd({
                        bill_id: list[selection[0]].id,
                        bill_classification_id:
                          list[selection[0]].bill_classification_id,
                        page_bill: 1,
                        qtd_page: 100
                      });
                    });
                    logUserMenuAccess("DR_COF1B1A1")
                  }}
                >
                  <i className="fa fa-file-text" />
                </button>
              )}
              {isPermited(user.permissions, "DR_COF1B1C1") &&
                list &&
                list[selection[0]].dd_previo && (
                  <>
                    <button
                      data-for="top_dark_float"
                      data-tip="Atualizar Delin Definitivo"
                      type="button"
                      className="btn-lg btn-link pull-left"
                      data-toggle="modal"
                      data-target="#atualizar_dd_definitivo"
                      onClick={() => {
                        console.log("bill", list[selection[0]])
                        logUserMenuAccess("DR_COF1B1C1")
                      }}
                    >
                      <i className="fa fa-edit" />
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
          )}
        </React.Fragment>
      </Grid>
    </Template>
  </Plugin>
);

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(ToolbarColumn);
