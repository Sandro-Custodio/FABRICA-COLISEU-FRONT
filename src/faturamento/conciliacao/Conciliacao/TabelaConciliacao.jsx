/* eslint-disable no-fallthrough */
import React, { useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { toastr } from "react-redux-toastr";
import ReactTooltip from "react-tooltip";
import { Table, IconButton, Modal } from "common";
import { toDate, toFloat, toMoney } from "common/utils";
import { Table as DxTable } from "@devexpress/dx-react-grid-bootstrap3";
import get from "lodash/get";
import axios from "axios";
import { columns, conciliacaoColumnWidths } from "../mock.json";
import { finalBills, aprovBills, getAllGroupsForConciliate } from "../actions";
import { logUserMenuAccess, logCodeAndCallback } from "../../../auth/actions";
import { Field, reduxForm } from "redux-form"
import { LabelField } from "../../../common/form/components"

// const getRowId = row => row.id;

const TabelaConciliacao = ({
  rows,
  setLoading,
  loading,
  selection,
  onSelectionChange,
  setPage,
  permissions,
  userId,
  remarks,
  setAllBillById,
  setRowValues,
  handleFilter,
}) => {
  const [isPermittedDisabled, setIsPermittedDisabled] = useState(true);
  const [userPermitions, setUserPermitions] = useState([]);
  const [open, setOpen] = useState(false);
  const select_bills = selection.map(item => rows[item]);
  const select_bills_statuses = selection.map(item => rows[item]?.status_id);
  const dispatch = useDispatch()
  const isBtnPlay = select_bills.filter(el => el?.status_id === 103)?.length;
  const isDevolvida = select_bills.filter(el => el?.status_id === 104)?.length;

  let formatRowsAll = rows.map(el => ({
    ...el,
    previsto: el.previsto === "NaN" || el.previsto === null || el.previsto === "" ? 0 : el.previsto
  }));

  let formatRows = formatRowsAll.map(el => ({
    ...el,
    deadline_at: toDate(el.deadline_at),
    //bill_total: toMoney(el.bill_total),
    bill_total: parseFloat(el.bill_total),
    //previsto: toMoney(el.previsto),
    previsto: parseFloat(el.previsto),
    contestar: parseFloat(el.contestar),
    pendente_llm: parseFloat(el.pendente_llm),
    aprovado: parseFloat(el.aprovado),
    process_end: toDate(el.process_end)
  }));

  const currencyColumnsAll = ["previsto", "bill_total", "contestar", "pendente_llm", "aprovado"];

  let data = select_bills.map(el => ({
    status_id: el.status_id,
    user_id: userId,
    area_id: el.area_id,
    bill_number: el.bill_number,
    id: el.id
  }));

  const { hasFinalizedPainel } = useSelector(state => ({
    hasFinalizedPainel: state.faturamentoConciliacaoReducer.hasFinalizedPainel
  }))

  const userRoleNameUser = useSelector(state => state.auth.user.role_name)

  if (hasFinalizedPainel) {
    handleFilter();
    dispatch({ type: "SET_HASFINALIZEDPAINEL_CONCILIACAO", payload: false })
  }

  const isFooter = selection
    .map(item => formatRows[item])
    .map(el => {
      if (el && el.status_id === 105) {
        return true;
      }
      return false;
    });

  const userAccess = params =>
    isFooter.includes(true) ||
    permissions.map(el => el.code).indexOf(params) === -1 ||
    selection.length === 0;

  const allValues = useSelector(({ form: { FiltroConciliacao } }) =>
    get(FiltroConciliacao, "values", {})
  );

  const regenerateBills = () => {
    setLoading(true);
    axios
      .post("bill_conciliates/regenerate_bills", {
        select_bills,
        user_id: userId
      })
      .then(async res => {
        await handleFilter();
        axios.get("bill_regenerates/call_procedure_regenerate")
        toastr.success("", "Operação realizada com sucesso!");
      })
      .catch(err => {
        console.log(err)
        toastr.error("Erro", "Erro ao tentar regerar fatura(s)!");
        setLoading(false)
      })
      .finally(() => {
        getAllGroupsForConciliate(allValues)
          .then(res => {
            dispatch({ type: "SET_ROWSCONCILIACAO", payload: res.data });
            setLoading(false)
          })
      });
  };

  const permitionChangeBillStatus = [{ userRoleName: "Technical Efficiency - ADMIN", permition: [105, 103] }, { userRoleName: "Technical Efficiency - Billing", permition: [103] }]
  //const permitionChangeBillStatus = [{ userRoleName: "ENGENHARIA (NFE_B)", permitions: [105, 103] }, { userRoleName: "Technical Efficiency - Billing", permitions: [103] }]

  React.useEffect(() => {
    if (userPermitions?.length !== 0) {
      setIsPermittedDisabled(!select_bills_statuses.every(elem => userPermitions?.includes(elem)))
    }
  }, [select_bills]);

  React.useEffect(() => {
    permitionChangeBillStatus.map((permitionName) => {
      if (userRoleNameUser == permitionName.userRoleName) {
        setUserPermitions(permitionName.permitions)
      }
    })
  }, []);

  const returnConciliateBills = () => {
    setLoading(true);
    axios
      .post("bill_conciliates/return_conciliate_bills", {
        select_bills,
        user_id: userId
      })
      .then(async res => {
        await handleFilter();
        toastr.success("", "Operação realizada com sucesso!");
      })
      .catch(err => {
        console.log(err)
        toastr.error("Erro", "Erro ao tentar retornar o status da fatura(s)!");
        setLoading(false)
      })
      .finally(() => {
        getAllGroupsForConciliate(allValues)
          .then(res => {
            dispatch({ type: "SET_ROWSCONCILIACAO", payload: res.data });
            setLoading(false)
          })
        //setLoading(false)
      });
  };

  const returnBillTo = () => {
    if (remarks == null || remarks == "") {
      toastr.warning("", "Preencha uma observação.");
    } else {
      setLoading(true);
      axios
        .post("bill_conciliates/return_bills", {
          selectedBills: select_bills,
          user: userId,
          remarks
        })
        .then(async res => {
          await handleFilter();
          toastr.success("", "Fatura(s) devolvida(s) com sucesso!");
          setOpen(false);
        })
        .catch(err => {
          console.log(err)
          toastr.error("Erro", "Erro ao tentar devolver fatura(s)!");
          setLoading(false)
          setOpen(false);
        })
        .finally(() => {
          setLoading(false)
        });
    }
  };

  const setFinalBills = () => {
    let importadas = []
    data.map(el => {
      if (el.status_id == 102) {
        importadas.push({ ...el })
      }
    })
    importadas = importadas.map(el => ({ ...el, status_id: 103 }))
    if (importadas.length == data.length) {
      setLoading(true);
      finalBills(importadas)
        .then(async () => {
          await handleFilter();
          toastr.success("", "Fatura(s) finalizada(s) com sucesso! ");
        })
        .catch(err => {
          console.log(err);
          toastr.error("Erro", "Erro ao tentar finalizar fatura(s)!");
          setLoading(false)
        })
        .finally(() => {
          setLoading(false)
        });
    } else if (importadas.length == 0) {
      toastr.info("Não há nenhuma fatura selecionada passível de finalização")
    } else {
      toastr.confirm("Só serão finalizadas as faturas cujo status é: 'Em Conciliação', deseja continuar?",
        {
          onOk: () => {
            setLoading(true);
            finalBills(importadas)
              .then(async () => {
                await handleFilter();
                toastr.success("", "Fatura(s) finalizada(s) com sucesso! ");
              })
              .catch(err => {
                console.log(err);
                toastr.error("Erro", "Erro ao tentar finalizar fatura(s)!");
                setLoading(false)
              })
              .finally(() => {
                setLoading(false)
              });
          }
        }
      )
    }
  };

  const setAprovBills = () => {
    let importadas = []
    data.map(el => {
      if (el.status_id == 103) {
        importadas.push({ ...el })
      }
    })
    importadas = importadas.map(el => ({ ...el, status_id: 105 }))
    if (importadas.length == data.length) {
      setLoading(true);
      aprovBills(importadas)
        .then(async () => {
          await handleFilter();
          toastr.success("", "Fatura(s) aprovada(s) com sucesso! ");
        })
        .catch(err => {
          console.log(err);
          toastr.error("Erro", "Erro ao tentar aprovar fatura(s)!");
          setLoading(false)
        })
        .finally(() => {
          setLoading(false)
        });
    } else if (importadas.length == 0) {
      toastr.info("Não há nenhuma fatura selecionada passível de aprovação")
    } else {
      toastr.confirm("Só serão aprovadas as faturas cujo status é: 'Aguardando Aprovação', deseja continuar?",
        {
          onOk: () => {
            setLoading(true);
            aprovBills(importadas)
              .then(async () => {
                await handleFilter();
                toastr.success("", "Fatura(s) aprovada(s) com sucesso! ");
              })
              .catch(err => {
                console.log(err);
                toastr.error("Erro", "Erro ao tentar aprovar fatura(s)!");
                setLoading(false)
              })
          }
        }
      )
    }
  };

  const Cell = ({ row }) => {
    const { id, status_id, status } = row;
    if (
      status_id !== 102 &&
      status_id !== 103 &&
      status_id !== 105 &&
      status_id !== 61
    ) {
      return <span style={{ height: 23 }}></span>;
    }

    const btn = () => {
      switch (status_id) {
        case 61:
          return { icon: "book", color: "#00a65a", display: "block" };
        case 102:
          return { icon: "file-text", color: "#00a65a", display: "block" };
        case 105:
          return { icon: "search", color: "#000", display: "block" };
        case 103:
          return { icon: "play", color: "#357ca5", display: "block" };
        default:
          return { icon: "", color: "", display: "none" };
      }
    };

    return (
      <DxTable.Cell data-state="conciliacao" style={{ display: btn().display }}>
        <div className="btn-conciliacao">
          <IconButton
            disabled={!userAccess("DR_COF1F1A1")}
            icon={btn().icon}
            color={btn().color}
            title={status_id === 61 ? "Conciliação" : status}
            onClick={() => {
              setRowValues(row);
              dispatch({ type: "SET_PAINELROWS_CONCILIACAO", payload: row })
              setAllBillById(id);
              logUserMenuAccess("DR_COF1F1A1");
              setPage("painelConciliacao");
            }}
          />
        </div>
      </DxTable.Cell>
    );
  };

  return (
    <>
      <Table
        // getRowId={getRowId}
        className="table-conciliacao"
        rows={formatRows}
        columns={columns}
        columnWidths={conciliacaoColumnWidths}
        loading={loading}
        disablePagination
        showSelectionColumn={false}
        selectionProps={{ selection, onSelectionChange }}
        actions={[{ columnName: "actions", component: Cell }]}
        groupingStateProps={{
          grouping: [{ columnName: "provedor" }]
        }}
        // currencyTypeProviderProps={{
        //   for: [{columnName: 'bill_total'}]
        // }}
        canChangeLineColor={true}
        columnCurrencyName={currencyColumnsAll}
        summaryStateProps={{
          groupItems: [
            {
              columnName: 'previsto',
              type: 'sum',
              showInGroupFooter: false,
              alignByColumn: true,
            },
            {
              columnName: 'bill_total',
              type: 'sum',
              showInGroupFooter: false,
              alignByColumn: true,
            },
            {
              columnName: 'contestar',
              type: 'sum',
              showInGroupFooter: false,
              alignByColumn: true,
            },
            {
              columnName: 'pendente_llm',
              type: 'sum',
              showInGroupFooter: false,
              alignByColumn: true,
            },
            {
              columnName: 'aprovado',
              type: 'sum',
              showInGroupFooter: false,
              alignByColumn: true,
            },
            {
              columnName: 'bill_number',
              type: 'count',
              showInGroupFooter: false,
              alignByColumn: true,
            },
          ]
        }}
      />
      {open && (
        <Modal
          id="TabelaConciliacao"
          open={open}
          onClose={() => {
            // setRemarks("");
            setOpen(false);
          }}
          title="Observação"
          footer={
            <IconButton
              onClick={() => {
                returnBillTo();
                setOpen(false);
              }}
              className="btn-success"
            >
              Salvar
            </IconButton>
          }
        >
          <form>
            <Field
              name="remarks"
              component={LabelField}
            />
          </form>
        </Modal>
      )}
      <div className="tabela-conciliacao__footer">
        <IconButton
          disabled={userAccess("DR_COF1F1D1") || isBtnPlay || isDevolvida}
          className="btn-primary"
          onClick={() => logCodeAndCallback("DR_COF1F1D1", setFinalBills)}
        >
          Finalizar Fatura(s)
        </IconButton>
        <IconButton
          disabled={userAccess("DR_COF1F1E1") || isDevolvida}
          className="btn-success"
          onClick={() => logCodeAndCallback("DR_COF1F1E1", setAprovBills)}
        >
          Aprovar Fatura(s)
        </IconButton>
        <IconButton
          disabled={userAccess("DR_COF1F1B1") || isDevolvida}
          className="btn-warning"
          onClick={() => logCodeAndCallback("DR_COF1F1B1", () => { setOpen(true) })}
        >
          Devolver Fatura(s)
        </IconButton>
        <IconButton
          disabled={userAccess("DR_COF1F1C1") || isDevolvida}
          className="btn-bitbucket"
          onClick={() => logCodeAndCallback("DR_COF1F1C1", regenerateBills)}
        >
          Regerar Fatura(s)
        </IconButton>
        {(userRoleNameUser === "Technical Efficiency - Billing" ||
          userRoleNameUser === "Technical Efficiency - ADMIN") &&
          (
            <IconButton
              className="btn-warning"
              disabled={isPermittedDisabled || select_bills.length === 0}
              onClick={() => {
                toastr.confirm(
                  "Esta ação irá alterar o status da fatura, deseja continuar?",
                  {
                    onOk: () => {
                      logCodeAndCallback("DR_COF1F1C1", returnConciliateBills)
                    }
                  }
                );
              }}
            >
              Retornar para "Em conciliação"
            </IconButton>
          )
        }
        {
          (isPermittedDisabled === true &&
            select_bills_statuses.length > 0) && (userRoleNameUser === "Technical Efficiency - Billing" ||
              userRoleNameUser === "Technical Efficiency - ADMIN") && (
            <>
              <IconButton
                data-for="top_dark_float"
                data-tip="Um ou mais linhas selecionadas estão inválidas para retornar o status da fatura."
                //type="button"
                className="btn-link pull-Right"
              >
                <i style={{ color: "#FFA500" }} className="fa fa-warning fa-lg" data-toggle="tooltip" />
              </IconButton>
              <ReactTooltip
                id="top_dark_float"
                place="right"
                type="dark"
                effect="float"
              />
            </>)
        }
      </div>
    </>
  );
};

const formWrapper = reduxForm({
  form: "TabelaConciliacao"
})(TabelaConciliacao);

const mapStateToProps = ({ auth: { user }, form: { TabelaConciliacao } }) => ({
  permissions: get(user, "permissions", {}),
  userId: get(user, "id", null),
  remarks: get(TabelaConciliacao, "values.remarks", null)
});

export default connect(mapStateToProps)(formWrapper);
