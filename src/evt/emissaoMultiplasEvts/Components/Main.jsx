import React, { useState, useEffect } from "react";
import { IconButton, Card, Table } from "common";
import { reduxForm } from "redux-form";
import axios from "axios";
import { toastr } from "react-redux-toastr";
import { connect } from "react-redux";
import get from "lodash/get";
import { Label } from "common/form/components";
import { columns } from "../mock.json";
import Filtro from "./Filtro";
import EnvioDeEmailTabs from "./EnvioDeEmailTabs";
import EscolhaVendor from "./EscolhaVendor";
import UploadMultiplasEvts from "./UploadMultiplasEvts";

const Main = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [linhasSegselecionadas, setLinhasSegselecionadas] = useState([]);
  const [
    linhasSegselecionadasParaBackend,
    setLinhasSegselecionadasParaBackend
  ] = useState([]);
  const [linhasVendorselecionadas, setLinhasVendorselecionadas] = useState([]);
  const [regional, setRegional] = useState([]);
  const [projeto, setProjeto] = useState([]);
  const [linhasVendorsSelecionadas, setLinhasVendorsSelecionadas] = useState(
    []
  );
  const [subProjeto, setSubProjeto] = useState([]);
  const [open, setOpen] = useState(false);
  const [openModalEmail, setOpenModalEmail] = useState(false);
  const [selection, onSelectionChange] = React.useState([]);
  const [openModalUpload, setOpenModalUpload] = React.useState(false);
  const [linhasOpenModalUpload, setLinhasOpenModalUpload] = React.useState([]);
  const [rowsSalvarBack, setRowsSalvarBack] = useState([]);

  const LabelComp = ({ text, col }) => (
    <div className={`col-sm-${col}`}>
      <Label text={text} />
    </div>
  );
  LabelComp.defaultProps = { col: 6 };

  useEffect(() => {
    let data = {};
    axios
      .post("ots/get_filter_list", data)
      .then(res => {
        setRegional(res.data["operators"]);
        setProjeto(res.data["projects"]);
        setSubProjeto(res.data["sub_projects"]);
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
  }, []);

  const emitirEvt = () => {
    toastr.confirm(
      "Deseja criar EVT(s) para o(s) segmento(s) selecionado(s)?",
      {
        onOk: () => {
          setOpen(true);
          setLinhasSegselecionadas(selection.map(el => rows[el]));
          setLinhasSegselecionadasParaBackend(
            selection.map(el => rowsSalvarBack[el])
          );
        }
      }
    );
  };

  return (
    <Card
      headerPosition="left"
      header={
        <strong>
          Para a opção de filtro OT os dados serão separados por ponto e virgula
          <span style={{ color: "blue" }}> (;)</span>. Ex.:
          <span style={{ color: "blue" }}>OT-2009-0001;OT-2009-0002</span>
        </strong>
      }
      footer={
        <IconButton
          icon="upload"
          className="btn-primary"
          disabled={!selection.length > 0}
          onClick={emitirEvt}
        >
          Emitir EVT
        </IconButton>
      }
    >
      {open && (
        <EscolhaVendor
          open={open}
          setOpen={setOpen}
          setOpenModalEmail={setOpenModalEmail}
          linhasSegselecionadas={linhasSegselecionadas}
          setLinhasVendorselecionadas={setLinhasVendorselecionadas}
          linhasVendorselecionadas={linhasVendorselecionadas}
          linhasSegselecionadasParaBackend={linhasSegselecionadasParaBackend}
          setLinhasVendorsSelecionadas={setLinhasVendorsSelecionadas}
        />
      )}
      {openModalEmail && (
        <EnvioDeEmailTabs
          setOpenModalEmail={setOpenModalEmail}
          openModalEmail={openModalEmail}
          linhasSegselecionadas={linhasSegselecionadas}
          setOpenModalUpload={setOpenModalUpload}
          openModalUpload={openModalUpload}
          setLinhasOpenModalUpload={setLinhasOpenModalUpload}
          linhasSegselecionadasParaBackend={linhasSegselecionadasParaBackend}
          setLinhasVendorsSelecionadas={setLinhasVendorsSelecionadas}
          linhasVendorsSelecionadas={linhasVendorsSelecionadas}
          user={user}
        />
      )}
      {openModalUpload && (
        <UploadMultiplasEvts
          openModalUpload={openModalUpload}
          setOpenModalUpload={setOpenModalUpload}
          linhasOpenModalUpload={linhasOpenModalUpload}
        />
      )}
      <Filtro
        setLoading={setLoading}
        setRows={setRows}
        regional={regional}
        projeto={projeto}
        subProjeto={subProjeto}
        setRowsSalvarBack={setRowsSalvarBack}
      />
      <Table
        columns={columns}
        loading={loading}
        rows={rows}
        selectionProps={{ selection, onSelectionChange }}
        disablePagination
      />
    </Card>
  );
};

const mapStateToProps = ({ form, state }) => ({
  email: get(form.MultEvtsEmail, "values", null),
  user: get(state, "auth.user")
});

const formWrapper = reduxForm({
  form: "MultEvtsEmail",
  destroyOnUnmount: false
})(Main);

export default connect(mapStateToProps)(formWrapper);
