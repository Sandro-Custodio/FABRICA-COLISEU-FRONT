import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { reduxForm, Field, reset } from "redux-form";
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
import IconButton from "common/iconButton";
import { Grid as DxGrid } from "@devexpress/dx-react-grid-bootstrap3";
import { Table as CompTable } from "common";

import Upload from "../cadastrar-contrato/upload-arquivo";

import {
  get_auxiliar_tables,
  edit_contract,
  get_attachments_and_remarks,
  dispatchFileList,
} from "../actions";

// import { linha_contrato } from "./delete_me.json"
import get from "lodash/get";

const Root = props => <DxGrid.Root {...props} style={{ height: '16vw' }} />;

const compareDates = (value, allValues) =>
  value && (formatDate(value) > formatDate(allValues.contract_start_at)) ? 'Não pode ser posterior ao Início de Vigência' : undefined;
const required = value => value ? undefined : 'Campo obrigatório';



const EditarContrato = props => {

  const {
    linha_contrato,
    reloadParent,
    auth,
    editarContratoForm,
    lpuContratosReducer: {
      network,
      vendor,
      classification,
      objeto_contrato,
      objeto_descricao,
      attachments_list,
      remarks_list,
    },
    //actions
    get_auxiliar_tables,
    edit_contract,
    get_attachments_and_remarks,
    dispatchFileList,
  } = props;

  // const [file_list, setFileList] = React.useState(attachments_list);
  const [selection, onSelectionChange] = React.useState([]);
  const [end_at, setEndAt] = React.useState(
    get(linha_contrato, "vence_em") ?
      get(linha_contrato, "vence_em").toLocaleDateString('pt-BR', {
        year: 'numeric', month: 'numeric', day: 'numeric'
      }) : ""
  );

  const handleListChange = list => {
    onSelectionChange([])
    // setFileList(list)
    dispatchFileList(list)
  };


  const handleSubmit = () => {
    if (editarContratoForm && !editarContratoForm.syncErrors) {
      const contract_params = {
        id: get(linha_contrato, "id"),
        contrato_automatico: "",//não encontrado
        mes_renovacao_automatica: editarContratoForm.values.mes_renovacao_automatica,//ok
        primeira_cobranca_id: null, //removido na migração
        objeto_contrato: editarContratoForm.values.objeto_contrato, //ok
        prazo_contratual: editarContratoForm.values.prazo_contratual, //ok
        rede: editarContratoForm.values.rede.rede,//ok
        contract_end_at: end_at,//ok
        classificacao_objeto: editarContratoForm.values.classificacao_objeto,//ok
        data_assinatura: editarContratoForm.values.data_assinatura,//ok
        assinatura: editarContratoForm.values.assinatura,//ok
        contract_start_at: editarContratoForm.values.contract_start_at,//ok
        provedor: editarContratoForm.values.vendor.name,//ok
        objeto_descricao: editarContratoForm.values.objeto_descricao, //ok
        provedor_id: editarContratoForm.values.vendor.id,//ok
        status_cadastro: editarContratoForm.values.status_cadastro,//ok
        contrato: editarContratoForm.values.contrato,//ok
        user_id: auth.user.id,//ok
        motivo_inativar: null,//sempre passa null
        prazo_renovacao: editarContratoForm.values.prazo_renovacao,//ok
        area_contratante: editarContratoForm.values.area_contratante,//ok
        gestor: editarContratoForm.values.gestor,//ok
        status_contrato: editarContratoForm.values.status_contrato,//ok
        vigencia: editarContratoForm.values.vigencia,//ok
        renovacao_automatica: editarContratoForm.values.renovacao_automatica,//ok
      };
      const remarks = {
        deleted_contract_remarks: [],
        contract_remarks: [{ remark: editarContratoForm.values.observacao }]
      };
      let attachments = [];
      attachments_list.map(item => {
        if (!item?.id) {
          attachments.push({
            size: '',
            repository_name: item.repository_name,
            mx_internal_uid: '',
            type: '',
            original_name: item.file_name,
            classification: item.classification,
            file_size: '',
            file_type: ''
          })
        }
      })
      Promise.all([edit_contract({
        contract: contract_params,
        remarks: remarks,
        attachments: { "contract_attachs": attachments, "deleted_contract_attachs": [] },
        operators: { "deleted_contract_operators": [], "contract_operators": [] },//removido na migração
        products: { "deleted_contract_products": [], "contract_products": [] },//removido na migração
        lpus: {},//removido na migração
      })]).finally($ => {
        reloadParent()
      })
    }
  };

  React.useEffect(() => {
    Promise.all([get_auxiliar_tables()])
  }, [])

  const Cell = ({row}) => {

    return (
      <>
        <IconButton
          icon="download"
          onClick={() =>
            window.open(
              `${process.env.REACT_APP_API_URL}/anexos_contratos/${row.repository_name}`
            )
          }
        />
      </>
    );
  };

  return (
    <div className="overlay-wrapper">
      <form>
        <div className="body">
          <Grid cols="12">
            <div className="box box-info" style={{ padding: '1vw' }}>
              <Row><h4 style={{ paddingBottom: '1vw', paddingLeft: '1vw' }}>Características Gerais</h4></Row>
              <Row>
                <Field
                  label="Status Cadastro"
                  name="status_cadastro"
                  cols="12 3"
                  component={DropdownListField}
                  data={["Completo", "Incompleto"]}
                  textField={item => item}
                  textValue={item => item}
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
                    data={["Ativo", "Inativo"]}
                    textField={item => item}
                    textValue={item => item}
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
                  textValue={item => item.rede}
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
                  textValue={item => item}
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
                  name="contract_start_at"
                  cols="12 2"
                  time={false}
                  component={DateTimePickerField}
                  type="text"
                  placeholder={
                    new Date(get(linha_contrato, "contract_start_at")).toLocaleDateString(
                      'pt-BR', { year: 'numeric', month: 'numeric', day: 'numeric' })
                  }
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
                  placeholder={
                    new Date(get(linha_contrato, "data_assinatura")).toLocaleDateString(
                      'pt-BR', { year: 'numeric', month: 'numeric', day: 'numeric' })
                  }
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
                  data={["Ambas as partes", "Somente uma parte", "Não assinado", "Minuta não assinada"]}
                  textField={item => item}
                  textValue={item => item}
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
                  data={["Ativação", "Renovação", "Alteração", "Guarda-chuva"]}
                  textField={item => item}
                  textValue={item => item}
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
                  textValue={item => item}
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
                  textValue={item => item}
                  placeholder={"Selecione"}
                  type="text"
                  validate={required}
                />
              </Row>
            </div>
            <div className="box box-info" style={{ padding: '1vw' }}>
              <Row><h4 style={{ paddingBottom: '1vw', paddingLeft: '1vw' }}>Prazos</h4></Row>
              <Row>
                <Field
                  label="Prazo Contratual"
                  name="prazo_contratual"
                  cols="12 3"
                  component={DropdownListField}
                  data={["Determinado", "Indeterminado"]}
                  textField={item => item}
                  textValue={item => item}
                  placeholder={"Selecione"}
                  type="text"
                  disabled={!(editarContratoForm?.values?.contract_start_at)}
                />
                <Field
                  label="Vigência (em meses)"
                  name="vigencia"
                  cols="12 2"
                  component={LabelField}
                  type="text"
                  disabled={!(editarContratoForm?.values?.prazo_contratual === "Determinado")}
                  onInput={e => {
                    e.target.value = ("" + e.target.value).replace(/[^0-9]/g, '')
                    let dat = new Date(formatDate(editarContratoForm?.values?.contract_start_at))
                    dat.setMonth(dat.getMonth() + parseInt(e.target.value))
                    setEndAt(dat.toLocaleDateString('pt-BR', { year: 'numeric', month: 'numeric', day: 'numeric' }))
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
                  data={["30", "60", "90", "180", "Indeterminado"]}
                  textField={item => item}
                  textValue={item => item}
                  placeholder={"Selecione"}
                  type="text"
                />
                <Field
                  label="Renovação Automática"
                  name="renovacao_automatica"
                  cols="12 3"
                  component={DropdownListField}
                  data={["Sim, pelo mesmo período", "Sim, por", "Sim, por período indeterminado", "Não"]}
                  textField={item => item}
                  textValue={item => item}
                  placeholder={"Selecione"}
                  type="text"
                />
                <Field
                  label="Prazo em meses"
                  name="mes_renovacao_automatica"
                  cols="12 2"
                  component={LabelField}
                  type="text"
                  disabled={!(editarContratoForm?.values?.renovacao_automatica === "Sim, por")}
                  onInput={e => e.target.value = ("" + e.target.value).replace(/[^0-9]/g, '')}
                />
              </Row>
            </div>
            <div className="box box-info" style={{ padding: '1vw' }}>
              <Row><h4 style={{ paddingBottom: '1vw', paddingLeft: '1vw' }}>Armazenamento</h4></Row>
              <Row>
                <Grid cols="6">
                  <Row><Field
                    label="Classificação"
                    name="classification"
                    cols="8"
                    component={DropdownListField}
                    data={classification}
                    textField={item => item.description}
                    textValue={item => item.description}
                    placeholder={"Selecione"}
                    type="text"
                  /></Row>
                  <Row>
                    <Grid cols="8">
                      {editarContratoForm?.values?.classification && (
                        <Upload
                          handleResponse={item => {
                            let aux = attachments_list;
                            aux.push({
                              file_name: item,
                              classification: editarContratoForm?.values?.classification?.description
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
                          { title: "", name: "download" },
                        ]}
                        actions={[
                          {
                            columnName: "download",
                            component: Cell
                          }
                        ]}
                        rows={attachments_list}
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
            <div className="box box-info" style={{ padding: '1vw' }}>
              <Row>
                <button
                  type="button"
                  className="btn btn-success"
                  disabled={editarContratoForm?.syncErrors}
                  onClick={() => handleSubmit()}
                // onClick={() => reset('EditarContrato')}
                >
                  SALVAR
                </button>
              </Row>
            </div>
          </Grid>
        </div>
      </form>
      <Overlay />
    </div>
  );
};

EditarContrato.defaultProps = {
  reloadParent: () => { },
}

const Form = reduxForm({ form: "EditarContrato" })(EditarContrato);

const mapDispatchToProps = dispatch => bindActionCreators({
  get_auxiliar_tables,
  edit_contract,
  get_attachments_and_remarks,
  dispatchFileList,
}, dispatch);

const mapStateToProps = (state, props) => {
  return {
    auth: state.auth,
    editarContratoForm: state.form.EditarContrato,
    lpuContratosReducer: state.lpuContratosReducer,
    initialValues: {
      vendor: { name: get(props, "linha_contrato.provedor") },
      contrato: get(props, "linha_contrato.contrato"),
      data_assinatura: get(props, "linha_contrato.data_assinatura"),
      vigencia: get(props, "linha_contrato.vigencia"),
      contract_start_at: new Date(get(props, "linha_contrato.contract_start_at")).toLocaleDateString(
        'pt-BR', { year: 'numeric', month: 'numeric', day: 'numeric' }),
      rede: { rede: get(props, "linha_contrato.rede") },
      assinatura: get(props, "linha_contrato.assinatura"),
      gestor: get(props, "linha_contrato.gestor"),
      classificacao_objeto: get(props, "linha_contrato.classificacao_objeto"),
      objeto_contrato: get(props, "linha_contrato.objeto_contrato"),
      status_cadastro: get(props, "linha_contrato.status_cadastro"),
      status_contrato: get(props, "linha_contrato.status_contrato"),
      prazo_contratual: get(props, "linha_contrato.prazo_contratual"),
      vence_em: get(props, "linha_contrato.vence_em"),
      renovacao_automatica: get(props, "linha_contrato.renovacao_automatica"),
      prazo_renovacao: get(props, "linha_contrato.prazo_renovacao"),
      area_contratante: get(props, "linha_contrato.area_contratante"),
      mes_renovacao_automatica: get(props, "linha_contrato.mes_renovacao_automatica"),
      objeto_descricao: get(props, "linha_contrato.objeto_descricao"),
      observacao: get(state, "lpuContratosReducer.remarks_list.remark")
      // contrato: get(linha_contrato, "contrato")
    },
    enableReinitialize: true
  }
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);

const formatDate = date => {
  if (date) {
    var splitDate = date.split('/');
    if (splitDate.length === 3) {
      return new Date("" + splitDate[2] + "-" + splitDate[1] + "-" + splitDate[0])
    } else {
      return undefined
    }
  } else {
    return undefined
  }
}
