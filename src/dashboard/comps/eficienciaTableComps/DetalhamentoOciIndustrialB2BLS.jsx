import React from 'react'
import TableDashboard from 'react-bootstrap/lib/Table'
import { useSelector } from "react-redux";

function DetalhamentoOciIndustrialB2BLS({ detalhamento }) {

    const tiposLinha = ["AB - Analise Eng/Negocio", "AC - Analise Eng/Negocio", "SB - BTO", "LL desativada", "Não Localizado Fatu. do TRAIL", "LL otimizado Opex"]
    const tiposLinha2 = ["Manter", "LL desativada 2020"]
    const project = useSelector(state => state.dashboard.project);

    const [ociosidadeB2BLSFirstPart, setOciosidadeB2BLSFirstPart] = React.useState([{ week: 0, last_week: 0, total: 0 }]);
    const [ociosidadeB2BLSSecondPart, setOciosidadeB2BLSSecondPart] = React.useState([{ week: 0, last_week: 0, total: 0 }]);

    React.useEffect(() => {
        if (detalhamento && project.name == "Ociosidade B2B & LS") {
            setOciosidadeB2BLSFirstPart(detalhamento.filter(
                dt => tiposLinha.includes(dt.status_normalizado_pmo)));
            setOciosidadeB2BLSSecondPart(detalhamento.filter(
                dt => tiposLinha2.includes(dt.status_normalizado_pmo)));
        }
    }, [detalhamento])

    const getSumProject = (field) => {
        var total = {}
        if ((detalhamento != null) || (detalhamento != undefined)) {
            switch (field) {
                case "W":
                    total = detalhamento.reduce((a, b) => ({ week: a.week + b.week }));
                    return total.week
                case "W FIRST PART":
                    total = ociosidadeB2BLSFirstPart.reduce((a, b) => ({ week: a.week + b.week }));
                    return total.week
                case "W SECOND PART":
                    if(ociosidadeB2BLSSecondPart === []){
                        return "-"
                    }
                    total = ociosidadeB2BLSSecondPart.reduce((a, b) => ({ week: a.week + b.week }), 0);
                    return total.week
                case "W-1":
                    total = detalhamento.reduce((a, b) => ({ last_week: a.last_week + b.last_week }));
                    return total.last_week
                case "W-1 FIRST PART":
                    total = ociosidadeB2BLSFirstPart.reduce((a, b) => ({ last_week: a.last_week + b.last_week }));
                    return total.last_week
                case "W-1 SECOND PART":
                    if(ociosidadeB2BLSSecondPart === []){
                        return "-"
                    }
                    total = ociosidadeB2BLSSecondPart.reduce((a, b) => ({ last_week: a.last_week + b.last_week }), 0);
                    return total.last_week
                case "Total FIRST PART":
                    total = ociosidadeB2BLSFirstPart.reduce((a, b) => ({ saving_mensal: a.saving_mensal + b.saving_mensal }));
                    return total.saving_mensal
                case "Total SECOND PART":
                    if(ociosidadeB2BLSSecondPart === []){
                        return "-"
                    }
                    total = ociosidadeB2BLSSecondPart.reduce((a, b) => ({ saving_mensal: a.saving_mensal + b.saving_mensal }), 0);
                    return total.saving_mensal
                case "Total Geral":
                    total = detalhamento.reduce((a, b) => ({ saving_mensal: a.saving_mensal + b.saving_mensal }));
                    return total.saving_mensal
                default:
                    return "-"
            }
        }
    }

    return (
        <div>
            <div className="box box-default" style={{ marginRight: "20px", padding: "15px", fontSize: "medium" }}>
                <h3 className="box-title">Detalhamento</h3>
                <TableDashboard className="table">
                    <thead>
                        <tr>
                            <th colSpan="1"
                                style={{
                                    position: "relative",
                                    userSelect: "none",
                                    whiteSpace: "nowrap",
                                    cursor: "pointer"
                                }}> <span class="label label-primary">Status</span></th>
                            <th colSpan="1"
                                style={{
                                    position: "relative",
                                    userSelect: "none",
                                    whiteSpace: "nowrap",
                                    cursor: "pointer"
                                }}><span class="label label-primary">W-1</span></th>
                            <th colSpan="1"
                                style={{
                                    position: "relative",
                                    userSelect: "none",
                                    whiteSpace: "nowrap",
                                    cursor: "pointer"
                                }}><span class="label label-primary">W</span></th>
                            <th colSpan="1"
                                style={{
                                    position: "relative",
                                    userSelect: "none",
                                    whiteSpace: "nowrap",
                                    cursor: "pointer"
                                }}><span class="label label-primary">Saving Mensal</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        {ociosidadeB2BLSFirstPart && ociosidadeB2BLSFirstPart.map((el, index) => (
                            <tr>
                                <td>{el.status_normalizado_pmo || "-"}</td>
                                <td>{el.last_week || "-"}</td>
                                <td>{el.week || "-"}</td>
                                <td>{`R$${el.saving_mensal}` || "-"}</td>
                            </tr>
                        ))}
                        {ociosidadeB2BLSFirstPart && (
                            <tr>
                                <td style={{ backgroundColor: "#E6E6FA" }}>Total</td>
                                <td style={{ backgroundColor: "#E6E6FA" }}>{getSumProject("W-1 FIRST PART")}</td>
                                <td style={{ backgroundColor: "#E6E6FA" }}>{getSumProject("W FIRST PART")}</td>
                                <td style={{ backgroundColor: "#E6E6FA" }}>{`R$${getSumProject("Total FIRST PART")}`}</td>
                            </tr>)}
                    </tbody>
                </TableDashboard>
                <TableDashboard className="table">
                    <thead>
                        <tr>
                            <th colSpan="1"
                                style={{
                                    position: "relative",
                                    userSelect: "none",
                                    whiteSpace: "nowrap",
                                    cursor: "pointer"
                                }}> <span class="label label-primary">Status</span></th>
                            <th colSpan="1"
                                style={{
                                    position: "relative",
                                    userSelect: "none",
                                    whiteSpace: "nowrap",
                                    cursor: "pointer"
                                }}><span class="label label-primary">W-1</span></th>
                            <th colSpan="1"
                                style={{
                                    position: "relative",
                                    userSelect: "none",
                                    whiteSpace: "nowrap",
                                    cursor: "pointer"
                                }}><span class="label label-primary">W</span></th>
                            <th colSpan="1"
                                style={{
                                    position: "relative",
                                    userSelect: "none",
                                    whiteSpace: "nowrap",
                                    cursor: "pointer"
                                }}><span class="label label-primary">Saving Mensal</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        {ociosidadeB2BLSSecondPart && ociosidadeB2BLSSecondPart.map((el, index) => (
                            <tr>
                                <td>{el.status_normalizado_pmo || "-"}</td>
                                <td>{el.last_week || "-"}</td>
                                <td>{el.week || "-"}</td>
                                <td>{`R$${el.saving_mensal}` || "-"}</td>
                            </tr>
                        ))}
                        {ociosidadeB2BLSSecondPart && (
                            <tr>
                                <td style={{ backgroundColor: "#E6E6FA" }}>Total</td>
                                <td style={{ backgroundColor: "#E6E6FA" }}>{getSumProject("W-1 SECOND PART") || "0"}</td>
                                <td style={{ backgroundColor: "#E6E6FA" }}>{getSumProject("W SECOND PART") || "0"}</td>
                                <td style={{ backgroundColor: "#E6E6FA" }}>{`R$${getSumProject("Total SECOND PART") || "0"}`}</td>
                            </tr>)}
                        <br></br>
                        {ociosidadeB2BLSSecondPart && (
                            <tr>
                                <td style={{ backgroundColor: "#1E90FF" }}>Total Geral</td>
                                <td style={{ backgroundColor: "#1E90FF" }}>{getSumProject("W-1")}</td>
                                <td style={{ backgroundColor: "#1E90FF" }}>{getSumProject("W")}</td>
                                <td style={{ backgroundColor: "#1E90FF" }}>{`R$${getSumProject("Total Geral")}`}</td>
                            </tr>)}
                    </tbody>
                </TableDashboard>
            </div>
        </div>
    )
}

export default DetalhamentoOciIndustrialB2BLS
