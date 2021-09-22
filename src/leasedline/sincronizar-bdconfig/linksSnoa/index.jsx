import React from "react";
import { Table, Loading } from "common";
import { Panel } from "../../../common/comps";
import Header from "./header"
import columns from "./columns"
import { getSnoaHigieneCritics } from "../actions"
import { useDispatch, useSelector } from "react-redux";

const LinksSnoa = () => {

    const dispatch = useDispatch()
    const {loading} = useSelector(state => ({
        loading: state.sincronizarBdConfigReducer.loading
    }))

    React.useEffect(() => {
        (async () => {
        dispatch({type: "SET_LOADING_BDCONFIG",payload: true})
        await dispatch(getSnoaHigieneCritics())
        dispatch({type: "SET_LOADING_BDCONFIG",payload: false})
        })();
        return () => {
            dispatch({type: "RESET_BDCONFIG_REDUCER"})
        }
      }, []);
      const {rows} = useSelector( state => ({
          rows: state.sincronizarBdConfigReducer.snoa_critics_list
      }))

      
    return (
        <Panel header={<Header />}>
        <div className="overlay-wrapper">{loading && <Loading />}</div>
            <Table
                disablePagination
                rows={rows} 
                columns={columns}
            />
        </Panel>
    )
}

export default LinksSnoa