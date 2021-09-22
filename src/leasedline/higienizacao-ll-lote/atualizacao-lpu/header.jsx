import React, { useState } from "react";
import { connect } from "react-redux";
import { Modal } from "common";
import get from "lodash/get";
import Dropzone from "react-dropzone";
import { toastr } from "react-redux-toastr";
import { IconButton } from "../../comps";
import ModeloFaturamento from "./modeloAtualizacao";
import Critica from "./criticas";
import { uploadFile, analisaCSV, atualizaBase } from "./actions";

const Header = ({
  setRows,
  user_id,
  setLoading,
  setOperacao,
  operacao,
  handleColumns
}) => {
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [criticas, setCriticas] = useState([]);
  const [select, setSelect] = useState("0");
  const [fileName, setFileName] = useState("");
  const [filePath, setFilePath] = useState("");

  const OPH = [
    {
      value: "0",
      name: "Selecione"
    },
    {
      value: "1",
      arquivoPath: `${process.env.REACT_APP_API_URL}/modelo/ModeloEntradaAtualizacaodeLpuAssociacao.csv`,
      name: "Associação LL_GUID x LPU_GUID"
    },
    {
      value: "2",
      arquivoPath: `${process.env.REACT_APP_API_URL}/modelo/ModeloEntradaAtualizacaoLpuReceita.csv`,
      name: "Garantia de Receita"
    },
    {
      value: "3",
      arquivoPath: `${process.env.REACT_APP_API_URL}/modelo/ModeloEntradaAtualizacaodeLpuReajuste.csv`,
      name: "Tipo Reajuste"
    }
  ];

  const onDrop = files => {
    if (operacao === "0") {
      toastr.info("Selecione primeiro uma Operação!");
    } else {
      setLoading(true);
      const formData = new FormData();

      formData.append("Filedata", files[0]);
      formData.append("Newname", files[0].name);

      setFileName(files[0].name);

      uploadFile(formData)
        .then(({ data }) => {
          // return analisaCSV(operacao, files[0].name, user_id, "DR_COC1K1C1");
          return analisaCSV(operacao.toString(), files[0].name, user_id, "");
        })
        .then(res => {
          if (res.data[0].length > 0 && res.data[1] === 0) {
            toastr.info("Importação realizada com sucesso!");
            setDisabled(false);
          } else {
            toastr.info(
              "LL Guid não encontrado(s) na base! Verificar Críticas"
            );
            setCriticas(res.data[2]);
          }
          setRows(res.data[0]);
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => setLoading(false));
    }
  };

  return (
    <div>
      <form className="form">
        <div className="row">
          <div className="col-md-2">
            <IconButton
              icon="info"
              data-tip="Visualizar Modelo"
              onClick={() => setOpenModal(true)}
            />
            {openModal && (
              <Modal
                open={openModal}
                title="Informativo"
                dimension="sm"
                width="60vw"
                onClose={() => setOpenModal(false)}
              >
                <ModeloFaturamento />
              </Modal>
            )}
            <a href={filePath} download>
              <IconButton
                disabled={operacao === "0"}
                icon="download"
                data-tip="Baixar Modelo"
              />
            </a>
          </div>
          <div className="col-md-3">
            <select
              className="form-control input-sm"
              label="Operação de Higienização"
              value={select}
              onChange={evt => {
                const { value } = evt.target;
                const op = OPH[value];
                setOperacao(op.value);

                setFilePath(op.arquivoPath);
                setRows([]);
                handleColumns(op.value);
                setSelect(value);
              }}
            >
              {OPH.map(({ name }, idx) => (
                <option key={name} value={idx}>
                  {name}
                </option>
              ))}
            </select>{" "}
          </div>
          <div className="col-md-3">
            <Dropzone accept=".csv" onDrop={onDrop}>
              {({
                getRootProps,
                getInputProps,
                isDragActive,
                isDragReject
              }) => (
                <div
                  className="dropzone"
                  data-for="top_dark_float"
                  data-tip="SOLTE O ARQUIVO AQUI."
                  {...getRootProps()}
                >
                  <input {...getInputProps()} />
                  <i className="fa fa-upload" />
                  {!isDragActive && " Clique aqui ou solte um arquivo!"}
                  {isDragActive && !isDragReject && " Solte o arquivo aqui."}
                  {isDragReject && "Arquivo inválido!"}
                </div>
              )}
            </Dropzone>{" "}
          </div>{" "}
          <div className="col-md-3 ">
            <button
              type="button"
              disabled={disabled}
              onClick={() => {
                toastr.confirm(
                  "Deseja atualizar a base com os dados importados?",

                  {
                    onOk: () => {
                      setLoading(true);

                      analisaCSV(operacao, fileName, user_id, "").then(res => {
                        return atualizaBase(
                          res.data[0],
                          operacao,
                          user_id
                        ).then(resp => {
                          if (resp.status === 200) {
                            toastr.info("Atualização realizada com sucesso!");
                            setRows([]);
                            setLoading(false);
                            setDisabled(true);
                            setCriticas([]);
                          } else {
                            toastr.info("Ocorreu um erro ao atualizar a base!");
                          }
                        });
                      });
                    }
                  }
                );
              }}
              className="btn btn-primary"
            >
              Atualizar Base
            </button>

            <button
              type="button"
              onClick={() => {
                setRows([]);
                setDisabled(true);
                setCriticas([]);
              }}
              className="btn btn-danger"
            >
              Cancelar
            </button>
          </div>
          <div className="col-md-1">
            <IconButton
              disabled={!criticas.length}
              icon="bell"
              data-tip="Visualizar Críticas"
              onClick={() => setOpen(true)}
            />
            {open && (
              <Modal
                open={open}
                title="LL GUID não encontradas"
                dimension="sm"
                width="60vw"
                onClose={() => setOpen(false)}
              >
                <Critica criticas={criticas} />
              </Modal>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

Header.defaultProps = {
  rows: [],
  columns: []
};

export default connect(state => ({
  user_id: get(state, "auth.user.id")
}))(Header);
