import {
  GET_HOMEPLANS,
  SAVED_HOMEPLANS,
  HOMEPLANS_LOADING,
  SET_CURRENT_HOMEPLAN,
  HOMEPLAN_ERROR,
} from "../actions/types";

const initialState = {
  homeplans: [],
  homeplans_saved: [],
  currentHomePlan: "",
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_HOMEPLANS:
      return {
        ...state,
        homeplans: action.payload,
        loading: false,
      };

    case SAVED_HOMEPLANS:
      return {
        ...state,
        homeplans_saved: [action.payload, ...state.homeplans],
        loading: false,
      };

    case SET_CURRENT_HOMEPLAN:
      return {
        ...state,
        currentHomePlan: action.payload,
      };
    case HOMEPLANS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case HOMEPLAN_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
