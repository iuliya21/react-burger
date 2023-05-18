import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types';

function ProtectedRouteElement ({element}) {

  const isLogin = localStorage.getItem("refreshToken");

  return isLogin ? element : <Navigate to="/react-burger/login"/>;
}

ProtectedRouteElement.propTypes = {
  element: PropTypes.element.isRequired
};

export default ProtectedRouteElement;