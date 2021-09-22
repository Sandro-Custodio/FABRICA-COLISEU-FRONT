import React, { useState } from "react";
import Row from "common/layout/row";
import { bindActionCreators } from "redux";
import { Field, reduxForm } from "redux-form";
import { TextArea } from "common/input";
import Dropzone from "react-dropzone";
import axios from "axios";
import { toastr } from "react-redux-toastr";
import get from "lodash/get";
import { connect } from "react-redux";
import Overlay from "common/msg/overlay/overlay";
import { IconButton, Card, Table } from "common";
import { LabelInput, Label } from "common/form/components";
import { columnsEmail } from "../mock.json";
import { show_overlay, hide_overlay } from "./actions";

const UploadAnexo = () => {
  const [response, setResponse] = useState("");
  const onDrop = files => {
    const formData = new FormData();

    formData.append("Filedata", files[0]);
    formData.append("Newname", files[0].name);

    axios({
      method: "post",
      baseURL: process.env.REACT_APP_API_URL,
      url: "/upload/attachment",
      data: formData,
      headers: { "content-type": "application/octet-stream" },
      json: true
    })
      .then(res => {
        if (res.status === 200) {
          toastr.info("Importação realizada com sucesso!");
        }
        setResponse(files[0].name);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <Dropzone onDrop={onDrop}>
      {({ getRootProps, getInputProps }) => (
        <div
          className="dropzone"
          data-for="top_dark_float"
          data-tip="SOLTE O ARQUIVO AQUI."
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          {response}
          <i className="fa fa-upload" />
        </div>
      )}
    </Dropzone>
  );
};

const EnvioEmail = ({
  setOpenModalEmail,
  linhasSegselecionadas,
  prazoResp,
  auth,
  linhaSelecionada,
  setLinhasVendorsSelecionadas,
  linhasVendorsSelecionadas,
  setOpenModalUpload,
  linhasSegselecionadasParaBackend,
  setLinhasOpenModalUpload,
  show_overlay,
  hide_overlay
}) => {
  const [selection, onSelectionChange] = React.useState([]);
  const [pmsVendor, setPmsVendor] = React.useState([]);
  const [qtdLinks, setQtdLinks] = React.useState(1);
  const [
    newLinhasSegSelecionadas,
    setNewLinhasSegSelecionadas
  ] = React.useState([]);

  React.useEffect(() => {
    show_overlay();
    let segmentos = "";
    for (let i = 0; i < linhasSegselecionadasParaBackend.length; i++) {
      if (linhasSegselecionadasParaBackend[i].id != null) {
        segmentos.concat(`${linhasSegselecionadasParaBackend[i].id};`);
      }
    }
    const params = {
      0: {
        ot_code: linhasSegselecionadas[0].codOt
      }
    };

    Promise.all([
      axios
        .post("pms/get_pms_by_vendor", {
          vendors: [
            {
              id: linhaSelecionada.vendor_id,
              name: linhaSelecionada.vendor_name,
              segs: segmentos
            }
          ],
          segments: linhasSegselecionadas.map(el => {
            return { id: el.id };
          })
        })
        .then(res => {
          setPmsVendor(
            res.data[2][0].contacts.map(r => ({
              destinatario: "To",
              contato: r.contact_name,
              contact_mail: r.contact_mail
            }))
          );
        }),
      axios.post("evts/get_count_evt", {
        ot_segmentation_id: linhasSegselecionadas[0].id
      }),
      axios.post("ot_segmentations/filter_ot_segments", params).then(res => {
        setNewLinhasSegSelecionadas(
          res.data.map(r => ({
            id: r.id,
            addressA: r.address_a,
            addressAAux: r.address_a_aux,
            addressB: r.address_b,
            addressBAux: r.address_b_aux,
            velocidade: r.speed_ot,
            codOt: r.ot,
            codSeg: r.project,
            regA: r.regional_a,
            pontaA: r.ponta_a,
            regB: r.regional_b,
            pontaB: r.ponta_b,
            solucao: r.solution,
            situacao: r.status_ot,
            links: r.qtd_links,
            interfaceB: r.element_b_interface,
            interfaceA: r.element_a_interface,
            evt: r.evt
          }))
        );
      })
    ]).then(() => {
      hide_overlay();
    });
  }, [linhasVendorsSelecionadas]);

  const FieldComp = ({ col, ...others }) => (
    <div className={`col-sm-${col}`}>
      <Field
        className="form-control input-sm"
        type="text"
        component={LabelInput}
        {...others}
      />
    </div>
  );

  FieldComp.defaultProps = {
    col: 6
  };

  const LabelComp = ({ col, text }) => (
    <div className={`col-sm-${col}`}>
      <Label text={text} />
    </div>
  );

  LabelComp.defaultProps = {
    col: 6
  };

  const postEvt = () => {
    // const evtCode = `${linhasSegselecionadas[0].codOt.replace(
    //  "OT",
    //  "EVT"
    // )}-${newLinhasSegSelecionadas[0].evt.length + 1}`;

    const contacts =
      selection.length > 0
        ? selection.map(index => {
            return pmsVendor[index];
          })
        : null;

    const params = {
      evt: {
        // delivered_at: "2020-03-09T18:06:38.757Z",
        // "deadline_at": "2020-03-13T18:06:33.890Z",
        requested_at: linhaSelecionada.selected_date,
        // request_protocol será gerado no backend
        // request_protocol: evtCode,
        ot_id: linhasSegselecionadasParaBackend[0].ot_id,
        vendor_id: linhaSelecionada.vendor_id,
        contract_id: linhaSelecionada.selected_contract_id,
        contract_time: linhaSelecionada.selected_prazo,
        status_id: 1,
        user_id_open: get(auth, "user.registry"),
        flag_receita: linhaSelecionada.has_receita,
        // "service_type":"",
        quantity: qtdLinks,
        ot_segmentation_id: linhasSegselecionadasParaBackend[0].id
      },
      header:
        "Prezado Consultor \r\rSolicitamos Estudo de Viabilidade Técnica para provimento de EILD para rota abaixo. Pedimos retorno em no máximo 84 dias da emissão deste e-mail, juntamente com a confirmação de disponibilidade / prazo de atendimento e condições comerciais.",
      user: {
        id: get(auth, "user.id"),
        contact_number: null,
        address: null,
        fax_number: null,
        city: null,
        name: get(auth, "user.name"),
        email: get(auth, "user.email")
      },
      caract: {
        speed: linhasSegselecionadasParaBackend[0].speed_ot,
        ot_code: linhasSegselecionadasParaBackend[0].ot,
        prazo: linhaSelecionada.selected_prazo,
        qtd: qtdLinks
      },
      ponta_a: {
        elemento: linhasSegselecionadasParaBackend[0].address_a.id,
        endereco:
          linhasSegselecionadasParaBackend[0].address_a.endereco_equipamento,
        bairro: linhasSegselecionadasParaBackend[0].address_a_aux.bairro,
        city: linhasSegselecionadasParaBackend[0].address_a_aux.city,
        uf: linhasSegselecionadasParaBackend[0].address_a_aux.state,
        lat: linhasSegselecionadasParaBackend[0].address_a_aux.latitude,
        long: linhasSegselecionadasParaBackend[0].address_a_aux.longitude,
        interface_a: ""
      },
      ponta_b: {
        elemento: linhasSegselecionadasParaBackend[0].address_b.id,
        endereco:
          linhasSegselecionadasParaBackend[0].address_b.endereco_equipamento,
        bairro: linhasSegselecionadasParaBackend[0].address_b_aux.bairro,
        city: linhasSegselecionadasParaBackend[0].address_b_aux.city,
        uf: linhasSegselecionadasParaBackend[0].address_b_aux.state,
        lat: linhasSegselecionadasParaBackend[0].address_b_aux.latitude,
        long: linhasSegselecionadasParaBackend[0].address_b_aux.longitude,
        interface_a: ""
      },
      contatos: contacts,
      lpu: null,
      vendors: {
        vendors: [
          {
            vendor_name: linhaSelecionada.vendor_name,
            id: linhaSelecionada.vendor_id,
            contract_id: linhaSelecionada.contract_id,
            flag_receita: linhaSelecionada.flag_receita,
            contract_time: linhaSelecionada.contract_time,
            selected_date: linhaSelecionada.selected_date,
            attach: {
              ll_attachs: [linhaSelecionada.attach]
            }
          }
        ]
      }
    };
    show_overlay();
    axios
      .post("evts/send_email_save_evt", params)
      .then(resp => {
        if (resp.status === 200) {
          axios
            .post("evts/get_evts_multis", {
              evts_id: linhasSegselecionadasParaBackend[0].evt.map(id => id.id)
            })
            .then(resp => {
              setLinhasOpenModalUpload(
                resp.data.evts.map(el => ({
                  ot: el.ot.code,
                  segmento: el.ot_segmentation_id,
                  evt: el.request_protocol,
                  dataPedido: el.created_at,
                  dataLimite: el.deadline_at,
                  provedor: el.vendor_id,
                  status: el.status?.description,
                  dataProposta: el.requested_at,
                  validade: el.contract_time,
                  prazoContratacao: null,
                  prazoAtivacao: null,
                  custoMensal: el.monthly_cost,
                  custoInst: el.installation_cost,
                  qtd: el.quantity,
                  mensImp: el.monthly_cost_taxes,
                  insImp: el.installation_cost_taxes,
                  peMensal: null,
                  peInst: null,
                  dataAprov: el.approved_at,
                  prevAtiv: el.estimated_activation_at,
                  protocolo: null,
                  agrupadorA: el.ot_segmentation?.element_a_id,
                  agrupadorB: el.ot_segmentation?.element_b_id,
                  degrau: el.degrau
                }))
              );
            });

          if (linhasVendorsSelecionadas.length >= 1) {
            setLinhasVendorsSelecionadas(
              linhasVendorsSelecionadas.filter(
                linha => linha !== linhaSelecionada
              )
            );

            if (linhasVendorsSelecionadas.length === 1) {
              setOpenModalEmail(false);
              setOpenModalUpload(true);
            }
          }
          toastr.success(
            "",
            `Evt ${resp.data.result_evt.request_protocol} criada com sucesso!`
          );
        } else {
          toastr.info(resp.status);
        }
      })
      .catch(e => {
        if (e.response?.data?.errors) {
          e.response.data.errors.forEach(error => toastr.error("Erro", error));
        } else if (e.request) {
          if (e.message === "Network Error") {
            toastr.error("Erro", "Servidor OFFLINE");
          }
        }
      })
      .finally(() => {
        hide_overlay();
      });
  };

  return (
    <div className="overlay-wrapper">
      <Overlay />
      <Card
        headerPosition="left"
        header={
          <>
            <Row>
              <LabelComp text={get(linhasSegselecionadas, "0.codOt")} col={2} />
              <LabelComp text="Provedor:" col={1} />
              <LabelComp text={get(linhaSelecionada, "0.name")} col={2} />
            </Row>{" "}
            <Row>
              <p
                style={{
                  display: "flex",
                  textAlign: "left"
                }}
              >
                <strong>
                  Prezado Consultor
                  <br />
                  {`Solicitamos Estudo de Viabilidade Técnica para provimento de
                EILD para rota abaixo. Pedimos retorno em no máximo ${prazoResp} dias da
                emissão deste e-mail, juntamente com a confirmação de
                disponibilidade / prazo de atendimento e condições comerciais.`}
                  <br />
                </strong>
              </p>
            </Row>
          </>
        }
        footer={
          <IconButton
            icon="upload"
            className="btn-primary"
            disabled={selection.length <= 0}
            onClick={() => {
              toastr.confirm("Confirmar Operação?", {
                onOk: () => {
                  postEvt();
                }
              });
            }}
          >
            Enviar Email
          </IconButton>
        }
      >
        <form className="form">
          <Card>
            <Row>
              {" "}
              <div
                style={{
                  display: "flex",
                  textAlign: "center"
                }}
              >
                <Label text="EMITIDO POR TIM CELULAR S/A" />
              </div>
            </Row>
            <div
              style={{
                display: "flex",
                textAlign: "left",
                justifyContent: "space-between"
              }}
            >
              <Row>
                <LabelComp text="Nome Representante" />
                <FieldComp
                  placeholder={get(auth, "user.name")}
                  name="name"
                  readOnly
                />
                <LabelComp text="Email" />
                <FieldComp
                  placeholder={get(auth, "user.email")}
                  name="email"
                  readOnly
                />
                <LabelComp text="Cidade" />
                <FieldComp
                  placeholder={get(auth, "user.city")}
                  name="city"
                  readOnly
                />
              </Row>

              <Row>
                <LabelComp text="Telefone/ Celular" />
                <FieldComp
                  placeholder={get(auth, "user.commercial_number")}
                  name="commercial_number"
                  readOnly
                />
                <LabelComp text="Fax" />
                <FieldComp
                  placeholder={get(auth, "user.fax_number")}
                  name="fax_number"
                  readOnly
                />
                <LabelComp text="Endereço" />
                <FieldComp
                  placeholder={get(auth, "user.address")}
                  name="address"
                  readOnly
                />
              </Row>
            </div>
          </Card>
          <div
            style={{
              display: "flex",
              textAlign: "left",
              justifyContent: "space-between"
            }}
          >
            {" "}
            <Card>
              <Row>
                <LabelComp text="Características" />
              </Row>
              <Row>
                <LabelComp text="Velocidade" />
                <FieldComp
                  placeholder={get(linhasSegselecionadas, "0.velocidade")}
                  name="speed_ot"
                  readOnly
                />
              </Row>
              <Row>
                <LabelComp text="Quantidade" />
                <select
                  name="links"
                  id="links"
                  onChange={event => setQtdLinks(event.target.value)}
                >
                  {Array.from(
                    { length: get(linhasSegselecionadas, "0.links") },
                    (value, index) => (
                      <option value={index + 1}>{index + 1}</option>
                    )
                  )}
                </select>
              </Row>
              <Row>
                <LabelComp text="Fidelização" />
                <FieldComp
                  name="prazoFidelizacao"
                  placeholder={get(linhaSelecionada, "selected_prazo")}
                  readOnly
                />
              </Row>
              <Row>
                <UploadAnexo />
              </Row>

              <Row>
                <LabelComp text="Alterar prazo resposta" />
                <FieldComp placeholder={prazoResp} name="prazoResp" />
              </Row>
              <Row>
                <LabelComp text="Inserir Observação" />
                <Field
                  name="observacao"
                  component={TextArea}
                  containerProps={{ className: "col-lg-6" }}
                />
              </Row>
            </Card>
            <Card>
              <Row>
                <LabelComp text="Ponta A" />{" "}
              </Row>
              <Row>
                <LabelComp text="Elemento" />
                <FieldComp
                  placeholder={get(linhasSegselecionadas, "0.addressA.id")}
                  name="addressA_id"
                  readOnly
                />
              </Row>
              <Row>
                <LabelComp text="Endereço" />
                <FieldComp
                  placeholder={get(
                    linhasSegselecionadas,
                    "0.addressA.endereco_equipamento"
                  )}
                  name="addressA_equipamento"
                  readOnly
                />
              </Row>
              <Row>
                <LabelComp text="Bairro" />
                <FieldComp
                  placeholder={get(linhasSegselecionadas, "0.addressA.bairro")}
                  name="addressA_bairro"
                  readOnly
                />
              </Row>
              <Row>
                <LabelComp text="Cidade" />
                <FieldComp
                  placeholder={get(linhasSegselecionadas, "0.addressAAux.city")}
                  name="addressACity"
                  readOnly
                />
              </Row>
              <Row>
                <LabelComp text="UF" />
                <FieldComp
                  placeholder={get(
                    linhasSegselecionadas,
                    "0.addressAAux.state"
                  )}
                  name="addressAState"
                  readOnly
                />
              </Row>
              <Row>
                <LabelComp text="Latitude" />
                <FieldComp
                  placeholder={get(
                    linhasSegselecionadas,
                    "0.addressA.latitude"
                  )}
                  name="addressA_latitude"
                  readOnly
                />
              </Row>
              <Row>
                <LabelComp text="Longitude" />
                <FieldComp
                  placeholder={get(
                    linhasSegselecionadas,
                    "0.addressA.longitude"
                  )}
                  name="addressA_longitude"
                  readOnly
                />
              </Row>
              <Row>
                <LabelComp text="Interface A" />
                <FieldComp
                  placeholder={get(linhasSegselecionadas, "0.interfaceA")}
                  name="interfaceA"
                  readOnly
                />
              </Row>
            </Card>
            <Card>
              <Row>
                <LabelComp text="Ponta B" />{" "}
              </Row>
              <Row>
                <LabelComp text="Elemento" />
                <FieldComp
                  placeholder={get(linhasSegselecionadas, "0.addressB.id")}
                  name="addressB_id"
                  readOnly
                />
              </Row>
              <Row>
                <LabelComp text="Endereço" />
                <FieldComp
                  placeholder={get(
                    linhasSegselecionadas,
                    "0.addressB.endereco_equipamento"
                  )}
                  name="enderecoB_equipamento"
                  readOnly
                />
              </Row>
              <Row>
                <LabelComp text="Bairro" />
                <FieldComp
                  placeholder={get(linhasSegselecionadas, "0.addressB.bairro")}
                  name="enderecoB_bairro"
                  readOnly
                />
              </Row>
              <Row>
                <LabelComp text="Cidade" />
                <FieldComp
                  placeholder={get(linhasSegselecionadas, "0.addressBAux.city")}
                  name="addressBCity"
                  readOnly
                />
              </Row>
              <Row>
                <LabelComp text="UF" />
                <FieldComp
                  placeholder={get(
                    linhasSegselecionadas,
                    "0.addressBAux.state"
                  )}
                  name="addressBState"
                  readOnly
                />
              </Row>
              <Row>
                <LabelComp text="Latitude" />
                <FieldComp
                  placeholder={get(
                    linhasSegselecionadas,
                    "0.addressB.latitude"
                  )}
                  name="enderecoB_latitude"
                  readOnly
                />
              </Row>
              <Row>
                <LabelComp text="Longitude" />
                <FieldComp
                  placeholder={get(
                    linhasSegselecionadas,
                    "0.addressB.longitude"
                  )}
                  name="enderecoB_longitude"
                  readOnly
                />
              </Row>
              <Row>
                <LabelComp text="Interface B" />
                <FieldComp
                  placeholder={get(linhasSegselecionadas, "0.interfaceB")}
                  name="interfaceB"
                  readOnly
                />
              </Row>
            </Card>
          </div>
          <Card>
            <Table
              columns={columnsEmail}
              rows={pmsVendor}
              selectionProps={{ selection, onSelectionChange }}
              disablePagination
            />
          </Card>
        </form>
      </Card>
    </div>
  );
};

EnvioEmail.defaultProps = {
  prazoResp: 7
};

const formWrapper = reduxForm({
  form: "enviarEmail"
})(EnvioEmail);

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ show_overlay, hide_overlay }, dispatch);
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(formWrapper);
