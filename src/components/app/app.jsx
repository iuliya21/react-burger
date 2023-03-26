import React, { useState } from "react";
import AppHeader from "../app-header/app-header.jsx";
import Main from "../main/main.jsx";
import BurgerContext from '../burger-context';
import { getIngredients } from '../utils/burger-api';

function App() {

  const [items, setItems] = useState([]); // список всех ингредиентов с сервера
  const [listIngredients, setListIngredients] = useState([]); // список выбранных ингредиентов пользователем, пока выбираем что хотим

  React.useEffect(() => {
    const getData = async () => {
      return await getIngredients()
        .then((data) => setItems(data.data))
        .catch((err) => console.log(err));
    }
    getData();
  }, [])


  return(
    <>
      <AppHeader />
      <BurgerContext.Provider value={items}>
        <Main />
      </BurgerContext.Provider>
    </>
  );
}

export default App;