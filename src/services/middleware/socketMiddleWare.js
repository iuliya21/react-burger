import { getCookie } from "../../utils/cookieFunction";
import { updateUserToken } from "../actions/user";

export const socketMiddleware = (wsUrl, wsActions) => {
  return (store) => {
    let socket = null;
    const cookie = getCookie('accessToken');
    const userToken = localStorage.getItem('refreshToken');

    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsStart, wsClose, onOpen, onClose, onError, onMessage } =
        wsActions;

      if (type === wsStart && payload) {
        socket = new WebSocket(`${wsUrl}?token=${payload}`);
      } else if (type === wsStart) {
        socket = new WebSocket(`${wsUrl}`);
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch({
            type: onOpen,
            payload: event,
          });
        };

        socket.onerror = (event) => {
          dispatch({
            type: onError,
            payload: event,
          });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restData } = parsedData;
          if (!cookie && userToken) {
            dispatch(updateUserToken())
          }
          dispatch({
            type: onMessage,
            payload: restData,
          });
        };

        socket.onclose = (event) => {
          dispatch({
            type: onClose,
            payload: event,
          });
        };

        if (type === wsClose) {
          socket.close(1000, "socket close");
        }
      }
      next(action);
    };
  };
};
