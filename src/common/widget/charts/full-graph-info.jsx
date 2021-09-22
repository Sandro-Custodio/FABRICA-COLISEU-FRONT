import React from 'react'

import {Line} from 'react-chartjs-2'
import Grid from '../../layout/grid'

class FullGraphInfo extends React.Component{

    render(){
        const data = {
            labels: ['Março/2018', 'Abril/2018', 'Maio/2018', 'Junho/2018', 'Julho/2018', 'Agosto/2018', 'Setembro/2018', 'Outubro/2018', 'Novembro/2018', 'Dezembro/2018', 'Janeiro/2019', 'Fevereiro/2019', 'Março/2019'],
            datasets: [
              {
                label: 'E.V.T',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(72, 255, 132, 0.1)',
                borderColor: 'rgba(72, 255, 132, 0.7)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(72, 255, 132, 0.7)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(72, 255, 132, 0.7)',
                pointHoverBorderColor: 'rgba(72, 255, 132, 0.7)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [11, 20, 50, 33, 45, 90, 10, 50, 40, 70, 60, 99, 44]
              },
              {
                label: 'Ordens de Transmissão',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(142, 188, 255, 0.1)',
                borderColor: 'rgba(142, 188, 255, 0.7)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(142, 188, 255, 0.7)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(142, 188, 255, 0.7)',
                pointHoverBorderColor: 'rgba(142, 188, 255, 0.7)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [70, 60, 50, 40, 45, 90, 110, 50, 40, 45, 60, 50, 40]
              },
              {
                label: 'Ordens de desligamento',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(251, 188, 0, 0.1)',
                borderColor: 'rgba(251, 188, 0, 0.7)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(251, 188, 0, 0.7)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(251, 188, 0, 0.7)',
                pointHoverBorderColor: 'rgba(251, 188, 0, 0.7)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [44, 22, 88, 77, 17, 12, 61, 43, 19, 20, 85, 64, 32]
              },
              {
                label: 'Solicitações de desligamento',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(251, 0, 0, 0.1)',
                borderColor: 'rgba(251, 0, 0, 0.7)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(251, 0, 0, 0.7)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(251, 0, 0, 0.7)',
                pointHoverBorderColor: 'rgba(251, 0, 0, 0.7)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [200, 43, 44, 66, 81, 88, 30, 40, 47, 20, 21, 12, 90]
              }

            ]
        }
        return(
            <Grid cols={this.props.cols}>
                <div className="box box-danger">
                    <div className="box-body" style={{}}>
                        <div className="row">
                            <div className="col-md-8">
                                <p className="text-center">
                                    <strong>Contagem agrupada por mês: 1 Mar, 2018 - 1 Mar, 2019</strong>
                                </p>
                                <div className="chart">
                                    <Line data={data} options={{}} width={600} height={250}/>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <p className="text-center">
                                    <strong>Consolidado Anual</strong>
                                </p>
                            <div className="progress-group">
                                <span className="progress-text">E.V.T</span>
                                <span className="progress-number"><b>44</b>/280</span>
                                <div className="progress sm">
                                    <div className="progress-bar progress-bar-aqua" style={{width:`${44/280*100}%`}}>
                                    </div>
                                </div>
                            </div>
                            <div className="progress-group">
                                <span className="progress-text">Ordens de Transmissão</span>
                                <span className="progress-number"><b>40</b>/180</span>
                                <div className="progress sm">
                                    <div className="progress-bar progress-bar-red" style={{width:`${40/180*100}%`}}>
                                    </div>
                                </div>
                            </div>
                            <div className="progress-group">
                                <span className="progress-text">Ordens de desligamento</span>
                                <span className="progress-number"><b>32</b>/150</span>
                                <div className="progress sm">
                                    <div className="progress-bar progress-bar-green" style={{width:`${32/150*100}%`}}></div>
                                </div>
                            </div>
                            <div className="progress-group">
                                <span className="progress-text">Solicitações de desligamento</span>
                                <span className="progress-number"><b>90</b>/358</span>
                                <div className="progress sm">
                                    <div className="progress-bar progress-bar-yellow" style={{width:`${90/358*100}%`}}></div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="box-footer" style={{}}>
                        <div className="row">
                            <div className="col-sm-3 col-xs-6">
                                <div className="description-block border-right">
                                    <span className="description-percentage text-green"><i className="fa fa-caret-up"></i> 4.567%</span>
                                    <h5 className="description-header">44</h5>
                                    <span className="description-text">E.V.T</span>
                                </div>
                            </div>
                            <div className="col-sm-3 col-xs-6">
                                <div className="description-block border-right">
                                    <span className="description-percentage text-yellow"><i className="fa fa-caret-left"></i> 0.000%</span>
                                    <h5 className="description-header">40</h5>
                                    <span className="description-text">ORDENS DE TRANSMISSÃO</span>
                                </div>
                            </div>
                            <div className="col-sm-3 col-xs-6">
                                <div className="description-block border-right">
                                    <span className="description-percentage text-green"><i className="fa fa-caret-up"></i> 22.661%</span>
                                    <h5 className="description-header">32</h5>
                                    <span className="description-text">ORDENS DE DESLIGAMENTO</span>
                                </div>
                            </div>
                            <div className="col-sm-3 col-xs-6">
                                <div className="description-block">
                                    <span className="description-percentage text-red"><i className="fa fa-caret-down"></i> 18.209%</span>
                                    <h5 className="description-header">90</h5>
                                    <span className="description-text">SOLICITAÇÕES DE DESLIGAMENTO</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Grid>
        )
    }

}

export default FullGraphInfo