import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppHeader from "../app-header/app-header.jsx";
import Main from "../main/main.jsx";
import Login from "../../pages/login.jsx";
import { getIngredients } from '../../services/actions';


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch])

  return(
    <>
      <AppHeader />
      <BrowserRouter>
        <Routes>
          <Route path="/react-burger" element={<Main />}/>
          <Route path="/react-burger/login" element={<Login />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;