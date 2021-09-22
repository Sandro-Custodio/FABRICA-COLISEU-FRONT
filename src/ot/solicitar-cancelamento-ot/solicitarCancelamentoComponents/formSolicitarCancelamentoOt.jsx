import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "react-widgets/dist/css/react-widgets.css";
import { Grid as DxGrid, Table } from "@devexpress/dx-react-grid-bootstrap3";
import ContentHeader from "../../../common/adminLTE/contentHeader";
import Overlay from "../../../common/msg/overlay/overlay";
import Grid from "../../../common/layout/grid";
import Row from "../../../common/layout/row";
import "./styles.css";
import { solicitarCancelamento } from "../actions";
import { columns } from "./api.json";

let FormSolicitarCancelamentoOt = ({ otSelecionadas, handleSubmit }) => {
  return (
    <main className="fade-in fade-out">
      <form className="form" onSubmit={handleSubmit}>
        <div className="overlay-wrapper formSolicitarCancelamentoOt">
          <ContentHeader title="Solicitar" small="Cancelamento de OT" />
          <div className="box-body formatInputPlaceholder">
            <Row>
              <Grid cols="6 6">
                <div className="box box-default">
                  <div className="box-body">
                    <div className="box-header with-border">
                      <h3 className="box-title">Observações</h3>
                    </div>
                    <Row>
                      <Field
                        className="form-control"
                        name="remarks"
                        id="remarks"
                        component="textarea"
                        rows="5"
                      />
                    </Row>
                  </div>
                </div>
              </Grid>
              <Grid cols="6 6">
                <div className="box box-default">
                  <div className="box-body">
                    <div className="box-header with-border">
                      <h3 className="box-title">OTs</h3>
                    </div>
                    <Row>
                      <DxGrid rows={otSelecionadas || []} columns={columns}>
                        <Table />
                      </DxGrid>
                    </Row>
                  </div>
                </div>
              </Grid>
            </Row>
          </div>
          <button type="submit" className="btn btn-primary filtrar">
            <i
              id="botaoSubmit"
              className="fa fa-trash-o"
              style={{ margin: "0 10px 0 0" }}
            />
            Solicitar Cancelamento
          </button>
          <Overlay />
        </div>
      </form>
    </main>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ solicitarCancelamento }, dispatch);

FormSolicitarCancelamentoOt = reduxForm({ form: "solicitarCancelamentoForm" })(
  FormSolicitarCancelamentoOt
);

export default connect(
  null,
  mapDispatchToProps
)(FormSolicitarCancelamentoOt);
