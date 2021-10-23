import {
  GET_LOTS,
  LOTS_LOADING,
  SET_CURRENT_LOT,
  LOT_ERROR,
} from "../actions/types";

const initialState = {
  lots: [],
  currentLot: "",
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LOTS:
      return {
        ...state,
        lots: action.payload,
        loading: false,
      };
    case SET_CURRENT_LOT:
      return {
        ...state,
        currentLot: action.payload,
      };
    case LOTS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case LOT_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
