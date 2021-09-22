import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import ModalForm from "../../../common/layout/modal";
import Row from "../../../common/layout/row";

import { get_all_data_providers } from "sd/form/actions";

const BoxConfirmarEmail = props => {

  const {
    vendor,
    //actions
    get_all_data_providers,
  } = props;

  const handleSubmit = () => {
    Promise.all([get_all_data_providers(vendor?.id)]).then(() => {
      window.$("#box-confirmar-email-gerar-lote").modal("hide")
      window.$("#envio-email").modal("show")
    })
  }

  return (
    <div>
      <ModalForm
        LabelButtonSubmit=" "
        id="box-confirmar-email-gerar-lote"
        title="Enviar E-mail"
        dimension="modal-sm"
        height="8vw"
      >
        <Row>
          <h4 style={{paddingLeft: '0.6vw'}}>
            Lote gerado com sucesso. Deseja enviar um e-mail ao provedor?
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
            onClick={() => window.$("#box-confirmar-email-gerar-lote").modal("hide")}
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
  reducer: state.contestacaoReducer,
  vendor: state.contestacaoReducer.updated_vendor,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  get_all_data_providers
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoxConfirmarEmail);
