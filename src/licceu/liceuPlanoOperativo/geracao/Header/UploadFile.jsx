import React from "react";
import { toastr } from "react-redux-toastr";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Dropzone, Modal } from "common";
import TipoDocumentoInput from "../TipoDocumentoInput";
import { uploadFile } from "../actions";

const UploadFile = ({ uploadFile }) => {
  const [open, setOpen] = React.useState(false);
  const [arquivo, setArquivo] = React.useState({});
  const [tipoDocumento, setTipoDocumento] = React.useState("");
  const [tipoCarga, setTipoCarga] = React.useState("");

  const handleDrop = arquivo => {
    if (arquivo.length) {
      setOpen(true);
      setArquivo(arquivo[0]);
    }
  };

  const handleSubmit = () => {
    if (!tipoDocumento || !tipoCarga)
      toastr.confirm("Preencha todos os campos", { disableCancel: true });
    else {
      const form = new FormData();
      form.append("arquivo", arquivo);
      form.append("tipoDocumento", tipoDocumento);
      form.append("tipoCarga", tipoCarga);
      uploadFile(form);
      setOpen(false);
      setTipoDocumento("");
      setTipoCarga("");
    }
  };

  return (
    <>
      <Dropzone
        onDrop={handleDrop}
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
      />
      {open && (
        <Modal
          onClose={() => setOpen(false)}
          open={open}
          title={`Upload do Arquivo "${arquivo.name}"`}
          labelBtnClose="Cancelar"
          footer={
            <button
              type="submit"
              onClick={handleSubmit}
              className="btn btn-primary"
            >
              Enviar
            </button>
          }
        >
          <TipoDocumentoInput
            disableTodos
            input={{
              value: tipoDocumento,
              onChange: evt => setTipoDocumento(evt.target.value)
            }}
          />
          <label htmlFor="tipoCarga">Tipo de Carga:</label>
          <select
            id="tipoCarga"
            className="form-control input-sm"
            value={tipoCarga}
            onChange={evt => setTipoCarga(evt.target.value)}
          >
            <option hidden value="Selecione">
              Selecione
            </option>
            <option value="Simulação">Simulação</option>
            <option value="Em Rollout">Em Rollout</option>
          </select>
        </Modal>
      )}
    </>
  );
};

const mapActionUpload = dispatch =>
  bindActionCreators({ uploadFile }, dispatch);

export default connect(
  null,
  mapActionUpload
)(UploadFile);
