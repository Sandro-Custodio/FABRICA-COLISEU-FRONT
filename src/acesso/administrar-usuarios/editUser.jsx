import React from "react"
import { Table as DxTable } from "@devexpress/dx-react-grid-bootstrap3";
import { IconButton, Modal } from "common";
import { toastr } from "react-redux-toastr";
import { editUser, updateSearch } from "../actions";
import EditUserForm from "./edit-user-form";
import { useSelector, connect, useDispatch } from "react-redux";
import get from "lodash/get";
import { Loading } from "common"

const EditUser = ({ row, usuariosForm }) => {
    const [open, setOpen] = React.useState(false);
    const [newPerfil, setNewPerfil] = React.useState(null)
    const { perfil_list } = useSelector(state => ({
        perfil_list: state.cadastroUsuariosReducer.perfil_list
    }))

    const [loading, setLoading] = React.useState(false);
    const dispatch = useDispatch()


    const userPerfil = perfil_list.filter(perfil => perfil.area_id == row.area_id);

    if (userPerfil.length > 0) {
        row.real_area_id = userPerfil[0].area_id
        row.area_id = { textField: userPerfil[0].codSox, textValue: userPerfil[0].role_id }
        row.role_id = userPerfil[0].role_id
    }
    
    const [editarUsuarioForm, setEditarUsuarioForm] = React.useState({ role_id: row.role_id, real_area_id: row.real_area_id });

    return (
        <DxTable.Cell>
        <div className="overlay-wrapper">{loading && <Loading />}</div>
            <IconButton
                style={{
                    visibility: row.status == "Ativo" ? "" : "hidden"
                }}
                onClick={() => {
                    setOpen(true)
                }}
                icon="submit"
                title="Editar usuário"
                color="#000"
            >
                <i className="fa fa-edit" aria-hidden="true" />
            </IconButton>
            {open && (
                <Modal
                    open={open}
                    title="Editar Usuário"
                    dimension="sm"
                    width="60vw"
                    onClose={() => {
                        setOpen(false)
                    }}
                    footer={
                        <>
                            <button
                                type="button"
                                className="btn btn-primary btn-footer"
                                onClick={() => {
                                    if (
                                        editarUsuarioForm.registry === undefined ||
                                        editarUsuarioForm.registry.length != 8 ||
                                        (editarUsuarioForm.registry.toUpperCase().charAt(0) != 'T' &&
                                            editarUsuarioForm.registry.toUpperCase().charAt(0) != 'F') ||
                                        isNaN(editarUsuarioForm.registry.substring(1, 8))
                                    ) {
                                        toastr.info(
                                            "Matricula não atende o seguinte formato:- Primeira letra deve ser 'T' ou 'F'.- Sequência de 7 digitos após a primeira letra."
                                        );
                                    } else if (
                                        editarUsuarioForm.email === undefined ||
                                        !editarUsuarioForm.email.includes("@")
                                    ) {
                                        toastr.info("Preencha o campo de email corretamente!");
                                    } else if (editarUsuarioForm.name === undefined) {
                                        toastr.info("Preencha o nome completo");
                                    } else {
                                        setOpen(false);
                                        setLoading(true)
                                        Promise.all([editUser(editarUsuarioForm, newPerfil)])
                                            .then(resp => {
                                                if (resp[0].status === 200) {
                                                    if (resp[0].data != "") {
                                                        toastr.info(resp[0].data);
                                                    } else {
                                                        toastr.info("Usuário editado com sucesso!");
                                                        dispatch(updateSearch(usuariosForm))
                                                    }
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
                                Editar
                  </button>
                        </>
                    }
                >
                    <EditUserForm initialValues={row}
                        row={row}
                        setEditarUsuarioForm={setEditarUsuarioForm}
                        setNewPerfil={setNewPerfil}
                    />
                </Modal>
            )}
        </DxTable.Cell>
    );
};

const mapStateToProps = ({ form }) => ({
    usuariosForm: get(form.UsuariosForm, "values", null)
});


export default connect(mapStateToProps, null)(EditUser);