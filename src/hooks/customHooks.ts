import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../services/types/types";

export const useAppDispatch = () => useDispatch<AppDispatch>();  //типизируем useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; //типизируем useSelector