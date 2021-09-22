import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";

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

import Content from "../../common/adminLTE/content"
import ContentHeader from "../../common/adminLTE/contentHeader"
import Grid from "../../common/layout/grid"
import Overlay from "../../common/msg/overlay/overlay"

import "./style.css";
import grid from "./contestacao.json";
import GridToolbar from "./components/toolbar";

import EnviarEmail from "./components/enviarEmail";

import {
  get_groups,
  get_months,
  get_operators_and_vendors,
} from "../../relatorios/actions";
import { get_bills_contestations, export_all } from "./actions";

const Contestacao = props => {

  const {

    reducer: {
      bills,
      filter,
      qtd_pages,
      qtd_bills,
      all_bills,
      vendor,
    },
    auth,
    show_loading,

    // actions
    get_groups,
    get_months,
    get_operators_and_vendors,
    get_bills_contestations,
    export_all,

  } = props;

  React.useEffect(() => {
    /**
     * @todo descomentar
     */
    get_months()
      .then($ => get_groups()
        .then($ => get_operators_and_vendors())
      );
  }, []);

  const { columns } = grid;

  const columnWidths = columns.map(c => ({
    columnName: c.name,
    width: 140
  }));

  const hiddenColumns = columns.filter(c => c.hidden).map(c => c.name);

  const billsFormated = bills.map(b => ({
    ...b,
    bill_total: Number(b.bill_total).toFixed(2),
    total_contest: Number(b.total_contest).toFixed(2)
  }));

  const [totalSummaryItems] = React.useState([
    { columnName: 'bill_total', type: 'sum', },
    { columnName: 'total_contest', type: 'sum', },
  ]);

  const [grouping] = React.useState([
    { columnName: 'network' },
    { columnName: 'provedor' }
  ]);

  const [groupSummaryItems] = React.useState([
    {
      columnName: 'bill_total',
      type: 'max',
      showInGroupFooter: false,
      alignByColumn: true,
    },
    {
      columnName: 'total_contest',
      type: 'max',
      showInGroupFooter: false,
      alignByColumn: true,
    },
  ]);

  // const [perPage, setPerPage] = React.useState(100);

  // const changeQtdPerPg = e => {
  //   if (Object.entries(filter).length == 0) {
  //     toastr.warning("Faça uma busca primeiro.");
  //   } else if (e.key === "Enter") {
  //     const newData = { ...filter, per_page: perPage };
  //     get_bills_contestations(newData);
  //   } else {
  //     setPerPage(e.target.value);
  //   }
  // };

  const [pg, setPg] = React.useState(1);

  const changePage = newPage => {
    if (Object.entries(filter).length == 0) {
      toastr.warning("Faça uma busca primeiro.");
    } else if (newPage > 0 && newPage <= qtd_pages) {
      const newData = { ...filter, page: newPage };
      get_bills_contestations(newData);
    }
  };

  const submitNewPg = e => {

    const p = e.target.value;

    if (Object.entries(filter).length == 0) {
      toastr.warning("Faça uma busca primeiro.");
    } else if (e.key === "Enter") {
      if (parseInt(p) < 1 || parseInt(p) > qtd_pages) {
        toastr.warning("Página Inválida.");
      } else {
        const newData = { ...filter, page: p };
        get_bills_contestations(newData);
        setPg(p);
        window.$(".paginator-field").blur();
      }
    }
  };

  /**
   * Bill Selection
   */
  const [selection, setSelection] = React.useState([]);
  const [selectedBill, setSelectedBill] = React.useState(null);
  const [selectedVendors, setSelectedVendors] = React.useState([]);
  const [vendorBills, setVendorBills] = React.useState({
    bill_ids: [] ,
    vendor_id: undefined,
    user_id: undefined,
    rede: undefined,
    mes_ref: undefined,
    mes_comp: undefined,
    bill_conc_lot_ids: []
  });

  const changeSelection = (s) => {
    const i = s.length - 1;
    const selected = s[i];
    setSelection([selected]);
    const bill = billsFormated[s[i]]
    console.log("bill",bill)
    if (typeof selected === "undefined") {
      setSelectedBill(null);
    } else {
      setSelectedBill(bill);
    }
    // debugger;
  };

  const selectVendor = (props) => {
    const {
      row: {
        value,
        compoundKey,
      }
    } = props;
    const rede = compoundKey.split("|")[0];
    const provedor = value;

    let vendors = [...selectedVendors];
    let include = false;

    for (let i = 0; i < vendors.length; i++) {
      if (vendors[i].rede == rede && vendors[i].provedor == provedor) {
        include = true;
        delete vendors[i];
      }
    }

    if (!include) {
      vendors.push({ rede, provedor });
    }

    const arr = vendors.filter(v => typeof v !== undefined);
    setSelectedVendors(arr);
    var vendorBillsAux = {
      bill_ids: [] ,
      vendor_id: undefined,
      user_id: auth.user.id,
      rede: undefined,
      mes_ref: undefined,
      mes_comp: undefined,
      bill_conc_lot_ids: []
    };
    for (var vend of arr){
      for (var bill of bills){
        if(bill.provedor === vend.provedor && bill.network === vend.rede){
          vendorBillsAux.bill_ids.push(bill.id);
          vendorBillsAux.bill_conc_lot_ids.push(bill.bill_conc_lot_id);
          if(!vendorBillsAux.vendor_id || !vendorBillsAux.mes_ref || !vendorBillsAux.mes_comp || !vendorBillsAux.rede){
            vendorBillsAux.vendor_id = bill.vendor_id;
            vendorBillsAux.mes_ref = bill.bill_month;
            vendorBillsAux.mes_comp = bill.competence_month;
            vendorBillsAux.rede = bill.network;
          }
        }
      }
    }
    setVendorBills(vendorBillsAux);
    // console.log({ props, rede });
  };

  const checkSelectedVendors = (row) => {

    let vendors = [...selectedVendors];

    for (let i = 0; i < vendors.length; i++)
      if (vendors[i].provedor == row.provedor && vendors[i].rede == row.rede)
        return true;
    // if (vendors.includes(vendor))

    return false;

  }

  /**
   * Group Cell
   */

  const [expanded, setExpanded] = React.useState([]);

  const groupCell = cell => {

    const toggleExpand = (key) => {

      let arrExpanded = [...expanded];

      if (arrExpanded.includes(key)) {
        for (let i = 0; i < arrExpanded.length; i++)
          if (arrExpanded[i] == key)
            delete arrExpanded[i];
      } else {
        arrExpanded.push(key);
      }

      const arr = arrExpanded.filter(e => typeof e !== "undefined");
      setExpanded(arr);

    };

    const handleClick = (event) => {

      setSelectedBill(null);
      setSelection([]);

      const target = event.target.tagName;
      if (target !== "INPUT")
        toggleExpand(cell.tableRow.row.compoundKey);
    };

    const Cell = () => {
      return (
        <div style={{
          display: "flex",
          alignItems: "center",
          position: "relative",
        }}>
          {
            cell.column.name === "provedor" &&
            <input
              type="checkbox"
              onChange={e => selectVendor(cell)}
              checked={checkSelectedVendors({ rede: cell.row.compoundKey.split("|")[0], provedor: cell.row.value })}
              style={{
                marginTop: "-3px",
                marginRight: "8px"
              }}
            />
          }
          <span>{cell.row.value}</span>
        </div>
      );
    };

    return (
      <TableGroupRow.Cell
        {...cell}
        className="cell-contestacao"
        children={(<Cell />)}
        // onClick={() => null}
        onClick={e => handleClick(e)}
      />
    );
  };

  return (
    <div>
      {show_loading && <div className="cts-overlay overlay-wrapper">
        <Overlay />
      </div>}
      <div className="fade-in fade-out">
        <div className="header">
          <div className="header__left-items">
            <ContentHeader title="Contestação" />
          </div>
        </div>
        <Content>
          <div className="grid-contestacao">
            <Grid cols="12">
              <DxGrid rows={billsFormated} columns={columns}>
                <FilteringState />
                <SortingState defaultSorting={[{ columnName: 'network', direction: 'asc' }, { columnName: 'provedor', direction: 'asc' }]} />
                <GroupingState
                  grouping={grouping}
                  expandedGroups={expanded}
                />
                <SummaryState
                  totalItems={totalSummaryItems}
                  groupItems={groupSummaryItems}
                />
                <IntegratedFiltering />
                <IntegratedGrouping />
                <IntegratedSummary />
                <IntegratedSorting />
                <SelectionState
                  selection={selection}
                  onSelectionChange={changeSelection}
                />
                <Table />
                <Toolbar />
                <GridToolbar
                  bill={selectedBill}
                  vendors={selectedVendors}
                  vendorBills={vendorBills}
                  exportPage={billsFormated}
                  allBills={all_bills}
                  exportAll={export_all}
                  qtdAll={qtd_bills}
                />
                <TableColumnVisibility defaultHiddenColumnNames={hiddenColumns} />
                <TableColumnResizing defaultColumnWidths={columnWidths} />
                <TableHeaderRow />
                <TableSelection
                  selectByRowClick
                  highlightRow
                  showSelectionColumn={false}
                />
                <TableGroupRow
                  showColumnsWhenGrouped
                  cellComponent={c => groupCell(c)}
                />
                <TableSummaryRow
                  totalRowComponent={props => (<></>)}
                  groupRowComponent={props => (<></>)}
                />
                <TableFilterRow />
              </DxGrid>
              <div className="grid-footer">
                <div className="paginator">
                  <a
                    className="btn btn-link"
                    onClick={() => changePage(1)}
                  >
                    <i className="fa fa-fast-backward"></i>
                  </a>
                  <a
                    className="btn btn-link"
                    onClick={() => changePage(filter.page - 1)}
                  >
                    <i className="fa fa-step-backward"></i>
                  </a>
                  <span>Página </span>
                  <input
                    className="form-control paginator-field"
                    type="number"
                    value={pg}
                    name="page"
                    min={1}
                    max={qtd_pages}
                    autoComplete="off"
                    onChange={e => setPg(e.target.value)}
                    onKeyPress={e => submitNewPg(e)}
                  />
                  <span> De &nbsp; <b>{qtd_pages}</b>&nbsp;</span>
                  <a
                    className="btn btn-link"
                    onClick={() => changePage(filter.page + 1)}
                  >
                    <i className="fa fa-step-forward"></i>
                  </a>
                  <a
                    className="btn btn-link"
                    onClick={() => changePage(qtd_pages)}
                  >
                    <i className="fa fa-fast-forward"></i>
                  </a>
                </div>
                <div className="grid-count">
                  {/* <span>Mostrar &nbsp;</span>
                <input
                  className="form-control paginator-field"
                  type="number"
                  value={perPage}
                  onChange={e => changeQtdPerPg(e)}
                  name="page"
                  min={10}
                  max={500}
                  autoComplete="off"
                /> */}
                  <span>Mostrando <b>{qtd_bills == 0 ? 0 : 100}</b> por página. Total: <b>{qtd_bills}</b></span>
                </div>
              </div>
            </Grid>
          </div>
        </Content>
      </div>
      <EnviarEmail/>
    </div>
  );
}

const mapStateToProps = state => ({
  auth: state.auth,
  reducer: state.contestacaoReducer,
  show_loading: state.overlay.show,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  get_groups,
  get_months,
  get_operators_and_vendors,
  get_bills_contestations,
  export_all,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Contestacao);
