import React from "react";
import { Field, reduxForm, reset } from "redux-form";
import { connect } from "react-redux";
import axios from "axios";
import get from "lodash/get";
import { TextArea } from "common/input";
import { IconButton } from "common";
import { toastr } from "react-redux-toastr";
import { Label } from "common/form/components";

import "./styles.css";

const Row = ({ children }) => (
  <div
    className="row"
    style={{ display: "flex", justifyContent: "space-between" }}
  >
    {children}
  </div>
);

const FieldComp = ({ col, text, ...others }) => {
  return (
    <div className={`col-sm-${col}`}>
      {text && <label htmlFor={text}>{text}</label>}
      <Field
        className="form-control input-sm"
        type="text"
        component="input"
        {...others}
      />
    </div>
  );
};

FieldComp.defaultProps = {
  col: 2
};

const LabelComp = ({ text, col }) => (
  <div className={`col-sm-${col}`}>
    <Label text={text} />
  </div>
);
LabelComp.defaultProps = { col: 6 };

const Filtro = ({
  evts,
  setLoading,
  dispatch,
  setRows,
  regional,
  projeto,
  subProjeto,
  setRowsSalvarBack
}) => {
  const getEvtByCode = filter => {
    const params = {
      0: filter
    };
    setLoading(true);
    axios
      .post("ot_segmentations/filter_ot_segments", params)
      .then(res => {
        // console.log("response Filtro otSegments!!!", res);
        setRows(
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
        setRowsSalvarBack(res.data);
        // setAdressA(res.data.map(n => n.address_a));
        // setAdressB(res.data.map(n => n.address_b));
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
      .finally(() => setLoading(false));
  };

  return (
    <form className="form">
      <div style={{ display: "flex" }} id="FiltroEVTs">
        <div className="col-md-10">
          <Row>
            <Field
              name="ot_code"
              component={TextArea}
              text="Código OT"
              containerProps={{ className: "col-md-3" }}
            />
            <FieldComp
              name="operator_id"
              component="select"
              text="Regional"
              parse={value => parseInt(value, 10)}
            >
              <option value="">Selecione</option>
              {regional.map((data, i) => (
                <option key={i} value={data.id}>
                  {data.regional}
                </option>
              ))}
            </FieldComp>
            <FieldComp
              name="project_id"
              component="select"
              text="Projeto"
              parse={value => parseInt(value, 10)}
            >
              <option value="">Selecione</option>
              {projeto.map((data, i) => (
                <option key={i} value={data.id}>
                  {data.name}
                </option>
              ))}
            </FieldComp>
            <FieldComp
              name="sub_project_id"
              component="select"
              text="Sub Projeto"
              parse={value => parseInt(value, 10)}
            >
              <option value="">Selecione</option>
              {subProjeto.map((data, i) => (
                <option key={i} value={data.id}>
                  {data.name}
                </option>
              ))}
            </FieldComp>
          </Row>
          <Row>
            <div
              className="col-sm-5"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <label>
                <LabelComp text="EVTs:" />
                <Field
                  name="include_evt"
                  component="input"
                  type="radio"
                  value="all"
                />
                Todas
              </label>
              <label>
                <Field
                  name="include_evt"
                  component="input"
                  type="radio"
                  value="hasEvt"
                />
                Possui EVTs
              </label>
              <label>
                <Field
                  name="include_evt"
                  component="input"
                  type="radio"
                  value="hasNotEvt"
                />
                Não Possui EVTs
              </label>
            </div>
          </Row>
        </div>
        <div
          className="col-md-2"
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <IconButton
            icon="search"
            title="Filtrar"
            onClick={() => getEvtByCode(evts)}
          />
          <IconButton
            icon="eraser"
            title="Limpar"
            onClick={() => dispatch(reset("FiltroMultEvts"))}
          />
        </div>
      </div>
    </form>
  );
};

const mapStateToProps = ({ form }) => {
  return {
    evts: get(form.FiltroMultEvts, "values", null),
    initialValues: {
      include_evt: "all"
    },
    enableReinitialize: true
  };
};

const formWrapper = reduxForm({
  form: "FiltroMultEvts"
})(Filtro);

export default connect(mapStateToProps)(formWrapper);
