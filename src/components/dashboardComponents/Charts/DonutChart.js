import React from "react";
import ReactApexChart from "react-apexcharts";

const DonutChart = ({ series, labels, colors }) => {
  const options = {
    chart: {
      type: "donut",
    },
    colors: colors,
    labels: labels,
    legend: {
      // position: "bottom",
      position: "left",
      horizontalAlign: "center",
      offsetY: 10,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: "100%",
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="donut"
        height="350"
      />
    </div>
  );
};

export default DonutChart;
