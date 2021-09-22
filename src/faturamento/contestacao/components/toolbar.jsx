import React from "react";
import { bindActionCreators } from "redux";
import { connect, useSelector } from "react-redux";
import { toastr } from "react-redux-toastr";
import { Plugin, Template } from "@devexpress/dx-react-core";
import ReactTooltip from "react-tooltip";
import FiltroContestacao from "./filtro";

import Detalhes from "./detalhes";
import DetalhesInconsistencia from "./detalhesInconsistencia";
import GerarLote from "./gerarLote";
import BoxConfirmarEmail from "./boxConfirmarEmail";

import ExportExcel from "../../../common/exportExcel/index";
import grid from "../contestacao.json";
import { export_all, get_all_contestation_items } from "../actions";
import { isPermited, logUserMenuAccess } from "auth/actions";

import "../style.css";

const GridToolbar = props => {
  const {
    reducer: { bills, filter, qtd_bills, all_bills },
    bill,
    vendors,
    vendorBills,
    export_all,
    get_all_contestation_items
  } = props;

  const user = useSelector(({ auth: { user } }) => user.permissions);

  const handleExportPage = () => {
    if (Object.entries(filter).length === 0) {
      toastr.warning("Faça uma busca primeiro.");
    } else {
      document.getElementById("export-page").click();
    }
  };

  const handleExportAll = () => {
    if (Object.entries(filter).length === 0) {
      toastr.warning("Faça uma busca primeiro.");
    } else {
      export_all({ ...filter }, qtd_bills);
    }
  };

  const openDetails = () => {
    get_all_contestation_items(bill.id);
  };

  var enableGerarLote = true;
  for (var bill_conc_lot_id of vendorBills.bill_conc_lot_ids) {
    if (bill_conc_lot_id != null) {
      enableGerarLote = false;
      break;
    }
  }
  return (
    <Plugin name="ToolbarColumn">
      <Template name="toolbarContent">
        <div className="toolbar-contestacao">
          <div className="left">
            <button
              className="btn btn-link btn-filtro btn-ml-0"
              data-for="top_dark_float"
              data-tip="Abrir Filtro"
              data-toggle="modal"
              data-target="#filtro-contestacao"
            >
              <i className="fa fa-search" />
              <ReactTooltip
                id="top_dark_float"
                place="top"
                type="dark"
                effect="float"
              />
            </button>
            {/* {isPermited(user, "DR_COF1H1_LOTE") && ( */}

              <a
                className="btn btn-link btn-ml-0"
                data-for="top_dark_float"
                data-tip="Visualizar Lotes Gerados"
                href="#/lotes-gerados"
              >
                <i className="fa fa-file-archive-o" />
                <ReactTooltip
                  id="top_dark_float"
                  place="top"
                  type="dark"
                  effect="float"
                />
              </a>
            {/* )} */}
            {bill !== null && (
              <button
                className="btn btn-link btn-ml-0"
                data-for="top_dark_float"
                data-tip="Detalhar Contestação"
                data-toggle="modal"
                data-target="#detalhes-contestacao"
                onClick={() => openDetails()}
              >
                <i className="fa fa-sitemap" />
                <ReactTooltip
                  id="top_dark_float"
                  place="top"
                  type="dark"
                  effect="float"
                />
              </button>
            )}
            {vendors.length > 0 && enableGerarLote && (
              <button
                className="btn btn-link btn-ml-0"
                data-for="top_dark_float"
                data-tip="Gerar Lote"
                data-toggle="modal"
                data-target="#gerar-lote"
              >
                <i className="fa fa-plus-square" />
                <ReactTooltip
                  id="top_dark_float"
                  place="top"
                  type="dark"
                  effect="float"
                />
              </button>
            )}
          </div>
          <div className="right">
            <button
              className="btn btn-link btn-filtro btn-mr-0"
              data-for="top_dark_float"
              data-tip="Exportar todo resultado para CSV"
              onClick={() => handleExportAll()}
            >
              <i className="fa fa-files-o text-success" />
              <ReactTooltip
                id="top_dark_float"
                place="top"
                type="dark"
                effect="float"
              />
            </button>
            <button
              className="btn btn-link btn-filtro btn-mr-0"
              data-for="top_dark_float"
              data-tip="Exportar página para CSV"
              onClick={() => handleExportPage()}
            >
              <i className="fa fa-file-o text-success" />
              <ReactTooltip
                id="top_dark_float"
                place="top"
                type="dark"
                effect="float"
              />
            </button>
            <ExportExcel
              rows={all_bills}
              columns={grid.columns.filter(
                c => typeof c.hidden === "undefined"
              )}
              name="Contestação"
            >
              <button style={{ display: "none" }} id="export-all" />
            </ExportExcel>
            <ExportExcel
              rows={bills}
              columns={grid.columns.filter(
                c => typeof c.hidden === "undefined"
              )}
              name="Contestação"
            >
              <button style={{ display: "none" }} id="export-page" />
            </ExportExcel>
          </div>
          <FiltroContestacao />
          <Detalhes selectedBill={bill} />
          <DetalhesInconsistencia />
          <GerarLote vendors={vendors} vendorBills={vendorBills} />
          <BoxConfirmarEmail />
        </div>
      </Template>
    </Plugin>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  reducer: state.contestacaoReducer
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      export_all,
      get_all_contestation_items
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(GridToolbar);
