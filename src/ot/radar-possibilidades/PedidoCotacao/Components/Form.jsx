/* eslint-disable consistent-return */
import React from "react";
import get from "lodash/get";
import { connect, useSelector } from "react-redux";
import axios from "axios";
import { Field, reduxForm } from "redux-form";
import { toastr } from "react-redux-toastr";
import { Card } from "common";
import { Input } from "common/input";
import Upload from "./Upload";
import "./styles.css";

const Form = ({
  selection,
  contract_time,
  list,
  evtList,
  vendor,
  ot_element_a,
  ot_element_b,
  ot_speed,
  ot_segmentation
}) => {
  const uploadFile = files => {
    return Promise.all(
      files.map(file => {
        const form = new FormData();
        form.append("Filedata", file);
        form.append("new_file_name", file.name);
        form.append("folder_name", "pedido_cotacao");
        return axios
          .post("/flex_upload/attachment", form)
          .then(res => {
            toastr.success("Anexo", "Upload realizado com sucesso!");
            console.log(res.data[0]);
          })
          .catch(() => {
            toastr.error("Erro", "Erro ao realizar upload");
          });
      })
    );
  };

  const auth = useSelector(({ auth }) => auth);
  const otCode =
    get(
      selection.map(item => list[item]),
      "[0].code"
    ) || "[N/A]";
  const evtCode = otCode.replace("OT", "EVT");

  const underLinkLimit = value => {
    // status_id 3 === contratado
    const qtd_contratados = evtList
      .filter(evt => evt.evt_status.id === 3 || evt.evt_status.id === 2)
      .reduce((inicial, evt) => {
        return evt.quantity + inicial;
      }, 0);

    const qtdPropostaSomandoContratados = parseInt(value, 10) + qtd_contratados;
    const qtd_links = get(ot_segmentation, "qtd_links", 1);

    if (qtdPropostaSomandoContratados > qtd_links) {
      toastr.info("Quantidade de links excedida");
      return;
    }

    if (value <= 0) {
      return 1;
    }
    return value;
  };

  return (
    <div id="envio-email-evt" className="fade-in fade-out-in">
      {/* Solicitação */}
      <Card
        title="SOLICITAÇÃO DE ESTUDO DE VIABILIDADE TÉCNICA"
        tools={`Data:${new Date().toLocaleDateString("pt-br")}`}
      >
        <Field
          component={Input}
          contentProps="col-md-4"
          readOnly
          name="referencia"
          placeholder={`${evtCode}-${evtList.length + 1}`}
          text="Referência"
        />
        <Field
          component={Input}
          contentProps="col-md-4"
          readOnly
          name="ot"
          placeholder={otCode}
          text="Ot"
        />
        <Field
          component={Input}
          contentProps="col-md-4"
          readOnly
          name="provedor"
          placeholder={vendor}
          text="Provedor"
        />
      </Card>

      {/* Consultor */}
      <Card color title="Prezado Consultor">
        <p>
          Solicitamos Estudo de Viabilidade Técnica para provimento de EILD para
          rota abaixo. Pedimos retorno em no máximo{" "}
          <strong>{contract_time}</strong> dias da emissão deste e-mail,
          juntamente com a confirmação de disponibilidade / prazo de atendimento
          e condições comerciais.
        </p>
      </Card>

      {/* Emissão */}
      <Card color="default" title="EMITIDO POR TIM CELULAR S/A">
        <div className="col-md-6">
          <Field
            component={Input}
            readOnly
            name="representante"
            placeholder={get(auth, "user.name") || "[N/A]"}
            text="Nome Representante"
          />
          <Field
            component={Input}
            readOnly
            name="phone"
            placeholder={get(auth, "user.contact_number") || "[N/A]"}
            text="Telefone / Celular"
          />
          <Field
            component={Input}
            readOnly
            name="address"
            placeholder={get(auth, "user.address") || "[N/A]"}
            text="Endereço"
          />
        </div>
        <div className="col-md-6">
          <Field
            component={Input}
            readOnly
            name="mail"
            placeholder={get(auth, "user.email") || "[N/A]"}
            text="Email"
          />
          <Field
            component={Input}
            readOnly
            name="fax"
            placeholder={get(auth, "user.fax_number") || "[N/A]"}
            text="Fax"
          />
          <Field
            component={Input}
            readOnly
            name="city"
            placeholder={get(auth, "user.city") || "[N/A]"}
            text="Cidade"
          />
        </div>
      </Card>

      {/* Caracteristicas */}
      {(ot_element_a !== null ||
        ot_element_b !== null ||
        ot_speed !== null ||
        ot_segmentation !== null) && (
        <Card title="Descrição" color="default">
          <div className="col-md-4">
            {/* descrition.map(item =>
              item.isField ? (
                <Field
                  component={Input}
                  readOnly
                  {...item}
                  placeholder={get(ot_speed, item.placeholder, "")}
                />
              ) : (
                <div className="form-group" id="pedido-cotacao">
                  <label htmlFor="anexar arquivo">Anexar um Arquivo</label>
                  <Upload multiple onDrop={uploadFile} label="Upload" />
                </div>
              )
            ) */}

            <Field
              component={Input}
              placeholder={get(ot_speed, "name", "")}
              name="name"
              text="Velocidade"
              readOnly
            />

            <Field
              component={Input}
              type="number"
              size="sm col-sm-1"
              name="qt_sublinks"
              text="Quantidade"
              initialValue={1}
              min={1}
              max={get(ot_segmentation, "qtd_links", 1)}
              normalize={underLinkLimit}
            />

            <Field
              component={Input}
              placeholder={get(ot_speed, "", "")}
              name="fedelizacao"
              text="Fidelização"
              readOnly
            />

            <div className="form-group" id="pedido-cotacao">
              <label htmlFor="anexar arquivo">Anexar um Arquivo</label>
              <Upload multiple onDrop={uploadFile} label="Upload" />
            </div>

            <Field
              component={Input}
              placeholder={get(ot_speed, "", "")}
              name="remarks"
              text="Inserir Observação"
              readOnly
            />
          </div>
          <div className="col-md-4">
            <Field
              component={Input}
              readOnly
              name="elemento_id"
              text="Elemento"
              placeholder={get(ot_element_a, "elemento_id", "[N/A]")}
            />

            <Field
              component={Input}
              readOnly
              name="endereco"
              text="Endereço"
              placeholder={get(ot_element_a, "address", "[N/A]")}
            />

            <Field
              component={Input}
              readOnly
              name="bairro"
              text="Bairro"
              placeholder={get(ot_element_a, "bairro", "[N/A]")}
            />

            <Field
              component={Input}
              readOnly
              name="city"
              text="Cidade"
              placeholder={get(ot_element_a, "city", "[N/A]")}
            />

            <Field
              component={Input}
              readOnly
              name="uf"
              text="UF"
              placeholder={get(ot_element_a, "state", "[N/A]")}
            />

            <Field
              component={Input}
              readOnly
              name="lat"
              text="Latitude"
              placeholder={get(ot_element_a, "latitude", "[N/A]")}
            />

            <Field
              component={Input}
              readOnly
              name="long"
              text="Longitude"
              placeholder={get(ot_element_a, "longitude", "[N/A]")}
            />

            <Field
              component={Input}
              readOnly
              name="interface_b"
              text="Interface B"
              placeholder={get(ot_element_a, "element_interface", "[N/A]")}
            />
          </div>
          <div className="col-md-4">
            <Field
              component={Input}
              readOnly
              name="elemento_id"
              text="Elemento"
              placeholder={get(ot_element_b, "elemento_id", "[N/A]")}
            />

            <Field
              component={Input}
              readOnly
              name="endereco"
              text="Endereço"
              placeholder={get(ot_element_b, "address", "[N/A]")}
            />

            <Field
              component={Input}
              readOnly
              name="bairro"
              text="Bairro"
              placeholder={get(ot_element_b, "bairro", "[N/A]")}
            />

            <Field
              component={Input}
              readOnly
              name="city"
              text="Cidade"
              placeholder={get(ot_element_b, "city", "[N/A]")}
            />

            <Field
              component={Input}
              readOnly
              name="uf"
              text="UF"
              placeholder={get(ot_element_b, "state", "[N/A]")}
            />

            <Field
              component={Input}
              readOnly
              name="lat"
              text="Latitude"
              placeholder={get(ot_element_b, "latitude", "[N/A]")}
            />

            <Field
              component={Input}
              readOnly
              name="long"
              text="Longitude"
              placeholder={get(ot_element_b, "longitude", "[N/A]")}
            />

            <Field
              component={Input}
              readOnly
              name="interface_b"
              text="Interface B"
              placeholder={get(ot_element_b, "element_interface", "[N/A]")}
            />
          </div>
        </Card>
      )}
    </div>
  );
};

const formWrapper = reduxForm({
  form: "PedidoCotacaoEmicao",
  destroyOnUnmount: false
})(Form);

const mapStateToProps = state => ({
  contract_time: get(
    state.radarPossibilidades,
    "formEvtAfterAction.contract_time",
    "[N/A]"
  ),
  list: get(state, "ot.list", []),
  evtList: get(state.radarPossibilidades, "evt_list", []),
  vendor: get(state.radarPossibilidades, "vendor", "[N/A]"),
  ot_element_a: get(state.radarPossibilidades, "response.ot_element_a") || {},
  ot_element_b: get(state.radarPossibilidades, "response.ot_element_b") || {},
  ot_speed: get(state.radarPossibilidades, "response.ot_speed") || {},
  ot_segmentation:
    get(state.radarPossibilidades, "response.ot_segmentation") || {}
});

export default connect(mapStateToProps)(formWrapper);
