import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import get from "lodash/get";
import { LabelField } from "../../common/form/components";
import { useSelector } from "react-redux";
import DropdownList from "react-widgets/lib/DropdownList";
import Grid from "../../common/layout/grid";


const Row = ({ children }) => <div className="row">{children}</div>;

const EditUserForm = ({editarUsuariosForm, row, setEditarUsuarioForm, setNewPerfil, newPerfil }) => {
    const user = useSelector(state => state.auth.user);

    const { perfil_list } = useSelector(state => ({
        perfil_list: state.cadastroUsuariosReducer.perfil_list
    }))

    setEditarUsuarioForm({
        ...editarUsuariosForm
    });

    setNewPerfil({
        ...newPerfil
    })

    return (
        <form className="form">
            <Row>
                <Field
                    label="Nome Completo"
                    name="name"
                    cols="12 4"
                    component={LabelField}
                />
                <Field label="Email" name="email" cols="12 4" component={LabelField} />
                <Field
                    label="Matrícula"
                    name="registry"
                    cols="12 4"
                    component={LabelField}
                />
            </Row>
            <Row>
                <Field label="Cidade" name="city" cols="12 4" component={LabelField} />
                <Field
                    label="Telefone/ Celular"
                    name="contact_number"
                    cols="12 4"
                    component={LabelField}
                />
                <Field
                    label="Telefone Comercial"
                    name="commercial_number"
                    cols="12 4"
                    component={LabelField}
                />
            </Row>
            <Row>
                <Field
                    label="Fax"
                    name="fax_number"
                    cols="12 4"
                    component={LabelField}
                />
                <Field
                    label="Endereço"
                    name="address"
                    cols="12 4"
                    component={LabelField}
                />
                <Field label="Cargo" name="job" cols="12 4" component={LabelField} />
            </Row>
            <Row>
                <Grid cols={"12 4"}>
                    <div className="form-group">
                        <label>Código Sox</label>
                        <DropdownList
                            defaultValue={row.area_id.textField}
                            data={perfil_list.map(item => { return item.codSox })}
                            onChange={async value => { 
                                const new_user_perfil = await perfil_list.filter(perfil => perfil.codSox == value)
                                setNewPerfil(new_user_perfil[0])
                        }}
                        />
                    </div>
                </Grid>
            </Row>
        </form>
    );
};

const formWrapper = reduxForm({
    form: "EditarUsuariosForm"
})(EditUserForm);

const mapStateToProps = ({ form, state }) => ({
    editarUsuariosForm: get(form.EditarUsuariosForm, "values", null)
});

export default connect(mapStateToProps)(formWrapper);

