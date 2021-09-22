import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Content from "../../common/adminLTE/content";
import ContentHeader from "../../common/adminLTE/contentHeader";
import ModalForm from "../../common/layout/modal";
import Overlay from "../../common/msg/overlay/overlay";
import Grid from "../../common/layout/grid";
import Row from "../../common/layout/row";

import {
  SelectionState,
  SortingState,
  IntegratedSorting,
  GroupingState,
  IntegratedGrouping,
  IntegratedSelection
} from "@devexpress/dx-react-grid";

import {
  Grid as DxGrid,
  TableSelection,
  VirtualTable,
  TableHeaderRow,
  Table,
  DragDropProvider,
  TableColumnResizing,
  TableGroupRow,
  Toolbar,
} from "@devexpress/dx-react-grid-bootstrap3";

import CadastrarFinalidade from "./cadastrar-finalidade";
import EditarFinalidade from "./editar-finalidade";
import ToolBarColumn from "./toolBarColumn";

import {
  get_all_finality_elements,
  get_finalities_and_element_types
} from "./actions";

const ListarFinalidades = props => {

  const {
    finalidadesReducer: {
      list,
      columns,
      defaultColumnWidths,
      groupingColumns,
    },
    //actions
    get_all_finality_elements,
    get_finalities_and_element_types
  } = props;

  React.useEffect(() => {
    if (list?.length === 0) Promise.all([get_all_finality_elements()]);
  },[]);

  const [selection, setSelection] = React.useState([]);

  const changeSelection = new_selection => {
    setSelection(new_selection.filter(x => !selection.includes(x) ));
  };

  const reload_list = () =>{
    Promise.all([get_all_finality_elements()]);
  };

  return (
    <div className="overlay-wrapper">
      <div className="fade-in fade-out">
        <div className="header">
          <div className="header__left-items">
            <ContentHeader title="Listar" small="Finalidades" />
          </div>
        </div>
        <div>
          <Content>
            <Grid cols="6">
              <DxGrid rows={list} columns={columns} showBorders>
                <SortingState/>
                <SelectionState
                  selection={selection}
                  onSelectionChange={ changeSelection }
                />
                <GroupingState
                  grouping={groupingColumns}
                />
                <IntegratedSorting />
                <IntegratedSelection />
                <IntegratedGrouping />
                {/* <FilteringState defaultFilters={[]} /> */}
                {/* <IntegratedFiltering /> */}
                <VirtualTable />
                <DragDropProvider />
                <Table />
                <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
                <TableHeaderRow
                  showSortingControls
                />
                {/* <TableFilterRow /> */}
                <TableSelection selectByRowClick highlightRow showSelectionColumn={false}/>
                <TableGroupRow />
                <Toolbar/>
                <ToolBarColumn
                  selection={selection}
                  list={list}
                  get_finalities_and_element_types={get_finalities_and_element_types}
                />
              </DxGrid>
            </Grid>
          </Content>
        </div>
      </div>
      <Overlay/>
      <ModalForm
        LabelButtonSubmit="Cadastrar Finalidade"
        id="cadastrar_finalidade"
        title="Cadastrar Finalidade"
        dimension="modal-sm"
        height="24vw"
      >
        <CadastrarFinalidade
          reload_parent={reload_list}
        />
      </ModalForm>
      <ModalForm
        LabelButtonSubmit="Editar Finalidade"
        id="editar_finalidade"
        title="Editar Finalidade"
        dimension="modal-sm"
        height="24vw"
      >
        <EditarFinalidade
          reload_parent={reload_list}
          finality_row={list[selection]}
        />
      </ModalForm>
    </div>
  );
};

ListarFinalidades.defaultProps = {
  list: [],
  columns: [],
  defaultColumnWidths: [],
  groupingColumns: []
};

const mapDispatchToProps = dispatch => bindActionCreators({
  get_all_finality_elements,
  get_finalities_and_element_types,
}, dispatch);

const mapStateToProps = (state,props) => {
  return{
    finalidadesReducer: state.finalidadesReducer
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListarFinalidades);
