import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { toastr } from "react-redux-toastr";

import ModalForm from "../../../common/layout/modal";
import Row from "../../../common/layout/row";
import Select from "./select";

import {
  clear_filter,
  get_bill_conc_lot,
} from "../actions";

import { LabelField } from "common/form/components";

const FiltroLotes = props => {

  const {
    reducer: {
      months,
      // groups,
      operators,
      provedor,
      status,
    },
    // actions
    clear_filter,
    get_bill_conc_lot,
    setHandleReload,
    setReloadData
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
  // const agrupadores = groups.map(g => ({ value: g.id, text: g.name }));
  const provedores = provedor.map(v => ({ value: v.name, text: v.name }));
  const regional = operators.map(o => ({ value: o.id, text: o.regional }));
  const statuses = status.map(s => ({ value: s.id, text: s.description }));

  const handleSubmit = () => {

    const {
      filtroLotesForm: {
        values,
      }
    } = props;

    let canSubmit = true;

    /*
    if ((values.bill_month && values.bill_month !== "false") || (values.competence_month && values.competence_month !== "false"))
      canSubmit = true;
    */

    if (canSubmit) {

      let data = {
        data: {
          ...values
        },
        code_action: "DR_COF1H1_LOTE",
      };

      Object.entries(data.data).forEach(([key, value]) => {
        if (data.data[key] === "false")
          delete data.data[key]
      });

      get_bill_conc_lot(data);
      setHandleReload(() => get_bill_conc_lot)
      setReloadData(data)
      j("#filtro-lotes").modal("hide");

    } else {
      toastr.error("Não foi possível realizar a pesquisa. Preencha pelo menos um dos campos de data.");
    }

  };

  const FilterFooter = (
    <div>
      <a
        className="btn btn-primary btn-sm"
        onClick={() => clear_filter("filtroLotes")}
      >
        <i className="fa fa-eraser" />&nbsp; Limpar
      </a>
      <a
        className="btn btn-primary btn-sm"
        onClick={() => handleSubmit()}
      >
        <i className="fa fa-refresh" />&nbsp; Buscar
      </a>
    </div>
  );

  return (
    <div>
      <form>
        <ModalForm
          LabelButtonSubmit="Filtro &mdash; Lotes Gerados"
          id="filtro-lotes"
          title="Filtro &mdash; Lotes Gerados"
          dimension="modal-filtro-contestacao"
          height="24vw"
          footer={FilterFooter}
        >
          <Row>
            <div className="col-md-6">
              <Field
                cols="12"
                label="Mês de Referência"
                name="mes_ref"
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
                label="Data Geração Lote"
                name="agrupador"
                component={LabelField}
                // data={}
                type="text"
              />
              <Field
                cols="12"
                label="Status"
                name="status_id"
                component={Select}
                data={statuses}
                type="select"
              />
            </div>
            <div className="col-md-6">
              <Field
                cols="12"
                label="Lote"
                name="lote"
                component={LabelField}
                // data={}
                type="text"
              />
              <Field
                cols="12"
                label="Provedor"
                name="vendor"
                component={Select}
                data={provedores}
                type="select"
              />
              <Field
                cols="12"
                label="Rede"
                name="network"
                component={Select}
                data={networkTypes}
                type="select"
              />
            </div>
          </Row>
        </ModalForm>
      </form>
    </div>
  );
}

const form = reduxForm({ "form": "filtroLotes" })(FiltroLotes);

const mapStateToProps = state => ({
  auth: state.auth,
  reducer: state.contestacaoReducer,
  filtroLotesForm: state.form.filtroLotes,
  initialValues: {
    enableReinitialize: true,
  },
});

const mapDispatchToProps = dispatch => bindActionCreators({
  clear_filter,
  get_bill_conc_lot,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(form);
