import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { reduxForm, Field, clearFields } from "redux-form";
import Overlay from "common/msg/overlay/overlay";
import Grid from "common/layout/grid";
import Row from "common/layout/row";
import { LabelField } from "common/form/components";
import get from "lodash/get";
import GridClassificacao from "../fatura-detalhada/grid-classificacao";

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
  Toolbar
} from "@devexpress/dx-react-grid-bootstrap3";

import ToolBarColumn from "../../regras-classificacao/listar-regras/toolBarColumn";
import ModalForm from "common/layout/modal";
import CriarRegra from "../../regras-classificacao/criar-regra/criar-regra";
import EditarRegra from "../../regras-classificacao/editar-regra/editar-regra";
import CancelarRegra from "../../regras-classificacao/listar-regras/cancelar-regra";
import VisualizarExemplo from "../../regras-classificacao/listar-regras/visualizar-exemplo";
import { LabelInputComp } from "../../comps/componentesUsaveis";

import {
  get_operators_and_vendors,
  get_all_classifications_by_vendor,
  delete_roles_items
} from "../../regras-classificacao/actions";
import { get_all_bill_dd, reclassify_rules, save_value } from "../actions";

const required = value => (value ? undefined : "Campo obrigatório");
// const validMoneyValue = value => value ? undefined : 'Valor Monetário inválido'

const FaturaDetalhadaClassificacao = ({ bill, setSelection, ...others }) => {
  const {
    faturaDetalhadaClassificacaoForm,
    visualizarFaturasReducer: { classification_list },
    regrasClassificacaoReducer: { rules_list, rules_columns },
    auth,
    get_operators_and_vendors,
    get_all_classifications_by_vendor,
    delete_roles_items,
    reclassify_rules,
    get_all_bill_dd,
    save_value
  } = others;

  const defaultColumnWidths = [
    { columnName: "class_group", width: 170 },
    { columnName: "classification", width: 170 },
    { columnName: "logical_view", width: 280 }
  ];
  const [rule_selection, setRuleSelection] = React.useState([]);
  const [modalEditContent, setModalEditContent] = React.useState(undefined);
  const [editingBill, setEditingBill] = React.useState(undefined);

  //Método para recarregar o grid de regras, após alterações
  const handleFilter = () => {
    const params = {
      vendor_id: bill.vendor.id,
      network: bill.network
    };
    const promise_response = get_all_classifications_by_vendor(params);
    Promise.all([promise_response]);
  };

  const Root = props => <DxGrid.Root {...props} style={{ height: "100%" }} />;

  return (
    <div className="overlay-wrapper" width="device-width">
      <Grid style={{ padding: "1vw" }}>
        <Row>
          <Grid cols="12 6">
            <Row>
              <Field
                label="Cadastrada por"
                name="user_name"
                cols="12 4"
                component={LabelField}
                disabled={true}
              />
              <Field
                label="Area"
                name="area_name"
                cols="12 4"
                component={LabelField}
                disabled={true}
              />
              <Field
                label="Status"
                name="status_description"
                cols="12 4"
                component={LabelField}
                disabled={true}
              />
            </Row>
            <Row>
              <Field
                label="Rede"
                name="network"
                cols="12 2"
                component={LabelField}
                disabled={true}
              />
              <Field
                label="Provedor"
                name="vendor"
                cols="12 4"
                component={LabelField}
                disabled={true}
              />
              <Field
                label="Regional"
                name="operator"
                cols="12 2"
                component={LabelField}
                disabled={true}
              />
              <Field
                label="Agrupador"
                name="group"
                cols="12 3"
                component={LabelField}
                disabled={true}
              />
            </Row>
            <Row>
              <Field
                label="Mês Referência"
                name="bill_month"
                cols="12 3"
                component={LabelField}
                disabled={true}
              />
              <Field
                label="Mês Competência"
                name="competence_month"
                cols="12 3"
                component={LabelField}
                disabled={true}
              />
            </Row>
            <Row>
              <Field
                label="Cadastrada em"
                item="created_at"
                data={bill.created_at}
                cols="12 3"
                component={LabelInputComp}
                disabled={true}
                isData
              />
              <Field
                label="Aceita em"
                item="accepted_at"
                data={bill.accepted_at}
                cols="12 3"
                component={LabelInputComp}
                disabled={true}
                isData
              />
              <Field
                label="Conciliada em"
                item="checked_at"
                data={bill.checked_at}
                cols="12 3"
                component={LabelInputComp}
                disabled={true}
                isData
              />
              <Field
                label="Aprovada em"
                item="approved_at"
                data={bill.approved_at}
                cols="12 3"
                component={LabelInputComp}
                disabled={true}
                isData
              />
            </Row>
            <Row>
              <Field
                label="Fatura"
                name="bill_number"
                cols="12 5"
                component={LabelField}
                disabled={true}
              />
              <Field
                label="Emissão"
                item="order_at"
                data={bill.order_at}
                cols="12 3"
                component={LabelInputComp}
                disabled={true}
                isData
              />
              <Field
                label="Vencimento"
                item="deadline_at"
                data={bill.deadline_at}
                cols="12 3"
                component={LabelInputComp}
                disabled={true}
                isData
              />
            </Row>
            <Row>
              <Field
                label="Linhas de DD"
                name="bill_dd_circuits"
                cols="12 3"
                component={LabelField}
                disabled={true}
              />
              <Field
                label="Valor DD(R$)"
                name="bill_cost_dd"
                cols="12 3"
                component={LabelField}
                disabled={true}
              />
              <Field
                label="Valor Fatura(R$)"
                name="bill_total"
                cols="12 3"
                component={LabelField}
                disabled={!editingBill}
                validate={[required]}
              />
              <Field
                label="Diferença"
                name="bill_difference"
                cols="12 3"
                component={LabelField}
                disabled={true}
              />
            </Row>
            <Row>
              <Grid>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    Promise.all([
                      reclassify_rules({
                        bill_id: bill.id,
                        vendor_id: bill.vendor.id
                      })
                    ]).then(() => {
                      Promise.all([
                        get_all_classifications_by_vendor({
                          vendor_id: bill.vendor.id,
                          network: bill.network
                        })
                      ]).then(() => {
                        get_all_bill_dd({
                          bill_id: bill.id,
                          bill_classification_id: bill.bill_classification_id,
                          page_bill: 1,
                          qtd_page: 100
                        });
                      });
                    });
                  }}
                >
                  <i className="fa fa-recycle" style={{ marginRight: "3px" }} />
                  Reclassificar
                </button>
                {!editingBill && (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      setEditingBill(get(bill, "bill_total", ""));
                    }}
                  >
                    <i className="fa fa-edit" style={{ marginRight: "3px" }} />
                    Editar Fatura
                  </button>
                )}
                {editingBill && (
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => {
                      Promise.all([
                        save_value({
                          bill_id: bill.id,
                          total:
                            faturaDetalhadaClassificacaoForm.values.bill_total
                        })
                      ]).then(() => {
                        setEditingBill(undefined);
                        Promise.all([
                          get_all_classifications_by_vendor({
                            vendor_id: bill.vendor.id,
                            network: bill.network
                          })
                        ]).then(() => {
                          get_all_bill_dd({
                            bill_id: bill.id,
                            bill_classification_id: bill.bill_classification_id,
                            page_bill: 1,
                            qtd_page: 100
                          });
                        });
                      });
                    }}
                  >
                    <i className="fa fa-check" style={{ marginRight: "3px" }} />
                    Salvar
                  </button>
                )}
              </Grid>
            </Row>
          </Grid>
          <Grid cols="12 6">
            <div style={{ height: "30vw" }}>
              <DxGrid
                rows={rules_list}
                columns={rules_columns}
                showBorders
                rootComponent={Root}
              >
                <SortingState />
                <SelectionState
                  selection={rule_selection}
                  onSelectionChange={new_selection => {
                    setModalEditContent(undefined);
                    if (rule_selection.length > 0) {
                      var aux_selection = new_selection.filter(
                        x => !rule_selection.includes(x)
                      );
                      setRuleSelection(aux_selection);
                    } else setRuleSelection(new_selection);
                  }}
                />
                <IntegratedSorting />
                <IntegratedSelection />
                <VirtualTable height="auto" />
                <DragDropProvider />
                <Table />
                <TableColumnResizing
                  defaultColumnWidths={defaultColumnWidths}
                />
                <TableHeaderRow showSortingControls />
                <TableSelection selectByRowClick highlightRow />
                <Toolbar />
                <ToolBarColumn
                  selection={rule_selection}
                  list={rules_list}
                  bill={bill}
                  setModalEditContent={setModalEditContent}
                />
              </DxGrid>
            </div>
          </Grid>
        </Row>
        <Row>
          <Grid cols="12">
            <div style={{ marginTop: "3vw" }}>
              <GridClassificacao />
            </div>
          </Grid>
        </Row>
      </Grid>
      <Overlay />
      <ModalForm
        LabelButtonSubmit="Criar Regra Classificação"
        id="criar_regra_classificacao"
        title="Criar Regra Classificação"
        dimension="modal-lg"
        height="32vw"
      >
        <CriarRegra handleFilter={handleFilter} bill={bill} />
      </ModalForm>
      <ModalForm
        LabelButtonSubmit="Editar Regra Classificação"
        id="editar_regra_classificacao"
        title="Editar Regra Classificação"
        dimension="modal-lg"
        height="32vw"
      >
        {modalEditContent && (
          <EditarRegra
            handleFilter={handleFilter}
            regra={modalEditContent}
            bill={bill}
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
          rule_id={
            rules_list[rule_selection[0]]
              ? rules_list[rule_selection[0]].id
              : ""
          }
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
        <VisualizarExemplo />
      </ModalForm>
    </div>
  );
};

FaturaDetalhadaClassificacao.defaultProps = {
  bill: {
    user_name: 0,
    area_name: 0,
    status_description: 0,
    network: 0,
    vendor: 0,
    operator: 0,
    group: 0,
    bill_month: 0,
    competence_month: 0,
    created_at: 0,
    accepted_at: 0,
    checked_at: 0,
    approved_at: 0,
    bill_number: 0,
    order_at: 0,
    deadline_at: 0,
    bill_dd_circuits: 0,
    bill_cost_dd: 0,
    bill_total: 0,
    bill_difference: 0
  }
  // handleFilter: () => {return(false)}
};

const Form = reduxForm({ form: "FaturaDetalhadaClassificacao" })(
  FaturaDetalhadaClassificacao
);

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      get_operators_and_vendors,
      get_all_classifications_by_vendor,
      delete_roles_items,
      reclassify_rules,
      get_all_bill_dd,
      save_value
    },
    dispatch
  );

const mapStateToProps = (state, props) => {
  let user_name = get(props, "bill.user.registry", "");
  let area_name = get(props, "bill.user_area.name", "");
  let status_description = get(props, "bill.status.description", "");
  let network = get(props, "bill.network", "");
  let vendor = get(props, "bill.vendor.name", "");
  let operator = get(props, "bill.operator.regional", "");
  let group = get(props, "bill.group.name", "");
  let bill_month = get(props, "bill.bill_month", "");
  let competence_month = get(props, "bill.competence_month", "");
  let created_at = get(props, "bill.created_at", "");
  let accepted_at = get(props, "bill.accepted_at", "");
  let checked_at = get(props, "bill.checked_at", "");
  let approved_at = get(props, "bill.approved_at", "");
  let bill_number = get(props, "bill.bill_number", "");
  let order_at = get(props, "bill.order_at", "");
  let deadline_at = get(props, "bill.deadline_at", "");
  let bill_dd_circuits = get(props, "bill.bill_dd_circuits", "");
  let bill_cost_dd = get(props, "bill.bill_cost_dd", "");
  let bill_total = get(props, "bill.bill_total", "");
  let bill_difference = parseFloat(bill_total - bill_cost_dd).toFixed(2);

  return {
    faturaDetalhadaClassificacaoForm: state.form.FaturaDetalhadaClassificacao,
    visualizarFaturasReducer: state.visualizarFaturasReducer,
    regrasClassificacaoReducer: state.regrasClassificacaoReducer,
    auth: state.auth,
    initialValues: {
      user_name,
      area_name,
      status_description,
      network,
      vendor,
      operator,
      group,
      bill_month,
      competence_month,
      created_at,
      accepted_at,
      checked_at,
      approved_at,
      bill_number,
      order_at,
      deadline_at,
      bill_dd_circuits,
      bill_cost_dd,
      bill_total,
      bill_difference
    },
    enableReinitialize: true
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
