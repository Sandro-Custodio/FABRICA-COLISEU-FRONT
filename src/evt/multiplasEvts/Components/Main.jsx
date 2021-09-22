import React, { useState } from "react";
import { useSelector, connect } from "react-redux";
import { CSVLink } from "react-csv";
import { IconButton, Card } from "common";
import axios from "axios";
import { toastr } from "react-redux-toastr";
import get from "lodash/get";
import Table from "./Table";
import Filtro from "./Filtro";
import Upload from "./Upload";
import { csv_columns } from "../mock.json";

const Main = () => {
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [fileName, setFileName] = useState("");
  const [formName, setFormName] = useState("");
  const [isUpload, setIsUpload] = useState(false);
  const [formIsUploaded, setFormIsUploaded] = useState(false);
  const [formAssinado, setFormAssinado] = useState(new FormData());
  const user_id = useSelector(({ auth }) => auth.user.id);

  const reload_evts_after_contract = ({ evts, ots }) => {
    let data = {};
    if (evts !== null) {
      data = { ...data, evts: [evts] };
    }
    if (ots !== null) {
      data = { ...data, ots: [ots] };
    }
    axios
      .post("evts/get_evt_by_code", data)
      .then(res => {
        setRows(res.data);
      })
      .catch(e => {
        if (e.response.data.errors) {
          e.response.data.errors.forEach(error => toastr.error("Erro", error));
        } else if (e.request) {
          if (e.message === "Network Error") {
            toastr.error("Erro", "Servidor OFFLINE");
          }
        }
      });
  };

  const uploadFile = file => {
    setLoading(true);
    const form = new FormData();
    form.append("Filedata", file[0]);
    form.append("Newname", file[0].name);
    setFileName(file[0].name);
    return axios
      .post("upload/attachment", form)
      .then(() => {
        setIsUpload(true);
        toastr.success("Sucesso", "Upload realizado com sucesso");
      })
      .catch(() => {
        toastr.error("Erro", "Erro ao realizar upload");
        setIsUpload(false);
      })
      .finally(() => setLoading(false));
  };

  const uploadForm = file => {
    const date = new Date().getTime();
    setLoading(true);
    const form = new FormData();
    form.append("Filedata", file[0]);
    form.append("new_file_name", `${date}_${file[0].name}`);
    form.append("folder_name", "upload");
    setFormAssinado({
      file_type: file[0].name.split(".", 2)[1],
      file_size: file[0].size,
      user_id,
      created_at: new Date(),
      original_name: file[0].name,
      repository_name: `UPLOAD${date}_${file[0].name}`
    });
    setFormName(file[0].name);
    return axios
      .post("flex_upload/attachment", form)
      .then(() => {
        setFormIsUploaded(true);
        toastr.success("Sucesso", "Upload realizado com sucesso");
      })
      .catch(() => {
        toastr.error("Erro", "Erro ao realizar upload");
        setFormIsUploaded(false);
      })
      .finally(() => setLoading(false));
  };

  const multipleEvts = () => {
    setLoading(true);
    const data = {
      file_name: fileName,
      user_id,
      p_file: formAssinado
    };
    return axios
      .post("/evts/multiple_evts", data)
      .then(res => {
        if (res.data.message) {
          toastr.warning("Atenção", res.data.message);
          setIsUpload(false);
        } else {
          toastr.info("Concluido", "Evts alteradas com sucesso!");
          reload_evts_after_contract();
          // setRows(res.data.evts);
        }
      })
      .catch(() => {
        toastr.error("Erro", "Erro ao Enviar os dados");
        setIsUpload(false);
        setFormName("");
        setFormIsUploaded(false);
      })
      .finally(() => setLoading(false));
  };

  return (
    <Card
      position="right"
      title={
        <strong className="box-title">
          Para a opção de filtros OT e EVT os dados serão separados por ponto e virgula
          <span style={{ color: "blue" }}> (;)</span>. Ex:
          <span style={{ color: "blue" }}>OT-2009-0001;OT-2009-0002</span>
        </strong>
      }
      tools={
        <div style={{ display: "flex" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <small>
              Formulário Assinado Evt <i>{formName}</i>
            </small>
            <Upload
              disabled={!isUpload}
              onDrop={files => uploadForm(files)}
              title="Formulário Assinado"
            />
          </div>
          <CSVLink
            data={rows}
            headers={csv_columns}
            separator=";"
            filename={`${new Date().getTime()}_template.csv`}
          >
            <IconButton
              icon="file-excel-o"
              title="Download Template"
              color="#00A65A"
            />
          </CSVLink>
          ;
        </div>
      }
      footer={
        isUpload ? (
          <>
            <IconButton
              className="btn-primary"
              icon="paper-plane"
              title="Enviar o arquivo para as respostas das EVTs"
              onClick={multipleEvts}
              disabled={!formIsUploaded}
            >
              Enviar
            </IconButton>
            <IconButton
              className="btn-danger"
              icon="trash"
              title="Descartar o arquivo"
              onClick={() => setIsUpload(false)}
            >
              {fileName}
            </IconButton>
          </>
        ) : (
          <Upload
            onDrop={files => uploadFile(files)}
            label="Upload"
            className="btn-success"
            title="Upload"
          />
        )
      }
    >
      {/* <Filtro setLoading={setLoading} setRows={setRows} /> */}
      <Filtro setLoading={setLoading} setRows={setRows} />
      <Table loading={loading} rows={rows} />
    </Card>
  );
};

const mapStateToProps = ({ form }) => ({
  evts: get(form.FiltroMultEvts, "values.evts", null),
  ots: get(form.FiltroMultEvts, "values.ots", null)
});

export default connect(mapStateToProps)(Main);
