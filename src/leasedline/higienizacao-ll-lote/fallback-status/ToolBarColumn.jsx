import React, { useState } from "react";
import { IconButton, Modal } from "common";
import { connect } from "react-redux";
import axios from "axios";
import { toastr } from "react-redux-toastr";
import Modelo from "./Modelo";
import Upload from "./Upload";
import Info from "./Info";
import Select from "./Select";

const ToolBarColumn = ({
  user_id,
  setLoading,
  setChecked,
  setRowOperacao,
  setUploadAnexar,
  selected,
  setSelected
}) => {
  const [open, setOpen] = useState(false);
  // const [selected, setSelected] = useState("");

  const baseUrl = `${process.env.REACT_APP_API_URL}/modelo/modelo_higienizacao_fallback_status.csv`;

  const checkData = params => {
    if (
      selected === "3" ||
      (selected === "9" && params.some(n => n.data_ativacao === ""))
    ) {
      toastr.warning(
        "O campo DATA ATIVAÇÃO dever ser preenchido para prosseguir"
      );
      setChecked(false);
    } else {
      setChecked(true);
    }
  };

  const uploadFile = file => {
    const form = new FormData();
    form.append("Filedata", file[0]);
    form.append("Newname", file[0].name);
    const data = {
      id_op: selected,
      file_name: file[0].name,
      logged_user: user_id
    };
    return axios
      .post("upload/attachment", form)
      .then(() => {
        console.log("Upload realizado com sucesso");
        return readFile(data);
      })
      .catch(() => {
        toastr.error("Erro", "Erro ao realizar upload");
      });
  };

  const readFile = file => {
    setLoading(true);
    return axios
      .post("/ot_leasedline_cleanner/read_csv_file_audit", file)
      .then(res => {
        setRowOperacao(res.data[0]);
        checkData(res.data[0]);
      })
      .catch(() => {
        toastr.error("ERROR", "Erro ao ler o arquivo");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div style={styles}>
      <div style={{ display: "flex" }}>
        <IconButton
          title="Visualizar Modelo"
          onClick={() => setOpen(true)}
          icon="info"
        />
        {selected.length > 0 && <Upload onDrop={files => uploadFile(files)} />}

        {open && (
          <Modal
            open={open}
            dimension="lg"
            title="Modelo"
            onClose={() => {
              setOpen(false);
            }}
            height="40vh"
            // footer={
            //   <IconButton
            //     title="Download Modelo de Higienização"
            //     onClick={() => window.open(baseUrl)}
            //     icon="download"
            //     className="btn btn-primary"
            //     color="white"
            //   />
            // }
          >
            <Modelo />
          </Modal>
        )}
        <IconButton
          title="Download Modelo de Higienização"
          onClick={() => window.open(baseUrl)}
          icon="download"
          className="btn btn-primary"
          color="white"
        />
      </div>
      <div style={{ display: "flex" }}>
        <Select
          onChange={e => {
            setSelected(e.target.value);
            setRowOperacao([]);
            setChecked(false);
            setUploadAnexar([]);
          }}
        />
        <Info info="O arquivo não pode conter mais do que 500 registros." />
      </div>
    </div>
  );
};

const styles = {
  width: "100%",
  display: "flex",
  justifyContent: "space-between"
};

const mapStateToProps = ({ auth }) => ({ user_id: auth.user.id });

export default connect(mapStateToProps)(ToolBarColumn);
