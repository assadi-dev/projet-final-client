import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import PieChartCard from "./PieChartCard";
import RadarChart from "./RadarChart";
import { DATA_RADAR_CHART, retrievQuestionValueCountRequest } from "./helpers";
import {
  ChartDataReducer,
  UPDATE_QUESTION,
  UPDATE_RADAR_DATA,
  initialState,
} from "./reducer/initialData";
import styles from "./styles.module.css";

const AdminHome = () => {
  const [charDataState, dispatchChartData] = useReducer(
    ChartDataReducer,
    initialState
  );

  const radarFetchAbortControllerRef = useRef(new AbortController());
  const pieFetchAbortControllerRef = useRef(new AbortController());

  const fetchforPieChart = useCallback(async () => {
    const forQuestions = [6, 7, 10];

    try {
      for (const question_number of forQuestions) {
        const promise_question = await retrievQuestionValueCountRequest(
          1,
          question_number,
          radarFetchAbortControllerRef.current?.signal
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
    } catch (error) {}
  }, []);

  const fetchForRadarChart = useCallback(async () => {
    const forQuestions = [11, 12, 13, 14, 15];
    let datasets = [...DATA_RADAR_CHART.datasets];
    try {
      for (const [index, question_number] of forQuestions.entries()) {
        const promise_question = await retrievQuestionValueCountRequest(
          1,
          question_number,
          pieFetchAbortControllerRef.current?.signal
        );
        const data = [...promise_question.data].map((answer) => answer.count);

        datasets = [...datasets].map((v, i) => {
          if (i == index) {
            return { ...v, data };
          }
          return v;
        });
      }

      const labels = Array.from({ length: 5 }, (_, i) => i + 1);
      dispatchChartData({
        type: UPDATE_RADAR_DATA,
        payload: {
          labels,
          datasets,
          isLoading: false,
        },
      });
    } catch (error) {}
  }, []);

  useEffect(() => {
    fetchforPieChart();
    fetchForRadarChart();
    return () => {
      pieFetchAbortControllerRef.current?.abort();
      radarFetchAbortControllerRef.current?.abort();
    };
  }, []);

  return (
    <>
      <div className={styles["grid-row-charts"]}>
        <div className={styles["col-a"]}>
          <PieChartCard
            title={`Question 6: Quel marque de casque VR utilisez-vous ?`}
            labels={charDataState.question6.labels}
            datas={charDataState.question6.data}
            isLoading={charDataState.question6.isLoading}
          />
        </div>
        <div className={styles["col-b"]}>
          <PieChartCard
            title={`Question 7: Sur quel magasin d’application achetez vous des contenus VR ?`}
            labels={charDataState.question7.labels}
            datas={charDataState.question7.data}
            isLoading={charDataState.question7.isLoading}
          />
        </div>

        <div className={styles["col-c"]}>
          <PieChartCard
            title={`Question 10: Vous utilisez principalement Bigscreen pour :`}
            labels={charDataState.question10.labels}
            datas={charDataState.question10.data}
            isLoading={charDataState.question10.isLoading}
          />
        </div>
        <div className={styles["col-d"]}>
          <RadarChart
            title="Question 11 à 15"
            data={{
              datasets: charDataState.radarChartData.datasets,
              labels: charDataState.radarChartData.labels,
            }}
            isLoading={charDataState.radarChartData.isLoading}
          />
        </div>
      </div>
    </>
  );
};

const defaultStyle = {
  width: "100%",
  height: "auto",
  display: "flex",
  placeItem: "center",
};
export default AdminHome;
