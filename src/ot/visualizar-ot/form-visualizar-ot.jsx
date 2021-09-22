import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import ContentHeader from "../../common/adminLTE/contentHeader";
import { LabelInput } from "../../common/form/components";
import Grid from "../../common/layout/grid";
import Row from "../../common/layout/row";
import If from "../../common/operator/if";
import Overlay from "../../common/msg/overlay/overlay";
import moment from "moment";

const _ = require("lodash");

const FormVisualizarOt = props => {
  const {
    visualizarOt: { virtual_attributes, attributes }
  } = props;

  console.log("@@@@@@props", props)
  // const { auth } = props;
  const qtd_links = _.get(virtual_attributes, "ot_speed.qt_sublinks")
    ? _.get(virtual_attributes, "ot_speed.qt_sublinks")
    : _.get(attributes, "qtd_links") || "[n/a]";
  return (
    <div className="overlay-wrapper">
      <ContentHeader title="Visualizar" small="Ordem de Transmissão" />
      <div className="box-body formatInputPlaceholder">
        <Row>
          <Grid cols="12 5">
            <div className="box box-default">
              <div className="box-body">
                <Row>
                  <LabelInput
                    cols="3"
                    readOnly
                    placeholder={
                      _.get(virtual_attributes, "solicitant.login") || "[n/a]"
                    }
                    label="Matrícula"
                  />

                  <LabelInput
                    cols="9"
                    readOnly
                    placeholder={
                      _.get(virtual_attributes, "solicitant.name") || "[n/a]"
                    }
                    label="Nome do Solicitante"
                  />
                </Row>
                <Row>
                  <LabelInput
                    cols="12"
                    readOnly
                    placeholder={
                      _.get(virtual_attributes, "area.name") || "[n/a]"
                    }
                    label="Área"
                  />
                </Row>
                <Row>
                  <LabelInput
                    cols="12 6"
                    readOnly
                    placeholder={
                      _.get(virtual_attributes, "operator.regional") || "[n/a]"
                    }
                    label="Regional Responsável"
                  />

                  <LabelInput
                    cols="6"
                    readOnly
                    placeholder={
                      _.get(virtual_attributes, "ot_status.name") || "[n/a]"
                    }
                    label="Status"
                  />
                </Row>
                <Row>
                  <LabelInput
                    cols="12 4"
                    readOnly
                    placeholder={
                      moment(_.get(attributes, "created_at")).format(
                        "DD/MM/YYYY"
                      ) || "[n/a]"
                    }
                    label="Cadastrada em"
                  />

                  <LabelInput
                    cols="12 4"
                    readOnly
                    placeholder={
                      moment(_.get(attributes, "updated_at")).format(
                        "DD/MM/YYYY"
                      ) || "[n/a]"
                    }
                    label="Enviada em"
                  />

                  <LabelInput
                    cols="12 4"
                    readOnly
                    placeholder={_.get(attributes, "ot_ended_at") || "[n/a]"}
                    label="Concluída em"
                  />
                </Row>
                <Row>
                  <LabelInput
                    cols="12"
                    readOnly
                    placeholder={
                      _.get(virtual_attributes, "ot_finality.name") || "[n/a]"
                    }
                    label="Finalidade"
                  />
                </Row>
                <Row>
                  <LabelInput
                    cols="12 6"
                    readOnly
                    placeholder={
                      _.get(virtual_attributes, "project.name") || "[n/a]"
                    }
                    label="Projeto"
                  />

                  <LabelInput
                    cols="12 6"
                    readOnly
                    placeholder={
                      _.get(virtual_attributes, "sub_project.name") || "[n/a]"
                    }
                    label="SubProjeto"
                  />
                </Row>
                <Row>
                  <LabelInput
                    cols="12"
                    readOnly
                    placeholder={_.get(attributes, "referencia") || "[n/a]"}
                    label="Referência"
                  />
                </Row>
                <Row>
                  <LabelInput
                    cols="12 6"
                    readOnly
                    placeholder={_.get(attributes, "period") || "[n/a]"}
                    label="Prazo"
                  />

                  <LabelInput
                    cols="12 6"
                    readOnly
                    placeholder={_.get(attributes, "duration") || "[n/a]"}
                    label="Duração"
                  />
                </Row>
                <If test={_.get(virtual_attributes, "area.code") === "CNII"}>
                  <Row>
                    <LabelInput
                      cols="8"
                      readOnly
                      placeholder={_.get(attributes, "projeto_itx") || "[n/a]"}
                      label="Projeto ITX"
                    />
                  </Row>
                </If>
                <Row>
                  <LabelInput
                    cols="12"
                    rows="5"
                    readOnly
                    placeholder={_.get(attributes, "observacao") || "[n/a]"}
                    label="Observação"
                  />
                </Row>
              </div>
            </div>
          </Grid>
          <Grid cols="12 7">
            <div className="box box-default">
              <div className="box-body">
                <div className="box-header with-border">
                  <Grid cols="12 6">
                    <h3 className="box-title">Origem</h3>
                  </Grid>
                  <Grid cols="12 6">
                    <h3 className="box-title">Destino</h3>
                  </Grid>
                </div>
                <Row>
                  <LabelInput
                    cols="12 6"
                    readOnly
                    placeholder={_.get(attributes, "rede") || "[n/a]"}
                    label="Rede"
                  />
                  <Grid offset="6" />
                  <LabelInput
                    cols="12 6"
                    readOnly
                    placeholder={
                      _.get(virtual_attributes, "element_a.operator") || "[n/a]"
                    }
                    label="Regional A"
                  />
                  <LabelInput
                    cols="12 6"
                    readOnly
                    placeholder={
                      _.get(virtual_attributes, "element_b.operator") || "[n/a]"
                    }
                    label="Regional B"
                  />
                </Row>
                <Row>
                  <LabelInput
                    cols="12 6"
                    readOnly
                    placeholder={
                      _.get(virtual_attributes, "element_a.element_type") ||
                      "[n/a]"
                    }
                    label="Tipo de Elemento A"
                  />
                  <LabelInput
                    cols="12 6"
                    readOnly
                    placeholder={
                      _.get(virtual_attributes, "element_b.element_type") ||
                      "[n/a]"
                    }
                    label="Tipo de Elemento B"
                  />
                </Row>
                <Row>
                  <LabelInput
                    cols="12 6"
                    readOnly
                    placeholder={
                      _.get(virtual_attributes, "element_a.elemento_id") ||
                      "[n/a]"
                    }
                    label="Elemento A"
                  />
                  <LabelInput
                    cols="12 6"
                    readOnly
                    placeholder={
                      _.get(virtual_attributes, "element_b.elemento_id") ||
                      "[n/a]"
                    }
                    label="Elemento B"
                  />
                </Row>
                <Row>
                  <LabelInput
                    readOnly
                    cols="12 6"
                    placeholder={
                      _.get(virtual_attributes, "element_a.endereco_id") ||
                      "[n/a]"
                    }
                    label="Endereço A"
                  />
                  <LabelInput
                    readOnly
                    cols="12 6"
                    placeholder={
                      _.get(virtual_attributes, "element_b.endereco_id") ||
                      "[n/a]"
                    }
                    label="Endereço B"
                  />
                </Row>
                <Row>
                  <Grid cols="12 6">
                    <div className="form-group">
                      <p>
                        <span className="label label-primary">
                          {_.get(virtual_attributes, "element_a.address.endereco_equipamento") ||
                            "[n/a]"}
                        </span>
                      </p>
                      <p>
                        <span className="label label-danger">
                          {_.get(virtual_attributes, "element_a.endereco_id")
                            ? `${_.get(
                                virtual_attributes,
                                "element_a.city"
                              )} - ${_.get(
                                virtual_attributes,
                                "element_a.state"
                              )}`
                            : ""}
                        </span>
                      </p>
                    </div>
                  </Grid>
                  <Grid cols="12 6">
                    <div className="form-group">
                      <p>
                        <span className="label label-primary">
                          {_.get(virtual_attributes, "element_b.address.endereco_equipamento") ||
                            "[n/a]"}
                        </span>
                      </p>
                      <p>
                        <span className="label label-danger">
                          {_.get(virtual_attributes, "element_b.endereco_id")
                            ? `${_.get(
                                virtual_attributes,
                                "element_b.city"
                              )} - ${_.get(
                                virtual_attributes,
                                "element_b.state"
                              )}`
                            : ""}
                        </span>
                      </p>
                    </div>
                  </Grid>
                </Row>
                <Row>
                  <LabelInput
                    cols="12 6"
                    readOnly
                    placeholder={
                      _.get(attributes, "element_a_interface") || "[n/a]"
                    }
                    label="Interface A"
                  />
                  <LabelInput
                    cols="12 6"
                    readOnly
                    placeholder={
                      _.get(attributes, "element_b_interface") || "[n/a]"
                    }
                    label="Interface B"
                  />
                </Row>
                <Row>
                  <LabelInput
                    cols="6"
                    readOnly
                    placeholder={_.get(attributes, "degrau") || "[n/a]"}
                    label="Degrau"
                  />
                  <LabelInput
                    cols="6"
                    readOnly
                    placeholder={_.get(attributes, "banda_final") || "[n/a]"}
                    label="Banda Final"
                  />
                </Row>
                <Row>
                  <LabelInput
                    cols="6"
                    readOnly
                    placeholder={_.get(attributes, "incremento_trx") || "[n/a]"}
                    label="Incremento de TRX"
                  />
                  <LabelInput
                    cols="6"
                    readOnly
                    placeholder={_.get(attributes, "trx_final") || "[n/a]"}
                    label="TRX Final"
                  />
                </Row>
                <Row>
                  <LabelInput
                    cols="12 6"
                    readOnly
                    placeholder={_.get(attributes, "frequencia") || "[n/a]"}
                    label="Frequência"
                  />
                </Row>
                <Row>
                  <LabelInput
                    cols="12 3"
                    readOnly
                    placeholder={qtd_links}
                    label="Quantidade de links"
                  />
                  <LabelInput
                    cols="12 3"
                    readOnly
                    placeholder={
                      _.get(virtual_attributes, "ot_speed.name") || "[n/a]"
                    }
                    label="Velocidade"
                  />
                  <LabelInput
                    cols="12 3"
                    readOnly
                    placeholder={
                      _.get(virtual_attributes, "ot_redundancy.name") || "[n/a]"
                    }
                    label="Tipo de Proteção"
                  />
                  <LabelInput
                    cols="12 3"
                    readOnly
                    placeholder="[n/a]"
                    label="Solução"
                  />
                </Row>
              </div>
            </div>
          </Grid>
        </Row>
      </div>
      <Overlay />
    </div>
  );
};

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);
const mapStateToProps = state => ({
  auth: state.auth,
  visualizarOt: state.visualizarOt
});
export default connect(mapStateToProps, mapDispatchToProps)(FormVisualizarOt);
