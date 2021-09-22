import React from "react";
import { connect } from "react-redux";
import { Modal } from "common";
import get from "lodash/get";
import Dropzone from "react-dropzone";
import { toastr } from "react-redux-toastr";
import { IconButton } from "../../comps";
import ModeloFaturamento from "./modeloInfoFaturamento";
import Critica from "./criticas";
import { uploadFile, analisaXls, atualizaBase } from "./actions";

const Header = ({ setRows, rows, user_id, setLoading }) => {
  const [open, setOpen] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);
  const [criticas, setCriticas] = React.useState([]);

  const onDrop = files => {
    setLoading(true);
    const formData = new FormData();

    formData.append("Filedata", files[0]);
    formData.append("Newname", files[0].name);
    uploadFile(formData)
      .then(({ data }) => {
        return analisaXls(files[0].name, user_id);
      })
      .then(res => {
        if (res.data[0] === 0 && res.data[1].length > 0) {
          toastr.info("Importação realizada com sucesso!");
          setDisabled(false);
        } else {
          toastr.info(
            `${res.data[0]} LL Guid não encontrado(s) na base! Verificar Críticas`
          );
          setCriticas(
            res.data[2].map(r => ({
              ll_guid: r.ll_guid
            }))
          );
        }

        // toastr.info(res.statusText);
        setRows(
          res.data[1].map(r => ({
            ll_guid: r.ll_guid,
            circuito_normalizado: r.circuito_id,
            observacao: r.obs
          }))
        );
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => setLoading(false));
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

            <IconButton
              icon="download"
              onClick={() =>
                window.open(
                  `${process.env.REACT_APP_API_URL}/modelo/ModeloEntradaDesignacaoCircuitoLote.xls`
                )
              }
              title="Modelo de Importação"
            />
          </div>
          <div className="col-md-3">
            <Dropzone accept=".xls" onDrop={onDrop}>
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

                      atualizaBase(user_id).then(resp => {
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
              // disabled={disabled}
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
          <div className="col-md-3">
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
