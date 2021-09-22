import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Grid from "common/layout/grid";
import Row from "common/layout/row";
import { reduxForm, Field } from "redux-form";
import get from "lodash/get";
import Overlay from "common/msg/overlay/overlay";
import { save_remarks } from "./actions";

const FormularioObservacao = props => {
  const {
    formularioObservacao,
    gerarFormularioReducer: { field, seg_id, rows },
    // actions
    save_remarks
  } = props;

  return (
    <div className="overlay-wrapper">
      <form onSubmit={e => e.preventDefault()}>
        <Grid>
          <Row>
            <Field name="remarks" cols="12" component="textarea" />
          </Row>
          <Row>
            <button
              type="button"
              onClick={() => {
                Promise.all([
                  save_remarks({
                    rows,
                    field,
                    text: get(formularioObservacao, "values.remarks", ""),
                    seg_id
                  })
                ]);
              }}
            >
              OK
            </button>
          </Row>
        </Grid>
      </form>
      <Overlay />
    </div>
  );
};

const RemarksForm = reduxForm({ form: "FormularioObservacao" })(
  FormularioObservacao
);

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      save_remarks
    },
    dispatch
  );

const mapStateToProps = state => {
  return {
    formularioObservacao: state.form.FormularioObservacao,
    gerarFormularioReducer: state.gerarFormularioReducer,
    initialValues: {
      remarks: get(state, "gerarFormularioReducer.remarks", ""),
      seg_id: get(state, "gerarFormularioReducer.seg_id", "")
    },
    enableReinitialize: true
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemarksForm);
