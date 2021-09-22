import React from 'react'
import { useSelector } from "react-redux";
import TableDashboard from 'react-bootstrap/lib/Table'
import CircuitosNaoMensalizados from './CircuitosNaoMensalizados';


function Detalhamento({ detalhamento }) {

  const project = useSelector(state => state.dashboard.project);
  const [statusProject, setStatusProject] = React.useState([]);
  const [planoIndustrialITX, setPlanoIndustrialITX] = React.useState([{ week: 0, last_week: 0, total: 0 }]);
  const [planoIndustrialITXCircuitoNMensalizado, setPlanoIndustrialITXCircuitoNMensalizado] = React.useState([{ week: 0, last_week: 0, total: 0 }]);

  const list_detalhamento_itx = ["Aguardar ITX Migrar", "Facilidade - Projeto + implantação", "LL desativada"];

  const getSumProject = (field) => {
    var total = {}
    if ((detalhamento != null) || (detalhamento != undefined)) {
      switch (field) {
        case "W":
          total = detalhamento.reduce((a, b) => ({ week: a.week + b.week }));
          return total.week
        case "W Plano Industrial - ITX":
          total = detalhamento.reduce((a, b) => ({ week: a.week + b.week }));
          return total.week
        case "W-1":
          total = detalhamento.reduce((a, b) => ({ last_week: a.last_week + b.last_week }));
          return total.last_week
        case "W-1 Plano Industrial - ITX":
          total = detalhamento.reduce((a, b) => ({ last_week: a.last_week + b.last_week }));
          return total.last_week
        case "Total":
          total = detalhamento.reduce((a, b) => ({ saving_mensal: a.saving_mensal + b.saving_mensal }));
          return total.saving_mensal
        case "Total Plano Industrial - ITX":
          total = detalhamento.reduce((a, b) => ({ saving_mensal: a.saving_mensal + b.saving_mensal }));
          return total.saving_mensal
        default:
          return "-"
      }
    }
  }

  React.useEffect(() => {
    if (project && detalhamento && project.name == "Plano Industrial - ITX") {
      setPlanoIndustrialITX(detalhamento.filter(
        dt => list_detalhamento_itx.includes(dt.status_normalizado_pmo)));
      setPlanoIndustrialITXCircuitoNMensalizado(detalhamento.filter(
        dt => !list_detalhamento_itx.includes(dt.status_normalizado_pmo)));
    }
  }, [project, detalhamento])


  return (
    <div>
      <div style={{ fontSize: "medium" }}>
        <div className="box box-default" style={{ marginRight: "20px", padding: "15px", paddingBottom: "57px" }}>
          <h3 className="box-title">Detalhamento</h3>
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
              {project.name == "Plano Industrial - ITX" && planoIndustrialITX && planoIndustrialITX.map((el, index) => (
                <tr>
                  {/* <td>{project && project.name}</td> */}
                  <td>{el.status_normalizado_pmo || "-"}</td>
                  <td>{el.last_week || "-"}</td>
                  <td>{el.week || "-"}</td>
                  <td>{`R$${el.saving_mensal}` || "-"}</td>
                </tr>
              ))}
              {project.name == "Plano Industrial - ITX" && detalhamento && (
                <tr>
                  <td style={{ backgroundColor: "#E6E6FA" }}>Total</td>
                  {/* <td style={{ backgroundColor: "#E6E6FA" }}>{"  "}</td> */}
                  <td style={{ backgroundColor: "#E6E6FA" }}>{getSumProject("W-1 Plano Industrial - ITX")}</td>
                  <td style={{ backgroundColor: "#E6E6FA" }}>{getSumProject("W Plano Industrial - ITX")}</td>
                  <td style={{ backgroundColor: "#E6E6FA" }}>{`R$${getSumProject("Total Plano Industrial - ITX")}`}</td>
                </tr>)}
              {project.name != "Plano Industrial - ITX" && detalhamento && detalhamento.map((el, index) => (
                <tr>
                  {/* <td>{project && project.name}</td> */}
                  <td>{el.status_normalizado_pmo || "-"}</td>
                  <td>{el.last_week || "-"}</td>
                  <td>{el.week || "-"}</td>
                  <td>{`R$${el.saving_mensal}` || "-"}</td>
                </tr>
              ))}
              {project.name != "Plano Industrial - ITX" && detalhamento && (
                <tr>
                  <td style={{ backgroundColor: "#E6E6FA" }}>Total</td>
                  {/* <td style={{ backgroundColor: "#E6E6FA" }}>{"  "}</td> */}
                  <td style={{ backgroundColor: "#E6E6FA" }}>{getSumProject("W-1")}</td>
                  <td style={{ backgroundColor: "#E6E6FA" }}>{getSumProject("W")}</td>
                  <td style={{ backgroundColor: "#E6E6FA" }}>{`R$${getSumProject("Total")}`}</td>
                </tr>)}
            </tbody>
          </TableDashboard>
        </div>
              {project.name == "Plano Industrial - ITX" && (<div className="box box-default" style={{ marginRight: "20px", padding: "15px", marginTop: "70px", height: "350px" }}>
                <CircuitosNaoMensalizados planoIndustrialITXCircuitoNMensalizado={planoIndustrialITXCircuitoNMensalizado} project={project} />
              </div>)}
      </div>
    </div>
  )
}

export default Detalhamento
