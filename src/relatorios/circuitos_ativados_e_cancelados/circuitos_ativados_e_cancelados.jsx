import React from "react"
import { connect } from "react-redux"
import { reduxForm, Field } from "redux-form"
import { bindActionCreators } from "redux"

import {
    SortingState,
    IntegratedSorting,
    FilteringState,
    IntegratedFiltering,    
} from "@devexpress/dx-react-grid"

import {
    Grid as DxGrid,
    VirtualTable,
    TableHeaderRow,
    TableFilterRow,
    Toolbar,
    TableColumnResizing,
} from "@devexpress/dx-react-grid-bootstrap3"

import Content from "../../common/adminLTE/content"
import ContentHeader from "../../common/adminLTE/contentHeader"
import Grid from "../../common/layout/grid"
import Overlay from "../../common/msg/overlay/overlay"
import ExportCsv from "./export_csv"

import {
    get_all_credit_prev,
} from "./actions"

import "./styles.css"

const CircuitosAvaliadosCancelados = props => {

    const {
        reducer: {
            rows,
            columns,
            pages,
            items,
            data_export,
        },
        get_all_credit_prev,
        show_loading,
    } = props

    const [page, set_page] = React.useState(1)
    const [limit, set_limit] = React.useState(100)
    const [go_page, set_go_page] = React.useState("first")
    const [fired, set_fired] = React.useState(false)

    React.useEffect(_ => {
        get_all_credit_prev({ page: 1, limit })
        return undefined
    }, [])

    const fix = n => Number(n).toFixed(2)
    const fixDate = d => new Date(d).toLocaleDateString("pt-BR")

    const mapAndFix = rows => rows.map(i => ({
        ...i,
        vl_mensal_s_impostos: i.vl_mensal_s_impostos && fix(i.vl_mensal_s_impostos),
        vl_mensal_c_impostos: i.vl_mensal_c_impostos && fix(i.vl_mensal_c_impostos),
        tx_instalacao_c_impostos: i.tx_instalacao_c_impostos && fix(i.tx_instalacao_c_impostos),
        tx_instalacao_s_impostos: i.tx_instalacao_s_impostos && fix(i.tx_instalacao_s_impostos),
        sla: i.sla && fix(i.sla),
        previsao_multa_atraso_ativacao: i.previsao_multa_atraso_ativacao && fix(i.previsao_multa_atraso_ativacao),
        previsao_multa_por_canc: i.previsao_multa_por_canc && fix(i.previsao_multa_por_canc),
        data_contratacao: i.data_contratacao && fixDate(i.data_contratacao),
        previsao_ativacao_regulamentar: i.previsao_ativacao_regulamentar && fixDate(i.previsao_ativacao_regulamentar),
        previsao_ativacao_negociada: i.previsao_ativacao_negociada && fixDate(i.previsao_ativacao_negociada),
        data_inicio_pend_tim: i.data_inicio_pend_tim && fixDate(i.data_inicio_pend_tim),
        data_conclusao_pend_tim: i.data_conclusao_pend_tim && fixDate(i.data_conclusao_pend_tim),
        data_ativacao: i.data_ativacao && fixDate(i.data_ativacao),
        dt_export: i.dt_export && fixDate(i.dt_export),
        data_distrato: i.data_distrato && fixDate(i.data_distrato),
    }))

    const list = mapAndFix(rows)
    const export_data = mapAndFix(data_export)

    const columnWidths = columns.map(c => ({
        columnName: c.name,
        width: 140
    }))

    const change_page = e => {

        const p = e.target.value

        if (parseInt(p) > pages) {
            set_page(pages)
            set_go_page("last")
        }
        else if (parseInt(p) < 1 || p == "") {
            set_page(1)
            set_go_page("first")
        }
        else {
            set_page(parseInt(e.target.value))
            set_go_page("target")
        }
    }

    const handle_change_page = e => {
        if (!fired) {
            set_fired(true)
            if (e.key === 'Enter') {
                document.activeElement.blur()
                switch (go_page) {
                    case "first":
                        return get_all_credit_prev({ page: 1, limit })
                    case "target":
                        return get_all_credit_prev({ page, limit })
                    case "last":
                        return get_all_credit_prev({ page: pages, limit })
                }
            }
        }
    }

    const backward_or_forward = new_page => {
        if (new_page > 0 && new_page <= pages) {
            set_page(new_page)
            get_all_credit_prev({ page: new_page, limit })
        }
    }

    const change_limit = e => {
        const l = e.target.value
        if (parseInt(l) > 500) {
            set_page(500)
        }
        else if (parseInt(l) < 1 || l == "") {
            set_limit(1)
        }
        else {
            set_limit(parseInt(e.target.value))
        }
    }

    const handle_change_limit = e => {
        if (!fired) {
            set_fired(true)
            if (e.key === 'Enter') {
                set_page(1)
                get_all_credit_prev({ page: 1, limit })
                document.activeElement.blur()
            }
        }
    }

    return (
        <div>
            {show_loading && <div className="cts-overlay overlay-wrapper">
                <Overlay />
            </div>}
            <div className="fade-in fade-out">
                <div className="header">
                    <div className="header__left-items">
                        <ContentHeader title="Circuitos Ativados e Cancelados" small="Relat??rio de Cr??ditos Recebidos e Pendentes" />
                    </div>
                </div>
                <Content>
                    <Grid cols="12">
                        <DxGrid rows={list} columns={columns}>
                            <SortingState />
                            <IntegratedSorting />
                            <VirtualTable />
                            <TableColumnResizing defaultColumnWidths={columnWidths} />
                            <TableHeaderRow showSortingControls />
                            <Toolbar />
                            <ExportCsv
                                rows={list}
                                columns={columns}
                                data_export={export_data}
                                name="Circuitos Ativados e Cancelados"
                            />
                            <FilteringState defaultFilters={[]} />
                            <IntegratedFiltering />
                            <TableFilterRow />
                        </DxGrid>
                    </Grid>
                    <Grid cols="12">
                        <div className="footer-info">
                            <div className="info" style={{ paddingLeft: "15px", paddingBottom: "10px" }}>
                                <p>Pressione <b>ENTER</b> para alterar a <b>p??gina</b> ou a quantidade de <b>elementos</b> exibidos.</p>
                            </div>
                            <div className="info-right">
                                <p>Foram encontrados <b>{items}</b> elementos.</p>
                            </div>
                        </div>
                        <div className="grid-footer">
                            <div className="paginator">
                                <a className="btn btn-link" onClick={_ => backward_or_forward(1)}>
                                    <i className="fa fa-fast-backward"></i>
                                </a>
                                <a className="btn btn-link" onClick={_ => backward_or_forward(page - 1)}>
                                    <i className="fa fa-step-backward"></i>
                                </a>
                                <span>P??gina </span>
                                <input
                                    className="form-control paginator-field"
                                    type="number"
                                    value={page}
                                    onKeyDown={handle_change_page.bind(this)}
                                    onKeyUp={() => set_fired(false)}
                                    onChange={change_page.bind(this)}
                                    name="page"
                                    min={1}
                                    max={pages}
                                    autoComplete="off"
                                />
                                <span> De &nbsp; <b>{pages}</b>&nbsp;</span>
                                <a className="btn btn-link" onClick={_ => backward_or_forward(page + 1)}>
                                    <i className="fa fa-step-forward"></i>
                                </a>
                                <a className="btn btn-link" onClick={_ => backward_or_forward(pages)}>
                                    <i className="fa fa-fast-forward"></i>
                                </a>
                            </div>
                            <div className="grid-count">
                                <span>Mostrar &nbsp;</span>
                                <input
                                    className="form-control paginator-field"
                                    type="number"
                                    value={limit}
                                    onKeyDown={handle_change_limit.bind(this)}
                                    onKeyUp={() => set_fired(false)}
                                    onChange={change_limit.bind(this)}
                                    name="page"
                                    min={10}
                                    max={500}
                                    autoComplete="off"
                                />
                                <span> &nbsp; por p??gina.</span>
                            </div>
                        </div>
                    </Grid>
                </Content>
            </div>
        </div>
    )

}

const mapStateToProps = state => ({
    auth: state.auth,
    reducer: state.circuitosAtivadosCanceladosReducer,
    show_loading: state.overlay.show,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    get_all_credit_prev
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CircuitosAvaliadosCancelados)