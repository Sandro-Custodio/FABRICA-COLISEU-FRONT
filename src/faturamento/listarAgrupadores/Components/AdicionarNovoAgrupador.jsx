import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Select, Input } from "common/input";
import { Row } from "../../comps/componentesUsaveis";
import { redes } from "./columns.json";
import { getSelectOptions } from "./action";
import Grid from "common/layout/grid";
import { Label } from "common/form/components";
import get from "lodash/get";

const AdicionarAgrupador = ({
  setLoading,
  novoAgrupador,
  setParamsNovoAgrupador
}) => {
  const [regionalList, setRegionalList] = React.useState([]);
  const [provedorList, setProvedorList] = React.useState([]);

  React.useEffect(() => {
    setLoading(true);
    getSelectOptions(1000000000, 1000000000)
      .then(([{ regional, provedor }, grupo]) => {
        setRegionalList(regional);
        setProvedorList(provedor);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, []);

  const Section = ({ children }) => (
    <Grid>
      <div className="box box-primary">
        <div className="box-body">{children}</div>
      </div>
    </Grid>
  );

  const data = {
    ...novoAgrupador,
    available_dd: novoAgrupador.available_dd + novoAgrupador.available_dd_aux,
    month_begin: novoAgrupador.month_begin + novoAgrupador.month_begin_aux,
    month_end: novoAgrupador.month_end + novoAgrupador.month_end_aux,
    date_curt: novoAgrupador.date_curt + novoAgrupador.date_curt_aux,
    order_at: novoAgrupador.order_at + novoAgrupador.order_at_aux,
    deadline_at: novoAgrupador.deadline_at + novoAgrupador.deadline_at_aux,
    entry_date: novoAgrupador.entry_date + novoAgrupador.entry_date_aux,
    available_dd: novoAgrupador.available_dd + novoAgrupador.available_dd_aux
  };

  setParamsNovoAgrupador(data);

  const select = [
    {
      key: "1",
      name: "name",
      component: Input,
      cols: "1",
      label: "Agrupador",
      contentProps: "col-md-2"
    },
    {
      key: "2",
      name: "operator_id",
      data: regionalList,
      textKey: "text",
      valueKey: "value",
      component: Select,
      label: "Regional",
      contentProps: "col-md-2"
    },
    {
      key: "3",
      name: "vendor_id",
      data: provedorList,
      textKey: "text",
      valueKey: "value",
      component: Select,
      label: "Provedor",
      contentProps: "col-md-2"
    },
    {
      key: "4",
      name: "network",
      data: redes,
      textKey: "text",
      valueKey: "value",
      component: Select,
      label: "Rede",
      contentProps: "col-md-2"
    },
    {
      key: "5",
      name: "validate_month_ini",
      component: Input,
      cols: "1",
      placeholder: "MM/YYYY",
      label: "Validade (Início)",
      contentProps: "col-md-2"
    },
    {
      key: "6",
      name: "validate_month_end",
      component: Input,
      cols: "1",
      placeholder: "MM/YYYY",
      label: "Validade (Fim)",
      contentProps: "col-md-2"
    }
  ];
  const selectMedicao = [
    {
      key: "7",
      name: "month_begin",
      component: Input,
      cols: "1",
      label: "Início",
      type: "number",
      contentProps: "col-md-2"
    },
    {
      key: "8",
      name: "month_begin_aux",
      data: [
        { value: "/m-1", text: "m-1" },
        { value: "/m", text: "m" },
        { value: "/m+1", text: "m+1" }
      ],
      textKey: "text",
      valueKey: "value",
      label: " ",
      component: Select
    },
    {
      key: "9",
      name: "month_end",
      component: Input,
      cols: "1",
      type: "number",
      label: "Fim",
      contentProps: "col-md-2"
    },
    {
      key: "10",
      name: "month_end_aux",
      data: [
        { value: "/m-1", text: "m-1" },
        { value: "/m", text: "m" },
        { value: "/m+1", text: "m+1" }
      ],
      textKey: "text",
      valueKey: "value",
      label: " ",
      component: Select
    },
    {
      key: "11",
      name: "date_curt",
      component: Input,
      cols: "1",
      type: "number",
      label: "Corte",
      contentProps: "col-md-2"
    },
    {
      key: "12",
      name: "date_curt_aux",
      label: " ",
      data: [
        { value: "/m-1", text: "m-1" },
        { value: "/m", text: "m" },
        { value: "/m+1", text: "m+1" }
      ],
      textKey: "text",
      valueKey: "value",
      component: Select
    }
  ];
  const selectFatura = [
    {
      key: "13",
      name: "order_at",
      component: Input,
      cols: "1",
      type: "number",
      label: "Emissão",
      contentProps: "col-md-1"
    },
    {
      key: "14",
      name: "order_at_aux",
      data: [
        { value: "/m-1", text: "m-1" },
        { value: "/m", text: "m" },
        { value: "/m+1", text: "m+1" }
      ],
      textKey: "text",
      valueKey: "value",
      label: " ",
      component: Select
    },
    {
      key: "15",
      name: "deadline_at",
      component: Input,
      cols: "1",
      type: "number",
      label: "Vencimento",
      contentProps: "col-md-1"
    },
    {
      key: "16",
      name: "deadline_at_aux",
      data: [
        { value: "/m-1", text: "m-1" },
        { value: "/m", text: "m" },
        { value: "/m+1", text: "m+1" }
      ],
      textKey: "text",
      valueKey: "value",
      label: " ",
      component: Select
    },
    {
      key: "17",
      name: "entry_date",
      component: Input,
      type: "number",
      label: "Ent. no Gate",
      cols: "1",
      contentProps: "col-md-1"
    },
    {
      key: "18",
      name: "entry_date_aux",
      label: " ",
      data: [
        { value: "/m-1", text: "m-1" },
        { value: "/m", text: "m" },
        { value: "/m+1", text: "m+1" }
      ],
      textKey: "text",
      valueKey: "value",
      component: Select
    },
    {
      key: "19",
      name: "available_dd",
      component: Input,
      cols: "1",
      type: "number",
      label: "Disp. DD",
      contentProps: "col-md-2"
    },
    {
      key: "20",
      name: "available_dd_aux",
      label: " ",
      data: [
        { value: "/m-1", text: "m-1" },
        { value: "/m", text: "m" },
        { value: "/m+1", text: "m+1" }
      ],
      textKey: "text",
      valueKey: "value",
      component: Select
    },
    {
      key: "21",
      name: "competence",
      label: "Competência",
      data: [
        { value: "/m-1", text: "m-1" },
        { value: "/m", text: "m" },
        { value: "/m+1", text: "m+1" }
      ],
      textKey: "text",
      valueKey: "value",
      component: Select
    },
    {
      key: "22",
      name: "cost_center",
      label: "Tipo Mercado",
      data: [
        { value: "LL", text: "LL" },
        { value: "LM", text: "LM" }
      ],
      textKey: "text",
      valueKey: "value",
      component: Select
    }
  ];

  return (
    <form>
      <div className="box-body">
        <Section>
          <div
            style={{
              marginTop: 10,
              marginLeft: "0px"
            }}
          >
            <Row>
              {select.map(todo => (
                <Field {...todo} />
              ))}
            </Row>
          </div>
        </Section>
        <Section>
          <Row>
            <Label text="MEDIÇÃO" />
          </Row>
          <Row>
            {selectMedicao.map(todo => (
              <Field {...todo} />
            ))}
          </Row>
        </Section>
        <Section>
          <Row>
            <Label text="FATURA" />
          </Row>
          <Row>
            {selectFatura.map(todo => (
              <Field {...todo} />
            ))}
          </Row>
        </Section>
        <Section>
          <Row>
            <Label text="ALERTAS" />
          </Row>
          <Row>
            <div>
              <Label text="Ni" cols="1" />
              <Field name="ni" cols="6" component={Input} type="number" />
            </div>
            <div>
              <Label text="Ncon" cols="3" />
              <Field name="ncon" cols="6" component={Input} type="number" />
            </div>
            <div>
              <Label text="Naprov" cols="3" />
              <Field name="naprov" cols="6" component={Input} type="number" />
            </div>
          </Row>
        </Section>
      </div>
    </form>
  );
};

const formWrapper = reduxForm({
  form: "FiltroAdicionarAgrupador"
})(AdicionarAgrupador);

const mapStateToProps = ({ form: { FiltroAdicionarAgrupador } }) => ({
  novoAgrupador: get(FiltroAdicionarAgrupador, "values", {})
});

export default connect(mapStateToProps)(formWrapper);
