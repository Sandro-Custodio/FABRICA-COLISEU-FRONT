import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { toastr } from "react-redux-toastr";

import ModalForm from "../../../common/layout/modal";
import Row from "../../../common/layout/row";
import Select from "./select";

import { clear_filter, get_bills_contestations } from "../actions";

import { get_groups } from "../../../relatorios/actions";

const FiltroContestacao = props => {
  const {
    reducer: { months, groups, operators, vendors },
    // actions
    clear_filter,
    get_bills_contestations,
    get_groups
  } = props;

  const [submitting, setSubmitting] = React.useState(false);

  const j = dom => window.$(dom);

  const networkTypes = [
    { value: "FIXA", text: "FIXA" },
    { value: "MÓVEL", text: "MÓVEL" },
    { value: "FIBER", text: "FIBER" }
  ];

  const loteTypes = [
    { value: 1, text: "LOTE GERADO" },
    { value: 2, text: "LOTE NÃO GERADO" }
  ];

  const costCenterTypes = [
    { value: "LL", text: "LL" },
    { value: "LM", text: "LM" }
  ];

  const meses = months.map(m => ({ value: m.mes, text: m.mes }));
  const agrupadores = groups.map(g => ({ value: g.id, text: g.name }));
  const provedores = vendors.map(v => ({ value: v.id, text: v.name }));
  const regional = operators.map(o => ({ value: o.id, text: o.regional }));

  const handleSubmit = () => {
    clear_filter();

    const {
      filtroContestacaoForm: { values }
    } = props;

    let canSubmit = false;

    if (
      (values.bill_month && values.bill_month !== "false") ||
      (values.competence_month && values.competence_month !== "false")
    )
      canSubmit = true;

    if (canSubmit) {
      let data = {
        operator_id: values.regional,
        group_id: values.agrupador,
        network: values.network,
        vendor_id: values.provedor,
        lote: values.bill_conc_lot_code,
        mes_ref: values.bill_month,
        tipo_mercado: values.bill_group_cost_center,
        competence_month: values.competence_month,
        page: 1,
        per_page: 100,
        code_act: "DR_COF1H1"
      };

      Object.entries(data).forEach(([key, value]) => {
        if (data[key] === "false") delete data[key];
      });

      get_bills_contestations(data);

      j("#filtro-contestacao").modal("hide");
    } else {
      toastr.error(
        "Não foi possível realizar a pesquisa. Preencha pelo menos um dos campos de data."
      );
    }
  };

  const handleChange = () => {
    const rede = document.getElementById("rede").value;
    const provedor = document.getElementById("provedor").value;
    const regional = document.getElementById("regional").value;
    let values = [provedor, regional, rede];
    for (let i = 0; i < values.length; i++) {
      if (i == 2) {
        if (values[i] === "false") {
          values[i] = "";
        }
      } else if (values[i] === "false") {
        values[i] = 1000000000;
      }
    }
    get_groups(values[0], values[1], values[2]);
  };

  const FilterFooter = (
    <div>
      <a className="btn btn-primary btn-sm" onClick={() => clear_filter()}>
        <i className="fa fa-eraser" />
        &nbsp; Limpar
      </a>
      <a className="btn btn-primary btn-sm" onClick={() => handleSubmit()}>
        <i className="fa fa-refresh" />
        &nbsp; Buscar
      </a>
    </div>
  );

  return (
    <div>
      <form>
        <ModalForm
          LabelButtonSubmit="Filtro &mdash; Contestação"
          id="filtro-contestacao"
          title="Filtro &mdash; Contestação"
          dimension="modal-filtro-contestacao"
          height="24vw"
          footer={FilterFooter}
        >
          <Row>
            <div className="col-md-6">
              <Field
                cols="12"
                label="Mês de Referência"
                name="bill_month"
                component={Select}
                data={meses}
                type="select"
              />
              <Field
                cols="12"
                label="Mês de Competência"
                name="competence_month"
                component={Select}
                data={meses}
                type="select"
              />
              <Field
                cols="12"
                label="Agrupador"
                name="agrupador"
                component={Select}
                data={agrupadores}
                type="select"
              />
              <Field
                cols="12"
                label="Lote"
                name="bill_conc_lot_code"
                component={Select}
                data={loteTypes}
                type="select"
              />
            </div>
            <div className="col-md-6">
              <Field
                cols="12"
                label="Regional"
                name="regional"
                component={Select}
                data={regional}
                onChange={() => handleChange()}
                id="regional"
                type="select"
              />
              <Field
                cols="12"
                label="Provedor"
                name="provedor"
                component={Select}
                data={provedores}
                onChange={() => handleChange()}
                id="provedor"
                type="select"
              />
              <Field
                cols="12"
                label="Rede"
                name="network"
                component={Select}
                data={networkTypes}
                id="rede"
                type="select"
              />
              <Field
                cols="12"
                label="Tipo Mercado"
                name="bill_group_cost_center"
                component={Select}
                data={costCenterTypes}
                type="select"
              />
            </div>
          </Row>
        </ModalForm>
      </form>
    </div>
  );
};

const form = reduxForm({ form: "filtroContestacao" })(FiltroContestacao);

const mapStateToProps = state => ({
  auth: state.auth,
  reducer: state.contestacaoReducer,
  filtroContestacaoForm: state.form.filtroContestacao,
  initialValues: {
    enableReinitialize: true
  }
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      clear_filter,
      get_bills_contestations,
      get_groups
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(form);
