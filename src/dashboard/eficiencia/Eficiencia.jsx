import React from 'react'
import Header from "../comps/Header"
import Table from "../comps/Table"
import { getTableData, getProjects } from "../actions";
import get from "lodash/get";
import { useDispatch, useSelector } from "react-redux";
import { toastr } from "react-redux-toastr";

function Eficiencia() {

  const allValues = useSelector(({ form: { DashboardFields } }) =>
    get(DashboardFields, "values", {})
  );

  const dispatch = useDispatch()

  const [showTable, setShowTable] = React.useState(true);
  const [projects, setProjects] = React.useState([]);

  const dataTableState = useSelector(state => state.dashboard.dataTable);
  const dataAuxTableState = useSelector(state => state.dashboard.dataAuxTable);
  const titleCurrent = useSelector(state => state.dashboard.titleCurrent);


  React.useEffect(() => {
    // limpar table.
    if ((dataTableState.length == 0) || (titleCurrent != "eficiencia")) {
      setShowTable(false);
    }
    //setShowTable(false);
    //dispatch([{ type: "CLEAR_DATA_TABLE" }])
  }, []);

  const handleFilter = () => {
    if (!allValues.year) {
      allValues.year = new Date().getFullYear();
    }
    if (allValues?.year) {
      dispatch([{ type: "SHOW_OVERLAY" }]);
      Promise.all([getProjects(), getTableData(allValues.year, "efic")])
        .then(res => {
          dispatch({ type: "SET_PROJECTS", payload: res[0].data });
          dispatch({
            type: "DATA_TABLE", payload: res[1].data[0].map((el) => ({
              projeto: el.projeto,
              tipo: el.tipo,
              val: [" ", Math.round(el.janeiro * 100) / 100, Math.round(el.fevereiro * 100) / 100, Math.round(el.marco * 100) / 100, Math.round(el.abril * 100) / 100, Math.round(el.maio * 100) / 100, Math.round(el.junho * 100) / 100, Math.round(el.julho * 100) / 100, Math.round(el.agosto * 100) / 100, Math.round(el.setembro * 100) / 100, Math.round(el.outubro * 100) / 100, Math.round(el.novembro * 100) / 100, Math.round(el.dezembro * 100) / 100, Math.round(el.total * 100) / 100]
            }))
          });
          dispatch({ type: "DATA_AUX_TABLE", payload: res[1].data[1] });
          dispatch({ type: "CURRENT_SCREEN", payload: "eficiencia" });
          dispatch({ type: "CURRENT_YEAR", payload: allValues?.year });

          setShowTable(true);
        })
        .catch(err => console.log(err.response))
        .finally(() => {
          dispatch([{ type: "HIDE_OVERLAY" }]);
        });
    } else {
      toastr.error("Selecione o ano");
    }
  };

  return (
    <div>
      <Header handleFilter={handleFilter} title="Eficiência" />
      <Table showTable={showTable} dataAuxTable={dataAuxTableState} title="Eficiência" dataTable={dataTableState} />
    </div>
  )
}

export default Eficiencia
