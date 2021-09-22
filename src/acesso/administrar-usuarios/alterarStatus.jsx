import React from "react"
import { Table as DxTable } from "@devexpress/dx-react-grid-bootstrap3";
import { IconButton, Modal } from "common";
import AlterarStatusForm from "./alterarStatusForm";
import { toastr } from "react-redux-toastr";
import { useDispatch, connect } from "react-redux";
import { changeStatus, updateSearch } from "../actions";
import get from "lodash/get";
import { Loading } from "common"

const AlterarStatus = ({ row, usuariosForm }) => {
    const [open, setOpen] = React.useState(false);
    const [newStatus, setNewStatus] = React.useState(row.status);
    const dispatch = useDispatch()

    const [loadingAlterar, setLoadingAlterar] = React.useState(false);

    return (
        <DxTable.Cell>
        <div className="overlay-wrapper">{loadingAlterar && <Loading />}</div>
            <IconButton
                onClick={() => {
                    setOpen(true)
                }}
                icon="submit"
                title="Alterar Status"
                color="#000"
            >
                <i className="fa fa-toggle-on" aria-hidden="true" />
            </IconButton>
            {open && (
                <Modal
                    open={open}
                    title="Alterar Status"
                    dimension="sm"
                    height="10vw"
                    width="30vw"
                    onClose={() => setOpen(false)}
                    footer={
                        <>
                            <button
                                type="button"
                                className="btn btn-primary btn-footer"
                                onClick={() => {
                                    toastr.confirm("Deseja realmente alterar o status do usuário "+row.name+"?",{
                                        onOk: () => {
                                            setOpen(false)
                                            setLoadingAlterar(true)
                                            dispatch(changeStatus(row, newStatus))
                                            dispatch(updateSearch(usuariosForm))
                                        }
                                    })
                                }}
                            >
                                Confirmar
                            </button>
                        </>
                    }
                >
                    <AlterarStatusForm
                        row={row}
                        setNewStatus={setNewStatus}
                    />
                </Modal>
            )}
        </DxTable.Cell>
    )
}

const mapStateToProps = ({ form }) => ({
    usuariosForm: get(form.UsuariosForm, "values", null)
});

export default connect(mapStateToProps, null)(AlterarStatus)