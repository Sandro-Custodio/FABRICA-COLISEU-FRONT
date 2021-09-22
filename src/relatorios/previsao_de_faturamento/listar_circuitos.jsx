import React from "react"
import { connect } from "react-redux";

import {
    GroupingState,
    IntegratedGrouping,
} from "@devexpress/dx-react-grid";

import {
    Grid as DxGrid,
    VirtualTable,
    TableHeaderRow,
    TableGroupRow,
    Toolbar,
} from "@devexpress/dx-react-grid-bootstrap3";

import ExportCsv from "./export_csv"

const ListarCircuito = props => {
    const { reducer: { circuitos: { columns, rows } } } = props
    const fix = (n) => Number(n).toLocaleString('pt-BR')
    const list = rows.map(i => ({
        ...i,
        valor_mensalidade: fix(i.valor_mensalidade),
        pro_rata_desativacao: fix(i.pro_rata_desativacao),
        pro_rata_ativacao: fix(i.pro_rata_ativacao),
        taxa_ativacao: fix(i.taxa_ativacao),
    }))
    return (
        <div>
            <DxGrid rows={list} columns={columns} showBorders>
                <GroupingState defaultGrouping={[{ columnName: "agrupador" }]} />
                <IntegratedGrouping />
                <VirtualTable />
                <TableHeaderRow />
                <Toolbar/>
                <ExportCsv
                    columns={columns}
                    rows={list}
                    name="Circuitos"
                />
                <TableGroupRow showColumnsWhenGrouped />
            </DxGrid>
        </div>
    )
}

const mapStateToProps = state => ({ reducer: state.previsaoDeFaturamentoReducer })
export default connect(mapStateToProps)(ListarCircuito)