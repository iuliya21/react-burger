const UrlAdress = 'https://norma.nomoreparties.space/api';

const checkResponse = (res) => { // проверка запроса
  if(res.ok) {
    return res.json();
  } else {
    return Promise.reject(res);
  }
}

export const getIngredients = () => { // запрос на получение списка ингредиентов с сервера
  return fetch(`${UrlAdress}/ingredients`)
  .then((res) => 
    checkResponse(res)
  ) 
}

export const getPost = ({getIngredient}) => { // POST-запрос для получения номера заказа
  return fetch(`${UrlAdress}/orders`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'}, 
    body: JSON.stringify({
      "ingredients": getIngredient()
    })
  })
  .then((res) => checkResponse(res))
}