import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { update_vendor_form, save_form_data, } from "./actions";

const actions = {
    update_vendor_form,
    save_form_data,
};

const VendorForm = props => {

    const {
        reducer: {
            formData: {
                data,
                data: {
                    sd,
                }
            },
            vendor_form: {
                forms,
                operator,
                vendor,
            },
            vendor_overlay,
        },
        update_vendor_form,
        save_form_data,
    } = props;

    const [values, setValues] = React.useState([]);
    const [editing, setEditing] = React.useState();

    React.useEffect(() => {
        setValues(forms);
    }, [forms]);

    const get = (firstId, secondId) => document.getElementById(`${firstId}-${secondId}`);
    const jq = dom => window.$(dom);

    const toggleEditor = id => {

        jq(".input-form")
            .css("display", "none");
            
        jq(get("input-form", id))
            .css("display", "block")
            .focus();

        setEditing(id);

    };

    const handleCloseEditor = e => {
        if (e.key === "Enter") {
            jq(".input-form").css("display", "none");
            setEditing(0);            
        }
    };

    const updateFormValue = formId => {
        const newValue = get("input-form", formId).value
        forms.forEach((value, index) => {
            if (value.id == formId) {
                let newValues = [...forms];
                newValues[index].column_text = newValue;
                update_vendor_form(newValues);
            }
        });
    };

    const save = (format, download = true) => {
        save_form_data(forms, format, download, sd.id, "SdVendorValuesForm5137", operator);
    };    

    return (
        <div className="vendor-form">
            {vendor_overlay && <div className="generic-overlay">
                <i className="fa fa-refresh fa-spin" />
            </div>}
            <div className="row">
                <div className="col-md-6">
                    <label htmlFor="vendor-form-name">Nome</label>
                    <input type="text" id="vendor-form-name" className="form-control" disabled value={vendor.name} />
                </div>
                <div className="col-md-6">
                    <label htmlFor="vendor-form-name">Regional</label>
                    <input type="text" id="vendor-form-regional" className="form-control" disabled value={operator.name} />
                </div>
            </div>
            <hr />
            <div className="table-responsive table-form-vendor">
                <table className="table tabke-hover table-stripped">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {values.map(f => (
                            <tr id={`form-${f.id}`} key={`form-${f.id}`} className="form-item">
                                <td>{f.column_name}</td>
                                <td onClick={() => toggleEditor(f.id)} id={`td-value-${f.id}`} >
                                    {editing != f.id && <span className="text" id={`text-${f.id}`}>{f.column_text}</span>}
                                    <input
                                        type="text"
                                        className="input-form"
                                        style={{ display: "none" }}
                                        id={`input-form-${f.id}`}
                                        value={forms.filter(e => e.id == f.id)[0].column_text}
                                        onChange={e => updateFormValue(f.id, e.target.value)}
                                        onKeyPress={e => handleCloseEditor(e)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="vendor-form-actions">
                <a className="btn btn-success" onClick={() => save("pdf")}>
                    Gerar Formulário PDF
                </a>
                <a className="btn btn-success" onClick={() => save("csv")}>
                    Gerar Formulário CSV
                </a>
                <a className="btn btn-success" onClick={() => save(null, false)}>
                    Gerar Form. Muitos Circuitos CSV (Telemar)
                </a>
                <a className="btn btn-warning" onClick={() => jq("#sd-vendor-form").modal("hide")}>
                    Cancelar
                </a>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    auth: state.auth,
    reducer: state.sdFormReducer,
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VendorForm);