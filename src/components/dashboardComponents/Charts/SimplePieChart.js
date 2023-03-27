import React, { useState } from "react";
import ChartistGraph from "react-chartist";

const SimplePieChart = () => {
  const [pieChartData, setPieChartData] = useState({
    series: [5, 3, 4],
    labels: ["42%", "25%", "33%"],
  });
  const [pieChartOptions] = useState({
    showLabel: true,
  });

  return (
    <>
      <ChartistGraph
        data={pieChartData}
        options={pieChartOptions}
        style={{ height: "300px" }}
        type={"Pie"}
      />
    </>
  );
};

export default SimplePieChart;
