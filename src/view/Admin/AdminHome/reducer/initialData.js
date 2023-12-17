/* eslint-disable no-case-declarations */
export const initialState = {
  question6: { datasets: [], labels: [], isLoading: true, error: "" },
  question7: { datasets: [], labels: [], isLoading: true, error: "" },
  question10: { datasets: [], labels: [], isLoading: true, error: "" },
  radarChartData: { datasets: [], labels: [], isLoading: true, error: "" },
};

export const UPDATE_QUESTION = "UPDATE_QUESTION";
export const UPDATE_RADAR_DATA = "UPDATE_RADAR_DATA";
export const ERROR_QUESTION = "ERROR_QUESTION";

/**
 * state qui constient les donnée et l'etat des questions
 * @param {*} state state initial
 * @param {*} action contient le typ et le payload reçu par le dispatch
 * @returns
 */
export const ChartDataReducer = (state = initialState, action) => {
  const { payload, type } = action;

  const question = `question${payload.question_number}`;

  switch (type) {
    case UPDATE_QUESTION:
      const updateQuestion = {
        ...state[question],
        ...payload.data,
        isLoading: false,
      };
      return { ...state, [question]: updateQuestion };

    case ERROR_QUESTION:
      console.log({
        ...state,
        [question]: { ...state[question], error: payload },
      });
      return {
        ...state,
        [question]: { ...state[question], error: payload.error },
      };

    case UPDATE_RADAR_DATA:
      return {
        ...state,
        radarChartData: {
          datasets: payload.datasets,
          labels: payload.labels,
          isLoading: payload.isLoading || false,
        },
      };

    default:
      return state;
  }
};
