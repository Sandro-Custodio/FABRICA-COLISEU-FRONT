import React from 'react'
import Row from "common/layout/row";
import PlanejadoVSRealizado from "../comps/eficienciaTableComps/PlanejadoVSRealizado";
import "./style.css"
import StatusProjeto from '../comps/eficienciaTableComps/StatusProjeto';
import FocaisProjeto from '../comps/eficienciaTableComps/FocaisProjeto';
import FinanceiroFy from '../comps/eficienciaTableComps/FinanceiroFy';
import Fisico from '../comps/eficienciaTableComps/Fisico';
import AcoesOfensores from '../comps/eficienciaTableComps/AcoesOfensores';
import Detalhamento from '../comps/eficienciaTableComps/Detalhamento';
import DetalhamentoOciIndustrialB2BLS from '../comps/eficienciaTableComps/DetalhamentoOciIndustrialB2BLS';


function CommonProjectsTables({ title, acoesOfensoras, projectDetails }) {


    React.useEffect(() => {
        window.scrollTo(0, 0)
    }, [])


    return (
        <div style={{ padding: "50px", marginLeft: "3%", marginRight: "3%"}}>
            <Row>
                <div style={{ display: "flex", justifyContent: "space-between"  }}>
                    <div >
                        <PlanejadoVSRealizado planXReal={projectDetails.plan_x_realizado} />
                    </div>
                    <div>
                        <StatusProjeto físicoProjeto={projectDetails.fisico} />
                    </div>
                </div>
            </Row>
            {title != "Ociosidade B2B & LS" && (
                <Row>
                    <div style={{ display: "flex", marginTop: "40px", justifyContent: "space-between" }}>
                        <div >
                            <Detalhamento detalhamento={projectDetails.detalhamento} />
                        </div>
                        <div >
                            <Fisico físicoProjeto={projectDetails.fisico} />
                        </div>
                    </div>
                </Row>
            )}
            {title == "Ociosidade B2B & LS" && (
                <Row>
                    <div style={{ display: "flex", marginTop: "10px", justifyContent: "space-between" }}>
                        <div style={{ marginRight: "30px" }}>
                            <DetalhamentoOciIndustrialB2BLS detalhamento={projectDetails.detalhamento} />
                        </div>
                        <div>
                            <Fisico físicoProjeto={projectDetails.fisico} />
                        </div>
                    </div>
                </Row>
            )}
            <Row>
                <div style={{ display: "flex",marginTop: "40px", justifyContent: "space-between"  }}>
                    <div >
                        <AcoesOfensores acoesOfensoras={acoesOfensoras} />
                    </div>
                    <div >
                        <FocaisProjeto pontosFocais={projectDetails.pontos_focais} />
                    </div>
                </div>
            </Row>
            {title == "Plano Industrial" && (
                <Row>
                    <div style={{ display: "flex", marginTop: "10px", justifyContent: "space-between" }}>
                        <div style={{ marginRight: "30px" }}>
                            <FinanceiroFy financeiroFy={projectDetails.financeiro_fy} />
                        </div>
                    </div>
                </Row>
            )}
        </div>
    )
}

export default CommonProjectsTables
