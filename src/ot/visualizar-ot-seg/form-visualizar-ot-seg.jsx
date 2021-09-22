import React from "react";
import { connect } from "react-redux";
import "react-widgets/dist/css/react-widgets.css";
import ContentHeader from "../../common/adminLTE/contentHeader";
import { LabelInput } from "../../common/form/components";
import Overlay from "../../common/msg/overlay/overlay";
import Grid from "../../common/layout/grid";
import Row from "../../common/layout/row";

const _ = require("lodash");

const FormVisualizarOtSeg = props => {
  const {
    VisualizarOtSeg: { virtual_attributes, attributes }
  } = props;

  const speed_text = `${_.get(attributes, "qtd_links") ||
    "[n/a]"} link(s) de ${_.get(virtual_attributes, "ot_speed.name") ||
    "[n/a]"}`;
  const endereco_a = `${_.get(
    virtual_attributes,
    "element_a.address.endereco_equipamento"
  ) || "[n/a]"} ${_.get(virtual_attributes, "element_a.city") ||
    "[n/a]"} - ${_.get(virtual_attributes, "element_a.state") || "[n/a]"}`;
  const endereco_b = `${_.get(
    virtual_attributes,
    "element_b.address.endereco_equipamento"
  ) || "[n/a]"} ${_.get(virtual_attributes, "element_b.city") ||
    "[n/a]"} - ${_.get(virtual_attributes, "element_b.state") || "[n/a]"}`;

  return (
    <div className="overlay-wrapper">
      <ContentHeader title="Visualizar" small="Segmento de OT" />
      <div className="box-body formatInputPlaceholder">
        <Row>
          <Grid cols="12 4">
            <div className="box box-success">
              <div className="box-body">
                <div className="box-header with-border">
                  <h3 className="box-title">Origem</h3>
                </div>
                <Row>
                  <LabelInput
                    cols="12"
                    readOnly
                    placeholder={
                      _.get(virtual_attributes, "element_a.operator") || "[n/a]"
                    }
                    label="Regional A"
                  />
                </Row>
                <Row>
                  <LabelInput
                    cols="12"
                    readOnly
                    placeholder={
                      _.get(virtual_attributes, "element_a.element_type") ||
                      "[n/a]"
                    }
                    label="Tipo Elemento"
                  />
                </Row>
                <Row>
                  <LabelInput
                    cols="12"
                    readOnly
                    placeholder={
                      _.get(virtual_attributes, "element_a.elemento_id") ||
                      "[n/a]"
                    }
                    label="Elemento ID"
                  />
                </Row>
                <Row>
                  <LabelInput
                    cols="12"
                    readOnly
                    placeholder={
                      _.get(virtual_attributes, "element_a.address.id") ||
                      "[n/a]"
                    }
                    label="Endereço"
                  />
                </Row>
                <Row>
                  <Grid cols="12">
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="text"
                        placeholder={endereco_a}
                        readOnly
                      />
                    </div>
                  </Grid>
                </Row>
                <Row>
                  <LabelInput
                    cols="12"
                    readOnly
                    placeholder={
                      _.get(attributes, "element_a_interface") || "[n/a]"
                    }
                    label="Interface"
                  />
                </Row>
              </div>
            </div>
          </Grid>
          <Grid cols="12 4">
            <div className="box box-default">
              <div className="box-body">
                <div className="box-header with-border">
                  <h3 className="box-title">Link</h3>
                </div>
                <Row>
                  <LabelInput
                    cols="12"
                    readOnly
                    placeholder={speed_text}
                    label="Velocidade"
                  />
                </Row>
                <Row>
                  <Grid cols="12">
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="text"
                        placeholder={
                          _.get(virtual_attributes, "ot_redundancy.name") ||
                          "[n/a]"
                        }
                        readOnly
                      />
                    </div>
                  </Grid>
                </Row>
                <Row>
                  <LabelInput
                    cols="12"
                    readOnly
                    placeholder={_.get(attributes, "solution") || "[n/a]"}
                    label="Atendimento"
                  />
                </Row>
                <Row>
                  <LabelInput
                    cols="12"
                    readOnly
                    placeholder={
                      _.get(virtual_attributes, "ot_type.name") || "[n/a]"
                    }
                    label="Tipo"
                  />
                </Row>
                <Row>
                  <LabelInput
                    cols="12 6"
                    readOnly
                    placeholder={_.get(attributes, "order_code") || "[n/a]"}
                    label="Documento"
                  />
                  <LabelInput
                    cols="12 6"
                    readOnly
                    placeholder={
                      _.get(attributes, "order_deadline_at") || "[n/a]"
                    }
                    label="Prazo"
                  />
                </Row>
                <Row>
                  <Grid cols="12">
                    <div className="form-group">
                      <label htmlFor="comment">
                        Observação
                        <textarea
                          className="form-control"
                          rows="5"
                          cols="54"
                          id="comment"
                          readOnly
                          value={_.get(attributes, "order_remarks") || "[n/a]"}
                        />
                      </label>
                    </div>
                  </Grid>
                </Row>
              </div>
            </div>
          </Grid>
          <Grid cols="12 4">
            <div className="box box-info">
              <div className="box-body">
                <div className="box-header with-border">
                  <h3 className="box-title">Destino</h3>
                </div>
                <Row>
                  <LabelInput
                    cols="12"
                    readOnly
                    placeholder={
                      _.get(virtual_attributes, "element_b.operator") || "[n/a]"
                    }
                    label="Regional B"
                  />
                </Row>
                <Row>
                  <LabelInput
                    cols="12"
                    readOnly
                    placeholder={
                      _.get(virtual_attributes, "element_b.element_type") ||
                      "[n/a]"
                    }
                    label="Tipo Elemento"
                  />
                </Row>
                <Row>
                  <LabelInput
                    cols="12"
                    readOnly
                    placeholder={
                      _.get(virtual_attributes, "element_b.elemento_id") ||
                      "[n/a]"
                    }
                    label="Elemento ID"
                  />
                </Row>
                <Row>
                  <LabelInput
                    cols="12"
                    readOnly
                    placeholder={
                      _.get(virtual_attributes, "element_b.address.id") ||
                      "[n/a]"
                    }
                    label="Endereço"
                  />
                </Row>
                <Row>
                  <Grid cols="12">
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="text"
                        placeholder={endereco_b}
                        readOnly
                      />
                    </div>
                  </Grid>
                </Row>
                <Row>
                  <LabelInput
                    cols="12"
                    readOnly
                    placeholder={
                      _.get(attributes, "element_b_interface") || "[n/a]"
                    }
                    label="Interface"
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

const mapStateToProps = state => ({ VisualizarOtSeg: state.visualizarOtSeg });
export default connect(mapStateToProps)(FormVisualizarOtSeg);
