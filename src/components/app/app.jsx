import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppHeader from "../app-header/app-header.jsx";
import Main from "../main/main.jsx";
import Login from "../../pages/login.jsx";
import Registration from "../../pages/registration.jsx";
import PasswordForgot from "../../pages/password-forgot.jsx";
import PasswordReset from "../../pages/password-reset.jsx";
import Profile from "../../pages/profile.jsx";
import UserInfo from "../../pages/info-user.jsx";
import { getCookie } from "../../utils/cookieFunction.js";
import { updateUserToken, getUser } from "../../services/actions/user.js";
import { getIngredients } from '../../services/actions';


function App() {

  const dispatch = useDispatch();
  const cookie = getCookie('accessToken');
  const userToken = localStorage.getItem('refreshToken');

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  // useEffect(() => {
  //   if(!cookie && userToken) {
  //     dispatch(updateUserToken())
  //   } else if(cookie && userToken) {
  //     dispatch(getUser());
  //   }
  // }, [cookie, userToken]);

  return(
    <>
      <BrowserRouter>
        <AppHeader />
          <Routes>
            <Route path="/react-burger" element={<Main />}/>
            <Route path="/react-burger/login" element={<Login />}/>
            <Route path="/react-burger/register" element={<Registration />}/>
            <Route path="/react-burger/forgot-password" element={<PasswordForgot />}/>
            <Route path="/react-burger/reset-password" element={<PasswordReset />}/>
            <Route path="/react-burger/profile/*" element={<Profile />}>
              <Route path="" element={<UserInfo />}/>
            </Route>
          </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;