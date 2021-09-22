import React from 'react'
import TableDashboard from 'react-bootstrap/lib/Table'
import Row from "common/layout/row";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";



function Table({ showTable, dataTable, dataAuxTable, title }) {


    const dispatch = useDispatch()

    const projects = useSelector(state => state.dashboard.projects);
    const planejadoOciosidade = dataAuxTable.filter(res => res.projeto === "FY Planejado Ociosidade");
    const realizadoLm = dataAuxTable.filter(res => res.projeto === "FY Realizado LM");
    const realizadoLl = dataAuxTable.filter(res => res.projeto === "FY Realizado LL");
    const planejadoOutros = dataAuxTable.filter(res => res.projeto === "FY Planejado Outros");

    const columns = [" ", "JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ", "Total"];

    // const projects = [
    //      { id: "planoIndustrial", name: "Plano Industrial" }, { id: "planoIndustrialITX", name: "Plano Industrial - ITX" }, { id: "migracaoProvedor", name: "Migração de Provedor" }, { id: "renegociacoValores", name: "Renegociação de Valores" }, { id: "otimizacaoHierarquiaOciosidade", name: "Otimização de hierarquia/topologia e ociosidade" }, { id: "desligando2G", name: "Desligando no Apagado 2G" }, { id: "ociosidadeB2B", name: "Ociosidade B2B & LS" }, { id: "renegValLM", name: "Renegociação de Valores LM" }
    // ]

    return (
        <div>
            {showTable && (
                <div>
                    <div style={{ display: "flex", justifyContent: "center", marginTop: "90px" }}>
                            <div>
                                {dataAuxTable.length !== 0 && (
                                    <div className="box box-default" style={{ backgroundColor: "#8080ff", position: "relative", borderTop: 0, borderRadius: "10px 30px", width: "90%" }}>
                                        <TableDashboard className="table">
                                            <tbody>
                                                <tr>
                                                    <td
                                                        style={{ verticalAlign: "middle", textAlign: "center", fontSize: "15px", color: "white" }}
                                                    >
                                                        FY Planejado LL
                                                    </td>

                                                    <td
                                                        style={{
                                                            whiteSpace: "nowrap",
                                                            overflow: "hidden",
                                                            textOverflow: "ellipsis",
                                                            color: "white",
                                                            textAlign: "left"
                                                        }}
                                                    >
                                                        {planejadoOciosidade[0]?.total !== null ? Math.round(planejadoOciosidade[0]?.total * 100) / 100 : "N/A"}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td
                                                        style={{ verticalAlign: "middle", textAlign: "center", fontSize: "15px", color: "white" }}
                                                    >
                                                        FY Planejado LM
                                                    </td>
                                                    <td
                                                        style={{
                                                            whiteSpace: "nowrap",
                                                            overflow: "hidden",
                                                            textOverflow: "ellipsis",
                                                            color: "white",
                                                            textAlign: "left"
                                                        }}
                                                    >
                                                        {planejadoOutros[0]?.total !== null ? Math.round(planejadoOutros[0]?.total * 100) / 100 : "N/A"}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </TableDashboard>
                                    </div>
                                )}
                            </div>
                            <div>
                                {dataAuxTable.length !== 0 && (
                                    <div className="box box-default" style={{ backgroundColor: "#8080ff", position: "relative", borderTop: 0, borderRadius: "10px 30px", width: "90%" }}>
                                        <TableDashboard className="table">
                                            <tbody>
                                                <tr>
                                                    <td
                                                        style={{ verticalAlign: "middle", textAlign: "center", fontSize: "15px", color: "white" }}
                                                    >
                                                        FY Realizado LL
                                                    </td>

                                                    <td
                                                        style={{
                                                            whiteSpace: "nowrap",
                                                            overflow: "hidden",
                                                            textOverflow: "ellipsis",
                                                            color: "white",
                                                            textAlign: "left"
                                                        }}
                                                    >
                                                        {realizadoLl[0]?.total !== null ? Math.round(realizadoLl[0]?.total * 100) / 100 : "N/A"}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td
                                                        style={{ verticalAlign: "middle", textAlign: "center", fontSize: "15px", color: "white" }}
                                                    >
                                                        FY Realizado LM
                                                    </td>
                                                    <td
                                                        style={{
                                                            whiteSpace: "nowrap",
                                                            overflow: "hidden",
                                                            textOverflow: "ellipsis",
                                                            color: "white",
                                                            textAlign: "left"
                                                        }}
                                                    >
                                                        {realizadoLm[0]?.total !== null ? Math.round(realizadoLm[0]?.total * 100) / 100 : "N/A"}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </TableDashboard>
                                    </div>
                                )}
                            </div>
                    </div>
                    <div style={{ padding: '20px' }}>
                        <div className="box box-default" style={{ backgroundColor: "white", position: "relative", borderTop: 0, borderRadius: "20px" }}>
                            {
                                projects.map(project => (
                                    <Row >
                                        <div style={{ display: "flex", marginLeft: "20px", marginRight: "20px", alignItems: "center" }}>
                                            <div style={{ marginRight: "10px", flex: "0.15" }}>
                                                {title == "Eficiência" ? <Link to="/dashboard/projectEfic"  >
                                                    <button
                                                        type="button"
                                                        className="btn-lg btn-awesome fade-in filtro-btn pull-left"
                                                        style={{ backgroundColor: "#8080ff", border: "none", color: "white", height: "50px", marginRight: "10px", width: "100%" }}
                                                        onClick={() => {
                                                            dispatch({ type: "PROJECT_CHOOSED", payload: project });
                                                        }}
                                                    >
                                                        {project.name}
                                                    </button>
                                                </Link> : <Link to="/dashboard/projectRollout"  >
                                                    <button
                                                        type="button"
                                                        className="btn-lg btn-awesome fade-in filtro-btn pull-left"
                                                        style={{ backgroundColor: "#8080ff", border: "none", color: "white", height: "50px", marginRight: "10px", width: "100%" }}
                                                        onClick={() => {
                                                            dispatch({ type: "PROJECT_CHOOSED", payload: project });
                                                        }}
                                                    >
                                                        {project.name}
                                                    </button>
                                                </Link>}
                                            </div>

                                            <div style={{ flex: "0.85" }}>
                                                <TableDashboard className="table">
                                                    <thead>
                                                        <tr>
                                                            <th style={{ padding: "0px" }}></th>
                                                            {columns.map(colum => (
                                                                <th
                                                                    colSpan="1"
                                                                    style={{
                                                                        position: "relative",
                                                                        userSelect: "none",
                                                                        whiteSpace: "nowrap",
                                                                        cursor: "pointer"
                                                                    }}
                                                                >
                                                                    <div
                                                                        style={{
                                                                            display: "flex",
                                                                            flexDirection: "row",
                                                                            alignItems: "center"
                                                                        }}
                                                                    >
                                                                        <div
                                                                            style={{
                                                                                width: "100%",
                                                                                minWidth: "0px",
                                                                                display: "flex",
                                                                                flexDirection: "row",
                                                                                alignItems: "flex-end",
                                                                                justifyContent: "flex-start"
                                                                            }}
                                                                        >
                                                                            <span
                                                                                style={{
                                                                                    display: "inline-flex",
                                                                                    flexDirection: "row",
                                                                                    alignItems: "center",
                                                                                    maxWidth: "100%",
                                                                                    userSelect: "none",
                                                                                    cursor: "pointer"
                                                                                }}
                                                                            >
                                                                                <span
                                                                                    style={{
                                                                                        overflow: "hidden",
                                                                                        textOverflow: "ellipsis"
                                                                                    }}
                                                                                >
                                                                                    {colum}
                                                                                </span>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </th>
                                                            ))}
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        <tr>
                                                            <td
                                                                style={{ verticalAlign: "middle", textAlign: "center" }}
                                                            >
                                                                Planejado
                                                            </td>

                                                            {dataTable.map(resultLinha => {
                                                                if ((project.name === resultLinha.projeto) && (resultLinha.tipo == "planejado")) {
                                                                    return resultLinha.val.map(result => (
                                                                        <td
                                                                            style={{
                                                                                whiteSpace: "nowrap",
                                                                                overflow: "hidden",
                                                                                textOverflow: "ellipsis",
                                                                                textAlign: "left"
                                                                            }}
                                                                        >
                                                                            {result !== null ? result : "N/A"}
                                                                        </td>
                                                                    ))
                                                                }
                                                            }
                                                            )}

                                                        </tr>
                                                        <tr>
                                                            <td
                                                                style={{ verticalAlign: "middle", textAlign: "center" }}
                                                            >
                                                                Realizado
                                                            </td>
                                                            {dataTable.map(resultLinha => {
                                                                if ((project.name === resultLinha.projeto) && (resultLinha.tipo == "realizado")) {
                                                                    return resultLinha.val.map(result => (
                                                                        <td
                                                                            style={{
                                                                                whiteSpace: "nowrap",
                                                                                overflow: "hidden",
                                                                                textOverflow: "ellipsis",
                                                                                textAlign: "left"
                                                                            }}
                                                                        >
                                                                            {result !== null ? result : "N/A"}
                                                                        </td>
                                                                    ))
                                                                }
                                                            }
                                                            )}
                                                        </tr>
                                                    </tbody>
                                                </TableDashboard>
                                            </div>
                                        </div>
                                    </Row>
                                ))
                            }
                        </div>
                    </div>

                </div>




            )}
        </div>
    )
}

export default Table
