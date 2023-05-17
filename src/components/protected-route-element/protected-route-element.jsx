import { useLocation, Navigate } from "react-router-dom";
import { getCookie } from "../../utils/cookieFunction";
import styles from "./protected-route-element.module.css";

function ProtectedRouteElement ( {element} ) {
  const isLogin= getCookie('refreshToken');
  const location = useLocation();

  return isLogin ? element : <Navigate to="/react-burger/login" replace/>;
}

export default ProtectedRouteElement;