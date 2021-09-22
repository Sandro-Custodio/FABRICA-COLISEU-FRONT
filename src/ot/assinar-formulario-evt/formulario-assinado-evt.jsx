import React from "react";
import { Table, Modal, IconButton } from "common";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";
import Dropzone from "react-dropzone";

import {
  getOtDataFormularioAnexo,
  deleteAnexo,
  uploadFileOtMult,
  rowAlterarState,
  saveAnexoOT,
  download
} from "./actions";
import Row from "../../common/layout/row";
import { logUserMenuAccess } from "../../auth/actions";

const mapDispatchToPropsComand = dispatch =>
  bindActionCreators({ deleteAnexo }, dispatch);
const mapStateToPropsComand = state => ({
  auth: state.auth
});
const CommandButton = connect(
  mapStateToPropsComand,
  mapDispatchToPropsComand
)(({ auth, row, deleteAnexo }) => (
  <>
    <button
      type="button"
      className="btn btn-link"
      onClick={() =>
        download("anexos_projetos/", row.repository_name, auth.user.access_token)
      }
    >
      <span className="primary">
        <i className="glyphicon glyphicon-download" />
      </span>
    </button>
    <button
      type="button"
      className="btn btn-link"
      onClick={() => {
        toastr.confirm("Deseja Deletar esse item?", {
          onOk: () => deleteAnexo(row)
        });
      }}
    >
      <span className="text-danger">
        <i className="glyphicon glyphicon-trash" />
      </span>
    </button>
  </>
));

const FormularioAssinadoEVT = ({
  lista,
  getOtDataFormularioAnexo,
  rows,
  rowAlterarState,
  auth,
  linhaSelecionada,
  saveAnexoOT
}) => {
  const [open, setOpen] = React.useState(false);
  // const [loading, setLoading] = React.useState(false);

  const salvarAnexo = ({ rows, auth, linhaSelecionada, saveAnexoOT }) => {
    // setLoading(true);
    const seg_attachments = rows
      .filter(r => r.new)
      .map(r => ({
        user_id: auth.user.id,
        area_id: auth.user.area_id,
        original_name: r.name,
        repository_name: r.repository_name,
        attach_type: "FORMULARIO_ASSINADO",
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
      attach_type: "FORMULARIO_ASSINADO",
      seg_attachs: seg_attachments,
      deleted_seg_attachs: []
    };

    saveAnexoOT(objJsonArquivoAnexado, linhaSelecionada).then(() => {
      setOpen(false);
      // setLoading(true);
    });
  };

  const columns = [
    { name: "name", title: "Nome" },
    { name: "lastModifiedDate", title: "Data" },
    { name: "size", title: "Tamanho Bytes" },
    { name: "path", title: "Tipo Arquivo" },
    { name: "attach_type", title: "Tipo Anexo" },
    { name: "add", title: "Ações" }
  ];

  const onDrop = files => {
    const file_name = files[0].name.split(".");
    const repository_name = `ANEXO${file_name[0]}${new Date().getTime()}.${
      file_name[1]
    }`;
    files[0].repository_name = repository_name;
    rowAlterarState(files);
    const formData = new FormData();
    formData.append("Filedata", files[0]);
    formData.append("new_file_name", repository_name);
    formData.append("folder_name", "anexos_projetos");
    uploadFileOtMult(formData);
  };

  return (
    <>
      <IconButton
        icon="wpforms"
        data-tip="Formulário Assinado EVT"
        className="btn-lg"
        style={{ margin: 0 }}
        onClick={() => {
          setOpen(true);
          getOtDataFormularioAnexo(lista);
          logUserMenuAccess("DR_COA1B1O2");
        }}
      />
      {open && (
        <Modal
          open={open}
          title="Formulário Assinado EVT"
          dimension="sm"
          width="60vw"
          onClose={() => setOpen(false)}
          disableBtnClose
        >
          <div className="overlay-wrapper montar-tabelas">
            <Row>
              <div className="form-inline  col-xs-5">
                <Dropzone onDrop={onDrop}>
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
                </Dropzone>{" "}
              </div>
            </Row>

            <Table
              columns={columns}
              rows={rows}
              actions={[{ columnName: "add", component: CommandButton }]}
              disablePagination
            />
          </div>

          <div className="form-inline  salvar">
            <button
              type="button"
              className="btn btn-primary btn-footer"
              // disabled={tamanho.length === 0 && true}
              disabled={rows.length === 0}
              onClick={() => {
                salvarAnexo({ rows, auth, linhaSelecionada, saveAnexoOT });
              }}
            >
              Salvar
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                setOpen(false);
              }}
            >
              Cancelar
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { getOtDataFormularioAnexo, rowAlterarState, saveAnexoOT, download },
    dispatch
  );
const mapStateToProps = state => ({
  auth: state.auth,
  assinarFormularioEVT: state.assinarFormularioEVT,
  rows: state.assinarFormularioEVT.rows,
  linhaSelecionada: state.assinarFormularioEVT.linhaSelecionada
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormularioAssinadoEVT);
