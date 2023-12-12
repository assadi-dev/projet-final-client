import React, { useCallback, useEffect, useReducer, useState } from "react";
import PieChartCard from "./PieChartCard";
import RadarChart from "./RadarChart";
import { DATA_RADAR_CHART, retrievQuestionValueCountRequest } from "./helpers";
import {
  ChartDataReducer,
  UPDATE_QUESTION,
  UPDATE_RADAR_DATA,
  initialState,
} from "./reducer/initialData";

const AdminHome = () => {
  const [charDataState, dispatchChartData] = useReducer(
    ChartDataReducer,
    initialState
  );

  const fetchforPieChart = useCallback(async () => {
    const forQuestions = [6, 7, 10];

    for (const question_number of forQuestions) {
      const promise_question = await retrievQuestionValueCountRequest(
        1,
        question_number
      );
      const data = [...promise_question.data].map((data) => data.count);
      const labels = [...promise_question.data].map((data) => data.value);
      dispatchChartData({
        type: UPDATE_QUESTION,
        payload: {
          question_number,
          data: { labels, data },
          isLoading: false,
        },
      });
    }
  }, []);

  const fetchForRadarChart = useCallback(async () => {
    const forQuestions = [11, 12, 13, 14, 15];
    let datasets = [...DATA_RADAR_CHART.datasets];

    for (const [index, question_number] of forQuestions.entries()) {
      const promise_question = await retrievQuestionValueCountRequest(
        1,
        question_number
      );
      const data = [...promise_question.data].map((answer) => answer.count);

      datasets = [...datasets].map((v, i) => {
        if (i == index) {
          return { ...v, data };
        }
        return v;
      });
    }

    console.log(datasets);

    const labels = Array.from({ length: 5 }, (_, i) => i + 1);
    dispatchChartData({
      type: UPDATE_RADAR_DATA,
      payload: {
        labels,
        datasets,
        isLoading: false,
      },
    });
  }, []);

  useEffect(() => {
    fetchforPieChart();
    fetchForRadarChart();
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
        {!charDataState.radarChartData.isLoading && (
          <RadarChart
            data={{
              datasets: charDataState.radarChartData.datasets,
              labels: charDataState.radarChartData.labels,
            }}
          />
        )}
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
