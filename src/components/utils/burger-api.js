const UrlPost = 'https://norma.nomoreparties.space/api/orders';

const checkResponse(res) { // метод проверки запроса
  if(res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка ${res.status}`);
  }
}

const getData = async () => {
  return await fetch(`${UrlAdress}/ingredients`)
    .then((res) => {
      if(res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка ${res.status}`);
    })}


const getPost = async () => {  // отправка запроса POST
  return await fetch(UrlPost, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'}, 
    body: JSON.stringify({
      "ingredients": getIngredient()
    })
  })
  .then((res) => {
    
  })
  .then((data) => setNumberOrder(data.order.number))
  .catch((err) => console.log(err));
}