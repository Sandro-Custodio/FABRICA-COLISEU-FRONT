import React from "react";
import ReactTooltip from "react-tooltip";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import Overlay from "common/msg/overlay/overlay";
import Grid from "common/layout/grid";
import Row from "common/layout/row";
import { Grid as DxGrid } from "@devexpress/dx-react-grid-bootstrap3";
import Table from "common/table";
import { toastr } from "react-redux-toastr";

import {
  remove_status
} from "../actions";

const Root = props => <DxGrid.Root {...props} style={{ height: '32vw' }} />;

const VisualizarHistorico = props => {

  const {
    auth,
    visualizarHistoricoForm,
    agrupadoresReducer: {
      historico_columns,
      historico_column_width,
      historico_list
    },
    reloadParent,
    //actions
    remove_status,
  } = props;

  const Cell = props => {
    return (
      <>
        <button
          data-for="top_dark_float"
          data-tip="Cancelar status no período"
          type="button"
          className="btn-lg btn-danger pull-left"
          onClick={() =>{
              console.log(props)
              toastr.confirm("Esta ação irá remover o status nesse período, deseja continuar?", {
                onOk: () => {
                  Promise.all([remove_status({
                    id: props?.row?.id,
                    group_id: props?.row?.bill_group_id
                  })]).finally($ => reloadParent())
                },
                onCancel: () => {}
              })
          }}
        >
          <i
            className="fa fa-times"
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
    )
  }

  return (
    <div className="overlay-wrapper">
      <form>
        <div className="body">
          <Grid cols="12">
            <Table
              columns={historico_columns}
              columnWidths={historico_column_width}
              rows={historico_list}
              selectByRowClick={false}
              disablePagination={true}
              rootComponent={Root}
              actions={[
                {
                  columnName: "tableAction",
                  component: Cell
                }
              ]}
            />
          </Grid>
        </div>
      </form>
      <Overlay/>
    </div>
  );
};

VisualizarHistorico.defaultProps = {
  reloadParent: () => {}
}

const Form = reduxForm({ form: "VisualizarHistorico" })(VisualizarHistorico);

const mapDispatchToProps = dispatch => bindActionCreators({
  remove_status,
}, dispatch);

const mapStateToProps = (state, props) => {
  return {
    auth: state.auth,
    visualizarHistoricoForm: state.form.VisualizarHistorico,
    agrupadoresReducer: state.agrupadoresReducer,
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);
