import { SELECT_ORDER, DELETE_INFO_ORDER } from "../actions";

const initialState = {
  selectedOrder: {},
}

export const orderDetailsReducer = (state = initialState, action) => {
  switch(action.type) {
     case SELECT_ORDER: {
      return {
        ...state,
        selectedOrder: { ...state.selectedOrder, ...action.data }
      };
     }
     case DELETE_INFO_ORDER: {
      return {
        ...state,
        selectedOrder: {},
      };
     }
    default: return state;
  }
}