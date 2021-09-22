import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { LabelInput } from "../../common/form/components";
import Grid from "../../common/layout/grid";
import Row from "../../common/layout/row";
import { DebounceInput } from "react-debounce-input";
import Overlay from "../../common/msg/overlay/overlay";
import "./styles.css";
import moment from "moment";

const _ = require("lodash");

const FormVisualizarLl = props => {
  const {
    visualizarLl: { resp }
  } = props;

  // const garantia_receita = (_.get(resp, "ll.garantia_receita") || '[n/a]') ;

  return (
    <div className="overlay-wrapper">
      {/* <ContentHeader title="Visualizar" small="Leasedline" /> */}
      <Row>
        <div className="box box-success">
          <div className="box-body">
            <Row>
              <LabelInput
                cols="3"
                readOnly
                placeholder={_.get(resp, "ot.code") || "[n/a]"}
                label="Código OT"
              />
              <LabelInput
                cols="3"
                readOnly
                placeholder={_.get(resp, "vendor.name") || "[n/a]"}
                label="Provedor"
              />
              <LabelInput
                cols="3"
                readOnly
                placeholder={_.get(resp, "status.description") || "[n/a]"}
                label="Status"
              />
              <LabelInput
                cols="3"
                readOnly
                placeholder={_.get(resp, "ll.status_snoa") || "[n/a]"}
                label="Status Snoa"
              />
            </Row>
            <Row>
              <LabelInput
                cols="3"
                readOnly
                placeholder={_.get(resp, "element_a.elemento_id") || "[n/a]"}
                label="Ponta A"
              />
              <LabelInput
                cols="3"
                readOnly
                placeholder={_.get(resp, "element_b.elemento_id") || "[n/a]"}
                label="Ponta B"
              />
              <LabelInput
                cols="3"
                readOnly
                placeholder={_.get(resp, "ll.bilhete_snoa") || "[n/a]"}
                label="Bilhete Snoa"
              />
              <LabelInput
                cols="3"
                readOnly
                placeholder={_.get(resp, "evt.request_protocol") || "[n/a]"}
                label="EVT"
              />
            </Row>
            <Row>
              <LabelInput
                cols="3"
                readOnly
                placeholder={_.get(resp, "contrato.contrato") || "[n/a]"}
                label="Contrato"
              />
              <LabelInput
                cols="3"
                readOnly
                placeholder={_.get(resp, "speed.name") || "[n/a]"}
                label="Velocidade"
              />
              <LabelInput
                cols="3"
                readOnly
                placeholder={_.get(resp, "agrupador_a.name") || "[n/a]"}
                label="Agrupador A"
              />
              <LabelInput
                cols="3"
                readOnly
                placeholder={_.get(resp, "agrupador_b.name") || "[n/a]"}
                label="Agrupador B"
              />
            </Row>
            <Row>
              <LabelInput
                cols="3"
                readOnly
                placeholder={_.get(resp, "ll.vigencia") || "[n/a]"}
                label="Vigência"
              />
              <LabelInput
                cols="3"
                readOnly
                placeholder={_.get(resp, "ll.degrau") || "[n/a]"}
                label="Degrau"
              />
              <LabelInput
                cols="3"
                readOnly
                placeholder={_.get(resp, "ll.circuito_id") || "[n/a]"}
                label="Circuito"
              />
              <LabelInput
                cols="3"
                readOnly
                placeholder={_.get(resp, "ll.id_circuit_bill") || "[n/a]"}
                label="Id Circuito Fatura"
              />
            </Row>
            <Row>
              <LabelInput
                cols="3"
                readOnly
                placeholder={_.get(resp, "ll.did_tx_a") || "[n/a]"}
                label="DID TX A"
              />
              <LabelInput
                cols="3"
                readOnly
                placeholder={_.get(resp, "ll.did_tx_b") || "[n/a]"}
                label="DID TX B"
              />
              <LabelInput
                cols="3"
                readOnly
                placeholder={
                  _.get(resp, "ll.data_solicitacao") ?
                  moment(_.get(resp, "ll.data_solicitacao")).format(
                    "DD/MM/YYYY"
                  ) : "[n/a]"
                }
                label="Data de Contratação"
              />
              <LabelInput
                cols="3"
                readOnly
                placeholder={
                  _.get(resp, "ll.contract_begin_at") ?
                  moment(_.get(resp, "ll.contract_begin_at")).format(
                    "DD/MM/YYYY"
                  ) : "[n/a]"
                }
                label="Inicio de Vigência de Contrato"
              />
            </Row>
            <Row>
              <LabelInput
                cols="3"
                readOnly
                placeholder={
                  _.get(resp, "ll.data_prev_ativacao") ?
                  moment(_.get(resp, "ll.data_prev_ativacao")).format(
                    "DD/MM/YYYY"
                  ) : "[n/a]"
                }
                label="Prev. de Ativação"
              />
              <LabelInput
                cols="3"
                readOnly
                placeholder={
                  _.get(resp, "ll.contract_end_at") ?
                  moment(_.get(resp, "ll.contract_end_at")).format(
                    "DD/MM/YYYY"
                  ) : "[n/a]"
                }
                label="Término de vigência de contrato"
              />
              <LabelInput
                cols="6"
                rows="2"
                readOnly
                placeholder={_.get(resp, "ll.remarks") || "[n/a]"}
                label="Observação"
              />
            </Row>
            <Row>
              <Grid cols="6">
                <div className="box box-success bg-secondary box_valores_ll">
                  <div className="box-body">
                    <Row>
                      <Grid cols="2">
                        <label>PE</label>
                      </Grid>
                      <Grid cols="3">
                        <label>Sem Impostos</label>
                      </Grid>
                      <Grid cols="3">
                        <label>Com Impostos A</label>
                      </Grid>
                      <Grid cols="3">
                        <label>Com Impostos B</label>
                      </Grid>
                    </Row>
                    <Row>
                      <Grid cols="2">
                        <label>Mensal</label>
                      </Grid>
                      <Grid cols="3">
                        <div className="form-group">
                          <DebounceInput
                            className="form-control"
                            debounceTimeout={800}
                            readOnly
                            placeholder={
                              _.get(resp, "ll.val_link_s_imp") || "[n/a]"
                            }
                          />
                        </div>
                      </Grid>
                      <Grid cols="3">
                        <div className="form-group">
                          <DebounceInput
                            className="form-control"
                            debounceTimeout={800}
                            readOnly
                            placeholder={
                              _.get(resp, "ll.val_link_c_imp_a") || "[n/a]"
                            }
                          />
                        </div>
                      </Grid>
                      <Grid cols="3">
                        <div className="form-group">
                          <DebounceInput
                            className="form-control"
                            debounceTimeout={800}
                            readOnly
                            placeholder={
                              _.get(resp, "ll.val_link_c_imp_b") || "[n/a]"
                            }
                          />
                        </div>
                      </Grid>
                    </Row>
                    <Row>
                      <Grid cols="2">
                        <label>Instalação</label>
                      </Grid>
                      <Grid cols="3">
                        <div className="form-group">
                          <DebounceInput
                            className="form-control"
                            debounceTimeout={800}
                            readOnly
                            placeholder={
                              _.get(resp, "ll.taxa_ins_s_imp") || "[n/a]"
                            }
                          />
                        </div>
                      </Grid>
                      <Grid cols="3">
                        <div className="form-group">
                          <DebounceInput
                            className="form-control"
                            debounceTimeout={800}
                            readOnly
                            placeholder={
                              _.get(resp, "ll.taxa_ins_c_imp_a") || "[n/a]"
                            }
                          />
                        </div>
                      </Grid>
                      <Grid cols="3">
                        <div className="form-group">
                          <DebounceInput
                            className="form-control"
                            debounceTimeout={800}
                            readOnly
                            placeholder={
                              _.get(resp, "ll.taxa_ins_c_imp_b") || "[n/a]"
                            }
                          />
                        </div>
                      </Grid>
                    </Row>
                    <Row>
                      <Grid cols="2">
                        <label>Modem</label>
                      </Grid>
                      <Grid cols="3">
                        <div className="form-group">
                          <DebounceInput
                            className="form-control"
                            debounceTimeout={800}
                            readOnly
                            placeholder={
                              _.get(resp, "ll.valor_modem_s_imp") || "[n/a]"
                            }
                          />
                        </div>
                      </Grid>
                      <Grid cols="3">
                        <div className="form-group">
                          <DebounceInput
                            className="form-control"
                            debounceTimeout={800}
                            readOnly
                            placeholder={
                              _.get(resp, "ll.valor_modem_s_imp") || "[n/a]"
                            }
                          />
                        </div>
                      </Grid>
                      <Grid cols="3"></Grid>
                    </Row>
                  </div>
                </div>
              </Grid>
              <Grid cols="6">
                <Row>
                  <LabelInput
                    cols="6"
                    readOnly
                    placeholder={_.get(resp, "ll.moeda") || "[n/a]"}
                    label="Moeda"
                  />
                  <LabelInput
                    cols="6"
                    readOnly
                    placeholder={_.get(resp, "ll.cambio") || "[n/a]"}
                    label="Câmbio"
                  />
                </Row>
                <Row>
                  <LabelInput
                    cols="6"
                    readOnly
                    placeholder={_.get(resp, "ot.rede") || "[n/a]"}
                    label="Rede"
                  />
                  <LabelInput
                    cols="6"
                    readOnly
                    placeholder={_.get(resp, "ll.gl") || "[n/a]"}
                    label="GL"
                  />
                </Row>
              </Grid>
            </Row>
            <Row>
              <LabelInput
                cols="3"
                readOnly
                placeholder={_.get(resp, "ll.data_rev_ativacao") || "[n/a]"}
                label="Previsão Revisada"
              />
              <LabelInput
                cols="3"
                readOnly
                placeholder={
                  (_.get(resp, "ll.vendor_request_date") &&
                    moment(_.get(resp, "ll.vendor_request_date")).format(
                      "DD/MM/YYYY"
                    )) ||
                  "[n/a]"
                }
                label="Data de Agendamento"
              />
              <LabelInput
                cols="3"
                readOnly
                placeholder={
                  (_.get(resp, "ll.data_ativacao") &&
                    moment(_.get(resp, "ll.data_ativacao")).format(
                      "DD/MM/YYYY"
                    )) ||
                  "[n/a]"
                }
                label="Ativada em:"
              />
              <LabelInput
                cols="3"
                readOnly
                placeholder={
                  _.get(resp, "ll.data_aceite") ?
                  moment(_.get(resp, "ll.data_aceite")).format("DD/MM/YYYY")
                  : "[n/a]"
                }
                label="Data de Aceite"
              />
            </Row>
            <Row>
              <LabelInput
                cols="3"
                readOnly
                placeholder={
                  (_.get(resp, "ll.cancel_end_at") &&
                    moment(_.get(resp, "ll.cancel_end_at")).format(
                      "DD/MM/YYYY"
                    )) ||
                  "[n/a]"
                }
                label="Data de Desativação"
              />
              <LabelInput
                cols="3"
                readOnly
                placeholder={
                  (_.get(resp, "ll.vendor_date") &&
                    moment(_.get(resp, "ll.vendor_date")).format(
                      "DD/MM/YYYY"
                    )) ||
                  "[n/a]"
                }
                label="Data de Entrega"
              />
              <LabelInput
                cols="3"
                readOnly
                placeholder={_.get(resp, "ot.rota_numero") || "[n/a]"}
                label="Rota Número"
              />
            </Row>
            <Row>
              <LabelInput
                cols="3"
                readOnly
                placeholder={_.get(resp, "ll.segmento_mercado") || "[n/a]"}
                label="Segmento de Mercado"
              />
              <LabelInput
                cols="3"
                readOnly
                placeholder={_.get(resp, "ll.os_id") || "[n/a]"}
                label="OS ID"
              />
              <LabelInput
                cols="3"
                readOnly
                placeholder={_.get(resp, "ll.lpu_guid") || "[n/a]"}
                label="LPU GUID"
              />
              <LabelInput
                cols="3"
                readOnly
                placeholder={_.get(resp, "ll.tipo_reajuste") || "[n/a]"}
                label="Tipo Reajuste"
              />
            </Row>
            <Row>
              <LabelInput
                cols="3"
                readOnly
                placeholder={_.get(resp, "ll.garantia_receita") || "[n/a]"}
                label="Garantia Receita"
              />
              <LabelInput
                cols="3"
                readOnly
                placeholder={_.get(resp, "ll.meio_acesso") || "[n/a]"}
                label="Meio de Acesso"
              />
              <LabelInput
                cols="3"
                readOnly
                placeholder={_.get(resp, "classificacao_demanda.description") || "[n/a]"}
                label="Classificação Demanda"
              />
              <LabelInput
                cols="3"
                readOnly
                placeholder={_.get(resp, "ll.controle_ll_guid") || "[n/a]"}
                label="Controle LL GUID"
              />
            </Row>
            <Row>
              <LabelInput
                cols="3"
                readOnly
                placeholder={_.get(resp, "ll.divulgacao") || "[n/a]"}
                label="Divulgação"
              />
              <LabelInput
                cols="3"
                readOnly
                placeholder={_.get(resp, "ll.rede_normalizada") || "[n/a]"}
                label="Rede Normalizada"
              />
              <LabelInput
                cols="3"
                readOnly
                placeholder={_.get(resp, "ll.trail_id") || "[n/a]"}
                label="Trail ID"
              />
              <LabelInput
                cols="3"
                readOnly
                placeholder={_.get(resp, "ll.oc") || "[n/a]"}
                label="OC"
              />
            </Row>
          </div>
        </div>
      </Row>
      <Overlay />
    </div>
  );
};

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);
const mapStateToProps = state => ({
  auth: state.auth,
  visualizarLl: state.visualizarLl
});
export default connect(mapStateToProps, mapDispatchToProps)(FormVisualizarLl);
