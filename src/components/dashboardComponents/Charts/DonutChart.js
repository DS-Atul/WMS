import React from "react";
import ReactApexChart from "react-apexcharts";

const DonutChart = ({ series, labels, colors }) => {
  const options = {
    chart: {
      type: "donut",
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
              showAlways: true,
              fontSize: 22,
              color: "#333333",
              fontFamily: "Helvetica"
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: true,
    },

    colors: colors,
    labels: labels,
    legend: {
      // position: "bottom",
      position: "left",
      horizontalAlign: "center",
      offsetY: 10,
    },
   
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
