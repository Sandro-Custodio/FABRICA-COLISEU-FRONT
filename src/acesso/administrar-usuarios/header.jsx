import React from "react";
import { Modal, ExportExcel } from "common";
import { connect, useSelector } from "react-redux";
import get from "lodash/get";
import { bindActionCreators } from "redux";
import { toastr } from "react-redux-toastr";
import { reduxForm, Field } from "redux-form";
import { IconButton } from "../../common/comps";
import { LabelField } from "../../common/form/components";
import FormFilter from "./form-filter";
import { saveNewUser, searchUser } from "../actions";
import ReactTooltip from "react-tooltip";

const Header = ({
  usuariosForm,
  perfil_list,
  searchUser,
  cadastroUsuariosReducer
}) => {
  const [open, setOpen] = React.useState(false);
  const [newPerfil, setNewPerfil] = React.useState(null);
  const [adicionarUsuarioForm, setAdicionarUsuarioForm] = React.useState(false);
  const { usuario_list, columns } = useSelector(state => ({
    usuario_list: state.cadastroUsuariosReducer.usuario_list,
    columns: state.cadastroUsuariosReducer.columns
  }))

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ display: "flex" }}>
        <form>
          <Field
            label="Matrícula"
            name="reg"
            cols="12 4"
            component={LabelField}
          />
          <Field label="Nome" name="name" cols="12 4" component={LabelField} />
          <IconButton
            icon="search"
            iconProps={{style: {marginTop: "15px"}}}
            onClick={() => {
              Promise.all([searchUser(usuariosForm, cadastroUsuariosReducer)]);
            }}
          />
          <IconButton
            icon="plus-circle"
            iconProps={{style: {marginTop: "15px"}}}
            onClick={() => {
              setOpen(true);
            }}
          />
          {open && (
            <Modal
              open={open}
              title="Cadastro de Usuário"
              dimension="sm"
              width="60vw"
              onClose={() => setOpen(false)}
              footer={
                <>
                  <button
                    type="button"
                    className="btn btn-primary btn-footer"
                    onClick={() => {
                      if (
                        adicionarUsuarioForm.registry === undefined ||
                        adicionarUsuarioForm.registry.length !== 8 ||
                        (adicionarUsuarioForm.registry
                          .toUpperCase()
                          .charAt(0) !== "T" &&
                          adicionarUsuarioForm.registry
                            .toUpperCase()
                            .charAt(0) !== "F") ||
                        Number.isNaN(
                          adicionarUsuarioForm.registry.substring(1, 8)
                        )
                      ) {
                        toastr.info(
                          "Matricula não atende o seguinte formato:- Primeira letra deve ser 'T' ou 'F'.- Sequência de 7 digitos após a primeira letra."
                        );
                      } else if (
                        adicionarUsuarioForm.email === undefined ||
                        !adicionarUsuarioForm.email.includes("@")
                      ) {
                        toastr.info("Preencha o campo de email corretamente!");
                      } else if (adicionarUsuarioForm.name === undefined) {
                        toastr.info("Preencha o nome completo");
                      } else if (newPerfil.role_id === undefined) {
                        toastr.info("O Perfil precisa ser selecionado.");
                      } else {
                        Promise.all([
                          saveNewUser(adicionarUsuarioForm, newPerfil)
                        ])
                          .then(resp => {
                            if (resp[0].status === 200) {
                              toastr.info("Usuário criado com sucesso!");
                              setOpen(false);
                            } else {
                              toastr.info("Ocorreu um erro ao salvar na base!");
                            }
                          })
                          .catch(error => {
                            console.log(error);
                          });
                      }
                    }}
                  >
                    Cadastrar
                  </button>
                </>
              }
            >
              <FormFilter
                setAdicionarUsuarioForm={setAdicionarUsuarioForm}
                setNewPerfil={setNewPerfil}
              />
            </Modal>
          )}
        </form>
      </div>
      <div style={{ display: "flex", justifyContent: "right", marginTop: "15px" }}>
        <ExportExcel
          rows={usuario_list}
          columns={columns}
          name="Usuários"
        >
          <button
            className="btn btn-link"
            data-for="top_success_float"
            data-tip="Exportar página para CSV"
          >
            <i className="fa fa-file-o text-success" />
            <ReactTooltip
              id="top_success_float"
              place="left"
              type="dark"
              effect="float"
            />
          </button>
        </ExportExcel>
      </div>
    </div>
  );
};

const formWrapper = reduxForm({
  form: "UsuariosForm"
})(Header);

const mapStateToProps = state => ({
  usuariosForm: get(state.form.UsuariosForm, "values", null),
  cadastroUsuariosReducer: state.cadastroUsuariosReducer
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      searchUser
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(formWrapper);
