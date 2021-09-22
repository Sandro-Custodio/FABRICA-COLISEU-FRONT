import React from "react";

import { IconButton, Dropzone, ExportExcel } from "common";
import { downloadModeloBdConfig, uploadFileBdConfig, downloadCriticas } from "../actions";
import { useSelector } from "react-redux"
import columns from "./columns"
import ReactTooltip from "react-tooltip";

const Header = () => {
    const handleDrop = file => {
        uploadFileBdConfig(file[0]);
    };
    const { rows } = useSelector(state => ({
        rows: state.sincronizarBdConfigReducer.bdconfig_critics_list
    }))
    return (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ display: "flex" }}>
                <IconButton
                    icon="download"
                    className="btn btn-success"
                    onClick={() => downloadModeloBdConfig()}
                >
                    Download Modelo
  </IconButton>
                <Dropzone
                    onDrop={handleDrop}
                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                />
                <IconButton
                    icon="download"
                    className="btn btn-danger"
                    disabled={rows.length ? false : true}
                    onClick={() => downloadCriticas()}
                >
                    Download de Críticas
  </IconButton>
            </div>
            <div style={{ display: "flex", justifyContent: "right", marginTop: "15px" }}>
                <ExportExcel
                    rows={rows}
                    columns={columns}
                    name="Usuários"
                >
                    <button
                        className="btn btn-link"
                        data-for="top_success_float"
                        data-tip="Exportar página para CSV"
                    >
                        <i className="fa fa-file-o text-success" />
                        <ReactTooltip
                            id="top_success_float"
                            place="left"
                            type="dark"
                            effect="float"
                        />
                    </button>
                </ExportExcel>
            </div>
        </div>
    )
}

export default Header