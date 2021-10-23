import {
  GET_HOMEPLANS,
  HOMEPLANS_LOADING,
  SET_CURRENT_HOMEPLAN,
  HOMEPLAN_ERROR,
  SAVED_HOMEPLANS,
} from "./types";
import { returnErrors } from "./errorActions";
import { API } from "../api";

export const getHomePlans = () => async (dispatch, getState) => {
  dispatch(setHomePlansLoading());
  try {
    dispatch({
      type: GET_HOMEPLANS,
      payload: API.getHomePlans(),
    });
  } catch (err) {
    dispatch(
      returnErrors(err.response.data, err.response.status, "HOMEPLAN_ERROR")
    );
    dispatch({
      type: HOMEPLAN_ERROR,
    });
  }
};

export const savedHomePlans = (homeplan) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SAVED_HOMEPLANS,
      payload: homeplan,
    });
  } catch (err) {
    dispatch(
      returnErrors(err.response.data, err.response.status, "HOMEPLAN_ERROR")
    );
    dispatch({
      type: HOMEPLAN_ERROR,
    });
  }
};

export const setCurrentHomePlan = (homeplan) => {
  return {
    type: SET_CURRENT_HOMEPLAN,
    payload: homeplan,
  };
};

export const setHomePlansLoading = () => {
  return {
    type: HOMEPLANS_LOADING,
  };
};
