import React, { useState, useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import Content from "../../common/adminLTE/content"
import ContentHeader from "../../common/adminLTE/contentHeader"
import Grid from "../../common/layout/grid"
import Overlay from "../../common/msg/overlay/overlay"

import {
  SortingState,
  IntegratedSorting,
  GroupingState,
  IntegratedGrouping,
  FilteringState,
  IntegratedFiltering,
  TableColumnVisibility,
  IntegratedSummary,
  SummaryState,
  SelectionState,
} from "@devexpress/dx-react-grid";

import {
  Grid as DxGrid,
  Table,
  TableHeaderRow,
  TableGroupRow,
  Toolbar,
  TableFilterRow,
  TableColumnResizing,
  TableSummaryRow,
  TableSelection,
} from "@devexpress/dx-react-grid-bootstrap3";

import ToolbarLotes from "./components/toolbarLotes";

import {
  // get_groups,
  get_months,
  // get_operators_and_vendors,
} from "../../relatorios/actions";

import { get_combos_lote } from "./actions";

const LotesGerados = props => {

  const {
    reducer: {
      lotes,
    },
    show_loading,
    // actions
    get_months,
    get_combos_lote,
  } = props;

  useEffect(() => {
    get_months()
      .then(() => get_combos_lote());
  }, []);

  const [selection, setSelection] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  const changeSelection = (s) => {
    const i = s.length - 1;
    const selected = s[i];
    setSelection([selected]);
    const row = lotesFormatados[s[i]];
    if (typeof selected === undefined) {
      setSelectedRow(null);
    } else {
      setSelectedRow(row);
    }
  };

  const columns = [
    { name: "provedor", title: "Provedor" },
    { name: "code", title: "Lote" },
    { name: "status", title: "Status" },
    { name: "user_name", title: "Usuário" },
    { name: "created_at", title: "Data Geração Lote" },
    { name: "envio_email", title: "Data Envio Lote" },
    { name: "rede", title: "Rede" },
    { name: "mes_referencia", title: "Mês Referência" },
    { name: "mes_competencia", title: "Mês Competência" },
  ];

  const formatDate = d => new Date(d).toLocaleDateString("pt-BR", { timeZone: "UTC" });

  const lotesFormatados = lotes.map(e => ({
    ...e,
    created_at: e.created_at && formatDate(e.created_at),
    envio_email: e.envio_email && formatDate(e.envio_email)
  }));

  return (
    <div>
      {show_loading && <div className="cts-overlay overlay-wrapper">
        <Overlay />
      </div>}
      <div className="fade-in fade-out">
        <div className="header">
          <div className="header__left-items">
            <ContentHeader title="Lotes Gerados" />
          </div>
        </div>
        <Content>
          <div className="grid-contestacao">
            <Grid cols="12">
              <DxGrid rows={lotesFormatados} columns={columns}>
                <FilteringState />
                <SortingState />
                <IntegratedFiltering />
                <IntegratedSorting />
                <SelectionState
                  selection={selection}
                  onSelectionChange={changeSelection}
                />
                <Table />
                <Toolbar />
                <ToolbarLotes
                  selectedRow={selectedRow}
                  exportRows={lotesFormatados}
                  exportColumns={columns}
                  setSelection={setSelection}
                  setSelectedRow={setSelectedRow}
                />
                {/* <TableColumnVisibility defaultHiddenColumnNames={hiddenColumns} /> */}
                {/* <TableColumnResizing defaultColumnWidths={columnWidths} /> */}
                <TableHeaderRow />
                <TableSelection
                  selectByRowClick
                  highlightRow
                  showSelectionColumn={false}
                />
                <TableFilterRow />
              </DxGrid>
            </Grid>
          </div>
        </Content>
      </div>
    </div>
  );

};

const mapStateToProps = state => ({
  auth: state.auth,
  reducer: state.contestacaoReducer,
  show_loading: state.overlay.show,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  get_combos_lote,
  get_months,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LotesGerados);
