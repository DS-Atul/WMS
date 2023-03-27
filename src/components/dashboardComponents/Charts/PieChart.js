import React from "react";
import ReactApexChart from "react-apexcharts";

const PieChart = ({ series, labels, colors }) => {
  const options = {
    labels: labels,
    colors: colors,
    legend: {
      show: true,
      position: "bottom",
      // position: "left",
      horizontalAlign: "center",
      verticalAlign: "middle",
      floating: false,
      fontSize: "14px",
      offsetX: 0,
      offsetY: -10,
    },
    responsive: [
      {
        breakpoint: 600,
        options: {
          chart: {
            height: 240,
          },
          legend: {
            show: false,
          },
        },
      },
    ],
  };

  return (
    <ReactApexChart options={options} series={series} type="pie" height="380" />
  );
};

export default PieChart;
