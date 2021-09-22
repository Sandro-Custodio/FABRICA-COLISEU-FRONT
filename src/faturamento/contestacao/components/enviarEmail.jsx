import React, { useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { toastr } from "react-redux-toastr"

import {

} from "@devexpress/dx-react-grid";

import {
  Grid as DxGrid,
  // Table,
  TableHeaderRow,
  TableColumnResizing,
} from "@devexpress/dx-react-grid-bootstrap3";

import Table from "common/table";

import ModalForm from "../../../common/layout/modal";
import ReactTooltip from "react-tooltip";

import { get_all_data_providers } from "../../../sd/form/actions";
import { download, send_email } from "../actions";

import Provedor from "../../../sd/form/provedor";
import { LabelField, TextareaFieldValidation } from "common/form/components";

const EnviarEmail = props => {

  const {
    reducer: {},
    enviarEmailForm,
    vendor,
    contacts,
    file_name,
    bcl,
    auth,
    reloadparent,
    //actions
    get_all_data_providers,
    send_email,
  } = props;

  const columns = [
    { name: "addressee", title: "Destinatário" },
    { name: "contact_name", title: "Contato" },
    { name: "contact_mail", title: "Email" },
  ];

  const ModalFooter = (
    <div>
      <button
        className="btn btn-primary btn-sm"
        onClick={() => submitEmail()}
      >
        <i className="fa fa-location-arrow" /> Enviar E-mail
      </button>
    </div>
  );

  const submitEmail = () => {
    console.log("bcl ",bcl)

    if (validateSubmit()){
      const value = {
        user: {
          city: auth?.user?.city,
          name: auth?.user?.name,
          address: auth?.user?.address,
          id: auth?.user?.id,
          contact_number: auth?.user?.contact_number,
          email: auth?.user?.email,
          fax_number: auth?.user?.fax_number
        },
        lote_id: bcl?.id,
        title: "Contestação - Lote - "+bcl?.code,
        body: enviarEmailForm?.values?.bodytext,
        file_name: bcl?.file_name,
        contatos: selectedContacts.map(index => {
          return(contacts[index])
        }),
      }
      console.log(value)
      Promise.all([send_email(value)])
    }
  }

  const validateSubmit = () => {
    if(!enviarEmailForm?.values?.bodytext){
      toastr.warning("Favor preencher o corpo do e-mail.")
      return false
    }else{
      if(selectedContacts && selectedContacts.length < 1){
        toastr.warning("Favor selecionar um destinatário.")
        return false
      }else{
        return true
      }
    }
  }

  const [selectedContacts, setSelectedContacts] = useState([]);
  const selectAllContacts = () => {

  }

  // React.useEffect(() => {
  //   Promise.all([get_all_data_providers(vendor?.id)])
  // },[])

  return (
    <div>
        <ModalForm
          LabelButtonSubmit="Envio de E-mail"
          id="envio-email"
          title="Envio de E-mail"
          dimension="modal-enviar-email"
          footer={ModalFooter}
        >
          <form>
            <div className="text-center">
              <b>Contestação: Data: {new Date().toLocaleDateString("pt-BR", { timeZone: "UTC" })}</b>
            </div>
            <div className="form-group">
              <b>Provedor: &nbsp; <a>{bcl?.provedor}</a></b>
            </div>
            <div className="form-group">
              <hr />
            </div>
            <div className="text-center form-group">
              <b>EMITIDO POR TIM CELULAR S/A</b>
            </div>
            <div className="row form-group">
              <div className="col-xs-4">
                <Field
                  cols="12"
                  label="Nome Representante"
                  name="nome_representante"
                  component={LabelField}
                  disabled={true}
                  type="text"
                />
                <Field
                  cols="12"
                  label="E-mail"
                  name="email"
                  component={LabelField}
                  // data={}
                  type="text"
                />
              </div>
              <div className="col-xs-4">
                <Field
                  cols="12"
                  label="Telefone Celular"
                  name=""
                  component={LabelField}
                  // data={}
                  type="text"
                />
                <Field
                  cols="12"
                  label="Fax"
                  name=""
                  component={LabelField}
                  // data={}
                  type="text"
                />
              </div>
              <div className="col-xs-4">
                <Field
                  cols="12"
                  label="Endereço"
                  name=""
                  component={LabelField}
                  // data={}
                  type="text"
                />
                <Field
                  cols="12"
                  label="Cidade"
                  name=""
                  component={LabelField}
                  // data={}
                  type="text"
                />
              </div>
            </div>
            <div className="form-group">
              <hr />
            </div>
            <span>
              <i className="fa fa-paperclip" /> &nbsp;
              <a className="btn btn-link btn-sm"
                onClick={() => download(bcl?.file_name)}
              >
                {bcl?.file_name}
              </a>
            </span>
            <div className="form-group">
              <hr />
            </div>
            <div className="fw-text">
              <Field
                cols="12"
                label="Body"
                name="bodytext"
                rows="4"
                component={TextareaFieldValidation}
                // data={}
                type="textarea"
              />
            </div>
            <Table
              columns={columns}
              rows={contacts}
              selectionProps={{ selection: selectedContacts, onSelectionChange: setSelectedContacts }}
              selectByRowClick={false}
              disablePagination={true}
            />
            {/* <DxGrid rows={contacts} columns={columns}>
              <Table cellComponent={customRowCell}/>
              <TableHeaderRow
                cellComponent={customHeaderCell}
              />
            </DxGrid> */}
            <ModalForm
              LabelButtonSubmit="Detalhes Provedor"
              id="envio-email"
              title="Envio de E-mail"
              dimension="modal-email-provedor-lote"
              footer={ModalFooter}
            >
              <Provedor />
            </ModalForm>
          </form>
        </ModalForm>
    </div>
  );
};

EnviarEmail.defaultProps = {
  reloadparent: () => {},
}

const Form = reduxForm({ "form": "enviarEmail" })(EnviarEmail);

const mapStateToProps = state => ({
  auth: state.auth,
  reducer: state.contestacaoReducer,
  vendor: state.contestacaoReducer.updated_vendor,
  bcl: state.contestacaoReducer.bcl,
  contacts: state.sdFormReducer.vendor_contacts,
  enviarEmailForm: state.form.enviarEmail,
  initialValues:{
    nome_representante: state.auth?.user?.name,
    email: "timcoliseu@beijaflore.com"
  },
  enableReinitialize: true
});

const mapDispatchToProps = dispatch => bindActionCreators({
  get_all_data_providers,
  send_email,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);

