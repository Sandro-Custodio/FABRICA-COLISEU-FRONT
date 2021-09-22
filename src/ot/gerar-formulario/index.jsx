import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Overlay from "common/msg/overlay/overlay";
import ReactTooltip from "react-tooltip";
import Grid from "common/layout/grid";
import Row from "common/layout/row";
import { reduxForm, Field, change } from "redux-form";
import { DropdownListField } from "common/form/components";
import ModalFormOT from "common/layout/modal";
import get from "lodash/get";
import RemarksForm from "./remarks-form";
import {
  set_remarks_params,
  create_ot_report,
  generate_pdf_form_contract
} from "./actions";

const GerarFormulario = props => {
  const {
    token,
    gerarFormulario,
    gerarFormularioReducer: { rows, message, download_link },
    // actions
    set_remarks_params,
    create_ot_report,
    generate_pdf_form_contract
  } = props;

  const columns = [
    { name: "seg_id", title: "Segmento" },
    { name: "2", title: "Conclusão" },
    { name: "3", title: "Obs TEFE" },
    { name: "action", title: " " }
  ];
  const typeReport = [
    // SIM, NESSA ORDEM 1-3-2 MESMO
    { id: 1, label: "Aprovação de EILD (A->B)" },
    { id: 3, label: "Aprovação de EILD (A->N)" },
    { id: 2, label: "Elevação de Hierarquia" }
  ];

  const download = () => {
    console.log(download_link)
    fetch(`${process.env.REACT_APP_API_URL}/download`, {
      method: "POST",
      headers: { Authorization: token, "Content-Type": "application/json" },
      body: JSON.stringify({
        path: `${download_link}`
      })
    })
      .then(resp => {
        return resp.blob();
      })
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = download_link;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch(() => alert("Erro ao buscar arquivo para Download"));
  }

  return (
    <div className="overlay-wrapper">
      <>
        <form>
          <Grid>
            <Row>
              <Field
                label=""
                name="typeReport"
                cols="12 6"
                component={DropdownListField}
                data={typeReport}
                textField={item => item.label}
                textValue={item => item.id}
                type="text"
              />
              <Grid cols="3">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    Promise.all([
                      create_ot_report({
                        segments: rows,
                        type_rel: get(
                          gerarFormulario,
                          "values.typeReport.id",
                          ""
                        )
                      })
                    ]);
                  }}
                >
                  Gerar Relatório
                </button>
              </Grid>
              <Grid cols="3">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    Promise.all([
                      generate_pdf_form_contract({
                        segments: rows,
                        name: "DR_COA1B1BN2",
                        type_rel: get(
                          gerarFormulario,
                          "values.typeReport.id",
                          ""
                        )
                      })
                    ]);
                  }}
                >
                  Gerar Formulário
                </button>
              </Grid>
            </Row>
          </Grid>
        </form>
        <Grid>
          <Row>
            <div
              className="box box-default"
              style={{ marginLeft: "15px", marginRight: "-15px" }}
            >
              <div className="box-body" style={{ height: "180px" }}>
                <table className="table">
                  <thead>
                    <tr>
                      {columns.map((column, index) => (
                        <th key={index}>{column.title}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows &&
                      rows.map(row => (
                        <tr key={row?.seg_id}>
                          <td>{row?.seg_id}</td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-primary"
                              data-for="top_dark_float"
                              data-tip={get(
                                row,
                                "conclucao_formulario",
                                "[vazio]"
                              )}
                              data-toggle="modal"
                              data-target="#generate_form_remarks"
                              onClick={() =>
                                set_remarks_params([
                                  "conclucao_formulario",
                                  row?.conclucao_formulario || "",
                                  row?.seg_id
                                ])
                              }
                            >
                              ...
                            </button>
                          </td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-primary"
                              data-for="top_dark_float"
                              data-tip={get(row, "observacao_tef", "[vazio]")}
                              data-toggle="modal"
                              data-target="#generate_form_remarks"
                              onClick={() =>
                                set_remarks_params([
                                  "observacao_tef",
                                  row?.observacao_tef || "",
                                  row?.seg_id
                                ])
                              }
                            >
                              ...
                            </button>
                          </td>
                          <td>
                            {message && message === "done" && (
                              <i className="fa fa-check" />
                            )}
                            {download_link && (
                              <button
                                type="button"
                                onClick={() => {
                                  download()
                                }}
                              >
                                <i className="fa fa-file-pdf-o" />
                              </button>
                            )}
                            {message && message === "fault" && (
                              <>
                                <button
                                  type="button"
                                  data-for="top_dark_float"
                                  data-tip={"Erro ao gerar Formulário. Favor tentar novamente para este Segmento."}
                                >
                                  <i className="fa fa-times" />
                                </button>
                                <ReactTooltip
                                  id="top_dark_float"
                                  place="top"
                                  type="dark"
                                  effect="float"
                                />
                              </>
                            )}
                          </td>
                          <ReactTooltip
                            id="top_dark_float"
                            place="top"
                            type="dark"
                            effect="float"
                          />
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Row>
        </Grid>
      </>
      <ModalFormOT
        LabelButtonSubmit=" "
        id="generate_form_remarks"
        title="Observação"
        dimension="modal-sm"
        onClose={() => {
          set_remarks_params(["conclucao_formulario", "", ""]);
          set_remarks_params(["observacao_tef", "", ""]);
        }}
      >
        <RemarksForm />
      </ModalFormOT>
      <Overlay />
    </div>
  );
};

const GenerateForm = reduxForm({ form: "GerarFormulario" })(GerarFormulario);

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      set_remarks_params,
      create_ot_report,
      generate_pdf_form_contract
    },
    dispatch
  );

const mapStateToProps = state => {
  return {
    token: state.auth.user.access_token,
    gerarFormulario: state.form.GerarFormulario,
    gerarFormularioReducer: get(state, "gerarFormularioReducer"),
    initialValues: {
      typeReport: { id: 1, label: "Aprovação de EILD (A->B)" }
    },
    enableReinitialize: true
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GenerateForm);
