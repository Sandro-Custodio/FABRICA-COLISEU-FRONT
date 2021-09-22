import React from "react";
import { Table, Loading } from "common";
import { Panel } from "../../../common/comps";
import Header from "./header"
import columns from "./columns"
import { getCriticasHigienizacao } from "../actions"
import { useDispatch, useSelector } from "react-redux";
import Paginator from "common/paginator/";

const BdConfig = () => {

    const dispatch = useDispatch()
    const {loading} = useSelector(state => ({
        loading: state.sincronizarBdConfigReducer.loading
    }))

    React.useEffect(() => {
        (async () => {
        await dispatch(getCriticasHigienizacao())
        dispatch({type: "SET_LOADING_BDCONFIG",payload: false})
        })();
        return () => {
            dispatch({type: "RESET_BDCONFIG_REDUCER"})
        }
    }, []);
    const { rows } = useSelector(state => ({
        rows: state.sincronizarBdConfigReducer.bdconfig_critics_list
    }))

    return (
        <div>
        <Panel header={<Header />}>
        <div className="overlay-wrapper">{loading && <Loading />}</div>
            <Table
                disablePagination
                rows={rows}
                columns={columns}
            />
        </Panel>
        {/* <Paginator useCase="LISTAR_USUARIOS" /> */}
        </div>
    )
}

export default BdConfig