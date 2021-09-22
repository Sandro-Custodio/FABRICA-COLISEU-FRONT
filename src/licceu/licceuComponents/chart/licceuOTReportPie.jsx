import React from "react";
import { Pie } from "react-chartjs-2";

const data = {
  labels: ["O.T", "E.V.T", "O. Desligamento", "S. Desligamento"],
  datasets: [
    {
      data: [30, 90, 50, 30],
      backgroundColor: ["#DD4B39", "#00A65A", "#F39C12", "#00C0EF"],
      hoverBackgroundColor: [
        "rgba(221, 75, 57, 0.5)",
        "rgba(0, 166, 90, 0.5)",
        "rgba(243, 156, 18, 0.5)",
        "rgba(0, 192, 239, 0.5)"
      ]
    }
  ]
};

const options = {
  maintainAspectRatio: false,
  legend: {
    position: "left",
    labels: {
      boxWidth: 17,
      fontSize: 12,
      borderRadius: 5,
      usePointStyle: true
    }
  },
  title: {
    display: true,
    text: "OT Report"
  }
};

const LicceuOTReportPie = () => (
  <Pie data={data} width={80} height={250} options={options} />
);

export default LicceuOTReportPie;
