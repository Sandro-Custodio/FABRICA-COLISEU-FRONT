import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Dropzone from "react-dropzone";
import Row from "../../common/layout/row";
import MontarTabela from "./montarTabela";
import VisualizarAnexo from "./VisualizarAnexo"
import { uploadFileOtMult, saveAnexoOT, rowAlterarState } from "./actions";
import "./styles.css";

class FormVisualizarOt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "Projeto",
      tamanho: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  onDrop = files => {
    const dataDia = new Date();
    const nomeFormat = files[0].name.split(".");
    const nomeArquivoFormat = `ANEXO${nomeFormat[0]}${dataDia.getTime()}.${nomeFormat[1]}`;
    const filesPlusRepositoryName = { ...files, repository_name: nomeArquivoFormat }
    const { rowAlterarState } = this.props;
    const { value } = this.state;
    this.setState({ tamanho: files });
    rowAlterarState(filesPlusRepositoryName, value);
    const formData = new FormData();
    formData.append("Filedata", files[0]);
    formData.append("new_file_name", nomeArquivoFormat);
    formData.append("folder_name", "anexos_projetos");
    uploadFileOtMult(formData)

  };

  _cancelar = () => {
    this.setState({ tamanho: [] });
    window.$("#anexar").modal("hide");
  };

  salvarAnexo(rows) {
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
        attach_type: r.attach_type,
        ot_segmentation_id: linhaSelecionada.seg_id,
        file_type: r.path,
        file_size: r.size
      }));

    const attachments = {
      seg_attachs: seg_attachments,
      deleted_seg_attachs: []
    };

    saveAnexoOT(attachments, linhaSelecionada);
    this.setState({ tamanho: [] });
    this.setState({ repository_name: "" });
  }

  handleChange(event) {
    this.setState({ value: event.currentTarget.value });
  }

  render() {
    const { value, tamanho } = this.state;
    const {
      inserirAnexoOt: { rows, linhaSelecionada },
      //inserirAnexoOt: { linhaSelecionada },
      auth
    } = this.props;
    return (
      <div className="overlay-wrapper">
        {console.log("linhaSelecionada.own_ot_code ---->", linhaSelecionada.own_ot_code),
        console.log("auth.user.area.code ---->", auth.user.area.code)}
        <div className="box box-default">
          {linhaSelecionada.own_ot_code === auth.user.area.code && <div>
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
          </div>}
        </div>
        {linhaSelecionada.own_ot_code === auth.user.area.code ? <MontarTabela /> : <VisualizarAnexo />}
        <div>
          <div className="anexo_footer">
            {
              linhaSelecionada.own_ot_code === auth.user.area.code ?
                <div className="form-inline  salvar">
                  <button
                    type="button"
                    className="btn btn-primary btn-footer"
                    disabled={tamanho.length === 0 && true}
                    onClick={() => {
                      this.salvarAnexo(rows, value);
                      // this.onAlertToggle("isShowingInfoAlert");
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
                </div> :
                <div className="form-inline  salvar">
                  <button
                    type="button"
                    className="btn btn-primary btn-footer"
                    onClick={this._cancelar}
                  >
                    Fechar
                  </button>
                </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { uploadFileOtMult, saveAnexoOT, rowAlterarState },
    dispatch
  );
const mapStateToProps = state => ({
  auth: state.auth,
  inserirAnexoOt: state.inserirAnexoOt,
  linhaSelecionada: state.inserirAnexoOt.seg_attachs,
});
export default connect(mapStateToProps, mapDispatchToProps)(FormVisualizarOt);
