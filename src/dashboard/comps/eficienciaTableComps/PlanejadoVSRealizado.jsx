import React from 'react'
import TableDashboard from 'react-bootstrap/lib/Table'


function PlanejadoVSRealizado({ planXReal }) {

    return (
        <div>
            <div className="box box-default" style={{ marginRight: "20px", padding: "15px", fontSize: "medium"  }}>
                <h3 className="box-title">Plan X Realizado</h3>
                <TableDashboard className="table">

                    <thead>
                        <tr>
                            <th colSpan="1"
                                style={{
                                    position: "relative",
                                    userSelect: "none",
                                    whiteSpace: "nowrap",
                                    cursor: "pointer"
                                }}> <span class="label label-primary">Plan Mês</span></th>
                            <th colSpan="1"
                                style={{
                                    position: "relative",
                                    userSelect: "none",
                                    whiteSpace: "nowrap",
                                    cursor: "pointer"
                                }}><span class="label label-warning">Inic Map Mês</span></th>
                            <th colSpan="1"
                                style={{
                                    position: "relative",
                                    userSelect: "none",
                                    whiteSpace: "nowrap",
                                    cursor: "pointer"
                                }}><span class="label label-success">Realizado Mês</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{planXReal && planXReal.plan_mes || "-"}</td>
                            <td>{planXReal && planXReal.inic_map_mes || "-"}</td>
                            <td>{planXReal && planXReal.realizado_mes || "-"}</td>
                        </tr>
                    </tbody>
                    <thead>
                        <tr>
                            <th colSpan="1"
                                style={{
                                    position: "relative",
                                    userSelect: "none",
                                    whiteSpace: "nowrap",
                                    cursor: "pointer"
                                }}><span class="label label-primary">Plan YTD</span></th>
                            <th colSpan="1"
                                style={{
                                    position: "relative",
                                    userSelect: "none",
                                    whiteSpace: "nowrap",
                                    cursor: "pointer"
                                }}><span class="label label-warning">Inic Map YTD</span></th>
                            <th colSpan="1"
                                style={{
                                    position: "relative",
                                    userSelect: "none",
                                    whiteSpace: "nowrap",
                                    cursor: "pointer"
                                }}><span class="label label-success">Realizado YTD</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{planXReal && planXReal.plan_ytd || "-"}</td>
                            <td>{planXReal && planXReal.inic_map_ytd || "-"}</td>
                            <td>{planXReal && planXReal.realizado_ytd || "-"}</td>
                        </tr>
                    </tbody>
                    <thead>
                        <tr>
                            <th colSpan="1"
                                style={{
                                    position: "relative",
                                    userSelect: "none",
                                    whiteSpace: "nowrap",
                                    cursor: "pointer"
                                }}><span class="label label-primary">Plan FY</span></th>
                            <th colSpan="1"
                                style={{
                                    position: "relative",
                                    userSelect: "none",
                                    whiteSpace: "nowrap",
                                    cursor: "pointer"
                                }}><span class="label label-warning">Inic Map FY</span></th>
                            <th colSpan="1"
                                style={{
                                    position: "relative",
                                    userSelect: "none",
                                    whiteSpace: "nowrap",
                                    cursor: "pointer"
                                }}><span class="label label-success">Efeito FY Saving</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{planXReal && planXReal.plan_fy || "-"}</td>
                            <td>{planXReal && planXReal.inic_map_fy || "-"}</td>
                            <td>{planXReal && planXReal.efeito_fy_saving || "-"}</td>
                        </tr>
                    </tbody>

                </TableDashboard>
            </div>
        </div>
    )
}

export default PlanejadoVSRealizado
