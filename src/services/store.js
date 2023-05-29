import { legacy_createStore as createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { rootReducer } from "./reducers";
import { socketMiddleware } from "./middleware/socketMiddleWare";
import { WS_CONNECTION_START, 
  WS_CONNECTION_SUCCESS, 
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_CLOSE_CONNECTION } from "../services/actions/websocket";

const wsActions = {
  wsStart: WS_CONNECTION_START,
  wsClose: WS_CLOSE_CONNECTION,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE
}

const wsUrl = "wss://norma.nomoreparties.space/orders";
// const wsUserUrl = "wss://norma.nomoreparties.space/orders";

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, socketMiddleware(wsUrl, wsActions))));

// const store = createStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(thunk))
// );

export default store;
