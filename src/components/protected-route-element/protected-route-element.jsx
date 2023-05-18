import { Navigate } from "react-router-dom";

function ProtectedRouteElement ({element}) {
  const isLogin = localStorage.getItem("refreshToken");

  return isLogin ? element : <Navigate to="/react-burger/login"/>;
}

export default ProtectedRouteElement;