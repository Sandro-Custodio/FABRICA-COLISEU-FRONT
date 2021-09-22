import React from "react";
import { LabelInput, Label, TextareaField } from "common/form/components";
import Row from "common/layout/row";
import moment from "moment";
import Grid from "common/layout/grid";
import get from "lodash/get";
import { Modal } from "common";
import { getVisualizar } from "./actions";
import { IconButton } from "../comps";

const Section = ({ children }) => (
  <Grid>
    <div className="box box-primary">
      <div className="box-body">{children}</div>
    </div>
  </Grid>
);

const VisualizarEvt = ({
  selection,
  linhaSelecionada,
  linhaSelecionadaComParametrosParaOBackend
}) => {
  const INITIAL_STATE = {
    evtList: [],
    pedidoAccord: {
      evt: {}
    },
    contratoEvt: []
  };
  const [open, setOpen] = React.useState(false);
  const [evts, setEvt] = React.useState(INITIAL_STATE);

  const formatDate = value => {
    if (value === "[n/a]") {
      return "[n/a]";
    }
    return value && moment(value).format("DD/MM/YYYY");
  };

  if (selection.length !== 1) return null;

  const labels = [
    { cols: "1", text: "Custo Unitário" },
    { cols: "1", text: "Sem Impostos" },
    { cols: "1", text: "Com Impostos" },
    { cols: "1", text: "Lpu" },
    { cols: "1", text: " " },
    { cols: "1", text: "Quantidade" },
    { cols: "1", text: " " },
    { cols: "1", text: "Total" }
  ];

  const LabelInputComp = ({ isData, cols, data, item, ...others }) => (
    <LabelInput
      value={
        isData ? formatDate(get(data, item, "[n/a]")) : get(data, item, "[n/a]")
      }
      readOnly
      {...others}
      cols={cols}
    />
  );

  LabelInputComp.defaultProps = {
    cols: "3",
    isData: false
  };

  return (
    <>
      <IconButton
        icon="eye"
        onClick={() => {
          setOpen(true);

          getVisualizar(
            linhaSelecionadaComParametrosParaOBackend.evt_id,
            linhaSelecionadaComParametrosParaOBackend.ot_segmentation_id,
            linhaSelecionadaComParametrosParaOBackend.vendor_id
          )
            .then(res =>
              setEvt({
                evtList: res[0],
                pedidoAccord: res[1],
                contratoEvt: res[2]
              })
            )
            .catch(erro => console.log("ERRO", erro));
        }}
      />
      {open && (
        <Modal
          open={open}
          title="Visualizar Evt"
          dimension="lg"
          onClose={() => setOpen(false)}
        >
          <div className="box-body">
            <Section>
              <Row>
                <Label text="PEDIDO DE COTAÇÃO" />
              </Row>
              <Row>
                <LabelInputComp
                  cols="2"
                  label="Data do pedido"
                  data={evts.pedidoAccord.evt}
                  item="requested_at"
                  isData
                />
                <LabelInputComp
                  data={linhaSelecionada}
                  item="provedor"
                  label="Provedor"
                />
                <LabelInputComp
                  data={linhaSelecionada}
                  item="evt"
                  label="Código EVT"
                />
                <LabelInputComp
                  cols="2"
                  data={evts.pedidoAccord.evt}
                  item="deadline_at"
                  label="Limite recebimento"
                  isData
                />
                <LabelInputComp
                  cols="2"
                  data={evts.pedidoAccord.evt}
                  item="contract_time"
                  label="Pz. contratação"
                />
              </Row>
              <Row>
                <Label
                  cols="2"
                  value="Quantidade de Links:"
                  {...linhaSelecionadaComParametrosParaOBackend.qtd_links}
                />
                <Label cols="2" value="Velocidade:" />
              </Row>
            </Section>
            <Section>
              <Row>
                <Label text="PROPOSTA" />
              </Row>
              <Row>
                <LabelInputComp
                  cols="2"
                  label="Moeda"
                  data={evts.pedidoAccord.evt}
                  item="moeda"
                />
                <LabelInputComp
                  cols="2"
                  label={
                    evts.pedidoAccord.evt.pms_id !== null
                      ? "Confirmação de Recebimento PMS"
                      : "Data Proposta"
                  }
                  data={evts.pedidoAccord.evt}
                  item="responsed_at"
                  isData
                />
                <LabelInput
                  cols="2"
                  readOnly
                  value={get(
                    evts.pedidoAccord.evt,
                    "response_validity_through",
                    "[n/a]"
                  )}
                  label="Validade (1)"
                />
                <LabelInputComp
                  cols="2"
                  data={evts.pedidoAccord.evt}
                  item="activation_time"
                  label="Pz. ativação (1)"
                />
                <Label cols="2" text=" " />
                <Label cols="1" text="(1) em dias" />
              </Row>
              <Row>
                {labels.map(todo => (
                  <Label {...todo} />
                ))}
              </Row>

              <Row>
                <Label cols="1" text="Mensal" />
                <TextareaField
                  readOnly
                  cols="1"
                  value={`R$ ${get(evts.pedidoAccord.evt, "monthly_cost") ||
                    "0.0"}`}
                />
                <TextareaField
                  readOnly
                  cols="1"
                  value={
                    get(evts.pedidoAccord.evt, "monthly_cost") === null
                      ? "R$ 0.0"
                      : `R$ ${(
                          parseFloat(evts.pedidoAccord.evt.monthly_cost) /
                          0.9635
                        ).toFixed(2)}`
                  }
                />
                <TextareaField
                  readOnly
                  cols="1"
                  value={`R$ ${get(evts.pedidoAccord.evt, "lpu_mens_cost") ||
                    "0.0"}`}
                />
                <Label cols="1" text="X" />
                <TextareaField
                  readOnly
                  cols="1"
                  value={get(evts.pedidoAccord.evt, "quantity", "[n/a]")}
                />
                <Label cols="1" text="=" />
                <TextareaField
                  readOnly
                  cols="1"
                  value={`R$ ${
                    evts.pedidoAccord.evt.monthly_cost != null &&
                    evts.pedidoAccord.evt.quantity != null
                      ? (
                          (parseFloat(evts.pedidoAccord.evt.monthly_cost) /
                            0.9635) *
                          evts.pedidoAccord.evt.quantity
                        ).toFixed(2)
                      : "0.0"
                  }`}
                />
              </Row>

              <Row>
                <Label cols="1" text="Instalação" />
                <TextareaField
                  readOnly
                  cols="1"
                  value={`R$ ${get(
                    evts.pedidoAccord.evt,
                    "installation_cost"
                  ) || "0.0"}`}
                />
                <TextareaField
                  readOnly
                  cols="1"
                  value={
                    get(evts.pedidoAccord.evt, "installation_cost") === null
                      ? "R$ 0.0"
                      : `R$ ${(
                          parseFloat(evts.pedidoAccord.evt.installation_cost) /
                          0.8765
                        ).toFixed(2)}`
                  }
                />
                <TextareaField
                  readOnly
                  cols="1"
                  value={`R$ ${get(evts.pedidoAccord.evt, "lpu_ins_cost") ||
                    "0.0"}`}
                />
                <Label cols="1" text="X" />
                <TextareaField
                  readOnly
                  cols="1"
                  value={get(evts.pedidoAccord.evt, "quantity", "[n/a]")}
                />
                <Label cols="1" text="=" />
                <TextareaField
                  readOnly
                  cols="1"
                  value={`R$ ${
                    evts.pedidoAccord.evt.installation_cost != null &&
                    evts.pedidoAccord.evt.quantity != null
                      ? (
                          (parseFloat(evts.pedidoAccord.evt.installation_cost) /
                            0.8765) *
                          evts.pedidoAccord.evt.quantity
                        ).toFixed(2)
                      : "0.0"
                  }`}
                />
              </Row>
            </Section>
            <Section>
              <Row>
                <Label cols="2" text="CONTRATAÇÃO" />
              </Row>
              <Row>
                <LabelInputComp
                  cols="2"
                  data={evts.pedidoAccord.evt}
                  item="approved_at"
                  label="Data de Aprovação"
                  isData
                />
                <LabelInput
                  cols="2"
                  readOnly
                  value={get(
                    evts.pedidoAccord.evt,
                    "contract_protocol",
                    "[n/a]"
                  )}
                  label="Contrato"
                />
                <LabelInput
                  cols="2"
                  readOnly
                  value={get(evts.pedidoAccord.evt, "degrau", "[n/a]")}
                  label="Degrau Anatel"
                />
                <LabelInputComp
                  cols="2"
                  label={
                    evts.pedidoAccord.evt.pms_id !== null
                      ? "Previsão de Ativação Regulamentar"
                      : "Previsão de Ativação"
                  }
                  data={evts.pedidoAccord.evt}
                  item="estimated_activation_at"
                  isData
                />
                <LabelInput
                  cols="2"
                  readOnly
                  value={get(evts.pedidoAccord.evt, "meio_acesso", "[n/a]")}
                  label="Meio de Acesso"
                />
                <LabelInput
                  cols="2"
                  readOnly
                  value={get(evts.pedidoAccord.evt, "numero_parcelas", "[n/a]")}
                  label="Nº de Parcelas"
                />
              </Row>
            </Section>
            <Section>
              <Row>
                <Label cols="2" text="CANCELAMENTO" />
              </Row>
              <Row>
                <LabelInput
                  cols="2"
                  readOnly
                  value={formatDate(
                    get(evts.pedidoAccord.evt, "cancelled_at", "[n/a]")
                  )}
                  label="Data Cancelamento"
                />
                <LabelInput
                  cols="2"
                  readOnly
                  value={get(evts.pedidoAccord.evt, "status_name", "[n/a]")}
                  label="Situação"
                />
                <LabelInput
                  cols="2"
                  readOnly
                  value={get(evts.pedidoAccord.evt, "motivo_distrato", "[n/a]")}
                  label="Distrato"
                />
                <LabelInput
                  cols="2"
                  readOnly
                  value={get(evts.pedidoAccord.evt, "remarks", "[n/a]")}
                  label="Motivo"
                />
              </Row>
            </Section>
          </div>
        </Modal>
      )}
    </>
  );
};

export default VisualizarEvt;
