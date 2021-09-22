import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { toastr } from "react-redux-toastr";

import { getYears } from "licceu/liceuPlanoOperativo/comps";
import { Dropzone, Modal } from "common";
import { tipos, tipoArquivo } from "../config.json";
import { validateFile } from "../actions";

const UploadFile = ({ validateFile, code }) => {
  const [open, setOpen] = React.useState(false);
  const [arquivo, setArquivo] = React.useState({});
  const [year, setYear] = React.useState("");
  const [tipo, setTipo] = React.useState("");

  const handleDrop = arquivo => {
    if (arquivo.length) {
      setOpen(true);
      setArquivo(arquivo[0]);
    }
  };

  const handleSubmit = () => {
    if (!year || !tipo)
      toastr.confirm("Preencha todos os campos", { disableCancel: true });
    else {
      const form = new FormData();
      form.append("arquivo", arquivo);
      form.append("ano", year);
      form.append("planoOperativo", tipo);
      form.append("tipoArquivo", tipoArquivo[code]);
      validateFile(form);
      setOpen(false);
      setYear("");
      setTipo("");
    }
  };

  const tipoList = tipos[code];

  return (
    <>
      <Dropzone
        onDrop={handleDrop}
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        disableFilename
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
          <label htmlFor="year">Ano:</label>
          <select
            value={year}
            onChange={evt => setYear(evt.target.value)}
            id="year"
            className="form-control input-sm"
            name="year"
          >
            <option>Selecione</option>
            {getYears().map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <label htmlFor="tipo">Tipo Plano Operativo:</label>
          <select
            value={tipo}
            onChange={evt => setTipo(evt.target.value)}
            id="tipo"
            className="form-control input-sm"
            name="tipo"
          >
            <option>Selecione</option>
            {tipoList.map(tipo => (
              <option value={tipo.id} key={tipo.id}>
                {tipo.text}
              </option>
            ))}
          </select>
        </Modal>
      )}
    </>
  );
};

const mapActionUpload = dispatch =>
  bindActionCreators({ validateFile }, dispatch);

export default connect(
  null,
  mapActionUpload
)(UploadFile);
