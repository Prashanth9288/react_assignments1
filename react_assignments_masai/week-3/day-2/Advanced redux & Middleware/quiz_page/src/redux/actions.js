import axios from "axios";
import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
  FETCH_QUIZ_REQUEST, FETCH_QUIZ_SUCCESS, FETCH_QUIZ_FAILURE,
  UPDATE_SCORE
} from "./actionTypes";


export const loginUser = (email, password) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const res = await axios.post("https://reqres.in/api/login", { email, password });
    dispatch({ type: LOGIN_SUCCESS, payload: res.data.token });
  } catch (err) {
    dispatch({ type: LOGIN_FAILURE, payload: err.response.data.error });
  }
};


export const fetchQuiz = () => async (dispatch) => {
  dispatch({ type: FETCH_QUIZ_REQUEST });
  try {
    const res = await axios.get("https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-quiz");
    dispatch({ type: FETCH_QUIZ_SUCCESS, payload: res.data.data });
  } catch (err) {
    dispatch({ type: FETCH_QUIZ_FAILURE, payload: err.message });
  }
};


export const updateScore = (points) => ({
  type: UPDATE_SCORE,
  payload: points
});
