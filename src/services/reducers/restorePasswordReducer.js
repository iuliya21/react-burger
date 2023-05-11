import { RESTORE_PASSWORD_REQUEST, RESTORE_PASSWORD_SUCCESS,RESTORE_PASSWORD_FAILED } from "../actions";

const initialState = {
  success: false,
  loading: false,
}

export const restorePasswordReducer = (state = initialState, action) => {
  switch(action.type) {
    case RESTORE_PASSWORD_REQUEST: {
      return {
        ...state,
        loading: true
      };
    }
    case RESTORE_PASSWORD_SUCCESS: {
      return {
        ...state,
        loading: false,
        success: action.success
      };
    }
    case RESTORE_PASSWORD_FAILED: {
      return {
        ...state,
        loading: false,
        data: state.data
      };
    }
    default: return state;
  }
}