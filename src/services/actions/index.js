export const GET_LIST_INGREDIENTS = 'GET_LIST_INGREDIENTS';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const GET_NUMBER_ORDER = 'GET_NUMBER_ORDER';

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
      type: GET_LIST_INGREDIENTS,
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