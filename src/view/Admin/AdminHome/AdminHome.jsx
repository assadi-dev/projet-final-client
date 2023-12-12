import React from "react";
import PieChartCard from "./PieChartCard";
import RadarChart from "./RadarChart";
import {
  DATA_RADIO_CHART,
  QUESTION10_DATA_CHART,
  QUESTION6_DATA_CHART,
  QUESTION7_DATA_CHART,
} from "./helpers";

const AdminHome = () => {
  return (
    <div>
      <div style={defaultStyle}>
        <PieChartCard
          title={`Question 6: Quel marque de casque VR utilisez-vous ?`}
          data={QUESTION6_DATA_CHART}
        />
      </div>
      <div style={defaultStyle}>
        <PieChartCard
          title={`Question 7: Sur quel magasin d’application achetez vous des contenus VR ?`}
          data={QUESTION7_DATA_CHART}
        />
      </div>
      <div style={defaultStyle}>
        <PieChartCard
          title={`Question 10: Vous utilisez principalement Bigscreen pour :`}
          data={QUESTION10_DATA_CHART}
        />
      </div>
      <div style={defaultStyle}>
        <RadarChart
          data={DATA_RADIO_CHART}
          options={{ maintainAspectRatio: false }}
        />
      </div>
    </div>
  );
};

const defaultStyle = {
  width: "100%",
  height: "400px",
  display: "flex",
  placeItem: "center",
};
export default AdminHome;
