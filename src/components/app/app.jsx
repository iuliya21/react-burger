import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
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
import ProtectedRouteElement from '../protected-route-element/protected-route-element.jsx';
import LogoutUserRoute from "../logout-user-route/logout-user-route.jsx";
import IngredientsPage from "../../pages/ingredients.jsx";
import ErrorPage from "../../pages/not-found.jsx";

function App() {

  const dispatch = useDispatch();
  const cookie = getCookie('accessToken');
  const userToken = localStorage.getItem('refreshToken');
  let location = useLocation();
  let background = location.state?.background; 

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  useEffect(() => {
    if(!cookie && userToken) {
      dispatch(updateUserToken())
    } else if(cookie && userToken) {
      dispatch(getUser());
    }
  }, [cookie, userToken]);

  return(
    <>
      <AppHeader />
        <Routes>
          <Route path="/react-burger" element={<Main />} location={background || location}>
            <Route path="ingredients/:id" element={<IngredientsPage />}/>
          </Route>
          <Route path="/react-burger/login" element={<LogoutUserRoute element={<Login />} />}/>
          <Route path="/react-burger/register" element={<LogoutUserRoute element={<Registration />} />}/>
          <Route path="/react-burger/forgot-password" element={<LogoutUserRoute element={<PasswordForgot />} />}/>
          <Route path="/react-burger/reset-password" element={<LogoutUserRoute element={<PasswordReset />} />}/>
          <Route path="/react-burger/profile/*" element={<ProtectedRouteElement element={<Profile />}/>}>
            <Route path="" element={<UserInfo />}/>
          </Route>
          <Route path="*" element={<ErrorPage />}></Route>
        </Routes>
    </>
  );
}

export default App;