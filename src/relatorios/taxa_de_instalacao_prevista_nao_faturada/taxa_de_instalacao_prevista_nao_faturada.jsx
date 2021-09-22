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
    Toolbar,
    TableFilterRow,
    TableColumnResizing,
} from "@devexpress/dx-react-grid-bootstrap3"

import Content from "../../common/adminLTE/content"
import ContentHeader from "../../common/adminLTE/contentHeader"
import Grid from "../../common/layout/grid"
import Overlay from "../../common/msg/overlay/overlay"
import ExportCsv from "./export_csv"

import "./styles.css"

import {
    get_not_fat,
} from "./actions"

const TaxaDeInstalacaoPrevistaNaoFaturada = props => {

    const {
        reducer: {
            rows,
            columns,
            pages,
            items,
            data_export,
        },
        get_not_fat,
        show_loading,
    } = props

    const [page, set_page] = React.useState(1)
    const [limit, set_limit] = React.useState(100)
    const [go_page, set_go_page] = React.useState("first")
    const [fired, set_fired] = React.useState(false)

    React.useEffect(_ => {
        get_not_fat({ page: 1, limit })
        return undefined
    }, [])

    const fix = n => Number(n).toFixed(2)
    const fixDate = d => new Date(d).toLocaleDateString("pt-BR")

    const mapAndFix = rows => rows.map(i => ({
        ...i,
        data_ativacao: i.data_ativacao && fixDate(i.data_ativacao),
        taxa_ins_s_imp: i.taxa_ins_s_imp && fix(i.taxa_ins_s_imp),
        taxa_ins_c_imp: i.taxa_ins_c_imp && fix(i.taxa_ins_c_imp)
    })) 

    //const list = mapAndFix(rows)
    //const export_data = mapAndFix(data_export)
    const list_table = mapAndFix(rows)
    const list = rows
    const export_data = data_export

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
                        return get_not_fat({ page: 1, limit })
                    case "target":
                        return get_not_fat({ page, limit })
                    case "last":
                        return get_not_fat({ page: pages, limit })
                }
            }
        }
    }

    const backward_or_forward = new_page => {
        if (new_page > 0 && new_page <= pages) {
            set_page(new_page)
            get_not_fat({ page: new_page, limit })
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
                get_not_fat({ page: 1, limit })
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
                        <ContentHeader title="Taxa de Instalação Prevista Não Faturada" />
                    </div>
                </div>
                <Content>
                    <Grid cols="12">
                        <DxGrid rows={list_table} columns={columns}>
                            <SortingState />
                            <IntegratedSorting />
                            <VirtualTable />
                            <TableColumnResizing
                                defaultColumnWidths={columns.map(c => ({
                                    columnName: c.name,
                                    width: 140
                                }))}
                            />
                            <TableHeaderRow showSortingControls />
                            <Toolbar />
                            <ExportCsv
                                rows={list}
                                columns={columns}
                                data_export={export_data}
                                name="Taxa de Instalação Prevista Não Faturada"
                            />
                            <FilteringState defaultFilters={[]} />
                            <IntegratedFiltering />
                            <TableFilterRow />
                        </DxGrid>
                    </Grid>
                    <Grid cols="12">
                        <div className="footer-info">
                            <div className="info" style={{ paddingLeft: "15px", paddingBottom: "10px" }}>
                                <p>Pressione <b>ENTER</b> para alterar a <b>página</b> ou a quantidade de <b>elementos</b> exibidos.</p>
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
                                <span>Página </span>
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
                                <span> &nbsp; por página.</span>
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
    reducer: state.taxaDeInstalacaoPrevistaNaoFaturadaReducer,
    show_loading: state.overlay.show,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    get_not_fat
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TaxaDeInstalacaoPrevistaNaoFaturada)