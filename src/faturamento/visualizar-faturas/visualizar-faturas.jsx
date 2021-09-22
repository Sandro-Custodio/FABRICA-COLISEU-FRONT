import React from "react";
import { bindActionCreators } from "redux";
import { connect, useDispatch } from "react-redux";
import { reduxForm, Field, clearFields, reset } from "redux-form";
import Overlay from "common/msg/overlay/overlay";
import Grid from "common/layout/grid";
import Row from "common/layout/row";
import ContentHeader from "common/adminLTE/contentHeader";
import Content from "common/adminLTE/content";
import ToolBarColumn from "./toolBarColumn";

import {
  DropdownListField,
  LabelField,
  DateTimePickerField,
} from "common/form/components";

import {
  SelectionState,
  SortingState,
  IntegratedSorting,
  IntegratedSelection,
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
  TableFilterRow,
} from "@devexpress/dx-react-grid-bootstrap3";

import ModalForm from "common/layout/modal";
import InvalidarFatura from "./invalidar-fatura/invalidar-fatura";
import AtualizarDdDefinitivo from "./dd-definitivo/atualizar-dd-definitivo";
import FaturaDetalhada from "./fatura-detalhada/fatura-detalhada";
import FaturaDetalhadaClassificacao from "./fatura-detalhada-classificacao/fatura-detalhada-classificacao";

import {
  get_operators_and_vendors,
  get_groups,
  getFaturaList,
  invalidate_bill,
  update_dd_previo,
  get_all_bill_dd,
} from "./actions";

import { get_all_classifications_by_vendor } from "../regras-classificacao/actions";

const VisualizarFaturas = (props) => {
  const {
    visualizarFaturasForm,
    visualizarFaturasReducer: {
      operator_list,
      status_fatura_list,
      vendor_list,
      group_list,
      list,
      columns,
      defaultColumnWidths
    },
    auth,
    get_operators_and_vendors,
    get_groups,
    getFaturaList,
    invalidate_bill,
    update_dd_previo,
    get_all_bill_dd,
    get_all_classifications_by_vendor,
  } = props;

  const network_list = ["MÓVEL", "FIXA", "FIBER"];
  const [groupDisabled, setGroupDisabled] = React.useState(true);
  const [mesRefEnabled, setMesRefEnabled] = React.useState(true);
  // const filtrarDisabled = !(visualizarFaturasForm && visualizarFaturasForm.values && (visualizarFaturasForm.values.vendor && visualizarFaturasForm.values.network));
  const [selection, setSelection] = React.useState([]);
  // const [modalEditContent, setModalEditContent] = React.useState(undefined);

  React.useEffect(() => {
    get_operators_and_vendors();
    clearFilter();
  }, []);

  const checkEnableGroup = () => {
    if (
      visualizarFaturasForm &&
      visualizarFaturasForm.values &&
      visualizarFaturasForm.values.network &&
      visualizarFaturasForm.values.vendor &&
      visualizarFaturasForm.values.regional
    ) {
      const params = {
        operator_id: visualizarFaturasForm.values.regional.id,
        vendor_id: visualizarFaturasForm.values.vendor.id,
        rede: visualizarFaturasForm.values.network,
      };
      props.clearFields("VisualizarFaturas", false, false, ["group"]);
      get_groups(params);
      setGroupDisabled(false);
    } else {
      setGroupDisabled(true);
      props.clearFields("VisualizarFaturas", false, false, ["group"]);
    }
  };

  const dispatch = useDispatch();
  const clearFilter = () => {
    dispatch(reset("VisualizarFaturas"));
  };

  const handleFilter = () => {
    if (visualizarFaturasForm && visualizarFaturasForm.values) {
      const params = {
        invoice_number: visualizarFaturasForm.values.invoice_number
          ? visualizarFaturasForm.values.invoice_number
          : null,
        bill_month: visualizarFaturasForm.values.mes_ref
          ? visualizarFaturasForm.values.mes_ref.substring(3)
          : null,
        status_id: visualizarFaturasForm.values.status_fatura
          ? visualizarFaturasForm.values.status_fatura.id
          : null,
        operator_id: visualizarFaturasForm.values.regional
          ? visualizarFaturasForm.values.regional.id
          : null,
        vendor_id: visualizarFaturasForm.values.vendor
          ? visualizarFaturasForm.values.vendor.id
          : null,
        group_id: visualizarFaturasForm.values.group
          ? visualizarFaturasForm.values.group.id
          : null,
        network: visualizarFaturasForm.values.network
          ? visualizarFaturasForm.values.network
          : null,
      };
      getFaturaList(params);
      // clearFilter();
    }
  };

  const handleClearFilters = () => {
    if (visualizarFaturasForm && visualizarFaturasForm.values) {
      props.clearFields("ImportarFatura", false, false, ["network"]);
      props.clearFields("ImportarFatura", false, false, ["vendor"]);
      props.clearFields("ImportarFatura", false, false, ["regional"]);
      props.clearFields("ImportarFatura", false, false, ["group"]);
      props.clearFields("ImportarFatura", false, false, ["mes_ref"]);
      props.clearFields("ImportarFatura", false, false, ["invoice_number"]);
      props.clearFields("ImportarFatura", false, false, ["status_fatura"]);
      setMesRefEnabled(false);
      setTimeout(() => {
        setMesRefEnabled(true);
      }, 1);
    }
  };

  const Root = (props) => <DxGrid.Root {...props} style={{ height: "100%" }} />;

  var table_height;
  if (list && list.length > 0) {
    table_height = `${10 + list.length * 2.35}vw`;
  } else {
    table_height = "15vw";
  }
  return (
    <div className="overlay-wrapper" width="device-width">
      <div className="">
        <ContentHeader title="Listar Faturas" small="" />
        <Content>
          <div className="box box-body">
            <Grid style={{ padding: "1vw" }}>
              <Row>
                <Field
                  label="Rede"
                  name="network"
                  cols="12 1"
                  component={DropdownListField}
                  data={network_list}
                  textField={(item) => item}
                  textValue={({ item }) => item}
                  onBlur={() => checkEnableGroup()}
                />
                <Field
                  label="Provedor"
                  name="vendor"
                  cols="12 2"
                  component={DropdownListField}
                  data={vendor_list}
                  textField={(item) => item.name}
                  textValue={({ item }) => item.id}
                  onBlur={() => checkEnableGroup()}
                />
                <Field
                  label="Regional"
                  name="regional"
                  cols="12 1"
                  component={DropdownListField}
                  data={operator_list}
                  textField={(item) => item.regional}
                  textValue={({ item }) => item.id}
                  onBlur={() => checkEnableGroup()}
                  // disabled={(dd_previo && visualizarFaturasForm.values.network === "FIXA")}
                />
                <Field
                  label="Agrupador"
                  name="group"
                  cols="12 2"
                  component={DropdownListField}
                  data={group_list}
                  textField={(item) => item.name}
                  textValue={({ item }) => item.id}
                  disabled={groupDisabled}
                />
                {mesRefEnabled && (
                  <Field
                    label="Mês de Referência"
                    name="mes_ref"
                    cols="12 2"
                    component={DateTimePickerField}
                    time={false}
                    formatacao="MM/YYYY"
                    visualizacao={["year"]}
                  />
                )}
                <Field
                  label="Número da Fatura"
                  name="invoice_number"
                  cols="12 2"
                  component={LabelField}
                />
                <Field
                  label="Status da Fatura"
                  name="status_fatura"
                  cols="12 2"
                  component={DropdownListField}
                  data={status_fatura_list}
                  textField={(item) => item.description}
                  textValue={({ item }) => item}
                />
              </Row>
              <Row>
                <button
                  type="button"
                  className="btn btn-info"
                  style={{ marginLeft: "0.9vw" }}
                  disabled={
                    !(visualizarFaturasForm && visualizarFaturasForm.values)
                  }
                  onClick={() => handleFilter()}
                >
                  Filtrar
                </button>
                <button
                  type="button"
                  className="btn btn-warning"
                  style={{ marginLeft: "0.9vw" }}
                  disabled={
                    !(visualizarFaturasForm && visualizarFaturasForm.values)
                  }
                  onClick={() => handleClearFilters()}
                >
                  Limpar
                </button>
              </Row>
              <Row>
                <div style={{ height: table_height }}>
                  <DxGrid
                    rows={list}
                    columns={columns}
                    showBorders
                    rootComponent={Root}
                  >
                    <SortingState />
                    <SelectionState
                      selection={selection}
                      onSelectionChange={(new_selection) => {
                        // setModalEditContent(undefined);
                        if (selection.length > 0) {
                          var aux_selection = new_selection.filter(
                            (x) => !selection.includes(x)
                          );
                          // setSelection([]);
                          // setTimeout(() => {
                          setSelection(aux_selection);
                          // }, 1)
                        } else setSelection(new_selection);
                      }}
                    />
                    <IntegratedSorting />
                    <IntegratedSelection />
                    <VirtualTable height="auto" />
                    <Table />
                    <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
                    <TableHeaderRow showSortingControls />
                    <TableSelection selectByRowClick highlightRow />
                    <Toolbar />
                    <ToolBarColumn
                      selection={selection}
                      list={list}
                      get_all_bill_dd={get_all_bill_dd}
                      get_all_classifications_by_vendor={
                        get_all_classifications_by_vendor
                      }
                    />
                  </DxGrid>
                </div>
              </Row>
            </Grid>
          </div>
        </Content>
      </div>
      <Overlay />
      <ModalForm
        LabelButtonSubmit=""
        id="invalidar_fatura"
        title="Invalidar Fatura"
        dimension="modal-sm"
        // height="32vw"
      >
        <InvalidarFatura
          bill={list[selection[0]]}
          auth={auth}
          invalidate_bill={invalidate_bill}
          handleFilter={handleFilter}
          setSelection={setSelection}
        />
      </ModalForm>
      <ModalForm
        LabelButtonSubmit=""
        id="atualizar_dd_definitivo"
        title="Atualizar Delin Definitivo"
        dimension="modal-lg"
      >
        <AtualizarDdDefinitivo
          bill={list[selection[0]]}
          update_dd_previo={update_dd_previo}
          handleFilter={handleFilter}
          setSelection={setSelection}
        />
      </ModalForm>
      <ModalForm
        LabelButtonSubmit=""
        id="fatura_detalhada"
        title="Detalhamento da Fatura"
        dimension="modal-lg"
      >
        <FaturaDetalhada
          bill={list[selection[0]]}
          update_dd_previo={update_dd_previo}
          handleFilter={handleFilter}
          setSelection={setSelection}
        />
      </ModalForm>
      <ModalForm
        LabelButtonSubmit=""
        id="fatura_detalhada_classificacao"
        title="Detalhamento da Fatura"
        dimension="modal-lg"
        height="38vw"
      >
        {selection && selection.length > 0 && (
          <FaturaDetalhadaClassificacao
            bill={list[selection[0]]}
            update_dd_previo={update_dd_previo}
            handleFilter={handleFilter}
            setSelection={setSelection}
          />
        )}
      </ModalForm>
    </div>
  );
};

const Form = reduxForm({ form: "VisualizarFaturas" })(VisualizarFaturas);

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      get_operators_and_vendors,
      get_groups,
      getFaturaList,
      invalidate_bill,
      update_dd_previo,
      get_all_bill_dd,
      get_all_classifications_by_vendor,
    },
    dispatch
  );

const mapStateToProps = (state) => {
  return {
    visualizarFaturasForm: state.form.VisualizarFaturas,
    visualizarFaturasReducer: state.visualizarFaturasReducer,
    auth: state.auth,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Form);
