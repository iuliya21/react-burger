import { combineReducers } from "redux";
import { getIngredientsReducer } from "../reducers/getIngredientsReducer";
import { burgerConstructorReducer } from "../reducers/burgerConstructorReducer";
import { ingredientDetailsReducer } from "./ingredientDetailsReducer";
import { orderReducer } from "./orderReducer";
import { userReducer } from "./userReducer";
import { wsFeedReducer } from "./wsFeedReducer";
import { wsFeedUserReducer } from "./wsFeedUserReducer";

export const rootReducer = combineReducers({
  ingredients: getIngredientsReducer,
  burgerIngredients: burgerConstructorReducer,
  ingredientDetails: ingredientDetailsReducer,
  numberOrder: orderReducer,
  user: userReducer,
  wsFeed: wsFeedReducer,
  wsFeedUser: wsFeedUserReducer
});