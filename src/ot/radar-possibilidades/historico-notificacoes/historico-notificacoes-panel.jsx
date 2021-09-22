import React from "react";
import { bindActionCreators } from "redux";
import { connect, useDispatch } from "react-redux";
import { reduxForm, Field, formValueSelector } from "redux-form";
import { Table } from "common";
// import ContentHeader from "../../../common/adminLTE/contentHeader";
import {
  DateTimePickerField,
  LabelInput
} from "../../../common/form/components";
import Grid from "../../../common/layout/grid";
import Row from "../../../common/layout/row";
import Overlay from "../../../common/msg/overlay/overlay";
import ModalFormOT from "../../../common/layout/modal";
import { download } from "../actions";
import FormAnexar from "../anexar-arquivo/anexarArquivo";

const _ = require("lodash");

const actions = auth => {
  const DownloadButtonComp = props => {
    return (
      <div>
        {props.row.attach_type === "NOTIFICATION" && (
          <button
            className="btn btn-link pull-left"
            type="button"
            onClick={() =>
              download(
                "pms/notifications/",
                props.row.repository_name,
                auth.user.access_token
              )
            }
          >
            <i
              className="fa fa-file-pdf-o"
              data-toggle="tooltip"
              title={props.row.attach_type}
            />
          </button>
        )}
        {props.row.attach_type !== "NOTIFICATION" && (
          <button
            className="btn btn-link pull-left"
            type="button"
            onClick={() => {
              download(
                "pms/evidencias/",
                props.row.repository_name,
                auth.user.access_token
              );
            }}
          >
            <i
              className="fa fa-envelope-o"
              data-toggle="tooltip"
              title={props.row.attach_type}
            />
          </button>
        )}
      </div>
    );
  };
  return [{ columnName: "buttons", component: DownloadButtonComp }];
};

const HistoricoNotificacoesPanel = props => {
  const {
    radarPossibilidades: {
      attach_columns,
      attach_list
      // attach_columns_widths,
      // evt
    },
    formulario
  } = props;

  const dispatch = useDispatch();

  return (
    <div className="overlay-wrapper">
      <div className="box-body formatInputPlaceholder">
        <Row>
          <div className="box-body">
            <Grid cols="4">
              {/* <DateTimePickerField
                label="Data do Protocolo"
                cols="12"
                value={data_protocolo}
                onChange={value => }
                time={false}
              /> */}
              <Field
                name="protocol_date"
                label="Data do Protocolo"
                component={DateTimePickerField}
                cols="12"
                time={false}
                placeholder="Protocolo"
              />
            </Grid>
            <Grid cols="4">
              <Grid cols="12 3">
                <h4>Legendas</h4>
              </Grid>
              <Grid cols="12 3">
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() =>
                    download(
                      "pms/documentspdf/",
                      "Notificacao.pdf",
                      props.auth.user.access_token
                    )
                  }
                >
                  Notificação
                </button>
              </Grid>
              <Grid cols="12 3">
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() =>
                    download(
                      "pms/documentspdf/",
                      "Evidencia.pdf",
                      props.auth.user.access_token
                    )
                  }
                >
                  Evidência
                </button>
              </Grid>
              <Grid cols="12 3">
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() =>
                    download(
                      "pms/documentspdf/",
                      "Fuxo.pdf",
                      props.auth.user.access_token
                    )
                  }
                >
                  Fluxo
                </button>
              </Grid>
            </Grid>
            {!!formulario.protocol_date && (
              <Grid cols="4">
                <Grid cols="12 3">
                  <label>Anexos</label>
                  <button
                    type="button"
                    className="btn-lg btn-link"
                    data-toggle="modal"
                    data-target="#form_anexar"
                    onClick={() => {
                      dispatch({ type: "RESET_ROWS" });
                    }}
                  >
                    <i className="fa fa-paperclip" />
                  </button>
                </Grid>
                <Field
                  component={LabelInput}
                  cols="12 9"
                  name="description"
                  label="Descrição"
                />
              </Grid>
            )}
          </div>
        </Row>
        <Row>
          <div className="box-body">
            <Table
              columns={attach_columns}
              rows={attach_list}
              actions={actions(props.auth)}
              disablePagination
            // columnWidths={attach_columns_widths}
            />
          </div>
        </Row>
      </div>
      <Overlay />
      <ModalFormOT
        LabelButtonSubmit="Anexo"
        id="form_anexar"
        title="Anexo"
        dimension="modal-lg"
      >
        <FormAnexar />
      </ModalFormOT>
    </div>
  );
};

const Form = reduxForm({ form: "HistoricoNotificacoesPanel" })(
  HistoricoNotificacoesPanel
);
const seletor = formValueSelector("HistoricoNotificacoesPanel");
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);
const mapStateToProps = state => ({
  auth: state.auth,
  radarPossibilidades: state.radarPossibilidades,
  protocol_date: seletor(state, "protocol_date"),
  description: seletor(state, "description"),
  formulario: _.get(state, "form.HistoricoNotificacoesPanel.values", {})
});
export default connect(mapStateToProps, mapDispatchToProps)(Form);
