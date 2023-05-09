import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppHeader from "../app-header/app-header.jsx";
import Main from "../main/main.jsx";
import Login from "../../pages/login.jsx";
import Registration from "../../pages/registration.jsx";
import PasswordForgot from "../../pages/password-forgot.jsx";
import PasswordReset from "../../pages/password-reset.jsx";

import { getIngredients } from '../../services/actions';


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch])

  return(
    <>
    <BrowserRouter>
    <AppHeader />
        <Routes>
          <Route path="/react-burger" element={<Main />}/>
          <Route path="/react-burger/login" element={<Login />}/>
          <Route path="/react-burger/register" element={<Registration />}/>
          <Route path="/react-burger/forgot-password" element={<PasswordForgot />}/>
          <Route path="/react-burger/forgot-reset" element={<PasswordReset />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;