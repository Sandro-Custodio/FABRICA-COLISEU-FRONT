import React from "react"
import { Table as DxTable } from "@devexpress/dx-react-grid-bootstrap3";
import { IconButton } from "common";
import { toastr } from "react-redux-toastr";
import { useDispatch } from "react-redux";
import { resetPass } from "../actions"
import { Loading } from "common"

const ReiniciarSenha = ({ row }) => {
    const dispatch = useDispatch()
    const [loadingReset, setLoadingReset] = React.useState(false);

    return (
        <DxTable.Cell>
            <div className="overlay-wrapper">{loadingReset && <Loading />}</div>
            <IconButton
                onClick={() => {
                    toastr.confirm("Deseja realmente reiniciar a senha de " + row.name + "?", {
                        onOk: async () => {
                            setLoadingReset(true)
                            await dispatch(resetPass(row))
                            setLoadingReset(false)
                        }    
                    })
                }}
                icon="submit"
                title="Reiniciar Senha"
                color="#000"
            >
                <i className="fa fa-refresh" aria-hidden="true" />
            </IconButton>
        </DxTable.Cell>
    )
}

export default ReiniciarSenha