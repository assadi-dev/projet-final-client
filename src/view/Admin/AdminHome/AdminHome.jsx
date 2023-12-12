import React, { useCallback, useEffect, useReducer, useState } from "react";
import PieChartCard from "./PieChartCard";
import RadarChart from "./RadarChart";
import {
  DATA_RADIO_CHART,
  QUESTION10_DATA_CHART,
  QUESTION6_DATA_CHART,
  QUESTION7_DATA_CHART,
  retrievQuestionValueCountRequest,
} from "./helpers";
import {
  ChartDataReducer,
  UPDATE_QUESTION,
  initialState,
} from "./reducer/initialData";

const AdminHome = () => {
  const [charDataState, dispatchChartData] = useReducer(
    ChartDataReducer,
    initialState
  );

  const fetchforPieChart = useCallback(async () => {
    const forQuestions = [6, 7, 10];

    for (const numer_question of forQuestions) {
      const promise_question = await retrievQuestionValueCountRequest(
        1,
        numer_question
      );
      const data = [...promise_question.data].map((data) => data.count);
      const labels = [...promise_question.data].map((data) => data.value);
      dispatchChartData({
        type: UPDATE_QUESTION,
        payload: {
          question_number: numer_question,
          data: { labels, data },
          isLoading: false,
        },
      });
    }
  }, []);

  useEffect(() => {
    fetchforPieChart();
  }, []);

  return (
    <div>
      <div style={defaultStyle}>
        {!charDataState.question6.isLoading && (
          <PieChartCard
            title={`Question 6: Quel marque de casque VR utilisez-vous ?`}
            labels={charDataState.question6.labels}
            datas={charDataState.question6.data}
          />
        )}
      </div>
      <div style={defaultStyle}>
        <PieChartCard
          title={`Question 7: Sur quel magasin d’application achetez vous des contenus VR ?`}
          labels={charDataState.question7.labels}
          datas={charDataState.question7.data}
        />
      </div>
      <div style={defaultStyle}>
        <PieChartCard
          title={`Question 10: Vous utilisez principalement Bigscreen pour :`}
          labels={charDataState.question10.labels}
          datas={charDataState.question10.data}
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
