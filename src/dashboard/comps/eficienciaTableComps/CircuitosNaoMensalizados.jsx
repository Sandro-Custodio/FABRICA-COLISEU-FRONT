import React from 'react'
import TableDashboard from 'react-bootstrap/lib/Table'


function CircuitosNaoMensalizados({ planoIndustrialITXCircuitoNMensalizado, project }) {

  const getSumProject = (field) => {
    var total = {}
    if ((planoIndustrialITXCircuitoNMensalizado != null) || (planoIndustrialITXCircuitoNMensalizado != undefined)) {
      switch (field) {
        case "W CIRC":
          total = planoIndustrialITXCircuitoNMensalizado.reduce((a, b) => ({ week: a.week + b.week }));
          return total.week
        case "W-1 CIRC":
          total = planoIndustrialITXCircuitoNMensalizado.reduce((a, b) => ({ last_week: a.last_week + b.last_week }));
          return total.last_week
        case "Total CIRC":
          total = planoIndustrialITXCircuitoNMensalizado.reduce((a, b) => ({ saving_mensal: a.saving_mensal + b.saving_mensal }));
          return total.saving_mensal
        default:
          return "-"
      }
    }
  }

  return (
    <div>
      <h3 className="box-title">Circuitos Não Mensalizados</h3>
      <TableDashboard className="table">
        <thead>
          <tr>
            {/* <th colSpan="1"
              style={{
                position: "relative",
                userSelect: "none",
                whiteSpace: "nowrap",
                cursor: "pointer"
              }}> <span class="label label-primary">Projeto</span></th> */}
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
          {planoIndustrialITXCircuitoNMensalizado && planoIndustrialITXCircuitoNMensalizado.map((el, index) => (
            <tr>
              {/* <td>{project && project.name}</td> */}
              <td>{el.status_normalizado_pmo || "-"}</td>
              <td>{el.last_week || "-"}</td>
              <td>{el.week || "-"}</td>
              <td>{`R$${el.saving_mensal}` || "-"}</td>
            </tr>
          ))}
          {planoIndustrialITXCircuitoNMensalizado && (
            <tr>
              <td style={{ backgroundColor: "#E6E6FA" }}>Total</td>
              {/* <td style={{ backgroundColor: "#E6E6FA" }}>{"  "}</td> */}
              <td style={{ backgroundColor: "#E6E6FA" }}>{getSumProject("W-1 CIRC")}</td>
              <td style={{ backgroundColor: "#E6E6FA" }}>{getSumProject("W CIRC")}</td>
              <td style={{ backgroundColor: "#E6E6FA" }}>{`R$${getSumProject("Total CIRC")}`}</td>
            </tr>)}
        </tbody>
      </TableDashboard>
    </div>
  )
}

export default CircuitosNaoMensalizados
