import React from "react";
import { Field, reduxForm, reset } from "redux-form";
import { connect } from "react-redux";
import get from "lodash/get";
import { IconButton } from "common";
import { Row, FieldComp, LabelComp } from "../../comps/componentesUsaveis";
import { getSelectOptions, getAgrupadorByCode } from "./action";
import { redes } from "./columns.json";

import "./styles.css";

const Filtro = ({
  setLoading,
  setRowsTabela,
  agrupadores,
  dispatch,
  network,
  setRowsResponse
}) => {
  const [regionalList, setRegionalList] = React.useState([]);
  const [provedorList, setProvedorList] = React.useState([]);
  const [agrupadorList, setAgrupadorList] = React.useState([]);

  React.useEffect(() => {
    setLoading(true);
    getSelectOptions(1000000000, 1000000000)
      .then(([{ regional, provedor }, grupo]) => {
        setRegionalList(regional);
        setProvedorList(provedor);
        setAgrupadorList(grupo);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, []);

  const makeRequest = filter => {
    setLoading(true);
    getAgrupadorByCode(filter)
      .then(res => {
        // console.log("@@@@@", res);
        setRowsTabela(
          res.data[0].map(r => ({
            id: r.id,
            rede: r.network,
            agrupador: r.name,
            regional: r.operator.regional,
            regionalId: r.operator.id,
            provedor: r.vendor.name,
            provedorId: r.vendor.id,
            status: r.status.description,
            statusId: r.status.id,
            iniMedicao: r.month_begin,
            fimMedicao: r.month_end,
            competencia: r.competence,
            dataEmissao: r.order_at,
            dataVencimento: r.deadline_at,
            dataCorte: r.date_curt,
            ni: r.ni,
            ncon: r.ncon,
            naprov: r.naprov,
            monthIni: r.validate_month_ini,
            monthEnd: r.validate_month_end,
            cost: r.cost_center,
            entryDate: r.entry_date,
            availableDd: r.available_dd
          }))
        );
        setRowsResponse(res.data[0]);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  };

  return (
    <form className="form">
      <div style={{ display: "flex" }} id="FiltroEVTs">
        <div className="col-md-10">
          <Row>
            <FieldComp
              name="operator_id"
              component="select"
              text="Regional"
              parse={value => parseInt(value, 10)}
            >
              <option value="">Selecione</option>
              {regionalList.map((data, i) => (
                <option key={i} value={data.value}>
                  {data.text}
                </option>
              ))}
            </FieldComp>
            <FieldComp
              name="vendor_id"
              component="select"
              text="Provedor"
              parse={value => parseInt(value, 10)}
            >
              <option value="">Selecione</option>
              {provedorList.map((data, i) => (
                <option key={i} value={data.value}>
                  {data.text}
                </option>
              ))}
            </FieldComp>
            <FieldComp
              name="group"
              component="select"
              text="Agrupador"
              parse={value => parseInt(value, 10)}
            >
              <option value="">Selecione</option>
              {agrupadorList.map((data, i) => (
                <option key={i} value={data.value}>
                  {data.text}
                </option>
              ))}
            </FieldComp>
            <FieldComp name="network" component="select" text="Rede">
              <option value={network}>Selecione</option>
              {redes.map((data, i) => (
                <option key={i} value={data.value}>
                  {data.text}
                </option>
              ))}
            </FieldComp>
          </Row>
        </div>
        <div
          className="col-md-2"
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <IconButton
            icon="search"
            title="Filtrar"
            onClick={() => {
              // setLoading(true);
              makeRequest(agrupadores);
            }}
          />
          <IconButton
            icon="eraser"
            title="Limpar"
            onClick={() => dispatch(reset("FiltroListarAgrupadores"))}
          />
        </div>
      </div>
    </form>
  );
};

Filtro.defaultProps = {
  network: ""
};

const mapStateToProps = ({ form }) => ({
  agrupadores: get(form.FiltroListarAgrupadores, "values", null)
});

const formWrapper = reduxForm({
  form: "FiltroListarAgrupadores"
})(Filtro);

export default connect(mapStateToProps)(formWrapper);
