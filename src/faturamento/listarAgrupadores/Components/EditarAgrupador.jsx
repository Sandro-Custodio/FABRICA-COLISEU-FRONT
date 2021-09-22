import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Row } from "../../comps/componentesUsaveis";
import { Select, Input } from "common/input";
import { redes } from "./columns.json";
import { getSelectOptions } from "./action";
import Grid from "common/layout/grid";
import { Label } from "common/form/components";
import get from "lodash/get";

const EditarAgrupador = ({
  setLoading,
  edicaoAgrupador,
  setParamsEditarAgrupador,
  linhaSelecionada
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
    ...edicaoAgrupador,
    available_dd:
      edicaoAgrupador.available_dd + edicaoAgrupador.available_dd_aux,
    month_begin: edicaoAgrupador.month_begin + edicaoAgrupador.month_begin_aux,
    month_end: edicaoAgrupador.month_end + edicaoAgrupador.month_end_aux,
    date_curt: edicaoAgrupador.date_curt + edicaoAgrupador.date_curt_aux,
    order_at: edicaoAgrupador.order_at + edicaoAgrupador.order_at_aux,
    deadline_at: edicaoAgrupador.deadline_at + edicaoAgrupador.deadline_at_aux,
    entry_date: edicaoAgrupador.entry_date + edicaoAgrupador.entry_date_aux,
    available_dd:
      edicaoAgrupador.available_dd + edicaoAgrupador.available_dd_aux,
    id: linhaSelecionada.id
  };

  setParamsEditarAgrupador(data);

  const select = [
    {
      key: "1",
      name: "name",
      component: Input,
      cols: "1",
      label: "Agrupador"
    },
    {
      key: "2",
      name: "operator_id",
      data: regionalList,
      textKey: "text",
      valueKey: "value",
      component: Select,
      label: "Regional"
    },
    {
      key: "3",
      name: "vendor_id",
      data: provedorList,
      textKey: "text",
      valueKey: "value",
      component: Select,
      label: "Provedor"
    },
    {
      key: "4",
      name: "network",
      data: redes,
      textKey: "text",
      valueKey: "value",
      component: Select,
      label: "Rede"
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
      key: "9",
      name: "competence",
      label: "Competência",
      data: [
        { value: "m-1", text: "m-1" },
        { value: "m", text: "m" },
        { value: "m+1", text: "m+1" }
      ],
      textKey: "text",
      valueKey: "value",
      component: Select
    },
    {
      key: "10",
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
    <>
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
    </>
  );
};

const formWrapper = reduxForm({
  form: "FiltroEditarAgrupador"
})(EditarAgrupador);

const mapStateToProps = ({ form: { FiltroEditarAgrupador } }, props) => {
  const cost_center = get(props, "linhaSelecionada.cost");
  const operator_id = get(props, "linhaSelecionada.regionalId");
  const vendor_id = get(props, "linhaSelecionada.provedorId");
  const month_begin_aux = `/${
    get(props, "linhaSelecionada.iniMedicao").split("/")[1]
  }`;
  const month_end_aux = `/${
    get(props, "linhaSelecionada.fimMedicao").split("/")[1]
  }`;
  const date_curt_aux = `/${
    get(props, "linhaSelecionada.dataCorte").split("/")[1]
  }`;
  const order_at_aux = `/${
    get(props, "linhaSelecionada.dataEmissao").split("/")[1]
  }`;
  const deadline_at_aux = `/${
    get(props, "linhaSelecionada.dataVencimento").split("/")[1]
  }`;
  const entry_date_aux = `/${
    get(props, "linhaSelecionada.entryDate").split("/")[1]
  }`;
  const available_dd_aux = `/${
    get(props, "linhaSelecionada.availableDd").split("/")[1]
  }`;
  const competence = get(props, "linhaSelecionada.competencia");
  const name = get(props, "linhaSelecionada.agrupador");
  const network = get(props, "linhaSelecionada.rede");
  const validate_month_ini = get(props, "linhaSelecionada.monthIni");
  const validate_month_end = get(props, "linhaSelecionada.monthEnd");
  const month_begin = get(props, "linhaSelecionada.iniMedicao").split("/")[0];
  const month_end = get(props, "linhaSelecionada.fimMedicao").split("/")[0];
  const date_curt = get(props, "linhaSelecionada.dataCorte").split("/")[0];
  const order_at = get(props, "linhaSelecionada.dataEmissao").split("/")[0];
  const deadline_at = get(props, "linhaSelecionada.dataVencimento").split(
    "/"
  )[0];
  const entry_date = get(props, "linhaSelecionada.entryDate").split("/")[0];
  const available_dd = get(props, "linhaSelecionada.availableDd").split("/")[0];
  const ni = get(props, "linhaSelecionada.ni");
  const ncon = get(props, "linhaSelecionada.ncon");
  const naprov = get(props, "linhaSelecionada.naprov");

  // console.log("month_begin_aux", month_begin_aux);
  return {
    edicaoAgrupador: get(FiltroEditarAgrupador, "values", {}),
    initialValues: {
      cost_center,
      month_begin_aux,
      month_end_aux,
      date_curt_aux,
      order_at_aux,
      deadline_at_aux,
      ni,
      ncon,
      naprov,
      entry_date_aux,
      available_dd_aux,
      competence,
      name,
      available_dd,
      entry_date,
      deadline_at,
      order_at,
      date_curt,
      month_end,
      month_begin,
      validate_month_end,
      validate_month_ini,
      network,
      operator_id,
      vendor_id
    }
  };
};

export default connect(mapStateToProps)(formWrapper);
