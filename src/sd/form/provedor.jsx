import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { toastr } from "react-redux-toastr"
import { addNewContact, updateLocalContacts, saveData, remove_contact, } from "./actions"

const Provedor = props => {

    const {
        reducer: {
            vendor_overlay,
            contracts,
            vendor_contacts,
            updated_vendor,
            formData: {
                data: {
                    vendor: {
                        id
                    }
                }
            }
        },
        hideContractSection,
        hidePrintAttachSection,
        nomeProvedor,
        siglaProvedor,
        addNewContact,
        updateLocalContacts,
        saveData,
        remove_contact,
    } = props


    const handleAddContact = () => {
        window.$(".change-addressee").css("display", "none");
        addNewContact(id);
    };

    const editContactAddressee = id => {

        window.$(".input-contact-name").css("display", "none")
        window.$(".contact-name").css("display", "block")
        window.$(".btn-save-contact-name").css("display", "none")

        window.$(".change-addressee").css("display", "none")
        window.$(".addressee").css("display", "block")

        window.$(".input-contact-number").css("display", "none")
        window.$(".btn-save-contact-number").css("display", "none")
        window.$(".contact-number").css("display", "block")

        window.$(".input-contact-mail").css("display", "none")
        window.$(".btn-save-contact-mail").css("display", "none")
        window.$(".contact-mail").css("display", "block")

        window.$(`#addressee-${id}`).css("display", "none")
        window.$(`#input-addressee-${id}`).css("display", "block")

    }

    const changeAddressee = (e) => {
        const newValue = e.target.value
        const idContact = e.target.getAttribute("idContact")
        vendor_contacts.forEach((element, index) => {
            if (element.id == idContact) {
                let newContacts = [...vendor_contacts]
                newContacts[index].addressee = newValue
                updateLocalContacts(newContacts)
                window.$(".change-addressee").css("display", "none")
                window.$(".addressee").css("display", "block")
            }
        })
    }

    const setEditContactName = id => {

        window.$(".change-addressee").css("display", "none")
        window.$(".addressee").css("display", "block")

        window.$(".input-contact-name").css("display", "none")
        window.$(".btn-save-contact-name").css("display", "none")
        window.$(".contact-name").css("display", "block")

        window.$(".input-contact-number").css("display", "none")
        window.$(".btn-save-contact-number").css("display", "none")
        window.$(".contact-number").css("display", "block")

        window.$(".input-contact-mail").css("display", "none")
        window.$(".btn-save-contact-mail").css("display", "none")
        window.$(".contact-mail").css("display", "block")

        window.$(`#contact-name-${id}`).css("display", "none")
        window.$(`#input-contact-name-${id}`).css("display", "block")
        window.$(`#btn-save-contact-name-${id}`).css("display", "block")

        window.$(`#input-contact-name-${id}`).val(vendor_contacts.filter(e => e.id == id)[0].contact_name)

        window.$(`#input-contact-name-${id}`).focus()

    }

    const setEditContactNumber = id => {

        window.$(".change-addressee").css("display", "none")
        window.$(".addressee").css("display", "block")

        window.$(".input-contact-name").css("display", "none")
        window.$(".btn-save-contact-name").css("display", "none")
        window.$(".contact-name").css("display", "block")

        window.$(".input-contact-number").css("display", "none")
        window.$(".btn-save-contact-number").css("display", "none")
        window.$(".contact-number").css("display", "block")

        window.$(".input-contact-mail").css("display", "none")
        window.$(".btn-save-contact-mail").css("display", "none")
        window.$(".contact-mail").css("display", "block")

        window.$(`#contact-number-${id}`).css("display", "none")
        window.$(`#input-contact-number-${id}`).css("display", "block")
        window.$(`#btn-save-contact-number-${id}`).css("display", "block")


        window.$(`#input-contact-number-${id}`).val(vendor_contacts.filter(e => e.id == id)[0].contact_number)

        window.$(`#input-contact-number-${id}`).focus()

    }

    const setEditContactMail = id => {

        window.$(".change-addressee").css("display", "none")
        window.$(".addressee").css("display", "block")

        window.$(".input-contact-name").css("display", "none")
        window.$(".btn-save-contact-name").css("display", "none")
        window.$(".contact-name").css("display", "block")

        window.$(".input-contact-number").css("display", "none")
        window.$(".btn-save-contact-number").css("display", "none")
        window.$(".contact-number").css("display", "block")

        window.$(".input-contact-mail").css("display", "none")
        window.$(".btn-save-contact-mail").css("display", "none")
        window.$(".contact-mail").css("display", "block")

        window.$(`#contact-mail-${id}`).css("display", "none")
        window.$(`#input-contact-mail-${id}`).css("display", "block")
        window.$(`#btn-save-contact-mail-${id}`).css("display", "block")

        window.$(`#input-contact-mail-${id}`).val(vendor_contacts.filter(e => e.id == id)[0].contact_mail)

        window.$(`#input-contact-mail-${id}`).focus()

    }

    const changeContactName = id => {
        const newValue = window.$(`#input-contact-name-${id}`).val()
        const idContact = id
        vendor_contacts.forEach((element, index) => {
            if (element.id == idContact) {
                let newContacts = [...vendor_contacts]
                newContacts[index].contact_name = newValue
                updateLocalContacts(newContacts)
                window.$(".input-contact-name").css("display", "none")
                window.$(".btn-save-contact-name").css("display", "none")
                window.$(".contact-name").css("display", "block")
            }
        })
    }

    const changeContactNumber = id => {
        const newValue = window.$(`#input-contact-number-${id}`).val()
        const idContact = id
        vendor_contacts.forEach((element, index) => {
            if (element.id == idContact) {
                let newContacts = [...vendor_contacts]
                newContacts[index].contact_number = newValue
                updateLocalContacts(newContacts)
                window.$(".input-contact-number").css("display", "none")
                window.$(".btn-save-contact-number").css("display", "none")
                window.$(".contact-number").css("display", "block")
            }
        })
    }

    const changeContactMail = id => {
        const newValue = window.$(`#input-contact-mail-${id}`).val()
        const idContact = id
        vendor_contacts.forEach((element, index) => {
            if (element.id == idContact) {
                let newContacts = [...vendor_contacts]
                newContacts[index].contact_mail = newValue
                updateLocalContacts(newContacts)
                window.$(".input-contact-mail").css("display", "none")
                window.$(".btn-save-contact-mail").css("display", "none")
                window.$(".contact-mail").css("display", "block")
            }
        })
    }

    const removeContact = id => {
        vendor_contacts.forEach((element, index) => {
            if (element.id == id) {
                let newContacts = [...vendor_contacts]
                const contactForDelete = newContacts[index]
                delete newContacts[index]
                updateLocalContacts(newContacts.filter(e => (e !== undefined || e !== null)))
                if (contactForDelete.is_new != 1) {
                    remove_contact(contactForDelete)
                }
            }
        })
    }

    const handleExit = () => {

        window.$("#sd-vendor").modal("hide")

        window.$(".change-addressee").css("display", "none")
        window.$(".addressee").css("display", "block")

        window.$(".input-contact-name").css("display", "none")
        window.$(".contact-name").css("display", "block")

    }

    const handleSave = () => {

        if (vendor_contacts.filter(e => (e.contact_mail == "" || e.contact_mail == null)).length > 0) {
            toastr.warning("Favor preencher o(s) campos de e-mail dos contatos adicionados.")
        } else {
            const print_attach = document.getElementById("imprimir-assinar-provedor").checked
            const provider = { ...updated_vendor, print_attach }
            const contacts = [...vendor_contacts]
            saveData(contacts, provider)
        }

    }

    return (
        <div>
            {vendor_overlay && <div className="vendor-overlay">
                <i className="fa fa-refresh fa-spin" />
            </div>}
            <div className="row">
                <div className="col-md-3">
                    <label>Nome</label>
                    <input
                        type="text"
                        id="nome-provedor"
                        className="form-control"
                        value={nomeProvedor}
                        disabled
                    />
                </div>
                <div className="col-md-3">
                    <label>Sigla</label>
                    <input
                        type="text"
                        id="sigla-provedor"
                        className="form-control"
                        value={siglaProvedor}
                        disabled
                    />
                </div>
                {typeof hidePrintAttachSection === "undefined" && <div className="col-md-6">
                    <br />
                    <label htmlFor="imprimir-assinar-provedor" className="print_attach">
                        <input
                            type="checkbox"
                            id="imprimir-assinar-provedor"
                            className="check"
                        />
                        <span>&nbsp;&nbsp;Imprimir e Assinar Formulário</span>
                    </label>
                </div>}
            </div>
            <div className="vendor-divider"></div>
            <div className="tables-description">
                <div className="desc">
                    <label>Contatos</label>
                    <a
                        className="btn btn-success btn-sm btn-add-contact"
                        onClick={() => handleAddContact()}
                    >
                        <i className="fa fa-plus" />
                    </a>
                </div>
                {typeof hideContractSection === "undefined" && <div className="desc">
                    <label>Contratos</label>
                </div>}
            </div>
            <div className="vendor-divider"></div>
            <div className="row vendor-tables">
                <div className="col-md-6">
                    <div className="table-responsive">
                        <table className="table table-hover table-stripped">
                            <thead>
                                <tr>
                                    <th>Destinatário</th>
                                    <th>Contato</th>
                                    <th>Telefone</th>
                                    <th>Email</th>
                                    <th>&nbsp;</th>
                                </tr>
                                {vendor_contacts.filter(e => (e !== undefined || e !== null)).map(c => (
                                    <tr key={`contact-${c.id}`}>
                                        <td>
                                            <div>
                                                <span
                                                    id={`addressee-${c.id}`}
                                                    className="addressee"
                                                    onClick={() => editContactAddressee(c.id)}
                                                    style={{ cursor: "pointer" }}
                                                >
                                                    {c.addressee}
                                                </span>
                                                <select
                                                    id={`input-addressee-${c.id}`}
                                                    idContact={c.id}
                                                    style={{ display: "none", fontSize: "13px" }}
                                                    className="change-addressee"
                                                    onChange={e => changeAddressee(e)}
                                                >
                                                    <option key="To" value="To">To</option>
                                                    <option key="Cc" value="Cc">Cc</option>
                                                </select>
                                            </div>
                                        </td>
                                        <td>
                                            <div style={{ display: "flex" }}>
                                                <span
                                                    id={`contact-name-${c.id}`}
                                                    className="contact-name"
                                                    onClick={() => setEditContactName(c.id)}
                                                >
                                                    {c.contact_name}
                                                </span>
                                                <input
                                                    type="text"
                                                    id={`input-contact-name-${c.id}`}
                                                    className="input-contact-name"
                                                    style={{ fontSize: "13px", display: "none" }}
                                                />
                                                <a
                                                    className="btn btn-success btn-sm btn-add-contact btn-save-contact-name"
                                                    id={`btn-save-contact-name-${c.id}`}
                                                    onClick={() => changeContactName(c.id)}
                                                    style={{ display: "none" }}
                                                >
                                                    <i className="fa fa-check" />
                                                </a>
                                            </div>
                                        </td>
                                        <td>
                                            <div style={{ display: "flex" }}>
                                                <span
                                                    id={`contact-number-${c.id}`}
                                                    className="contact-number"
                                                    onClick={() => setEditContactNumber(c.id)}
                                                >
                                                    {(c.contact_number == "" || c.contact_number == null) ? "--" : c.contact_number}
                                                </span>
                                                <input
                                                    type="text"
                                                    id={`input-contact-number-${c.id}`}
                                                    className="input-contact-number"
                                                    style={{ fontSize: "13px", display: "none" }}
                                                />
                                                <a
                                                    className="btn btn-success btn-sm btn-add-contact btn-save-contact-number"
                                                    id={`btn-save-contact-number-${c.id}`}
                                                    onClick={() => changeContactNumber(c.id)}
                                                    style={{ display: "none" }}
                                                >
                                                    <i className="fa fa-check" />
                                                </a>
                                            </div>
                                        </td>
                                        <td>
                                            <div style={{ display: "flex" }}>
                                                <span
                                                    id={`contact-mail-${c.id}`}
                                                    className="contact-mail"
                                                    onClick={() => setEditContactMail(c.id)}
                                                >
                                                    {(c.contact_mail == "" || c.contact_mail == null) ? "--" : c.contact_mail}
                                                </span>
                                                <input
                                                    type="text"
                                                    id={`input-contact-mail-${c.id}`}
                                                    className="input-contact-mail"
                                                    style={{ fontSize: "13px", display: "none" }}
                                                />
                                                <a
                                                    className="btn btn-success btn-sm btn-add-contact btn-save-contact-mail"
                                                    id={`btn-save-contact-mail-${c.id}`}
                                                    onClick={() => changeContactMail(c.id)}
                                                    style={{ display: "none" }}
                                                >
                                                    <i className="fa fa-check" />
                                                </a>
                                            </div>
                                        </td>
                                        <td><a className="btn btn-danger btn-sm" onClick={() => removeContact(c.id)}><i className="fa fa-times" /></a></td>
                                    </tr>
                                ))}
                            </thead>
                        </table>
                    </div>
                </div>
                {typeof hideContractSection === "undefined" && <div className="col-md-6">
                    <div className="table-responsive">
                        <div className="table-responsive">
                            <table className="table table-hover table-stripped">
                                <thead>
                                    <tr>
                                        <th>Contrato</th>
                                        <th>Início</th>
                                        <th>Término</th>
                                        <th>#Circuitos</th>
                                    </tr>
                                    {contracts.map(c => (
                                        <tr>
                                            <td>{c.contrato}</td>
                                            <td>{new Date(c.contract_start_at).toLocaleDateString("pt-BR", { timeZone: "UTC" })}</td>
                                            <td>{new Date(c.contract_end_at).toLocaleDateString("pt-BR", { timeZone: "UTC" })}</td>
                                            <td>{c.total_circuitos}</td>
                                        </tr>
                                    ))}
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>}
            </div>
            <div className="vendor-divider"></div>
            <div className="row vendor-actions">
                <div className="col-md-12 text-right">
                    <a className="btn btn-success btn-sm" onClick={() => handleSave()}><i className="fa fa-save" /> Salvar</a>
                    <a className="btn btn-warning btn-sm" onClick={() => handleExit()}><i className="fa fa-times" /> Cancelar</a>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
    reducer: state.sdFormReducer,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    addNewContact,
    updateLocalContacts,
    saveData,
    remove_contact,
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Provedor)