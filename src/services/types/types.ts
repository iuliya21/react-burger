import {Action, ActionCreator} from "redux";
import { ThunkAction } from "redux-thunk";
import store from "../store";

export type RootState = ReturnType<typeof store.getState>; //получаем типизацию store.getState
export type AppDispatch = typeof store.dispatch; //получаем типизацию store.dispatch