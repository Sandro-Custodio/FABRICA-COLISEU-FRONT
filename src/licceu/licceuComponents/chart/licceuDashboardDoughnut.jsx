import React from "react";
import { Doughnut } from "react-chartjs-2";

const LicceudashboardDoughnut = () => (
  <div className="chart-responsive">
    <Doughnut
      data={doughnut_data}
      options={{}}
      width={80}
      height={80}
      legend={{ display: false }}
    />
  </div>
);
const doughnut_data = {
  datasets: [
    {
      data: [40, 30, 20, 10],
      backgroundColor: ["#ff3333", "#66b3ff", "#008000", "#ffbf00"]
    }
  ],
  labels: ["OT", "EVT", "OD", "SD"]
};

export default LicceudashboardDoughnut;
