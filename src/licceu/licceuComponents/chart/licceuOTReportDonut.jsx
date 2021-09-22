import React from "react";
import { Doughnut } from "react-chartjs-2";

const OT = {
  labels: ["Total", "Restante"],
  datasets: [
    {
      data: [20, 80],
      backgroundColor: ["#DD4B39", "#DDD"],
      hoverBackgroundColor: ["rgba(221, 75, 57, 0.5)", "#EEE"]
    }
  ]
};

const options_OT = {
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
    text: "O.T"
  }
};

// E.V.T
const EVT = {
  labels: ["Total", "Restante"],
  datasets: [
    {
      data: [75, 25],
      backgroundColor: ["#00A65A", "#DDD"],
      hoverBackgroundColor: ["rgba(0, 166, 90, 0.5)", "#EEE"]
    }
  ]
};

const options_EVT = {
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
    text: "E.V.T"
  }
};

// O.D
const OD = {
  labels: ["Total", "Restante"],
  datasets: [
    {
      data: [85, 15],
      backgroundColor: ["#00C0EF", "#DDD"],
      hoverBackgroundColor: ["rgba(0, 192, 239, 0.5)", "#EEE"]
    }
  ]
};

const options_OD = {
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
    text: "Ordem de Desligamento"
  }
};
// S.D

const SD = {
  labels: ["Total", "Restante"],
  datasets: [
    {
      data: [40, 60],
      backgroundColor: ["#F39C12", "#DDD"],
      hoverBackgroundColor: ["rgba(243, 156, 18, 0.5)", "#EEE"]
    }
  ]
};

const options_SD = {
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
    text: "Solicitações de Desligamento"
  }
};

const LicceuOTReportDonutOt = () => (
  <div>
    <Doughnut data={OT} options={options_OT} height={180} />
  </div>
);

const LicceuOTReportDonutEVT = () => (
  <div>
    <Doughnut data={EVT} options={options_EVT} height={180} />
  </div>
);

const LicceuOTReportDonutOD = () => (
  <div>
    <Doughnut data={OD} options={options_OD} height={180} />
  </div>
);

const LicceuOTReportDonutSD = () => (
  <div>
    <Doughnut data={SD} options={options_SD} height={180} />
  </div>
);
export {
  LicceuOTReportDonutOt,
  LicceuOTReportDonutEVT,
  LicceuOTReportDonutOD,
  LicceuOTReportDonutSD
};
