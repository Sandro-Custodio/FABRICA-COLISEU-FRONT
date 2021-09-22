import React from 'react'
import Header from "../comps/Header"
import Table from "../comps/Table"
import { useDispatch, useSelector } from "react-redux";
import { toastr } from "react-redux-toastr";
import { getTableData, getProjects} from "../actions";
import get from "lodash/get";


function Rollout() {

    const [showTable, setShowTable] = React.useState(true);

    const allValues = useSelector(({ form: { DashboardFields } }) =>
        get(DashboardFields, "values", {})
    );

    const dataTableState = useSelector(state => state.dashboard.dataTable);
    const dataAuxTableState = useSelector(state => state.dashboard.dataAuxTable);
    const titleCurrent = useSelector(state => state.dashboard.titleCurrent);
    const [projects, setProjects] = React.useState([]);

    React.useEffect(() => {
        if ((dataTableState.length == 0) || (titleCurrent != "rollout")) {
            setShowTable(false);
        }
    }, []);

    const dispatch = useDispatch()

    const handleFilter = () => {
        if (allValues?.year) {
          dispatch([{ type: "SHOW_OVERLAY" }]);
          Promise.all([getProjects(),getTableData(allValues.year, "rollout")])
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
              dispatch({ type: "CURRENT_SCREEN", payload: "rollout" });
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
            {/* <Header handleFilter={handleFilter} title="Rollout" />
            <Table showTable={showTable} dataAuxTable={dataAuxTableState} title="Rollout" dataTable={dataTableState} />*/}
            <h1 style={{padding: "10px"}}>
              Página em desenvolvimento.
            </h1>
        </div>
    )
}

export default Rollout
