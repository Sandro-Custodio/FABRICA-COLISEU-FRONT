import "./style.css";

import { Field, reduxForm, reset } from "redux-form";
import { Input, TextArea } from "common/input";

import IconButton from "common/iconButton";
import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import get from "lodash/get";
import { toastr } from "react-redux-toastr";
import moment from "moment";

const FiltroLL = ({
  setRows,
  dispatch,
  propsLL,
  rede,
  area: { code, id, operator_id },
  setLoading,
  enableFilterButton
}) => {
  const getAllActiveLLsByFilter = () => {
    const data = {
      parameters: { ...propsLL, rede },
      area: { code, id, operator_id },
      page: 1,
      qtd: 100
    };
    setLoading(true);
    axios
      .post("ot_leasedlines/get_all_active_lls_by_filter", data)
      .then(res => {
        console.log("Res", res)

        const rows = res.data[0].map(row => ({
          ...row,
          data_ativacao: row.data_ativacao
            ? moment(row.data_ativacao).format("DD/MM/YYYY")
            : ""
        }));
        setRows(rows);
      })
      .catch(e => {
        if (e.response.data.errors) {
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
    <>
      <strong style={{ color: "blue", marginLeft: 15 }}>Filtro de LL</strong>
      <div style={{ display: "flex" }}>
        <div className="col-md-3">
          <Field name="circuito_id" text="Circuito ID" component={TextArea} placeholder="Circuitos separados por ;" />
        </div>
        <div
          className="col-md-3"
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column"
          }}
        >
          <strong style={{ color: "red", fontSize: 13 }}>
            Resultado Limitados aos 100 primeiros.
          </strong>
          <label>Ponta A/B</label>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Field name="elemento_id_a" component={Input} />
            <strong style={{ margin: "0 5px" }}>/</strong>
            <Field name="elemento_id_b" component={Input} />
          </div>
        </div>

        <div className="col-md-3">
          <Field name="ot_code" text="Código OT" component={TextArea} placeholder="Códigos OT separados por ;" />
        </div>
        <div
          className="col-md-3"
          style={{
            display: "flex"
          }}
        >
          <IconButton
            icon="search"
            title="Filtrar"
            onClick={getAllActiveLLsByFilter}
            disabled={!enableFilterButton}
          />
          <IconButton
            icon="eraser"
            title="Limpar"
            onClick={() => {
              dispatch(reset("createODS"));
              dispatch(reset("filtroLLWrapper"));
            }}
          />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = state => ({
  propsLL: get(state, "form.filtroLLWrapper.values", {}),
  rede: get(state, "form.createODS.values.rede", ""),
  area: get(state, "auth.user.area", "")
});

const formWrapper = reduxForm({
  form: "filtroLLWrapper"
})(FiltroLL);

export default connect(mapStateToProps)(formWrapper);
