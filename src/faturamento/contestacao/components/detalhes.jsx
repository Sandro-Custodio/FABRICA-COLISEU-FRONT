import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { toastr } from "react-redux-toastr";
import get from "lodash/get";
import ReactTooltip from "react-tooltip";

import ModalForm from "../../../common/layout/modal";
import { LabelField } from "common/form/components";

import {
    SortingState,
    IntegratedSorting,
    FilteringState,
    IntegratedFiltering,
    TableColumnResizing,
} from "@devexpress/dx-react-grid";

import { Plugin, Template } from "@devexpress/dx-react-core";

import {
    Grid as DxGrid,
    Table,
    TableHeaderRow,
    TableFilterRow,
    Toolbar,
} from "@devexpress/dx-react-grid-bootstrap3";

import DetalhesInconsistencia from "./detalhesInconsistencia";

const Detalhes = props => {

    const {
        reducer: {
            table_overflow,
            inconsistencies,
        },
        selectedBill,
    } = props;

    let bill = selectedBill ? selectedBill : {};

    Object.entries(bill).forEach(([key]) => {
        if (bill[key] === null)
            bill[key] = "";
    });

    React.useEffect(() => {
        window.$("#detalhes-contestacao").on("show.bs.modal", () => {
            window.$("html").css("overflow-y", "hidden!important");
        });
        window.$("#detalhes-contestacao").on("hide.bs.modal", () => {
            window.$("html").css("overflow-y", "auto");
        });
    }, []);

    const number = n => {
        if (n !== null)
            return Number(n).toFixed(2);
        else return ""
    };

    const date = d => {
        if (d !== null)
            return new Date(d).toLocaleDateString("pt-BR", { timeZone: "UTC" });
        else return "";
    };

    const getTotalAppointed = () => {
        const total = number(bill.total_appointed);
        const percent = number(total / bill.bill_total) * 100;
        return "R$ " + total + " (" + number(percent) + "%)";
    };

    const getTotalContest = () => {
        const total = number(bill.total_contest);
        const percent = number(total / bill.bill_total) * 100;
        return "R$ " + total + " (" + number(percent) + "%)";
    };

    const getTotalAccepted = () => {
        const total = number(bill.total_accepted);
        const percent = number(total / bill.bill_total) * 100;
        return "R$ " + total + " (" + number(percent) + "%)";
    };

    const getTotalCredit = () => {
        const total = number(bill.total_credit);
        const percent = number(total / bill.bill_total) * 100;
        return "R$ " + total + " (" + number(percent) + "%)";
    };

    const getTotalBalance = () => {
        const total = number(bill.balance);
        const percent = number(total / bill.bill_total) * 100;
        return "R$ " + total + " (" + number(percent) + "%)";
    };

    const columns = [
        { name: "bill_dif_type_id", title: "Seq." },
        { name: "bill_dif_type_name", title: "Inconsistência" },
        { name: "qtd_circuitos", title: "Circuitos" },
        { name: "qtd_dd_lines", title: "Itens de Fatura" },
        { name: "apontado", title: "Apontado" },
        { name: "contestar", title: "Contestado" },
        { name: "devido", title: "Devido" },
        { name: "aceito", title: "Aceito" },
        { name: "negado", title: "Não Aceito" },
        { name: "pendente_llm", title: "Pendente" },
        { name: "actions", title: "-" },
    ];

    const columnWidths = columns.map(c => ({
        columnName: c.name,
        width: c.name == "bill_dif_type_id" ? 42 : c.name == "bill_dif_type_name" ? 300 : 120
    }));

    let items = inconsistencies.map(i => ({ ...i, actions: null }));

    const [sInconsistency, setInconsistency] = React.useState({});

    const customCell = props => {

        const { column, row } = props;

        const openIconcistenceModal = () => {
            const inconsistency = inconsistencies.filter(i => i.id === row.id)[0];
            setInconsistency(inconsistency);
            window.$("#itens-inconsistencia").modal("show");
        };

        return (
            <td>
                {(column.name == "actions" && number(row.contestar) > 0) ? (<>
                    <button
                        className="btn btn-link btn-sm"
                        data-for="top_dark_float"
                        data-tip="Detalhar"
                        onClick={() => openIconcistenceModal()}
                    >
                        <i className="fa fa-sitemap" />
                        <ReactTooltip
                            id="top_dark_float"
                            place="top"
                            type="dark"
                            effect="float"
                        />
                    </button>
                </>) : row[column.name]}
            </td>
        )
    }

    return (
        <div>
            <ModalForm
                LabelButtonSubmit="Painel de Contestação de Fatura"
                id="detalhes-contestacao"
                title="Painel de Contestação de Fatura"
                dimension="modal-detalhes-contestacao"
            >
                <div className="row">
                    <div className="col-md-5">
                        <div className="box box-primary">
                            <div className="box-body">
                                <div className="row">
                                    <div className="col-md-7">
                                        <label><font color="red">Cadastrada por</font></label>
                                        <input type="text" disabled className="form-control" style={{ color: "red" }} value={bill.user_login || ""} />
                                    </div>
                                    <div className="col-md-5">
                                        <label><font color="red">Em</font></label>
                                        <input type="text" disabled className="form-control" value={date(bill.created_at)} style={{ color: "red" }} />
                                    </div>
                                </div>
                                <div className="pd-divisor" />
                                <div className="row">
                                    <div className="col-md-7">
                                        <label><font color="red">Aprovada Por</font></label>
                                        <input type="text" disabled className="form-control" style={{ color: "red" }} value={bill.approv_user_login || ""} />
                                    </div>
                                    <div className="col-md-5">
                                        <label><font color="red">Em</font></label>
                                        <input type="text" disabled className="form-control" style={{ color: "red" }} value={date(bill.approved_at)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-7">
                        <div className="box box-primary">
                            <div className="box-body">
                                <div className="row">
                                    <div className="col-md-4">
                                        <label>R$ Apontado</label>
                                        <input type="text" disabled className="form-control" value={getTotalAppointed()} />
                                    </div>
                                    <div className="col-md-4">
                                        <label>R$ Contestado</label>
                                        <input type="text" disabled className="form-control" value={getTotalContest()} />
                                    </div>
                                    <div className="col-md-4">
                                        <label>R$ Aceito</label>
                                        <input type="text" disabled className="form-control" value={getTotalAccepted()} />
                                    </div>
                                </div>
                                <div className="pd-divisor" />
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>R$ Creditado</label>
                                        <input type="text" disabled className="form-control" value={getTotalCredit()} />
                                    </div>
                                    <div className="col-md-6">
                                        <label>R$ Remanescente</label>
                                        <input type="text" disabled className="form-control" value={getTotalBalance()} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12">
                        <div className="box box-primary">
                            <div className="box-body">
                                <div className="row">
                                    <div className="col-md-3">
                                        <label>Regional</label>
                                        <input type="text" disabled className="form-control" value={bill.regional || ""} />
                                    </div>
                                    <div className="col-md-3">
                                        <label>Provedor</label>
                                        <input type="text" disabled className="form-control" value={bill.provedor || ""} />
                                    </div>
                                    <div className="col-md-3">
                                        <label>Agrupador</label>
                                        <input type="text" disabled className="form-control" value={bill.bill_group_name || ""} />
                                    </div>
                                    <div className="col-md-3">
                                        <label>Mês Referência</label>
                                        <input type="text" disabled className="form-control" value={bill.bill_month || ""} />
                                    </div>
                                </div>
                                <div className="pd-divisor" />
                                <div className="row">
                                    <div className="col-md-3">
                                        <label>Fatura</label>
                                        <input type="text" disabled className="form-control" value={bill.bill_number || ""} />
                                    </div>
                                    <div className="col-md-3">
                                        <label>Valor Fatura (R$)</label>
                                        <input type="text" disabled value={number(bill.bill_total)} className="form-control" />
                                    </div>
                                    <div className="col-md-3">
                                        <label>Valor DD (R$)</label>
                                        <input type="text" disabled value={number(bill.bill_cost_dd)} className="form-control" />
                                    </div>
                                    <div className="col-md-3">
                                        <label>Vencimento</label>
                                        <input type="text" disabled className="form-control" value={bill.deadline_at || ""} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12">
                        {table_overflow && <div className="overflow-table">
                            <i className="fa fa-refresh fa-spin" />
                        </div>}
                        <DxGrid rows={items} columns={columns}>
                            <Table
                                cellComponent={customCell}
                            />
                            {/* <TableColumnVisibility defaultHiddenColumnNames={hiddenColumns} /> */}
                            <TableColumnResizing defaultColumnWidths={columnWidths} />
                            <TableHeaderRow />
                        </DxGrid>
                    </div>
                </div>
            </ModalForm>
            <DetalhesInconsistencia
                inconsistency={sInconsistency}
                bill={bill}
            />
        </div>
    );
};

const mapStateToProps = (state, props) => {
    return {
        reducer: state.contestacaoReducer,
        auth: state.auth,
    };
};

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Detalhes);