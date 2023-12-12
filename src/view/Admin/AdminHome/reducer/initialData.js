export const initialState = {
  question6: { datasets: [], labels: [], isLoading: true },
  question7: { datasets: [], labels: [], isLoading: false },
  question10: { datasets: [], labels: [], isLoading: false },
};

export const UPDATE_QUESTION = "UPDATE_QUESTION";

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
      return (state = { ...state, [question]: updateQuestion });
      break;
  }
};
