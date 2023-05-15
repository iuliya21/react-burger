import { UrlAdress, checkResponse, request } from "./index";
import { setCookie, getCookie } from "../../utils/cookieFunction";

export const RESTORE_PASSWORD_REQUEST = 'RESTORE_PASSWORD_REQUEST';
export const RESTORE_PASSWORD_SUCCESS = 'RESTORE_PASSWORD_SUCCESS';
export const RESTORE_PASSWORD_FAILED = 'RESTORE_PASSWORD_FAILED';
export const RESTORE_PASSWORD_RESET = 'RESTORE_PASSWORD_RESET';
export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILED = 'REGISTER_USER_FAILED';
export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const UPDATE_TOKEN_REQUEST = 'UPDATE_TOKEN_REQUEST';
export const UPDATE_TOKEN_SUCCESS = 'UPDATE_TOKEN_SUCCESS';
export const UPDATE_TOKEN_FAILED = 'UPDATE_TOKEN_FAILED';
export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';

const valuePasswordPost = (inputEmail) => {
  return {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      "email": inputEmail
    })
  }
}

const registerPost = (inputEmail, inputPassword, inputName) => {
  return {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      "email": inputEmail,
      "password": inputPassword,
      "name": inputName
    })
  }
}

const resetPasswordPost = (inputPassword, inputCode) => {
  return {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      "password": inputPassword,
      "token": inputCode
    })
  }
}

const loginUserPost = (inputEmail, inputPassword) => {
  return {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      "email": inputEmail,
      "password": inputPassword
    })
  }
}

const refreshToken = () => {
  return {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    })
  }
}

const userGet = () => {
  return {
    method: 'GET',
    headers: {"Content-Type": "application/json", authorization: "Bearer " + getCookie("accessToken")}
  }
}

export const restorePassword = (inputEmail) => {
  return (dispatch) => {
    dispatch({
      type: RESTORE_PASSWORD_REQUEST,
    });
    request('password-reset', valuePasswordPost(inputEmail))
    .then(res => {
      dispatch({
        type: RESTORE_PASSWORD_SUCCESS,
        success: res.success,
      });
    })
    .catch(err => {
      dispatch({
        type: RESTORE_PASSWORD_FAILED,
        error: err.message,
      })
    })
  }
}

export const registerUser = (inputEmail, inputPassword, inputName) => {
  return(dispatch) => {
    dispatch({
      type: REGISTER_USER_REQUEST
    });
    request('auth/register', registerPost(inputEmail, inputPassword, inputName))
    .then(res => {
      if (res && res.success) {
        setCookie("accessToken", res.accessToken.split("Bearer ")[1]);
        localStorage.setItem("refreshToken", res.refreshToken);
        dispatch({
          type: REGISTER_USER_SUCCESS,
          success: res.success,
          email: res.user.email,
          name: res.user.name,
          accessToken: res.accessToken,
          refreshToken: res.refreshToken
        })
      }
    })
    .catch(err => {
      dispatch({
        type: REGISTER_USER_FAILED,
        error: err.message
      });
    })
  }
}

export const resetPassword = (inputPassword, inputCode) => {
  return(dispatch) => {
    dispatch({
      type: RESET_PASSWORD_REQUEST
    });
    request('password-reset/reset', resetPasswordPost(inputPassword, inputCode))
    .then(res => {
      dispatch({
        type: RESET_PASSWORD_SUCCESS,
        success: res.success,
      });
    })
    .catch(err => {
      dispatch({
        type: RESET_PASSWORD_FAILED,
        error: err.message
      });
    })
  }
}

export const loginUser = (inputEmail, inputPassword) => {
  return(dispatch) => {
    dispatch({
      type: LOGIN_REQUEST,
      authorizedUser: true
    });
    request('auth/login', loginUserPost(inputEmail, inputPassword))
    .then((res) => {
        if(!localStorage.length) {
          setCookie("accessToken", res.accessToken.split("Bearer ")[1]);
          localStorage.setItem("refreshToken", res.refreshToken);
          dispatch({
            type: LOGIN_SUCCESS,
            success: res.success,
            accessToken: res.accessToken,
            refreshToken: res.refreshToken,
            email: res.user.email,
            name: res.user.name
          });
        }
    })
    .catch(err => {
      dispatch({
        type: LOGIN_FAILED,
        error: err.message
      })
    })
  }
}

export const updateUserToken = () => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_TOKEN_REQUEST
    });
    request('auth/token', refreshToken())
      .then((res) => {
        setCookie("accessToken", res.accessToken.split("Bearer ")[1]);
        localStorage.setItem("refreshToken", res.refreshToken);
        dispatch({
          type: UPDATE_TOKEN_SUCCESS,
          accessToken: res.accessToken,
          refreshToken: res.refreshToken,
        });
      })
      .catch(err => {
        dispatch({
          type: UPDATE_TOKEN_FAILED,
          error: err.message,
        });
      })
  }
}

export const getUser = () => {
  return(dispatch) => {
    dispatch({
      type: GET_USER_REQUEST
    })
    request('auth/user', userGet())
      .then(res => {
        dispatch({
          type: GET_USER_SUCCESS,
          success: res.success,
          email: res.user.email,
          name: res.user.name
        });
      })
      .catch(err => {
        dispatch({
          type: GET_USER_FAILED,
          error: err.message
        })
        dispatch(updateUserToken());
      })
  }
}