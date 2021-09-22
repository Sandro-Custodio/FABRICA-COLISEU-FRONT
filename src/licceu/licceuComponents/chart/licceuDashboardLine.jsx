import React from "react";
import { Line } from "react-chartjs-2";

const LicceuDashboardLine = () => (
  <div className="chart">
    <Line data={data} options={{}} width={600} height={250} />
  </div>
);

const data = {
  labels: [
    "Março/2018",
    "Abril/2018",
    "Maio/2018",
    "Junho/2018",
    "Julho/2018",
    "Agosto/2018",
    "Setembro/2018",
    "Outubro/2018",
    "Novembro/2018",
    "Dezembro/2018",
    "Janeiro/2019",
    "Fevereiro/2019",
    "Março/2019"
  ],
  datasets: [
    {
      label: "E.V.T",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgba(72, 255, 132, 0.1)",
      borderColor: "rgba(72, 255, 132, 0.7)",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgba(72, 255, 132, 0.7)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(72, 255, 132, 0.7)",
      pointHoverBorderColor: "rgba(72, 255, 132, 0.7)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [11, 20, 50, 33, 45, 90, 10, 50, 40, 70, 60, 99, 44]
    },
    {
      label: "Ordens de Transmissão",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgba(142, 188, 255, 0.1)",
      borderColor: "rgba(142, 188, 255, 0.7)",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgba(142, 188, 255, 0.7)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(142, 188, 255, 0.7)",
      pointHoverBorderColor: "rgba(142, 188, 255, 0.7)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [70, 60, 50, 40, 45, 90, 110, 50, 40, 45, 60, 50, 40]
    },
    {
      label: "Ordens de desligamento",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgba(251, 188, 0, 0.1)",
      borderColor: "rgba(251, 188, 0, 0.7)",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgba(251, 188, 0, 0.7)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(251, 188, 0, 0.7)",
      pointHoverBorderColor: "rgba(251, 188, 0, 0.7)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [44, 22, 88, 77, 17, 12, 61, 43, 19, 20, 85, 64, 32]
    },
    {
      label: "Solicitações de desligamento",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgba(251, 0, 0, 0.1)",
      borderColor: "rgba(251, 0, 0, 0.7)",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgba(251, 0, 0, 0.7)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(251, 0, 0, 0.7)",
      pointHoverBorderColor: "rgba(251, 0, 0, 0.7)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [200, 43, 44, 66, 81, 88, 30, 40, 47, 20, 21, 12, 90]
    }
  ]
};

export default LicceuDashboardLine;
