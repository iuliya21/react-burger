export const GET_LIST_INGREDIENTS_REQUEST = 'GET_LIST_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const GET_NUMBER_ORDER = 'GET_NUMBER_ORDER';
export const GET_NUMBER_ORDER_SUCCESS = 'GET_NUMBER_ORDER_SUCCESS';
export const GET_NUMBER_ORDER_FAILED = 'GET_NUMBER_ORDER_FAILED';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_BUN = 'ADD_BUN';
export const CLEAR_CONSTRUCTOR = 'CLEAR_CONSTRUCTOR';
export const SELECT_INGREDIENT = 'SELECT_INGREDIENT';
export const DELETE_INFO_INGREDIENT = 'DELETE_INFO_INGREDIENT';

const UrlAdress = 'https://norma.nomoreparties.space/api';

const checkResponse = (res) => { // проверка запроса
  if(res.ok) {
    return res.json();
  } else {
    return Promise.reject(res);
  }
}

export const getIngredients = () => {
  return (dispatch) => {
    dispatch({
      type: GET_LIST_INGREDIENTS_REQUEST,
    });

    fetch(`${UrlAdress}/ingredients`)
      .then(res => checkResponse(res))
      .then(res => {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          data: res.data,
        });
      })
      .catch(err => {
        dispatch({
          type: GET_INGREDIENTS_FAILED,
          error: err.message,
        });
      });
  }
}

export const setOrder = (ingredients) => {
  return (dispatch) => {
    dispatch({
      type: GET_NUMBER_ORDER,
    });
    fetch(`${UrlAdress}/orders`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'}, 
      body: JSON.stringify({
        "ingredients": ingredients
      })
    })
    .then(res => checkResponse(res))
    .then(res => {
      dispatch({
        type: GET_NUMBER_ORDER_SUCCESS,
        order: res.order.number,
      });
    })
    .catch(err => {
      dispatch({
        type: GET_NUMBER_ORDER_FAILED,
        error: err.message,
      });
    });
  }
}

export const getDetailsIngredient = (ingredient) => {
  return {
    type: SELECT_INGREDIENT,
    data: ingredient,
  };
}

export const deleteDetailsIngredient = () => {
  return {
    type: DELETE_INFO_INGREDIENT,
  };
}