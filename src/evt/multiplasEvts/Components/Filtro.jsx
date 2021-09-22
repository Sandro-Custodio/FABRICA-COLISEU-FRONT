import React, { useState } from "react";
import { Field, reduxForm, reset } from "redux-form";
import { connect } from "react-redux";
import axios from "axios";
import get from "lodash/get";
import { TextArea } from "common/input";
import { IconButton, Modal } from "common";
import { toastr } from "react-redux-toastr";
import Modelo from "./Modelo";
import "./styles.css";

const Filtro = ({ evts, ots, setLoading, dispatch, setRows }) => {
  const [open, setOpen] = useState(false);
  const getEvtByCode = () => {
    let data = {};
    if (evts !== null) {
      const evtsArray = evts.replace(/\s/g, "").split(";")
      data = { ...data, evts: evtsArray };
    }
    if (ots !== null) {
      const otsArray = ots.replace(/\s/g, "").split(";")
      data = { ...data, ots: otsArray };
    }
    if (evts === null && ots === null) {
      toastr.warning("Atenção", "Pelo menos um campo deve ser preeenchido!");
    } else {
      setLoading(true);
      axios
        .post("evts/get_evt_by_code", data)
        .then(res => {
          setRows(res.data);
        })
        .catch(e => {
          if (e.response.data.errors) {
            e.response.data.errors.forEach(error =>
              toastr.error("Erro", error)
            );
          } else if (e.request) {
            if (e.message === "Network Error") {
              toastr.error("Erro", "Servidor OFFLINE");
            }
          }
        })
        .finally(() => setLoading(false));
    }
  };

  return (
    <>
      <div style={{ display: "flex" }} id="FiltroEVTs">
        <Field
          name="ots"
          component={TextArea}
          text="Código OT"
          containerProps={{ className: "col-md-5" }}
        />
        <Field
          name="evts"
          component={TextArea}
          text="Código EVT"
          containerProps={{ className: "col-md-5" }}
        />
        <div
          className="col-md-2"
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <IconButton icon="search" title="Filtrar" onClick={getEvtByCode} />
          <IconButton
            icon="eraser"
            title="Limpar"
            onClick={() => dispatch(reset("FiltroMultEvts"))}
          />
        </div>
      </div>

      <strong>
        Clique no ícone para visualizar as intruções de preenchimento da
        planilha de resposta.
      </strong>
      <Modal
        open={open}
        dimension="lg"
        title="Modelo"
        onClose={() => {
          setOpen(false);
        }}
        height="65vh"
      >
        <Modelo />
      </Modal>
      <IconButton
        icon="info"
        title="Ajuda"
        onClick={() => {
          setOpen(true);
        }}
      />
    </>
  );
};

const mapStateToProps = ({ form }) => ({
  evts: get(form.FiltroMultEvts, "values.evts", null),
  ots: get(form.FiltroMultEvts, "values.ots", null)
});

const formWrapper = reduxForm({
  form: "FiltroMultEvts"
})(Filtro);

export default connect(mapStateToProps)(formWrapper);
