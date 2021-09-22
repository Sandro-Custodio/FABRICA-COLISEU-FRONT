import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import ModalForm from "../../../common/layout/modal";

import { Plugin, Template } from "@devexpress/dx-react-core";

import {
    Grid as DxGrid,
    Table,
    TableHeaderRow,
    Toolbar,
} from "@devexpress/dx-react-grid-bootstrap3";
import { ExportExcel } from "common";
import ReactTooltip from "react-tooltip";

const DetalhesContestacao = props => {

    const {
        inconsistency,
        bill,
        reducer: {
            table_overflow,
        },
    } = props;

    const columns = [
        { name: "circuito", title: "Circuito" },
        { name: "bill_dd_class_group", title: "Classificação" },
        { name: "bill_dd_invoice_description", title: "Descrição" },
        { name: "base_fatura", title: "R$ Fatura" },
        { name: "base_fisica", title: "R$ Base Física" },
        { name: "apontado", title: "R$ Apontado" },
        { name: "contestar", title: "R$ Contestado" },
        { name: "aceito", title: "R$ Aceito" },
        { name: "pendente", title: "R$ Pendente" },
        { name: "negado", title: "R$ Negado" },
        { name: "od_code", title: "OD" },
        { name: "sd_code", title: "SD" },
    ];
    
    const ToolbarModal = () => {
        return (
            <Plugin name="ToolbarColumn">
                <Template name="toolbarContent">
                    <div style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                    }}>
                        <ExportExcel
                            rows={inconsistency?.bill_conciliate_items || []}
                            columns={columns}
                            name="Contestação"
                        >
                            <button
                                className="btn btn-link btn-sm"
                                data-for="top_success_float"
                                data-tip="Exportar página para CSV"
                            >
                                <i className="fa fa-file-o text-success" />
                                <ReactTooltip
                                    id="top_success_float"
                                    place="left"
                                    type="dark"
                                    effect="float"
                                />
                            </button>
                        </ExportExcel>
                    </div>
                </Template>
            </Plugin>
        );
    };
    
    return (
        <div>            
            <ModalForm
                LabelButtonSubmit="Painel de Contestação de Itens"
                id="itens-inconsistencia"
                title="Painel de Contestação de Itens"
                dimension="modal-detalhes-contestacao"
            >
                <div style={{ paddingBottom: "16px", fontSize: "14px" }}>
                    <strong>
                        <font color='blue'>
                            {inconsistency?.bill_dif_type_id} - {inconsistency?.bill_dif_type_name}
                        </font>
                    </strong>
                </div>
                <div className="box box-primary">
                    <div className="box-body">
                        <div className="row">
                            <div className="col-md-4">
                                <label>Fatura</label>
                                <input type="text" disabled className="form-control" value={bill?.bill_number} />
                            </div>
                            <div className="col-md-4">
                                <label>Provedor</label>
                                <input type="text" disabled className="form-control" value={bill?.provedor} />
                            </div>
                            <div className="col-md-4">
                                <label>Mês de Refrência</label>
                                <input type="text" disabled className="form-control" value={bill?.bill_month} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <label>Agrupador</label>
                                <input type="text" disabled className="form-control" value={bill?.bill_group_name} />
                            </div>
                            <div className="col-md-4">
                                <label>Data de emissão</label>
                                <input type="text" disabled className="form-control" value={bill?.order_at} />
                            </div>
                            <div className="col-md-4">
                                <label>Data de vencimento</label>
                                <input type="text" disabled className="form-control" value={bill?.deadline_at} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="table-items">
                    {table_overflow && <div className="overflow-table">
                        <i className="fa fa-refresh fa-spin" />
                    </div>}
                    <DxGrid rows={inconsistency?.bill_conciliate_items || []} columns={columns}>
                        <Table />
                        <TableHeaderRow />
                        <Toolbar />
                        <ToolbarModal />
                    </DxGrid>
                </div>
            </ModalForm>
        </div>
    );
};

const mapStateToProps = state => ({
    reducer: state.contestacaoReducer,
    auth: state.auth,
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DetalhesContestacao);