import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Row } from "../../comps/componentesUsaveis";
import Grid from "common/layout/grid";
import { Label, TextareaField } from "common/form/components";
import get from "lodash/get";
import Tabela from "./Tabela";
import { columnsHistorico } from "./columns.json";
import { getHistoricoAgrupador, removeHistoricoAgrupador } from "./action";
import { toastr } from "react-redux-toastr";

const HistoricoAgrupador = ({ linhaSelecionada, setLoading, loading }) => {
  const [historicoList, setHistoricoList] = React.useState([]);

  const Cell = props => {
    return (
      <>
        <button
          type="button"
          className="btn btn-link"
          data-toggle="tooltip"
          data-placement="bottom"
          title="Cancelar status no Periodo"
          onClick={() => {
            toastr.confirm(
              "Esta ação irá remover o status nesse período, deseja continuar?",
              {
                onOk: () => {
                  setLoading(true);
                  removeHistoricoAgrupador({
                    paramsAgrupador: {
                      id: props.row.id,
                      status_id: props.row.statusId,
                      group_id: linhaSelecionada.id,
                      month_ini: props.row.inicio,
                      month_end: props.row.fim
                    }
                  })
                    .then(res => {
                      if (res.status === 200) {
                        toastr.info("Operação realizada com sucesso!");
                        getHistoricoAgrupador(linhaSelecionada.id).then(res => {
                          setHistoricoList(
                            res.data.map(r => ({
                              id: r.id,
                              status: r.status.description,
                              statusId: r.status.id,
                              inicio: r.month_ini,
                              fim: r.month_end,
                              observacao: r.remarks
                            }))
                          );
                        });
                        setLoading(false);
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
          <span className="primary">
            <i className="glyphicon glyphicon-remove-circle" />
          </span>
        </button>
      </>
    );
  };

  React.useEffect(() => {
    setLoading(true);
    getHistoricoAgrupador(linhaSelecionada.id)
      .then(res => {
        setHistoricoList(
          res.data.map(r => ({
            id: r.id,
            status: r.status.description,
            statusId: r.status.id,
            inicio: r.month_ini,
            fim: r.month_end,
            observacao: r.remarks
          }))
        );
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, []);
  return (
    <Tabela
      columns={columnsHistorico}
      rows={historicoList}
      loading={loading}
      actions={[
        {
          columnName: "tableAction",
          component: Cell
        }
      ]}
    />
  );
};
export default HistoricoAgrupador;
