import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import get from "lodash/get";
import axios from "axios";
import Conciliacao from "./Conciliacao";
import PainelConciliacao from "./PainelConciliacao";
import {
  getAllByBillId,
  getMonths,
  getOperatorsAndVendors,
  getGroups
} from "./actions";
import "./styles.css";

export default () => {
  const [page, setPage] = useState("conciliacao");
  const [selection, onSelectionChange] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [months, setMonths] = useState([]);
  const [opAndVendors, setOpAndVendors] = useState([[], [], [], []]);
  const [groups, setGroups] = useState([]);

  const [rowValues, setRowValues] = useState({});
  const userId = useSelector(({ auth: { user } }) => get(user, "id", null));
  const dispatch = useDispatch()

  useEffect(() => {
    (() => {
    axios.all([getMonths(), getOperatorsAndVendors(), getGroups()])
      .then(res => {
        setMonths(res[0].data);
        setOpAndVendors(res[1].data);
        setGroups(res[2].data);
      })
      .catch(err => console.log(err.response));
    })();
    return () => {
      dispatch({type:"RESET_FATURAMENTOCONCILIACAO_REDUCER"})
    };
  }, []);

  const setAllBillById = billId => {
    setLoading(true);
    getAllByBillId(billId, userId)
      .then(res => {
        setRows(res.data)
        dispatch({type: "SET_ALLBILL_CONCILIACAO", payload: res.data.bill})
        const formatedBillItems = res.data.bill_items.map(el => {
          return {
            ...el,
            qtd_circuitos: el.apontado !== 0 ? el.qtd_circuitos : 0
          }
        })
        dispatch({type:"SET_BILLITEMS_CONCILIACAO", payload: formatedBillItems})
        dispatch({type:"SET_USERLOGIN_CONCILIACAO", payload: res.data.userLogin})
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  };

  // const rowSelected = selection.map(item => rows[item]);
  return (
    <div className="fade-in fade-out conciliacao">
      <div style={{ display: page === "conciliacao" ? "block" : "none" }}>
        <Conciliacao
          setPage={setPage}
          style={{ display: "none" }}
          onSelectionChange={onSelectionChange}
          selection={selection}
          setAllBillById={billId => setAllBillById(billId)}
          setRowValues={setRowValues}
          setMonths={setMonths}
          setOpAndVendors={setOpAndVendors}
          setGroups={setGroups}
          groups={groups}
          months={months}
          opAndVendors={opAndVendors}
        />
      </div>
      <div style={{ display: page === "painelConciliacao" ? "block" : "none" }}>
        <PainelConciliacao
          setPage={setPage}
          loading={loading}
          setLoading={setLoading}
          onSelectionChange={onSelectionChange}
          rows={rows}
          rowValues={rowValues}
          groups={groups}
          months={months}
          opAndVendors={opAndVendors}
        />
      </div>
    </div>
  );
};
