import React from "react"
import { Plugin, Template } from "@devexpress/dx-react-core";
import { connect } from "react-redux";
import ExportExcel from "../../common/exportExcel/index"
import { export_all } from "./actions"
import { bindActionCreators } from "redux";

const convert_to_csv = object => {
    let array = typeof object != 'object' ? JSON.parse(object) : object;
    let str = '';
    for (let i = 0; i < array.length; i++) {
        let line = '';
        for (let index in array[i]) {
            if (line != '') line += ','
            line += array[i][index];
        }
        str += line + '\r\n';
    }
    return str;
}

const handle_export_csv = object => {
    console.log(convert_to_csv(object))
}

const mapAndFix = rows => rows.map(i => ({
    ...i,
    emissao: i.emissao && (i.emissao !== "" && new Date(i.emissao).toLocaleDateString('pt-BR')),
    vencimento: i.vencimento && (i.vencimento !== "" && new Date(i.vencimento).toLocaleDateString('pt-BR')),
    valor_fatura: Number(i.valor_fatura).toFixed(2),
    custo_dd: Number(i.custo_dd).toFixed(2),
    diferenca: Number(i.diferenca).toFixed(2),
}))

const ExportCsv = ({ rows, columns, name, export_all, data_export, cached_params }) => {
    return (
        <Plugin name="ToolbarColumn">
            <Template name="toolbarContent">
                <div className="toolbar">
                    <div>
                        <span>&nbsp;</span>
                    </div>
                    <div>
                        <ExportExcel
                            rows={mapAndFix(rows)}
                            columns={columns}
                            name={name}
                        >
                            <button className="btn btn-success pull-right btn-csv" disabled={rows.length == 0}>
                                <i className="fa fa-file-excel-o"></i> &nbsp;Exportar Página
                            </button>
                        </ExportExcel>
                        <ExportExcel
                            rows={mapAndFix(data_export)}
                            columns={columns}
                            name={name}
                        >
                            <button style={{ display: "none" }} id="export-all" />
                        </ExportExcel>
                        <button
                            className="btn btn-success pull-right btn-csv"
                            disabled={rows.length == 0}
                            onClick={() => export_all({ params: cached_params })}
                        >
                            <i className="fa fa-file-excel-o"></i> &nbsp;Exportar Todo o Resultado
                        </button>
                    </div>
                </div>
            </Template>
        </Plugin>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
});

const mapDispatchToProps = dispatch => bindActionCreators({ export_all }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ExportCsv);