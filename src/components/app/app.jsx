import React from "react";
import AppHeader from "../app-header/app-header.jsx";
import Main from "../main/main.jsx";
import ModalOverlay from "../modal-overlay/modal-overlay"

const UrlAdress = 'https://norma.nomoreparties.space/api/ingredients';

function App() {

  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    const getData = async () => {
      return await fetch(UrlAdress)
        .then((res) => {
          if(res.ok) {
            return res.json()
          }
          return Promise.reject(`Ошибка ${res.status}`);
        })
        .then(data => setItems(data.data))
        .catch(err => console.log(err));
    }

    getData();
  }, [])

  return(
    <>
      <AppHeader />
      <Main data={items}/>
    </>
  );
}

export default App;