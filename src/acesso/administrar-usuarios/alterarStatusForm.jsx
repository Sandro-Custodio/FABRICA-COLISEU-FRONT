import React from "react";
import DropdownList from "react-widgets/lib/DropdownList";

const Row = ({ children }) => <div className="row">{children}</div>;

const alterarStatusForm = ({ row, setNewStatus }) => {

    return (
        <form className="form">
            <div className="col-md-12">
            <Row>
                <div className="form-group">
                    <label>Usuário: {row.name}</label>
                </div>
            </Row>
            <Row>
                <div style={{ display: "flex" }} className="form-group">
                    <label>Status:</label>
                    <div className="col-md-10">
                    <DropdownList
                        defaultValue={row.status}
                        data={['Ativo','Inativo']}
                        onChange={value => {
                            setNewStatus(value)
                        }}
                    />
                    </div>
                </div>
            </Row>
            </div>
        </form>
    );
};


export default alterarStatusForm