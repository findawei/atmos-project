import { combineReducers } from "redux";
import lotReducer from "./lotReducer";
import homeplanReducer from "./homeplanReducer";
import errorReducer from "./errorReducer";
import combinationReducer from "./combinationReducer";

export default combineReducers({
  lot: lotReducer,
  homeplan: homeplanReducer,
  error: errorReducer,
  combination: combinationReducer,
});
