import { FETCH_QUIZ_REQUEST, FETCH_QUIZ_SUCCESS, FETCH_QUIZ_FAILURE, UPDATE_SCORE } from "./actionTypes";

const initialState = {
  questions: [],
  loading: false,
  error: null,
  score: 0,
  currentIndex: 0
};

export const quizReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_QUIZ_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_QUIZ_SUCCESS:
      return { ...state, loading: false, questions: action.payload };
    case FETCH_QUIZ_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case UPDATE_SCORE:
      return { ...state, score: state.score + action.payload };
    default:
      return state;
  }
};
