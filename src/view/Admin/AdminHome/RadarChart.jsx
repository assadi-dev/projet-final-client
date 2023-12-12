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
import { DATA_RADIO_CHART } from "./helpers";

const RadarChart = ({ title, data, ...props }) => {
  const CHART_DATA = useMemo(() => data || DATA_RADIO_CHART, [data]);

  ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
  );

  return (
    <Radar
      data={CHART_DATA}
      options={{ maintainAspectRatio: false }}
      {...props}
    />
  );
};

export default RadarChart;
