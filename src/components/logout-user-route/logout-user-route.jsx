import { Navigate } from "react-router-dom";

function LogoutUserRoute ({element}) {
  const isLogin = localStorage.getItem("refreshToken");

  return !isLogin ? element : <Navigate to="/react-burger"/>;
}

export default LogoutUserRoute;