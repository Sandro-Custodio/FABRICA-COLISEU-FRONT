import React from 'react'
import TableDashboard from 'react-bootstrap/lib/Table'


function FinanceiroFy({financeiroFy}) {
    

    const financeiroFyPlanejado = financeiroFy && [financeiroFy[0].janeiro, financeiroFy[0].fevereiro, financeiroFy[0].marco, financeiroFy[0].abril, financeiroFy[0].maio, financeiroFy[0].junho, financeiroFy[0].julho, financeiroFy[0].agosto, financeiroFy[0].setembro, financeiroFy[0].outubro, financeiroFy[0].novembro, financeiroFy[0].dezembro, financeiroFy[0].total]
    const financeiroFyRealizado = financeiroFy && [financeiroFy[1].janeiro, financeiroFy[1].fevereiro, financeiroFy[1].marco, financeiroFy[1].abril, financeiroFy[1].maio, financeiroFy[1].junho, financeiroFy[1].julho, financeiroFy[1].agosto, financeiroFy[1].setembro, financeiroFy[1].outubro, financeiroFy[1].novembro, financeiroFy[1].dezembro, financeiroFy[1].total]
    
    const columns = [" ","JAN","FEV","MAR","ABR","MAI","JUN","JUL","AGO","SET","OUT","NOV","DEZ","Total"];

    return (
        <div>
            <div className="box box-default" style={{ padding: "15px", marginBottom: "40px", marginTop: "40px", fontSize: "medium" }}>
                <h3 className="box-title">Financeiro FY</h3>
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
                                style={{ verticalAlign: "middle", textAlign: "center" }}
                            >
                                Planejado
                                </td>

                            {financeiroFyPlanejado && financeiroFyPlanejado.map(resultLinha => (
                                <td
                                    style={{
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        textAlign: "left"
                                    }}
                                >
                                    {resultLinha}
                                </td>

                            )
                            )}

                        </tr>
                        <tr>
                            <td
                                style={{ verticalAlign: "middle", textAlign: "center" }}
                            >
                                Realizado
                            </td>
                            {financeiroFyRealizado && financeiroFyRealizado.map(resultLinha => (
                                <td
                                    style={{
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        textAlign: "left"
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

export default FinanceiroFy
