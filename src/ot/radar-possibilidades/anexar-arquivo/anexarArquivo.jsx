import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Dropzone from "react-dropzone";
import Row from "../../../common/layout/row";
import MontarTabela from "../../../ot/inserir-anexo-arquivo/montarTabela";
import { uploadFileOtMult, rowAlterarState } from "../../../ot/inserir-anexo-arquivo/actions";
import { save_tracking_attachs, get_tracking_attachs } from "../actions";
// import "./styles.css";
import get from 'lodash/get';

class AnexarArquivo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "Projeto",
      tamanho: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  onDrop = files => {
    const file_name = files[0].name.split(".");
    const repository_name = `ANEXO${file_name[0]}${new Date().getTime()}.${
      file_name[1]
    }`;
    files[0].repository_name = repository_name;
    const { rowAlterarState } = this.props;
    //TODO
    this.setState({ tamanho: files });
    rowAlterarState(files);
    const formData = new FormData();
    formData.append("Filedata", files[0]);
    formData.append("new_file_name", repository_name);
    formData.append("folder_name", "pms/evidencias");
    uploadFileOtMult(formData);
  };

  _cancelar = () => {
    this.setState({ tamanho: [] });
    window.$("#anexar").modal("hide");
  };

  salvarAnexo(rows, value) {
    const { auth, saveAnexoOT } = this.props;
    const {
      inserirAnexoOt: { linhaSelecionada }
    } = this.props;
    const seg_attachments = rows
      .filter(r => r.new)
      .map(r => ({
        user_id: auth.user.id,
        area_id: auth.user.area_id,
        original_name: r.name,
        repository_name: r.repository_name,
        attach_type: value,
        ot_segmentation_id: linhaSelecionada.seg_id,
        file_type: r.path,
        file_size: r.size
      }));

    const objJsonArquivoAnexado = {
      file_size: rows[0].size,
      repository_name: rows[0].repository_name,
      area_id: auth.user.area_id,
      user_id: auth.user.id,
      file_type: rows[0].path,
      original_name: rows[0].name,
      ot_segmentation_id: linhaSelecionada.seg_id,
      attach_type: value,
      seg_attachs: seg_attachments,
      deleted_seg_attachs: []
    };

    saveAnexoOT(objJsonArquivoAnexado, linhaSelecionada);
    this.setState({ tamanho: [] });
  }

  salvarAnexoPms(rows){
    const {radarPossibilidades: { evt }, auth, save_tracking_attachs, form} = this.props;
    const user_id = auth.user.id;
    const attachments = rows
      .filter(r => r.new)
      .map(r => ({
        user_id: auth.user.id,
        area_id: auth.user.area_id,
        original_name: r.name,
        repository_name: r.repository_name,
        attach_type: '',
        file_type: r.path,
        file_size: r.size
      }));
    const auxiliar = {
      description: form.description ? form.description : null,
      protocol_date: form.protocol_date ? form.protocol_date : Date.now(),
      area_id: "67"
    };
    save_tracking_attachs(evt, attachments, auxiliar, user_id)
  }

  handleChange(event) {
    this.setState({ value: event.currentTarget.value });
  }

  render() {
    const { value, tamanho } = this.state;
    const {
      inserirAnexoOt: { rows },
      radarPossibilidades: { evt },
      // form,
      get_tracking_attachs
    } = this.props;
    return (
      <div className="overlay-wrapper">
        <div className="box box-default">
          <div>
            <Row>
              <div className="form-inline  col-xs-6 ">
                <Dropzone onDrop={this.onDrop}>
                  {({
                    getRootProps,
                    getInputProps,
                    isDragActive,
                    isDragReject
                  }) => (
                    <div
                      className="dropzone"
                      data-for="top_dark_float"
                      data-tip="SOLTE O ARQUIVO AQUI."
                      {...getRootProps()}
                    >
                      <input {...getInputProps()} />
                      <i className="fa fa-upload" />
                      {!isDragActive && " Clique aqui ou solte um arquivo!"}
                      {isDragActive &&
                        !isDragReject &&
                        " Solte o arquivo aqui."}
                      {isDragReject && "Arquivo inválido!"}
                    </div>
                  )}
                </Dropzone>
              </div>
              <div className="form-inline  col-xs-2 ">
                <span>Tipo de anexo:</span>
              </div>
              <div className="form-inline  col-xs-4 ">
                <select
                  onChange={this.handleChange}
                  value={value}
                  className="form-control"
                >
                  <option value="Projeto">Projeto</option>
                  <option value="Arquivo">Arquivo</option>
                  <option value="Revisão">Revisão</option>
                </select>
              </div>
            </Row>
          </div>
        </div>

        <MontarTabela />
        <div>
          <div className="anexo_footer">
            <div className="form-inline  salvar">
              <button
                type="button"
                className="btn btn-primary btn-footer"
                disabled={tamanho.length === 0 && true}
                onClick={() => {
                  this.salvarAnexoPms(rows)
                  setTimeout(() => {
                    get_tracking_attachs(evt.id)
                  }, 3000)
                }}
              >
                Salvar
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={this._cancelar}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { uploadFileOtMult, rowAlterarState, save_tracking_attachs, get_tracking_attachs},
    dispatch
  );
const mapStateToProps = state => ({
  auth: state.auth,
  inserirAnexoOt: state.inserirAnexoOt,
  radarPossibilidades: state.radarPossibilidades,
  linhaSelecionada: state.inserirAnexoOt.seg_attachs,
  form: get(state, "form.HistoricoNotificacoesPanel.values", {})
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnexarArquivo);
