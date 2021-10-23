import { GET_LOTS, LOTS_LOADING, LOT_ERROR, SET_CURRENT_LOT } from "./types";
import { returnErrors } from "./errorActions";
import { API } from "../api";

export const getLots = () => async (dispatch, getState) => {
  dispatch(setLotsLoading());
  try {
    dispatch({
      type: GET_LOTS,
      payload: API.getLots(),
    });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, "LOT_ERROR"));
    dispatch({
      type: LOT_ERROR,
    });
  }
};

export const setCurrentLot = (lot) => {
  return {
    type: SET_CURRENT_LOT,
    payload: lot,
  };
};

export const setLotsLoading = () => {
  return {
    type: LOTS_LOADING,
  };
};
