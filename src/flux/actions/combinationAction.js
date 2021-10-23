import {
  GET_COMBINATIONS,
  COMBINATIONS_LOADING,
  COMBINATION_ERROR,
} from "./types";
import { returnErrors } from "./errorActions";
import { API } from "../api";

export const getCombinations = () => async (dispatch, getState) => {
  dispatch(setHomePlansLoading());
  try {
    dispatch({
      type: GET_COMBINATIONS,
      payload: API.getCombinations(),
    });
  } catch (err) {
    dispatch(
      returnErrors(err.response.data, err.response.status, "COMBINATION_ERROR")
    );
    dispatch({
      type: COMBINATION_ERROR,
    });
  }
};

export const setHomePlansLoading = () => {
  return {
    type: COMBINATIONS_LOADING,
  };
};
