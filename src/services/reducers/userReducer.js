import { 
  REGISTER_USER_REQUEST, 
  REGISTER_USER_SUCCESS, 
  REGISTER_USER_FAILED,
  RESTORE_PASSWORD_REQUEST, 
  RESTORE_PASSWORD_SUCCESS,
  RESTORE_PASSWORD_FAILED, 
  RESTORE_PASSWORD_RESET,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED, 
  LOGIN_REQUEST, 
  LOGIN_SUCCESS, 
  LOGIN_FAILED } from "../actions/user";

const initialState = {
  loading: false,
  success: false,
  email: "",
  name: "",
  accessToken: "Bearer ...",
  refreshToken: "",
  error: "",
  authorizedUser: false,
  failed: false
}

export const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case REGISTER_USER_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case REGISTER_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
        success: action.success,
        email: action.email,
        name: action.name,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken
      };
    }
    case REGISTER_USER_FAILED: {
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error,
      };
    }
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
        failed: true
      };
    }
    case RESTORE_PASSWORD_RESET: {
      return {
        ...state,
        success: initialState.success,
      };
    }
    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        loading: false,
        success: action.success
      };
    }
    case RESET_PASSWORD_FAILED: {
      return {
        ...state,
        loading: false,
        failed: true
      };
    }
    case LOGIN_REQUEST: {
      return {
        ...state,
        loading: true,
        authorizedUser: action.authorizedUser
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        loading: false,
        success: action.success,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
        email: action.email,
        name: action.name
      };
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        loading: false,
        failed: true,
        error: action.error
      };
    }
    default: return state;
  }
}