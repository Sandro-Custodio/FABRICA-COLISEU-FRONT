import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { DebounceInput } from "react-debounce-input";
import get from "lodash/get";
import { Table, IconButton } from "common";
import moment from "moment";
import { LabelInput } from "../../common/form/components";
import Grid from "../../common/layout/grid";
import Row from "../../common/layout/row";
import Overlay from "../../common/msg/overlay/overlay";
import HistoricoNotificacoes from "../radar-possibilidades/historico-notificacoes/historico-notificacoes-panel";
import ModalFormOT from "../../common/layout/modal";
import VisualizarEvtPanel from "../radar-possibilidades/visualizar-evt/visualizar-evt-panel";

import {
  get_tracking_attachs,
  setEvt,
  setSendRequest,
  sendEmailSaveEvt,
  sendRequestOff,
  show_loader,
  hide_loader,
  get_all_by_ot_segmentation_id,
  get_ot_data_radar
} from "../radar-possibilidades/actions";
import { columnsWidths } from "../radar-possibilidades/columns.json";
import "../radar-possibilidades/styles.css";

const _ = require("lodash");

const Actions = props => {
  const { get_tracking_attachs, setEvt } = props;

  const NotificacoesComp = props => {
    const { row } = props;

    return (
      <div>
        <button
          className="btn btn-link pull-left inner-table-btn"
          type="button"
          data-toggle="modal"
          data-target="#visualizar_evt"
          onClick={() => {
            setEvt(row);
          }}
        >
          <i
            className="fa fa-eye"
            data-toggle="tooltip"
            title="Visualizar EVT"
          />
        </button>
        <button
          className="btn btn-link pull-left inner-table-btn"
          type="button"
          data-toggle="modal"
          data-target="#historico_notificacoes"
          onClick={() => {
            get_tracking_attachs(row.id);
            setEvt(row);
          }}
        >
          <i
            className="fa fa-list-alt"
            data-toggle="tooltip"
            title="Histórico de Notificações"
          />
        </button>
      </div>
    );
  };
  return [{ columnName: "buttons", component: NotificacoesComp }];
};

const FormRadarPossibilidades = props => {
  const {
    radarPossibilidades: {
      response,
      columns,
      evt_list,
      columns_widths,
      formEvtAfterAction
    },
    get_tracking_attachs,
    setEvt,
    list,
    selection,
    setSendRequest,
    sendRequest,
    sendRequestOff,
    sizePedido,
    evtList,
    ot_speed,
    evtForm,
    evtContacs,
    pedidoCotacaoEmissao,
    get_all_by_ot_segmentation_id,
    get_ot_data_radar,
    auth: { user }
  } = props;

  const [proposta, setProposta] = React.useState({});
  const [contrato, setContrato] = React.useState({});
  const [evtEscolhida, setEvtescolhida] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [selectedEmail, setSelectedEmail] = React.useState([]);
  // Values  EVT SendEmail
  const selectRowOt = get(
    selection.map(item => list[item]),
    "[0]",
    {}
  );
  const header = `Prezado Consultor \r\rSolicitamos Estudo de Viabilidade Técnica para provimento de EILD para rota abaixo. Pedimos retorno em no máximo ${formEvtAfterAction.contract_time} dias da emissão deste e-mail, juntamente com a confirmação de disponibilidade / prazo de atendimento e condições comerciais.`;
  const {
    contact_number,
    address,
    fax_number,
    city,
    name,
    email,
    login
  } = user;
  // console.log("selectRowOt", selectRowOt);

  const { id, code, ot_status, seg_id } = selectRowOt;
  const contacPed = selectedEmail.map(item => evtContacs[item]);
  const pont_a = params => get(response, `ot_element_a.${params}`, "");
  const pont_b = params => get(response, `ot_element_b.${params}`, "");
  /* const evtCode = `${code}-${evtList.length + 1}`; */

  const memoizedActions = React.useCallback(Actions, [selectRowOt]);

  const reloadParent = async () => {
    await get_ot_data_radar(seg_id);
    await get_all_by_ot_segmentation_id(seg_id);
  };

  const doSendEmail = () => {
    const sendEmail = {
      evt: {
        ...formEvtAfterAction,
        ot_id: id,

        status_id: 1, // id 1 === "Aguardando Proposta"
        ot_segmentation_id: seg_id,
        delivered_at: new Date().toJSON(),
        user_id_open: login,
        quantity: get(pedidoCotacaoEmissao, "qt_sublinks", "1")
      },
      header,
      user: {
        id: user.id,
        contact_number,
        address,
        fax_number,
        city,
        name,
        email
      },
      caract: {
        speed: ot_speed.name,
        ot_code: code,
        prazo: get(formEvtAfterAction, "contract_time", ""),
        qtd: get(pedidoCotacaoEmissao, "qt_sublinks", "1")
      },
      ponta_a: {
        elemento: pont_a("elemento_id"),
        endereco: pont_a("address"),
        bairro: pont_a("bairro"),
        city: pont_a("city"),
        uf: pont_a("state"),
        lat: pont_a("latitude"),
        long: pont_a("longitude"),
        interface_a: pont_a("interface_a")
      },
      ponta_b: {
        elemento: pont_b("elemento_id"),
        endereco: pont_b("address"),
        bairro: pont_b("bairro"),
        city: pont_b("city"),
        uf: pont_b("state"),
        lat: pont_b("latitude"),
        long: pont_b("longitude"),
        interface_b: pont_b("interface_b")
      },
      contatos: contacPed,
      lpu: null,
      vendors: null
    };

    sendEmailSaveEvt(sendEmail);
    reloadParent();
  };

  function converteLatLong(latitude, longitude) {
    const coordenadas = [latitude, longitude];
    const resultado = [];
    for (let c = 0; c < coordenadas.length; c++) {
      const grau = parseInt(String(coordenadas[c]), 10);
      let minuto = parseInt(String(coordenadas[c]).split(".")[1], 10) * 60;
      let segundo =
        parseInt(String(minuto).substr(2, String(minuto).length), 10) * 60;
      minuto = String(minuto).substr(0, 2);
      segundo = String(segundo).substr(0, 2);
      resultado.push(
        `${grau.toString()}º${minuto.toString()}'${segundo.toString()}'`
      );
    }
    return resultado;
  }

  let latitude_a = _.get(response, "ot_element_a.latitude") || "[n/a]";
  let longitude_a = _.get(response, "ot_element_a.longitude") || "[n/a]";
  let latitude_b = _.get(response, "ot_element_b.latitude") || "[n/a]";
  let longitude_b = _.get(response, "ot_element_b.longitude") || "[n/a]";

  if (latitude_a !== "[n/a]" && longitude_a !== "[n/a]") {
    const coordenadas = converteLatLong(latitude_a, longitude_a);
    latitude_a = coordenadas[0];
    longitude_a = coordenadas[1];
  }
  if (latitude_b !== "[n/a]" && longitude_b !== "[n/a]") {
    const coordenadas2 = converteLatLong(latitude_b, longitude_b);
    latitude_b = coordenadas2[0];
    longitude_b = coordenadas2[1];
  }

  return (
    <div className="overlay-wrapper">
      <div className="box-body formatInputPlaceholder">
        <Row>
          <div className="box box-default">
            <div className="box-body">
              <Grid cols="12 4">
                <Row>
                  <LabelInput
                    cols="6"
                    readOnly
                    placeholder={_.get(response, "ot.code") || "[n/a]"}
                    label="Código OT"
                  />
                  <LabelInput
                    cols="6"
                    readOnly
                    placeholder={`${_.get(
                      response,
                      "ot_seg_user_area.code"
                    )}-${_.get(response, "ot_segmentation.id")}`}
                    label="Código Segmento"
                  />
                </Row>
                <Row>
                  <LabelInput
                    cols="6"
                    readOnly
                    placeholder={_.get(response, "ot_status.name") || "[n/a]"}
                    label="Status OT"
                  />
                  <LabelInput
                    cols="6"
                    readOnly
                    placeholder={
                      _.get(response, "seg_status.description") || "[n/a]"
                    }
                    label="Status Segmento"
                  />
                </Row>
                <Row>
                  <LabelInput
                    cols="6"
                    readOnly
                    placeholder={
                      moment(_.get(response, "ot.data_solicitacao")).format(
                        "DD/MM/YYYY"
                      ) || "[n/a]"
                    }
                    label="Solicitação OT"
                  />
                  <LabelInput
                    cols="6"
                    readOnly
                    placeholder={
                      moment(
                        _.get(response, "ot_segmentation.created_at")
                      ).format("DD/MM/YYYY") || "[n/a]"
                    }
                    label="Solicitação Segmento"
                  />
                </Row>
                <Row>
                  <LabelInput
                    cols="6"
                    readOnly
                    placeholder={_.get(response, "ot.period") || "[n/a]"}
                    label="Solicitação OT"
                  />
                  <LabelInput
                    cols="6"
                    readOnly
                    placeholder={_.get(response, "ot.duration") || "[n/a]"}
                    label="Solicitação Segmento"
                  />
                </Row>
                <Row>
                  <LabelInput
                    cols="6"
                    readOnly
                    placeholder={
                      _.get(response, "ot_segmentation.degrau") || "[n/a]"
                    }
                    label="Degrau Anatel"
                  />
                </Row>
              </Grid>
              <Grid cols="12 3">
                <Row>
                  <LabelInput
                    cols="6"
                    readOnly
                    placeholder={
                      _.get(response, "ot_element_a.operator") || "[n/a]"
                    }
                    label="Regional"
                  />
                  <LabelInput
                    cols="6"
                    readOnly
                    placeholder={
                      _.get(response, "ot_element_a.element_type") || "[n/a]"
                    }
                    label="Tipo de Elemento"
                  />
                </Row>
                <Row>
                  <LabelInput
                    cols="6"
                    readOnly
                    placeholder={
                      _.get(response, "ot_element_a.elemento_id") || "[n/a]"
                    }
                    label="Elemento Id"
                  />
                  <LabelInput
                    cols="6"
                    readOnly
                    placeholder={
                      _.get(response, "ot_element_a.endereco_id") || "[n/a]"
                    }
                    label="Endereço Id"
                  />
                </Row>
                <Row>
                  <Grid cols="12 12">
                    <DebounceInput
                      className="col-xs-12 col-sm-12 input-logradouro"
                      readOnly
                      placeholder={
                        _.get(response, "ot_element_a.address") || "[n/a]"
                      }
                    />
                  </Grid>
                </Row>
                <Row>
                  <LabelInput
                    cols="12"
                    readOnly
                    placeholder={
                      _.get(response, "ot_element_a.bairro") || "[n/a]"
                    }
                    label="Bairro"
                  />
                </Row>
                <Row>
                  <LabelInput
                    cols="12"
                    readOnly
                    placeholder={
                      _.get(response, "ot_element_a.element_interface") ||
                      "[n/a]"
                    }
                    label="Interface"
                  />
                </Row>
                <Row>
                  <LabelInput
                    cols="6"
                    readOnly
                    placeholder={latitude_a}
                    label="Latitude"
                  />
                  <LabelInput
                    cols="6"
                    readOnly
                    placeholder={longitude_a}
                    label="Longitude"
                  />
                </Row>
              </Grid>
              <Grid cols="12 2">
                <Row>
                  <Grid cols="12">
                    <div className="form-group">
                      <h4>
                        <span className="label label-default">
                          {_.get(response, "ot_segmentation.qtd_links") ||
                            "[n/a]"}{" "}
                          links de {_.get(response, "ot_speed.name") || "[n/a]"}
                        </span>
                      </h4>
                    </div>
                  </Grid>
                </Row>
                <Row>
                  <Grid cols="12">
                    <div className="form-group">
                      <h4>
                        <span className="label label-default">
                          {_.get(response, "ot_redundancy.name") || "[n/a]"}
                        </span>
                      </h4>
                    </div>
                  </Grid>
                </Row>
                {_.get(response, "ot_redundancy.name") === "Com proteção" && (
                  <Row>
                    <Grid cols="12">
                      <div className="form-group">
                        <p>
                          <span className="label label-default">
                            {_.get(
                              response,
                              "ot_segmentation.protection_type"
                            ) || "[n/a]"}
                          </span>
                        </p>
                      </div>
                    </Grid>
                  </Row>
                )}
                <Row>
                  <LabelInput
                    cols="12"
                    readOnly
                    placeholder={
                      _.get(response, "ot_segmentation.solution") || "[n/a]"
                    }
                    label="Atendimento"
                  />
                </Row>
              </Grid>
              <Grid cols="12 3">
                <Row>
                  <LabelInput
                    cols="6"
                    readOnly
                    placeholder={
                      _.get(response, "ot_element_b.operator") || "[n/a]"
                    }
                    label="Regional"
                  />
                  <LabelInput
                    cols="6"
                    readOnly
                    placeholder={
                      _.get(response, "ot_element_b.element_type") || "[n/a]"
                    }
                    label="Tipo de Elemento"
                  />
                </Row>
                <Row>
                  <LabelInput
                    cols="6"
                    readOnly
                    placeholder={
                      _.get(response, "ot_element_b.elemento_id") || "[n/a]"
                    }
                    label="Elemento Id"
                  />
                  <LabelInput
                    cols="6"
                    readOnly
                    placeholder={
                      _.get(response, "ot_element_b.endereco_id") || "[n/a]"
                    }
                    label="Endereço Id"
                  />
                </Row>
                <Row>
                  <Grid cols="12 12">
                    <DebounceInput
                      className="col-xs-12 col-sm-12 input-logradouro"
                      readOnly
                      placeholder={
                        _.get(response, "ot_element_b.address") || "[n/a]"
                      }
                    />
                  </Grid>
                </Row>
                <Row>
                  <LabelInput
                    cols="12"
                    readOnly
                    placeholder={
                      _.get(response, "ot_element_b.bairro") || "[n/a]"
                    }
                    label="Bairro"
                  />
                </Row>
                <Row>
                  <LabelInput
                    cols="12"
                    readOnly
                    placeholder={
                      _.get(response, "ot_element_b.element_interface") ||
                      "[n/a]"
                    }
                    label="Interface"
                  />
                </Row>
                <Row>
                  <LabelInput
                    cols="6"
                    readOnly
                    placeholder={latitude_b}
                    label="Latitude"
                  />
                  <LabelInput
                    cols="6"
                    readOnly
                    placeholder={longitude_b}
                    label="Longitude"
                  />
                </Row>
              </Grid>
            </div>
          </div>
        </Row>
        <Row>
          <div className="box-body">
            <Table
              columns={columns}
              loading={loading}
              rows={evt_list}
              actions={memoizedActions({
                get_tracking_attachs,
                setEvt,
                setProposta,
                setEvtescolhida,
                setContrato
              })}
              columnWidths={columnsWidths}
              disablePagination
            />
          </div>
        </Row>
      </div>
      <Overlay />
      <ModalFormOT
        LabelButtonSubmit="Histórico de Notificações"
        id="historico_notificacoes"
        title="Histórico de Notificações"
        dimension="modal-lg"
        loading={loading}
      >
        <HistoricoNotificacoes />
      </ModalFormOT>
      <ModalFormOT
        LabelButtonSubmit="Visualizar EVT"
        id="visualizar_evt"
        title="Visualizar EVT"
        dimension="modal-lg"
        loading={loading}
      >
        <VisualizarEvtPanel
         selection={selection}
         reloadParent={reloadParent}
         seg_id={seg_id}
         list={list}
        />
      </ModalFormOT>
    </div>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      get_tracking_attachs,
      setEvt,
      setSendRequest,
      sendRequestOff,
      show_loader,
      hide_loader,
      get_all_by_ot_segmentation_id,
      get_ot_data_radar
    },
    dispatch
  );
const mapStateToProps = state => ({
  auth: state.auth,
  radarPossibilidades: state.radarPossibilidades,
  sendRequest: state.radarPossibilidades.sendRequest,
  sizePedido: get(state.form, "PedidoProposta.values", {}),
  evtForm: get(state.form, "PedidoProposta.values", {}),
  evtList: get(state, "radarPossibilidades.evt_list", []),
  ot_speed: get(state.radarPossibilidades, "response.ot_speed", {}),
  evtContacs: get(
    state.radarPossibilidades,
    "vendorProviders.vendor_contacts",
    []
  ),
  pedidoCotacaoEmissao: get(state.form, "PedidoCotacaoEmicao.values", {})
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormRadarPossibilidades);
