import React from 'react'
import TableDashboard from 'react-bootstrap/lib/Table'

function StatusProjeto({físicoProjeto}) {

    const statusProjetoRealizado = físicoProjeto && [físicoProjeto[0].janeiro, físicoProjeto[0].fevereiro, físicoProjeto[0].marco, físicoProjeto[0].abril, físicoProjeto[0].maio, físicoProjeto[0].junho, físicoProjeto[0].julho, físicoProjeto[0].agosto, físicoProjeto[0].setembro, físicoProjeto[0].outubro, físicoProjeto[0].novembro, físicoProjeto[0].dezembro, físicoProjeto[0].total]
    const statusProjetoReplanejado = físicoProjeto && [físicoProjeto[1].janeiro, físicoProjeto[1].fevereiro, físicoProjeto[1].marco, físicoProjeto[1].abril, físicoProjeto[1].maio, físicoProjeto[1].junho, físicoProjeto[1].julho, físicoProjeto[1].agosto, físicoProjeto[1].setembro, físicoProjeto[1].outubro, físicoProjeto[1].novembro, físicoProjeto[1].dezembro, físicoProjeto[1].total]

    const columns = [" ","JAN","FEV","MAR","ABR","MAI","JUN","JUL","AGO","SET","OUT","NOV","DEZ","Total"];


    return (
        <div>
            <div className="box box-default" style={{ padding: "5px", marginLeft:"20px", fontSize: "medium"  }}>
                <h3 className="box-title">Visão Planejado Físico</h3>
                <TableDashboard className="table">
                    <thead>
                        <tr>
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
                                style={{ verticalAlign: "middle", textAlign: "center", color: 'white', backgroundColor: "#3c8dbc" }}
                            >
                                Planejado
                            </td>

                            {statusProjetoReplanejado && statusProjetoReplanejado.map(resultLinha => (
                                <td
                                    style={{
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        textAlign: "left",
                                        color: "white",
                                        backgroundColor: "#3c8dbc"
                                    }}
                                >
                                    {resultLinha}
                                </td>

                            )
                            )}

                        </tr>
                        <tr>
                            <td
                                style={{ verticalAlign: "middle", textAlign: "center", color: 'white', backgroundColor: "#00a65a" }} 
                            >
                                Realizado
                            </td>
                            {statusProjetoRealizado && statusProjetoRealizado.map(resultLinha => (
                                <td
                                    style={{
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        color: 'white',
                                        textAlign: "left",
                                        backgroundColor: "#00a65a"
                                    }}
                                >
                                    {resultLinha}
                                </td>

                            )
                            )}
                        </tr>
                    </tbody>
                </TableDashboard>
            </div>
        </div>
    )
}

export default StatusProjeto
