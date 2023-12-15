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
  const CHART_DATA = useMemo(() => data || DATA_RADAR_CHART, [data]);

  ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
  );

  return (
    <div className="card h-100">
      <div className="card-header">
        <h5 className="card-title">{title}</h5>
      </div>
      <div className="card-body">
        <div className="chart">
          <Radar
            width={"100%"}
            height={"auto%"}
            data={CHART_DATA}
            {...props}
            options={{ maintainAspectRatio: false }}
          />
        </div>
      </div>
    </div>
  );
};

export default RadarChart;
