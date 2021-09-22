import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import get from "lodash/get";
import Grid from "common/layout/grid";
import ContentHeader from "common/adminLTE/contentHeader";
import Content from "common/adminLTE/content";
import FiltroConciliacao from "./FiltroConciliacao";
import TabelaConciliacao from "./TabelaConciliacao";
import { getAllGroupsForConciliate } from "../actions";
import { toastr } from "react-redux-toastr";
import { reset } from "redux-form";

const Main = ({
  setPage,
  onSelectionChange,
  selection,
  setAllBillById,
  setRowValues,
  groups,
  setGroups,
  months,
  opAndVendors
}) => {
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rowsConciliacao, setRowsConciliacao] = useState([]);
  const allValues = useSelector(({ form: { FiltroConciliacao } }) =>
    get(FiltroConciliacao, "values", {})
  );

  const { rows } = useSelector(state => ({
    rows: state.faturamentoConciliacaoReducer.rows
  }));
  const dispatch = useDispatch();

  const handleFilter = () => {
    if (allValues?.month_begin && allValues?.month_end) {
      setLoading(true);
      getAllGroupsForConciliate(allValues)
        .then(res => {
          dispatch({ type: "SET_ROWSCONCILIACAO", payload: res.data });
        })
        .catch(err => console.log(err.response))
        .finally(() => {
          onSelectionChange([]);
          setLoading(false);
          // dispatch(reset("FiltroConciliacao"));
        });
    } else {
      toastr.error("Campos Mês Início e Mês Fim obrigatórios.");
    }
  };

  return (
    <div>
      <div className="header">
        <ContentHeader title="Faturamento" small="Conciliação" />
      </div>
      <Content>
        <Grid cols="12">
          <FiltroConciliacao
            handleFilter={handleFilter}
            groups={groups}
            months={months}
            opAndVendors={opAndVendors}
            setGroups={setGroups}
          />
          <div className="table-conciliacao">
            <TabelaConciliacao
              setLoading={setLoading}
              loading={loading}
              rows={rows}
              selection={selection}
              checked={checked}
              setChecked={setChecked}
              onSelectionChange={onSelectionChange}
              setPage={setPage}
              setAllBillById={setAllBillById}
              setRowValues={setRowValues}
              handleFilter={handleFilter}
            />
          </div>
        </Grid>
      </Content>
    </div>
  );
};

export default Main;
