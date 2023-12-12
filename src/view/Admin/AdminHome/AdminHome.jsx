import React from "react";
import PieChartCard from "./PieChartCard";

const AdminHome = () => {
  const QUESTION6_DATA = [
    ["Casques", "nombres"],
    ["Oculus Quest", 11],
    ["Oculus Rift/s", 2],
    ["HTC Vive", 2],
    ["Windows Mixed Reality", 2],
    ["Valve index", 7],
  ];
  const QUESTION7_DATA = [
    ["Magasin", "nombres"],
    ["SteamVR,", 11],
    ["Occulus store,", 2],
    ["Viveport", 2],
    ["Windows store", 2],
  ];
  const QUESTION10_DATA = [
    ["Utilisation principale", "nombres"],
    ["regarder la TV en direct", 11],
    ["regarder des films", 2],
    ["travailler", 2],
    ["jouer en solo", 2],
    ["jouer en équipe", 7],
  ];

  return (
    <div>
      <div style={{ width: "100%" }}>
        <PieChartCard
          title={`Question 6: Quel marque de casque VR utilisez-vous ?`}
          data={QUESTION6_DATA}
        />
      </div>
      <div>
        <PieChartCard
          title={`Question 7: Sur quel magasin d’application achetez vous des contenus VR ?`}
          data={QUESTION7_DATA}
        />
      </div>
      <div>
        <PieChartCard
          title={`Question 10: Vous utilisez principalement Bigscreen pour :`}
          data={QUESTION10_DATA}
        />
      </div>
    </div>
  );
};

export default AdminHome;
