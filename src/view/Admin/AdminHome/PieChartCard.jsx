import React, { useMemo } from "react";
import { Chart } from "react-google-charts";

const PieChartCard = ({ title, data, colors }) => {
  const options = {
    title,
  };

  const CHART_DATA = useMemo(() => {
    return (
      data || [
        ["Task", "Hours per Day"],
        ["Work", 11],
        ["Eat", 2],
        ["Commute", 2],
        ["Watch TV", 2],
        ["Sleep", 7],
      ]
    );
  }, [data]);

  return (
    <div>
      <Chart
        chartType="PieChart"
        data={CHART_DATA}
        options={options}
        width={"100%"}
        height={"400px"}
      />
    </div>
  );
};

export default PieChartCard;
