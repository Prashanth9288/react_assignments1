import axios from "axios";
import { FETCH_COFFEE_REQUEST, FETCH_COFFEE_SUCCESS, FETCH_COFFEE_FAILURE } from "./actionTypes";

export const fetchCoffees = (sortBy = "") => async (dispatch) => {
  dispatch({ type: FETCH_COFFEE_REQUEST });
  try {
    let url = "https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-coffee";
    if (sortBy) {
      url += `?sort=price&order=${sortBy}`;
    }
    const res = await axios.get(url);
    dispatch({ type: FETCH_COFFEE_SUCCESS, payload: res.data.data });
  } catch (err) {
    dispatch({ type: FETCH_COFFEE_FAILURE, payload: err.message });
  }
};
