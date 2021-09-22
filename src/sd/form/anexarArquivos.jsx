import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { upload_file, remove_file } from "./actions"

const AnexarArquivos = props => {

    const {
        reducer: {
            formData: {
                data,
            },
            sd_files,
            file_overlay,
        },
        upload_file,
        remove_file,
        upload,
    } = props

    const handleSelectFile = () => {
        window.$("#input-upload").click()
    }

    const handleUploadFile = e => {
        const file = e.target.files[0]
        if (file !== undefined)
            upload_file(file, data?.sd?.id)
    }

    const handleDownload = fileName => {
        let win = window.open(process.env.REACT_APP_API_URL + "/template_forms/" + fileName, '_blank');
        win.focus()
    }

    const handleDelete = fileId => {
        remove_file(fileId, data?.sd?.id)
    }

    return (
        <div className="modal-attach">
            {file_overlay && <div className="file-overlay">
                <i className="fa fa-refresh fa-spin" />
            </div>}
            <div className="upload">
                {upload && <a className="btn btn-upload btn-sm btn-primary" onClick={() => handleSelectFile()}>
                    <i className="fa fa-cloud-upload" /> Upload de Arquivo
                </a>}
                <input type="file" id="input-upload" className="input-upload" onChange={e => handleUploadFile(e)} />
            </div>
            <p>Arquivos salvos para esta SD</p>
            <div className="table-responsive">
                <table className="table table-hover table-stripped">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Criado em</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sd_files.map(s => (
                            <tr>
                                <td>{s.file_name}</td>
                                <td>{new Date(s.created_at).toLocaleDateString("pt-BR", { timeZone: 'UTC' })}</td>
                                <td>
                                    <a className="btn btn-link btn-sm" onClick={() => handleDownload(s.file_name_db)}>Download</a>
                                    <a className="btn btn-link btn-sm" onClick={() => handleDelete(s.id)}>Excluir</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
    reducer: state.sdFormReducer,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    upload_file,
    remove_file,
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AnexarArquivos)
