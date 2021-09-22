import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import ContentHeader from "common/adminLTE/contentHeader";
import Overlay from "common/msg/overlay/overlay";
import Grid from "common/layout/grid";
import Row from "common/layout/row";
import {
  DropdownListField,
  DateTimePickerField,
  LabelField,
  TextareaField,
} from "common/form/components";

import { Grid as DxGrid } from "@devexpress/dx-react-grid-bootstrap3";
import { Table as CompTable } from "common";

import Upload from "./upload-arquivo";

import { get_auxiliar_tables, save_contract } from "../actions";

const Root = props => <DxGrid.Root {...props} style={{ height: '16vw' }} />;

const compareDates = (value, allValues) =>
  value && (formatDate(value) > formatDate(allValues.data_ativacao)) ? 'Não pode ser posterior ao Início de Vigência' : undefined;
const required = value => value ? undefined : 'Campo obrigatório';

const CadastrarContrato = props => {

  const {
    auth,
    cadastrarContratoForm,
    lpuContratosReducer: {
      network,
      vendor,
      classification,
      objeto_contrato,
      objeto_descricao
    },
    //actions
    get_auxiliar_tables,
    save_contract,
  } = props;

  const [file_list, setFileList] = React.useState([]);
  const [selection, onSelectionChange] = React.useState([]);
  const [end_at, setEndAt] = React.useState("");

  const handleListChange = list => {
    onSelectionChange([])
    setFileList(list)
  };

  const handleSubmit = () => {
    if(cadastrarContratoForm && !cadastrarContratoForm.syncErrors){
      const contract_params = {
        contrato_automatico:      "",//não encontrado
        mes_renovacao_automatica: cadastrarContratoForm.values.renovacao,//ok
        primeira_cobranca_id:     null, //removido na migração
        objeto_contrato:          cadastrarContratoForm.values.objeto_contrato, //ok
        prazo_contratual:         cadastrarContratoForm.values.prazo_contratual, //ok
        rede:                     cadastrarContratoForm.values.rede.rede,//ok
        contract_end_at:          end_at ,//ok
        classificacao_objeto:     cadastrarContratoForm.values.classificacao_objeto,//ok
        data_assinatura:          cadastrarContratoForm.values.data_assinatura,//ok
        assinatura:               cadastrarContratoForm.values.assinatura,//ok
        contract_start_at:        cadastrarContratoForm.values.data_ativacao,//ok
        provedor:                 cadastrarContratoForm.values.vendor.name,//ok
        objeto_descricao:         cadastrarContratoForm.values.objeto_descricao, //ok
        provedor_id:              cadastrarContratoForm.values.vendor.id,//ok
        status_cadastro:          cadastrarContratoForm.values.status_cadastro,//ok
        contrato:                 cadastrarContratoForm.values.contrato,//ok
        user_id:                  auth.user.id,//ok
        motivo_inativar:          null,//sempre passa null
        prazo_renovacao:          cadastrarContratoForm.values.prazo_renovacao,//ok
        area_contratante:         cadastrarContratoForm.values.area_contratante,//ok
        gestor:                   cadastrarContratoForm.values.gestor,//ok
        status_contrato:          cadastrarContratoForm.values.status_contrato,//ok
        vigencia:                 cadastrarContratoForm.values.vigencia,//ok
        renovacao_automatica:     cadastrarContratoForm.values.renovacao_automatica,//ok
      };
      const remarks = {
        deleted_contract_remarks: [],
		    contract_remarks: [{remark: cadastrarContratoForm.values.observacao}]
      };
      let attachments = [];
      file_list.map(item => {
        attachments.push({
          size: '',
          repository_name: item.file_name,
          mx_internal_uid: '',
          type: '',
          original_name: item.file_name,
          classification: item.classification,
          file_size: '',
          file_type: ''
        })
      })
      Promise.all([save_contract({
        contract: contract_params,
        remarks: remarks,
        attachments: {"contract_attachs": attachments, "deleted_contract_attachs": []},
        operators:   {"deleted_contract_operators": [], "contract_operators": []},//removido na migração
        products:    {"deleted_contract_products": [], "contract_products": []},//removido na migração
        lpus: {},//removido na migração
      })])
    }
  };

  React.useEffect(() => {
    Promise.all([get_auxiliar_tables()])
  },[])

  return (
    <div className="overlay-wrapper">
      <div className="header" style={{paddingBottom: '1vw'}}>
        <ContentHeader title="Cadastrar" small="Contrato" />
      </div>
      <form>
        <div className="body">
          <Grid cols="12">
            <div className="box box-info" style={{padding: '1vw'}}>
              <Row><h4 style={{paddingBottom: '1vw', paddingLeft: '1vw'}}>Características Gerais</h4></Row>
              <Row>
                <Field
                  label="Status Cadastro"
                  name="status_cadastro"
                  cols="12 3"
                  component={DropdownListField}
                  data={["Completo","Incompleto"]}
                  textField={item => item}
                  textValue={ item => item}
                  placeholder={"Selecione"}
                  type="text"
                  validate={required}
                />
                {auth?.user?.role_name === "ADMIN_WSL" && (
                  <Field
                    label="Status Contrato"
                    name="status_contrato"
                    cols="12 3"
                    component={DropdownListField}
                    data={["Ativo","Inativo"]}
                    textField={item => item}
                    textValue={ item => item}
                    placeholder={"Selecione"}
                    type="text"
                  />
                )}
              </Row>
              <Row>
                <Field
                  label="Rede"
                  name="rede"
                  cols="12 2"
                  component={DropdownListField}
                  data={network}
                  textField={item => item.rede}
                  textValue={ item => item.rede}
                  placeholder={"Selecione"}
                  type="text"
                  validate={required}
                />
                <Field
                  label="Provedor"
                  name="vendor"
                  cols="12 3"
                  component={DropdownListField}
                  data={vendor}
                  textField={item => item.name}
                  textValue={ item => item}
                  placeholder={"Selecione"}
                  type="text"
                  validate={required}
                />
                <Field
                  label="Contrato Provedor"
                  name="contrato"
                  cols="12 2"
                  component={LabelField}
                  type="text"
                  validate={required}
                />
                <Field
                  label="Início de Vigência"
                  name="data_ativacao"
                  cols="12 2"
                  time={false}
                  component={DateTimePickerField}
                  type="text"
                  placeholder="Selecione"
                  onInput={e => e.target.value = ""}
                  validate={required}
                />
                <Field
                  label="Data de Assinatura"
                  name="data_assinatura"
                  cols="12 2"
                  time={false}
                  component={DateTimePickerField}
                  type="text"
                  placeholder="Selecione"
                  onInput={e => e.target.value = ""}
                  validate={compareDates}
                />
              </Row>
              <Row>
                <Field
                  label="Assinatura"
                  name="assinatura"
                  cols="12 2"
                  component={DropdownListField}
                  data={["Ambas as partes","Somente uma parte","Não assinado","Minuta não assinada"]}
                  textField={item => item}
                  textValue={ item => item}
                  placeholder={"Selecione"}
                  type="text"
                  validate={required}
                />
                <Field
                  label="Área Contratante"
                  name="area_contratante"
                  cols="12 2"
                  component={LabelField}
                  type="text"
                  validate={required}
                />
                <Field
                  label="Gestor"
                  name="gestor"
                  cols="12 2"
                  component={LabelField}
                  type="text"
                  validate={required}
                />
                <Field
                  label="Classificação"
                  name="classificacao_objeto"
                  cols="12 3"
                  component={DropdownListField}
                  data={["Ativação","Renovação","Alteração","Guarda-chuva"]}
                  textField={item => item}
                  textValue={ item => item}
                  placeholder={"Selecione"}
                  type="text"
                  validate={required}
                />
              </Row>
              <Row>
                <Field
                  label="Objeto"
                  name="objeto_contrato"
                  cols="12 3"
                  component={DropdownListField}
                  data={objeto_contrato}
                  textField={item => item}
                  textValue={ item => item}
                  placeholder={"Selecione"}
                  type="text"
                  validate={required}
                />
                <Field
                  label=" "
                  name="objeto_descricao"
                  cols="12 3"
                  component={DropdownListField}
                  data={objeto_descricao}
                  textField={item => item}
                  textValue={ item => item}
                  placeholder={"Selecione"}
                  type="text"
                  validate={required}
                />
              </Row>
            </div>
            <div className="box box-info" style={{padding: '1vw'}}>
              <Row><h4 style={{paddingBottom: '1vw', paddingLeft: '1vw'}}>Prazos</h4></Row>
              <Row>
                <Field
                  label="Prazo Contratual"
                  name="prazo_contratual"
                  cols="12 3"
                  component={DropdownListField}
                  data={["Determinado", "Indeterminado"]}
                  textField={item => item}
                  textValue={ item => item}
                  placeholder={"Selecione"}
                  type="text"
                  disabled={!(cadastrarContratoForm?.values?.data_ativacao)}
                />
                <Field
                  label="Vigência (em meses)"
                  name="vigencia"
                  cols="12 2"
                  component={LabelField}
                  type="text"
                  disabled={!(cadastrarContratoForm?.values?.prazo_contratual === "Determinado")}
                  onInput={e => {
                    e.target.value = (""+e.target.value).replace(/[^0-9]/g, '')
                    let dat = new Date(formatDate(cadastrarContratoForm?.values?.data_ativacao))
                    dat.setMonth(dat.getMonth()+parseInt(e.target.value))
                    setEndAt(dat.toLocaleDateString('pt-BR', {year: 'numeric', month: 'numeric', day: 'numeric'}))
                  }}
                />
                <Field
                  label="Vence em"
                  name="vence_em"
                  cols="12 2"
                  component={LabelField}
                  type="text"
                  disabled={true}
                  placeholder={end_at}
                />
              </Row>
              <Row>
                <Field
                  label="Prazo de Manifestação"
                  name="prazo_renovacao"
                  cols="12 3"
                  component={DropdownListField}
                  data={["30","60","90","180","Indeterminado"]}
                  textField={item => item}
                  textValue={ item => item}
                  placeholder={"Selecione"}
                  type="text"
                />
                <Field
                  label="Renovação Automática"
                  name="renovacao_automatica"
                  cols="12 3"
                  component={DropdownListField}
                  data={["Sim, pelo mesmo período","Sim, por","Sim, por período indeterminado","Não"]}
                  textField={item => item}
                  textValue={ item => item}
                  placeholder={"Selecione"}
                  type="text"
                />
                <Field
                  label="Prazo em meses"
                  name="renovacao"
                  cols="12 2"
                  component={LabelField}
                  type="text"
                  disabled={!(cadastrarContratoForm?.values?.renovacao_automatica === "Sim, por")}
                  onInput={e => e.target.value = (""+e.target.value).replace(/[^0-9]/g, '')}
                />
              </Row>
            </div>
            <div className="box box-info" style={{padding: '1vw'}}>
              <Row><h4 style={{paddingBottom: '1vw', paddingLeft: '1vw'}}>Armazenamento</h4></Row>
              <Row>
                <Grid cols="6">
                  <Row><Field
                    label="Classificação"
                    name="classification"
                    cols="8"
                    component={DropdownListField}
                    data={classification}
                    textField={item => item.description}
                    textValue={ item => item.description}
                    placeholder={"Selecione"}
                    type="text"
                  /></Row>
                  <Row>
                    <Grid cols="8">
                      {cadastrarContratoForm?.values?.classification && (
                      <Upload
                        handleResponse={item => {
                          let aux = file_list;
                          aux.push({
                            file_name: item,
                            classification: cadastrarContratoForm?.values?.classification?.description
                          });
                          handleListChange(aux)
                        }}
                      />)}
                    </Grid>
                  </Row>
                  <Row>
                    <Grid cols="8">
                      <CompTable
                        columns={[
                          { title: "Nome do Arquivo", name: "file_name" },
                          { title: "Classificação", name: "classification" },
                        ]}
                        rows={file_list}
                        selectionProps={{ selection, onSelectionChange }}
                        selectByRowClick={true}
                        disablePagination={true}
                        rootComponent={Root}
                        virtualTable={true}
                      />
                    </Grid>
                  </Row>
                </Grid>
                <Field
                  label="Observação"
                  component={TextareaField}
                  name="observacao"
                  rows="5"
                  cols="4"
                />
              </Row>
            </div>
            <div className="box box-info" style={{padding: '1vw'}}>
              <Row>
                <button
                  type="button"
                  className="btn btn-success"
                  disabled={cadastrarContratoForm?.syncErrors}
                  onClick={() => handleSubmit()}
                >
                  SALVAR
                </button>
              </Row>
            </div>
          </Grid>
        </div>
      </form>
      <Overlay/>
    </div>
  );
};

const Form = reduxForm({ form: "CadastrarContrato" })(CadastrarContrato);

const mapDispatchToProps = dispatch => bindActionCreators({
  get_auxiliar_tables,
  save_contract
}, dispatch);

const mapStateToProps = state => ({
  auth: state.auth,
  cadastrarContratoForm: state.form.CadastrarContrato,
  lpuContratosReducer: state.lpuContratosReducer
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);

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

// const addLpu = () => {
//   //atribui os conteúdos dos arrays
//   let first = lpu_rows
//   let second = chosen_lpu_rows
//   //tendo a selection como index, adiciona cada item do primeiro array ao segundo
//   //e marca esse item como undefined no primeiro array
//   lpu_selection.map(index => {
//     second.push(lpu_rows[index]);
//     first[index]=undefined;
//   })
//   //elimina os itens undefined do primeiro array, concluindo a transferência
//   //de 'first' para 'second'
//   first = first.filter(item => item !== undefined)
//   //necessário limpar as seleções ANTES de atribuir os novos arrays
//   onChosenLpuSelectionChange([])
//   setChosenLpuRows(second)
//   onLpuSelectionChange([])
//   setLpuRows(first)
// }

// const removeLpu = () => {
//   //atribui os conteúdos dos arrays
//   let first = lpu_rows
//   let second = chosen_lpu_rows
//   //tendo a selection como index, adiciona cada item do segundo array ao primeiro
//   //e marca esse item como undefined no primeiro array
//   chosen_lpu_selection.map(index => {
//     first.push(chosen_lpu_rows[index]);
//     second[index]=undefined;
//   })
//   //elimina os itens undefined do segundo array, concluindo a transferência
//   //de 'second' para 'first'
//   second = second.filter(item => item !== undefined)
//   //necessário limpar as seleções ANTES de atribuir os novos arrays
//   onChosenLpuSelectionChange([])
//   setChosenLpuRows(second)
//   onLpuSelectionChange([])
//   setLpuRows(first)
// }

              // <Row>
              //   <Grid cols="4">
              //     <CompTable
              //       columns={[{ title: "LPUs Disponíveis para o Provedor", name: "lpu" }]}
              //       rows={lpu_rows}
              //       selectionProps={{ selection: lpu_selection, onSelectionChange: onLpuSelectionChange }}
              //       // selectByRowClick={true}
              //       disablePagination={true}
              //       rootComponent={Root}
              //       virtualTable={true}
              //     />
              //   </Grid>
              //   <Grid cols="1">
              //     <div className="box box-default" style={{padding: '1vw'}}>
              //       <IconButton
              //         icon="angle-left"
              //         title="Remover LPU"
              //         onClick={() => removeLpu()}
              //       />
              //       <IconButton
              //         icon="angle-right"
              //         title="Adicionar LPU"
              //         onClick={() => addLpu()}
              //       />
              //       <IconButton
              //         icon="angle-double-left"
              //         title="Remover todas as LPUs"
              //         // onClick={() => searchLpus()}
              //       />
              //       <IconButton
              //         icon="angle-double-right"
              //         title="Adicionar todas as LPUs"
              //         // onClick={() => searchLpus()}
              //       />
              //     </div>
              //   </Grid>
              //   <Grid cols="4">
              //     <CompTable
              //       columns={[{ title: "LPUs Selecionadas para este Contrato", name: "lpu" }]}
              //       rows={chosen_lpu_rows}
              //       selectionProps={{ selection: chosen_lpu_selection, onSelectionChange: onChosenLpuSelectionChange }}
              //       selectByRowClick={true}
              //       disablePagination={true}
              //       rootComponent={Root}
              //       virtualTable={true}
              //     />
              //   </Grid>
              // </Row>
