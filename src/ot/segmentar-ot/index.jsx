import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

import {
  getSegmentarData,
  getElementTypes,
  getElementId,
  getEnderecoId
} from "./actions";
import "./form.css";

const SelectTipoElemento = connect(() => ({}))(
  ({
    input: { onChange },
    tipoElemento,
    tipoElementoSelecionado,
    className
  }) => {
    const [list, setList] = React.useState([]);
    React.useEffect(() => {
      if (tipoElemento) {
        setList(tipoElemento);
      }
    }, [tipoElemento]);
    return (
      <select
        value={tipoElementoSelecionado}
        onChange={onChange}
        className={className}
      >
        <option value="">Selecione</option>
        {list.map((tipo, index) => (
          <option key={index} value={tipo.element_type}>
            {tipo.element_type}
          </option>
        ))}
      </select>
    );
  }
);

const DisabledInput = ({ name, label }) => (
  <>
    <label htmlFor={name}>{label}</label>
    <Field
      className="form-control input-sm"
      name={name}
      id={name}
      component="input"
      disabled
    />
  </>
);

const RequiredSelect = ({ name, label, onChange, children }) => (
  <>
    <label htmlFor={name}>{label}</label>
    <Field
      className="form-control input-sm"
      name={name}
      id={name}
      component="select"
      onChange={onChange}
    >
      {children}
    </Field>
  </>
);

const Segmentar = ({ regional, redundancia, speed, setLoading }) => {
  const [tipoElemento, setTipoElemento] = React.useState([]);
  const [regionalSelecionado, setRegionalSelecionado] = React.useState("");
  const [tipoElementoSelecionado, setTipoElementoSelecionado] = React.useState(
    ""
  );
  const [elemento, setElemento] = React.useState([]);
  const [endereco, setEndereco] = React.useState([]);
  const [enderecoText, setEnderecoText] = React.useState("");

  const [atendimentoA, setAtendimentoA] = React.useState("");
  const [atendimentoB, setAtendimentoB] = React.useState("");
  const [enviarParaListA, setEnviarParaListA] = React.useState([]);
  const [enviarParaListB, setEnviarParaListB] = React.useState([]);

  return (
    <main className="fade-in fade-out">
      <form className="form segmentar-ot-form">
        <section className="col-md-2">
          <div className="box-body">
            <div className="box-header with-border">
              <h3 className="box-title">Ponto A</h3>
            </div>
            <DisabledInput name="regionalA" label="Regional" />
            <DisabledInput name="tipoElementoA" label="Tipo Elemento" />
            <DisabledInput name="elementoIdA" label="Elemento ID" />
            <DisabledInput name="enderecoIdA" label="Endereço ID" />
            <p>{formValues.enderecoA}</p>
            <DisabledInput name="interfaceA" label="Interface" />
          </div>
        </section>
        <section className="col-md-3">
          <div className="box-body">
            <div className="box-header with-border">
              <h3 className="box-title">Link Pontos A-Novo</h3>
            </div>
            <div className="velocidade-container">
              <Field
                className="form-control input-sm qtd-input"
                name="qtdLinksA"
                id="qtdLinksA"
                component="input"
              />
              <span className="velocidade-span">link(s) de</span>
              <Field
                className="form-control input-sm"
                name="speedA"
                id="speedA"
                component="select"
              >
                <option value="">Selecione</option>
                {speed.map(speed => (
                  <option key={speed.id} value={speed.id}>
                    {speed.name}
                  </option>
                ))}
              </Field>
            </div>

            <Field
              className="form-control input-sm"
              name="redundancyA"
              id="redundancyA"
              component="select"
            >
              {redundancia.map(redundancia => (
                <option key={redundancia.id} value={redundancia.id}>
                  {redundancia.name}
                </option>
              ))}
            </Field>

            <label htmlFor="atendimentoA">Atendimento</label>
            <Field
              className="form-control input-sm"
              name="atendimentoA"
              id="atendimentoA"
              component="select"
              onChange={event => {
                setAtendimentoA(event.target.value);
              }}
            >
              <option value="">Selecione</option>
              <option value="LL">LL</option>
            </Field>
            {atendimentoA === "LL" && (
              <>
                <label htmlFor="tipoLLA">Tipo de LL</label>
                <Field
                  className="form-control input-sm"
                  name="tipoLLA"
                  id="tipoLLA"
                  component="select"
                  onChange={event => {
                    const tipoSelecionado = event.target.value;
                    if (tipoSelecionado === "") {
                      console.log("vazio");
                      setEnviarParaListA([]);
                    } else if (
                      tipoSelecionado === "LL ADSL" ||
                      tipoSelecionado === "UPGRADE"
                    ) {
                      setEnviarParaListA([{ id: 120, name: "TEF" }]);
                    } else {
                      setEnviarParaListA([
                        { id: 120, name: "TEF" },
                        { id: 99, name: "FACILITY LL" }
                      ]);
                    }
                  }}
                >
                  <option value="">Selecione</option>
                  {tiposLL.map((tipo, index) => (
                    <option key={index} value={tipo}>
                      {tipo}
                    </option>
                  ))}
                </Field>

                <label htmlFor="enviarParaA">Enviar Para</label>
                <Field
                  className="form-control input-sm"
                  name="enviarParaA"
                  id="enviarParaA"
                  component="select"
                >
                  <option value="">Selecione</option>
                  {enviarParaListA.map(enviar => (
                    <option key={enviar.id} value={enviar.id}>
                      {enviar.name}
                    </option>
                  ))}
                </Field>
              </>
            )}

            <label htmlFor="obsA">Observação</label>
            <Field
              className="form-control input-sm"
              name="obsA"
              id="obsA"
              component="textarea"
              rows="4"
            />
          </div>
        </section>
        <section className="col-md-2">
          <div className="box-body">
            <div className="box-header with-border">
              <h3 className="box-title">Novo Ponto</h3>
            </div>
            <RequiredSelect
              name="regional"
              label="Regional"
              onChange={event => {
                setLoading(true);
                setTipoElemento([]);
                setTipoElementoSelecionado("");
                setElemento([]);
                setEndereco([]);
                setEnderecoText("");
                setRegionalSelecionado(event.target.value);
                const tipo = getElementTypes(event.target.value);
                tipo
                  .then(({ elementType }) => {
                    setTipoElemento(elementType);
                  })
                  .catch(() => {
                    console.log("falha");
                  })
                  .finally(() => {
                    setLoading(false);
                  });
              }}
            >
              <option value="">Selecione</option>
              {regional.map(regional => (
                <option key={regional.operator_id} value={regional.operator}>
                  {regional.operator}
                </option>
              ))}
            </RequiredSelect>

            {/* TODO: Tentar usar o componente generico para tipoElemento mantendo a funcionalidade de apagar o valor selecionado quando a lista atualizar */}
            <label htmlFor="tipoElemento">Tipo Elemento</label>
            <Field
              className="form-control input-sm"
              name="tipoElemento"
              id="tipoElemento"
              component={SelectTipoElemento}
              setLoading={setLoading}
              tipoElemento={tipoElemento}
              tipoElementoSelecionado={tipoElementoSelecionado}
              onChange={event => {
                setLoading(true);

                setElemento([]);
                setEndereco([]);
                setEnderecoText("");

                setTipoElementoSelecionado(event.target.value);
                const id = getElementId(
                  regionalSelecionado,
                  event.target.value
                );
                id.then(({ elementId }) => {
                  setElemento(elementId);
                })
                  .catch(() => {
                    console.log("falha");
                  })
                  .finally(() => {
                    setLoading(false);
                  });
              }}
            />

            <RequiredSelect
              name="elementoId"
              label="Elemento ID"
              onChange={event => {
                setLoading(true);
                setEndereco([]);
                setEnderecoText("");
                const id = getEnderecoId(
                  regionalSelecionado,
                  tipoElementoSelecionado,
                  event.target.value
                );
                id.then(({ enderecoId }) => {
                  setEndereco(enderecoId);
                })
                  .catch(() => {
                    console.log("falha");
                  })
                  .finally(() => {
                    setLoading(false);
                  });
              }}
            >
              <option value="">Selecione</option>
              {elemento.map(element => (
                <option key={element.id} value={element.elemento_id}>
                  {element.elemento_id}
                </option>
              ))}
            </RequiredSelect>

            <RequiredSelect
              name="enderecoId"
              label="Endereço ID"
              onChange={event => {
                const enderecoSelecionado = event.target.value;
                const enderecoString = endereco.map(todo => {
                  const enderecoEquipamento = todo.address
                    ? todo.address.endereco_equipamento
                    : "";
                  return todo.endereco_id === enderecoSelecionado
                    ? `${enderecoEquipamento} ${todo.city} - ${todo.state}`
                    : "";
                });
                setEnderecoText(enderecoString);
              }}
            >
              <option value="">Selecione</option>
              {endereco.map(endereco => (
                <option key={endereco.id} value={endereco.endereco_id}>
                  {endereco.endereco_id}
                </option>
              ))}
            </RequiredSelect>

            <p>{enderecoText}</p>

            <RequiredSelect name="interface" label="Interface">
              <option value="">Selecione</option>
              {interfaces.map((interfaces, index) => (
                <option key={index} value={interfaces}>
                  {interfaces}
                </option>
              ))}
            </RequiredSelect>
          </div>
        </section>
        <section className="col-md-3">
          <div className="box-body">
            <div className="box-header with-border">
              <h3 className="box-title">Link Pontos Novo-B</h3>
            </div>
            <div className="velocidade-container">
              <Field
                className="form-control input-sm qtd-input"
                name="qtdLinksB"
                id="qtdLinksB"
                component="input"
              />
              <span className="velocidade-span">link(s) de</span>
              <Field
                className="form-control input-sm"
                name="speedB"
                id="speedB"
                component="select"
              >
                <option value="">Selecione</option>
                {speed.map(speed => (
                  <option key={speed.id} value={speed.id}>
                    {speed.name}
                  </option>
                ))}
              </Field>
            </div>

            <Field
              className="form-control input-sm"
              name="redundancyB"
              id="redundancyB"
              component="select"
            >
              {redundancia.map(redundancia => (
                <option key={redundancia.id} value={redundancia.id}>
                  {redundancia.name}
                </option>
              ))}
            </Field>

            <label htmlFor="atendimentoB">Atendimento</label>
            <Field
              className="form-control input-sm"
              name="atendimentoB"
              id="atendimentoB"
              component="select"
              onChange={event => {
                setAtendimentoB(event.target.value);
              }}
            >
              <option value="">Selecione</option>
              <option value="LL">LL</option>
            </Field>
            {atendimentoB === "LL" && (
              <>
                <label htmlFor="tipoLLB">Tipo de LL</label>
                <Field
                  className="form-control input-sm"
                  name="tipoLLB"
                  id="tipoLLB"
                  component="select"
                  onChange={event => {
                    const tipoSelecionado = event.target.value;
                    if (tipoSelecionado === "") {
                      setEnviarParaListB([]);
                    } else if (
                      tipoSelecionado === "LL ADSL" ||
                      tipoSelecionado === "UPGRADE"
                    ) {
                      setEnviarParaListB([{ id: 120, name: "TEF" }]);
                    } else {
                      setEnviarParaListB([
                        { id: 120, name: "TEF" },
                        { id: 99, name: "FACILITY LL" }
                      ]);
                    }
                  }}
                >
                  <option value="">Selecione</option>
                  {tiposLL.map((tipo, index) => (
                    <option key={index} value={tipo}>
                      {tipo}
                    </option>
                  ))}
                </Field>

                <label htmlFor="enviarParaB">Enviar Para</label>
                <Field
                  className="form-control input-sm"
                  name="enviarParaB"
                  id="enviarParaB"
                  component="select"
                >
                  <option value="">Selecione</option>
                  {enviarParaListB.map(enviar => (
                    <option key={enviar.id} value={enviar.id}>
                      {enviar.name}
                    </option>
                  ))}
                </Field>
              </>
            )}

            <label htmlFor="obsB">Observação</label>
            <Field
              className="form-control input-sm"
              name="obsB"
              id="obsB"
              component="textarea"
              rows="4"
            />
          </div>
        </section>
        <section className="col-md-2">
          <div className="box-body">
            <div className="box-header with-border">
              <h3 className="box-title">Ponto B</h3>
            </div>
            <DisabledInput name="regionalB" label="Regional" />
            <DisabledInput name="tipoElementoB" label="Tipo Elemento" />
            <DisabledInput name="elementoIdB" label="Elemento ID" />
            <DisabledInput name="enderecoIdB" label="Endereço ID" />
            <p>{formValues.enderecoB}</p>
            <DisabledInput name="interfaceB" label="Interface" />
          </div>
        </section>
      </form>
    </main>
  );
};

const Form = reduxForm({ form: "segmentarOtForm" })(Segmentar);

const SegmentarForm = ({ seg_id, setLoading }) => {
  const [initialValues, setInitialValues] = React.useState({});
  const [regional, setRegional] = React.useState([]);
  const [redundancia, setRedundancia] = React.useState([]);
  const [speed, setSpeed] = React.useState([]);

  React.useEffect(() => {
    setLoading(true);
    const segmentos = getSegmentarData(seg_id);
    segmentos
      .then(({ data, optionsData, regionalData }) => {
        setFormValues(data);
        setInitialValues(formValues);
        setRegional(regionalData);
        setRedundancia(optionsData.redundancy);
        setSpeed(optionsData.speed);
      })
      .catch(() => {
        console.log("erro");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <Form
      initialValues={initialValues}
      regional={regional}
      redundancia={redundancia}
      speed={speed}
      setLoading={setLoading}
      enableReinitialize
    />
  );
};

const formValues = {
  regionalA: "",
  tipoElementoA: "",
  elementoIdA: "",
  enderecoIdA: "",
  enderecoA: "",
  interfaceA: "",
  regionalB: "",
  tipoElementoB: "",
  elementoIdB: "",
  enderecoIdB: "",
  enderecoB: "",
  interfaceB: "",
  speedA: "",
  redundancyA: "",
  qtdLinksA: "",
  atendimentoA: "",
  speedB: "",
  redundancyB: "",
  qtdLinksB: "",
  atendimentoB: "",
  tipoLLA: "",
  enviarParaA: "",
  tipoLLB: "",
  enviarParaB: "",
  id_seg: ""
};

const setFormValues = data => {
  formValues.regionalA = data.ot_seg.virtual_attributes.element_a.operator;
  formValues.tipoElementoA =
    data.ot_seg.virtual_attributes.element_a.element_type;
  formValues.elementoIdA = data.ot_seg.virtual_attributes.element_a.elemento_id;
  formValues.enderecoIdA = data.ot_seg.virtual_attributes.element_a.endereco_id;
  formValues.enderecoA = `${data.ot_seg.virtual_attributes.element_a.address.endereco_equipamento} ${data.ot_seg.virtual_attributes.element_a.city} - ${data.ot_seg.virtual_attributes.element_a.state}`;
  formValues.interfaceA = data.ot_seg.attributes.element_a_interface;

  formValues.regionalB = data.ot_seg.virtual_attributes.element_b.operator;
  formValues.tipoElementoB =
    data.ot_seg.virtual_attributes.element_b.element_type;
  formValues.elementoIdB = data.ot_seg.virtual_attributes.element_b.elemento_id;
  formValues.enderecoIdB = data.ot_seg.virtual_attributes.element_b.endereco_id;
  formValues.enderecoB = `${data.ot_seg.virtual_attributes.element_b.address.endereco_equipamento} ${data.ot_seg.virtual_attributes.element_b.city} - ${data.ot_seg.virtual_attributes.element_b.state}`;
  formValues.interfaceB = data.ot_seg.attributes.element_b_interface;

  formValues.speedA = data.ot_seg.virtual_attributes.ot_speed.id;
  formValues.speedB = data.ot_seg.virtual_attributes.ot_speed.id;
  formValues.redundancyA = data.ot_seg.virtual_attributes.ot_redundancy.id;
  formValues.redundancyB = data.ot_seg.virtual_attributes.ot_redundancy.id;
  formValues.qtdLinksA = data.ot_seg.attributes.qtd_links;
  formValues.qtdLinksB = data.ot_seg.attributes.qtd_links;

  formValues.id_seg = data.ot_seg.attributes.id;
};

const interfaces = [
  "Ethernet Fast",
  "Ethernet GB Eletrica",
  "Ethernet GB Optica Mono",
  "Ethernet GB Optica Multi",
  "G703/G704 Eletrica",
  "STM-m Eletrica",
  "STM-n Optica Mono",
  "STM-n Optica Multi",
  "Interconex",
  "V35"
];

const tiposLL = ["LL", "LL ADSL", "LL SATELITE", "UPGRADE"];

export default SegmentarForm;
