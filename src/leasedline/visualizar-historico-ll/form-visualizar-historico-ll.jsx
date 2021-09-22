import React, { useState, useEffect, useReducer } from 'react';
import { bindActionCreators } from "redux";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import Overlay from "../../common/msg/overlay/overlay";
import ToolbarColumn from "./toolBarColumn";
import {
  SelectionState,
  SortingState,
  FilteringState,
  IntegratedSorting,
  IntegratedFiltering,
  IntegratedSelection
} from "@devexpress/dx-react-grid";
import {
  Grid as DxGrid,
  TableSelection,
  VirtualTable,
  TableHeaderRow,
  Table,
  DragDropProvider,
  TableColumnReordering,
  Toolbar,
  TableFilterRow,
  TableColumnVisibility
} from "@devexpress/dx-react-grid-bootstrap3";
import {
  get_leasedlines_hist_data_view,
  get_leasedlines_data_view
} from "./actions";
import VisualizarLl from "../visualizar-ll/form-visualizar-ll";
import ModalFormOT from "../../common/layout/modal";

const FormVisualizarHistoricoLl = props => {
  const {
    visualizarHistoricoLl: { ll_hist_list, columns, grouping_column_name },
    //actions
    get_leasedlines_hist_data_view,
    get_leasedlines_data_view,
  } = props;

  const handle_get_ll_data = ll => {
    if(ll.ll_atual){
      get_leasedlines_data_view(ll.ll_id)
    }else{
      get_leasedlines_hist_data_view(ll.id)
    }
  }

  let columnOrderMap = columns.map(n => n.name)

  const [columnOrder, setColumnOrder] = useState(columnOrderMap);
  const [selection, setSelection] = useState([])

  function ClearSelectionState() {
    // Pass useEffect a function
    useEffect(() => {
      // If you want to implement componentWillUnmount,
      // return a function from here, and React will call
      // it prior to unmounting.
      return () => {
        setSelection([])
      };
    })
    return null
  }

  const changeSelection = (selection) => {
    setSelection(selection)
  }

  const changeSelectionReset = () => {
    setSelection([])
  }

  const changeColumnOrder = (columnOrder) => {
    setColumnOrder(columnOrder)
  }

  return (
    <div className="overlay-wrapper">
      <DxGrid rows={ll_hist_list} columns={columns} showBorders >
        <SortingState
          defaultSorting={[
            { columnName: grouping_column_name, direction: "desc" }
          ]}
        />
        {selection?.length >= 1 && <ClearSelectionState />}
        <SelectionState
          selection={selection}
          onSelectionChange={
            selection?.length === 0
              ? changeSelection
              : changeSelectionReset
          }
        />
        {/* <PagingState pageSize={100} /> */}
        <IntegratedSorting />
        <IntegratedSelection />
        <FilteringState defaultFilters={[]} />
        <IntegratedFiltering />
        {/* <IntegratedPaging /> */}
        <VirtualTable height={ll_hist_list?.length * 7} />
        <DragDropProvider />
        <Table />
        <TableColumnVisibility />
        <TableColumnReordering
          order={columnOrder}
          onOrderChange={changeColumnOrder}
        />
        <TableHeaderRow showSortingControls />
        <TableFilterRow />
        <TableSelection selectByRowClick highlightRow showSelectAll />
        <Toolbar />
        <ToolbarColumn
          selection={selection}
          ll_hist_list={ll_hist_list}
          handle_get_ll_data={handle_get_ll_data}
        />
      </DxGrid>
      <Overlay />
      <ModalFormOT
        LabelButtonSubmit="Visualizar LL"
        id="visualizar_ll_secundario"
        title="Visualizar LL"
        dimension="modal-lg"
      >
        <VisualizarLl />
      </ModalFormOT>
    </div>
  );
}

const Form = reduxForm({ form: "FormVisualizarHistoricoLl" })(FormVisualizarHistoricoLl);

const mapDispatchToProps = dispatch => bindActionCreators({
  get_leasedlines_hist_data_view,
  get_leasedlines_data_view
}, dispatch);
const mapStateToProps = state => ({
  visualizarHistoricoLl: state.visualizarHistoricoLl,
  overlay: state.overlay
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);
