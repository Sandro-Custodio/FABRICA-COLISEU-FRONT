import React from "react"

import Content from "common/adminLTE/content";
import Grid from "common/layout/grid";
import ContentHeader from "common/adminLTE/contentHeader";
import ViewOd from "ods/view/viewOd";

export default props => {

    const [submited, setSubmited] = React.useState(false);
    const [odCode, setOdCode] = React.useState();

    const od = () => {
        const code = document.getElementById("od-code").value
        if (/\S/.test(code)) {
            setOdCode(code);
            setSubmited(true);
        }
    }

    const sdForm = (
        <div className="fade-in fade-out">
            <div className="header">
                <div className="header__left-items">
                    <ContentHeader title="Criar" small="SD" />
                </div>
            </div>
            <Content>
                <Grid cols="12">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="form-group">
                                <label htmlFor="sd">Código da OD</label>
                                <input type="text" id="od-code" className="form-control" />
                            </div>
                            <div className="form-group">
                                <a
                                    className="btn btn-success btn-sm"
                                    style={{ margin: "0px" }}
                                    onClick={() => od()}
                                >
                                    <i className="fa fa-search" /> Buscar OD
                            </a>
                            </div>
                        </div>
                    </div>
                </Grid>
            </Content>
        </div>
    );

    const odForm = (
        <ViewOd odCode={odCode}/>
    );

    return submited ? odForm : sdForm;
}