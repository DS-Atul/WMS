import React from "react";
import ReactApexChart from "react-apexcharts";

const BarChart = ({ seriesData, categories, color, chartDirection }) => {
  const series = [{ data: seriesData }];
  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: chartDirection,
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: [color],
    grid: {
      borderColor: "#f1f1f1",
    },
    xaxis: {
      categories: categories,
    },
  };

  return (
    <ReactApexChart options={options} series={series} type="bar" height="350" />
  );
};

export default BarChart;
