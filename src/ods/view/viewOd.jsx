import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import ReadODS from "../list/viewODS/ReadODS"
import TableProvCirc from "../list/viewODS/TableProvCirc"
import ContentHeader from "common/adminLTE/contentHeader"
import Content from "common/adminLTE/content"
import Grid from "common/layout/grid"
import Overlay from "common/msg/overlay/overlay"

import { getOdByCode } from "./actions"

import "./view.css"

const ViewOD = props => {

    const {
        reducer: {
            describe
        },
        odCode,
        show_loading,
        getOdByCode,
    } = props

    React.useEffect($ => {
        getOdByCode(odCode)
    }, [])

    return (
        <div>
            {show_loading && <div className="cts-overlay overlay-wrapper">
                <Overlay />
            </div>}
            <div className="fade-in fade-out">
                <div className="header">
                    <div className="header__left-items">
                        <ContentHeader title="Visualização da OD" small={odCode} />
                    </div>
                </div>
                {(describe === undefined) && <Grid cols="12">
                    <div className="not-found">
                        <p><i className="fa fa-exclamation-triangle" /> OD Não Encontrada.</p>
                    </div>
                </Grid>}
                {(describe !== undefined && Object.entries(describe).length !== 0) && <Content>
                    <Grid cols="12">
                        <ReadODS describe={describe} />
                        <TableProvCirc viewOnly={true} describe={describe} />
                    </Grid>
                </Content>}
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
    reducer: state.viewOdReducer,
    show_loading: state.overlay.show,
})

const mapDispatchToProps = dispatch => bindActionCreators({ getOdByCode, }, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewOD)
