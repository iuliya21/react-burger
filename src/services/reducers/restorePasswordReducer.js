import { RESTORE_PASSWORD_REQUEST, RESTORE_PASSWORD_SUCCESS,RESTORE_PASSWORD_FAILED, RESTORE_PASSWORD_RESET } from "../actions";

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
    case RESTORE_PASSWORD_RESET: {
      return {
        ...state,
        success: false,
      };
    }
    default: return state;
  }
}