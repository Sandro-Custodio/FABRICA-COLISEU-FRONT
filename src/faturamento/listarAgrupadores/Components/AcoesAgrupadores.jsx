import React, { useState } from "react";
import { IconButton, Modal } from "common";
import EditarAgrupador from "./EditarAgrupador";
import AtivarDesativarAgrupador from "./AtivarDesativarAgrupador";
import HistoricoAgrupador from "./HistoricoAgrupador";
import { salvarNovoAgrupador, salvarAtivdesativAgrupador } from "./action";
import { toastr } from "react-redux-toastr";
import { useSelector } from "react-redux";
import { isPermited, logCodeAndCallback, logUserMenuAccess } from "auth/actions";

const Cell = ({ row, row: { agrupador, provedor, status } }) => {
  const [open, setOpen] = useState(false);
  const [openAtivDesativAgrupador, setOpenAtivDesativAgrupador] = useState(
    false
  );
  const [openHistoricoAgrupador, setOpenHistoricoAgrupador] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paramsEditarAgrupador, setParamsEditarAgrupador] = React.useState([]);
  const [paramsAtivDesaAgrupador, setParamsAtivDesaAgrupador] = React.useState(
    []
  );

  const user = useSelector(({ auth: { user } }) => user.permissions);

  const editarAgrupador = () => {
    setOpen(true);
  };
  const ativarDesativarAgrupador = () => {
    setOpenAtivDesativAgrupador(true);
  };
  const ativarHistoricoAgrupador = () => {
    setOpenHistoricoAgrupador(true);
  };

  return (
    <div>
      {isPermited(user, "DR_COF1D1B1") && (
        <button
          type="button"
          className="btn btn-link"
          data-toggle="tooltip"
          data-placement="bottom"
          title="Editar Agrupador"
          onClick={() => {
            logCodeAndCallback("DR_COF1D1B1", editarAgrupador)
          }}
        >
          <span className="primary">
            <i className="glyphicon glyphicon-edit" />
          </span>
        </button>
      )}
      {open && (
        <Modal
          open={open}
          title="Cadastro de Agrupador"
          dimension="lg"
          width="100vw"
          onClose={() => setOpen(false)}
          footer={
            <div>
              <button
                type="button"
                className="btn btn-primary btn-footer"
                onClick={() => {
                  setLoading(true);
                  salvarNovoAgrupador(paramsEditarAgrupador)
                    .then(resp => {
                      if (resp.status === 200) {
                        toastr.info("Operação realizada com sucesso!");
                        window.location.reload();
                        setLoading(false);
                        setOpen(false);
                      } else {
                        toastr.info("Ocorreu um erro ao salvar na base!");
                      }
                    })
                    .catch(error => {
                      console.log(error);
                    })
                    .finally(() => setLoading(false));
                }}
              >
                Salvar
              </button>
            </div>
          }
          disableBtnClose
        >
          <EditarAgrupador
            open={open}
            setOpen={setOpen}
            setLoading={setLoading}
            setParamsEditarAgrupador={setParamsEditarAgrupador}
            linhaSelecionada={row}
          />
        </Modal>
      )}

      <button
        type="button"
        className="btn btn-link"
        data-toggle="tooltip"
        data-placement="bottom"
        title="Visualizar Historico"
        onClick={ativarHistoricoAgrupador}
      >
        <span className="primary">
          <i className="glyphicon glyphicon-time" />
        </span>
      </button>
      {openHistoricoAgrupador && (
        <Modal
          open={openHistoricoAgrupador}
          title={`Histórico do Agrupador: ${agrupador} do Provedor: ${provedor}`}
          dimension="lg"
          width="100vw"
          onClose={() => setOpenHistoricoAgrupador(false)}
          disableBtnClose
        >
          <HistoricoAgrupador
            setLoading={setLoading}
            linhaSelecionada={row}
            loading={loading}
          />
        </Modal>
      )}
      {isPermited(user, "DR_COF1D1C1") && (
        <button
          type="button"
          className="btn btn-link"
          data-toggle="tooltip"
          data-placement="bottom"
          title={`${status === "Ativo" ? "Desativar" : "Ativar"} Agrupador`}
          onClick={() => {
            logCodeAndCallback("DR_COF1D1C1", ativarDesativarAgrupador)
          }}
        >
          <span className="primary">
            <i
              className={`glyphicon glyphicon-${
                status === "Ativo" ? "remove" : "ok"
              }-circle`}
            />
          </span>
        </button>
      )}
      {openAtivDesativAgrupador && (
        <Modal
          open={openAtivDesativAgrupador}
          title={`${status === "Ativo" ? "Desativar" : "Ativar"} Agrupador`}
          dimension="lg"
          width="80vw"
          onClose={() => setOpenAtivDesativAgrupador(false)}
          footer={
            <div>
              <button
                type="button"
                className="btn btn-primary btn-footer"
                onClick={() => {
                  toastr.confirm(
                    `Esta ação irá ${
                      status === "Ativo" ? "desativar" : "ativar"
                    } o agrupador ${agrupador}. Deseja continuar? `,
                    {
                      onOk: () => {
                        setLoading(true);
                        salvarAtivdesativAgrupador(paramsAtivDesaAgrupador)
                          .then(resp => {
                            if (resp.status === 200) {
                              toastr.info("Agrupador atualizado com sucesso!");
                              window.location.reload();
                              setLoading(false);
                              setOpen(false);
                            } else {
                              toastr.info("Ocorreu um erro ao salvar na base!");
                            }
                          })
                          .catch(error => {
                            console.log(error);
                          })
                          .finally(() => setLoading(false));
                      }
                    }
                  );
                }}
              >
                {status === "Ativo" ? "Desativar" : "Ativar"}
              </button>
            </div>
          }
          disableBtnClose
        >
          <AtivarDesativarAgrupador
            setLoading={setLoading}
            linhaSelecionada={row}
            setParamsAtivDesaAgrupador={setParamsAtivDesaAgrupador}
          />
        </Modal>
      )}
    </div>
  );
};

export default Cell;
