import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { toastr } from "react-redux-toastr";

import SimpleTable from "../../../common/layout/simple-table";
import ModalForm from "../../../common/layout/modal";
import Row from "../../../common/layout/row";

import {
  save_resposta_lote,
} from "../actions";
import { check } from "prettier";

const CriticasUpload = props => {

  const {
    reducer: {
      criticas_upload,
    },
    auth,
    // actions
    save_resposta_lote,
    handleReload,
    reloadData,
    uploadedFileName
  } = props;

  const columns = [
    { name: 'id', title: 'ID Contestação' },
    { name: 'critica', title: 'Crítica' },
    { name: 'status_contestacao_prov', title: 'Status Contestação Provedor' },
    { name: 'analise_provedor', title: 'Observação Provedor' },
    { name: 'status_contest_prov_treplica', title: 'Status Contestação Provedor Tréplica' },
    { name: 'analise_provedor_treplica', title: 'Observação Provedor Tréplica' },
  ]

  const columnWidths = [
    { "columnName": "id", "width": 120 },
    { "columnName": "status_contestacao_prov", "width": 220 },
    { "columnName": "analise_provedor", "width": 600 },
    { "columnName": "status_contest_prov_treplica", "width": 240 },
    { "columnName": "analise_provedor_treplica", "width": 600 },
    { "columnName": "critica", "width": 320 },
  ]

  var checkSubmitDisabled = false;
  var divHeight = 5.5;

  if(criticas_upload?.length > 0){
    for(var row of criticas_upload){
      divHeight += 5.5;
      if(row.critica != null){
        checkSubmitDisabled = true;
        break
      }
    }
  }else{
    checkSubmitDisabled = true;
  }

  const handleSubmit = () => {
    // console.log("handleReload()",handleReload)
    // console.log("reloadData",reloadData)
    // handleReload(reloadData)
    if(uploadedFileName?.length > 0 ){
      save_resposta_lote(auth.user.id, uploadedFileName).then($ => {
        setTimeout(() => {
          handleReload(reloadData)
        }, 100);
      })
    }
  }

  return (
    <div>
      <ModalForm
        LabelButtonSubmit="Críticas Upload"
        id="criticas-upload-contestacao"
        title="Críticas Upload"
        dimension="modal-lg"
        height="32vw"
      >
        <Row>
          <div style={{paddingLeft: '0.6vw', paddingBottom: '0.6vw', height: ''+divHeight+'vw'}}>
            <SimpleTable
              column_content={columns}
              row_content={criticas_upload}
              defaultColumnWidths={columnWidths}
            />
          </div>
        </Row>
        <Row>
          <button
            className="btn btn-success"
            type="button"
            disabled={checkSubmitDisabled}
            onClick={() => handleSubmit()}
          >
            Confirmar
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
  save_resposta_lote
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CriticasUpload);
