import {Action, ActionCreator} from "redux";
import { ThunkAction } from "redux-thunk";
import store from "../store";
import { TBurgerConstructorActions, TGetIngredientsActions, TGetNumberOrderActions, TIngredientDetailsActions } from "../actions";

export type TIngredient = {
  id: string,
  name: string,
  type: string,
  proteins: number,
  fat: number,
  carbohydrates: number,
  calories: number,
  price: number,
  image: string,
  image_mobile: string,
  image_large: string,
  __v: number,
  qty?: number,
  key?: string,
  uuid?: string,
  _id: string,
}

export type RootState = ReturnType<typeof store.getState>; //получаем типизацию store.getState

export type AppDispatch = typeof store.dispatch; //получаем типизацию store.dispatch
type TApplicationActions = TGetIngredientsActions | TGetNumberOrderActions | TIngredientDetailsActions | TBurgerConstructorActions;

export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, RootState, Action, TApplicationActions>>;