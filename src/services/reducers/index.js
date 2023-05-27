import { combineReducers } from "redux";
import { getIngredientsReducer } from "../reducers/getIngredientsReducer";
import { burgerConstructorReducer } from "../reducers/burgerConstructorReducer";
import { ingredientDetailsReducer } from "./ingredientDetailsReducer";
import { orderReducer } from "./orderReducer";
//import { restorePasswordReducer } from "./restorePasswordReducer";
import { userReducer } from "./userReducer";

export const rootReducer = combineReducers({
  ingredients: getIngredientsReducer,
  burgerIngredients: burgerConstructorReducer,
  ingredientDetails: ingredientDetailsReducer,
  numberOrder: orderReducer,
  user: userReducer,
});