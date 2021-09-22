import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { reduxForm, Field, formValueSelector} from "redux-form";
import Content from "../../common/adminLTE/content";
import ContentHeader from "../../common/adminLTE/contentHeader";
import Overlay from "../../common/msg/overlay/overlay";
import Grid from "../../common/layout/grid";
import Row from "../../common/layout/row";
import ModalForm from "../../common/layout/modal";
import { IconButton } from "common";
import { DropdownListField } from "../../common/form/components";
import ToolBarColumn from "./toolBarColumn";
import CadastrarItemLpu from "./cadastrar-item-lpu";
import EditarItemLpu from "./editar-item-lpu";
import DeletarItemLpu from "./deletar-item-lpu";

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
  TableGroupRow,
  Table,
  DragDropProvider,
  TableColumnResizing,
  Toolbar,
} from "@devexpress/dx-react-grid-bootstrap3";

 import {
   get_combos_lpu,
   get_lpu_items_by_vendor,
   get_vendor_degraus,
  } from "../actions";

const ListarLPU = props => {

  const {
    listLpuForm,
    comandoLpuReducer: {
      list,
      defaultColumnWidths,
      columns,
      types,
      vendors,
      indice_reajuste,
      tecnologias_incluidas,
      detentora,
    },
    //actions
    get_combos_lpu,
    get_lpu_items_by_vendor,
    get_vendor_degraus,
  } = props;

  const [selection, setSelection] = React.useState([]);

  React.useEffect(() => {
    Promise.all([get_combos_lpu(),get_vendor_degraus()])
  },[])

  const searchLpus = () => {
    Promise.all([
      get_lpu_items_by_vendor(listLpuForm?.values?.vendor.id)
    ])
  }

  return (
    <div className="overlay-wrapper">
      <div className="header" style={{paddingBottom: '1vw'}}>
        <ContentHeader title="Listar" small="LPU" />
      </div>
      <form>
        <div className="body">
          <Grid cols="12">
            <Row>
              <Field
                label="Provedor"
                name="vendor"
                cols="12 3"
                component={DropdownListField}
                data={vendors}
                textField={item => item.name}
                textValue={({ item }) => item.id}
                placeholder={"Selecione"}
                type="text"
              />
              <div style={{paddingTop: '1.3vw'}}>
                <Grid cols="12 6">
                  <IconButton
                    icon="search"
                    title="Filtrar"
                    disabled={!listLpuForm?.values?.vendor}
                    onClick={() => searchLpus()}
                  />
                </Grid>
              </div>
            </Row>
            <Row>
              <DxGrid rows={list} columns={columns} showBorders>
                <SortingState/>
                <GroupingState
                  grouping={[{ columnName: 'lpu_code' }]}
                />
                <IntegratedGrouping />
                <SelectionState
                  selection={selection}
                  onSelectionChange={ selection => setSelection(selection)}
                />
                <IntegratedSorting />
                <IntegratedSelection />
                <VirtualTable />
                <DragDropProvider />
                <Table />
                <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
                <TableHeaderRow
                  showSortingControls
                />
                <TableSelection selectByRowClick highlightRow/>
                <TableGroupRow />
                <Toolbar/>
                <ToolBarColumn
                  selection={selection}
                  setSelection={setSelection}
                  // list={list}
                />
              </DxGrid>
            </Row>
          </Grid>
        </div>
      </form>
      <Overlay/>
      <ModalForm
        LabelButtonSubmit="Cadastrar Item de LPU"
        id={"cadastrar_item_lpu"}
        title="Cadastrar Item de LPU"
        dimension="modal-lg"
        height="32vw"
      >
        {selection?.length > 0 && (
          <CadastrarItemLpu
            lpu_id={list[selection]?.lpu_id}
            reloadParent={searchLpus}
          />
        )}
      </ModalForm>
      <ModalForm
        LabelButtonSubmit="Editar Item de LPU"
        id={"editar_item_lpu"}
        title="Editar Item de LPU"
        dimension="modal-lg"
        height="32vw"
      >
        {selection?.length > 0 && (
          <EditarItemLpu
            selected_lpu_item={list[selection]}
            reloadParent={searchLpus}
          />
        )}
      </ModalForm>
      <ModalForm
        LabelButtonSubmit="Deletar Item de LPU"
        id={"deletar_item_lpu"}
        title="Deletar Item de LPU"
        dimension="modal-sm"
        height="10vw"
      >
        {selection?.length > 0 && (
          <DeletarItemLpu
            selection={selection}
            reloadParent={searchLpus}
          />
        )}
      </ModalForm>
    </div>
  );
};

const Form = reduxForm({ form: "ListarLPU" })(ListarLPU);

const mapDispatchToProps = dispatch => bindActionCreators({
  get_combos_lpu,
  get_lpu_items_by_vendor,
  get_vendor_degraus,
}, dispatch);

const mapStateToProps = state => ({
  auth: state.auth,
  listLpuForm: state.form.ListarLPU,
  comandoLpuReducer: state.comandoLpuReducer
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);
