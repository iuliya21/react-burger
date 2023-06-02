import { 
  WS_CONNECTION_CLOSED_USER, 
  WS_CONNECTION_ERROR_USER, 
  WS_CONNECTION_SUCCESS_USER,
  WS_GET_MESSAGE_USER } from "../actions/websocket-user";

const initialState = {
  wsConnected: false,
  orders: [],
};

export const wsFeedUserReducer = (state = initialState, action) => {
  switch(action.type) {
    case WS_CONNECTION_SUCCESS_USER: {
      return {
        ...state,
        wsConnected: true
      };
    }
    case WS_CONNECTION_ERROR_USER: {
      return {
        ...state,
        wsConnected: false
      };
    }
    case WS_CONNECTION_CLOSED_USER: {
      return {
        ...state,
        wsConnected: false,
        orders: initialState.orders
      };
    }
    case WS_GET_MESSAGE_USER: {
      return {
        ...state,
        orders: action.payload.orders
      };
    }
    default: return state;
  }
}