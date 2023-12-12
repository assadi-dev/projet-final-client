import React, { useMemo } from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import { DATA_RADAR_CHART } from "./helpers";

const RadarChart = ({ title, data, ...props }) => {
  console.log(data);
  const CHART_DATA = useMemo(() => data || DATA_RADAR_CHART, [data]);

  ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
  );

  return <Radar data={CHART_DATA} {...props} />;
};

export default RadarChart;
