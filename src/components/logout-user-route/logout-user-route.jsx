import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types';

function LogoutUserRoute ({element}) {
  const isLogin = localStorage.getItem("refreshToken");

  return !isLogin ? element : <Navigate to="/react-burger"/>;
}

LogoutUserRoute.propTypes = {
  element: PropTypes.element.isRequired
};

export default LogoutUserRoute;