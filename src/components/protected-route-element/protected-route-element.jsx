import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import { getCookie } from "../../utils/cookieFunction";

function ProtectedRouteElement ({element}) {
  const location = useLocation();
  const isLogin = getCookie("accessToken");

  return isLogin ? element : <Navigate to="/react-burger/login" state={{ from: location}}/>;
}

ProtectedRouteElement.propTypes = {
  element: PropTypes.element.isRequired
};

export default ProtectedRouteElement;