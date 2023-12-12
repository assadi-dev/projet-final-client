export const initialState = {
  question6: { datasets: [], labels: [], isLoading: true },
  question7: { datasets: [], labels: [], isLoading: false },
  question10: { datasets: [], labels: [], isLoading: false },
  radarChartData: { datasets: [], labels: [], isLoading: false },
};

export const UPDATE_QUESTION = "UPDATE_QUESTION";
export const UPDATE_RADAR_DATA = "UPDATE_RADAR_DATA";

export const ChartDataReducer = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case UPDATE_QUESTION:
      const question = `question${payload.question_number}`;
      const updateQuestion = {
        ...state[question],
        ...payload.data,
        isLoading: false,
      };
      return { ...state, [question]: updateQuestion };
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
