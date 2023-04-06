import { combineReducers } from "redux";
import { getIngredientsReducer } from "../reducers/getIngredientsReducer";

export const rootReducer = combineReducers({
  ingredients: getIngredientsReducer,
})