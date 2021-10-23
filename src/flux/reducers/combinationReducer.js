import {
  GET_COMBINATIONS,
  COMBINATIONS_LOADING,
  COMBINATION_ERROR,
} from "../actions/types";

const initialState = {
  combinations: [],
  currentCombination: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_COMBINATIONS:
      return {
        ...state,
        combinations: action.payload,
        loading: false,
      };

    case COMBINATIONS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case COMBINATION_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
