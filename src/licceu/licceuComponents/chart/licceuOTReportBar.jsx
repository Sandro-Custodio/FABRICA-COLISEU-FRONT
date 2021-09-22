import React from "react";
import { Bar } from "react-chartjs-2";

const data = {
  labels: ["JAN", "FEV", "MAR", "APR", "MAI", "JUN"],
  datasets: [
    {
      label: "O.T",
      backgroundColor: "#DD4B39",
      hoverBackgroundColor: "rgba(221, 75, 57, 0.5)",
      data: [65, 40, 69, 100, 90, 30]
    },
    {
      label: "E.V.T",
      backgroundColor: "#00A65A",
      hoverBackgroundColor: "rgba(0, 166, 90, 0.5)",
      data: [30, 80, 57, 84, 29, 25]
    },
    {
      label: "Ordem de Desligamento",
      backgroundColor: "#F39C12 ",
      hoverBackgroundColor: "rgba(243, 156, 18, 0.5)",
      data: [59, 46, 96, 38, 92, 76]
    },
    {
      label: "Solicitações de Desligamento",
      backgroundColor: "#00C0EF",
      hoverBackgroundColor: "rgba(0, 192, 239, 0.5)",
      data: [97, 85, 58, 47, 70, 54]
    }
  ]
};

const options = {
  maintainAspectRatio: false,
  legend: {
    position: "top",
    labels: {
      boxWidth: 15,
      fontSize: 12
      // usePointStyle: true
    }
  },
  title: {
    display: true,
    text: "1° Semestre"
  }
};
const LicceuOTListBar = () => (
  <Bar
    className="chart-responsive"
    data={data}
    width={500}
    height={250}
    options={options}
  />
);

export default LicceuOTListBar;
