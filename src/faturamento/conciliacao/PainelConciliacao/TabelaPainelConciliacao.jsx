import React, { useState } from "react";
import { Table, IconButton, Modal } from "common";
import { toastr } from "react-redux-toastr";
import { useSelector, useDispatch } from "react-redux";
import { Input } from "common/input";
import { Table as DxTable } from "@devexpress/dx-react-grid-bootstrap3";
import { saveConciliate } from "../actions";
import { columnsPainel, columnsWidthPainel } from "../mock.json";
import ValidacaoInconsistencias from "./ValidacaoInconsistencias";
import { isPermited, logUserMenuAccess, logCodeAndCallback } from "auth/actions";
import axios from "axios";

export default ({
  items,
  loading,
  setLoading,
  rowValues,
  setPage,
  id,
  bill,
  bill_items,
  onSelectionChange
}) => {
  const [open, setOpen] = useState(false);
  const [validar, setValidar] = useState(false);
  const [openValidar, setOpenValidar] = useState(false);
  const [remarks, setRemarks] = useState("");
  const { status_id, bill_dif_type_id } = rowValues;
  const user_id = useSelector(({ auth }) => auth.user.id);
  const user = useSelector(({ auth: { user } }) => user.permissions);
  let isDisabled = false
  let isDisabledFinalisar = false
  const { painelRows, billReducer, billItems, rowsReducer } = useSelector(state => ({
    painelRows: state.faturamentoConciliacaoReducer.painelRows,
    billReducer: state.faturamentoConciliacaoReducer.bill,
    billItems: state.faturamentoConciliacaoReducer.billItems,
    rowsReducer: state.faturamentoConciliacaoReducer.rows
  }))
  if (painelRows != []) {
  }
  if (billReducer.length > 0) {
    if (billReducer[0].status_id === 103 || billReducer[0].status_id === 104) {
      isDisabled = false
    }
  }
  const { rowValidated } = useSelector(state => ({
    rowValidated: state.faturamentoConciliacaoReducer.rowValidated
  }))

  const formatRows = items.map(el => ({
    ...el,
    calcApontadoContestar:
      el.pendente_llm === null ||
      (el.pendente_llm === 0 && el.apontado - el.contestar),
    pendente_llm: el.pendente_llm !== null ? el.pendente_llm : "0,00",
    devido:
      el.pendente_llm === null || parseInt(el.pendente_llm, 10) === 0
        ? parseFloat(el.apontado - el.contestar).toFixed(2)
        : "0,00",
    apontado: el.apontado < 0 ? el.apontado * -1 : el.apontado,
    qtd_dd_lines: el.apontado !== 0 ? el.qtd_circuitos : 0,
    qtd_circuitos: el.apontado !== 0 ? el.qtd_circuitos : 0,
    contestar:
      el.contestar === "NaN" || el.contestar === null
        ? "0,00"
        : parseInt(el.contestar, 10) === 0
          ? parseFloat(el.contestar).toFixed(2)
          : "0,00"
  }));

  const isVisible = { display: status_id === 105 ? "none" : "block" };


  const postSaveConciliateReturn = () => {
    if (remarks.length === 0) {
      toastr.warning("", "Por favor, Adicione uma observação");
    } else {
      setLoading(true);
      setOpen(false);
      saveConciliate(
        [{ user: user_id, returned_remarks: remarks, bill_id: id }],
        "return"
      )
        .then(res => {
          console.log(res.data);
          toastr.success("", "Fatura devolvida com sucesso!");
          setPage("conciliacao");
        })
        .catch(() => toastr.error("", "Erro ao se conectar com o servidor"))
        .finally(() => {
          setLoading(false);
          setRemarks("");
        });
    }
  };

  let conciliates = [bill].map(el => ({
    ...el,
    user: user_id,
    bill_conciliate_items: bill_items,
    bill_id: id,
    status_id: el.status_id
  }));


  billItems.map(elInside => {
    if ((elInside.status_id != 101) && elInside.qtd_circuitos > 0
      && elInside.bill_dif_type_id < 20 && elInside.bill_dif_type_id !== 14) {
      isDisabledFinalisar = true
    }
  })


  const dispatch = useDispatch()
  const postSaveConciliate = () => {
    setLoading(true);
    saveConciliate(conciliates, "save")
      .then(res => {
        console.log(res.data);
        toastr.success("", "Dados salvos com sucesso!");
      })
      .catch(() => toastr.error("", "Erro ao se conectar com o servidor"))
      .finally($ => setLoading(false));
  };
  const postFinalConciliate = () => {
    if (validateItems()) {
      saveConciliate(conciliates, "final")
        .then(async res => {
          console.log(res.data);
          setPage("conciliacao");
          toastr.success("", "Dados Finalizados com sucesso!");
          dispatch({ type: "SET_HASFINALIZEDPAINEL_CONCILIACAO", payload: true })
          onSelectionChange([])
        })
        .catch(() => {
          toastr.error("", "Erro ao se conectar com o servidor")
        })
    }
  };

  const validateItems = () => {
    conciliates.map(item => {
      item.bill_conciliate_items.map(ci => {
        if (ci.acao == null && ci.circuito != null && item.bill_dif_type_id < 20 && item.bill_dif_type_id != 14) {
          toastr.info("Existem itens sem validação na inconsistência " + item.bill_dif_type_id)
          return false
        }
      })
    })
  }

  const valid_credits = () => {
    setLoading(true)
    axios
      .post(`${process.env.REACT_APP_API_URL}/bill_conciliates/valid_credits`, { "id": id })
      .then(res => {
        console.log(res)
        const retorno = res.data
        retorno.length == 0 ? postFinalConciliate() : toastr.info("Existem itens de crédito sem vinculação")
        setLoading(false)
      })
  }

  const Cell = ({ row }) => {
    const rowBillDiffTypeId = row.bill_dif_type_id
    const realRow = billItems.filter(billItem => billItem.bill_dif_type_id == rowBillDiffTypeId)
    let realRowStatusId = null
    if(realRow.length > 0){
      realRowStatusId = realRow[0].status_id
    }
    return (
      <DxTable.Cell>
        <div className="btn-conciliacao">
          {realRowStatusId == 101 && 
            <IconButton
              icon="eye"
              color="#3c8dbc"
              title="Visualizar"
              onClick={() => {
                setOpen(true);
              }}
            />
          }
          {/* {isPermited(user, "DR_COF1F1_DETAIL") && status_id === 61 && ( */}
          {/* {status_id === 61 && ( */}
          {realRowStatusId != 101 && row.qtd_circuitos !== 0 &&
            <IconButton
              icon="check"
              color="#3c8dbc"
              title="Validar"
              onClick={() => {
                logUserMenuAccess("DR_COF1F1_DETAIL");
                let compareRow = {}
                conciliates.map(el => {
                  if (conciliates.id == row.id) {
                    compareRow = row
                  }
                })
                dispatch({ type: "SET_ROWVALIDATED_CONCILIACAO", payload: compareRow })
                setOpenValidar(true);
              }}
            />}

            {/*row.qtd_circuitos !== 0 && (
                <IconButton
                  icon="eye"
                  color="#3c8dbc"
                  title="Visualizar"
                  onClick={() => {
                    setOpenValidar(true);
                  }}
                />
              )
            )}
                ) */}
          {realRowStatusId == 101 && row.qtd_circuitos !== 0 && (
            <>
              <IconButton
                icon="pencil"
                color="#3c8dbc"
                title="Editar Validação"
                onClick={() => {
                  let compareRow = {}
                  conciliates.map(el => {
                    if (conciliates.id == row.id) {
                      compareRow = row
                    }
                  })
                  dispatch({ type: "SET_ROWVALIDATED_CONCILIACAO", payload: compareRow })
                  setOpenValidar(true);
                }}
              />
              <IconButton
                icon="remove"
                color="#3c8dbc"
                title="Cancelar Validação"
                onClick={() => {
                  toastr.confirm(
                    "Esta ação irá cancelar a validação feita, deseja continuar?",
                    {
                      onOk: () => {
                        const updateBillItems = billItems.map(el => {
                          const billId = el.bill_dif_type_id
                          const rowValidatedId = rowValidated.bill_dif_type_id
                          if(billId == rowValidatedId){
                            return {
                              ...el,
                              contestar: 0,
                              devido: 0,
                              pendente_llm: 0,
                              status_id: 100
                            }
                          }else{
                            return el
                          }
                        })
                        dispatch({type: "SET_BILLITEMS_CONCILIACAO", payload: updateBillItems})
                      }
                    }
                  );
                }}
              />
            </>
          )}
        </div>
      </DxTable.Cell>
    );
  };

  const validateAll = () => {
    let valid = true
    const conciliate = billItems
    conciliate.map(item => {
      if (item.acao == "Contestar Parcial" || item.acao == "Contestar Retroativo") {
        const c = item.contestar.replace(',', '').replace('.', '')
        const d = parseInt(c)
        const a = item.apontado
        const b = parseInt(a.replace('.', '').replace(',', '.'))
        if (item.acao == "Contestar Parcial") {
          if (b == d) {
            valid = false
            toastr.info("Valor contestado do circuito " + item.circuito + " deve ser menor que o valor apontado.")
            return;
          }
          if (d == 0) {
            valid = false
            toastr.info("Valor contestado do circuito " + item.circuito + " deve ser maior que ZERO(0)")
            return;
          }
        } else if (b >= d) {
          valid = false
          toastr.info("Valor contestado do circuito " + item.circuito + " deve ser maior que o valor apontado.")
          return;
        }
      }
    })
    return valid
  }

  const confirmFinishValidation = () => {
    billItems.map(rowProp => {
          if (rowProp.contestar != null && parseInt(rowProp.contestar) != 0) {
            rowProp.contestar = rowProp.contestar.replace('.', '').replace(',', '.')
          }
          // if (rowProp.bill_dif_type_id == 15) {
          //   for (var countConciliates = 0; countConciliates < rowsReducer.length; countConciliates++) {
          //     rowsReducer[countConciliates].bill_conciliate_items.map(insideElProp => {
          //       if ((insideElProp.bill_id == rowProp.bill_id) &&
          //         (insideElProp.circuito == rowProp.circuito) &&
          //         (insideElProp.bill_dif_type_id == rowProp.bill_dif_type_id)) {
          //         insideElProp = {
          //           ...insideElProp,
          //           acao: rowProp.acao,
          //           justificativa: rowProp.remarks,
          //           contestar: rowProp.contestar,
          //           devido: rowProp.devido,
          //           pendente_llm: rowProp.pendente_llm
          //         }
          //         conciliates[countConciliates] = {
          //           ...conciliates[countConciliates],
          //           status_id: 101,
          //           status: {
          //             ...conciliates[countConciliates].status,
          //             description: "Validado",
          //             id: 101
          //           }
          //         }
          //       }
          //     })
          //   }
          // } else {
          //   console.log("entrou2")
          //   if (rowsReducer[rowsReducer.length - 1].bill_dif_type_id == 15) {
          //     rowsReducer[rowsReducer.length - 1].bill_conciliate_items.map(billConciliateItem => {
          //       if ((billConciliateItem.bill_id == rowProp.bill_id) &&
          //         (billConciliateItem.circuito == rowProp.circuito) &&
          //         (billConciliateItem.bill_dif_type_id == rowProp.bill_dif_type_id)) {
          //         billConciliateItem = {
          //           ...billConciliateItem,
          //           acao: rowProp.acao,
          //           justificativa: rowProp.justificativa,
          //           remarks: rowProp.remarks,
          //           contestar: rowProp.contestar,
          //           devido: rowProp.devido,
          //           pendente_llm: rowProp.pendente_llm
          //         }
          //       }
          //     })
          //   }
          // }
        })
        console.log("entrou3")
        const updateBillItems = billItems.map(billItem => {
          const comp1 = billItem.bill_dif_type_id
          const comp2 = rowValidated.bill_dif_type_id
          console.log(comp1 == comp2)
          if(comp1 == comp2){
            console.log("entrou4")
            return {
              ...billItem,
              status_id: 101
            }
          }else{
            return billItem
          }
        })
        console.log("teste")
        dispatch({ type: "SET_BILLITEMS_CONCILIACAO", payload: updateBillItems })
        // return {
        //   ...rowValidated,
        //   status_id: 101,
        //   status: {
        //     ...rowValidated.status,
        //     description: "Validado",
        //     id: 101
        //   }
        // }
    console.log(conciliates)
  }

  return (
    <>
      <Table
        rows={formatRows}
        columns={columnsPainel}
        columnWidths={columnsWidthPainel}
        loading={loading}
        disablePagination
        actions={[{ columnName: "actions", component: Cell }]}
      />
      {open && (
        <Modal
          id="TabelaPainelConciliacao"
          open={open}
          onClose={() => {
            setOpen(false);
          }}
          footer={
            <IconButton
              className="btn-primary"
              onClick={postSaveConciliateReturn}
            >
              Devolver
            </IconButton>
          }
        >
          <Input
            label="Observação:"
            value={remarks}
            onChange={e => setRemarks(e.target.value)}
          />
        </Modal>
      )}
      {openValidar && (
        <Modal
          title="Validação de Inconsistências"
          dimension="md"
          width="90vw"
          id="ValidacaoInconsistencias"
          disableBtnClose
          open={openValidar}
          onClose={() => {
            setOpenValidar(false);
          }}
          footer={
            <>
              {isPermited(user, "DR_COF1F1D1") && (
                <IconButton
                  className="btn-primary"
                  onClick={() => {
                    logUserMenuAccess("DR_COF1F1D1");
                    if (validateAll()) {
                      toastr.confirm("Confirma encerramento de validações?", {
                        onOk: () => {
                          confirmFinishValidation()
                          setValidar(true);
                          setOpenValidar(false);
                        }
                      });
                    }
                  }}
                >
                  Finalizar
                </IconButton>
              )}
              <IconButton
                className="btn-primary"
              // onClick={postSaveConciliateReturn}
              >
                Ação Multipla
              </IconButton>
            </>
          }
        >
          <ValidacaoInconsistencias rowValues={rowValues} />
        </Modal>
      )}
      <div className="tabela-conciliacao__footer" style={isVisible}>
        {isPermited(user, "DR_COF1F1D1") && (
          <IconButton
            onClick={() => { logCodeAndCallback("DR_COF1F1D1", valid_credits) }}
            disabled={isDisabledFinalisar}
            className="btn-primary"
          >
            Finalizar
          </IconButton>
        )}
        {isPermited(user, "DR_COF1F1B1") && (
          <IconButton
            // disabled={isDisabled}
            className="btn-warning"
            onClick={() => logCodeAndCallback("DR_COF1F1B1", () => { setOpen(true) })}
          >
            Devolver
          </IconButton>
        )}
        <IconButton
          /*disabled={isDisabled}*/ onClick={postSaveConciliate}
          className="btn-success"
        >
          Salvar
        </IconButton>
      </div>
    </>
  );
};
