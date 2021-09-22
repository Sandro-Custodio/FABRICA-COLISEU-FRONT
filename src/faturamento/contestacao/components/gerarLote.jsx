import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { toastr } from "react-redux-toastr";

import ModalForm from "../../../common/layout/modal";
import Row from "../../../common/layout/row";

import {
  gera_lote_contestation,
} from "../actions";

const GerarLote = props => {

  const {
    reducer: {
      months,
      groups,
      operators,
      bills
    },
    vendors,
    vendorBills,
    // actions
    gera_lote_contestation
  } = props;

  const handleSubmit = () => {
    const { auth } = props;
    if(vendorBills?.bill_ids?.length > 0 &&
      vendorBills?.vendor_id && vendorBills?.mes_ref && vendorBills?.mes_comp){
      Promise.all([gera_lote_contestation(vendorBills)])
    }

    //montar objeto para enviar
    //chamar método gera_lote_contestation
    //criar then que abre pop up verificação de envio de email e fecha essa
    //caso selecione sim para envio de mail, abrir modal já existente de envio de email ao provedor
  }

  return (
    <div>
      <ModalForm
        LabelButtonSubmit="Gerar Lote"
        id="gerar-lote"
        title="Gerar Lote"
        dimension="modal-sm"
        height="8vw"
      >
        <Row>
          <h4 style={{paddingLeft: '0.6vw'}}>
            Somente será gerado lote para as faturas sem lote vinculado. Deseja continuar?
          </h4>
        </Row>
        <Row>
          <button
            className="btn btn-success"
            type="button"
            onClick={() => handleSubmit()}
          >
            Sim
          </button>
          <button
            className="btn btn-danger"
            type="button"
            onClick={() => window.$("#gerar-lote").modal("hide")}
          >
            Não
          </button>
        </Row>
      </ModalForm>
    </div>
  );
}

const mapStateToProps = state => ({
  auth: state.auth,
  reducer: state.contestacaoReducer
});

const mapDispatchToProps = dispatch => bindActionCreators({
  gera_lote_contestation
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GerarLote);
