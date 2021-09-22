import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import Overlay from "common/msg/overlay/overlay";
import Grid from "common/layout/grid";
import Row from "common/layout/row";
import ContentHeader from "common/adminLTE/contentHeader";
import Content from "common/adminLTE/content";
import ToolBarColumn from "./toolBarColumn";

import {
  DropdownListField
} from "common/form/components";

import {
  SelectionState,
  SortingState,
  IntegratedSorting,
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
  Toolbar,
  TableFilterRow
} from "@devexpress/dx-react-grid-bootstrap3";

import ModalForm from "common/layout/modal";
import CriarRegra from "../criar-regra/criar-regra";
import EditarRegra from "../editar-regra/editar-regra";
import CancelarRegra from "./cancelar-regra";
import VisualizarExemplo from "./visualizar-exemplo";

import { get_operators_and_vendors, get_all_classifications_by_vendor, delete_roles_items } from "../actions";

const ListarRegras = props => {

  const {
    listarRegrasForm,
    regrasClassificacaoReducer: {
      vendor_list,
      rules_list,
      rules_columns,
      defaultColumnWidths
    },
    auth,
    get_operators_and_vendors,
    get_all_classifications_by_vendor,
    delete_roles_items
  } = props;

  const network_list = ["MÓVEL","FIXA","FIBER"];
  const filtrarDisabled = !(listarRegrasForm && listarRegrasForm.values && (listarRegrasForm.values.vendor && listarRegrasForm.values.network));
  const [selection, setSelection] = React.useState([]);
  const [modalEditContent, setModalEditContent] = React.useState(undefined);

  React.useEffect(() => {
    get_operators_and_vendors()
  },[]);

  const handleFilter = () => {
    const params = {
      vendor_id: listarRegrasForm.values.vendor.id,
      network: listarRegrasForm.values.network
    }
    const promise_response = get_all_classifications_by_vendor(params)
    Promise.all([promise_response]);
  };

  return (
    <div className="overlay-wrapper" width="device-width">
      <div className="">
        <ContentHeader title="Regras de Classificação" small="" />
        <Content>
          <div className="box box-body">
            <Grid style={{padding: '1vw'}}>
              <Row>
                <Field
                  label="Provedor"
                  name="vendor"
                  cols="12 2"
                  component={DropdownListField}
                  data={vendor_list}
                  textField={item => item.name}
                  textValue={({ item }) => item}
                />
                <Field
                  label="Rede"
                  name="network"
                  cols="12 2"
                  component={DropdownListField}
                  data={network_list}
                  textField={item => item}
                  textValue={({ item }) => item}
                />
                <button
                  type="button"
                  className="btn btn-info"
                  style={{marginTop: '1.6vw'}}
                  disabled={filtrarDisabled}
                  onClick={() => handleFilter()}
                >
                  Filtrar
                </button>
              </Row>
              <Row>
                <DxGrid rows={rules_list} columns={rules_columns} showBorders>
                  <SortingState/>
                  <SelectionState
                    selection={selection}
                    onSelectionChange={ new_selection => {
                      setModalEditContent(undefined);
                      if(selection.length>0){
                        var aux_selection = new_selection.filter(x => !selection.includes(x));
                        setSelection([]);
                        setTimeout(() => {
                          setSelection(aux_selection);
                        }, 1)
                      }else
                        setSelection(new_selection)
                    }}
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
                  <Toolbar/>
                  <ToolBarColumn
                    selection={selection}
                    list={rules_list}
                    setModalEditContent={setModalEditContent}
                  />
                </DxGrid>
              </Row>
            </Grid>
          </div>
        </Content>
      </div>
      <Overlay />
      <ModalForm
        LabelButtonSubmit="Criar Regra Classificação"
        id="criar_regra_classificacao"
        title="Criar Regra Classificação"
        dimension="modal-lg"
        height="32vw"
      >
        <CriarRegra
          handleFilter={handleFilter}
        />
      </ModalForm>
      <ModalForm
        LabelButtonSubmit="Editar Regra Classificação"
        id="editar_regra_classificacao"
        title="Editar Regra Classificação"
        dimension="modal-lg"
        height="32vw"
      >
        {modalEditContent &&(
          <EditarRegra
            handleFilter={handleFilter}
            regra={modalEditContent}
          />
        )}
      </ModalForm>
      <ModalForm
        LabelButtonSubmit="Cancelar Regra"
        id="cancelar_regra_classificacao"
        title="Cancelar Regra"
        dimension="modal-sm"
      >
        <CancelarRegra
          rule_id={(rules_list[selection[0]] ? rules_list[selection[0]].id : '')}
          delete_roles_items={delete_roles_items}
          handleFilter={handleFilter}
        />
      </ModalForm>
      <ModalForm
        LabelButtonSubmit="Visualizar Exemplo"
        id="visualizar_exemplo_regra"
        title="Visualizar Exemplo"
        dimension="modal-lg"
      >
        <VisualizarExemplo/>
      </ModalForm>
    </div>
  );
};

const Form = reduxForm({ form: "ListarRegras" })(ListarRegras);

const mapDispatchToProps = dispatch => bindActionCreators({
  get_operators_and_vendors,
  get_all_classifications_by_vendor,
  delete_roles_items
}, dispatch);

const mapStateToProps = state => {
  return {
    listarRegrasForm: state.form.ListarRegras,
    regrasClassificacaoReducer: state.regrasClassificacaoReducer,
    auth: state.auth
  }
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);
