import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { save_then_send_email, show_overlay, hide_overlay } from "./actions"
import Overlay from "common/msg/overlay/overlay"

const Email = props => {

  const {
    reducer: {
      formData: {
        circ,
        data,
        data: {
          sd,
          vendor,
        }
      },
      sd_user,
      circs_overlay,
      vendor_overlay,
      file_overlay,
      circuitos,
      vendor_contacts,
      sd_files,
    },
    auth,
    save_then_send_email,
    show_overlay,
    hide_overlay,
    initFunction,
  } = props

  const sd_data = new Date(sd.created_at).toLocaleDateString("pt-BR", { timeZone: "UTC" })

  const [selectedContacts, setSelectedContacts] = React.useState([])
  const [selectedFiles, setSelectedFiles] = React.useState([])

  const init = () => {
    document.getElementById("sd_user_email").value = sd_user.email
    document.getElementById("sd_user_contact_number").value = sd_user.contact_number
    document.getElementById("sd_user_fax").value = sd_user.fax_number
    document.getElementById("sd_user_address").value = sd_user.address
    document.getElementById("sd_user_city").value = sd_user.city
  }

  React.useEffect(() => init(), [])

  const selectFile = file => {
    let newFiles = [...selectedFiles]
    if (newFiles.includes(file)) {
      newFiles = newFiles.filter(e => e.id != file.id)
    } else {
      newFiles.push(file)
    }
    setSelectedFiles(newFiles)
  }

  const selectContact = contact => {
    let newContacts = [...selectedContacts]
    if (newContacts.includes(contact)) {
      newContacts = newContacts.filter(e => e.id != contact.id)
    } else {
      newContacts.push(contact)
    }
    setSelectedContacts(newContacts)
  }

  const selectAllContacts = () => {
    if (vendor_contacts.length == selectedContacts.length)
      setSelectedContacts([])
    else
      setSelectedContacts(vendor_contacts)
  }

  const handleSendMail = () => {

    show_overlay()

    const milliSecondsPerDay = 1000 * 60 * 60 * 24

    let contatos_cc = ""
    let contatos_to = ""

    let arrayCircuitos = []
    let arrayAnexos = []

    selectedContacts.map(e => {
      if (e.addressee == "To") {
        if (contatos_to.length != 0)
          contatos_to += ", "
        contatos_to += e.contact_mail
      }
      if (e.addressee == "Cc") {
        if (contatos_cc.length != 0)
          contatos_cc += ", "
        contatos_cc += e.contact_mail
      }
    })

    circuitos.map(c => {
      if (c.vendor != null) {
        if (c.vendor.prazo_desativacao != null) {
          c.previsao_desligamento = new Date(Date.now() + (parseInt(c.vendor.prazo_desativacao) * milliSecondsPerDay)).toLocaleDateString("pt-BR", { timeZone: "UTC" })
        }
      }
      arrayCircuitos.push(c)
    })

    selectedFiles.map(file => {
      arrayAnexos.push(file)
    })

    const object = {
      sd_code: sd.code,
      sd_data,
      header: document.getElementById("header-text").value,
      user_name: sd_user.name,
      user: auth.user,
      user_id: auth.user.id,
      solicitante_email: document.getElementById("sd_user_email").value,
      solicitante_tel: document.getElementById("sd_user_contact_number").value,
      solicitante_fax: document.getElementById("sd_user_fax").value,
      solicitante_endereco: document.getElementById("sd_user_address").value,
      solicitante_cidade: document.getElementById("sd_user_city").value,
    }

    const data = {
      sd: {
        ...sd,
        sd_leasedlines: arrayCircuitos,
       },
      object,
      circuitos: arrayCircuitos,
      anexos: arrayAnexos,
      contatos_to,
      contatos_cc,
    }

    // console.log(data)
    save_then_send_email(data, initFunction)

  }

  return (
    <div className="overlay-wrapper">
      <Overlay/>
      <div className="row">
        <div className="col-md-8 text-center">
          <label>SOLICITAÇÃO DE DESATIVAÇÃO</label>
        </div>
        <div className="col-md-4 text-center">
          <label>{sd_data}</label>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-md-12">
          <label>Ref.: {sd.code}</label>
          <textarea rows="3" className="form-control" id="header-text" disabled value="Prezados(s)&#13;&#10;A seguir relação de circuitos para desativação.&#13;&#10;Favor proseguir conforme previsto em contrato." />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 text-center">
          <label>EMITIDO POR TIM CELULAR S/A</label>
        </div>
        <div className="col-md-12 mt-2"></div>
        <div className="col-md-6">
          <div className="form-group row">
            <div className="col-md-4">
              <label>Nome Representante</label>
            </div>
            <div className="col-md-8">
              <span>{sd_user.name}</span>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-md-4">
              <label>Telefone/Celular</label>
            </div>
            <div className="col-md-8">
              <input type="text" id="sd_user_contact_number" className="form-control" />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-md-4">
              <label>Endereço</label>
            </div>
            <div className="col-md-8">
              <input type="text" id="sd_user_address" className="form-control" />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group row">
            <div className="col-md-4">
              <label>Email</label>
            </div>
            <div className="col-md-8">
              <input type="text" id="sd_user_email" className="form-control" />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-md-4">
              <label>Fax</label>
            </div>
            <div className="col-md-8">
              <input type="text" id="sd_user_fax" className="form-control" />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-md-4">
              <label>Cidade</label>
            </div>
            <div className="col-md-8">
              <input type="text" id="sd_user_city" className="form-control" />
            </div>
          </div>
        </div>
      </div>
      <div className="table-responsive tabela-circuitos">
        {circs_overlay && <div className="circs-overlay">
          <i className="fa fa-refresh fa-spin" />
        </div>}
        <table className="table table-stripped table-hover">
          <thead>
            <tr>
              <th>Circuito</th>
              <th>Elemento A</th>
              <th>Endereço A</th>
              <th>Cidade A</th>
              <th>Estado A</th>
              <th>Elemento B</th>
              <th>Endereço B</th>
              <th>Cidade B</th>
              <th>Estado B</th>
              <th>Velocidade Segmento</th>
            </tr>
          </thead>
          <tbody>
            {circuitos.map(c => (
              <tr>
                <td>{c.circuito_id}</td>
                <td>{c.ot_segmentation.element_a.elemento_id}</td>
                <td>{c.ot_segmentation.element_a.address && c.ot_segmentation.element_a.address.endereco_equipamento}</td>
                <td>{c.ot_segmentation.element_a.city}</td>
                <td>{c.ot_segmentation.element_a.state}</td>
                <td>{c.ot_segmentation.element_b.elemento_id}</td>
                <td>{c.ot_segmentation.element_b.address && c.ot_segmentation.element_b.address.endereco_equipamento}</td>
                <td>{c.ot_segmentation.element_b.city}</td>
                <td>{c.ot_segmentation.element_b.state}</td>
                <td>{c.ot_segmentation.speed_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="row">
        {(vendor_overlay || file_overlay) && <div className="tbl-overlay">
          <i className="fa fa-refresh fa-spin" />
        </div>}
        <div className="col-md-6">
          <div className="table-responsive table-contatos">
            <table className="table table-hover table-stripped">
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      checked={selectedContacts.length == vendor_contacts.length}
                      onClick={() => selectAllContacts()}
                      id="checkAllContacts"
                    />
                  </th>
                  <th>Destinatário</th>
                  <th>Contato</th>
                  <th>E-mail</th>
                </tr>
              </thead>
              <tbody>
                {vendor_contacts.map(c => (
                  <tr key={c.id}>
                    <td>
                      <input
                        type="checkbox"
                        id={`m-contact-${c.id}`}
                        checked={selectedContacts.includes(c)}
                        onClick={() => selectContact(c)}
                      />
                    </td>
                    <td>{c.addressee}</td>
                    <td>{c.contact_name}</td>
                    <td>{c.contact_mail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-md-6">
          <div className="anexos">
            {sd_files.map(f => <div className="item">
              <i className="fa fa-file" />
              <input
                type="checkbox"
                id={`anexo-${f.id}`}
                checked={selectedFiles.includes(f)}
                onClick={() => selectFile(f)}
              />
              &nbsp;<label>{f.file_name}</label>
            </div>)}
          </div>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-md-12">
          <label>Observação da SD</label>
          <textarea rows="3" className="form-control" disabled value={sd.remarks} />
        </div>
      </div>
      <div className="col-md-12 text-right mail-actions">
        {(!file_overlay && !vendor_overlay && !circs_overlay) && <a className="btn btn-success btn-sm" onClick={() => handleSendMail()}>Enviar Email</a>}
        <a className="btn btn-warning btn-sm" onClick={() => window.$("#sd-mail").modal("hide")}>Cancelar</a>
      </div>
    </div>
  )

}

const mapStateToProps = state => ({
  auth: state.auth,
  reducer: state.sdFormReducer,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  save_then_send_email,
  show_overlay,
  hide_overlay,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Email)
