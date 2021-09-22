import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Overlay from "../../common/msg/overlay/overlay";
import ContentHeader from "common/adminLTE/contentHeader";
import Grid from "../../common/layout/grid";
import Row from "../../common/layout/row";
import { reduxForm, Field, change, untouch} from "redux-form";
import {
  DropdownListField,
  TextareaFieldValidation,
  DateTimePickerField,
  LabelField
} from "../../common/form/components";

import {
  set_lpu_items,
  get_combos_lpu,
  get_vendor_degraus,
  get_lpu_contracts_by_vendor,
  create_lpu
} from "../actions";

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
  TableColumnResizing
} from "@devexpress/dx-react-grid-bootstrap3";

const required = value => value ? undefined : 'Campo obrigatório'

const compareDates = (value, allValues) => {
  if (formatDate(value) < formatDate(allValues.lpu_begin_at)) {
    return 'Data Fim não pode anteceder Início'
  } else {
    return undefined;
  }
}

const formatDate = date => {
  if(date){
    var splitDate = date.split('/');
    if(splitDate.length === 3){
      return new Date(""+splitDate[2]+"-"+splitDate[1]+"-"+splitDate[0])
    }else{
      return undefined
    }
  }else{
    return undefined
  }
}

const CreateLPUForm = props => {
  const {
    createLPUForm,
    auth,
    comandoLpuReducer: {
      create_columns,
      lpu_items,
      defaultCreateColumnsWidths,
      degrau_list,
      vendors,
      lpu_contracts
    },
    // actions
    set_lpu_items,
    get_combos_lpu,
    get_vendor_degraus,
    get_lpu_contracts_by_vendor,
    create_lpu
  } = props

  const status = "Ativo";
  const speed_unity = ["Kbps","Mbps"]
  const speed_symbol = ["=","<="]
  const vendor_prazo = ["0","12","24","36","60"]
  const network = ["Todos", "Fixa", "Movel"];

  const [selection, setSelection] = React.useState([]);
  const Root = props => <DxGrid.Root {...props} style={{ height: '100%' }} />;

  React.useEffect(() => {
    Promise.all([get_combos_lpu(),get_vendor_degraus()])
  },[])

  const isFieldsFilleds = (fields) => {
    if (!createLPUForm) {
      return true
    }

    const fieldsWithErrors = fields
      .map(field => createLPUForm.syncErrors?.hasOwnProperty(field))
      .filter(hasError => hasError)

    return fieldsWithErrors.length > 0
  }

  const isLpuFilled = () => {
    const fields = ["vendor", "contracts", "network", "lpu_begin_at", "lpu_end_at"]
    return isFieldsFilleds(fields);
  }

  const isLpuItemFilled = () => {
    const fields = ["degrau", "speed", "speed_unity", "speed_symbol", "vendor_prazo", "mens_s_imp", "inst_s_imp"]
    return isFieldsFilleds(fields);
  }

  const resetLpuItemForm = () => {
    const fields = ["degrau", "speed", "speed_unity", "speed_symbol", "vendor_prazo", "mens_s_imp", "inst_s_imp"]
    fields.forEach(field => {
      props.dispatch(change('createLPUForm', field, undefined))
      props.dispatch(untouch('createLPUForm', field))
    })
  }

  const addToLpuItems = () => {
    if (!createLPUForm?.values){
      return;
    }

    const values = createLPUForm.values

    let item = {
      degrau: values.degrau,
      speed: values.speed,
      speed_unity: values.speed_unity,
      speed_symbol: values.speed_symbol,
      vendor_prazo: values.vendor_prazo,
      mens_s_imp: values.mens_s_imp,
      inst_s_imp: values.inst_s_imp
    }

    set_lpu_items(item)
    resetLpuItemForm()
  }

  const save_lpu_with_items = () => {
    if (!createLPUForm) {
      return false
    }

    let params = {
      lpu: {
        vendor_id: createLPUForm.values.vendor.id,
        contract_id: createLPUForm.values.contracts.id,
        status: "Ativo",
        network: createLPUForm.values.network,
        lpu_description: createLPUForm.values.lpu_description,
        lpu_begin_at: createLPUForm.values.lpu_begin_at,
        lpu_end_at: createLPUForm.values.lpu_end_at,
        user_id: auth.user.id,
        lpu_items_attributes: lpu_items.map(item => {
          return {
            vendor_degrau_id: item.degrau.id,
            speed: item.speed,
            speed_unity: item.speed_unity,
            speed_symbol: item.speed_symbol,
            vendor_prazo: item.vendor_prazo,
            mens_s_imp: item.mens_s_imp,
            inst_s_imp: item.inst_s_imp
          }
        })
      }
    }

    create_lpu(params)
  }

  const hasLpuItems = () => lpu_items.length > 0

  return (
    <div className="overlay-wrapper">
      <div className="header">
        <div className="header__left-items">
          <ContentHeader title="Criar" small="LPU" />
        </div>
      </div>
      <form>
        <Grid>
          <div className="box box-default" style={{padding: '.5vw 1vw'}}>
            <div className="box-body">
              <Row>
                <Field
                  label="Provedor"
                  name="vendor"
                  cols="3"
                  disabled={hasLpuItems()}
                  component={DropdownListField}
                  data={vendors}
                  textField={item => item.name}
                  textValue={({ item }) => item.id}
                  type="text"
                  validate={required}
                  placeholder="Selecione"
                  onBlur={ () => {
                    if(createLPUForm?.values?.vendor){
                      Promise.all([get_lpu_contracts_by_vendor(
                        createLPUForm?.values?.vendor
                      )])
                    }
                  }}
                />
                <Field
                  label="Contratos"
                  name="contracts"
                  cols="3"
                  disabled={hasLpuItems()}
                  component={DropdownListField}
                  data={lpu_contracts}
                  textField={item => item.contrato}
                  textValue={({ item }) => item.id}
                  type="text"
                  validate={required}
                  placeholder="Selecione"
                />
                <Field
                  label="Rede"
                  name="network"
                  cols="3"
                  disabled={hasLpuItems()}
                  component={DropdownListField}
                  data={network}
                  textField={item => item}
                  textValue={item => item }
                  type="text"
                  validate={required}
                  placeholder="Selecione"
                />
                <p><b>Status:</b>&nbsp;&nbsp;&nbsp;&nbsp;{status}</p>
                <p><b>Usuário:</b>&nbsp;&nbsp;{auth.user.name}</p>
              </Row>
              <Row>
                <Field
                  label="Descritivo"
                  name="lpu_description"
                  cols="6"
                  rows="4"
                  component={TextareaFieldValidation}
                  type="text"
                  disabled={hasLpuItems()}
                  validate={required}
                />
                <Field
                  label="Data Início"
                  name="lpu_begin_at"
                  cols="12 3"
                  disabled={hasLpuItems()}
                  time={false}
                  component={DateTimePickerField}
                  type="text"
                  validate={required}
                />
                <Field
                  label="Data Fim"
                  name="lpu_end_at"
                  cols="12 3"
                  time={false}
                  disabled={hasLpuItems()}
                  component={DateTimePickerField}
                  type="text"
                  validate={[required, compareDates]}
                />
              </Row>
              <hr style={{borderTop: '1px dashed #ccc'}} />
              <Row>
                <h4 style={{marginLeft: '17px'}}>Item de LPU</h4>
              </Row>
              <Row>
                <Field
                  label="Degrau"
                  name="degrau"
                  cols="1"
                  disabled={isLpuFilled()}
                  component={DropdownListField}
                  data={degrau_list}
                  textField={item => item.descricao}
                  textValue={({ item }) => item.id}
                  type="text"
                  validate={required}
                  placeholder="Selecione"
                />
                <Field
                  label="Velocidade"
                  name="speed"
                  cols="1"
                  disabled={isLpuFilled()}
                  component={LabelField}
                  type="text"
                  validate={required}
                  onInput={e => e.target.value = (""+e.target.value).replace(/[^0-9.,]/g,"")}
                />
                <Field
                  label="Unidade"
                  name="speed_unity"
                  cols="2"
                  disabled={isLpuFilled()}
                  component={DropdownListField}
                  data={speed_unity}
                  textField={item => item}
                  textValue={item => item}
                  type="text"
                  validate={required}
                  placeholder="Selecione"
                />
                <Field
                  label="Simbolo"
                  name="speed_symbol"
                  cols="1"
                  disabled={isLpuFilled()}
                  component={DropdownListField}
                  data={speed_symbol}
                  textField={item => item}
                  textValue={item => item}
                  type="text"
                  placeholder={"Selecione"}
                  validate={required}
                />
                <Field
                  label="Prazo Contratação"
                  name="vendor_prazo"
                  cols="2"
                  disabled={isLpuFilled()}
                  component={DropdownListField}
                  data={vendor_prazo}
                  textField={item => item}
                  textValue={item => item}
                  type="text"
                  validate={required}
                  placeholder="Selecione"
                />
                <Field
                  label="Valor S/ Imposto"
                  name="mens_s_imp"
                  cols="2"
                  disabled={isLpuFilled()}
                  component={LabelField}
                  type="text"
                  validate={required}
                  onInput={e => e.target.value = (""+e.target.value).replace(/[^0-9.,]/g,"")}
                />
                <Field
                  label="Taxa S/ Imposto"
                  name="inst_s_imp"
                  cols="2"
                  disabled={isLpuFilled()}
                  component={LabelField}
                  type="text"
                  validate={required}
                  onInput={e => e.target.value = (""+e.target.value).replace(/[^0-9.,]/g,"")}
                />
                <button
                  type="button"
                  disabled={isLpuItemFilled()}
                  style={{marginTop: '1.9vw'}}
                  className="btn btn-success"
                  onClick={() => addToLpuItems()}
                >
                  Adicionar
                </button>
              </Row>
            </div>
          </div>
        </Grid>
      </form>

      <Grid>
        <Row>
          <div className="box box-default" style={{marginLeft: "15px", marginRight: "-15px"}}>
            <div className="box-body" style={{height: "180px"}}>
              <DxGrid rows={lpu_items} columns={create_columns} showBorders  rootComponent={Root}>
                <SortingState/>
                <SelectionState
                  selection={selection}
                  onSelectionChange={ selection => setSelection(selection)}
                />
                <IntegratedSorting />
                <IntegratedSelection />
                <VirtualTable height="auto"/>
                <DragDropProvider />
                <Table />
                <TableColumnResizing defaultColumnWidths={defaultCreateColumnsWidths} />
                <TableHeaderRow
                  showSortingControls
                />
                <TableSelection selectByRowClick highlightRow/>
              </DxGrid>
            </div>
          </div>
        </Row>
        <Row>
          <button
            type="button"
            style={{marginTop: '1.3vw', float: "right"}}
            className="btn btn-success"
            disabled={!hasLpuItems()}
            onClick={() => save_lpu_with_items()}
          >
            Salvar
          </button>
        </Row>
      </Grid>
      <Overlay/>
    </div>
  );
}

const CreateLPU = reduxForm({ form: "CreateLPUForm" })(CreateLPUForm);

const mapDispatchToProps = dispatch => bindActionCreators({
  set_lpu_items,
  get_combos_lpu,
  get_vendor_degraus,
  get_lpu_contracts_by_vendor,
  create_lpu
}, dispatch);

const mapStateToProps = state => ({
  auth: state.auth,
  createLPUForm: state.form.CreateLPUForm,
  comandoLpuReducer: state.comandoLpuReducer
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateLPU);
